/**
 * A helper class for the frame records, part of the replay/demo/recording system.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new mouse input record.
 * 
 * @param X
 *            The main X value of the mouse in screen space.
 * @param Y
 *            The main Y value of the mouse in screen space.
 * @param Button
 *            The state of the left mouse button.
 * @param Wheel
 *            The state of the mouse wheel.
 */
Flixel.system.replay.MouseRecord = function(X, Y, Button, Wheel)
{
	this.x = X;
	this.y = Y;
	this.button = Button;
	this.wheel = Wheel;
};

/**
 * The main X value of the mouse in screen space.
 */
Flixel.system.replay.MouseRecord.prototype.x = 0;
/**
 * The main Y value of the mouse in screen space.
 */
Flixel.system.replay.MouseRecord.prototype.y = 0;
/**
 * The state of the left mouse button.
 */
Flixel.system.replay.MouseRecord.prototype.button = 0;
/**
 * The state of the mouse wheel.
 */
Flixel.system.replay.MouseRecord.prototype.wheel = 0;