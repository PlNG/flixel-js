/**
 * A simple manager for tracking and updating game timer objects.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiates a new timer manager.
 */
Flixel.plugin.TimerManager = function()
{
	Flixel.plugin.TimerManager.parent.constructor.apply(this);

	this._timers = [];
	this.visible = false; // don't call draw on this plugin
};
extend(Flixel.plugin.TimerManager, Flixel.FlxBasic);

/**
 * The array with the timers
 */
Flixel.plugin.TimerManager.prototype._timers = null;

/**
 * Clean up memory.
 */
Flixel.plugin.TimerManager.prototype.destroy = function()
{
	this.clear();
	this._timers = null;

	Flixel.plugin.TimerManager.parent.destroy.apply(this);
};

/**
 * Called by <code>FlxG.updatePlugins()</code> before the game state has been updated. Cycles through timers and calls <code>update()</code> on each one.
 */
Flixel.plugin.TimerManager.prototype.update = function()
{
	var i = this._timers.length - 1;
	var timer;
	while (i >= 0) {
		timer = this._timers[i--];
		if ((timer !== null) && !timer.paused && !timer.finished && (timer.time > 0))
			timer.update();
	}
};

/**
 * Add a new timer to the timer manager. Usually called automatically by <code>FlxTimer</code>'s constructor.
 * 
 * @param Timer
 *            The <code>FlxTimer</code> you want to add to the manager.
 */
Flixel.plugin.TimerManager.prototype.add = function(Timer)
{
	this._timers.push(Timer);
};

/**
 * Remove a timer from the timer manager. Usually called automatically by <code>FlxTimer</code>'s <code>stop()</code> function.
 * 
 * @param Timer
 *            The <code>FlxTimer</code> you want to remove from the manager.
 */
Flixel.plugin.TimerManager.prototype.remove = function(Timer)
{
	var index = this._timers.indexOf(Timer);
	if (index >= 0)
		this._timers.splice(index, 1);
};

/**
 * Removes all the timers from the timer manager.
 */
Flixel.plugin.TimerManager.prototype.clear = function()
{
	if (this._timers !== null) {
		var i = this._timers.length - 1;
		while (i >= 0) {
			var timer = this._timers[i--];
			if (timer !== null)
				timer.destroy();
		}
		this._timers.length = 0;
	}
};

/**
 * Return the class name.
 */
Flixel.plugin.TimerManager.prototype.toString = function()
{
	return "TimerManager";
};