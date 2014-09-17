/**
 * An event for the pause system.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param type			The event type.
 */
Flixel.plugin.PauseEvent = function()
{
};

/**
 * The pause in event name.
 */
Flixel.plugin.PauseEvent.PAUSE_IN = "pauseIn";
/**
 * The pause out event name.
 */
Flixel.plugin.PauseEvent.PAUSE_OUT = "pauseOut";

/**
 * Get a new instance.
 */
Flixel.plugin.PauseEvent.getEvent = function(type)
{
	if(Flixel.FlxG.device.ie) {
		var event = document.createEvent("CustomEvent"); 
		event.initCustomEvent(type, false, false, null); 
		return event;
	} else {
		return new CustomEvent(type);
	}
};