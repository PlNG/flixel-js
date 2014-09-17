/**
 * A class to help automate and simplify save game functionality.
 * Basicaly a wrapper for the localStorage thing, but
 * handles some annoying storage request stuff too.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Blanks out the containers.
 */
Flixel.plugin.store.FlxSave = function()
{
	this.destroy();
};

Flixel.plugin.store.FlxSave.SUCCESS = 0;
Flixel.plugin.store.FlxSave.PENDING = 1;
Flixel.plugin.store.FlxSave.ERROR = 2;

/**
 * Allows you to directly access the data container in the local shared object.
 * 
 * @default null
 */
Flixel.plugin.store.FlxSave.prototype.data = null;
/**
 * The name of the local shared object.
 * 
 * @default null
 */
Flixel.plugin.store.FlxSave.prototype.name = null;
/**
 * The local shared object itself.
 * 
 * @default null
 */
Flixel.plugin.store.FlxSave.prototype._sharedObject = null;

/**
 * Internal tracker for callback function in case save takes too long.
 */
Flixel.plugin.store.FlxSave.prototype._onComplete = null;
/**
 * Internal tracker for save object close request.
 */
Flixel.plugin.store.FlxSave.prototype._closeRequested = false;

/**
 * Clean up memory.
 */
Flixel.plugin.store.FlxSave.prototype.destroy = function()
{
	this._sharedObject = null;
	this.name = null;
	this.data = null;
	this._onComplete = null;
	this._closeRequested = false;
};

/**
 * Automatically creates or reconnects to locally saved data.
 * 
 * @param Name
 *            The name of the object (should be the same each time to access old
 *            data).
 * 
 * @return Whether or not you successfully connected to the save data.
 */
Flixel.plugin.store.FlxSave.prototype.bind = function(Name)
{
	this.destroy();
	this.name = Name;
	try {
		this._sharedObject = StorageManager.getInstance().createLocalStorage(this.name);
	} catch (e) {
		Flixel.FlxG.log("ERROR: There was a problem binding to\nthe localStorage data from FlxSave.");
		this.destroy();
		return false;
	}
	this.data = [];

	// Populate the data if needed
	var keys = Object.keys(this._sharedObject._data);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		this.data[key] = this._sharedObject._data[key];
	}

	return true;
};

/**
 * A way to safely call <code>flush()</code> and <code>destroy()</code> on
 * your save file. Will correctly handle storage size popups and all that good
 * stuff. If you don't want to save your changes first, just call
 * <code>destroy()</code> instead.
 * 
 * @param MinFileSize
 *            If you need X amount of space for your save, specify it here.
 * @param OnComplete
 *            This callback will be triggered when the data is written
 *            successfully.
 * 
 * @return The result of result of the <code>flush()</code> call (see below
 *         for more details).
 */
Flixel.plugin.store.FlxSave.prototype.close = function(MinFileSize, OnComplete)
{
	this._closeRequested = true;
	return this.flush(MinFileSize, OnComplete);
};

/**
 * Writes the local shared object to disk immediately. Leaves the object open in
 * memory.
 * 
 * @param MinFileSize
 *            If you need X amount of space for your save, specify it here.<br>
 *            It's unused in HTML5!!
 * @param OnComplete
 *            This callback will be triggered when the data is written
 *            successfully.
 * 
 * @return Whether or not the data was written immediately. False could be an
 *         error OR a storage request popup.
 */
Flixel.plugin.store.FlxSave.prototype.flush = function(MinFileSize, OnComplete)
{
	if (!this.checkBinding())
		return false;

	// Save all the values on data
	this._sharedObject.add(this.data);

	this._onComplete = (OnComplete === undefined) ? null : OnComplete;
	return this.onDone(Flixel.plugin.store.FlxSave.SUCCESS);
};

/**
 * Erases everything stored in the local shared object. Data is immediately
 * erased and the object is saved that way, so use with caution!
 * 
 * @return Returns false if the save object is not bound yet.
 */
Flixel.plugin.store.FlxSave.prototype.erase = function()
{
	if (!this.checkBinding())
		return false;
	this._sharedObject.clear();
	return true;
};

/**
 * Event handler for special case storage requests. Handles logging of errors
 * and calling of callback.
 * 
 * @param Result
 *            One of the result codes (PENDING, ERROR, or SUCCESS).
 * 
 * @return Whether the operation was a success or not.
 */
Flixel.plugin.store.FlxSave.prototype.onDone = function(Result)
{
	switch (Result) {
		case Flixel.plugin.store.FlxSave.ERROR:
			Flixel.FlxG.log("ERROR: There was a problem flushing\nthe shared object data from FlxSave.");
			break;
		default:
			break;
	}
	if (this._onComplete !== null)
		this._onComplete(Result == Flixel.plugin.store.FlxSave.SUCCESS);
	if (this._closeRequested)
		this.destroy();
	return Result == Flixel.plugin.store.FlxSave.SUCCESS;
};

/**
 * Handy utility function for checking and warning if the shared object is bound
 * yet or not.
 * 
 * @return Whether the shared object was bound yet.
 */
Flixel.plugin.store.FlxSave.prototype.checkBinding = function()
{
	if (this._sharedObject === null) {
		Flixel.FlxG.log("You must call FlxSave.bind()\nbefore you can read or write data.");
		return false;
	}
	return true;
};