/**
 * This class manages all the volume stuff of the Flixel. It could be use
 * internally or extend it in order to create your own crazy hacks.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
Flixel.system.FlxVolumeHandler = function()
{
	/**
	 * The volume of the music
	 */
	this.musicVolume = 0.5;
	/**
	 * The volume of the sounds
	 */
	this.soundVolume = 0.5;
	/**
	 * If we are muted or not
	 */
	this.mute = false;
};