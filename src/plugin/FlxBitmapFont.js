/**
 * FlxBitmapFont
 * -- Part of the Flixel Power Tools set
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Richard Davey / Photon Storm
 */

/**
 * Loads 'font' and prepares it for use by future calls to .text
 * 
 * @param font
 *            The font set graphic class (as defined by your embed)
 * @param characterWidth
 *            The width of each character in the font set.
 * @param characterHeight
 *            The height of each character in the font set.
 * @param chars
 *            The characters used in the font set, in display order. You can use the TEXT_SET consts for common font set arrangements.
 * @param charsPerRow
 *            The number of characters per row in the font set.
 * @param xSpacing
 *            If the characters in the font set have horizontal spacing between them set the required amount here.
 * @param ySpacing
 *            If the characters in the font set have vertical spacing between them set the required amount here
 * @param xOffset
 *            If the font set doesn't start at the top left of the given image, specify the X coordinate offset here.
 * @param yOffset
 *            If the font set doesn't start at the top left of the given image, specify the Y coordinate offset here.
 */
Flixel.plugin.FlxBitmapFont = function(font, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset)
{
	xSpacing = (xSpacing === undefined) ? 0 : xSpacing;
	ySpacing = (ySpacing === undefined) ? 0 : ySpacing;
	xOffset = (xOffset === undefined) ? 0 : xOffset;
	yOffset = (yOffset === undefined) ? 0 : yOffset;

	
	Flixel.plugin.FlxBitmapFont.parent.constructor.apply(this);
	
	// Take a copy of the font for internal use
	this._font = Flixel.FlxG.addBitmap(font);

	this.characterWidth = characterWidth;
	this.characterHeight = characterHeight;

	this.characterSpacingX = xSpacing;
	this.characterSpacingY = ySpacing;
	this.characterPerRow = charsPerRow;
	this.offsetX = xOffset;
	this.offsetY = yOffset;

	this.grabData = [];
	this._alpha = 1.0;
	this._color = Flixel.FlxG.WHITE;

	// Now generate our rects for faster copyPixels later on
	var currentX = this.offsetX;
	var currentY = this.offsetY;
	var r = 0;

	for (var c = 0; c < chars.length; c++) {
		// The rect is hooked to the ASCII value of the character
		this.grabData[chars.charCodeAt(c)] = new Flixel.FlxRect(currentX, currentY, this.characterWidth, this.characterHeight);

		r++;

		if (r == this.characterPerRow) {
			r = 0;
			currentX = this.offsetX;
			currentY += this.characterHeight + this.characterSpacingY;
		} else {
			currentX += this.characterWidth + this.characterSpacingX;
		}
	}
};
extend(Flixel.plugin.FlxBitmapFont, Flixel.FlxSprite);

/**
 * Align each line of multi-line text to the left.
 */
Flixel.plugin.FlxBitmapFont.ALIGN_LEFT = "left";
/**
 * Align each line of multi-line text to the right.
 */
Flixel.plugin.FlxBitmapFont.ALIGN_RIGHT = "right";
/**
 * Align each line of multi-line text in the center.
 */
Flixel.plugin.FlxBitmapFont.ALIGN_CENTER = "center";
/**
 * Text Set 1 = !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET1 = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
/**
 * Text Set 2 = !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET2 = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * Text Set 3 = ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
/**
 * Text Set 4 = ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789";
/**
 * Text Set 5 = ABCDEFGHIJKLMNOPQRSTUVWXYZ.,/() '!?-*:0123456789
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,/() '!?-*:0123456789";
/**
 * Text Set 6 = ABCDEFGHIJKLMNOPQRSTUVWXYZ!?:;0123456789\"(),-.'
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET6 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?:;0123456789\"(),-.' ";
/**
 * Text Set 7 = AGMSY+:4BHNTZ!;5CIOU.?06DJPV,(17EKQW\")28FLRX-'39
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET7 = "AGMSY+:4BHNTZ!;5CIOU.?06DJPV,(17EKQW\")28FLRX-'39";
/**
 * Text Set 8 = 0123456789 .ABCDEFGHIJKLMNOPQRSTUVWXYZ
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET8 = "0123456789 .ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * Text Set 9 = ABCDEFGHIJKLMNOPQRSTUVWXYZ()-0123456789.:,'\"?!
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET9 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ()-0123456789.:,'\"?!";
/**
 * Text Set 10 = ABCDEFGHIJKLMNOPQRSTUVWXYZ
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET10 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * Text Set 11 = ABCDEFGHIJKLMNOPQRSTUVWXYZ.,\"-+!?()':;0123456789
 */
Flixel.plugin.FlxBitmapFont.TEXT_SET11 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,\"-+!?()':;0123456789";
/**
 * Alignment of the text when multiLine = true or a fixedWidth is set. Set to FlxBitmapFont.ALIGN_LEFT (default), FlxBitmapFont.ALIGN_RIGHT or
 * FlxBitmapFont.ALIGN_CENTER.
 */
Flixel.plugin.FlxBitmapFont.prototype.align = Flixel.plugin.FlxBitmapFont.ALIGN_LEFT;
/**
 * If set to true all carriage-returns in text will form new lines (see align). If false the font will only contain one single line of text (the
 * default)
 */
Flixel.plugin.FlxBitmapFont.prototype.multiLine = false;
/**
 * Automatically convert any text to upper case. Lots of old bitmap fonts only contain upper-case characters, so the default is true.
 */
Flixel.plugin.FlxBitmapFont.prototype.autoUpperCase = true;
/**
 * Adds horizontal spacing between each character of the font, in pixels. Default is 0.
 */
Flixel.plugin.FlxBitmapFont.prototype.customSpacingX = 0;

/**
 * Adds vertical spacing between each line of multi-line text, set in pixels. Default is 0.
 */
Flixel.plugin.FlxBitmapFont.prototype.customSpacingY = 0;
/**
 * The text we want to write.
 */
Flixel.plugin.FlxBitmapFont.prototype._text = null;
/**
 * Internval values. All set in the constructor. They should not be changed after that point.
 */
Flixel.plugin.FlxBitmapFont.prototype._font = null;
/**
 * The width of each character in the font set.
 */
Flixel.plugin.FlxBitmapFont.prototype.characterWidth = 0;
/**
 * The height of each character in the font set.
 */
Flixel.plugin.FlxBitmapFont.prototype.characterHeight = 0;
Flixel.plugin.FlxBitmapFont.prototype.characterSpacingX = 0;
Flixel.plugin.FlxBitmapFont.prototype.characterSpacingY = 0;
Flixel.plugin.FlxBitmapFont.prototype.characterPerRow = 0;
/**
 * The group of texture regions that will be used to draw the text.
 */
Flixel.plugin.FlxBitmapFont.prototype.grabData = null;
Flixel.plugin.FlxBitmapFont.prototype.fixedWidth = 0;

/**
 * If you need this FlxSprite to have a fixed width and custom alignment you can set the width here.<br>
 * If text is wider than the width specified it will be cropped off.
 * 
 * @param width
 *            Width in pixels of this FlxBitmapFont. Set to zero to disable and re-enable automatic resizing.
 * @param lineAlignment
 *            Align the text within this width. Set to FlxBitmapFont.ALIGN_LEFT (default), FlxBitmapFont.ALIGN_RIGHT or FlxBitmapFont.ALIGN_CENTER.
 */
Flixel.plugin.FlxBitmapFont.prototype.setFixedWidth = function(width, lineAlignment)
{
	this.fixedWidth = width;
	this.align = (lineAlignment === undefined) ? "left" : lineAlignment;
};

Flixel.plugin.FlxBitmapFont.prototype.getText = function()
{
	return this._text;
};

/**
 * A helper function that quickly sets lots of variables at once, and then updates the text.
 * 
 * @param content
 *            The text of this sprite
 * @param multiLines
 *            Set to true if you want to support carriage-returns in the text and create a multi-line sprite instead of a single line (default is
 *            false).
 * @param characterSpacing
 *            To add horizontal spacing between each character specify the amount in pixels (default 0).
 * @param lineSpacing
 *            To add vertical spacing between each line of text, set the amount in pixels (default 0).
 * @param lineAlignment
 *            Align each line of multi-line text. Set to FlxBitmapFont.ALIGN_LEFT (default), FlxBitmapFont.ALIGN_RIGHT or FlxBitmapFont.ALIGN_CENTER.
 * @param allowLowerCase
 *            Lots of bitmap font sets only include upper-case characters, if yours needs to support lower case then set this to true.
 */
Flixel.plugin.FlxBitmapFont.prototype.setText = function(content, multiLines, characterSpacing, lineSpacing, lineAlignment, allowLowerCase)
{
	multiLines = (multiLines === undefined) ? false : multiLines;
	characterSpacing = (characterSpacing === undefined) ? 0 : characterSpacing;
	lineSpacing = (lineSpacing === undefined) ? 0 : lineSpacing;
	lineAlignment = (lineAlignment === undefined) ? "left" : lineAlignment;
	allowLowerCase = (allowLowerCase === undefined) ? false : allowLowerCase;

	this.customSpacingX = characterSpacing;
	this.customSpacingY = lineSpacing;
	this.align = lineAlignment;
	this.multiLine = multiLines;

	if (allowLowerCase) {
		this.autoUpperCase = false;
	} else {
		this.autoUpperCase = true;
	}

	if (content.length > 0) {
		var newText = null;

		if (this.autoUpperCase) {
			newText = content.toUpperCase();
		} else {
			newText = content;
		}

		// Smart update: Only change the bitmap data if the string has changed
		if (newText != this._text) {
			this._text = newText;
			this.removeUnsupportedCharacters(this.multiLine);
			this.buildBitmapFontText();
		}
	}
};

/**
 * Updates the BitmapData of the Sprite with the text
 * 
 * @return void
 */
Flixel.plugin.FlxBitmapFont.prototype.buildBitmapFontText = function()
{
	var temp;
	var cx = 0;
	var cy = 0;

	if (this.multiLine) {
		var lines = this._text.split("\n");

		if (this.fixedWidth > 0) {
			temp = new BitmapData(this.fixedWidth, (lines.length * (this.characterHeight + this.customSpacingY)) - this.customSpacingY, true, 0xf);
		} else {
			temp = new BitmapData(this.getLongestLine() * (this.characterWidth + this.customSpacingX),
					(lines.length * (this.characterHeight + this.customSpacingY)) - this.customSpacingY, true, 0xf);
		}

		// Loop through each line of text
		for (var i = 0; i < lines.length; i++) {
			// This line of text is held in lines[i] - need to work out the alignment
			switch (this.align) {
				case Flixel.plugin.FlxBitmapFont.ALIGN_LEFT:
					cx = 0;
					break;

				case Flixel.plugin.FlxBitmapFont.ALIGN_RIGHT:
					cx = temp.width - (lines[i].length * (this.characterWidth + this.customSpacingX));
					break;

				case Flixel.plugin.FlxBitmapFont.ALIGN_CENTER:
					cx = (temp.width / 2) - ((lines[i].length * (this.characterWidth + this.customSpacingX)) / 2);
					cx += this.customSpacingX / 2;
					break;
			}

			// Sanity checks
			if (cx < 0) {
				cx = 0;
			}

			this.pasteLine(temp, lines[i], cx, cy, this.customSpacingX);

			cy += this.characterHeight + this.customSpacingY;
		}
	} else {
		if (this.fixedWidth > 0) {
			temp = new BitmapData(this.fixedWidth, this.characterHeight, true, 0xf);
		} else {
			temp = new BitmapData(this._text.length * (this.characterWidth + this.customSpacingX), this.characterHeight, true, 0xf);
		}

		switch (this.align) {
			case Flixel.plugin.FlxBitmapFont.ALIGN_LEFT:
				cx = 0;
				break;

			case Flixel.plugin.FlxBitmapFont.ALIGN_RIGHT:
				cx = temp.width - (this._text.length * (this.characterWidth + this.customSpacingX));
				break;

			case Flixel.plugin.FlxBitmapFont.ALIGN_CENTER:
				cx = (temp.width / 2) - ((this._text.length * (this.characterWidth + this.customSpacingX)) / 2);
				cx += this.customSpacingX / 2;
				break;
		}

		this.pasteLine(temp, this._text, cx, 0, this.customSpacingX);
	}

	this.setPixels(temp);
};

/**
 * Returns a single character from the font set as an FlxSprite.
 * 
 * @param char
 *            The character you wish to have returned.
 * 
 * @return An <code>FlxSprite</code> containing a single character from the font set.
 */
Flixel.plugin.FlxBitmapFont.prototype.getCharacter = function(char)
{
	var output = new Flixel.FlxSprite();

	var temp = new BitmapData(this.characterWidth, this.characterHeight, true, 0xf);

	if (this.grabData[char.charCodeAt(0)] instanceof Flixel.FlxRect && char.charCodeAt(0) != 32) {
		temp.copyPixels(this._font, this.grabData[char.charCodeAt(0)], new Flixel.FlxPoint(0, 0));
	}

	output.setPixels(temp);

	return output;
};

/**
 * Returns a single character from the font set as bitmapData
 * 
 * @param char
 *            The character you wish to have returned.
 * 
 * @return <code>bitmapData</code> containing a single character from the font set.
 */
Flixel.plugin.FlxBitmapFont.prototype.getCharacterAsBitmapData = function(char)
{
	var temp = new BitmapData(this.characterWidth, this.characterHeight, true, 0xf);

	// if (grabData[char.charCodeAt(0)] is Rectangle && char.charCodeAt(0) != 32)
	if (this.grabData[char.charCodeAt(0)] instanceof Flixel.FlxRect) {
		temp.copyPixels(this._font, this.grabData[char.charCodeAt(0)], new Flixel.FlxPoint(0, 0));
	}

	return temp;
};

/**
 * Internal function that takes a single line of text (2nd parameter) and pastes it into the BitmapData at the given coordinates. Used by getLine and
 * getMultiLine
 * 
 * @param output
 *            The BitmapData that the text will be drawn onto
 * @param line
 *            The single line of text to paste
 * @param x
 *            The x coordinate
 * @param y
 * @param customSpacingX
 */
Flixel.plugin.FlxBitmapFont.prototype.pasteLine = function(output, line, x, y, customSpacingX)
{
	x = (x === undefined) ? 0 : x;
	y = (y === undefined) ? 0 : y;
	customSpacingX = (customSpacingX === undefined) ? 0 : customSpacingX;

	for (var c = 0; c < line.length; c++) {
		// If it's a space then there is no point copying, so leave a blank space
		if (line.charAt(c) == " ") {
			x += this.characterWidth + customSpacingX;
		} else {
			// If the character doesn't exist in the font then we don't want a blank space, we just want to skip it
			if (this.grabData[line.charCodeAt(c)] instanceof Flixel.FlxRect) {
				output.copyPixels(this._font, this.grabData[line.charCodeAt(c)], new Flixel.FlxPoint(x, y));

				x += this.characterWidth + customSpacingX;

				if (x > output.width) {
					break;
				}
			}
		}
	}
};

/**
 * Works out the longest line of text in _text and returns its length
 * 
 * @return A value
 */
Flixel.plugin.FlxBitmapFont.prototype.getLongestLine = function()
{
	var longestLine = 0;

	if (this._text.length > 0) {
		var lines = this._text.split("\n");

		for (var i = 0; i < lines.length; i++) {
			if (lines[i].length > longestLine) {
				longestLine = lines[i].length;
			}
		}
	}

	return longestLine;
};

/**
 * Internal helper function that removes all unsupported characters from the _text String, leaving only characters contained in the font set.
 * 
 * @param stripCR
 *            Should it strip carriage returns as well? (default = true)
 * 
 * @return A clean version of the string
 */
Flixel.plugin.FlxBitmapFont.prototype.removeUnsupportedCharacters = function(stripCR)
{
	stripCR = (stripCR === undefined) ? true : stripCR;

	var newString = "";

	for (var c = 0; c < this._text.length; c++) {
		if (this.grabData[this._text.charCodeAt(c)] instanceof Flixel.FlxRect || this._text.charCodeAt(c) == 32
				|| (stripCR == false && this._text.charAt(c) == "\n")) {
			newString = newString.concat(this._text.charAt(c));
		}
	}

	return newString;
};

/**
 * Returns the class name.
 */
Flixel.plugin.FlxBitmapFont.prototype.toString = function()
{
	return "FlxBitmapFont";
};
