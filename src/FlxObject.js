/**
 * This is the base class for most of the display objects<br>
 * (<code>FlxSprite</code>, <code>FlxText</code>, etc).<br>
 * It includes some basic attributes about game objects,<br>
 * including retro-style flickering, basic state information,<br>
 * sizes, scrolling, and basic physics and motion.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author	Adam Atomic
 */

/**
 * Instantiates a <code>FlxObject</code>.
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
Flixel.FlxObject = function(X, Y, Width, Height)
{
	Flixel.FlxObject.parent.constructor.apply(this);
	
	this.x = X || 0;
	this.y = Y || 0;
	this.last = new Flixel.FlxPoint(this.x, this.y);
	this.width = Width || 0;
	this.height = Height || 0;
	this.mass = 1.0;
	this.elasticity = 0.0;

	this.health = 1;

	this.immovable = false;
	this.immovableX = false;
	this.immovableY = false;
	this.moves = true;

	this.touching = Flixel.FlxObject.NONE;
	this.wasTouching = Flixel.FlxObject.NONE;
	this.allowCollisions = Flixel.FlxObject.ANY;

	this.velocity = new Flixel.FlxPoint();
	this.acceleration = new Flixel.FlxPoint();
	this.drag = new Flixel.FlxPoint();
	this.maxVelocity = new Flixel.FlxPoint(10000, 10000);
	this.steerForce = new Flixel.FlxPoint();

	this.angle = 0;
	this.angularVelocity = 0;
	this.angularAcceleration = 0;
	this.angularDrag = 0;
	this.maxAngular = 10000;

	this.scrollFactor = new Flixel.FlxPoint(1.0, 1.0);
	this._flicker = false;
	this._flickerTimer = 0;

	this._point = new Flixel.FlxPoint();
	this._rect = new Flixel.FlxRect();

	this.path = null;
	this.pathSpeed = 0;
	this.pathAngle = 0;

	this._seeked = null;
};

extend(Flixel.FlxObject, Flixel.FlxBasic);


/**
 * Generic value for "left" Used by <code>facing</code>,
 * <code>allowCollisions</code>, and <code>touching</code>.
 */
Flixel.FlxObject.LEFT = 0x000100;
/**
 * Generic value for "right" Used by <code>facing</code>,
 * <code>allowCollisions</code>, and <code>touching</code>.
 */
Flixel.FlxObject.RIGHT = 0x001000;
/**
 * Generic value for "up" Used by <code>facing</code>,
 * <code>allowCollisions</code>, and <code>touching</code>.
 */
Flixel.FlxObject.UP = 0x010000;
/**
 * Generic value for "down" Used by <code>facing</code>,
 * <code>allowCollisions</code>, and <code>touching</code>.
 */
Flixel.FlxObject.DOWN = 0x100000;
/**
 * Special-case constant meaning no collisions, used mainly by
 * <code>allowCollisions</code> and <code>touching</code>.
 */
Flixel.FlxObject.NONE = 0;
/**
 * Special-case constant meaning up, used mainly by <code>allowCollisions</code>
 * and <code>touching</code>.
 */
Flixel.FlxObject.CEILING = Flixel.FlxObject.UP;
/**
 * Special-case constant meaning down, used mainly by
 * <code>allowCollisions</code> and <code>touching</code>.
 */
Flixel.FlxObject.FLOOR = Flixel.FlxObject.DOWN;
/**
 * Special-case constant meaning only the left and right sides, used mainly by
 * <code>allowCollisions</code> and <code>touching</code>.
 */
Flixel.FlxObject.WALL = Flixel.FlxObject.LEFT | Flixel.FlxObject.RIGHT;
/**
 * Special-case constant meaning any direction, used mainly by
 * <code>allowCollisions</code> and <code>touching</code>.
 */
Flixel.FlxObject.ANY = Flixel.FlxObject.LEFT | Flixel.FlxObject.RIGHT | Flixel.FlxObject.UP | Flixel.FlxObject.DOWN;
/**
 * Handy constant used during collision resolution (see <code>separateX()</code>
 * and <code>separateY()</code>).
 */
Flixel.FlxObject.OVERLAP_BIAS = 4;
/**
 * Path behavior controls: move from the start of the path to the end then stop.
 */
Flixel.FlxObject.PATH_FORWARD = 0x000000;
/**
 * Path behavior controls: move from the end of the path to the start then stop.
 */
Flixel.FlxObject.PATH_BACKWARD = 0x000001;
/**
 * Path behavior controls: move from the start of the path to the end then
 * directly back to the start, and start over.
 */
Flixel.FlxObject.PATH_LOOP_FORWARD = 0x000010;
/**
 * Path behavior controls: move from the end of the path to the start then
 * directly back to the end, and start over.
 */
Flixel.FlxObject.PATH_LOOP_BACKWARD = 0x000100;
/**
 * Path behavior controls: move from the start of the path to the end then turn
 * around and go back to the start, over and over.
 */
Flixel.FlxObject.PATH_YOYO = 0x001000;
/**
 * Path behavior controls: ignores any vertical component to the path data, only
 * follows side to side.
 */
Flixel.FlxObject.PATH_HORIZONTAL_ONLY = 0x010000;
/**
 * Path behavior controls: ignores any horizontal component to the path data,
 * only follows up and down.
 */
Flixel.FlxObject.PATH_VERTICAL_ONLY = 0x100000;

// ====================//
// NON STATIC ATTRIBUTES //
// ====================//
/**
 * X position of the upper left corner of this object in world space.
 */
Flixel.FlxObject.prototype.x = 0;
/**
 * Y position of the upper left corner of this object in world space.
 */
Flixel.FlxObject.prototype.y = 0;
/**
 * The width of this object.
 */
Flixel.FlxObject.prototype.width = 0;
/**
 * The height of this object.
 */
Flixel.FlxObject.prototype.height = 0;
/**
 * Whether an object will move/alter position after a collision.
 */
Flixel.FlxObject.prototype.immovable = false;
/**
 * Whether an object will move/alter position after a collision in the X.
 */
Flixel.FlxObject.prototype.immovableX = false;
/**
 * Whether an object will move/alter position after a collision in the Y axis.
 */
Flixel.FlxObject.prototype.immovableY = false;
/**
 * The basic speed of this object.
 */
Flixel.FlxObject.prototype.velocity = null;
/**
 * The virtual mass of the object. Default value is 1. Currently only used with
 * <code>elasticity</code> during collision resolution. Change at your own
 * risk; effects seem crazy unpredictable so far!
 */
Flixel.FlxObject.prototype.mass = 0;
/**
 * The bounciness of this object. Only affects collisions. Default value is 0,
 * or "not bouncy at all."
 */
Flixel.FlxObject.prototype.elasticity = 0;
/**
 * How fast the speed of this object is changing. Useful for smooth movement and
 * gravity.
 */
Flixel.FlxObject.prototype.acceleration = null;
/**
 * This isn't drag exactly, more like deceleration that is only applied when
 * acceleration is not affecting the sprite.
 */
Flixel.FlxObject.prototype.drag = null;
/**
 * If you are using <code>acceleration</code>, you can use
 * <code>maxVelocity</code> with it to cap the speed automatically (very
 * useful!).
 */
Flixel.FlxObject.prototype.maxVelocity = null;
/**
 * Set the angle of a sprite to rotate it. WARNING: rotating sprites decreases
 * rendering performance for this sprite by a factor of 10x!
 */
Flixel.FlxObject.prototype.angle = 0;
/**
 * This is how fast you want this sprite to Flxn.
 */
Flixel.FlxObject.prototype.angularVelocity = 0;
/**
 * How fast the Flxn speed should change.
 */
Flixel.FlxObject.prototype.angularAcceleration = 0;
/**
 * Like <code>drag</code> but for Flxnning.
 */
Flixel.FlxObject.prototype.angularDrag = 0;
/**
 * Use in conjunction with <code>angularAcceleration</code> for fluid Flxn
 * speed control.
 */
Flixel.FlxObject.prototype.maxAngular = 0;
/**
 * Should always represent (0,0) - useful for different things, for avoiding
 * unnecessary <code>new</code> calls.
 */
Flixel.FlxObject.pointZero = new Flixel.FlxPoint();
/**
 * A point that can store numbers from 0 to 1 (for X and Y independently) that
 * governs how much this object is affected by the camera subsystem. 0 means it
 * never moves, like a HUD element or far background graphic. 1 means it scrolls
 * along a the same speed as the foreground layer. scrollFactor is initialized
 * as (1,1) by default.
 */
Flixel.FlxObject.prototype.scrollFactor = null;
/**
 * Internal helper used for retro-style flickering.
 */
Flixel.FlxObject.prototype._flicker = 0;
/**
 * Internal helper used for retro-style flickering.
 */
Flixel.FlxObject.prototype._flickerTimer = 0;
/**
 * Handy for storing health percentage or armor points or whatever.
 */
Flixel.FlxObject.prototype.health = 0;
/**
 * This is just a pre-allocated x-y point container to be used however you like
 */
Flixel.FlxObject.prototype._point = null;
/**
 * This is just a pre-allocated rectangle container to be used however you like
 */
Flixel.FlxObject.prototype._rect = null;
/**
 * Set this to false if you want to skip the automatic motion/movement stuff
 * (see <code>updateMotion()</code>). FlxObject and FlxSprite default to
 * true. FlxText, FlxTileblock, and FlxTilemap default to false.
 */
Flixel.FlxObject.prototype.moves = false;
/**
 * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface
 * contacts. Use bitwise operators to check the values stored here, or use
 * touching(), justStartedTouching(), etc. You can even use them broadly as
 * boolean values if you're feeling saucy!
 */
Flixel.FlxObject.prototype.touching = 0;
/**
 * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface
 * contacts from the previous game loop step. Use bitwise operators to check the
 * values stored here, or use touching(), justStartedTouching(), etc. You can
 * even use them broadly as boolean values if you're feeling saucy!
 */
Flixel.FlxObject.prototype.wasTouching = 0;
/**
 * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating collision
 * directions. Use bitwise operators to check the values stored here. Useful for
 * things like one-way platforms (e.g. allowCollisions = UP;) The accessor
 * "solid" just flips this variable between NONE and ANY.
 */
Flixel.FlxObject.prototype.allowCollisions = 0;		
/**
 * Important variable for collision processing. By default this value is set
 * automatically during <code>preUpdate()</code>.
 */
Flixel.FlxObject.prototype.last = null;
/**
 * A reference to a path object. Null by default, assigned by
 * <code>followPath()</code>.
 */
Flixel.FlxObject.prototype.path = null;
/**
 * The speed at which the object is moving on the path. When an object completes
 * a non-looping path circuit, the pathSpeed will be zeroed out, but the
 * <code>path</code> reference will NOT be nulled out. So
 * <code>pathSpeed</code> is a good way to check if this object is currently
 * following a path or not.
 */
Flixel.FlxObject.prototype.pathSpeed = 0;
/**
 * The angle in degrees between this object and the next node, where 0 is
 * directly upward, and 90 is to the right.
 */
Flixel.FlxObject.prototype.pathAngle = 0;
/**
 * Internal helper, tracks which node of the path this object is moving toward.
 */
Flixel.FlxObject.prototype._pathNodeIndex = 0;
/**
 * Internal tracker for path behavior flags (like looping, horizontal only,
 * etc).
 */
Flixel.FlxObject.prototype._pathMode = 0;
/**
 * Internal helper for node navigation, specifically yo-yo and backwards
 * movement.
 */
Flixel.FlxObject.prototype._pathInc = 0;
/**
 * Internal flag for whether the object's angle should be adjusted to the path
 * angle during path follow behavior.
 */
Flixel.FlxObject.prototype._pathRotate = null;
/**
 * The object you are seeking.
 */
Flixel.FlxObject.prototype._seeked = null;
/**
 * The force of the seeker.
 */
Flixel.FlxObject.prototype.steerForce = null;



/**
 * Override this function to null out variables or manually call destroy() on
 * class members if necessary. Don't forget to call super.destroy()!
 */
Flixel.FlxObject.prototype.destroy = function()
{
	this.velocity = null;
	this.acceleration = null;
	this.drag = null;
	this.maxVelocity = null;
	this.scrollFactor = null;
	this._point = null;
	this._rect = null;
	this.last = null;
	this.cameras = null;
	if(this.path !== null)
		this.path.destroy();
	this.path = null;
	this._seeked = null;

	Flixel.FlxObject.parent.destroy.apply(this);
};

/**
 * Pre-update is called right before <code>update()</code> on each object in
 * the game loop. In <code>FlxObject</code> it controls the flicker timer,
 * tracking the last coordinates for collision purposes, and checking if the
 * object is moving along a path or not.
 */
Flixel.FlxObject.prototype.preUpdate = function()
{
	Flixel.FlxBasic.ACTIVECOUNT++;
	
	if(this._flickerTimer !== 0) {
		this._flicker = !this._flicker;
		if(this._flickerTimer > 0) {
			this._flickerTimer = this._flickerTimer - Flixel.FlxG.elapsed;
			if(this._flickerTimer <= 0) {
				this._flickerTimer = 0;
				this._flicker = false;
			}
		}
	}
	
	this.last.x = this.x;
	this.last.y = this.y;
	
	if((this.path !== null) && (this.pathSpeed !== 0) && (this.path.nodes[this._pathNodeIndex] !== null))
		this.updatePathMotion();

	if(this._seeked !== null)
		this.updateSeekMotion();
};

/**
 * Post-update is called right after <code>update()</code> on each object in
 * the game loop. In <code>FlxObject</code> this function handles integrating
 * the objects motion based on the velocity and acceleration settings, and
 * tracking/clearing the <code>touching</code> flags.
 */
Flixel.FlxObject.prototype.postUpdate = function()
{
	if(this.moves)
		this.updateMotion();
	
	this.wasTouching = this.touching;
	this.touching = Flixel.FlxObject.NONE;
};

/**
 * Internal function for updating the position and speed of this object. Useful
 * for cases when you need to update this but are buried down in too many
 * supers. Does a slightly fancier-than-normal integration to help with higher
 * fidelity framerate-independenct motion.
 */
Flixel.FlxObject.prototype.updateMotion = function()
{
	var delta = 0;
	var velocityDelta = 0;

	velocityDelta = (Flixel.FlxU.computeVelocity(this.angularVelocity, this.angularAcceleration, this.angularDrag, this.maxAngular) - this.angularVelocity)/2;
	this.angularVelocity += velocityDelta; 
	this.angle += this.angularVelocity * Flixel.FlxG.elapsed;
	this.angularVelocity += velocityDelta;
	
	velocityDelta = (Flixel.FlxU.computeVelocity(this.velocity.x, this.acceleration.x, this.drag.x, this.maxVelocity.x) - this.velocity.x)/2;
	this.velocity.x += velocityDelta;
	delta = this.velocity.x * Flixel.FlxG.elapsed;
	this.velocity.x += velocityDelta;
	this.x += delta;
	
	velocityDelta = (Flixel.FlxU.computeVelocity(this.velocity.y, this.acceleration.y, this.drag.y, this.maxVelocity.y) - this.velocity.y)/2;
	this.velocity.y += velocityDelta;
	delta = this.velocity.y * Flixel.FlxG.elapsed;
	this.velocity.y += velocityDelta;
	this.y += delta;
};

/**
 * Rarely called, and in this case just increments the visible objects count and
 * calls <code>drawDebug()</code> if necessary.
 */
Flixel.FlxObject.prototype.draw = function()
{
	var camera = Flixel.FlxG.activeCamera;

	if(this.cameras === null)
		this.cameras = Flixel.FlxG.cameras;
	if(this.cameras.indexOf(camera) == -1)
		return;
	
	if(!this.onScreen(camera))
		return;
	Flixel.FlxBasic.VISIBLECOUNT++;
	if(Flixel.FlxG.visualDebug && !this.ignoreDrawDebug)
		this.drawDebug(camera);
};

/**
 * Override this function to draw custom "debug mode" graphics to the specified
 * camera while the debugger's visual mode is toggled on.
 * 
 * @param Camera
 *            Which camera to draw the debug visuals to.
 */
Flixel.FlxObject.prototype.drawDebug = function(Camera)
{
	Camera = Camera || Flixel.FlxG.camera;

	// get bounding box coordinates
	var boundingBoxX = this.x - int(Camera.scroll.x * this.scrollFactor.x); // copied
																					// from
																					// getScreenXY()
	var boundingBoxY = this.y - int(Camera.scroll.y * this.scrollFactor.y);
	boundingBoxX = int(boundingBoxX + ((boundingBoxX > 0)?0.0000001:-0.0000001));
	boundingBoxY = int(boundingBoxY + ((boundingBoxY > 0)?0.0000001:-0.0000001));
	var boundingBoxWidth = (this.width != int(this.width)) ? this.width : this.width-1;
	var boundingBoxHeight = (this.height != int(this.height)) ? this.height : this.height-1;

	// fill static graphics object with square shape
	var gfx = Flixel.FlxG.flashGfx;
	gfx.clear();
	gfx.moveTo(boundingBoxX,boundingBoxY);
	var boundingBoxColor;
	if(this.allowCollisions)
	{
		if(this.allowCollisions != Flixel.FlxObject.ANY)
			boundingBoxColor = Flixel.FlxG.PINK;
		if(this.immovable)
			boundingBoxColor = Flixel.FlxG.GREEN;
		else
			boundingBoxColor = Flixel.FlxG.RED;
	}
	else
		boundingBoxColor = Flixel.FlxG.BLUE;
	gfx.lineStyle(1, boundingBoxColor, 0.5);
	gfx.lineTo(boundingBoxX + boundingBoxWidth, boundingBoxY);
	gfx.lineTo(boundingBoxX + boundingBoxWidth, boundingBoxY + boundingBoxHeight);
	gfx.lineTo(boundingBoxX, boundingBoxY + boundingBoxHeight);
	gfx.lineTo(boundingBoxX, boundingBoxY);
	
	// draw graphics shape to camera buffer
	Camera.buffer.draw(Flixel.FlxG.flashGfxSprite);
};

/**
 * Call this function to give this object a path to follow. If the path does not
 * have at least one node in it, this function will log a warning message and
 * return.
 * 
 * @param Path
 *            The <code>FlxPath</code> you want this object to follow.
 * @param Speed
 *            How fast to travel along the path in pixels per second.
 * @param Mode
 *            Optional, controls the behavior of the object following the path
 *            using the path behavior constants. Can use multiple flags at once,
 *            for example PATH_YOYO|PATH_HORIZONTAL_ONLY will make an object
 *            move back and forth along the X axis of the path only.
 * @param AutoRotate
 *            Automatically point the object toward the next node. Assumes the
 *            graphic is pointing upward. Default behavior is false, or no
 *            automatic rotation.
 */
Flixel.FlxObject.prototype.followPath = function(Path, Speed, Mode, AutoRotate)
{
	if(Path === null || Path.nodes.length <= 0)
	{
		Flixel.FlxG.log("WARNING: Paths need at least one node in them to be followed.");
		return;
	}
	
	this.path = Path;
	this.pathSpeed = Math.abs(Speed || 100);
	this._pathMode = Mode || Flixel.FlxObject.PATH_FORWARD;
	this._pathRotate = (AutoRotate === undefined) ? false : AutoRotate;

	// get starting node
	if((this._pathMode == Flixel.FlxObject.PATH_BACKWARD) || (this._pathMode == Flixel.FlxObject.PATH_LOOP_BACKWARD))
	{
		this._pathNodeIndex = this.path.nodes.length-1;
		this._pathInc = -1;
	}
	else
	{
		this._pathNodeIndex = 0;
		this._pathInc = 1;
	}
};

/**
 * Tells this object to stop following the path its on.
 * 
 * @param DestroyPath
 *            Tells this function whether to call destroy on the path object.
 *            Default value is false.
 */
Flixel.FlxObject.prototype.stopFollowingPath = function(DestroyPath)
{
	this.pathSpeed = 0;
	this.velocity.x = 0;
	this.velocity.y = 0;
	
	if(DestroyPath && (this.path !== null))
	{
		this.path.destroy();
		this.path = null;
	}
};

/**
 * Internal function that decides what node in the path to aim for next based on
 * the behavior flags.
 * 
 * @return The node (a <code>FlxPoint</code> object) we are aiming for next.
 */
Flixel.FlxObject.prototype.advancePath = function(Snap)
{
	Snap = (Snap === undefined) ? true : Snap;
	
	if(Snap)
	{
		var oldNode = this.path.nodes[this._pathNodeIndex];
		if(oldNode !== null)
		{
			if((this._pathMode & Flixel.FlxObject.PATH_VERTICAL_ONLY) === 0)
				this.x = oldNode.x - this.width * 0.5;
			if((this._pathMode & Flixel.FlxObject.PATH_HORIZONTAL_ONLY) === 0)
				this.y = oldNode.y - this.height * 0.5;
		}
	}
	
	this._pathNodeIndex += this._pathInc;
	
	if((this._pathMode & Flixel.FlxObject.PATH_BACKWARD) > 0) {
		if(this._pathNodeIndex < 0) {
			this._pathNodeIndex = 0;
			this.stopFollowingPath(false);
		}
	}
	else if((this._pathMode & Flixel.FlxObject.PATH_LOOP_FORWARD) > 0) {
		if(this._pathNodeIndex >= this.path.nodes.length)
			this._pathNodeIndex = 0;
	}
	else if((this._pathMode & Flixel.FlxObject.PATH_LOOP_BACKWARD) > 0) {
		if(this._pathNodeIndex < 0) {
			this._pathNodeIndex = this.path.nodes.length-1;
			if(this._pathNodeIndex < 0)
				this._pathNodeIndex = 0;
		}
	}
	else if((this._pathMode & Flixel.FlxObject.PATH_YOYO) > 0) {
		if(this._pathInc > 0) {
			if(this._pathNodeIndex >= this.path.nodes.length) {
				this._pathNodeIndex = this.path.nodes.length-2;
				if(this._pathNodeIndex < 0)
					this._pathNodeIndex = 0;
				this._pathInc = -this._pathInc;
			}
		} else if(this._pathNodeIndex < 0) {
			this._pathNodeIndex = 1;
			if(this._pathNodeIndex >= this.path.nodes.length)
				this._pathNodeIndex = this.path.nodes.length-1;
			if(this._pathNodeIndex < 0)
				this._pathNodeIndex = 0;
			this._pathInc = -this._pathInc;
		}
	}
	else
	{
		if(this._pathNodeIndex >= this.path.nodes.length)
		{
			this._pathNodeIndex = this.path.nodes.length-1;
			this.stopFollowingPath(false);
		}
	}

	return this.path.nodes[this._pathNodeIndex];
};

/**
 * Internal function for moving the object along the path. Generally this
 * function is called automatically by <code>preUpdate()</code>. The first
 * half of the function decides if the object can advance to the next node in
 * the path, while the second half handles actually picking a velocity toward
 * the next node.
 */
Flixel.FlxObject.prototype.updatePathMotion = function()
{
	// First check if we need to be pointing at the next node yet
	this._point.x = this.x + this.width * 0.5;
	this._point.y = this.y + this.height * 0.5;
	var node = this.path.nodes[this._pathNodeIndex];
	var deltaX = node.x - this._point.x;
	var deltaY = node.y - this._point.y;
	
	var horizontalOnly = (this._pathMode & Flixel.FlxObject.PATH_HORIZONTAL_ONLY) > 0;
	var verticalOnly = (this._pathMode & Flixel.FlxObject.PATH_VERTICAL_ONLY) > 0;
	
	if(horizontalOnly) {
		if(((deltaX>0)?deltaX:-deltaX) < this.pathSpeed * Flixel.FlxG.elapsed)
			node = this.advancePath();
	} else if(verticalOnly) {
		if(((deltaY>0)?deltaY:-deltaY) < this.pathSpeed * Flixel.FlxG.elapsed)
			node = this.advancePath();
	} else {
		if(Math.sqrt(deltaX*deltaX + deltaY*deltaY) < this.pathSpeed * Flixel.FlxG.elapsed)
			node = this.advancePath();
	}
	
	// then just move toward the current node at the requested speed
	if(this.pathSpeed !== 0)
	{
		// set velocity based on path mode
		this._point.x = this.x + this.width * 0.5;
		this._point.y = this.y + this.height * 0.5;
		if(horizontalOnly || (this._point.y == node.y))
		{
			this.velocity.x = (this._point.x < node.x) ? this.pathSpeed : -this.pathSpeed;
			if(this.velocity.x < 0)
				this.pathAngle = -90;
			else
				this.pathAngle = 90;
			if(!horizontalOnly)
				this.velocity.y = 0;
		}
		else if(verticalOnly || (this._point.x == node.x))
		{
			this.velocity.y = (this._point.y < node.y) ? this.pathSpeed : -this.pathSpeed;
			if(this.velocity.y < 0)
				this.pathAngle = 0;
			else
				this.pathAngle = 180;
			if(!verticalOnly)
				this.velocity.x = 0;
		}
		else
		{
			this.pathAngle = Flixel.FlxU.getAngle(this._point, node);
			Flixel.FlxU.rotatePoint(0, this.pathSpeed, 0, 0, this.pathAngle, this.velocity);
		}
		
		// then set object rotation if necessary
		if(this._pathRotate)
		{
			this.angularVelocity = 0;
			this.angularAcceleration = 0;
			this.angle = this.pathAngle;
		}
	}			
};

/**
 * Update your current speed in order to seek an object.
 */
Flixel.FlxObject.prototype.updateSeekMotion = function()
{
	this._point.x = (this._seeked.x + int(this._seeked.width/2)) - (this.x + int(this.width/2));
	this._point.y = (this._seeked.y + int(this._seeked.height/2)) - (this.x + int(this.height/2));
// --> FlxMath.normalize(_point);
// --> FlxMath.multiply(_point, maxVelocity);
// --> FlxMath.subtract(_point, velocity);
// --> FlxMath.add(steerForce, _point);
// --> FlxMath.add(velocity, steerForce);
};

/**
 * Start seeking an object
 */
Flixel.FlxObject.prototype.seek = function(o)
{
	this._seeked = o;
};

/**
 * Stop seeking an object.
 */
Flixel.FlxObject.prototype.stopSeek = function()
{
	this._seeked = null;
};

/**
 * Checks to see if some <code>FlxObject</code> overlaps this
 * <code>FlxObject</code> or <code>FlxGroup</code>. If the group has a LOT
 * of things in it, it might be faster to use <code>FlxG.overlaps()</code>.
 * WARNING: Currently tilemaps do NOT support screen space overlap checks!
 * 
 * @param ObjectOrGroup
 *            The object or group being tested.
 * @param InScreenSpace
 *            Whether to take scroll factors into account when checking for
 *            overlap. Default is false, or "only compare in world space."
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will
 *            just grab the first global camera.
 * 
 * @return Whether or not the two objects overlap.
 */
Flixel.FlxObject.prototype.overlaps = function(ObjectOrGroup, InScreenSpace, Camera)
{
	// WTF
	if(ObjectOrGroup === null)
		return false;

	if(ObjectOrGroup instanceof Flixel.FlxGroup)
	{
		var results = false;
		var i = 0;
		var members = ObjectOrGroup.members;
		while(i < length)
		{
			if(this.overlaps(members[i++], InScreenSpace, Camera))
				results = true;
		}
		return results;
	}
	
	if(ObjectOrGroup instanceof Flixel.FlxTilemap)
	{
		// Since tilemap's have to be the caller, not the target, to do proper
		// tile-based collisions,
		// we redirect the call to the tilemap overlap here.
		return ObjectOrGroup.overlaps(this, InScreenSpace, Camera);
	}
	
	var object = ObjectOrGroup;
	if(!InScreenSpace)
	{
		return	(object.x + object.width > this.x) && (object.x < this.x + this.width) &&
				(object.y + object.height > this.y) && (object.y < this.y + this.height);
	}


	Camera = Camera || Flixel.FlxG.camera;
	var objectScreenPos = object.getScreenXY(null,Camera);
	this.getScreenXY(this._point,Camera);
	return	(objectScreenPos.x + object.width > this._point.x) &&
			(objectScreenPos.x < this._point.x + this.width) &&
			(objectScreenPos.y + object.height > this._point.y) &&
			(objectScreenPos.y < this._point.y + this.height);
};

/**
 * Checks to see if this <code>FlxObject</code> were located at the given
 * position, would it overlap the <code>FlxObject</code> or
 * <code>FlxGroup</code>? This is distinct from overlapsPoint(), which just
 * checks that point, rather than taking the object's size into account.
 * WARNING: Currently tilemaps do NOT support screen space overlap checks!
 * 
 * @param X
 *            The X position you want to check. Pretends this object (the
 *            caller, not the parameter) is located here.
 * @param Y
 *            The Y position you want to check. Pretends this object (the
 *            caller, not the parameter) is located here.
 * @param ObjectOrGroup
 *            The object or group being tested.
 * @param InScreenSpace
 *            Whether to take scroll factors into account when checking for
 *            overlap. Default is false, or "only compare in world space."
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will
 *            just grab the first global camera.
 * 
 * @return Whether or not the two objects overlap.
 */
Flixel.FlxObject.prototype.overlapsAt = function(X, Y, ObjectOrGroup, InScreenSpace, Camera)
{
	if(ObjectOrGroup instanceof Flixel.FlxGroup)
	{
		var results = false;
		var i = 0;
		var members = ObjectOrGroup.members;
		while(i < members.length)
		{
			if(this.overlapsAt(X, Y, members[i++], InScreenSpace, Camera))
				results = true;
		}
		return results;
	}
	
	if(ObjectOrGroup instanceof Flixel.FlxTilemap)
	{
		// Since tilemap's have to be the caller, not the target, to do proper
		// tile-based collisions,
		// we redirect the call to the tilemap overlap here.
		// However, since this is overlapsAt(), we also have to invent the
		// appropriate position for the tilemap.
		// So we calculate the offset between the player and the requested
		// position, and subtract that from the tilemap.
		var tilemap = ObjectOrGroup;
		return tilemap.overlapsAt(tilemap.x - (X - this.x), tilemap.y - (Y - this.y), this, InScreenSpace, Camera);
	}
	
	var object = ObjectOrGroup;
	if(!InScreenSpace)
	{
		return	(object.x + object.width > X) && (object.x < X + this.width) &&
				(object.y + object.height > Y) && (object.y < Y + this.height);
	}

	Camera = Camera || Flixel.FlxG.camera;
	var objectScreenPos = object.getScreenXY(null,Camera);
	this._point.x = X - int(Camera.scroll.x * this.scrollFactor.x); // copied from
																// getScreenXY()
	this._point.y = Y - int(Camera.scroll.y * this.scrollFactor.y);
	this._point.x += (this._point.x > 0)?0.0000001:-0.0000001;
	this._point.y += (this._point.y > 0)?0.0000001:-0.0000001;
	return	(objectScreenPos.x + object.width > this._point.x) &&
			(objectScreenPos.x < this._point.x + this.width) &&
			(objectScreenPos.y + object.height > this._point.y) &&
			(objectScreenPos.y < this._point.y + this.height);
};

/**
 * Checks to see if a point in 2D world space overlaps this
 * <code>FlxObject</code> object.
 * 
 * @param Point
 *            The point in world space you want to check.
 * @param InScreenSpace
 *            Whether to take scroll factors into account when checking for
 *            overlap.
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will
 *            just grab the first global camera.
 * 
 * @return Whether or not the point overlaps this object.
 */
Flixel.FlxObject.prototype.overlapsPoint = function(Point, InScreenSpace, Camera)
{
	if(!InScreenSpace)
		return (Point.x > this.x) &&
				(Point.x < this.x + this.width) &&
				(Point.y > this.y) &&
				(Point.y < this.y + this.height);


	Camera = Camera || Flixel.FlxG.camera;
	var X = Point.x - Camera.scroll.x;
	var Y = Point.y - Camera.scroll.y;
	this.getScreenXY(this._point, Camera);
	return (X > this._point.x) &&
			(X < this._point.x + this.width) &&
			(Y > this._point.y) &&
			(Y < this._point.y + this.height);
};

/**
 * Check and see if this object is currently on screen.
 * 
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will
 *            just grab the first global camera.
 * 
 * @return Whether the object is on screen or not.
 */
Flixel.FlxObject.prototype.onScreen = function(Camera)
{
	Camera = Camera || Flixel.FlxG.camera;
	this.getScreenXY(this._point, Camera);
	return (this._point.x + this.width > 0) &&
			(this._point.x < Camera.width) &&
			(this._point.y + this.height > 0) &&
			(this._point.y < Camera.height);
};

/**
 * Call this function to figure out the on-screen position of the object.
 * 
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will
 *            just grab the first global camera.
 * @param Point
 *            Takes a <code>FlxPoint</code> object and assigns the
 *            post-scrolled X and Y values of this object to it.
 * 
 * @return The <code>Point</code> you passed in, or a new <code>Point</code>
 *         if you didn't pass one, containing the screen X and Y position of
 *         this object.
 */
Flixel.FlxObject.prototype.getScreenXY = function(Point, Camera)
{
	if(Point === null)
		Point = new Flixel.FlxPoint();
	Camera = Camera || Flixel.FlxG.camera;
	Point.x = this.x - int(Camera.scroll.x * this.scrollFactor.x);
	Point.y = this.y - int(Camera.scroll.y * this.scrollFactor.y);
	Point.x += (Point.x > 0)?0.0000001:-0.0000001;
	Point.y += (Point.y > 0)?0.0000001:-0.0000001;
	return Point;
};

/**
 * Tells this object to flicker, retro-style. Pass a negative value to flicker
 * forever.
 * 
 * @param Duration
 *            How many seconds to flicker for.
 */
Flixel.FlxObject.prototype.flicker = function(Duration)
{
	this._flickerTimer = Duration || 1;
	if(this._flickerTimer === 0)
		this._flicker = false;
};

/**
 * Check to see if the object is still flickering.
 * 
 * @return Whether the object is flickering or not.
 */
Flixel.FlxObject.prototype.getFlickering = function()
{
	return this._flickerTimer !== 0;
};

/**
 * Whether the object collides or not. For more control over what directions the
 * object will collide from, use collision constants (like LEFT, FLOOR, etc) to
 * set the value of allowCollisions directly.
 */
Flixel.FlxObject.prototype.getSolid = function()
{
	return (this.allowCollisions & Flixel.FlxObject.ANY) > Flixel.FlxObject.NONE;
};

/**
 * @private
 */
Flixel.FlxObject.prototype.setSolid = function(Solid)
{
	if(Solid)
		this.allowCollisions = Flixel.FlxObject.ANY;
	else
		this.allowCollisions = Flixel.FlxObject.NONE;
};

/**
 * Retrieve the midpoint of this object in world coordinates.
 * 
 * @Point Allows you to pass in an existing <code>FlxPoint</code> object if
 *        you're so inclined. Otherwise a new one is created.
 * 
 * @return A <code>FlxPoint</code> object containing the midpoint of this
 *         object in world coordinates.
 */
Flixel.FlxObject.prototype.getMidpoint = function(Point)
{
	if(Point === null)
		Point = new Flixel.FlxPoint();
	Point.x = this.x + this.width * 0.5;
	Point.y = this.y + this.height * 0.5;
	return Point;
};

/**
 * Handy function for reviving game objects. Resets their existence flags and
 * position.
 * 
 * @param X
 *            The new X position of this object.
 * @param Y
 *            The new Y position of this object.
 */
Flixel.FlxObject.prototype.reset = function(X, Y)
{
	this.revive();
	this.touching = Flixel.FlxObject.NONE;
	this.wasTouching = Flixel.FlxObject.NONE;
	this.x = X;
	this.y = Y;
	this.last.x = this.x;
	this.last.y = this.y;
	this.velocity.x = 0;
	this.velocity.y = 0;
};

/**
 * Handy function for checking if this object is touching a particular surface.
 * For slightly better performance you can just &amp; the value directly into
 * <code>touching</code>. However, this method is good for readability and
 * accessibility.
 * 
 * @param Direction
 *            Any of the collision flags (e.g. LEFT, FLOOR, etc).
 * 
 * @return Whether the object is touching an object in (any of) the specified
 *         direction(s) this frame.
 */
Flixel.FlxObject.prototype.isTouching = function(Direction)
{
	return (this.touching & Direction) > Flixel.FlxObject.NONE;
};

/**
 * Handy function for checking if this object is just landed on a particular
 * surface.
 * 
 * @param Direction
 *            Any of the collision flags (e.g. LEFT, FLOOR, etc).
 * 
 * @return Whether the object just landed on (any of) the specified surface(s)
 *         this frame.
 */
Flixel.FlxObject.prototype.justTouched = function(Direction)
{
	return ((this.touching & Direction) > Flixel.FlxObject.NONE) && ((this.wasTouching & Direction) <= Flixel.FlxObject.NONE);
};

/**
 * Reduces the "health" variable of this sprite by the amount specified in
 * Damage. Calls kill() if health drops to or below zero.
 * 
 * @param Damage
 *            How much health to take away (use a negative number to give a
 *            health bonus).
 */
Flixel.FlxObject.prototype.hurt = function(Damage)
{
	this.health = this.health - Damage;
	if(this.health <= 0)
		this.kill();
};

/**
 * The main collision resolution function in flixel.
 * 
 * @param Object1
 *            Any <code>FlxObject</code>.
 * @param Object2
 *            Any other <code>FlxObject</code>.
 * 
 * @return Whether the objects in fact touched and were separated.
 */
Flixel.FlxObject.separate = function(Object1, Object2)
{
	var separatedX = Flixel.FlxObject.separateX(Object1,Object2);
	var separatedY = Flixel.FlxObject.separateY(Object1,Object2);
	return separatedX || separatedY;
};

/**
 * The X-axis component of the object separation process.
 * 
 * @param Object1
 *            Any <code>FlxObject</code>.
 * @param Object2
 *            Any other <code>FlxObject</code>.
 * 
 * @return Whether the objects in fact touched and were separated along the X
 *         axis.
 */
Flixel.FlxObject.separateX = function(Object1, Object2)
{
	// Can't separate two immovable objects
	var obj1immovable = Object1.immovable || Object1.immovableX;
	var obj2immovable = Object2.immovable || Object1.immovableX;
	if(obj1immovable && obj2immovable)
		return false;
	
	// If one of the objects is a tilemap, just pass it off.
	if(Object1 instanceof Flixel.FlxTilemap)
		return Object1.overlapsWithCallback(Object2, Flixel.FlxObject.separateX);
	if(Object2 instanceof Flixel.FlxTilemap)
		return Object2.overlapsWithCallback(Object1, Flixel.FlxObject.separateX,true);
	
	// First, get the two object deltas
	var overlap = 0;
	var obj1delta = Object1.x - Object1.last.x;
	var obj2delta = Object2.x - Object2.last.x;
	if(obj1delta != obj2delta)
	{
		// Check if the X hulls actually overlap
		var obj1deltaAbs = (obj1delta > 0)?obj1delta:-obj1delta;
		var obj2deltaAbs = (obj2delta > 0)?obj2delta:-obj2delta;
		var obj1x = Object1.x-((obj1delta > 0)?obj1delta:0);
		var obj1y = Object1.last.y;
		var obj1width = Object1.width+((obj1delta > 0)?obj1delta:-obj1delta);
		var obj1height = Object1.height;
		var obj2x = Object2.x-((obj2delta > 0)?obj2delta:0);
		var obj2y = Object2.last.y;
		var obj2width = Object2.width+((obj2delta > 0)?obj2delta:-obj2delta);
		var obj2height = Object2.height;
		if((obj1x + obj1width > obj2x) && (obj1x < obj2x + obj2width) && (obj1y + obj1height > obj2y) && (obj1y < obj2y + obj2height))
		{
			var maxOverlap = obj1deltaAbs + obj2deltaAbs + Flixel.FlxObject.OVERLAP_BIAS;
			
			// If they did overlap (and can), figure out by how much and flip
			// the corresponding flags
			if(obj1delta > obj2delta)
			{
				overlap = Object1.x + Object1.width - Object2.x;
				if((overlap > maxOverlap) || !(Object1.allowCollisions & Flixel.FlxObject.RIGHT) || !(Object2.allowCollisions & Flixel.FlxObject.LEFT))
					overlap = 0;
				else
				{
					Object1.touching |= Flixel.FlxObject.RIGHT;
					Object2.touching |= Flixel.FlxObject.LEFT;
				}
			}
			else if(obj1delta < obj2delta)
			{
				overlap = Object1.x - Object2.width - Object2.x;
				if((-overlap > maxOverlap) || !(Object1.allowCollisions & Flixel.FlxObject.LEFT) || !(Object2.allowCollisions & Flixel.FlxObject.RIGHT))
					overlap = 0;
				else
				{
					Object1.touching |= Flixel.FlxObject.LEFT;
					Object2.touching |= Flixel.FlxObject.RIGHT;
				}
			}
		}
	}
	
	// Then adjust their positions and velocities accordingly (if there was any
	// overlap)
	if(overlap !== 0)
	{
		var obj1v = Object1.velocity.x;
		var obj2v = Object2.velocity.x;
		
		if(!obj1immovable && !obj2immovable)
		{
			overlap *= 0.5;
			Object1.x = Object1.x - overlap;
			Object2.x += overlap;

			var obj1velocity = Math.sqrt((obj2v * obj2v * Object2.mass)/Object1.mass) * ((obj2v > 0)?1:-1);
			var obj2velocity = Math.sqrt((obj1v * obj1v * Object1.mass)/Object2.mass) * ((obj1v > 0)?1:-1);
			var average = (obj1velocity + obj2velocity)*0.5;
			obj1velocity -= average;
			obj2velocity -= average;
			Object1.velocity.x = average + obj1velocity * Object1.elasticity;
			Object2.velocity.x = average + obj2velocity * Object2.elasticity;
		}
		else if(!obj1immovable)
		{
			Object1.x = Object1.x - overlap;
			Object1.velocity.x = obj2v - obj1v*Object1.elasticity;
		}
		else if(!obj2immovable)
		{
			Object2.x += overlap;
			Object2.velocity.x = obj1v - obj2v*Object2.elasticity;
		}
		return true;
	}
	else
		return false;
};

/**
 * The Y-axis component of the object separation process.
 * 
 * @param Object1
 *            Any <code>FlxObject</code>.
 * @param Object2
 *            Any other <code>FlxObject</code>.
 * 
 * @return Whether the objects in fact touched and were separated along the Y
 *         axis.
 */
Flixel.FlxObject.separateY = function(Object1, Object2)
{
	// can't separate two immovable objects
	var obj1immovable = Object1.immovable || Object1.immovableY;
	var obj2immovable = Object2.immovable || Object1.immovableY;
	if(obj1immovable && obj2immovable)
		return false;
	
	// If one of the objects is a tilemap, just pass it off.
	if(Object1 instanceof Flixel.FlxTilemap)
		return Object1.overlapsWithCallback(Object2, Flixel.FlxObject.separateY);
	if(Object2 instanceof Flixel.FlxTilemap)
		return Object2.overlapsWithCallback(Object1, Flixel.FlxObject.separateY,true);

	// First, get the two object deltas
	var overlap = 0;
	var obj1delta = Object1.y - Object1.last.y;
	var obj2delta = Object2.y - Object2.last.y;
	if(obj1delta != obj2delta)
	{
		// Check if the Y hulls actually overlap
		var obj1deltaAbs = (obj1delta > 0)?obj1delta:-obj1delta;
		var obj2deltaAbs = (obj2delta > 0)?obj2delta:-obj2delta;
		var obj1x = Object1.x;
		var obj1y = Object1.y-((obj1delta > 0)?obj1delta:0);
		var obj1width = Object1.width;
		var obj1height = Object1.height+obj1deltaAbs;
		var obj2x = Object2.x;
		var obj2y = Object2.y-((obj2delta > 0)?obj2delta:0);
		var obj2width = Object2.width;
		var obj2height = Object2.height+obj2deltaAbs;
		if((obj1x + obj1width > obj2x) && (obj1x < obj2x + obj2width) && (obj1y + obj1height > obj2y) && (obj1y < obj2y + obj2height))
		{
			var maxOverlap = obj1deltaAbs + obj2deltaAbs + Flixel.FlxObject.OVERLAP_BIAS;
			
			// If they did overlap (and can), figure out by how much and flip
			// the corresponding flags
			if(obj1delta > obj2delta)
			{
				overlap = Object1.y + Object1.height - Object2.y;
				if((overlap > maxOverlap) || !(Object1.allowCollisions & Flixel.FlxObject.DOWN) || !(Object2.allowCollisions & Flixel.FlxObject.UP))
					overlap = 0;
				else
				{
					Object1.touching |= Flixel.FlxObject.DOWN;
					Object2.touching |= Flixel.FlxObject.UP;
				}
			}
			else if(obj1delta < obj2delta)
			{
				overlap = Object1.y - Object2.height - Object2.y;
				if((-overlap > maxOverlap) || !(Object1.allowCollisions & Flixel.FlxObject.UP) || !(Object2.allowCollisions & Flixel.FlxObject.DOWN))
					overlap = 0;
				else
				{
					Object1.touching |= Flixel.FlxObject.UP;
					Object2.touching |= Flixel.FlxObject.DOWN;
				}
			}
		}
	}
	
	// Then adjust their positions and velocities accordingly (if there was any
	// overlap)
	if(overlap !== 0)
	{
		var obj1v = Object1.velocity.y;
		var obj2v = Object2.velocity.y;
		
		if(!obj1immovable && !obj2immovable)
		{
			overlap *= 0.5;
			Object1.y = Object1.y - overlap;
			Object2.y += overlap;

			var obj1velocity = Math.sqrt((obj2v * obj2v * Object2.mass)/Object1.mass) * ((obj2v > 0)?1:-1);
			var obj2velocity = Math.sqrt((obj1v * obj1v * Object1.mass)/Object2.mass) * ((obj1v > 0)?1:-1);
			var average = (obj1velocity + obj2velocity)*0.5;
			obj1velocity -= average;
			obj2velocity -= average;
			Object1.velocity.y = average + obj1velocity * Object1.elasticity;
			Object2.velocity.y = average + obj2velocity * Object2.elasticity;
		}
		else if(!obj1immovable)
		{
			Object1.y = Object1.y - overlap;
			Object1.velocity.y = obj2v - obj1v*Object1.elasticity;
			// This is special case code that handles cases like horizontal
			// moving platforms you can ride
			if(Object2.active && Object2.moves && (obj1delta > obj2delta))
				Object1.x += Object2.x - Object2.last.x;
		}
		else if(!obj2immovable)
		{
			Object2.y += overlap;
			Object2.velocity.y = obj1v - obj2v*Object2.elasticity;
			// This is special case code that handles cases like horizontal
			// moving platforms you can ride
			if(Object1.active && Object1.moves && (obj1delta < obj2delta))
				Object2.x += Object1.x - Object1.last.x;
		}
		return true;
	}
	else
		return false;
};

/**
 * Returns the class name.
 */
Flixel.FlxObject.prototype.toString = function()
{
	return "FlxObject";
};