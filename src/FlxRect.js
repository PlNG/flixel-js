/**
 * Stores a rectangle.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new rectangle.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 * @param Width
 *            Desired width of the rectangle.
 * @param Height
 *            Desired height of the rectangle.
 */
Flixel.FlxRect = function(X, Y, Width, Height)
{
	this.x = X || 0;
	this.y = Y || 0;
	this.width = Width || 0;
	this.height = Height || 0;
};


/**
 * The X coordinate of the point.
 */
Flixel.FlxRect.prototype.x = 0;
/**
 * The Y coordinate of the point.
 */
Flixel.FlxRect.prototype.y = 0;
/**
 * The width of the rectangle.
 */
Flixel.FlxRect.prototype.width = 0;
/**
 * The height of the rectangle.
 */
Flixel.FlxRect.prototype.height = 0;

/**
 * The X coordinate of the left side of the rectangle.  Read-only.
 */
Flixel.FlxRect.prototype.getLeft = function()
{
	return this.x;
};

/**
 * The X coordinate of the right side of the rectangle.  Read-only.
 */
Flixel.FlxRect.prototype.getRight = function()
{
	return this.x + this.width;
};

/**
 * The Y coordinate of the top of the rectangle.  Read-only.
 */
Flixel.FlxRect.prototype.getTop = function()
{
	return this.y;
};

/**
 * The Y coordinate of the bottom of the rectangle.  Read-only.
 */
Flixel.FlxRect.prototype.getBottom = function()
{
	return this.y + this.height;
};

/**
 * Instantiate a new rectangle.
 * 
 * @param	X		The X-coordinate of the point in space.
 * @param	Y		The Y-coordinate of the point in space.
 * @param	Width	Desired width of the rectangle.
 * @param	Height	Desired height of the rectangle.
 * 
 * @return	A reference to itself.
 */
Flixel.FlxRect.prototype.make = function(X, Y, Width, Height)
{
	this.x = X || 0;
	this.y = Y || 0;
	this.width = Width || 0;
	this.height = Height || 0;
	return this;
};

/**
 * Helper function, just copies the values from the specified rectangle.
 * 
 * @param	Rect	Any <code>FlxRect</code>.
 * 
 * @return	A reference to itself.
 */
Flixel.FlxRect.prototype.copyFrom = function(Rect)
{
	this.x = Rect.x;
	this.y = Rect.y;
	this.width = Rect.width;
	this.height = Rect.height;
	return this;
};

/**
 * Helper function, just copies the values from this rectangle to the specified rectangle.
 * 
 * @param	Point	Any <code>FlxRect</code>.
 * 
 * @return	A reference to the altered rectangle parameter.
 */
Flixel.FlxRect.prototype.copyTo = function(Rect)
{
	Rect.x = this.x;
	Rect.y = this.y;
	Rect.width = this.width;
	Rect.height = this.height;
	return Rect;
};

/**
 * Helper function, just copies the values from the specified Flash rectangle.
 * 
 * @param	FlashRect	Any <code>Rectangle</code>.
 * 
 * @return	A reference to itself.
 */
Flixel.FlxRect.prototype.copyFromFlash = function(FlashRect)
{
	this.x = FlashRect.x;
	this.y = FlashRect.y;
	this.width = FlashRect.width;
	this.height = FlashRect.height;
	return this;
};

/**
 * Helper function, just copies the values from this rectangle to the specified Flash rectangle.
 * 
 * @param	Point	Any <code>Rectangle</code>.
 * 
 * @return	A reference to the altered rectangle parameter.
 */
Flixel.FlxRect.prototype.copyToFlash = function(FlashRect)
{
	FlashRect.x = this.x;
	FlashRect.y = this.y;
	FlashRect.width = this.width;
	FlashRect.height = this.height;
	return FlashRect;
};

/**
 * Checks to see if some <code>FlxRect</code> object overlaps this <code>FlxRect</code> object.
 * 
 * @param	Rect	The rectangle being tested.
 * 
 * @return	Whether or not the two rectangles overlap.
 */
Flixel.FlxRect.prototype.overlaps = function(Rect)
{
	return (Rect.x + Rect.width > this.x) &&
			(Rect.x < this.x + this.width) &&
			(Rect.y + Rect.height > this.y) &&
			(Rect.y < this.y + this.height);
};

/**
 * Check if the given coordinates are contained in the rectangle.
 * 
 * @param x			The X coordinate.
 * @param y			The Y coordinate.
 */
Flixel.FlxRect.prototype.contains = function(X, Y)
{
	return (X > this.x) && (X < this.x + this.width) && (Y > this.y) && (Y < this.y + this.height);
};

/**
 * Check if the given coordinates are contained in the rectangle.
 * 
 * @param point			The point with the coordinates.
 */
Flixel.FlxRect.prototype.containsPoint = function(point)
{
	return this.contains(point.x, point.y);
};

/**
 * Check if the given rectangle is contained in the rectangle.
 * 
 * @param rect			The rectangle.
 */
Flixel.FlxRect.prototype.containsRect = function(rect)
{
	return this.contains(rect.x, rect.y) && this.contains(rect.x + rect.width, rect.y + rect.height);
};

/**
 * Returns the intersection of two rectangles.
 * 
 * @param toIntersect
 * @return
 */
Flixel.FlxRect.prototype.intersection = function(toIntersect)
{
	var containsTopLeft = this.containsPoint(new Flixel.FlxPoint(toIntersect.x, toIntersect.y));
	var containsBottomRight = this.containsPoint(new Flixel.FlxPoint(toIntersect.getRight(), toIntersect.getBottom()));
	
	if(containsTopLeft && containsBottomRight) {
		return new Flixel.FlxRect().copyFrom(toIntersect);
	} else if(containsTopLeft) {
		return new Flixel.FlxRect(this.x, this.y, this.getRight() - this.x, this.getBottom() - this.y);
	} else if(this.containsBottomRight) {
		return new Flixel.FlxRect(this.x, this.y, this.getRight() - this.x, this.getBottom() - this.y);
	} else {
		return new Flixel.FlxRect();
	}
};

/**
 * Check if two rectangles intersect.
 * 
 * @param toIntersect
 * @return
 */
Flixel.FlxRect.prototype.intersects = function(toIntersect)
{
	return this.containsPoint(new Flixel.FlxPoint(toIntersect.x, toIntersect.y)) || this.containsPoint(new Flixel.FlxPoint(toIntersect.getRight(), toIntersect.getBottom()));
};

/**
 * Check if the rectangle is empty.
 * @return
 */
Flixel.FlxRect.prototype.isEmpty = function()
{
	return this.width === 0.0 && this.height === 0.0;
};

/**
 * Returns the values in a printable format.
 * @return
 */
Flixel.FlxRect.prototype.print = function()
{
	return ("(x: " + this.x +  ", y:" + this.y + ", w: " + this.width +  ", h:" + this.height + ")");
};

/**
 * Adjusts the location of the rectangle object.
 * 
 * @param dx
 * @param dy
 */
Flixel.FlxRect.prototype.offset = function(dx, dy)
{
	this.x += dx;
	this.y += dy;
};

/**
 * Returns the class name.
 */
Flixel.FlxRect.prototype.toString = function()
{
	return "FlxRect";
};