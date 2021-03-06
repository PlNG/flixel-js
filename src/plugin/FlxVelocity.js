/**
 * FlxVelocity
 * -- Part of the Flixel Power Tools set
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Richard Davey / Photon Storm
 */

/**
 * Class constructor.
 */
Flixel.plugin.FlxVelocity = function()
{
};

/**
 * Sets the source FlxSprite x/y velocity so it will move directly towards the destination FlxSprite at the speed given (in pixels per second)<br>
 * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.<br>
 * Timings are approximate due to the way Flash timers work, and irrespective of SWF frame rate. Allow for a variance of +- 50ms.<br>
 * The source object doesn't stop moving automatically should it ever reach the destination coordinates.<br>
 * If you need the object to accelerate, see accelerateTowardsObject() instead Note: Doesn't take into account acceleration, maxVelocity or drag (if you set drag or acceleration too high this object
 * may not move at all)
 * 
 * @param source
 *            The FlxSprite on which the velocity will be set
 * @param dest
 *            The FlxSprite where the source object will move to
 * @param speed
 *            The speed it will move, in pixels per second (default is 60 pixels/sec)
 * @param maxTime
 *            Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the source will arrive at destination in the given number of ms
 */
Flixel.plugin.FlxVelocity.moveTowardsObject = function(source, dest, speed, maxTime)
{
	speed = (speed === undefined) ? 60 : speed;
	maxTime = (maxTime === undefined) ? 0 : maxTime;

	var a = Flixel.plugin.FlxVelocity.angleBetween(source, dest);

	if (maxTime > 0) {
		var d = Flixel.plugin.FlxVelocity.distanceBetween(source, dest);

		// We know how many pixels we need to move, but how fast?
		speed = d / (maxTime / 1000);
	}

	source.velocity.x = Math.cos(a) * speed;
	source.velocity.y = Math.sin(a) * speed;
};

/**
 * Sets the x/y acceleration on the source FlxSprite so it will move towards the destination FlxSprite at the speed given (in pixels per second)<br>
 * You must give a maximum speed value, beyond which the FlxSprite won't go any faster.<br>
 * If you don't need acceleration look at moveTowardsObject() instead.
 * 
 * @param source
 *            The FlxSprite on which the acceleration will be set
 * @param dest
 *            The FlxSprite where the source object will move towards
 * @param speed
 *            The speed it will accelerate in pixels per second
 * @param xSpeedMax
 *            The maximum speed in pixels per second in which the sprite can move horizontally
 * @param ySpeedMax
 *            The maximum speed in pixels per second in which the sprite can move vertically
 */
Flixel.plugin.FlxVelocity.accelerateTowardsObject = function(source, dest, speed, xSpeedMax, ySpeedMax)
{
	var a = Flixel.plugin.FlxVelocity.angleBetween(source, dest);

	source.velocity.x = 0;
	source.velocity.y = 0;

	source.acceleration.x = int(Math.cos(a) * speed);
	source.acceleration.y = int(Math.sin(a) * speed);

	source.maxVelocity.x = xSpeedMax;
	source.maxVelocity.y = ySpeedMax;
};

/**
 * Move the given FlxSprite towards the mouse pointer coordinates at a steady velocity If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the
 * destination in that number of seconds.<br>
 * Timings are approximate due to the way Flash timers work, and irrespective of SWF frame rate. Allow for a variance of +- 50ms.<br>
 * The source object doesn't stop moving automatically should it ever reach the destination coordinates.<br>
 * 
 * @param source
 *            The FlxSprite to move
 * @param speed
 *            The speed it will move, in pixels per second (default is 60 pixels/sec)
 * @param maxTime
 *            Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the source will arrive at destination in the given number of ms
 */
Flixel.plugin.FlxVelocity.moveTowardsMouse = function(source, speed, maxTime)
{
	speed = (speed === undefined) ? 60 : speed;
	maxTime = (maxTime === undefined) ? 0 : maxTime;

	var a = Flixel.plugin.FlxVelocity.angleBetweenMouse(source);

	if (maxTime > 0) {
		var d = Flixel.plugin.FlxVelocity.distanceToMouse(source);

		// We know how many pixels we need to move, but how fast?
		speed = d / (maxTime / 1000);
	}

	source.velocity.x = Math.cos(a) * speed;
	source.velocity.y = Math.sin(a) * speed;
};

/**
 * Sets the x/y acceleration on the source FlxSprite so it will move towards the mouse coordinates at the speed given (in pixels per second)<br>
 * You must give a maximum speed value, beyond which the FlxSprite won't go any faster.<br>
 * If you don't need acceleration look at moveTowardsMouse() instead.
 * 
 * @param source
 *            The FlxSprite on which the acceleration will be set
 * @param speed
 *            The speed it will accelerate in pixels per second
 * @param xSpeedMax
 *            The maximum speed in pixels per second in which the sprite can move horizontally
 * @param ySpeedMax
 *            The maximum speed in pixels per second in which the sprite can move vertically
 */
Flixel.plugin.FlxVelocity.accelerateTowardsMouse = function(source, speed, xSpeedMax, ySpeedMax)
{
	var a = Flixel.plugin.FlxVelocity.angleBetweenMouse(source);

	source.velocity.x = 0;
	source.velocity.y = 0;

	source.acceleration.x = int(Math.cos(a) * speed);
	source.acceleration.y = int(Math.sin(a) * speed);

	source.maxVelocity.x = xSpeedMax;
	source.maxVelocity.y = ySpeedMax;
};

/**
 * Sets the x/y velocity on the source FlxSprite so it will move towards the target coordinates at the speed given (in pixels per second)<br>
 * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.<br>
 * Timings are approximate due to the way Flash timers work, and irrespective of SWF frame rate. Allow for a variance of +- 50ms.<br>
 * The source object doesn't stop moving automatically should it ever reach the destination coordinates.<br>
 * 
 * @param source
 *            The FlxSprite to move
 * @param target
 *            The FlxPoint coordinates to move the source FlxSprite towards
 * @param speed
 *            The speed it will move, in pixels per second (default is 60 pixels/sec)
 * @param maxTime
 *            Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the source will arrive at destination in the given number of ms
 */
Flixel.plugin.FlxVelocity.moveTowardsPoint = function(source, target, speed, maxTime)
{
	speed = (speed === undefined) ? 60 : speed;
	maxTime = (maxTime === undefined) ? 0 : maxTime;

	var a = Flixel.plugin.FlxVelocity.angleBetweenPoint(source, target);

	if (maxTime > 0) {
		var d = Flixel.plugin.FlxVelocity.distanceToPoint(source, target);

		// We know how many pixels we need to move, but how fast?
		speed = d / (maxTime / 1000);
	}

	source.velocity.x = Math.cos(a) * speed;
	source.velocity.y = Math.sin(a) * speed;
};

/**
 * Sets the x/y acceleration on the source FlxSprite so it will move towards the target coordinates at the speed given (in pixels per second)<br>
 * You must give a maximum speed value, beyond which the FlxSprite won't go any faster.<br>
 * If you don't need acceleration look at moveTowardsPoint() instead.
 * 
 * @param source
 *            The FlxSprite on which the acceleration will be set
 * @param target
 *            The FlxPoint coordinates to move the source FlxSprite towards
 * @param speed
 *            The speed it will accelerate in pixels per second
 * @param xSpeedMax
 *            The maximum speed in pixels per second in which the sprite can move horizontally
 * @param ySpeedMax
 *            The maximum speed in pixels per second in which the sprite can move vertically
 */
Flixel.plugin.FlxVelocity.accelerateTowardsPoint = function(source, target, speed, xSpeedMax, ySpeedMax)
{
	var a = Flixel.plugin.FlxVelocity.angleBetweenPoint(source, target);

	source.velocity.x = 0;
	source.velocity.y = 0;

	source.acceleration.x = int(Math.cos(a) * speed);
	source.acceleration.y = int(Math.sin(a) * speed);

	source.maxVelocity.x = xSpeedMax;
	source.maxVelocity.y = ySpeedMax;
};

/**
 * Find the distance (in pixels, rounded) between two FlxSprites, taking their origin into account
 * 
 * @param a
 *            The first FlxSprite
 * @param b
 *            The second FlxSprite
 * @return int Distance (in pixels)
 */
Flixel.plugin.FlxVelocity.distanceBetween = function(a, b)
{
	var dx = (a.x + a.origin.x) - (b.x + b.origin.x);
	var dy = (a.y + a.origin.y) - (b.y + b.origin.y);

	return int(Flixel.plugin.FlxMath.vectorLength(dx, dy));
};

/**
 * Find the distance (in pixels, rounded) from an FlxSprite to the given FlxPoint, taking the source origin into account
 * 
 * @param a
 *            The first FlxSprite
 * @param target
 *            The FlxPoint
 * @return int Distance (in pixels)
 */
Flixel.plugin.FlxVelocity.distanceToPoint = function(a, target)
{
	var dx = (a.x + a.origin.x) - (target.x);
	var dy = (a.y + a.origin.y) - (target.y);

	return int(Flixel.plugin.FlxMath.vectorLength(dx, dy));
};

/**
 * Find the distance (in pixels, rounded) from the object x/y and the mouse x/y
 * 
 * @param a
 *            The FlxSprite to test against
 * @return int The distance between the given sprite and the mouse coordinates
 */
Flixel.plugin.FlxVelocity.distanceToMouse = function(a)
{
	var dx = (a.x + a.origin.x) - Flixel.FlxG.mouse.screenX;
	var dy = (a.y + a.origin.y) - Flixel.FlxG.mouse.screenY;

	return int(Flixel.plugin.FlxMath.vectorLength(dx, dy));
};

/**
 * Find the angle (in radians) between an FlxSprite and an FlxPoint. The source sprite takes its x/y and origin into account. The angle is calculated in clockwise positive direction (down = 90 degrees
 * positive, right = 0 degrees positive, up = 90 degrees negative)
 * 
 * @param a
 *            The FlxSprite to test from
 * @param target
 *            The FlxPoint to angle the FlxSprite towards
 * @param asDegrees
 *            If you need the value in degrees instead of radians, set to true
 * 
 * @return Number The angle (in radians unless asDegrees is true)
 */
Flixel.plugin.FlxVelocity.angleBetweenPoint = function(a, target, asDegrees)
{
	var dx = (target.x) - (a.x + a.origin.x);
	var dy = (target.y) - (a.y + a.origin.y);

	if (asDegrees) {
		return Flixel.plugin.FlxMath.asDegrees(Math.atan2(dy, dx));
	} else {
		return Math.atan2(dy, dx);
	}
};

/**
 * Find the angle (in radians) between the two FlxSprite, taking their x/y and origin into account. The angle is calculated in clockwise positive direction (down = 90 degrees positive, right = 0
 * degrees positive, up = 90 degrees negative)
 * 
 * @param a
 *            The FlxSprite to test from
 * @param b
 *            The FlxSprite to test to
 * @param asDegrees
 *            If you need the value in degrees instead of radians, set to true
 * 
 * @return Number The angle (in radians unless asDegrees is true)
 */
Flixel.plugin.FlxVelocity.angleBetween = function(a, b, asDegrees)
{
	var dx = (b.x + b.origin.x) - (a.x + a.origin.x);
	var dy = (b.y + b.origin.y) - (a.y + a.origin.y);

	if (asDegrees) {
		return Flixel.plugin.FlxMath.asDegrees(Math.atan2(dy, dx));
	} else {
		return Math.atan2(dy, dx);
	}
};

/**
 * Given the angle and speed calculate the velocity and return it as an FlxPoint
 * 
 * @param angle
 *            The angle (in degrees) calculated in clockwise positive direction (down = 90 degrees positive, right = 0 degrees positive, up = 90 degrees negative)
 * @param speed
 *            The speed it will move, in pixels per second sq
 * 
 * @return An FlxPoint where FlxPoint.x contains the velocity x value and FlxPoint.y contains the velocity y value
 */
Flixel.plugin.FlxVelocity.velocityFromAngle = function(angle, speed)
{
	var a = Flixel.plugin.FlxMath.asRadians(angle);

	var result = new Flixel.FlxPoint();

	result.x = int(Math.cos(a) * speed);
	result.y = int(Math.sin(a) * speed);

	return result;
};

/**
 * Given the FlxSprite and speed calculate the velocity and return it as an FlxPoint based on the direction the sprite is facing
 * 
 * @param parent
 *            The FlxSprite to get the facing value from
 * @param speed
 *            The speed it will move, in pixels per second sq
 * 
 * @return An FlxPoint where FlxPoint.x contains the velocity x value and FlxPoint.y contains the velocity y value
 */
Flixel.plugin.FlxVelocity.velocityFromFacing = function(parent, speed)
{
	var a = 0;

	if (parent.getFacing() == Flixel.FlxObject.LEFT) {
		a = Flixel.plugin.FlxMath.asRadians(180);
	} else if (parent.getFacing() == Flixel.FlxObject.RIGHT) {
		a = Flixel.plugin.FlxMath.asRadians(0);
	} else if (parent.getFacing() == Flixel.FlxObject.UP) {
		a = Flixel.plugin.FlxMath.asRadians(-90);
	} else if (parent.getFacing() == Flixel.FlxObject.DOWN) {
		a = Flixel.plugin.FlxMath.asRadians(90);
	}

	var result = new Flixel.FlxPoint();

	result.x = int(Math.cos(a) * speed);
	result.y = int(Math.sin(a) * speed);

	return result;
};

/**
 * Find the angle (in radians) between an FlxSprite and the mouse, taking their x/y and origin into account. The angle is calculated in clockwise positive direction (down = 90 degrees positive, right =
 * 0 degrees positive, up = 90 degrees negative)
 * 
 * @param a
 *            The FlxObject to test from
 * @param asDegrees
 *            If you need the value in degrees instead of radians, set to true
 * 
 * @return Number The angle (in radians unless asDegrees is true)
 */
Flixel.plugin.FlxVelocity.angleBetweenMouse = function(a, asDegrees)
{
	// In order to get the angle between the object and mouse, we need the objects screen coordinates (rather than world coordinates)
	var p = a.getScreenXY();

	var dx = Flixel.FlxG.mouse.screenX - p.x;
	var dy = Flixel.FlxG.mouse.screenY - p.y;

	if (asDegrees) {
		return Flixel.plugin.FlxMath.asDegrees(Math.atan2(dy, dx));
	} else {
		return Math.atan2(dy, dx);
	}
};