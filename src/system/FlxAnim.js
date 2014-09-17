/**
 * Just a helper structure for the FlxSprite animation system.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor
 * 
 * @param Name
 *            What this animation should be called (e.g. "run")
 * @param Frames
 *            An array of numbers indicating what frames to play in what order
 *            (e.g. 1, 2, 3)
 * @param FrameRate
 *            The speed in frames per second that the animation should play at
 *            (e.g. 40)
 * @param Looped
 *            Whether or not the animation is looped or just plays once
 */
Flixel.system.FlxAnim = function(Name, Frames, FrameRate, Looped)
{
	// Set up the constructor stuff
	this.name = Name;
	this.delay = 0;
	if (FrameRate > 0)
		this.delay = 1.0 / FrameRate;
	this.frames = Frames;
	this.looped = (Looped === undefined) ? true : Looped;
};

/**
 * String name of the animation (e.g. "walk")
 */
Flixel.system.FlxAnim.prototype.name = null;
/**
 * Seconds between frames (basically the framerate)
 */
Flixel.system.FlxAnim.prototype.delay = null;
/**
 * A list of frames stored as <code>uint</code> objects
 */
Flixel.system.FlxAnim.prototype.frames = null;
/**
 * Whether or not the animation is looped
 */
Flixel.system.FlxAnim.prototype.looped = null;

/**
 * Clean up memory.
 */
Flixel.system.FlxAnim.prototype.destroy = function()
{
	this.frames = null;
};