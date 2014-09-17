/**
 * Tweens a numeric value.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor.
 * 
 * @param complete
 *            Optional completion callback.
 * @param type
 *            Tween type.
 */
Flixel.plugin.tweens.misc.NumTween = function(complete, type)
{
	type = (type === undefined) ? 0 : type;
	Flixel.plugin.tweens.misc.AngleTween.parent.constructor.apply(this, [0, type, complete]);
	this.value = 0;
};

/**
 * The current value.
 */
Flixel.plugin.tweens.misc.NumTween.prototype.value = 0;

// Tween information.
Flixel.plugin.tweens.misc.NumTween.prototype._start = 0;
Flixel.plugin.tweens.misc.NumTween.prototype._range = 0;

/**
 * Tweens the value from one value to another.
 * @param       fromValue               Start value.
 * @param       toValue                 End value.
 * @param       duration                Duration of the tween.
 * @param       ease                    Optional easer function.
 */
Flixel.plugin.tweens.misc.NumTween.prototype.tween = function(fromValue, toValue, duration, ease)
{
	ease = (ease === undefined) ? null : ease;

	this._start = this.value = fromValue;
	this._range = toValue - this.value;
	this._target = duration;
	this._ease = ease;
	this.start();
};

/** @private Updates the Tween. */
Flixel.plugin.tweens.misc.NumTween.prototype.update = function()
{
	Flixel.plugin.tweens.misc.NumTween.parent.update.apply(this);
	this.value = this._start + this._range * this._t;
};