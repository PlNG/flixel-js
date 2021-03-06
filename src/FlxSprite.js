/**
 * The main "game object" class, the sprite is a <code>FlxObject</code><br>
 * with a bunch of graphics options and abilities, like animation and stamping.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Creates a white 8x8 square <code>FlxSprite</code> at the specified position.
 * Optionally can load a simple, one-frame graphic instead.
 * 
 * @param	XThe initial X position of the sprite.
 * @param	YThe initial Y position of the sprite.
 * @param	SimpleGraphic	The graphic you want to display (OPTIONAL - for simple stuff only, do NOT use for animated images!).
 */
Flixel.FlxSprite = function(X, Y, SimpleGraphic)
{
	X = X || 0;
	Y = Y || 0;
	rectangle = rectangle || null;
	
	Flixel.FlxSprite.parent.constructor.apply(this, [X, Y]);

	this._flashPoint = new Flixel.FlxPoint();
	this._flashRect = new Flixel.FlxRect();
	this._flashRect2 = new Flixel.FlxRect();
	this._flashPointZero = new Flixel.FlxPoint();
	this.offset = new Flixel.FlxPoint();
	this.origin = new Flixel.FlxPoint();
	
	this.scale = new Flixel.FlxPoint(1.0,1.0);
	this._alpha = 1;
	this._color = 0x00ffffff;
	this.blend = null;
	this.antialiasing = false;
	this.cameras = null;
	
	this.finished = false;
	this._facing = Flixel.FlxObject.RIGHT;
	this._animations = [];
	this._flipped = 0;
	this._curAnim = null;
	this._curFrame = 0;
	this._curIndex = 0;
	this._frameTimer = 0;

	this._matrix = new Matrix();
	this._callback = null;
	
	if(SimpleGraphic === null || SimpleGraphic === undefined)
		SimpleGraphic = Flixel.data.FlxSystemAsset.ImgDefault;
	this.loadGraphic(SimpleGraphic);
};
extend(Flixel.FlxSprite, Flixel.FlxObject);

/**
 * WARNING: The origin of the sprite will default to its center.
 * If you change this, the visuals and the collisions will likely be
 * pretty out-of-sync if you do any rotation.
 */
Flixel.FlxSprite.prototype.origin = null;
/**
* If you changed the size of your sprite object after loading or making the graphic,
* you might need to offset the graphic away from the bound box to center it the way you want.
*/
Flixel.FlxSprite.prototype.offset = null;
/**
 * Change the size of your sprite's graphic.
 * NOTE: Scale doesn't currently affect collisions automatically,
 * you will need to adjust the width, height and offset manually.
 * WARNING: scaling sprites decreases rendering performance for this sprite by a factor of 10x!
 */
Flixel.FlxSprite.prototype.scale = null;
/**
 * Blending modes, just like Photoshop or whatever.
 * E.g. "multiply", "screen", etc.
 * @default null
 */
Flixel.FlxSprite.prototype.blend = null;
/**
 * Controls whether the object is smoothed when rotated, affects performance.
 * @default false
 */
Flixel.FlxSprite.prototype.antialiasing = false;
/**
 * Whether the current animation has finished its first (or only) loop.
 */
Flixel.FlxSprite.prototype.finished = false;
/**
 * The width of the actual graphic or image being displayed (not necessarily the game object/bounding box).
 * NOTE: Edit at your own risk!!  This is intended to be read-only.
 */
Flixel.FlxSprite.prototype.frameWidth = 0;
/**
 * The height of the actual graphic or image being displayed (not necessarily the game object/bounding box).
 * NOTE: Edit at your own risk!!  This is intended to be read-only.
 */
Flixel.FlxSprite.prototype.frameHeight = 0;
/**
 * The total number of frames in this image.  WARNING: assumes each row in the sprite sheet is full!
 */
Flixel.FlxSprite.prototype.frames = 0;
/**
 * The actual Flash <code>BitmapData</code> object representing the current display state of the sprite.
 */
Flixel.FlxSprite.prototype.framePixels = null;
/**
 * Set this flag to true to force the sprite to update during the draw() call.
 * NOTE: Rarely if ever necessary, most sprite operations will flip this flag automatically.
 */
Flixel.FlxSprite.prototype.dirty = false;
/**
 * Internal, stores all the animations that were added to this sprite.
 */
Flixel.FlxSprite.prototype._animations = null;
/**
 * Internal, keeps track of whether the sprite was loaded with support for automatic reverse/mirroring.
 */
Flixel.FlxSprite.prototype._flipped = 0;
/**
 * Internal, keeps track of the current animation being played.
 */
Flixel.FlxSprite.prototype._curAnim = null;
/**
 * Internal, keeps track of the current frame of animation.
 * This is NOT an index into the tile sheet, but the frame number in the animation object.
 */
Flixel.FlxSprite.prototype._curFrame = 0;
/**
 * Internal, keeps track of the current index into the tile sheet based on animation or rotation.
 */
Flixel.FlxSprite.prototype._curIndex = 0;
/**
 * Internal, used to time each frame of animation.
 */
Flixel.FlxSprite.prototype._frameTimer = 0;
/**
 * Internal tracker for the animation callback.  Default is null.
 * If assigned, will be called each time the current frame changes.
 * A function that has 3 parameters: a string name, a uint frame number, and a uint frame index.
 */
Flixel.FlxSprite.prototype._callback = null;
/**
 * Internal tracker for what direction the sprite is currently facing, used with Flash getter/setter.
 */
Flixel.FlxSprite.prototype._facing = 0;
/**
 * Internal tracker for opacity, used with Flash getter/setter.
 */
Flixel.FlxSprite.prototype._alpha = 0;
/**
 * Internal tracker for color tint, used with Flash getter/setter.
 */
Flixel.FlxSprite.prototype._color = 0;
/**
 * Internal tracker for how many frames of "baked" rotation there are (if any).
 */
Flixel.FlxSprite.prototype._bakedRotation = 0;
/**
 * Internal, stores the entire source graphic (not the current displayed animation frame), used with Flash getter/setter.
 */
Flixel.FlxSprite.prototype._pixels = null;
/**
 * Internal, reused frequently during drawing and animating.
 */
Flixel.FlxSprite.prototype._flashPoint = null;
/**
 * Internal, reused frequently during drawing and animating.
 */
Flixel.FlxSprite.prototype._flashRect = null;
/**
 * Internal, reused frequently during drawing and animating.
 */
Flixel.FlxSprite.prototype._flashRect2 = null;
/**
 * Internal, reused frequently during drawing and animating. Always contains (0,0).
 */
Flixel.FlxSprite.prototype._flashPointZero = null;
/**
 * Internal, helps with animation, caching and drawing.
 */
Flixel.FlxSprite.prototype._colorTransform = null;
/**
 * Internal, helps with animation, caching and drawing.
 */
Flixel.FlxSprite.prototype._matrix = null;
/**
 * The texture X offset.
 */
Flixel.FlxSprite.prototype.offsetX = 0;
/**
 * The texture Y offset.
 */
Flixel.FlxSprite.prototype.offsetY = 0;

/**
 * Clean up memory.
 */
Flixel.FlxSprite.prototype.destroy = function()
{
	if(this._animations !== null && this._animations !== undefined)
	{
		var a;
		var i = 0;
		var l = this._animations.length;
		while(i < l) {
			a = this._animations[i++];
			if(a !== null)
				a.destroy();
		}
		this._animations = null;
	}
	
	this._flashPoint = null;
	this._flashRect = null;
	this._flashRect2 = null;
	this._flashPointZero = null;
	this.offset = null;
	this.origin = null;
	this.scale = null;
	this._curAnim = null;
	this._matrix = null;
	this._callback = null;
	this.framePixels = null;
	
	Flixel.FlxSprite.parent.destroy.apply(this);
};

/**
 * Sets the FlxSprite scale.
 * This method changes the sprite width and height,
 * and then adjust the offset.
 *  
 * @param xThe X value of the scale.
 * @param yThe Y value of the scale.
 */
Flixel.FlxSprite.prototype.scaleSprite = function(x, y)
{
	this.scale.x = x;
	this.scale.y = y;
	
	if(this.scale.x == 1 && this.scale.y == 1)
		this.setPixels(this._pixels); // Little trick to restore original sizes.
	else {
		this.offset.x += Math.floor(this.width * -(this.scale.x - 1)/2);
		this.offset.y += Math.floor(this.height * -(this.scale.y - 1)/2);
		this.width *= this.scale.x;
		this.height *= this.scale.y;
	}
};

/**
 * Load an image from an embedded graphic file.
 * 
 * @param	GraphicThe image you want to use.
 * @param	Animated	Whether the Graphic parameter is a single sprite or a row of sprites.
 * @param	ReverseWhether you need this class to generate horizontally flipped versions of the animation frames.
 * @param	WidthOptional, specify the width of your sprite (helps FlxSprite figure out what to do with non-square sprites or sprite sheets).
 * @param	HeightOptional, specify the height of your sprite (helps FlxSprite figure out what to do with non-square sprites or sprite sheets).
 * @param	UniqueOptional, whether the graphic should be a unique instance in the graphics cache.  Default is false.
 * 
 * @return	This FlxSprite instance (nice for chaining stuff together, if you're into that).
 */
Flixel.FlxSprite.prototype.loadGraphic = function(Graphic, Animated, Reverse, Width, Height, Unique, offsetX, offsetY)
{
	Animated = (Animated === undefined) ? false: Animated;
	Reverse = (Reverse === undefined) ? false: Reverse;
	Unique = (Unique === undefined) ? false: Unique;
	Width = Width || 0;
	Height = Height || 0;
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	
	if(Graphic === null)
		Graphic =  Flixel.data.FlxSystemAsset.ImgDefault;
	
	this._bakedRotation = 0;
	this._pixels = Flixel.FlxG.addBitmap(Graphic,Reverse,Unique);
	
	if(Reverse)
		this._flipped = this._pixels.width >> 1;
	else
		this._flipped = 0;
	
	if(Width === 0) {
		if(Animated)
			Width = this._pixels.height;
		else if(this._flipped > 0)
			Width = this._pixels.width * 0.5;
		else
			Width = this._pixels.width;
	}
	
	this.width = this.frameWidth = Width;

	if(Height === 0) {
		if(Animated)
			Height = this.width;
		else
			Height = this._pixels.height;
	}

	this.height = this.frameHeight = Height;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.resetHelpers();
	return this;
};

/**
 * Create a pre-rotated sprite sheet from a simple sprite.
 * This can make a huge difference in graphical performance!
 * 
 * @param	Graphic	The image you want to rotate and stamp.
 * @param	RotationsThe number of rotation frames the final sprite should have.  For small sprites this can be quite a large number (360 even) without any problems.
 * @param	Frame	If the Graphic has a single row of square animation frames on it, you can specify which of the frames you want to use here.  Default is -1, or "use whole graphic."
 * @param	AntiAliasing	Whether to use high quality rotations when creating the graphic.  Default is false.
 * @param	AutoBufferWhether to automatically increase the image size to accomodate rotated corners.  Default is false.  Will create frames that are 150% larger on each axis than the original frame or graphic.
 * 
 * @return	This FlxSprite instance (nice for chaining stuff together, if you're into that).
 */
Flixel.FlxSprite.prototype.loadRotatedGraphic = function(Graphic, Rotations, Frame, AntiAliasing, AutoBuffer)
{
	Rotations = (Rotations === undefined) ? 16 : Rotations;
	Frame = (Frame === undefined) ? -1 : Frame;
	AntiAliasing = (AntiAliasing === undefined) ? false : AntiAliasing;
	AutoBuffer = (AutoBuffer === undefined) ? false : AutoBuffer;
	
	// Create the brush and canvas
	var rows = Math.sqrt(Rotations);
	var brush = Flixel.FlxG.addBitmap(Graphic);

	if(Frame >= 0) {
		// Using just a segment of the graphic - find the right bit here
		var full = brush;
		brush = new BitmapData(full.height, full.height);
		var rx = Frame * brush.width;
		var ry = 0;
		var fw = full.width;

		if(rx >= fw) {
			ry = uint(rx / fw) * brush.height;
			rx %= fw;
		}

		this._flashRect.x = rx;
		this._flashRect.y = ry;
		this._flashRect.width = brush.width;
		this._flashRect.height = brush.height;
		brush.copyPixels(full, this._flashRect, this._flashPointZero, null, null, false, true);
	}
	
	var max = brush.width;
	if(brush.height > max)
		max = brush.height;
	if(AutoBuffer)
		max *= 1.5;

	var columns = Math.ceil(Rotations / rows);
	this.width = max*columns;
	this.height = max*rows;
	
	var key = String(Graphic) + ":" + Frame + ":" + this.width + "x" + this.height;
	var skipGen = Flixel.FlxG.checkBitmapCache(key);
	this._pixels = Flixel.FlxG.createBitmap(this.width, this.height, 0, true, key);
	this.width = this.frameWidth = this._pixels.width;
	this.height = this.frameHeight = this._pixels.height;
	this._bakedRotation = 360 / Rotations;
	
	// Generate a new sheet if necessary, then fix up the width and height
	if(!skipGen)
	{
		var row = 0;
		var column;
		var bakedAngle = 0;
		var halfBrushWidth = uint(brush.width * 0.5);
		var halfBrushHeight = uint(brush.height * 0.5);
		var midpointX = uint(max * 0.5);
		var midpointY = uint(max * 0.5);
		
		while(row < rows) {
			column = 0;
			while(column < columns) {
				this._matrix.identity();
				this._matrix.translate(-halfBrushWidth, -halfBrushHeight);
				this._matrix.rotate(bakedAngle * 0.017453293);
				this._matrix.translate(max * column + midpointX, midpointY);
				bakedAngle += this._bakedRotation;
				this._pixels.draw(brush, this._matrix, null, null, null, AntiAliasing);
				column++;
			}
			midpointY += max;
			row++;
		}
	}
	this.frameWidth = this.frameHeight = this.width = this.height = max;
	this.resetHelpers();

	if(AutoBuffer) {
		this.width = brush.width;
		this.height = brush.height;
		this.centerOffsets();
	}
	return this;
};

/**
 * This function creates a flat colored square image dynamically.
 * 
 * @param	WidthThe width of the sprite you want to generate.
 * @param	HeightThe height of the sprite you want to generate.
 * @param	ColorSpecifies the color of the generated block.
 * @param	UniqueWhether the graphic should be a unique instance in the graphics cache.  Default is false.
 * @param	Key	Optional parameter - specify a string key to identify this graphic in the cache.  Trumps Unique flag.
 * 
 * @return	This FlxSprite instance (nice for chaining stuff together, if you're into that).
 */
Flixel.FlxSprite.prototype.makeGraphic = function(Width, Height, Color, Unique, Key)
{
	Color = Color || 0xffffffff;
	Unique = (Unique === undefined) ? false : Unique;
	
	this._bakedRotation = 0;
	this._pixels = Flixel.FlxG.createBitmap(Width, Height, Color, Unique, Key);
	this.width = this.frameWidth = this._pixels.width;
	this.height = this.frameHeight = this._pixels.height;
	this.resetHelpers();
	return this;
};

/**
 * Resets some important variables for sprite optimization and rendering.
 */
Flixel.FlxSprite.prototype.resetHelpers = function()
{
	this._flashRect.x = 0;
	this._flashRect.y = 0;
	this._flashRect.width = this.frameWidth;
	this._flashRect.height = this.frameHeight;
	this._flashRect2.x = 0;
	this._flashRect2.y = 0;
	this._flashRect2.width = this._pixels.width;
	this._flashRect2.height = this._pixels.height;
	if((this.framePixels === null) || (this.framePixels.width != this.width) || (this.framePixels.height != this.height))
		this.framePixels = new BitmapData(this.width, this.height);
	this.origin.make(this.frameWidth * 0.5, this.frameHeight * 0.5);
	this.framePixels.copyPixels(this._pixels, this._flashRect, this._flashPointZero, null, null, false, true);
	this.frames = (this._flashRect2.width / this._flashRect.width) * (this._flashRect2.height / this._flashRect.height);
	if(this._colorTransform !== null) this.framePixels.colorTransform(this._flashRect, this._colorTransform);
		this._curIndex = 0;
};

/**
 * Automatically called after update() by the game loop,
 * this function just calls updateAnimation().
 */
Flixel.FlxSprite.prototype.postUpdate = function()
{
	Flixel.FlxSprite.parent.postUpdate.apply(this);
	this.updateAnimation();
};

/**
 * Called by game loop, updates then blits or renders current frame of animation to the screen
 */
Flixel.FlxSprite.prototype.draw = function()
{
	if(this._flicker)
		return;
	
	if(this.dirty)	// rarely 
		this.calcFrame();

	var camera = Flixel.FlxG.activeCamera;
	if(this.cameras === null)
		this.cameras = Flixel.FlxG.cameras;
	if(this.cameras.indexOf(camera) == -1)
		return;

	if(!this.onScreen(camera))
		return;

	this._point.x = this.x - int(camera.scroll.x * this.scrollFactor.x) - this.offset.x;
	this._point.y = this.y - int(camera.scroll.y * this.scrollFactor.y) - this.offset.y;
	this._point.x += (this._point.x > 0)?0.0000001:-0.0000001;
	this._point.y += (this._point.y > 0)?0.0000001:-0.0000001;

//	var tintColor = FlxU.multiplyColors(_color, camera.getColor());
//	framePixels.colorTransform(_flashRect, new ColorTransform());
	
	if(((this.angle === 0) || (this._bakedRotation > 0)) && (this.scale.x == 1) && (this.scale.y == 1) && (this.blend === null))
	{	// Simple render
		this._flashPoint.x = this._point.x;
		this._flashPoint.y = this._point.y;
		camera.buffer.copyPixels(this.framePixels, this._flashRect, this._flashPoint, null, null, true, false);
	} else {	// Advanced render
		this._matrix.identity();
		this._matrix.translate(-this.origin.x, -this.origin.y);
		this._matrix.scale(this.scale.x, this.scale.y);
		if((this.angle !== 0) && (this._bakedRotation <= 0))
			this._matrix.rotate(this.angle * 0.017453293);
		this._matrix.translate(this._point.x + this.origin.x, this._point.y + this.origin.y);
		camera.buffer.draw(this.framePixels, this._matrix, null, this.blend, null, this.antialiasing);	
	}
	
	Flixel.FlxBasic.VISIBLECOUNT++;
	if(Flixel.FlxG.visualDebug && !this.ignoreDrawDebug)
		this.drawDebug(camera);
};

/**
 * This function draws or stamps one <code>FlxSprite</code> onto another.
 * This function is NOT intended to replace <code>draw()</code>!
 * 
 * @param	BrushThe image you want to use as a brush or stamp or pen or whatever.
 * @param	X	The X coordinate of the brush's top left corner on this sprite.
 * @param	Y	They Y coordinate of the brush's top left corner on this sprite.
 */
Flixel.FlxSprite.prototype.stamp = function(Brush, X, Y, rectangle)
{
	X = X || 0;
	Y = Y || 0;
	
	Brush.drawFrame();
	var bitmapData = Brush.framePixels;
	
	// Simple draw
	if(((Brush.angle === 0) || (Brush._bakedRotation > 0)) && (Brush.scale.x == 1) && (Brush.scale.y == 1) && (Brush.blend === null))
	{
		this._flashPoint.x = X;
		this._flashPoint.y = Y;
		this._flashRect2.x = (rectangle === null) ? 0 : rectangle.x;
		this._flashRect2.y = (rectangle === null) ? 0 : rectangle.y;
		this._flashRect2.width = (rectangle === null) ? bitmapData.width : rectangle.width;
		this._flashRect2.height = (rectangle === null) ? bitmapData.height : rectangle.height;
		this._pixels.copyPixels(bitmapData, this._flashRect2, this._flashPoint, null, null, true, false);
		this._flashRect2.width = this._pixels.width;
		this._flashRect2.height = this._pixels.height;
		this.calcFrame();
		return;
	}
	
	// Advanced draw
	this._matrix.identity();
	this._matrix.translate(-Brush.origin.x, -Brush.origin.y);
	this._matrix.scale(Brush.scale.x, Brush.scale.y);
	if(Brush.angle !== 0)
		this._matrix.rotate(Brush.angle * 0.017453293);
	this._matrix.translate(X + Brush.origin.x, Y + Brush.origin.y);
	this._pixels.draw(bitmapData, this._matrix, null, Brush.blend, null, Brush.antialiasing);
	this.calcFrame();
};

/**
 * This function draws a line on this sprite from position X1,Y1
 * to position X2,Y2 with the specified color.
 * 
 * @param	StartXX coordinate of the line's start point.
 * @param	StartYY coordinate of the line's start point.
 * @param	EndXX coordinate of the line's end point.
 * @param	EndYY coordinate of the line's end point.
 * @param	ColorThe line's color.
 * @param	Thickness	How thick the line is in pixels (default value is 1).
 */
Flixel.FlxSprite.prototype.drawLine = function(StartX, StartY, EndX, EndY, Color, Thickness)
{
	Thickness = Thickness || 1;
	
	// Draw line
	var gfx = Flixel.FlxG.flashGfx;
	gfx.clear();
	gfx.moveTo(StartX, StartY);
	var alphaComponent = int((Color >> 24) & 0xFF) / 255;
	if(alphaComponent <= 0)
		alphaComponent = 1;
	gfx.lineStyle(Thickness, Color, alphaComponent);
	gfx.lineTo(EndX,EndY);
	
	// Cache line to bitmap
	this._pixels.draw(Flixel.FlxG.flashGfxSprite);
	this.dirty = true;
};

/**
 * Fills this sprite's graphic with a specific color.
 * 
 * @param	ColorThe color with which to fill the graphic, format 0xAARRGGBB.
 */
Flixel.FlxSprite.prototype.fill = function(Color)
{
	this._pixels.fillRect(this._flashRect2, this.Color);
	if(this._pixels != this.framePixels)
		this.dirty = true;
};

/**
 * Internal function for updating the sprite's animation.
 * Useful for cases when you need to update this but are buried down in too many supers.
 * This function is called automatically by <code>FlxSprite.postUpdate()</code>.
 */
Flixel.FlxSprite.prototype.updateAnimation = function()
{
	if(this._bakedRotation > 0)
	{
		var oldIndex = this._curIndex;
		var angleHelper = this.angle % 360;
		if(angleHelper < 0)
			angleHelper += 360;
		this._curIndex = uint(angleHelper/this._bakedRotation + 0.5);
		if(oldIndex != this._curIndex)
			this.dirty = true;
	}
	else if((this._curAnim !== null) && (this._curAnim.delay > 0) && (this._curAnim.looped || !this.finished))
	{
		this._frameTimer += Flixel.FlxG.elapsed;
		while(this._frameTimer > this._curAnim.delay)
		{
			this._frameTimer = this._frameTimer - this._curAnim.delay;
			if(this._curFrame == this._curAnim.frames.length - 1)
			{
				if(this._curAnim.looped)
					this._curFrame = 0;
				this.finished = true;
			}
			else
				this._curFrame++;
			this._curIndex = this._curAnim.frames[this._curFrame];
			this.dirty = true;
		}
	}
	
	if(this.dirty)
		this.calcFrame();
};

/**
 * Request (or force) that the sprite update the frame before rendering.
 * Useful if you are doing procedural generation or other weirdness!
 * 
 * @param	Force	Force the frame to redraw, even if its not flagged as necessary.
 */
Flixel.FlxSprite.prototype.drawFrame = function(Force)
{
	if(Force || this.dirty)
		this.calcFrame();
};

/**
 * Adds a new animation to the sprite.
 * 
 * @param	NameWhat this animation should be called (e.g. "run").
 * @param	FramesAn array of numbers indicating what frames to play in what order (e.g. 1, 2, 3).
 * @param	FrameRate	The speed in frames per second that the animation should play at (e.g. 40 fps).
 * @param	LoopedWhether or not the animation is looped or just plays once.
 */
Flixel.FlxSprite.prototype.addAnimation = function(Name, Frames, FrameRate, Looped)
{
	FrameRate = FrameRate || 0;
	Looped = (Looped === undefined) ? true : Looped;
	
	this._animations.push(new Flixel.system.FlxAnim(Name, Frames, FrameRate, Looped));
};

/**
 * Pass in a function to be called whenever this sprite's animation changes.
 * 
 * @param	AnimationCallbackA function that has 3 parameters: a string name, a uint frame number, and a uint frame index.
 */
Flixel.FlxSprite.prototype.addAnimationCallback = function(AnimationCallback)
{
	this._callback = AnimationCallback;
};

/**
 * Plays an existing animation (e.g. "run").
 * If you call an animation that is already playing it will be ignored.
 * 
 * @param	AnimName	The string name of the animation you want to play.
 * @param	ForceWhether to force the animation to restart.
 */
Flixel.FlxSprite.prototype.play = function(AnimName, Force)
{
	if(!Force && (this._curAnim !== null) && (AnimName == this._curAnim.name) && (this._curAnim.looped || !this.finished))
		return;
	
	if(this._animations === null || this._animations === undefined)
		return;

	this._curFrame = 0;
	this._curIndex = 0;
	this._frameTimer = 0;
	var i = 0;
	var l = this._animations.length;

	while(i < l) {
		if(this._animations[i].name == AnimName) {
			this._curAnim = this._animations[i];
			if(this._curAnim.delay <= 0)
				this.finished = true;
			else
				this.finished = false;
			this._curIndex = this._curAnim.frames[this._curFrame];
			this.dirty = true;
			return;
		}
		i++;
	}
	Flixel.FlxG.log("WARNING: No animation called \""+AnimName+"\"");
};

/**
 * Tell the sprite to change to a random frame of animation
 * Useful for instantiating particles or other weird things.
 */
Flixel.FlxSprite.prototype.randomFrame = function()
{
	this._curAnim = null;
	this._curIndex = int(Flixel.FlxG.random() * (this._pixels.width / this.frameWidth));
	this.dirty = true;
};

/**
 * Helper function that just sets origin to (0,0)
 */
Flixel.FlxSprite.prototype.setOriginToCorner = function()
{
	this.origin.x = this.origin.y = 0;
};

/**
 * Helper function that adjusts the offset automatically to center the bounding box within the graphic.
 * 
 * @param	AdjustPositionAdjusts the actual X and Y position just once to match the offset change. Default is false.
 */
Flixel.FlxSprite.prototype.centerOffsets = function(AdjustPosition)
{
	this.offset.x = (this.frameWidth - this.width)*0.5;
	this.offset.y = (this.frameHeight - this.height)*0.5;
	if(AdjustPosition) {
		this.x += this.offset.x;
		this.y += this.offset.y;
	}
};

/**
 * Replace one color for another one in the loaded texture.
 * 
 * @param Color	The old color.
 * @param NewColorThe new color.
 * @param FetchPositionsTrue if you want to fetch the positions where the colors where changed.
 * @returnNull of the fetched positions.
 */
Flixel.FlxSprite.prototype.replaceColor = function(Color, NewColor, FetchPositions)
{
	var positions = null;
	if(FetchPositions)
		positions = [];
	
	var row = 0;
	var column;
	var rows = this._pixels.height;
	var columns = this._pixels.width;

	while(row < rows) {
		column = 0;
		while(column < columns) {
			if(this._pixels.getPixel32(column, row) == Color) {
				this._pixels.setPixel32(column, row, NewColor);
				if(FetchPositions)
					positions.push(new Flixel.FlxPoint(column, row));
				this.dirty = true;
			}
			column++;
		}
		row++;
	}
	
	return positions;
};

/**
 * Set <code>pixels</code> to any <code>BitmapData</code> object.
 * Automatically adjust graphic size and render helpers.
 */
Flixel.FlxSprite.prototype.getPixels = function()
{
	return this._pixels;
};

/**
 * @private
 */
Flixel.FlxSprite.prototype.setPixels = function(Pixels, Width, Height)
{
	Width = Width || 0;
	Height = Height || 0;
	
	this._pixels = Pixels;
	if(Width === 0)
		this.width = this.frameWidth = this._pixels.width;
	else
		this.width = this.frameWidth = Width;
	
	if(Height === 0)
		this.height = this.frameHeight = this._pixels.height;
	else
		this.height = this.frameHeight = Height;
	this.resetHelpers();
};

/**
 * Set <code>facing</code> using <code>FlxSprite.LEFT</code>,<code>RIGHT</code>,
 * <code>UP</code>, and <code>DOWN</code> to take advantage of
 * flipped sprites and/or just track player orientation more easily.
 */
Flixel.FlxSprite.prototype.getFacing = function()
{
	return this._facing;
};

/**
 * @private
 */
Flixel.FlxSprite.prototype.setFacing = function(Direction)
{
	if(this._facing != Direction)
		this.dirty = true;
	this._facing = Direction;
};

/**
 * Set <code>alpha</code> to a number between 0 and 1 to change the opacity of the sprite.
 */
Flixel.FlxSprite.prototype.getAlpha = function()
{
	return this._alpha;
};

/**
 * @private
 */
Flixel.FlxSprite.prototype.setAlpha = function(Alpha)
{
	if(Alpha > 1)
		Alpha = 1;
	if(Alpha < 0)
		Alpha = 0;
	if(Alpha == this._alpha)
		return;
	this._alpha = Alpha;

	if((this._alpha != 1) || (this._color !== 0x00ffffff))
		this._colorTransform = new ColorTransform((this._color>>16)*0.00392, (this._color>>8&0xff)*0.00392, (this._color&0xff)*0.00392, this._alpha);
	else
		this._colorTransform = null;
	this.dirty = true;
};

/**
 * Set <code>color</code> to a number in this format: 0xRRGGBB.
 * <code>color</code> IGNORES ALPHA.  To change the opacity use <code>alpha</code>.
 * Tints the whole sprite to be this color (similar to OpenGL vertex colors).
 */
Flixel.FlxSprite.prototype.getColor = function()
{
	return this._color;
};

/**
 * @private
 */
Flixel.FlxSprite.prototype.setColor = function(Color)
{
	Color &= 0x00ffffff;
	if(this._color == Color)
		return;
	this._color = Color;
	if((this._alpha != 1) || (this._color !== 0x00ffffff))
		this._colorTransform = new ColorTransform((this._color>>16)*0.00392, (this._color>>8&0xff)*0.00392, (this._color&0xff)*0.00392, this._alpha);
	else
		this._colorTransform = null;
	this.dirty = true;
};

/**
 * Tell the sprite to change to a specific frame of animation.
 * 
 * @param	Frame	The frame you want to display.
 */
Flixel.FlxSprite.prototype.getFrame = function()
{
	return this._curIndex;
};

/**
 * @private
 */
Flixel.FlxSprite.prototype.setFrame = function(Frame)
{
	this._curAnim = null;
	this._curIndex = Frame;
	this.dirty = true;
};

/**
 * Check and see if this object is currently on screen.
 * Differs from <code>FlxObject</code>'s implementation
 * in that it takes the actual graphic into account,
 * not just the hitbox or bounding box or whatever.
 * 
 * @param	CameraSpecify which game camera you want.  If null getScreenXY() will just grab the first global camera.
 * 
 * @return	Whether the object is on screen or not.
 */
Flixel.FlxSprite.prototype.onScreen = function(Camera)
{
	if(Camera === null)
		Camera = Flixel.FlxG.camera;
	this.getScreenXY(this._point, Camera);
	this._point.x = this._point.x - this.offset.x;
	this._point.y = this._point.y - this.offset.y;

	if(((this.angle === 0) || (this._bakedRotation > 0)) && (this.scale.x == 1) && (this.scale.y == 1))
		return ((this._point.x + this.frameWidth > 0) && 
				(this._point.x < Camera.width) && 
				(this._point.y + this.frameHeight > 0) && 
				(this._point.y < Camera.height));
	
	var halfWidth = this.frameWidth / 2;
	var halfHeight = this.frameHeight / 2;
	var absScaleX = (this.scale.x > 0) ? this.scale.x : - this.scale.x;
	var absScaleY = (this.scale.y > 0) ? this.scale.y : - this.scale.y;
	var radius = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight) * ((absScaleX >= absScaleY) ? absScaleX : absScaleY);
	this._point.x += halfWidth;
	this._point.y += halfHeight;
	return ((this._point.x + radius > 0) && 
			(this._point.x - radius < Camera.width) && 
			(this._point.y + radius > 0) && 
			(this._point.y - radius < Camera.height));
};

/**
 * Checks to see if a point in 2D world space overlaps this <code>FlxSprite</code> object's current displayed pixels.
 * This check is ALWAYS made in screen space, and always takes scroll factors into account.
 * 
 * @param	PointThe point in world space you want to check.
 * @param	MaskUsed in the pixel hit test to determine what counts as solid.
 * @param	CameraSpecify which game camera you want.  If null getScreenXY() will just grab the first global camera.
 * 
 * @return	Whether or not the point overlaps this object.
 */
Flixel.FlxSprite.prototype.pixelsOverlapPoint = function(Point, Mask, Camera)
{
	Mask = Mask || 0xFF;
	
	if(Camera === null)
		Camera = Flixel.FlxG.camera;
	this.getScreenXY(this._point, Camera);
	this._point.x = this._point.x - this.offset.x;
	this._point.y = this._point.y - this.offset.y;
	this._flashPoint.x = (Point.x - Camera.scroll.x) - this._point.x;
	this._flashPoint.y = (Point.y - Camera.scroll.y) - this._point.y;
	return this.framePixels.hitTest(this._flashPointZero, Mask, this._flashPoint);
};

/**
 * Internal function to update the current animation frame.
 */
Flixel.FlxSprite.prototype.calcFrame = function()
{
	var indexX = uint(this._curIndex * this.frameWidth);
	var indexY = 0;

	// Handle sprite sheets
	var widthHelper = this._flipped ? this._flipped : this._pixels.width;
	if(indexX >= widthHelper)
	{
		indexY = uint(indexX / widthHelper) * this.frameHeight;
		indexX %= widthHelper;
	}
	
	// handle reversed sprites
	if(this._flipped && (this._facing == Flixel.FlxObject.LEFT))
		indexX = (this._flipped << 1) - indexX - this.frameWidth;
	
	// Update display bitmap
	this._flashRect.x = indexX;
	this._flashRect.y = indexY;
	this.framePixels.copyPixels(this._pixels, this._flashRect, this._flashPointZero, null, null, false, true);
	this._flashRect.x = this._flashRect.y = 0;
	if(this._colorTransform !== null)
		this.framePixels.colorTransform(this._flashRect, this._colorTransform);
	if(this._callback !== null)
		this._callback( ( (this._curAnim !== null) ? (this._curAnim.name) : null), this._curFrame, this._curIndex);
	this.dirty = false;
};

/**
 * Set the angle to 0 and unrotate the sprite.
 */
Flixel.FlxSprite.prototype.clearAngle = function()
{
	this.angle = 0;
};

/**
 * Returns the class name.
 */
Flixel.FlxSprite.prototype.toString = function()
{
	return "FlxSprite";
};