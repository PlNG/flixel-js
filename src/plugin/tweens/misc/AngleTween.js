/**
 * Tweens from one angle to another.
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
Flixel.plugin.tweens.misc.AngleTween = function(complete, type)
{
	type = (type === undefined) ? 0 : type;
	
	Flixel.plugin.tweens.misc.AngleTween.parent.constructor.apply(this, [0, type, complete]);
	this.angle = 0;
};
extend(Flixel.plugin.tweens.misc.AngleTween, Flixel.plugin.tweens.FlxTween);

/**
 * The current value.
 */
Flixel.plugin.tweens.misc.AngleTween.prototype.angle = 0;

// Tween information.
Flixel.plugin.tweens.misc.AngleTween.prototype._start = 0;
Flixel.plugin.tweens.misc.AngleTween.prototype._range = 0;

/**
 * Tweens the value from one angle to another.
 * 
 * @param       fromAngle               Start angle.
 * @param       toAngle                 End angle.
 * @param       duration                Duration of the tween.
 * @param       ease                    Optional easer function.
 */
Flixel.plugin.tweens.misc.AngleTween.prototype.tween = function(fromAngle, toAngle, duration, ease)
{
	ease = (ease === undefined) ? null : ease;

	this._start = this.angle = fromAngle;
	var d = toAngle - this.angle;
	var a = Math.abs(d);
	if (a > 181)  {
		this._range = (360 - a) * (d > 0 ? -1 : 1);
	} else if (a < 179)  {
		this._range = d;
	} else {
		this._range = Flixel.plugin.FlxMath.randFloat(-180, 180);
	}

	this._target = duration;
	this._ease = ease;
	this.start();
};

/**
 * Updates the Tween.
 */
Flixel.plugin.tweens.misc.AngleTween.prototype.update = function()
{
	Flixel.plugin.tweens.misc.AngleTween.parent.update.apply(this);

	this.angle = (this._start + this._range * this._t) % 360;
	if (this.angle < 0)  {
		this.angle += 360;
	}
};