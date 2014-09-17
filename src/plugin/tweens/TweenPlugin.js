/**
 * A tween plugin for flixel. It uses the Universal Tween Engine by Aurelien
 * Ribon. It supports different tweens, timeline, parallel and many callbacks.
 * By default the FlxSprite and TweenSprite accessor is register. To register
 * your own accessor you'll need CustomClass + Accessor.
 * 
 * Take a look at: http://code.google.com/p/java-universal-tween-engine/
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Ka Wing Chin
 */
Flixel.plugin.tweens.TweenPlugin = function()
{
	/**
	 * A TweenManager updates all your tweens and timelines at once. Its main
	 * interest is that it handles the tween/timeline life-cycles for you, as
	 * (the)well pooling constraints (if object pooling is enabled). Just give
	 * it a bunch of tweens or timelines and call update() periodically, you
	 * don't need to care for anything else! Relax and enjoy your animations.
	 */
	Flixel.plugin.tweens.TweenPlugin.parent.constructor.apply(this);

};
extend(Flixel.plugin.tweens.TweenPlugin, Flixel.FlxBasic);