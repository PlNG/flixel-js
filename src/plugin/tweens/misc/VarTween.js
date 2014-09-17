/**
 * Tweens a float public property of an FlxBasic.
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
Flixel.plugin.tweens.misc.VarTween = function(complete, type)
{
	type = (type === undefined) ? 0 : type;
	
	Flixel.plugin.tweens.misc.VarTween.parent.constructor.apply(this, [0, type, complete]);
};
extend(Flixel.plugin.tweens.misc.VarTween, Flixel.plugin.tweens.FlxTween);

// Tween information.
Flixel.plugin.tweens.misc.VarTween.prototype._object = null;
Flixel.plugin.tweens.misc.VarTween.prototype._property = null;
Flixel.plugin.tweens.misc.VarTween.prototype._start = 0;
Flixel.plugin.tweens.misc.VarTween.prototype._range = 0;

/**
 * Overridden destroy method.
 */
Flixel.plugin.tweens.misc.VarTween.prototype.destroy = function()
{
	Flixel.plugin.tweens.misc.VarTween.parent.destroy.apply(this);
	this._object = null;
};

/**
 * Tweens a numeric public property.
* 
 * @param	object		The object containing the property.
 * @param	property	The name of the property (eg. "x").
 * @param	to			Value to tween to.
 * @param	duration	Duration of the tween.
 * @param	ease		Optional easer function.
 */
Flixel.plugin.tweens.misc.VarTween.prototype.tween = function(object, property, to, duration, ease)
{
	this._object = object;
	this._ease = (ease === undefined) ? null : ease;
	this._property = property;
	var a = 0;
	
	// Check if the variable is a number
	try {
		a = this._object[this._property];
	} catch(e) {
		throw new Error(e);
	}
	
	this._start = a;
	this._range = to - this._start;
	this._target = duration;
	this.start();
};

/**
 * Updates the Tween.
 */
Flixel.plugin.tweens.misc.VarTween.prototype.update = function()
{
	Flixel.plugin.tweens.misc.VarTween.parent.update.apply(this);
	try {
		this._object[this._property] = this._start + this._range * this._t;
	} catch(e) {
		throw new Error(e);
	}
};