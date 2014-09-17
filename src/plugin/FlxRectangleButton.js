/**
 * A button that is represented as a rectangle.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param x
 *            The top left X position.
 * @param y
 *            The top left Y position.
 * @param maxRectangles
 *            The maximum number of rectangles for the button.
 */
Flixel.plugin.FlxRectangleButton = function(x, y, maxRectangles)
{
	x = (x === undefined) ? 0 : x;
	y = (y === undefined) ? 0 : y;
	maxRectangles = (maxRectangles === undefined) ? 3 : maxRectangles;
	
	Flixel.plugin.FlxRectangleButton.parent.constructor.apply(this, [x, y]);
	this.rect = new Array(maxRectangles);
	this._maxRect = maxRectangles;
	this._lastRect = 0;
};
extend(Flixel.plugin.FlxRectangleButton, Flixel.FlxSprite);


/**
 * This means the button has no finger on it.
 */
Flixel.plugin.FlxRectangleButton.STATUS_NORMAL = 0;
/**
 * This means the finger has just touched the button.
 */
Flixel.plugin.FlxRectangleButton.STATUS_JUST_PRESSED = 1;
/**
 * This means the finger is still pressing the button.
 */
Flixel.plugin.FlxRectangleButton.STATUS_PRESSED = 2;
/**
 * This means the finger has just removed from the button.
 */
Flixel.plugin.FlxRectangleButton.STATUS_JUST_RELEASED = 3;
/**
 * This means that the mouse is over the button but not pressing it (ONLY FOR DESKTOP).
 */
Flixel.plugin.FlxRectangleButton.STATUS_OVER = 4;
/**
 * Shows the current state of the button.
 */
Flixel.plugin.FlxRectangleButton.prototype.status = 0;
/**
 * The rectangle that holds the touchable area.
 * Manage at your OWN RISK!!!
 */
Flixel.plugin.FlxRectangleButton.prototype.rect = null;
/**
 * The last rectangle added.
 */
Flixel.plugin.FlxRectangleButton.prototype._lastRect = 0;
/**
 * The maximum rectangles that the button can hold.
 */
Flixel.plugin.FlxRectangleButton.prototype._maxRect = 0;
/**
 * The touched pointer id.
 */
Flixel.plugin.FlxRectangleButton.prototype._pointerId = 0;
/**
 * Basic button update logic
 */
Flixel.plugin.FlxRectangleButton.prototype.update = function()
{
	var touched =  false;
	for(var r = 0; r < this._lastRect && touched === false; r++) {
		// Figure out if the button is highlighted or pressed or what
		if (this.cameras === null)
			this.cameras = Flixel.FlxG.cameras;

		var camera;
		var i = 0;
		var l = this.cameras.length;
		var pointerId = 0;
		var totalPointers = Flixel.FlxG.mouse.activePointers + 1;
		var offAll = true;

		while (i < l) {
			camera = this.cameras[i++];
			while (pointerId < totalPointers) {
				Flixel.FlxG.mouse.getWorldPosition(camera, this._point, pointerId);
				if(this.rect[r].containsPoint(this._point.x, this._point.y)) {
					offAll = false;

					if (Flixel.FlxG.mouse.pressed(pointerId)) {
						this.status = Flixel.plugin.FlxRectangleButton.STATUS_PRESSED;
						if (Flixel.FlxG.mouse.justPressed(pointerId)) {
							this.status = Flixel.plugin.FlxRectangleButton.STATUS_JUST_PRESSED;
						}
						this._pointerId = pointerId;
					}
				}
				++pointerId;
			}
		}

		// Terminate the just released stuff
		if(this.status == Flixel.plugin.FlxRectangleButton.STATUS_JUST_RELEASED) {
			this.status = Flixel.plugin.FlxRectangleButton.STATUS_NORMAL;
		}

		// Check if we need to set the button as just released
		// We can have the mouse over the button and not being touching it
		if (offAll || (!offAll && !Flixel.FlxG.mouse.pressed(this._pointerId))) {
			if (this.status == Flixel.plugin.FlxRectangleButton.STATUS_PRESSED) {
				if (Flixel.FlxG.mouse.justReleased(this._pointerId))
					this.status = Flixel.plugin.FlxRectangleButton.STATUS_JUST_RELEASED;
				else
					this.status = Flixel.plugin.FlxRectangleButton.STATUS_NORMAL;
			}
		}

		// Then pick the appropriate frame of animation
		if (this.status == Flixel.plugin.FlxRectangleButton.STATUS_JUST_PRESSED || this.status == Flixel.plugin.FlxRectangleButton.STATUS_JUST_RELEASED)
			this.setFrame(Flixel.plugin.FlxRectangleButton.STATUS_NORMAL);
		else
			this.setFrame(status);
	}
};

/**
 * This method adds a new rectangle to the button rectangle array.
 */
Flixel.plugin.FlxRectangleButton.prototype.addRectangle = function(x, y, width, height)
{
	if(this._lastRect  < this._maxRect)
		this.rect[this._lastRect++] = new Flixel.FlxRect(x, y, width, height);	
};

/**
 * Overridden draw method
 */
Flixel.plugin.FlxRectangleButton.prototype.draw = function()
{
	if(Flixel.FlxG.visualDebug && !this.ignoreDrawDebug)
	{
		for (var i = 0; i < this._lastRect; i++) {
			var s = new Flixel.FlxSprite();
			s.makeGraphic(int(this.rect[i].width), int(this.rect[i].height), Flixel.FlxG.RED);
			s.x = this.rect[i].x;
			s.y = this.rect[i].y;
			s.draw();
		}
	}
	Flixel.plugin.FlxRectangleButton.parent.draw.apply(this);
};