/**
 * FlxBar
 * -- Part of the Flixel Power Tools set
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Richard Davey / Photon Storm
 */

/**
 * FlxBar is a quick and easy way to create a graphical bar which can
 * be used as part of your UI/HUD, or positioned next to a sprite. It could represent
 * a loader, progress or health bar.
 */

/**
 * Create a new FlxBar Object
 * 
 * @param x
 *            The x coordinate location of the resulting bar (in world pixels)
 * @param y
 *            The y coordinate location of the resulting bar (in world pixels)
 * @param direction
 *            One of the FlxBar.FILL_ constants (such as FILL_LEFT_TO_RIGHT,
 *            FILL_TOP_TO_BOTTOM etc)
 * @param width
 *            The width of the bar in pixels
 * @param height
 *            The height of the bar in pixels
 * @param parentRef
 *            A reference to an object in your game that you wish the bar to
 *            track
 * @param variable
 *            The variable of the object that is used to determine the bar
 *            position. For example if the parent was an FlxSprite this could be
 *            "health" to track the health value
 * @param min
 *            The minimum value. I.e. for a progress bar this would be zero
 *            (nothing loaded yet)
 * @param max
 *            The maximum value the bar can reach. I.e. for a progress bar this
 *            would typically be 100.
 * @param border
 *            Include a 1px border around the bar? (if true it adds +2 to width
 *            and height to accommodate it)
 */
Flixel.plugin.powertools.FlxBar = function(x, y, direction, width, height, parentRef, variable, min, max, border)
{
	Flixel.plugin.powertools.FlxBar.parent.constructor.apply(this, [x, y]);
	
	direction = (direction === undefined) ? Flixel.plugin.powertools.FlxBar.FILL_LEFT_TO_RIGHT : direction;
	width = (width === undefined) ?  100 : width;
	height = (height === undefined) ?  10 : height;
	parentRef = (parentRef === undefined) ? null : parentRef;
	variable = (variable === undefined) ? "" : variable;
	min = (min === undefined) ? 0 : min;
	max = (max === undefined) ? 100 : max;
	border = (border === undefined) ? false : border;

	this.barWidth = width;
	this.barHeight = height;

	if (border) {
		this.makeGraphic(this.barWidth + 2, this.barHeight + 2, 0xffffffff, true);
		this.filledBarPoint = new Flixel.FlxPoint(1, 1);
	} else {
		this.makeGraphic(this.barWidth, this.barHeight, 0xffffffff, true);
		this.filledBarPoint = new Flixel.FlxPoint(0, 0);
	}

	this.canvas = new BitmapData(width, height, true, 0x0);

	if (parentRef) {
		this.parent = parentRef;
		this.parentVariable = variable;
	}

	this.setFillDirection(direction);

	this.setRange(min, max);

	this.createFilledBar(0xff005100, 0xff00F400, border);

	this.emptyKill = false;
};
extend(Flixel.plugin.powertools.FlxBar, Flixel.FlxSprite);

Flixel.plugin.powertools.FlxBar.prototype.canvas = null;

Flixel.plugin.powertools.FlxBar.prototype.barType = 0;
Flixel.plugin.powertools.FlxBar.prototype.barWidth = 0;
Flixel.plugin.powertools.FlxBar.prototype.barHeight = 0;

Flixel.plugin.powertools.FlxBar.prototype.parent = null;
Flixel.plugin.powertools.FlxBar.prototype.parentVariable = null;

/**
 * fixedPosition controls if the FlxBar sprite is at a fixed location on screen,
 * or tracking its parent
 */
Flixel.plugin.powertools.FlxBar.prototype.fixedPosition = true;

/**
 * The positionOffset controls how far offset the FlxBar is from the parent
 * sprite (if at all)
 */
Flixel.plugin.powertools.FlxBar.prototype.positionOffset = null;

/**
 * The minimum value the bar can be (can never be >= max)
 */
Flixel.plugin.powertools.FlxBar.prototype.min = 0;

/**
 * The maximum value the bar can be (can never be <= min)
 */
Flixel.plugin.powertools.FlxBar.prototype.max = 0;

/**
 * How wide is the range of this bar? (max - min)
 */
Flixel.plugin.powertools.FlxBar.prototype.range = 0;

/**
 * What 1% of the bar is equal to in terms of value (range / 100)
 */
Flixel.plugin.powertools.FlxBar.prototype.pct = 0;

/**
 * The current value - must always be between min and max
 */
Flixel.plugin.powertools.FlxBar.prototype.value = 0;

/**
 * How many pixels = 1% of the bar (barWidth (or height) / 100)
 */
Flixel.plugin.powertools.FlxBar.prototype.pxPerPercent = 0;

Flixel.plugin.powertools.FlxBar.prototype.emptyCallback = null;
Flixel.plugin.powertools.FlxBar.prototype.emptyBar = null;
Flixel.plugin.powertools.FlxBar.prototype.emptyBarRect = null;
Flixel.plugin.powertools.FlxBar.prototype.emptyBarPoint = null;
Flixel.plugin.powertools.FlxBar.prototype.emptyKill = false;
Flixel.plugin.powertools.FlxBar.prototype.zeroOffset = new Flixel.FlxPoint();

Flixel.plugin.powertools.FlxBar.prototype.filledCallback = null;
Flixel.plugin.powertools.FlxBar.prototype.filledBar = null;
Flixel.plugin.powertools.FlxBar.prototype.filledBarRect = null;
Flixel.plugin.powertools.FlxBar.prototype.filledBarPoint = null;

Flixel.plugin.powertools.FlxBar.prototype.fillDirection = 0;
Flixel.plugin.powertools.FlxBar.prototype.fillHorizontal = false;

Flixel.plugin.powertools.FlxBar.FILL_LEFT_TO_RIGHT = 1;
Flixel.plugin.powertools.FlxBar.FILL_RIGHT_TO_LEFT = 2;
Flixel.plugin.powertools.FlxBar.FILL_TOP_TO_BOTTOM = 3;
Flixel.plugin.powertools.FlxBar.FILL_BOTTOM_TO_TOP = 4;
Flixel.plugin.powertools.FlxBar.FILL_HORIZONTAL_INSIDE_OUT = 5;
Flixel.plugin.powertools.FlxBar.FILL_HORIZONTAL_OUTSIDE_IN = 6;
Flixel.plugin.powertools.FlxBar.FILL_VERTICAL_INSIDE_OUT = 7;
Flixel.plugin.powertools.FlxBar.FILL_VERTICAL_OUTSIDE_IN = 8;

Flixel.plugin.powertools.FlxBar.BAR_FILLED = 1;
Flixel.plugin.powertools.FlxBar.BAR_GRADIENT = 2;
Flixel.plugin.powertools.FlxBar.BAR_IMAGE = 3;

/**
 * Track the parent FlxSprites x/y coordinates. For example if you wanted your
 * sprite to have a floating health-bar above their head. If your health bar is
 * 10px tall and you wanted it to appear above your sprite, then set offsetY to
 * be -10 If you wanted it to appear below your sprite, and your sprite was 32px
 * tall, then set offsetY to be 32. Same applies to offsetX.
 * 
 * @param offsetX
 *            The offset on X in relation to the origin x/y of the parent
 * @param offsetY
 *            The offset on Y in relation to the origin x/y of the parent
 * @see stopTrackingParent
 */
Flixel.plugin.powertools.FlxBar.prototype.trackParent = function(offsetX, offsetY)
{
	this.fixedPosition = false;
	
	this.positionOffset = new Flixel.FlxPoint(offsetX, offsetY);
	
	if (this.parent.scrollFactor)
	{
		this.scrollFactor.x = this.parent.scrollFactor.x;
		this.scrollFactor.y = this.parent.scrollFactor.y;
	}
};


/**
 * Sets a parent for this FlxBar. Instantly replaces any previously set parent
 * and refreshes the bar.
 * 
 * @param parentRef
 *            A reference to an object in your game that you wish the bar to
 *            track
 * @param variable
 *            The variable of the object that is used to determine the bar
 *            position. For example if the parent was an FlxSprite this could be
 *            "health" to track the health value
 * @param track
 *            If you wish the FlxBar to track the x/y coordinates of parent set
 *            to true (default false)
 * @param offsetX
 *            The offset on X in relation to the origin x/y of the parent
 * @param offsetY
 *            The offset on Y in relation to the origin x/y of the parent
 */
Flixel.plugin.powertools.FlxBar.prototype.setParent = function(parentRef, variable, track, offsetX, offsetY)
{
	track = (track === undefined) ? false : track;
	offsetX = (offsetX === undefined) ? 0 : offsetX;
	offsetY = (offsetY === undefined) ? 0 : offsetY;
	
	this.parent = parentRef;
	this.parentVariable = variable;
	
	if (track) {
		this.trackParent(offsetX, offsetY);
	}
	
	this.updateValueFromParent();
	this.updateBar();
};


/**
 * Tells the health bar to stop following the parent sprite. The given posX and
 * posY values are where it will remain on-screen.
 * 
 * @param posX
 *            X coordinate of the health bar now it's no longer tracking the
 *            parent sprite
 * @param posY
 *            Y coordinate of the health bar now it's no longer tracking the
 *            parent sprite
 */
Flixel.plugin.powertools.FlxBar.prototype.stopTrackingParent = function(posX, posY)
{
	this.fixedPosition = true;
	
	this.x = posX;
	this.y = posY;
};

/**
 * Sets callbacks which will be triggered when the value of this FlxBar reaches
 * min or max.<br>
 * Functions will only be called once and not again until the value changes.<br>
 * Optionally the FlxBar can be killed if it reaches min, but if will fire the
 * empty callback first (if set)
 * 
 * @param onEmpty
 *            The function that is called if the value of this FlxBar reaches
 *            min
 * @param onFilled
 *            The function that is called if the value of this FlxBar reaches
 *            max
 * @param killOnEmpty
 *            If set it will call FlxBar.kill() if the value reaches min
 */
Flixel.plugin.powertools.FlxBar.prototype.setCallbacks = function(onEmpty, onFilled, killOnEmpty)
{
	killOnEmpty = (killOnEmpty === undefined) ? false : killOnEmpty;
	onEmpty = (onEmpty === undefined) ? null : onEmpty;
	onFilled = (onFilled === undefined) ? null : onFilled;
	
	if (onEmpty !== null) {
		this.emptyCallback = onEmpty;
	}
	
	if (onFilled !== null) {
		this.filledCallback = onFilled;
	}
	
	if (killOnEmpty) {
		this.emptyKill = true;
	}
};

/**
 * If this FlxBar should be killed when its value reaches empty, set to true
 */
Flixel.plugin.powertools.FlxBar.prototype.setKillOnEmpty = function(value)
{
	this.emptyKill = value;
};

Flixel.plugin.powertools.FlxBar.prototype.getKillOnEmpty = function()
{
	return this.emptyKill;
};

/**
 * Set the minimum and maximum allowed values for the FlxBar
 * 
 * @param min
 *            The minimum value. I.e. for a progress bar this would be zero
 *            (nothing loaded yet)
 * @param max
 *            The maximum value the bar can reach. I.e. for a progress bar this
 *            would typically be 100.
 */
Flixel.plugin.powertools.FlxBar.prototype.setRange = function(min, max)
{
	if (max <= min) {
		throw Error("FlxBar: max cannot be less than or equal to min");
	}
	
	this.min = min;
	this.max = max;
	
	this.range = max - min;
	
	if (this.range < 100) {
		this.pct = this.range / 100;
	} else {
		this.pct = this.range / 100;
	}
	
	if (this.fillHorizontal) {
		this.pxPerPercent = this.barWidth / 100;
	} else {
		this.pxPerPercent = this.barHeight / 100;
	}
	
	if (this.value)
	{
		if (this.value > max) {
			this.value = max;
		}
		
		if (this.value < min) {
			this.value = min;
		}
	} else {
		this.value = min;
	}
};

Flixel.plugin.powertools.FlxBar.prototype.debug = function()
{
	Flixel.FlxG.log("FlxBar - Min:", this.min, "Max:", this.max, "Range:", this.range, "pct:", this.pct, "pxp:", this.pxPerPercent, "Value:", this.value);
};

Flixel.plugin.powertools.FlxBar.prototype.getStats = function()
{
	var data = {
		min: this.min,
		max: this.max,
		range: this.range,
		pct: this.pct,
		pxPerPct: this.pxPerPercent,
		fillH: this.fillHorizontal
	};
	
	return data;
};

/**
 * Creates a solid-colour filled health bar in the given colours, with optional
 * 1px thick border. All colour values are in 0xAARRGGBB format, so if you want
 * a slightly transparent health bar give it lower AA values.
 * 
 * @param empty
 *            The color of the bar when empty in 0xAARRGGBB format (the
 *            background colour)
 * @param fill
 *            The color of the bar when full in 0xAARRGGBB format (the
 *            foreground colour)
 * @param showBorder
 *            Should the bar be outlined with a 1px solid border?
 * @param border
 *            The border colour in 0xAARRGGBB format
 */
Flixel.plugin.powertools.FlxBar.prototype.createFilledBar = function (empty, fill, showBorder, border)
{
	showBorder = (showBorder ===  undefined) ? false : showBorder;
	border = (border === undefined) ? 0xffffffff : border;

	this.barType = Flixel.plugin.powertools.FlxBar.BAR_FILLED;
	
	if (showBorder) {
		this.emptyBar = new BitmapData(this.barWidth, this.barHeight, true, border);
		this.emptyBar.fillRect(new Flixel.FlxRect(1, 1, this.barWidth - 2, this.barHeight - 2), empty);
		
		this.filledBar = new BitmapData(this.barWidth, this.barHeight, true, border);
		this.filledBar.fillRect(new Flixel.FlxRect(1, 1, this.barWidth - 2, this.barHeight - 2), fill);
	} else {
		this.emptyBar = new BitmapData(this.barWidth, this.barHeight, true, empty);
		this.filledBar = new BitmapData(this.barWidth, this.barHeight, true, fill);
	}
	
	this.filledBarRect = new Flixel.FlxRect(0, 0, this.filledBar.width, this.filledBar.height);
	this.emptyBarRect = new Flixel.FlxRect(0, 0, this.emptyBar.width, this.emptyBar.height);
};

/**
 * Creates a gradient filled health bar using the given colour ranges, with
 * optional 1px thick border. All colour values are in 0xAARRGGBB format, so if
 * you want a slightly transparent health bar give it lower AA values.
 * 
 * @param empty
 *            Array of colour values used to create the gradient of the health
 *            bar when empty, each colour must be in 0xAARRGGBB format (the
 *            background colour)
 * @param fill
 *            Array of colour values used to create the gradient of the health
 *            bar when full, each colour must be in 0xAARRGGBB format (the
 *            foreground colour)
 * @param chunkSize
 *            If you want a more old-skool looking chunky gradient, increase
 *            this value!
 * @param rotation
 *            Angle of the gradient in degrees. 90 = top to bottom, 180 = left
 *            to right. Any angle is valid
 * @param showBorder
 *            Should the bar be outlined with a 1px solid border?
 * @param border
 *            The border colour in 0xAARRGGBB format
 */
Flixel.plugin.powertools.FlxBar.prototype.createGradientBar = function(empty, fill, chunkSize, rotation, showBorder, border)
{
	chunkSize = (chunkSize === undefined) ? 1 : chunkSize;
	rotation = (rotation === undefined) ? 180 : rotation;
	showBorder = (showBorder ===  undefined) ? false : showBorder;
	border = (border === undefined) ? 0xffffffff : border;

	this.barType = Flixel.plugin.powertools.FlxBar.BAR_GRADIENT;
	
	if (showBorder) {
// emptyBar = new BitmapData(barWidth, barHeight, true, border);
	// FlxGradient.overlayGradientOnBitmapData(emptyBar, barWidth - 2, barHeight
	// - 2, empty, 1, 1, chunkSize, rotation);
		
		// filledBar = new BitmapData(barWidth, barHeight, true, border);
		// FlxGradient.overlayGradientOnBitmapData(filledBar, barWidth - 2,
		// barHeight - 2, fill, 1, 1, chunkSize, rotation);
	} else {
		// emptyBar = FlxGradient.createGradientBitmapData(barWidth, barHeight,
		// empty, chunkSize, rotation);
		// filledBar = FlxGradient.createGradientBitmapData(barWidth, barHeight,
		// fill, chunkSize, rotation);
	}
	
	this.emptyBarRect = new Flixel.FlxRect(0, 0, this.emptyBar.width, this.emptyBar.height);
	this.filledBarRect = new Flixel.FlxRect(0, 0, this.filledBar.width, this.filledBar.height);
};

/**
 * Creates a health bar filled using the given bitmap images. You can provide
 * "empty" (background) and "fill" (foreground) images. either one or both
 * images (empty / fill), and use the optional empty/fill colour values All
 * colour values are in 0xAARRGGBB format, so if you want a slightly transparent
 * health bar give it lower AA values.
 * 
 * @param empty
 *            Bitmap image used as the background (empty part) of the health
 *            bar, if null the emptyBackground colour is used
 * @param fill
 *            Bitmap image used as the foreground (filled part) of the health
 *            bar, if null the fillBackground colour is used
 * @param emptyBackground
 *            If no background (empty) image is given, use this colour value
 *            instead. 0xAARRGGBB format
 * @param fillBackground
 *            If no foreground (fill) image is given, use this colour value
 *            instead. 0xAARRGGBB format
 */
Flixel.plugin.powertools.FlxBar.prototype.createImageBar = function(empty, fill, emptyBackground, fillBackground)
{
	empty = (empty === undefined) ? null : empty;
	fill = (fill === undefined) ? null : fill;
	emptyBackground = (emptyBackground === undefined) ? 0xff000000 : emptyBackground;
	fillBackground = (fillBackground === undefined) ? 0xff00ff00 : fillBackground;
	
	this.barType = Flixel.plugin.powertools.FlxBar.BAR_IMAGE;
	
	if (empty === null && fill === null) {
		return;
	}
	
	if (empty !== null && fill === null) {
		// If empty is set, but fill is not ...

		this.emptyBar = Flixel.FlxG.addBitmap(empty, false, true);
		this.emptyBarRect = new Flixel.FlxRect(0, 0, this.emptyBar.width, this.emptyBar.height);
		
		this.barWidth = this.emptyBarRect.width;
		this.barHeight = this.emptyBarRect.height;
		
		this.filledBar = new BitmapData(this.barWidth, this.barHeight, true, fillBackground);
		this.filledBarRect = new Flixel.FlxRect(0, 0, this.barWidth, this.barHeight);
	}
	else if (empty === null && fill)
	{
		// If fill is set, but empty is not ...

		this.filledBar = Flixel.FlxG.addBitmap(fill, false, true);
		this.filledBarRect = new Flixel.FlxRect(0, 0, this.filledBar.width, this.filledBar.height);
		
		this.barWidth = this.filledBarRect.width;
		this.barHeight = this.filledBarRect.height;
		
		this.emptyBar = new BitmapData(this.barWidth, this.barHeight, true, emptyBackground);
		this.emptyBarRect = new Flixel.FlxRect(0, 0, this.barWidth, this.barHeight);
	}
	else if (empty && fill)
	{
		// If both are set
		
		this.emptyBar = Flixel.FlxG.addBitmap(empty, false, true);
		this.emptyBarRect = new Flixel.FlxRect(0, 0, this.emptyBar.width, this.emptyBar.height);
		
		this.filledBar = Flixel.FlxG.addBitmap(fill, false, true);
		this.filledBarRect = new Flixel.FlxRect(0, 0, this.filledBar.width, this.filledBar.height);
		
		this.barWidth = this.emptyBarRect.width;
		this.barHeight = this.emptyBarRect.height;
	}
	
	this.canvas = new BitmapData(this.barWidth, this.barHeight, true, 0x0);
	
	if (this.fillHorizontal) {
		this.pxPerPercent = this.barWidth / 100;
	} else {
		this.pxPerPercent = this.barHeight / 100;
	}
};

/**
 * Set the direction from which the health bar will fill-up. Default is from
 * left to right. Change takes effect immediately.
 * 
 * @param direction
 *            One of the FlxBar.FILL_ constants (such as FILL_LEFT_TO_RIGHT,
 *            FILL_TOP_TO_BOTTOM etc)
 */
Flixel.plugin.powertools.FlxBar.prototype.setFillDirection = function(direction)
{
	switch (direction)
	{
		case Flixel.plugin.powertools.FlxBar.FILL_LEFT_TO_RIGHT:
		case Flixel.plugin.powertools.FlxBar.FILL_RIGHT_TO_LEFT:
		case Flixel.plugin.powertools.FlxBar.FILL_HORIZONTAL_INSIDE_OUT:
		case Flixel.plugin.powertools.FlxBar.FILL_HORIZONTAL_OUTSIDE_IN:
			this.fillDirection = direction;
			this.fillHorizontal = true;
			break;
		case Flixel.plugin.powertools.FlxBar.FILL_TOP_TO_BOTTOM:
		case Flixel.plugin.powertools.FlxBar.FILL_BOTTOM_TO_TOP:
		case Flixel.plugin.powertools.FlxBar.FILL_VERTICAL_INSIDE_OUT:
		case Flixel.plugin.powertools.FlxBar.FILL_VERTICAL_OUTSIDE_IN:
			this.fillDirection = direction;
			this.fillHorizontal = false;
			break;
	}
};

Flixel.plugin.powertools.FlxBar.prototype.updateValueFromParent = function()
{
	this.updateValue(this.parent[this.parentVariable]);
};

Flixel.plugin.powertools.FlxBar.prototype.updateValue = function(newValue)
{
	if (this.newValue > this.max) {
		this.newValue = this.max;
	}
	
	if (this.newValue < this.min) {
		this.newValue = this.min;
	}
	
	this.value = newValue;
	
	if (this.value == this.min && this.emptyCallback !== null) {
		this.emptyCallback();
	}
	
	if (this.value == this.max && this.filledCallback !== null) {
		this.filledCallback();
	}
	
	if (this.value == this.min && this.emptyKill) {
		this.kill();
	}
};

/**
 * Internal Called when the health bar detects a change in the health of the
 * parent.
 */
Flixel.plugin.powertools.FlxBar.prototype.updateBar = function()
{
	if (this.fillHorizontal) {
		this.filledBarRect.width = int(this.percent * this.pxPerPercent);
	} else {
		this.filledBarRect.height = int(this.percent * this.pxPerPercent);
	}
	
	this.canvas.copyPixels(this.emptyBar, this.emptyBarRect, this.zeroOffset);
	
	if (this.percent > 0)
	{
		switch (this.fillDirection)
		{
			case Flixel.plugin.powertools.FlxBar.FILL_LEFT_TO_RIGHT:
			case Flixel.plugin.powertools.FlxBar.FILL_TOP_TO_BOTTOM:
				// Already handled above
				break;
				
			case Flixel.plugin.powertools.FlxBar.FILL_BOTTOM_TO_TOP:
				this.filledBarRect.y = this.barHeight - this.filledBarRect.height;
				this.filledBarPoint.y = this.barHeight - this.filledBarRect.height;
				break;
				
			case Flixel.plugin.powertools.FlxBar.FILL_RIGHT_TO_LEFT:
				this.filledBarRect.x = this.barWidth - this.filledBarRect.width;
				this.filledBarPoint.x = this.barWidth - this.filledBarRect.width;
				break;
				
			case Flixel.plugin.powertools.FlxBar.FILL_HORIZONTAL_INSIDE_OUT:
				this.filledBarRect.x = int((this.barWidth / 2) - (this.filledBarRect.width / 2));
				this.filledBarPoint.x = int((this.barWidth / 2) - (this.filledBarRect.width / 2));
				break;
				
			case Flixel.plugin.powertools.FlxBar.FILL_HORIZONTAL_OUTSIDE_IN:
				this.filledBarRect.width = int(100 - this.percent * this.pxPerPercent);
				this.filledBarPoint.x = int((this.barWidth - this.filledBarRect.width) / 2);
				break;
				
			case Flixel.plugin.powertools.FlxBar.FILL_VERTICAL_INSIDE_OUT:
				this.filledBarRect.y = int((this.barHeight / 2) - (this.filledBarRect.height / 2));
				this.filledBarPoint.y = int((this.barHeight / 2) - (this.filledBarRect.height / 2));
				break;
				
			case Flixel.plugin.powertools.FlxBar.FILL_VERTICAL_OUTSIDE_IN:
				this.filledBarRect.height = int(100 - this.percent * this.pxPerPercent);
				this.filledBarPoint.y = int((this.barHeight- this.filledBarRect.height) / 2);
				break;
		}
		
		this.canvas.copyPixels(this.filledBar, this.filledBarRect, this.filledBarPoint);
		
	}
	
	this.setPixels(this.canvas);
};

Flixel.plugin.powertools.FlxBar.prototype.update = function()
{
	if (this.parent)
	{
		if (this.parent[this.parentVariable] != this.value)
		{
			this.updateValueFromParent();
			this.updateBar();
		}
		
		if (this.fixedPosition === false)
		{
			this.x = this.parent.x + this.positionOffset.x;
			this.y = this.parent.y + this.positionOffset.y;
		}
	}
};

/**
 * The percentage of how full the bar is (a value between 0 and 100)
 */
Flixel.plugin.powertools.FlxBar.prototype.getPercent = function()
{
	if (this.value > this.max) {
		return 100;
	}
	
	return Math.floor((this.value / this.range) * 100);
};

/**
 * Sets the percentage of how full the bar is (a value between 0 and 100). This
 * changes FlxBar.currentValue
 */
Flixel.plugin.powertools.FlxBar.prototype.setPercent = function(newPct)
{
	if (newPct >= 0 && newPct <= 100) {
		this.updateValue(this.pct * newPct);
		this.updateBar();
	}
};

/**
 * Set the current value of the bar (must be between min and max range)
 */
Flixel.plugin.powertools.FlxBar.prototype.setCurrentValue = function(newValue)
{
	this.updateValue(newValue);
	this.updateBar();
};

/**
 * The current actual value of the bar
 */
Flixel.plugin.powertools.FlxBar.prototype.getCurrentValue = function()
{
	return this.value;
};