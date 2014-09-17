/**
 * A handy class that represent a structure
 * for all the Flixel game pads.
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Abstract constructor do not call!!
 */
Flixel.system.input.pads.FlxGamePad = function()
{
	Flixel.system.input.pads.FlxGamePad.parent.constructor.apply(this);
};
extend(Flixel.system.input.pads.FlxGamePad, Flixel.FlxGroup);

/**
 * The Extended Game Pad ID.
 */
Flixel.system.input.pads.FlxGamePad.EXTENDED_GAMEPAD = 1;
/**
 * The Controller Game Pad
 */
Flixel.system.input.pads.FlxGamePad.CONTROLLER_GAMEPAD = 2;
/**
 * The Digital Game Pad.
 */
Flixel.system.input.pads.FlxGamePad.DIGITAL_GAMEPAD = 3;
/**
 * The Analog Game Pad.
 */
Flixel.system.input.pads.FlxGamePad.ANALOG_GAMEPAD = 4;

/**
 * The X coordinate of the group.
 */
Flixel.system.input.pads.FlxGamePad.prototype.x = 0;
/**
 * The Y coordinate of the group.
 */
Flixel.system.input.pads.FlxGamePad.prototype.y = 0;
/**
 * Contain all the Button names and a reference to the button object.
 */
Flixel.system.input.pads.FlxGamePad.prototype._map = null;
/**
 * Help to check the game pad status
 */
Flixel.system.input.pads.FlxGamePad.prototype._terminated = false;

/**
 * Check if any of the Game Pad keys has been pressed.
 * 
 * @param name
 *            Key Name
 * @return True if pressed, false otherwise.
 */
Flixel.system.input.pads.FlxGamePad.prototype.pressed = function(name)
{
};

/**
 * Check if any of the Game Pad keys has been just touched.
 * 
 * @param name
 *            Key Name
 * @return
 */
Flixel.system.input.pads.FlxGamePad.prototype.justTouching = function(name)
{
};

/**
 * Check if any of the Game Pad keys has been just removed.
 * 
 * @param name
 *            Key Name
 * @return
 */
Flixel.system.input.pads.FlxGamePad.prototype.justRemoved = function(name)
{
};

/**
 * Show all the Game Pad buttons.
 */
Flixel.system.input.pads.FlxGamePad.prototype.show = function()
{
};

/**
 * Hide all the Game Pad buttons.
 */
Flixel.system.input.pads.FlxGamePad.prototype.hide = function()
{
};

/**
 * Terminate the whole Game Pad.
 */
Flixel.system.input.pads.FlxGamePad.prototype.terminate = function()
{
};
/**
 * Tells the caller if the Game Pad should be instanced again.
 * 
 * @return If the Game Pad should be instanced again.
 */
Flixel.system.input.pads.FlxGamePad.prototype.isTerminated = function()
{
};

/**
 * Set <code>alpha</code> to a number between 0 and 1 to change the opacity of
 * the gamepad.
 * 
 * @param Alpha
 */
Flixel.system.input.pads.FlxGamePad.prototype.setAlpha = function(alpha)
{
};