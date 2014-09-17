/**
 * 
 */
/**
 * A singleton object to access the device localStorage area.<br>
 * <br>
 * Initialize "score" and "lives" with default values me.save.add({score : 0,
 * lives : 3 });<br>
 * <br>
 * Save score me.save.score = 31337;<br>
 * <br>
 * Load lives console.log(me.save.lives);<br>
 * <br>
 * Also supports complex objects thanks to JSON backend me.save.complexObject = {
 * a : "b", c : [ 1, 2, 3, "d" ], e : { f : [{}] } };<br>
 * <br>
 * DO NOT set any child properties of me.save.complexObject directly!<br>
 * <br>
 * Changes made that way will not save. Always set the entire object value at
 * once.<br>
 * <br>
 * Print all console.log(JSON.stringify(me.save));<br>
 * <br>
 * Delete "score" from localStorage me.save.remove('score');<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var StorageManager = function()
{
	if (StorageManager._instance)
		throw new Error("Do not call this constructor directly!!!");

	// Load previous local storages if local Storage is supported
	if (Flixel.FlxG.device.localStorage === true) {
		var keys = JSON.parse(localStorage.getItem(StorageManager.storageTag)) || [];
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			this._localStorages[key] = new LocalStorage(StorageManager.saveTag, key);
		}
	}
};

/**
 * The storage save tag.
 */
StorageManager.saveTag = "Flixel.SaveManager";
/**
 * The storage save tag.
 */
StorageManager.storageTag = "Flixel.StorageManager";
/**
 * Variable to hold the object data
 */
StorageManager.prototype._localStorages = {};
/**
 * Internal instance for singleton stuff.
 */
StorageManager._instance = null;

/**
 * Create or return a new local storage.
 * 
 * @param name
 *            The small local storage name.
 */
StorageManager.prototype.createLocalStorage = function(name)
{
	if (!this._localStorages[name]) {
		this._localStorages[name] = new LocalStorage(StorageManager.saveTag, name);
		
		localStorage.removeItem(StorageManager.storageTag);
		localStorage.setItem(StorageManager.storageTag, JSON.stringify(Object.keys(this._localStorages)));	
	}

	return this._localStorages[name];
};

/**
 * Remove a localStorage.
 */
StorageManager.prototype.removeLocalStorage = function(name)
{
	if (this._localStorages[name] !== undefined) {
		this._localStorages[name].clear();
	}
	
	localStorage.removeItem(StorageManager.storageTag);
	localStorage.setItem(StorageManager.storageTag, JSON.stringify(Object.keys(this._localStorages)));
};

/**
 * Clear all the localStorages.<br>
 * THIS IS MORTALLY DANGEROUS AND SHOUD NEVER EVER EVER<br>
 * EVER EVER EVER EVER EVER EVER EVER EVER EVER EVER EVER,<br>
 * I think if you are smart you have get how dangerous it is...,<br>
 * BE USED!!!
 */
StorageManager.prototype.clear = function(name)
{
	var keys = Object.keys(this._localStorages);
	for(var i = 0; i < keys.length; i++) {
		var key = keys[i];
		this._localStorages[key].clear();
	}
	
	localStorage.removeItem(StorageManager.storageTag);
};

/**
 * Sets the value of an associated key previously added.
 */
StorageManager.getInstance = function()
{
	if (StorageManager._instance === null)
		StorageManager._instance = new StorageManager();

	return StorageManager._instance;
};