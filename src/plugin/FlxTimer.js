/**
 * A simple timer class, leveraging the new plugins system.
 * Can be used with callbacks or by polling the <code>finished</code> flag.
 * Not intended to be added to a game state or group; the timer manager
 * is responsible for actually calling update(), not the user.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate the timer. Does not set or start the timer.
 */
Flixel.plugin.FlxTimer = function()
{
	this.time = 0;
	this.loops = 0;
	this._callback = null;
	this._timeCounter = 0;
	this._loopsCounter = 0;

	this.paused = false;
	this.finished = false;
};

/**
 * How much time the timer was set for.
 */
Flixel.plugin.FlxTimer.prototype.time = 0;
/**
 * How many loops the timer was set for.
 */
Flixel.plugin.FlxTimer.prototype.loops = 0;
/**
 * Pauses or checks the pause state of the timer.
 */
Flixel.plugin.FlxTimer.prototype.paused = false;
/**
 * Check to see if the timer is finished.
 */
Flixel.plugin.FlxTimer.prototype.finished = false;
/**
 * Internal tracker for the time's-up callback function.<br>
 * Callback should be formed "onTimer(Timer:FlxTimer);"
 */
Flixel.plugin.FlxTimer.prototype._callback = null;
/**
 * Internal tracker for the actual timer counting up.
 */
Flixel.plugin.FlxTimer.prototype._timeCounter = 0;
/**
 * Internal tracker for the loops counting up.
 */
Flixel.plugin.FlxTimer.prototype._loopsCounter = 0;

/**
 * Clean up memory.
 */
Flixel.plugin.FlxTimer.prototype.destroy = function()
{
	this.stop();
	this._callback = null;
};

/**
 * Called by the timer manager plugin to update the timer. If time runs out, the loop counter is advanced, the timer reset, and the callback called if it exists. If the timer runs out of loops, then
 * the timer calls <code>stop()</code>. However, callbacks are called AFTER <code>stop()</code> is called.
 */
Flixel.plugin.FlxTimer.prototype.update = function()
{
	this._timeCounter += Flixel.FlxG.elapsed;
	while ((this._timeCounter >= this.time) && !this.paused && !this.finished) {
		this._timeCounter -= this.time;

		this._loopsCounter++;
		if ((this.loops > 0) && (this._loopsCounter >= this.loops))
			this.stop();

		if (this._callback !== null)
			this._callback(this);
	}
};

/**
 * Starts or resumes the timer. If this timer was paused, then all the parameters are ignored, and the timer is resumed. Adds the timer to the timer manager.
 * 
 * @param Time
 *            How many seconds it takes for the timer to go off.
 * @param Loops
 *            How many times the timer should go off. Default is 1, or "just count down once."
 * @param Callback
 *            Optional, triggered whenever the time runs out, once for each loop. Callback should be formed "onTimer(Timer:FlxTimer);"
 * 
 * @return A reference to itself (handy for chaining or whatever).
 */
Flixel.plugin.FlxTimer.prototype.start = function(Time, Loops, Callback)
{
	Time = (Time === undefined) ? 1 : Time;
	Loops = (Loops === undefined) ? 1 : Loops;

	var timerManager = Flixel.plugin.FlxTimer.getManager();
	if (timerManager !== null)
		timerManager.add(this);

	if (this.paused) {
		this.paused = false;
		return this;
	}

	this.paused = false;
	this.finished = false;
	this.time = Time;
	this.loops = Loops;
	this._callback = Callback;
	this._timeCounter = 0;
	this._loopsCounter = 0;
	return this;
};

/**
 * Stops the timer and removes it from the timer manager.
 */
Flixel.plugin.FlxTimer.prototype.stop = function()
{
	this.finished = true;
	var timerManager = Flixel.plugin.FlxTimer.getManager();
	if (timerManager !== null)
		timerManager.remove(this);
};

/**
 * Read-only: check how much time is left on the timer.
 */
Flixel.plugin.FlxTimer.prototype.getTimeLeft = function()
{
	return this.time - this._timeCounter;
};

/**
 * Read-only: check how many loops are left on the timer.
 */
Flixel.plugin.FlxTimer.prototype.getLoopsLeft = function()
{
	return this.loops - this._loopsCounter;
};

/**
 * Read-only: how far along the timer is, on a scale of 0.0 to 1.0.
 */
Flixel.plugin.FlxTimer.prototype.getProgress = function()
{
	if (this.time > 0)
		return this._timeCounter / this.time;
	else
		return 0;
};

/**
 * Return the Timer Manager plugin.
 */
Flixel.plugin.FlxTimer.getManager = function()
{
	return Flixel.FlxG.getPlugin(Flixel.plugin.TimerManager);
};