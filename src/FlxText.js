/**
 * Extends <code>FlxSprite</code> to support rendering text.<br>
 * Can tint, fade, rotate and scale just like a sprite.<br>
 * Doesn't really animate though, as far as I know.<br>
 * Also does nice pixel-perfect centering on pixel fonts<br>
 * as long as they are only one liners.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Creates a new <code>FlxText</code> object at the specified position.
 * 
 * @param X
 *            The X position of the text.
 * @param Y
 *            The Y position of the text.
 * @param Width
 *            The width of the text object (height is determined automatically).
 * @param Text
 *            The actual text you would like to display initially.
 * @param EmbeddedFont
 *            Whether this text field uses embedded fonts or not.
 */
Flixel.FlxText = function(X, Y, Width, Text, EmbeddedFont)
{
	Flixel.FlxText.parent.constructor.apply(this, [ X, Y ]);

	if (Text === null || Text === undefined)
		Text = "";
	this.width = Width;
	this._embedFonts = (EmbeddedFont === undefined) ? true : EmbeddedFont;
	this._text = Text;
	this._font = "sans-serif";
	this._size = 12;
	this._color = Flixel.FlxG.WHITE;
	this._alignment = "left";

	this._shadow = 0;
	this.allowCollisions = Flixel.FlxObject.NONE;
	this.moves = false;
	this.calcFrame();
};
extend(Flixel.FlxText, Flixel.FlxSprite);

/**
 * Internal tracker for the alignment of the text.
 */
Flixel.FlxText.prototype._alignment = null;
/**
 * Internal reference to the text to be drawn.
 */
Flixel.FlxText.prototype._text = null;
/**
 * Internal tracker for the text shadow color, default is clear/transparent.
 */
Flixel.FlxText.prototype._shadow = 0;
/**
 * Internal tracker for the x-position of the shadow, default is 1.
 */
Flixel.FlxText.prototype._shadowX = 0;
/**
 * Internal tracker for the y-position of the shadow, default is 1.
 */
Flixel.FlxText.prototype._shadowY = 0;
/**
 * Whether this text field uses embedded fonts or not
 */
Flixel.FlxText.prototype._embedFonts = false;
/**
 * The text font.
 */
Flixel.FlxText.prototype._font = null;
/**
 * The text size.
 */
Flixel.FlxText.prototype._size = 0;

/**
 * Clean up memory.
 */
Flixel.FlxText.prototype.destroy = function()
{
	this._alignment = null;
	this._text = null;
	this._font = null;

	Flixel.FlxText.parent.destroy.apply(this);
};

/**
 * You can use this if you have a lot of text parameters to set instead of the individual properties.
 * 
 * @param Font
 *            The name of the font face for the text display.
 * @param Size
 *            The size of the font (in pixels essentially).
 * @param Color
 *            The color of the text in traditional flash 0xRRGGBB format.
 * @param Alignment
 *            A string representing the desired alignment ("left,"right" or "center").
 * @param ShadowColor
 *            A uint representing the desired text shadow color in flash 0xRRGGBB format.
 * 
 * @return This FlxText instance (nice for chaining stuff together, if you're into that).
 */
Flixel.FlxText.prototype.setFormat = function(Font, Size, Color, Alignment, ShadowColor, ShadowX, ShadowY)
{
	this._font = Font || "sans-serif";
	this._size = Size || 10;
	this._color = Color || 0xffffff;
	this._alignment = Alignment || "left";
	this._shadow = ShadowColor | 0;
	this._shadowX = ShadowX || 1;
	this._shadowY = ShadowY || 1;
	this.calcFrame();
	return this;
};

/**
 * The text being displayed.
 */
Flixel.FlxText.prototype.getText = function()
{
	return this._textField.text;
};

/**
 * @private
 */
Flixel.FlxText.prototype.setText = function(Text)
{
	var ot = this._text;
	this._text = Text;
	if (this._text != ot) {
		this.calcFrame();
	}
};

/**
 * The size of the text being displayed.
 */
Flixel.FlxText.prototype.getSize = function()
{
	return this._size;
};

/**
 * @private
 */
Flixel.FlxText.prototype.setSize = function(Size)
{
	var os = this._size;
	this._size = Size;
	if (this._size != os) {
		this.calcFrame();
	}
};

/**
 * The color of the text being displayed.
 */
Flixel.FlxText.prototype.getColor = function()
{
	return this._color;
};

/**
 * Set <code>color</code> to a number in this format: 0xRRGGBB. <code>color</code> IGNORES ALPHA. To change the opacity use <code>alpha</code>. Tints the whole sprite to be this color (similar
 * to OpenGL vertex colors).
 */
Flixel.FlxText.prototype.setColor = function(Color)
{
	var oc = this._color;
	this._color = Color;
	if (this._color != oc) {
		this.calcFrame();
	}
};

/**
 * The font used for this text.
 */
Flixel.FlxText.prototype.getFont = function()
{
	return this._font;
};

/**
 * Set the text font.
 */
Flixel.FlxText.prototype.setFont = function(Font)
{
	var of = this._font;
	this._font = Font;
	if (this._font != of) {
		this.calcFrame();
	}
};

/**
 * The alignment of the font ("left", "right", or "center").
 */
Flixel.FlxText.prototype.getAlignment = function()
{
	return this._alignment;
};

/**
 * Set the text aligment.
 */
Flixel.FlxText.prototype.setAlignment = function(Alignment)
{
	var oa = this._alignment;
	this._alignment = Alignment;
	if (this._alignment != oa) {
		this.calcFrame();
	}
};

/**
 * The size of the text shadow.
 */
Flixel.FlxText.prototype.getShadowSizeX = function()
{
	return this._shadowX;
};

/**
 * The position of the text shadow.
 * 
 * @param ShadowX
 *            The x-position
 * @param ShadowY
 *            The y-position
 */
Flixel.FlxText.prototype.setShadowSize = function(ShadowX, ShadowY)
{
	this._shadowX = ShadowX;
	this._shadowY = ShadowY;
};

/**
 * The position of the text shadow.
 * 
 * @param size
 *            The shadow position.
 */
Flixel.FlxText.prototype.setShadowSizeXY = function(size)
{
	this._shadowX = size;
	this._shadowY = size;
};

/**
 * The x-position of the text shadow.
 */
Flixel.FlxText.prototype.setShadowX = function(ShadowX)
{
	this._shadowX = ShadowX;
};

/**
 * The y-position of the text shadow.
 */
Flixel.FlxText.prototype.setShadowY = function(ShadowY)
{
	this._shadowY = ShadowY;
};

/**
 * Set the shadow parameters.
 * 
 * @param color
 *            The shadow color.
 * @param size
 *            The shadow size in pixels.
 */
Flixel.FlxText.prototype.setShadow = function(color, sizeX, sizeY)
{
	this._shadow = color;
	this._shadowX = sizeX || 1;
	this._shadowY = sizeY || 1;
	this.calcFrame();
};

/**
 * The color of the text shadow in 0xAARRGGBB hex format.
 */
Flixel.FlxText.prototype.getShadowColor = function()
{
	return this._shadow;
};

/**
 * Internal function to update the current animation frame.
 */
Flixel.FlxText.prototype.calcFrame = function()
{
	this.dirty = false;

	// Need to generate a new buffer to store the text graphic
	var hasBr = this._text.split("\n").length > 1;
	var numLines = (!hasBr) ? (this._text.length * this._size) / this.width : this._text.split("\n").length;
	numLines = (numLines > 1) ? int(numLines) : 1;

	this.height = int(numLines * this._size);
	this.height += 4; // account for 2px gutter on top and bottom

	this._pixels = new BitmapData(this.width + this._shadowX, this.height + this._shadowY, true, 0);

	this.frameHeight = this.height + this._shadowY;
	this.frameWidth = this.width + this._shadowX;
	this._flashRect.x = 0;
	this._flashRect.y = 0;
	this._flashRect.width = this.frameWidth;
	this._flashRect.height = this.frameHeight;

	// Calculate the offset
	var offsetX = 0;
	if (this._alignment == "left" || this._alignment == "start") {
		offsetX = 0;
	} else if (this._alignment == "right" || this._alignment == "end") {
		offsetX = this.width - int(this._pixels.context.measureText(this._text).width) - 3;
	} else if (this._alignment == "center") {
		offsetX = (this.width / 2) - int(this._pixels.context.measureText(this._text).width / 2);
	}

	// Split the text into lines
	var textArray = this._text.split("\n");
	var _y = 0;
	var _height = this.height / textArray.length;

	// Loop throw all the possible lines
	for (var i = 0; i < textArray.length; i++) {
		var line = textArray[i];

		// Render a single pixel shadow beneath the text
		if (this._shadow > 0) {
			this._pixels.context.font = this._size + "px " + this._font;
			this._pixels.context.fillStyle = BitmapData.makeRGBA(this._shadow, this._alpha);
			this._pixels.context.fillText(line, this._shadowX + offsetX, this._shadowY + _height + 3 + _y);
		}

		// Actually draw the text onto the buffer
		this._pixels.context.font = this._size + "px " + this._font;
		this._pixels.context.fillStyle = BitmapData.makeRGBA(this._color, this._alpha);
		this._pixels.context.fillText(line, offsetX, (_height / 2) + 3 + _y);

		_y += this._size;
	}

	// Finally, update the visible pixels
	if ((this.framePixels === null) || (this.framePixels.width != this._pixels.width) || (this.framePixels.height != this._pixels.height))
		this.framePixels = new BitmapData(this._pixels.width, this._pixels.height, true, 0);
	this.framePixels.copyPixels(this._pixels, this._flashRect, this._flashPointZero, null, null, false, true);
};

/**
 * Returns the class name.
 */
Flixel.FlxText.prototype.toString = function()
{
	return "FlxText";
};