/**
 * This is the Pause window, it has the main menu<br>
 * designed to close or finish the pause in the game.<br>
 * You can also add your own menus to the Pause window.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
Flixel.plugin.FlxPause = function()
{
	Flixel.plugin.FlxPause.parent.constructor.apply(this);
};
extend(Flixel.plugin.FlxPause, Flixel.FlxGroup);

/**
 * Returns the class name.
 */
Flixel.plugin.FlxPause.prototype.toString = function()
{
	return "FlxPause";
};