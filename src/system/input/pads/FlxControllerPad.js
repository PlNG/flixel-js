/**
 * Class to handle a controller Pad in the screen.
 * This Game Pad will help the character to move and thing's like that.
 * This is an improvement of the DigitalPad Class.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.system.input.pads.FlxControllerPad = function(X, Y)
{
	// Set the Game Pad coordinates
	var difWidth = 0.75;
	var difHeight = 0.75;
	this.x = X;
	this.y = Y;

	// Update the location according to the scale
	if (difWidth < 0)
		this.x = X + (128 - (128 * difWidth)) / 2.0;
	else
		this.x = X - (128 - (128 * difWidth)) / 2.0;
	if (difHeight < 0)
		this.y = Y - (128 - (128 * difHeight)) / 2.0;
	else
		this.y = Y + (128 - (128 * difHeight)) / 2.0;

	// Initialize the basics
	this._terminated = false;
	this._map = {};

	// Button UP
	var up = new Flixel.system.input.pads.FlxRectangleButton(3);
	up.loadGraphic(Flixel.data.FlxSystemAsset.gpad[0]);
	up.setSolid(false);
	up.setAlpha(0.75);
	up.immovable = true;
	up.scale = new Flixel.FlxPoint(difWidth, difHeight);
	up.x = this.x + 40;
	up.y = this.y;
	up.addRectangle(up.x - up.width, up.y - 120 - up.height, (up.width * 3), 120 + up.height * 2);
	this.add(up);
	this.addButton("UP", up);

	// Button LEFT
	var left = new Flixel.system.input.pads.FlxRectangleButton(3);
	left.loadGraphic(Flixel.data.FlxSystemAsset.gpad[2]);
	left.setSolid(false);
	left.setAlpha(0.75);
	left.immovable = true;
	left.scale = new Flixel.FlxPoint(difWidth, difHeight);
	left.x = this.x;
	left.y = this.y + 40;
	left.addRectangle(left.x - left.width, left.y - left.height, left.width * 2, left.height * 3);
	this.add(left);
	this.addButton("LEFT", left);

	// Button RIGHT
	var right = new Flixel.system.input.pads.FlxRectangleButton(3);
	right.loadGraphic(Flixel.data.FlxSystemAsset.gpad[3]);
	right.setSolid(false);
	right.setAlpha(0.75);
	right.immovable = true;
	right.scale = new Flixel.FlxPoint(difWidth, difHeight);
	right.x = this.x + 80;
	right.y = this.y + 40;
	right.addRectangle(right.x, right.y - right.height, right.width * 3, right.height * 3);
	this.add(right);
	this.addButton("RIGHT", right);

	// Button DOWN
	var down = new Flixel.system.input.pads.FlxRectangleButton(3);
	down.loadGraphic(Flixel.data.FlxSystemAsset.gpad[1]);
	down.setSolid(false);
	down.setAlpha(0.75);
	down.immovable = true;
	down.scale = new Flixel.FlxPoint(difWidth, difHeight);
	down.x = this.x + 40;
	down.y = this.y + 80;
	down.addRectangle(down.x - down.width, down.y, down.width * 3, down.height * 3);
	this.add(down);
	this.addButton("DOWN", down);
};
extend(Flixel.system.input.pads.FlxControllerPad, Flixel.system.input.pads.FlxGamePad);

/**
 * Overridden destroy method.
 */
Flixel.system.input.pads.FlxControllerPad.prototype.destroy = function()
{
	if (this._map !== null)
		this._map.length = 0;
	this._map = null;

	Flixel.system.input.pads.FlxControllerPad.parent.destroy.apply(this);
};

/**
 * Overridden function of the Game Pad, this function will update all the Game
 * Pad buttons. This will only happen if the Game Pad is visible, not terminated
 * and the game is not paused.
 */
Flixel.system.input.pads.FlxControllerPad.prototype.update = function()
{
	if (this.visible && !Flixel.FlxG.getPause() && !this._terminated) {
		Flixel.system.input.pads.FlxControllerPad.parent.update.apply(this);
	}
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.pressed = function(name)
{
	if (this._map[name]) {
		return this._map[name].status == Flixel.system.input.pads.FlxPadButton.STATUS_PRESSED;
	}
	return false;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.justTouching = function(name)
{
	if (this._map[name]) {
		return this._map[name].status == Flixel.FlxButton.PRESSED;
	}
	return false;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.justRemoved = function(name)
{
	if (this._map[name]) {
		return this._map[name].status == Flixel.FlxButton.PRESSED;
	}
	return false;
};

/**
 * Add the button to the FlxGroup container
 * 
 * @param ButtonName
 *            String name of the key (e.g. "LEFT" or "A")
 * @param Button
 *            The Button instance.
 */
Flixel.system.input.pads.FlxControllerPad.prototype.addButton = function(ButtonName, Button)
{
	this._map[ButtonName] = Button;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.show = function()
{
	this.visible = true;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.hide = function()
{
	this.visible = false;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.terminate = function()
{
	this._terminated = true;
	delete this._map;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.isTerminated = function()
{
	return this._terminated;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxControllerPad.prototype.setAlpha = function(alpha)
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].setAlpha(alpha);
	}
};