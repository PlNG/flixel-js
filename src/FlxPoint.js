/**
 * Stores a 2D floating point coordinate.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new point object.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 */
Flixel.FlxPoint = function(X, Y)
{
	this.x = X || 0;
	this.y = Y || 0;
};

/**
 * Constant to convert degree angles into radial angles.
 */
Flixel.FlxPoint.TO_RADIANS = (1 / 180.0) * Math.PI;
/**
 * Constant to convert radial angles into degree angles.
 */
Flixel.FlxPoint.TO_DEGREES = (1 / Math.PI) * 180;
/**
 * The X coordinate of the point.
 */
Flixel.FlxPoint.prototype.x = null;
/**
 * The Y coordinate of the point.
 */
Flixel.FlxPoint.prototype.y = null;

/**
 * Instantiate a new point object.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 */
Flixel.FlxPoint.prototype.make = function(X, Y)
{
	this.x = X || 0;
	this.y = Y || 0;
	return this;
};

/**
 * Helper function, just copies the values from the specified point.
 * 
 * @param Point
 *            Any <code>FlxPoint</code>.
 * 
 * @return A reference to itself.
 */
Flixel.FlxPoint.prototype.copyFrom = function(Point)
{
	this.x = Point.x;
	this.y = Point.y;
	return this;
};

/**
 * Helper function, just copies the values from this point to the
 * specified point.
 * 
 * @param Point
 *            Any <code>FlxPoint</code>.
 * 
 * @return A reference to the altered point parameter.
 */
Flixel.FlxPoint.prototype.copyTo = function(Point)
{
	Point.x = this.x;
	Point.y = this.y;
	return Point;
};

/**
 * Helper function, just copies the values from the specified Flash
 * point.
 * 
 * @param Point
 *            Any <code>Point</code>.
 * 
 * @return A reference to itself.
 */
Flixel.FlxPoint.prototype.copyFromFlash = function(FlashPoint)
{
	this.x = FlashPoint.x;
	this.y = FlashPoint.y;
	return this;
};

/**
 * Helper function, just copies the values from this point to the
 * specified Flash point.
 * 
 * @param Point
 *            Any <code>Point</code>.
 * 
 * @return A reference to the altered point parameter.
 */
Flixel.FlxPoint.prototype.copyToFlash = function(FlashPoint)
{
	FlashPoint.x = this.x;
	FlashPoint.y = this.y;
	return FlashPoint;
};

/**
 * This method add to its coordinates the X and Y values passed.
 * 
 * @param x
 *            The X coordinate.
 * @param y
 *            The Y coordinate.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.add = function(X, Y)
{
	this.x += X;
	this.y += Y;
	return this;
};

/**
 * This method add to its coordinates the vector passed coordinates.
 * 
 * @param other
 *            The vector to add with.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.addPoint = function(other)
{
	this.x += other.x;
	this.y += other.y;
	return this;
};

/**
 * This method sub to its coordinates the X and Y values passed.
 * 
 * @param x
 *            The X coordinate.
 * @param y
 *            The Y coordinate.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.sub = function(X, Y)
{
	this.x -= X;
	this.y -= Y;
	return this;
};

/**
 * This method sub to its coordinates the vector passed coordinates.
 * 
 * @param other
 *            The vector to sub with.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.subPoint = function(other)
{
	this.x -= other.x;
	this.y -= other.y;
	return this;
};

/**
 * This method multiply a vector for a scalar value.
 * 
 * @param scalar
 *            The scalar number we want to multiply with.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.mul = function(scalar)
{
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

/**
 * This method calculates the length of the vector.
 * 
 * @return The length of the vector.
 */
Flixel.FlxPoint.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * This method normalizes the vector to unit length.
 * 
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.normalize = function()
{
	var length = this.length();
	if (length !== 0) {
		this.x /= length;
		this.y /= length;
	}
	return this;
};

/**
 * This method normalizes the vector to unit length.
 * 
 * @param length
 *            The length to normalize with.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.normalizeScaled = function(scale)
{
	var length = this.length();
	
	if (length !== 0.0) {
		this.x = this.x / length * scale;
		this.y = this.y / length * scale;
	}
	return this;
};

/**
 * This method calculates the angle between the X and Y coordinates.
 * 
 * @return The angle between X and Y.
 */
Flixel.FlxPoint.prototype.angleXY = function()
{
	var angle = Math.atan2(this.y, this.x) * Flixel.FlxPoint.TO_DEGREES;
	if (angle < 0)
		angle += 360;
	return angle;
};

/**
 * This method calculates the angle between the vector and the given
 * vector.
 * 
 * @return The angle between X and Y.
 */
Flixel.FlxPoint.prototype.angle = function(other)
{
	var aux = this.copyFrom(this);
	aux.subPoint(other);
	return aux.angleXY();
};

/**
 * This method rotates the vector X coordinate by a given amount of
 * angles.
 * 
 * @param angle
 *            The amount we want to rotate the angle.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.rotateX = function(angle)
{
	var rad = angle * Flixel.FlxPoint.TO_RADIANS;
	var cos = Math.cos(rad);
	var sin = Math.sin(rad);
	var newX = this.x * cos - this.y * sin;
	this.x = newX;
	return this;
};

/**
 * This method rotates the vector Y coordinate by a given amount of
 * angles.
 * 
 * @param angle
 *            The amount we want to rotate the angle.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.rotateY = function(angle)
{
	var rad = angle * Flixel.FlxPoint.TO_RADIANS;
	var cos = Math.cos(rad);
	var sin = Math.sin(rad);
	var newY = this.x * sin + this.y * cos;
	this.y = newY;
	return this;
};

/**
 * This method rotates the vector by a given amount of angles.
 * 
 * @param angle
 *            The amount we want to rotate the angle.
 * @return The vector itself.
 */
Flixel.FlxPoint.prototype.rotate = function(angle)
{
	var rad = angle * Flixel.FlxPoint.TO_RADIANS;
	var cos = Math.cos(rad);
	var sin = Math.sin(rad);
	this.make(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	return this;
};

/**
 * This method calculates the distance between the vector and the given
 * vector.
 * 
 * @param other
 *            The vector to calculate the distance with.
 * @return The distance.
 */
Flixel.FlxPoint.prototype.distToPoint = function(other)
{
	var distX = this.x - other.x;
	var distY = this.y - other.y;
	return Math.sqrt(distX * distX + distY * distY);
};

/**
 * This method calculates the distance between the vector and (0, 0).
 * 
 * @return The distance.
 */
Flixel.FlxPoint.prototype.distToZero = function()
{
	return this.distToPoint(Flixel.FlxObject.pointZero);
};

/**
 * This method calculates the distance between the vector and the given
 * coordinates.
 * 
 * @param x
 *            The X coordinate.
 * @param y
 *            The Y coordinate.
 * @return The distance.
 */
Flixel.FlxPoint.prototype.dist = function(X, Y)
{
	var distX = this.x - X;
	var distY = this.y - Y;
	return Math.sqrt(distX * distX + distY * distY);
};

/**
 * This method calculates the distance between the vector and other
 * vector. This method returns the distance Squared.
 * 
 * @param other
 *            The vector to calculate the distance with.
 * @return The distance squared.
 */
Flixel.FlxPoint.prototype.distSquaredToPoint = function(other)
{
	var distX = this.x - other.x;
	var distY = this.y - other.y;
	return distX * distX + distY * distY;
};

/**
 * This method calculates the distance between the vector and the given
 * X and Y coordinates. This method returns the distance Squared.
 * 
 * @param x
 *            The X coordinate.
 * @param y
 *            The Y coordinate.
 * @return The distance squared.
 */
Flixel.FlxPoint.prototype.distSquared = function(X, Y)
{
	var distX = this.x - X;
	var distY = this.y - Y;
	return distX * distX + distY * distY;
};

/**
 * Handy method to redirect the set to the copy method.
 */
Flixel.FlxPoint.prototype.setFromPoint = function(localPoint)
{
	return this.copyFrom(localPoint);
};

/**
 * Handy method to redirect the set to the make method.
 */
Flixel.FlxPoint.prototype.set = function(X, Y)
{
	return this.make(X, Y);
};

/**
 * Returns the values in a printable format.
 * 
 * @return
 */
Flixel.FlxPoint.prototype.print = function()
{
	return ("(" + this.x + ", " + this.y + ")");
};

/**
 * Equals method for points.
 */
Flixel.FlxPoint.prototype.equalsToPoint = function(point)
{
	return (point.x == this.x && point.y == this.y);
};

/**
 * Equals method for points.
 */
Flixel.FlxPoint.prototype.equals = function(X, Y)
{
	return (X == this.x && Y == this.y);
};

/**
 * Returns the class name.
 */
Flixel.FlxPoint.prototype.toString = function()
{
	return "FlxPoint";
};