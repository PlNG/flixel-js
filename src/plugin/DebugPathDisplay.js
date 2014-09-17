/**
 * A simple manager for tracking and drawing FlxPath debug data to the screen.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiates a new debug path display manager.
 */
Flixel.plugin.DebugPathDisplay = function()
{
	Flixel.plugin.DebugPathDisplay.parent.constructor.apply(this);

	this._paths = [];
	this.active = false; // don't call update on this plugin
};
extend(Flixel.plugin.DebugPathDisplay, Flixel.FlxBasic);

/**
 * The array with all the paths.
 */
Flixel.plugin.DebugPathDisplay.prototype._paths = null;

/**
 * Clean up memory.
 */
Flixel.plugin.DebugPathDisplay.prototype.destroy = function()
{
	this.clear();
	this._paths = null;

	Flixel.plugin.DebugPathDisplay.parent.destroy.apply(this);
};

/**
 * Called by <code>FlxG.drawPlugins()</code> after the game state has been drawn.<br>
 * Cycles through cameras and calls <code>drawDebug()</code> on each one.
 */
Flixel.plugin.DebugPathDisplay.prototype.draw = function()
{
	if (!Flixel.FlxG.visualDebug || this.ignoreDrawDebug)
		return;

	if (this.cameras === null || this.cameras === undefined)
		this.cameras = Flixel.FlxG.cameras;
	var i = 0;
	var l = this.cameras.length;
	while (i < l)
		this.drawDebug(this.cameras[i++]);
};

/**
 * Similar to <code>FlxObject</code>'s <code>drawDebug()</code> functionality,<br>
 * this function calls <code>drawDebug()</code> on each <code>FlxPath</code> for the specified camera.<br>
 * Very helpful for debugging!<br>
 * 
 * @param Camera
 *            Which <code>FlxCamera</code> object to draw the debug data to.
 */
Flixel.plugin.DebugPathDisplay.prototype.drawDebug = function(Camera)
{
	if (Camera === undefined || Camera === null)
		Camera = Flixel.FlxG.camera;

	var i = this._paths.length - 1;
	var path;
	while (i >= 0) {
		path = this._paths[i--];
		if ((path !== null) && !path.ignoreDrawDebug)
			path.drawDebug(Camera);
	}
};

/**
 * Add a path to the path debug display manager.<br>
 * Usually called automatically by <code>FlxPath</code>'s constructor.
 * 
 * @param Path
 *            The <code>FlxPath</code> you want to add to the manager.
 */
Flixel.plugin.DebugPathDisplay.prototype.add = function(Path)
{
	this._paths.push(Path);
};

/**
 * Remove a path from the path debug display manager.<br>
 * Usually called automatically by <code>FlxPath</code>'s <code>destroy()</code> function.
 * 
 * @param Path
 *            The <code>FlxPath</code> you want to remove from the manager.
 */
Flixel.plugin.DebugPathDisplay.prototype.remove = function(Path)
{
	var index = this._paths.indexOf(Path);
	if (index >= 0)
		this._paths.splice(index, 1);
};

/**
 * Removes all the paths from the path debug display manager.
 */
Flixel.plugin.DebugPathDisplay.prototype.clear = function()
{
	if (this._paths !== null) {
		var i = this._paths.length - 1;
		while (i >= 0) {
			var path = this._paths[i--];
			if (path !== null)
				path.destroy();
		}
		this._paths.length = 0;
	}
};

/**
 * Return the class name.
 */
Flixel.plugin.DebugPathDisplay.prototype.toString = function()
{
	return "DebugPathDisplay";
};