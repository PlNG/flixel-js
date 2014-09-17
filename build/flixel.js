(function(root, factory) {
	var myExports = factory();
	for(var i = 0; i < myExports.length; i = i + 2) {
		var name = myExports[i+1];
		var fun = function() { return myExports[i]; };
		if (typeof define === 'function' && define.amd) {
			define(fun);
		} else if (typeof exports === 'object') {
			module.exports = fun();
		} else {
			root[name] = fun();
		}
	}
}(this, function(b) {
/*jslint bitwise: true */
/**
 * Simulates the Java / AS3 class extension.
 * 
 * @param Child		The Child class.
 * @param Parent	The Parent class.
 */
var extend = function(Child, Parent)
{
	Child.prototype = inherit(Parent.prototype);
	Child.prototype.constructor = Child;
	Child.parent = Parent.prototype;
};

/**
 * Inherits one class from another one.
 * 
 * @param proto		The class prototype.
 * @returns {F}		The new prototype.
 */
function inherit(proto)
{
	function F() {}
	F.prototype = proto;
	return new F();
}

/**
 * Sleep time simulator.<br>
 * Use for DEBUG ONLY.
 * 
 * @param milliseconds
 *				The amount of time to sleep.
 */
var sleep = function(milliseconds)
{
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
};

/**
 * Simulate the flash method: flash.utils.getTimer();
 * 
 * @returns {Number}
 */
var startTimer = new Date().getTime();
var getTimer = function()
{
	var d = new Date();
	return (d.getTime() - startTimer);
};

/**
 * Simulates the flash method: int()<br>
 * It's the same as Math.floor.
 */
var int = function(number)
{
	return Math.floor(number);
};

/**
 * Simulates the flash method: uint()<br>
 * It's the same as Math.floor for number >= 0.
 */
var uint = function(number)
{
	if(number >= 0)
		return Math.floor(number);
	else {
		var result = 4294967295; // 0xFFFFFFFF
		result -= Math.floor(Math.abs(number)) - 1;
		return result;
	}
};

/**
 * String padding.
 * 
 * @param len		The new length of the string.
 * @param chr		The characters to pad with.
 * @param side		The side to path ('left' or 'right')
 * @returns {String}
 */
String.prototype.pad = function(len, chr, side) {
	chr = (chr === undefined || chr === null) ? " " : chr;

	var t = len - this.length;
	var padstr = "";
	while (t > 0) {
		padstr += chr;
		t--;
	}
	switch (side) {
		case 'left': return padstr + this;
		case 'right': return this + padstr;
		default: break;
	}

	return;
};

/**
 * Define the console if needed.
 * Windows Phone 8, and IE do not
 * have the console defined if it's turned off.
 */
if (!window.console) {
	window.console = {};
	
	// Union of Chrome, FF, IE, and Safari console methods
	var m = [
		"log", "info", "warn", "error", "debug", "trace", "dir", "group",
		"groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
		"dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
	];

	// define undefined methods as noops to prevent errors
	for (var i = 0; i < m.length; i++) {
		if (!window.console[m[i]]) {
			window.console[m[i]] = function(message)
			{
				// Check if we can propagate the message.
				if(window.external.notify)
					window.external.notify(message);
			}
		}
	}
}

/**
 * Main Flixel JS class.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @namespace Flixel
 */
var Flixel = Flixel ||
{
	VERSION : '1.0.0',
	AUTO : 0,
	CANVAS : 1,
	WEBGL : 2,
};

/**
 * Define all the packages.
 */
Flixel.data = function() {};

Flixel.plugin = function() {};
Flixel.plugin.powertools = function() {};
Flixel.plugin.store = function() {};
Flixel.plugin.tmx = function() {};
Flixel.plugin.tweens = function() {};
Flixel.plugin.tweens.misc = function() {};
Flixel.plugin.tweens.motion = function() {};
Flixel.plugin.tweens.sound = function() {};
Flixel.plugin.tweens.util = function() {};

Flixel.system = function() {};
Flixel.system.atlas = function() {};
Flixel.system.debug = function() {};
Flixel.system.input = function() {};
Flixel.system.input.pads = function() {};
Flixel.system.replay = function() {};
/**
 * The Matrix class represents a transformation matrix that determines how to map points<br>
 * from one coordinate space to another.<br>
 * <br>
 * You can perform various graphical transformations on a display object by setting the<br>
 * properties of a Matrix object, applying that Matrix object to the matrix property of a<br>
 * Transform object, and then applying that Transform object as the transform property of<br>
 * the display object.<br>
 * <br>
 * These transformation functions include translation (x and y repositioning), rotation,
 * scaling, and skewing.
 * 
 * Not a full implementation of the Matrix class. Exists to pass a matrix to bitmapData.draw 
 * which passes the properties onto Canvas in its setTransform method: 
 * setTransform(m11, m12, m21, m22, dx, dy).
 * Not implemented: invert, transformPoint, deltaTransformPoint, createGradientBox.
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 */

/**
 * Creates a new Matrix object with the specified parameters.<br>
 * In matrix notation, the properties are organized like this: [a, c, tx] [b, d, ty] [0, 0, 1]
 * 
 * @param a
 *            (default = 1) - The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
 * @param b
 *            (default = 0) - The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
 * @param c
 *            (default = 0) - The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
 * @param d
 *            (default = 1) - The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
 * @param tx
 *            (default = 0) - The distance by which to translate each point along the x axis.
 * @param ty
 *            (default = 0) - The distance by which to translate each point along the y axis.
 */
var Matrix = function(a, b, c, d, tx, ty)
{
	this.a = isNaN(a) ? 1 : a;
	this.b = isNaN(b) ? 0 : b;
	this.c = isNaN(c) ? 0 : c;
	this.d = isNaN(d) ? 1 : d;
	this.tx = isNaN(tx) ? 0 : tx;
	this.ty = isNaN(ty) ? 0 : ty;
	this.u = 0;
	this.v = 0;
	this.w = 1;
};

/**
 * Sets each matrix property to a value that causes a null transformation.
 */
Matrix.prototype.identity = function()
{
	this.a = 1;
	this.c = 0;
	this.tx = 0;
	this.b = 0;
	this.d = 1;
	this.ty = 0;
	this.u = 0;
	this.v = 0;
	this.w = 1;
};

/**
 * Applies a rotation transformation to the Matrix object.
 * 
 * @param angle
 *            The rotation angle in radians.
 */
Matrix.prototype.rotate = function(angle)
{
	var sin = Math.sin(angle);
	var cos = Math.cos(angle);

	var a = this.a;
	var b = this.b;
	var c = this.c;
	var d = this.d;
	var tx = this.tx;
	var ty = this.ty;
	this.a = a * cos - b * sin;
	this.b = a * sin + b * cos;
	this.c = c * cos - d * sin;
	this.d = c * sin + d * cos;
	this.tx = tx * cos - ty * sin;
	this.ty = tx * sin + ty * cos;
};

/**
 * Applies a scaling transformation to the matrix.<br>
 * The x axis is multiplied by sx, and the y axis it is multiplied by sy.
 * 
 * @param sx
 *            A multiplier used to scale the object along the x axis.
 * @param sy
 *            A multiplier used to scale the object along the y axis.
 */
Matrix.prototype.scale = function(sx, sy)
{
	this.a = this.a * sx;
	this.d = this.d * sy;
	this.tx = this.tx * sx;
	this.ty = this.ty * sy;

};

/**
 * Translates the matrix along the x and y axes, as specified by the dx and dy parameters.
 * 
 * @param dx
 *            The amount of movement along the x axis to the right, in pixels.
 * @param dy
 *            The amount of movement down along the y axis, in pixels.
 */
Matrix.prototype.translate = function(tx, ty)
{
	this.tx += tx;
	this.ty += ty;
};

/**
 * Returns a new Matrix object that is a clone of this matrix, with an exact copy of the contained object.
 */
Matrix.prototype.clone = function()
{
	return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
};

/**
 * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two.<br>
 * In mathematical terms, concatenating two matrixes is the same as combining them using matrix multiplication.
 * 
 * @param m2
 *            The matrix to be concatenated to the source matrix.
 */
Matrix.prototype.concat = function(m)
{
	this.a = this.a * m.a + this.b * m.c;
	this.b = this.a * m.b + this.b * m.d;
	this.c = this.c * m.a + this.d * m.c;
	this.d = this.c * m.b + this.d * m.d;
	this.tx = this.tx * m.a + this.ty * m.c + m.tx;
	this.ty = this.tx * m.b + this.ty * m.d + m.ty;
};

/**
 * Includes parameters for scaling, rotation, and translation.<br>
 * When applied to a matrix it sets the matrix's values based on those parameters.<br>
 * <br>
 * Using the createBox() method lets you obtain the same matrix as you would if you applied the identity(), rotate(), scale(), and translate() methods in succession. For example,
 * mat1.createBox(2,2,Math.PI/4, 100, 100).
 * 
 * @param scaleX
 *            The factor by which to scale horizontally.
 * @param scaleY
 *            The factor by which scale vertically.
 * @param rotation
 *            (default = 0) - The amount to rotate, in radians.
 * @param tx
 *            (default = 0) - The number of pixels to translate (move) to the right along the x axis.
 * @param ty
 *            (default = 0) - The number of pixels to translate (move) down along the y axis.
 */
Matrix.prototype.createBox = function(scaleX, scaleY, rotation, tx, ty)
{
	rotation = isNaN(rotation) ? 0 : rotation;
	tx = isNaN(tx) ? 0 : tx;
	ty = isNaN(ty) ? 0 : ty;

	this.identity();
	// if (rotation !== 0) {
	// this.rotate(rotation);
	// }
	// this.scale(scaleX, scaleY);
	// if (tx !== 0 || ty !== 0) {
	// this.translate(tx, ty);
	// }

	this.rotate(rotation);
	this.scale(scaleX, scaleY);
	this.translate(tx, ty); // weird -- see createBox example in flash.geom.Matrix doc
};

// NOT NEEDED NOW
///**
// * Not a flash method. Helper for performing other transforms.<br>
// * [this.a this.c this.tx] [m2.a m2.c m2.tx]<br>
// * [this.b this.d this.ty] [m2.b m2.d m2.ty]<br>
// * [this.u this.v this.w] [m2.u m2.v m2.w]<br>
// * 
// * @param m2
// *            The matrix to multiply this one with
// */
//Matrix.prototype.multiply = function(m2)
//{
//	var mfinal = new Matrix();
//
//	// first row
//	mfinal.a = (this.a * m2.a) + (this.c * m2.b) + 0;
//	mfinal.c = (this.a * m2.c) + (this.c * m2.d) + 0;
//	mfinal.tx = (this.a * m2.tx) + (this.c * m2.ty) + this.tx;
//
//	// second row
//	mfinal.b = (this.b * m2.a) + (this.d * m2.b) + 0;
//	mfinal.d = (this.b * m2.c) + (this.d * m2.d) + 0;
//	mfinal.ty = (this.b * m2.tx) + (this.d * m2.ty) + this.ty;
//
//	return mfinal;
//};

/**
 * Returns the matrix as string.<br>
 * <br>
 * Example as3 output: (a=0.1220703125, b=0, c=0, d=0.1220703125, tx=150, ty=150)
 */
Matrix.prototype.toString = function()
{
	return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
};
/**
 * The ColorTransform class lets you adjust the color values in a display object.<br>
 * The color adjustment or color transformation can be applied to all four channels: red, green, blue, and alpha transparency.<br>
 * 
 * @param redMultiplier			(default = 1.0) - The value for the red multiplier, in the range from 0 to 1.
 * @param greenMultiplier		(default = 1.0) - The value for the green multiplier, in the range from 0 to 1.
 * @param blueMultiplier		(default = 1.0) - The value for the blue multiplier, in the range from 0 to 1.
 * @param alphaMultiplier		(default = 1.0) - The value for the alpha transparency multiplier, in the range from 0 to 1.
 * @param redOffset				(default = 0) - The offset value for the red color channel, in the range from -255 to 255.
 * @param greenOffset			(default = 0) - The offset value for the green color channel, in the range from -255 to 255.
 * @param blueOffset			(default = 0) - The offset for the blue color channel value, in the range from -255 to 255.
 * @param alphaOffset			(default = 0) - The offset for alpha transparency channel value, in the range from -255 to 255. 
 * @returns
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var ColorTransform = function(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)
{

	this.redMultiplier = isNaN(redMultiplier) ? 1.0 : redMultiplier;
	this.greenMultiplier = isNaN(greenMultiplier) ? 1.0 : greenMultiplier;
	this.blueMultiplier = isNaN(blueMultiplier) ? 1.0 : blueMultiplier;
	this.alphaMultiplier = isNaN(alphaMultiplier) ? 1.0 : alphaMultiplier;
	this.redOffset = isNaN(redOffset) ? 0 : redOffset;
	this.greenOffset = isNaN(greenOffset) ? 0 : greenOffset;
	this.blueOffset = isNaN(blueOffset) ? 0 : blueOffset;
	this.alphaOffset = isNaN(alphaOffset) ? 0 : alphaOffset;

};
/**
 * The BitmapData class lets you work with the data (pixels) of a Bitmap object.<br>
 * You can use the methods of the BitmapData class to create arbitrarily sized transparent<br>
 * or opaque bitmap images and manipulate them in various ways at runtime.<br>
 * 
 * TODO: hitTest (needed by FlxSprite.overlapsPoint)
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * Creates a BitmapData object with a specified width and height.
 * 
 * @param Width
 *            The width of the bitmap image in pixels.
 * @param Height
 *            The height of the bitmap image in pixels.
 * @param Transparent
 *            Specifies whether the bitmap image supports per-pixel transparency.
 * @param FillColor
 *            A 32-bit ARGB color value that you use to fill the bitmap image area. The default value is 0xFFFFFFFF (solid white).
 */
var BitmapData = function(Width, Height, Transparent, FillColor)
{
	Transparent = (Transparent === undefined) ? true : Transparent;
	FillColor = (FillColor === undefined) ? 0xFFFFFFFF : FillColor;

	// pre-process FillColor to ensure correct behavior
	// FIXME: For now we set the fill to fully transparent if Transparent is
	// true
	/*
	 * FillColor = FillColor.toString(16).pad(8, 0, "left"); if (Transparent) { FillColor = parseInt("00" + FillColor.substr(2, 6), 16); console.log("fixed color", FillColor); }
	 */

	this.transparent = Transparent;
	this.width = Width;
	this.height = Height;
	this._data = Array(); // pixel data array
	this._canvas = document.createElement('canvas');
	this._canvas.width = this.width;
	this._canvas.height = this.height;
	this.context = this._canvas.getContext('2d');

	// FIXME: Temporarily disabled fill while researching alpha problems
	this.context.save();
	// var a;
	this.context.fillStyle = BitmapData.makeRGBA(FillColor);
	// console.log(a, this.context.fillStyle); //DEBUG
	this.context.fillRect(0, 0, this.width, this.height);
	// document.body.appendChild(this._canvas).setAttribute('title', a);
	// //DEBUG
	this.context.restore();
};

/**
 * Returns an integer that represents an RGB pixel value from a BitmapData object at a specific point (x, y).<br>
 * FIXME: This returns "premultiplied" (affected by alpha) pixels, not "unmultiplied" a Flash specifies.
 * 
 * @param X
 *            The x position of the pixel.
 * @param Y
 *            The y position of the pixel.
 */
BitmapData.prototype.getPixel = function(X, Y)
{
	var d = this.context.getImageData(X, Y, 1, 1).data;
	return ((d[0] << 16) | (d[1] << 8) | (d[2]));
};

/**
 * Provides a fast routine to perform pixel manipulation between images with no stretching, rotation, or color effects.<br>
 * FIXME: alphaBitmapData, alphaPoint are ignored. mergeAlpha temporarily ignored
 * 
 * @param sourceBitmapData
 *            The input bitmap image from which to copy pixels.<br>
 *            The source image can be a different BitmapData instance, or it can refer to the current BitmapData instance.
 * @param sourceRect
 *            A rectangle that defines the area of the source image to use as input.
 * @param destPoint
 *            The destination point that represents the upper-left corner of the rectangular area where the new pixels are placed.
 * @param alphaBitmapData
 *            (default = null)<br>
 *            A secondary, alpha BitmapData object source.
 * @param alphaPoint
 *            (default = null)<br>
 *            The point in the alpha BitmapData object source that corresponds to the upper-left corner of the sourceRect parameter.
 * @param mergeAlpha
 *            (default = false)<br>
 *            To use the alpha channel, set the value to true. To copy pixels with no alpha channel, set the value to false.
 * @param clearRect
 *            (default = false)<br>
 *            If we have to clear the context rectangle.
 */
BitmapData.prototype.copyPixels = function(sourceBitmapData, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha, clearRect)
{

	/*
	 * var d = sourceBitmapData.context.getImageData( sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height );
	 * 
	 * this.context.putImageData(d, destPoint.x, destPoint.y);
	 */

	// NOTE: Alternate implementation to get alpha right. Copying pixels is not correct because we don't blend alpha with the new canvas
	if(clearRect)
		this.context.clearRect(destPoint.x, destPoint.y, sourceRect.width, sourceRect.height);
	this.context.drawImage(sourceBitmapData._canvas, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destPoint.x, destPoint.y, sourceRect.width, sourceRect.height);
};

/**
 * Sets a single pixel of a BitmapData object.
 * 
 * @param X
 *            The x position of the pixel.
 * @param Y
 *            The y position of the pixel.
 * @param Color
 *            The resulting RGB color for the pixel.
 */
BitmapData.prototype.setPixel = function(X, Y, Color)
{

	// is a 1x1 rect faster than manipulating the data? No idea
	this.context.fillStyle = BitmapData.makeRGBA(Color);
	this.context.fillRect(X, Y, 1, 1);
};

/**
 * Fills a rectangular area of pixels with a specified ARGB color.
 * 
 * @param rect
 *            The rectangular area to fill.
 * @param color
 *            The ARGB color value that fills the area.<br>
 *            ARGB colors are often specified in hexadecimal format; for example, 0xFF336699.
 */
BitmapData.prototype.fillRect = function(rect, color)
{
	this.context.save();
	this.context.clearRect(rect.x, rect.y, rect.width, rect.height);
	this.context.fillStyle = BitmapData.makeRGBA(color);
	this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
	this.context.restore();
};

/**
 * Adjusts the color values in a specified area of a bitmap image by using a ColorTransform object.
 * 
 * @param rect
 *            A Rectangle object that defines the area of the image in which the ColorTransform object is applied.
 * @param colorTransform
 *            A ColorTransform object that describes the color transformation values to apply.
 */
BitmapData.prototype.colorTransform = function(rect, colorTransform)
{
	var ct = colorTransform;
	var d = this.context.getImageData(rect.x, rect.y, rect.width, rect.height);
	var r, g, b, a;

	for (var i = 0; i < d.data.length; i += 4) {
		// figure out new component values
		r = (d.data[i] * ct.redMultiplier) + ct.redOffset;
		g = (d.data[i + 1] * ct.greenMultiplier) + ct.greenOffset;
		b = (d.data[i + 2] * ct.blueMultiplier) + ct.blueOffset;
		a = (d.data[i + 3] * ct.alphaMultiplier) + ct.alphaOffset;

		// clamp values.
		r = (r > 255) ? 255 : r;
		r = (r < 0) ? 0 : r;
		g = (g > 255) ? 255 : g;
		g = (g < 0) ? 0 : g;
		b = (b > 255) ? 255 : b;
		b = (b < 0) ? 0 : b;
		a = (a > 255) ? 255 : a;
		a = (a < 0) ? 0 : a;

		// assign new values
		d.data[i] = r;
		d.data[i + 1] = g;
		d.data[i + 2] = b;
		d.data[i + 3] = a;
	}

	this.context.putImageData(d, rect.x, rect.y);

};

/**
 * Draws the source display object onto the bitmap image, using the Flash runtime vector renderer.<br>
 * FIXME: Only source and matrix are used
 * 
 * @param source
 *            The display object or BitmapData object to draw to the BitmapData object.
 * @param matrix
 *            (default = null)<br>
 *            A Matrix object used to scale, rotate, or translate the coordinates of the bitmap. If you do not want to apply a matrix transformation to the image, set this parameter to an identity
 *            matrix, created with the default new Matrix() constructor, or pass a null value.
 * @param colorTransform
 *            (default = null)<br>
 *            A ColorTransform object that you use to adjust the color values of the bitmap. If no object is supplied, the bitmap image's colors are not transformed. If you must pass this parameter
 *            but you do not want to transform the image, set this parameter to a ColorTransform object created with the default new ColorTransform() constructor.
 * @param blendMode
 *            (default = null)<br>
 *            A string value, from the flash.display.BlendMode class, specifying the blend mode to be applied to the resulting bitmap.
 * @param clipRect
 *            (default = null)<br>
 *            A Rectangle object that defines the area of the source object to draw. If you do not supply this value, no clipping occurs and the entire source object is drawn.
 * @param smoothing
 *            (default = false)<br>
 *            A Boolean value that determines whether a BitmapData object is smoothed when scaled or rotated, due to a scaling or rotation in the matrix parameter.
 */
BitmapData.prototype.draw = function(source, matrix, colorTransform, blendMode, clipRect, smoothing)
{

	this.context.save();

	// Perform a transform (scale, rotation, or translation) only if a matrix is passed
	if (matrix !== undefined && matrix !== null) {
		this.context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
	}

	// If a clip rect is specified then draw only a portion of the source image
	if (clipRect !== undefined && clipRect !== null) {
		this.context.drawImage(source._canvas, clipRect.x, clipRect.y, clipRect.width, clipRect.height, 0, 0, clipRect.width, clipRect.height);
	} else {
		this.context.drawImage(source._canvas, 0, 0);
	}

	this.context.restore();

};

/**
 * NOTE: This is not a Flash BitmapData function. This is a helper function.<br>
 * Makes a CSS color for Canvas fillStyles, e.g. rgb(128, 64, 64, 0.7);
 * 
 * @param Color
 *            The ARGB color.
 * @param Alpha
 *            The optional Alpha value in case the color will be just RGB. 
 */
BitmapData.makeRGBA = function(Color, Alpha)
{
	var f = Color.toString(16).pad(8, "0", "left");
	var a = Flixel.FlxU.roundWithDec(parseInt(f.substr(0, 2), 16) / 255, 1);
	var r = parseInt(f.substr(2, 2), 16);
	var g = parseInt(f.substr(4, 2), 16);
	var b = parseInt(f.substr(6, 2), 16);
	
	a = (Alpha === undefined || Alpha === null) ? a :  Alpha;

	return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
};

/**
 * Returns a new BitmapData object that is a clone of the original instance with an exact copy of the contained bitmap.
 * 
 * @returns {BitmapData}
 */
BitmapData.prototype.clone = function()
{
	var bitmap = new BitmapData(this.width, this.height, this.transparent, 0x00000000);
	bitmap.draw(this);
	return bitmap;
};

/**
 * JS-specific static function to turn HTMLImageElemnt objects into BitmapData objects.
 */
BitmapData.fromImage = function(img)
{
	var bitmap = new BitmapData(img.width, img.height, true, 0x00000000);
	bitmap.context.drawImage(img, 0, 0);
	return bitmap;
};
/**
 * The Canvas class handles everything related to the canvas tag as a DOM Element,<br>
 * like styles, offset, aspect ratio.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var CanvasManager = function()
{
};

/**
 * Creates the &lt;canvas&gt; tag
 * 
 * @method CanvasManager.create
 * @param {number}
 *            width - The desired width.
 * @param {number}
 *            height - The desired height.
 * @return {HTMLCanvasElement} The newly created &lt;canvas&gt; tag.
 */
CanvasManager.create = function(width, height)
{

	width = width || 256;
	height = height || 256;

	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	canvas.style.display = 'block';

	return canvas;

};

/**
 * Get the DOM offset values of any given element
 * 
 * @method CanvasManager.getOffset
 * @param {HTMLElement}
 *            element - The targeted element that we want to retrieve the offset.
 * @param {Flixel.FlxPoint}
 *            [point] - The point we want to take the x/y values of the offset.
 * @return {Flixel.FlxPoint} - A point objet with the offsetX and Y as its properties.
 */
CanvasManager.getOffset = function(element, point)
{

	point = point || new Flixel.FlxPoint();

	var box = element.getBoundingClientRect();
	var clientTop = element.clientTop || document.body.clientTop || 0;
	var clientLeft = element.clientLeft || document.body.clientLeft || 0;
	var scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop;
	var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

	point.x = box.left + scrollLeft - clientLeft;
	point.y = box.top + scrollTop - clientTop;

	return point;

};

/**
 * Returns the aspect ratio of the given canvas.
 * 
 * @method CanvasManager.getAspectRatio
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to get the aspect ratio from.
 * @return {number} The ratio between canvas' width and height.
 */
CanvasManager.getAspectRatio = function(canvas)
{
	return canvas.width / canvas.height;
};

/**
 * Sets the background color behind the canvas.<br>
 * This changes the canvas style property.
 * 
 * @method CanvasManager.setBackgroundColor
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the background color on.
 * @param {string}
 *            [color] - The color to set. Can be in the format 'rgb(r,g,b)', or '#RRGGBB' or any valid CSS color.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.setBackgroundColor = function(canvas, color)
{

	color = color || 'rgb(0,0,0)';

	canvas.style.backgroundColor = color;

	return canvas;

};

/**
 * Sets the touch-action property on the canvas style.<br>
 * Can be used to disable default browser touch actions.
 * 
 * @method CanvasManager.setTouchAction
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the touch action on.
 * @param {String}
 *            [value] - The touch action to set. Defaults to 'none'.
 * @return {HTMLCanvasElement} The source canvas.
 */
CanvasManager.setTouchAction = function(canvas, value)
{

	value = value || 'none';

	canvas.style.msTouchAction = value;
	canvas.style['ms-touch-action'] = value;
	canvas.style['touch-action'] = value;

	return canvas;

};

/**
 * Sets the user-select property on the canvas style.<br>
 * Can be used to disable default browser selection actions.
 * 
 * @method CanvasManager.setUserSelect
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the touch action on.
 * @param {String}
 *            [value] - The touch action to set. Defaults to 'none'.
 * @return {HTMLCanvasElement} The source canvas.
 */
CanvasManager.setUserSelect = function(canvas, value)
{

	value = value || 'none';

	canvas.style['-webkit-touch-callout'] = value;
	canvas.style['-webkit-user-select'] = value;
	canvas.style['-khtml-user-select'] = value;
	canvas.style['-moz-user-select'] = value;
	canvas.style['-ms-user-select'] = value;
	canvas.style['user-select'] = value;
	canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

	return canvas;

};

/**
 * Adds the given canvas element to the DOM. The canvas will be added as a child of the given parent.<br>
 * If no parent is given it will be added as a child of the document.body.
 * 
 * @method CanvasManager.addToDOM
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the touch action on.
 * @param {string|HTMLElement}
 *            parent - The DOM element to add the canvas to. Defaults to ''.
 * @param {boolean}
 *            overflowHidden - If set to true it will add the overflow='hidden' style to the parent DOM element.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.addToDOM = function(canvas, parent, overflowHidden)
{
	overflowHidden = (overflowHidden === undefined) ? true : overflowHidden;
	var target = null;

	if (parent) {
		// hopefully an element ID
		if (typeof parent === 'string') {
			target = document.getElementById(parent);
		} else
		// quick test for a HTMLelement
		if (typeof parent === 'object' && parent.nodeType === 1) {
			target = parent;
		}

		if (overflowHidden) {
			target.style.overflow = 'hidden';
		}
	}

	// fallback, covers an invalid ID and a none HTMLelement object
	if (!target) {
		target = document.body;
	}

	target.appendChild(canvas);

	return canvas;
};

/**
 * Sets the transform of the given canvas to the matrix values provided.
 * 
 * @method CanvasManager.setTransform
 * @param {CanvasRenderingContext2D}
 *            context - The context to set the transform on.
 * @param {number}
 *            translateX - The value to translate horizontally by.
 * @param {number}
 *            translateY - The value to translate vertically by.
 * @param {number}
 *            scaleX - The value to scale horizontally by.
 * @param {number}
 *            scaleY - The value to scale vertically by.
 * @param {number}
 *            skewX - The value to skew horizontaly by.
 * @param {number}
 *            skewY - The value to skew vertically by.
 * @return {CanvasRenderingContext2D} Returns the source context.
 */
CanvasManager.setTransform = function(context, translateX, translateY, scaleX, scaleY, skewX, skewY)
{
	context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);
	return context;
};

/**
 * Sets the Image Smoothing property on the given context. Set to false to disable image smoothing.<br>
 * By default browsers have image smoothing enabled, which isn't always what you visually want,<br>
 * especially when using pixel art in a game. Note that this sets the property on the context itself, so<br>
 * that any image drawn to the context will be affected. This sets the property across all current<br>
 * browsers but support is patchy on earlier browsers, especially on mobile.
 * 
 * @method CanvasManager.setSmoothingEnabled
 * @param {CanvasRenderingContext2D}
 *            context - The context to enable or disable the image smoothing on.
 * @param {boolean}
 *            value - If set to true it will enable image smoothing, false will disable it.
 * @return {CanvasRenderingContext2D} Returns the source context.
 */
CanvasManager.setSmoothingEnabled = function(context, value)
{
	context['imageSmoothingEnabled'] = value;
	context['mozImageSmoothingEnabled'] = value;
	context['oImageSmoothingEnabled'] = value;
	context['webkitImageSmoothingEnabled'] = value;
	context['msImageSmoothingEnabled'] = value;

	return context;
};

/**
 * Sets the CSS image-rendering property on the given canvas to be 'crisp'<br>
 * (aka 'optimize contrast on webkit'). Note that if this doesn't given the<br>
 * desired result then see the setSmoothingEnabled.
 * 
 * @method CanvasManager.setImageRenderingCrisp
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set image-rendering crisp on.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.setImageRenderingCrisp = function(canvas)
{
	canvas.style['image-rendering'] = 'crisp-edges';
	canvas.style['image-rendering'] = '-moz-crisp-edges';
	canvas.style['image-rendering'] = '-webkit-optimize-contrast';
	canvas.style.msInterpolationMode = 'nearest-neighbor';

	return canvas;
};

/**
 * Sets the CSS image-rendering property on the given canvas to be 'bicubic' (aka 'auto').<br>
 * Note that if this doesn't given the desired result then see<br>
 * the CanvasUtils.setSmoothingEnabled method.
 * 
 * @method CanvasManager.setImageRenderingBicubic
 * @param {HTMLCanvasElement}
 *            canvas The canvas to set image-rendering bicubic on.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.setImageRenderingBicubic = function(canvas)
{
	canvas.style['image-rendering'] = 'auto';
	canvas.style.msInterpolationMode = 'bicubic';

	return canvas;
};
/**
 * Detects device support capabilities.<br>
 * Using some elements from System.js by MrDoob and Modernizr<br>
 * Took from Phaser.<br>
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * Class constructor.<br>
 * Runs all the tests.
 */
var Device = function()
{
	// Run the checks
	this.checkAudio();
	this.checkBrowser();
	this.checkCSS3D();
	this.checkDevice();
	this.checkFeatures();
	this.checkOS();
};

/**
 * An optional 'fix' for the horrendous Android stock browser bug
 * https://code.google.com/p/android/issues/detail?id=39247
 * 
 * @property {boolean} patchAndroidClearRectBug - Description.
 * @default
 */
Device.prototype.patchAndroidClearRectBug = false;

// Operating System

/**
 * @property {boolean} desktop - Is running desktop?
 * @default
 */
Device.prototype.desktop = false;

/**
 * @property {boolean} iOS - Is running on iOS?
 * @default
 */
Device.prototype.iOS = false;

/**
 * @property {boolean} android - Is running on android?
 * @default
 */
Device.prototype.android = false;

/**
 * @property {boolean} chromeOS - Is running on chromeOS?
 * @default
 */
Device.prototype.chromeOS = false;

/**
 * @property {boolean} linux - Is running on linux?
 * @default
 */
Device.prototype.linux = false;

/**
 * @property {boolean} macOS - Is running on macOS?
 * @default
 */
Device.prototype.macOS = false;

/**
 * @property {boolean} windows - Is running on windows?
 * @default
 */
Device.prototype.windows = false;

/**
 * @property {boolean} firefoxOS - Is running on FirefoxOS phones?
 * @default
 */
Device.prototype.firefoxOS = false;

/**
 * @property {boolean} cocoonJS - Is the game running under CocoonJS?
 * @default
 */
Device.prototype.cocoonJS = false;

// Features

/**
 * @property {boolean} canvas - Is canvas available?
 * @default
 */
Device.prototype.canvas = false;

/**
 * @property {boolean} file - Is file available?
 * @default
 */
Device.prototype.file = false;

/**
 * @property {boolean} fileSystem - Is fileSystem available?
 * @default
 */
Device.prototype.fileSystem = false;

/**
 * @property {boolean} localStorage - Is localStorage available?
 * @default
 */
Device.prototype.localStorage = false;

/**
 * @property {boolean} webGL - Is webGL available?
 * @default
 */
Device.prototype.webGL = false;

/**
 * @property {boolean} worker - Is worker available?
 * @default
 */
Device.prototype.worker = false;

/**
 * @property {boolean} touch - Is touch available?
 * @default
 */
Device.prototype.touch = false;

/**
 * @property {boolean} mspointer - Is mspointer available?
 * @default
 */
Device.prototype.mspointer = false;

/**
 * @property {boolean} css3D - Is css3D available?
 * @default
 */
Device.prototype.css3D = false;

/**
 * @property {boolean} pointerLock - Is Pointer Lock available?
 * @default
 */
Device.prototype.pointerLock = false;

// Browser

/**
 * @property {boolean} arora - Is running in arora?
 * @default
 */
Device.prototype.arora = false;

/**
 * @property {boolean} chrome - Is running in chrome?
 * @default
 */
Device.prototype.chrome = false;

/**
 * @property {boolean} epiphany - Is running in epiphany?
 * @default
 */
Device.prototype.epiphany = false;

/**
 * @property {boolean} firefox - Is running in firefox?
 * @default
 */
Device.prototype.firefox = false;

/**
 * @property {boolean} ie - Is running in ie?
 * @default
 */
Device.prototype.ie = false;

/**
 * @property {number} ieVersion - Version of ie?
 * @default
 */
Device.prototype.ieVersion = 0;

/**
 * @property {boolean} mobileSafari - Is running in mobileSafari?
 * @default
 */
Device.prototype.mobileSafari = false;

/**
 * @property {boolean} midori - Is running in midori?
 * @default
 */
Device.prototype.midori = false;

/**
 * @property {boolean} opera - Is running in opera?
 * @default
 */
Device.prototype.opera = false;

/**
 * @property {boolean} safari - Is running in safari?
 * @default
 */
Device.prototype.safari = false;
Device.prototype.webApp = false;

// Audio

/**
 * @property {boolean} audioData - Are Audio tags available?
 * @default
 */
Device.prototype.audioData = false;

/**
 * @property {boolean} webAudio - Is the WebAudio API available?
 * @default
 */
Device.prototype.webAudio = false;

/**
 * @property {boolean} ogg - Can this device play ogg files?
 * @default
 */
Device.prototype.ogg = false;

/**
 * @property {boolean} opus - Can this device play opus files?
 * @default
 */
Device.prototype.opus = false;

/**
 * @property {boolean} mp3 - Can this device play mp3 files?
 * @default
 */
Device.prototype.mp3 = false;

/**
 * @property {boolean} wav - Can this device play wav files?
 * @default
 */
Device.prototype.wav = false;
/**
 * Can this device play m4a files?
 * 
 * @property {boolean} m4a - True if this device can play m4a files.
 * @default
 */
Device.prototype.m4a = false;

/**
 * @property {boolean} webm - Can this device play webm files?
 * @default
 */
Device.prototype.webm = false;

// Device

/**
 * @property {boolean} iPhone - Is running on iPhone?
 * @default
 */
Device.prototype.iPhone = false;

/**
 * @property {boolean} iPhone4 - Is running on iPhone4?
 * @default
 */
Device.prototype.iPhone4 = false;

/**
 * @property {boolean} iPad - Is running on iPad?
 * @default
 */
Device.prototype.iPad = false;

/**
 * @property {boolean} windowsPhone - Is running on Windows Phone?
 * @default
 */
Device.prototype.windowsPhone = false;

/**
 * @property {number} pixelRatio - PixelRatio of the host device?
 * @default
 */
Device.prototype.pixelRatio = 0;

/**
 * @property {boolean} isMobile - Is running on phones?
 * @default
 */
Device.prototype.isMobile = false;

// Storage stuff
/**
 * Browser Local Storage capabilities <br>
 * (this flag will be set to false if cookies are blocked)
 */
Device.prototype.localStorage = false;

/**
 * Check which OS is game running on.
 * 
 * @method Phaser.Device#_checkOS
 * @private
 */
Device.prototype.checkOS = function()
{

	var ua = navigator.userAgent;

	if (/Android/.test(ua)) {
		this.android = true;
	} else if (/CrOS/.test(ua)) {
		this.chromeOS = true;
	} else if (/iP[ao]d|iPhone/i.test(ua)) {
		this.iOS = true;
	} else if (/Linux/.test(ua)) {
		this.linux = true;
	} else if (/Mac OS/.test(ua)) {
		this.macOS = true;
	} else if (/Windows/.test(ua)) {
		this.windows = true;
	} else if (/Mobile;.*Firefox\/(\d+)/.test(ua)) {
		this.firefoxOS = true;
	} else if(/Windows Phone/i.test(ua)) {
		this.windowsPhone = true;
	}

	if (this.windows || this.macOS || this.linux) {
		this.desktop = true;
	} else {
		// navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows
		// Phone|Mobi/i)
		this.isMobile = this.android || this.iOS || this.firefoxOS || this.windowsPhone || false;
	}

	/*var that = this;
	(function()
	{
		var ua = navigator.userAgent,
			uaHolder = that,
		userAgents = [ {
			platform : "androidChrome",
			regex : /Android .* Chrome\/(\d+)[.\d]+/
		}, {
			platform : "android",
			regex : /Android (\d+)/
		}, {
			platform : "android",
			regex : /Silk\/1./,
			forceVersion : 2,
			extra : {
				silk : 1
			}
		}, {
			platform : "android",
			regex : /Silk\/2./,
			forceVersion : 4,
			extra : {
				silk : 2
			}
		}, {
			platform : "windowsPhone",
			regex : /Windows Phone (?:OS )?(\d+)[.\d]+/
		}, {
			platform : "ie",
			regex : /MSIE (\d+)/
		}, {
			platform : "ios",
			regex : /iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/
		}, {
			platform : "webos",
			regex : /(?:web|hpw)OS\/(\d+)/
		}, {
			platform : "safari",
			regex : /Version\/(\d+)[.\d]+\s+Safari/
		}, {
			platform : "chrome",
			regex : /Chrome\/(\d+)[.\d]+/
		}, {
			platform : "androidFirefox",
			regex : /Android;.*Firefox\/(\d+)/
		}, {
			platform : "firefoxOS",
			regex : /Mobile;.*Firefox\/(\d+)/
		}, {
			platform : "firefox",
			regex : /Firefox\/(\d+)/
		}, {
			platform : "blackberry",
			regex : /BB1\d;.*Version\/(\d+\.\d+)/
		} ];
		for (var uaIndex = 0, curUA, s, o; curUA = userAgents[uaIndex]; uaIndex++) {
			s = curUA.regex.exec(ua);
			if (s) {
				curUA.forceVersion ? o = curUA.forceVersion : o = Number(s[1]), uaHolder[curUA.platform] = o, curUA.extra
						&& enyo.mixin(uaHolder, curUA.extra);
				break;
			}
		}
		enyo.dumbConsole = Boolean(uaHolder.android || uaHolder.ios || uaHolder.webos);
	}());*/

};

/**
 * Check HTML5 features of the host environment.
 * 
 * @method Phaser.Device#_checkFeatures
 * @private
 */
Device.prototype.checkFeatures = function()
{

	this.canvas = !!window.CanvasRenderingContext2D;

	try {
		this.localStorage = !!localStorage.getItem;
	} catch (error) {
		this.localStorage = false;
	}

	this.file = !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob;
	this.fileSystem = !!window.requestFileSystem;
	this.webGL = (function()
	{
		try {
			var canvas = document.createElement('canvas');
			return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch (e) {
			return false;
		}
	})();

	if (this.webGL === null || this.webGL === false) {
		this.webGL = false;
	} else {
		this.webGL = true;
	}

	this.worker = !!window.Worker;

	if ('ontouchstart' in document.documentElement || window.navigator.msPointerEnabled) {
		this.touch = true;
	}

	if (window.navigator.msPointerEnabled) {
		this.mspointer = true;
	}

	this.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

	try {
		this.localStorage = !!window.localStorage;
	} catch (e) {
		// the above generates an exception when cookies are blocked
		this.localStorage = false;
	}
};

/**
 * Check what browser is game running in.
 * 
 * @method Phaser.Device#_checkBrowser
 * @private
 */
Device.prototype.checkBrowser = function()
{

	var ua = navigator.userAgent;

	if (/Arora/.test(ua)) {
		this.arora = true;
	} else if (/Chrome/.test(ua)) {
		this.chrome = true;
	} else if (/Epiphany/.test(ua)) {
		this.epiphany = true;
	} else if (/Firefox/.test(ua)) {
		this.firefox = true;
	} else if (/Mobile Safari/.test(ua)) {
		this.mobileSafari = true;
	} else if (/MSIE (\d+\.\d+);/.test(ua)) {
		this.ie = true;
		this.ieVersion = parseInt(RegExp.$1);
	} else if (/Midori/.test(ua)) {
		this.midori = true;
	} else if (/Opera/.test(ua)) {
		this.opera = true;
	} else if (/Safari/.test(ua)) {
		this.safari = true;
	}

	// WebApp mode in iOS
	if (navigator.standalone) {
		this.webApp = true;
	}

	if (navigator.isCocoonJS) {
		this.cocoonJS = true;
	}
};

/**
 * Check audio support.
 * 
 * @method Phaser.Device#_checkAudio
 * @private
 */
Device.prototype.checkAudio = function()
{

	this.audioData = !!(window.Audio);
	this.webAudio = !!(window.webkitAudioContext || window.AudioContext);
	var audioElement = document.createElement('audio');

	try {
		var result = !!audioElement.canPlayType;
		if (result) {

			if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
				this.ogg = true;
			}

			if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '')) {
				this.opus = true;
			}

			if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
				this.mp3 = true;
			}

			// Mimetypes accepted:
			// developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
			// bit.ly/iphoneoscodecs
			if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
				this.wav = true;
			}

			if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
				this.m4a = true;
			}

			if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')) {
				this.webm = true;
			}
		}
	} catch (e) {
	}

};

/**
 * Check PixelRatio of devices.
 * 
 * @method Phaser.Device#_checkDevice
 * @private
 */
Device.prototype.checkDevice = function()
{
	this.pixelRatio = window.devicePixelRatio || 1;
	this.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
	this.iPhone4 = (this.pixelRatio == 2 && this.iPhone);
	this.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;
};

/**
 * Check whether the host environment support 3D CSS.
 * 
 * @method Phaser.Device#_checkCSS3D
 * @private
 */
Device.prototype.checkCSS3D = function()
{
	var el = document.createElement('p');
	var has3d = false;
	var transforms = {
		'webkitTransform' : '-webkit-transform',
		'OTransform' : '-o-transform',
		'msTransform' : '-ms-transform',
		'MozTransform' : '-moz-transform',
		'transform' : 'transform'
	};

	// Add it to the body to get the computed style.
	if (document.body !== null)
		document.body.insertBefore(el, null);

	for ( var t in transforms) {
		if (el.style[t] !== undefined) {
			el.style[t] = "translate3d(1px,1px,1px)";
			has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		}
	}

	if (document.body !== null)
		document.body.removeChild(el);
	this.css3D = (has3d !== undefined && has3d !== false && has3d.length > 0 && has3d !== "none");
};

/**
 * Check whether the host environment can play audio.
 * 
 * @method Phaser.Device#canPlayAudio
 * @param {string}
 *            type - One of 'mp3, 'ogg', 'm4a', 'wav', 'webm'.
 * @return {boolean} True if the given file type is supported by the browser,
 *         otherwise false.
 */
Device.prototype.canPlayAudio = function(type)
{
	if (type == 'mp3' && this.mp3) {
		return false;
	} else if (type == 'ogg' && (this.ogg || this.opus)) {
		return false;
	} else if (type == 'm4a' && this.m4a) {
		return true;
	} else if (type == 'wav' && this.wav) {
		return true;
	} else if (type == 'webm' && this.webm) {
		return true;
	} else if (type == 'any') {
		return this.canPlayAudio("mp3") || this.canPlayAudio("ogg") || this.canPlayAudio("m4a") || this.canPlayAudio("wav") || this.canPlayAudio("webm");
	}

	return false;
};

/**
 * Check whether the console is open.
 * 
 * @method Phaser.Device#isConsoleOpen
 * @return {boolean} True if the browser dev console is open.
 */
Device.prototype.isConsoleOpen = function()
{

	if (window.console && window.console.firebug) {
		return true;
	}

	if (window.console) {
		console.profile();
		console.profileEnd();

		if (console.clear) {
			console.clear();
		}

		return console.profiles.length > 0;
	}

	return false;

};

/**
 * Return the device storage
 * 
 * @param type
 *            The type of storage.
 */
Device.prototype.getStorage = function(type)
{
	type = type || "local";

	switch (type) {
		case "local":
			return;

		default:
			break;
	}
	Flixel.FlxG.log("Storage type " + type + " not supported.", "Device");
};
/**
 * A simple cache system for the loaded resources.
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * Class constructor.
 */
var Cache = function()
{
	this.images = [];
	this._text = [];
	this._sounds = [];
};

/**
 * The image list.
 */
Cache.prototype.images = null;
/**
 * The text list.
 */
Cache.prototype._text = null;
/**
 * The sound list.
 */
Cache.prototype._sounds = null;

/**
 * Get text by key.
 * 
 * @param {string}
 *            key - Asset key of the text you want.
 * @return The text you want.
 */
Cache.prototype.getText = function(key)
{
	if (this._text[key]) {
		return this._text[key].text;
	}

	return null;
};

/**
 * Add a new text.
 * 
 * @param key
 *            Asset key for the text.
 * @param text
 *            The text to add.
 */
Cache.prototype.addText = function(key, text)
{
	this._text[key] = {
		text : text
	};
};

/**
 * Add a new sound.
 * 
 * @param key
 *            Asset key for the sound.
 * @param url
 *            URL of this sound file.
 * @param data
 *            Extra sound data.
 * @param webAudio
 *            True if the file is using web audio.
 * @param audioTag
 *            True if the file is using legacy HTML audio.
 */
Cache.prototype.addSound = function(key, url, data, webAudio, audioTag)
{

	webAudio = (webAudio === undefined) ? true : webAudio;
	audioTag = (audioTag === undefined) ? false : audioTag;

	var decoded = false;

	if (audioTag) {
		decoded = true;
	}

	this._sounds[key] = {
		url : url,
		data : data,
		isDecoding : false,
		decoded : decoded,
		webAudio : webAudio,
		audioTag : audioTag
	};
};

/**
 * Update some sound values.
 * 
 * @param key
 *            Asset key for the sound.
 * @param property
 *            The property to update.
 * @param value
 *            The new value.
 */
Cache.prototype.updateSound = function(key, property, value)
{
	if (this._sounds[key]) {
		this._sounds[key][property] = value;
	}
};

/**
 * Add a new decoded sound.
 * 
 * @param key
 *            Asset key for the sound.
 * @param data
 *            Extra sound data.
 */
Cache.prototype.decodedSound = function(key, data)
{
	this._sounds[key].data = data;
	this._sounds[key].decoded = true;
	this._sounds[key].isDecoding = false;
};

/**
 * Get sound by key.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return The sound you want.
 */
Cache.prototype.getSound = function(key)
{
	if (this._sounds[key]) {
		return this._sounds[key];
	}

	return null;
};

/**
 * Get sound data by key.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return {object} The sound data you want.
 */
Cache.prototype.getSoundData = function(key)
{
	if (this._sounds[key]) {
		return this._sounds[key].data;
	}

	return null;
};

/**
 * Check if the given sound has finished decoding.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return {boolean} The decoded state of the Sound object.
 */
Cache.prototype.isSoundDecoded = function(key)
{
	if (this._sounds[key]) {
		return this._sounds[key].decoded;
	}
};

/**
 * Check if the given sound is ready for playback. A sound is considered ready
 * when it has finished decoding and the device is no longer touch locked.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return {boolean} True if the sound is decoded and the device is not touch
 *         locked.
 */
Cache.prototype.isSoundReady = function(key)
{
	return (this._sounds[key] && this._sounds[key].decoded && Flixel.FlxG.soundManager.touchLocked === false);
};
/**
 * Resource holder.
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 */

/**
 * The asset class constructor.
 * 
 * @param akey		The key.
 * @param info		The info.
 * @param type		The type.
 */
var Resource = function(key, info, type)
{
	this.key = key;
	this.info = info;
	this.type = type;
};
/**
 * Each asset is an instance of the Asset class.<br>
 * Global "assets" variable holds reference to all of them.<br>
 * Instead of passing a classname to certain Flixel methods, you pass and asset object:<br>
 *  - asset.example - and its properties are at asset.example.name, asset.example.src, etc.<br>
 * <br>
 * Audio: audio/mpeg (mp3), audio/webm, audio/ogg, application/ogg<br>
 * Video: video/webm, video/ogg<br>
 * Images: image/jpeg, image/gif, image/png, image/bmp<br>
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * The assets class constructor.
 * 
 * @param callback
 *            Function to call when all assets will be loaded.
 */
var Loader = function()
{
	this.resourceList = [];
	this.resourceCount = 0;
	this.loadCount = 0;

	this.onAssetLoaded = null;
	this.onAllLoaded = null;
};

/**
 * The cache of the loader.
 */
Loader.prototype.cache = null;
/**
 * The resource list.
 */
Loader.prototype.resourceList = null;
/**
 * The total number of assets.
 */
Loader.prototype.resourceCount = 0;
/**
 * The total number of loaded assets.
 */
Loader.prototype.loadCount = 0;
/**
 * Function to call when an asset is loaded.
 */
Loader.prototype.onResourceLoaded = null;
/**
 * Function to call when all assets will be loaded.
 */
Loader.prototype.onAllLoaded = null;
/**
 * An XMLHttpRequest object used for loading text and audio data.
 */
Loader.prototype._xmlHttpRequest = new XMLHttpRequest();
/**
 * The current file we are loading.
 */
Loader.prototype._curFile = 0;
/**
 * The time when we started loading.
 */
Loader.prototype._start = 0;
/**
 * If we are loading or not.
 */
Loader.prototype.loading = false;

// ========================================================//
// MISC STUFF //
// ========================================================//
/**
 * Returns the percentage of resources loaded.
 */
Loader.prototype.getPercentage = function()
{
	return (this.loadCount * 100) / this.resourceCount;
};

/**
 * Private method ONLY used by loader.
 * 
 * @param {array|string}
 *            urls - Either an array of audio file URLs or a string containing a
 *            single URL path.
 * @private
 */
Loader.prototype.getAudioURL = function(urls)
{
	var extension;

	if (typeof urls === 'string') {
		urls = [ urls ];
	}

	for (var i = 0; i < urls.length; i++) {
		extension = urls[i].toLowerCase();
		extension = extension.substr((Math.max(0, extension.lastIndexOf(".")) || Infinity) + 1);

		if (Flixel.FlxG.device.canPlayAudio(extension)) {
			return urls[i];
		}
	}
	return null;
};

// ========================================================//
// RESOURCE ADDERS //
// ========================================================//

/**
 * Add a new image to the loader
 * 
 * @param imageKey
 *            The image key.
 * @param imageUrl
 *            The image url.
 */
Loader.prototype.addImage = function(imageKey, imageUrl)
{
	var info = {
		url : imageUrl
	};
	this.resourceList.push(new Resource(imageKey, info, 'image'));
	this.resourceCount++;
};

/**
 * Add a new atlas to the loader
 * 
 * @param atlasKey
 *            The atlas key.
 * @param atlasImageUrl
 *            The atlas image url.
 * @param atlasPackFileUrl
 *            The atlas pack file url.
 * @param atlasId
 *            The atlas id.
 * @param content
 *            The optional content of the atlas text. (Windows Phone 8 needs this).
 */
Loader.prototype.addAtlas = function(atlasKey, atlasImageUrl, atlasPackFileUrl, atlasId, content)
{
	var info = {
		packFileUrl : atlasPackFileUrl,
		atlasId : atlasId,
		atlasImageUrl : atlasImageUrl,
		content : content
	};
	this.resourceList.push(new Resource(atlasKey, info, 'atlas'));
	this.resourceCount++;
};

/**
 * Add a new atlas to the loader
 * 
 * @param textKey
 *            The text key.
 * @param textUrl
 *            The text url.
 */
Loader.prototype.addText = function(textKey, textUrl)
{
	var info = {
		url : textUrl,
	};
	this.resourceList.push(new Resource(textKey, info, 'text'));
	this.resourceCount++;
};

/**
 * Add a new audio file to the loader.
 * 
 * @param audioKey
 *            The text key.
 * @param audioUrls
 *            The text urls.
 */
Loader.prototype.addAudio = function(audioKey, audioUrls, autoDecode)
{
	autoDecode = (autoDecode === undefined) ? true : autoDecode;

	var info = {
		url : audioUrls,
		buffer : null,
		autoDecode : autoDecode
	};

	this.resourceList.push(new Resource(audioKey, info, 'audio'));
	this.resourceCount++;
};

// ========================================================//
// RESOURCE LOADERS //
// ========================================================//
/**
 * Start loading all files.
 */
Loader.prototype.start = function()
{
	if(Flixel.FlxG.getGame() === undefined || Flixel.FlxG.getGame() === null) {
		throw new Error("Loader: Do not call start direclty!");
	}
	
	console.log("Loader started, we are going to load " + this.resourceCount + " resources.");

	this._start = getTimer(); // Get the time when we started
	this.loading = true; // Mark as loading
	this._curFile = 0; // Reset the current file
	this.loadCount = 0; // Reset the counter
	this.loadFile(); // Start loading the first file
};

/**
 * Load all the added assets.
 */
Loader.prototype.loadFile = function()
{
	var _this = this; // Store this object

	var resource = this.resourceList[this._curFile];

	if (resource instanceof Resource) {
		switch (resource.type) {
			case 'image':
				resource.image = new Image();
				resource.image.relatedResource = resource;
				resource.image.index = this._curFile;
				resource.image.onload = function()
				{
					return _this.imageLoaded(resource.key);
				};
				resource.image.onerror = function()
				{
					return _this.fileError(resource.key);
				};
				resource.image.src = resource.info.url;
				break;

			case 'atlas':
				var url = resource.info.packFileUrl;
				
				// Check if we have the content
				if(resource.info.content) {
					// Store the pack text
					resource.info.packText = resource.info.content;

					// Load the atlas image
					resource.info.atlasImage = new Image();
					resource.info.atlasImage.relatedResource = resource;
					resource.info.atlasImage.index = this._curFile;
					resource.info.atlasImage.onload = function()
					{
						return _this.atlasLoaded(resource.key);
					};
					resource.info.atlasImage.onerror = function()
					{
						return _this.fileError(resource.key);
					};
					resource.info.atlasImage.src = resource.info.atlasImageUrl;
				} else
				// Read the file
				{
					this._xmlHttpRequest.open("GET", url, true);
					this._xmlHttpRequest.responseType = "text";
					this._xmlHttpRequest.onload = function()
					{
						return _this.atlasTextCompleted(resource.key);
					};
					this._xmlHttpRequest.onerror = function()
					{
						return _this.fileError(resource.key);
					};
					this._xmlHttpRequest.send();
				}
				
				break;

			case 'audio':
				url = this.getAudioURL(resource.info.url);

				if (url !== null) {
					resource.info.finalUrl = url; // Save the selected url
					
					// WebAudio or Audio Tag?
					if (Flixel.FlxG.soundManager.usingWebAudio) {
						this._xmlHttpRequest.open("GET", url, true);
						this._xmlHttpRequest.responseType = "arraybuffer";
						this._xmlHttpRequest.onload = function()
						{
							return _this.audioCompleted(resource.key);
						};
						this._xmlHttpRequest.onerror = function()
						{
							return _this.fileError(resource.key);
						};
						this._xmlHttpRequest.send();
					} else if (Flixel.FlxG.soundManager.usingAudioTag) {
						if (Flixel.FlxG.soundManager.touchLocked) {
							// If audio is locked we can't do this yet, so need
							// to
							// queue this load request. Bum.
							resource.data = new Audio();
							resource.data.name = resource.key;
							resource.data.preload = 'auto';
							resource.data.src = url;
							this.fileComplete(resource.key);
						} else {
							resource.data = new Audio();
							resource.data.name = resource.key;
							resource.data.onerror = function()
							{
								return _this.fileError(resource.key);
							};
							resource.data.preload = 'auto';
							resource.data.src = url;
							resource.data.addEventListener('canplaythrough', _this.audioComplete(resource.key), false);
							resource.data.load();
						}
					}
				} else {
					this.fileError(resource.key);
				}

				break;
			case 'text':
				url = resource.info.url;
				this._xmlHttpRequest.open("GET", url, true);
				this._xmlHttpRequest.responseType = "text";
				this._xmlHttpRequest.onload = function()
				{
					return _this.textCompleted(resource.key);
				};
				this._xmlHttpRequest.onerror = function()
				{
					return _this.fileError(resource.key);
				};
				this._xmlHttpRequest.send();
				break;
		}
	}
};

/**
 * Load the next file
 */
Loader.prototype.loadNextFile = function()
{
	// Call the callback with the last loaded resource key
	if (this.onAssetLoaded !== null)
		this.onAssetLoaded(this.resourceList[this._curFile].key);

	// Increase the file counter
	this._curFile++;
	this.loadCount++;

	console.log("Loading new file, remaining " + (this.resourceCount - this.loadCount));

	// Check if we have loaded all
	if (this.loadCount >= this.resourceCount) {
		console.log("All resources loaded in: " + (getTimer() - this._start));
		if (this.onAllLoaded !== null)
			this.onAllLoaded();
	} else
		this.loadFile();
};

// ========================================================//
// CALLBACKS //
// ========================================================//

/**
 * Callback for when an image is loaded.
 */
Loader.prototype.imageLoaded = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current
														// resource
	this.cache.images[key] = BitmapData.fromImage(resource.image); // Store it
																	// in the
																	// image
																	// array
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for when an image is loaded.
 */
Loader.prototype.atlasLoaded = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current
														// resource
	Flixel.system.atlas.FlxAssetManager.getInstance().loadAtlas(resource.info.packText, resource.info.atlasImage,
			resource.info.atlasId); // Store it in the atlas manager
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for when an atlas text is loaded
 */
Loader.prototype.atlasTextCompleted = function(key)
{
	var _this = this; // Store this object

	// Store the pack text
	var resource = this.resourceList[this._curFile];
	resource.info.packText = this._xmlHttpRequest.responseText;

	// Load the atlas image
	resource.info.atlasImage = new Image();
	resource.info.atlasImage.relatedResource = resource;
	resource.info.atlasImage.index = this._curFile;
	resource.info.atlasImage.onload = function()
	{
		return _this.atlasLoaded(resource.key);
	};
	resource.info.atlasImage.onerror = function()
	{
		return _this.fileError(resource.key);
	};
	resource.info.atlasImage.src = resource.info.atlasImageUrl;
};

/**
 * Callback for when an atlas text is loaded
 */
Loader.prototype.textCompleted = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current resource
	resource.info.text = this._xmlHttpRequest.responseText; // Store the text
	
	this.cache.addText(key, resource.info.text);
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for when an atlas text is loaded
 */
Loader.prototype.fileError = function(key)
{
	console.warn("Error while loading: " + key);
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for loading audio.
 */
Loader.prototype.audioCompleted = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current resource

	if (Flixel.FlxG.soundManager.usingWebAudio) {
		resource.data = this._xmlHttpRequest.response;

		this.cache.addSound(resource.key, resource.info.finalUrl, resource.data, true, false);

		if (resource.info.autoDecode) {
			this.cache.updateSound(key, 'isDecoding', true);

			var that = this;
			var resKey = resource.key;

			Flixel.FlxG.soundManager.context.decodeAudioData(resource.data, function(buffer)
			{
				if (buffer) {
					that.cache.decodedSound(resKey, buffer);
				}
			});
		}
	} else {
		resource.data.removeEventListener('canplaythrough');
		this.cache.addSound(resource.key, resource.url, resource.data, false, true);
	}

	this.loadNextFile(); // Load the next file
};
/**
 * A singleton object to access the device localStorage area.<br>
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 */
var LocalStorage = function(tag, name)
{
	this.saveTag = tag + "." + name;

	// Load previous data if local Storage is supported
	if (Flixel.FlxG.device.localStorage === true) {
		var keys = JSON.parse(localStorage.getItem(this.saveTag)) || [];
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			this._data[key] = JSON.parse(localStorage.getItem(this.generateTag(key)));
		}
	}
};

/**
 * The storage save tag.
 */
LocalStorage.prototype.saveTag = null;
/**
 * Variable to hold the object data
 */
LocalStorage.prototype._data = {};
/**
 * Internal instance for singelton stuff.
 */
LocalStorage._instance = null;

/**
 * a fucntion to check if the given key is a reserved word
 */
LocalStorage.prototype.isReserved = function(key)
{
	return (key === "add" || key === "remove" || key === "isReserved" || key === "_data");
};

/**
 * Add new keys to localStorage and set them to the given default values if they
 * do not exist
 * 
 * @name add
 * @memberOf me.save
 * @function
 * @param {Object}
 *            props key and corresponding values
 * @example // Initialize "score" and "lives" with default values me.save.add({
 *          score : 0, lives : 3 });
 */
LocalStorage.prototype.add = function(props)
{
	var keys = Object.keys(props);

	// Loop through all the keys
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];

		if (this.isReserved(key))
			return;

		this._data[key] = props[key];
		if (Flixel.FlxG.device.localStorage === true) {
			localStorage.setItem(this.generateTag(key), JSON.stringify(props[key]));
		}
	}

	// Save keys
	if (Flixel.FlxG.device.localStorage === true) {
		localStorage.setItem(this.saveTag, JSON.stringify(Object.keys(this._data)));
	}
};

/**
 * Remove a key from localStorage
 * 
 * @name delete
 * @memberOf me.save
 * @function
 * @param {String}
 *            key key to be removed
 * @example // Remove the "score" key from localStorage me.save.remove("score");
 */
LocalStorage.prototype.remove = function(key)
{
	if (!this.isReserved(key)) {
		// Check if the value exists
		if (typeof this._data[key] !== 'undefined') {
			delete this._data[key];

			// Check if we can write in the local storage
			if (Flixel.FlxG.device.localStorage === true) {
				localStorage.removeItem(this.generateTag(key));
				localStorage.setItem(this.saveTag, JSON.stringify(Object.keys(this._data)));
			}
		}
	}
};

/**
 * Clear some information.
 * 
 * @param name
 *            The information name.
 */
LocalStorage.prototype.clear = function()
{
	var keys = JSON.parse(localStorage.getItem(this.saveTag)) || [];
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		this.remove(key);
	}
};

/**
 * Generate a localStorage Tag.
 * 
 * @param name
 *            The information name.
 */
LocalStorage.prototype.generateTag = function(key)
{
	var tag = this.saveTag;

	if (key !== undefined)
		tag += "." + key;

	return tag;
};
/**
 * 
 */
/**
 * A singleton object to access the device localStorage area.<br>
 * <br>
 * Initialize "score" and "lives" with default values me.save.add({score : 0,
 * lives : 3 });<br>
 * <br>
 * Save score me.save.score = 31337;<br>
 * <br>
 * Load lives console.log(me.save.lives);<br>
 * <br>
 * Also supports complex objects thanks to JSON backend me.save.complexObject = {
 * a : "b", c : [ 1, 2, 3, "d" ], e : { f : [{}] } };<br>
 * <br>
 * DO NOT set any child properties of me.save.complexObject directly!<br>
 * <br>
 * Changes made that way will not save. Always set the entire object value at
 * once.<br>
 * <br>
 * Print all console.log(JSON.stringify(me.save));<br>
 * <br>
 * Delete "score" from localStorage me.save.remove('score');<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var StorageManager = function()
{
	if (StorageManager._instance)
		throw new Error("Do not call this constructor directly!!!");

	// Load previous local storages if local Storage is supported
	if (Flixel.FlxG.device.localStorage === true) {
		var keys = JSON.parse(localStorage.getItem(StorageManager.storageTag)) || [];
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			this._localStorages[key] = new LocalStorage(StorageManager.saveTag, key);
		}
	}
};

/**
 * The storage save tag.
 */
StorageManager.saveTag = "Flixel.SaveManager";
/**
 * The storage save tag.
 */
StorageManager.storageTag = "Flixel.StorageManager";
/**
 * Variable to hold the object data
 */
StorageManager.prototype._localStorages = {};
/**
 * Internal instance for singleton stuff.
 */
StorageManager._instance = null;

/**
 * Create or return a new local storage.
 * 
 * @param name
 *            The small local storage name.
 */
StorageManager.prototype.createLocalStorage = function(name)
{
	if (!this._localStorages[name]) {
		this._localStorages[name] = new LocalStorage(StorageManager.saveTag, name);
		
		localStorage.removeItem(StorageManager.storageTag);
		localStorage.setItem(StorageManager.storageTag, JSON.stringify(Object.keys(this._localStorages)));	
	}

	return this._localStorages[name];
};

/**
 * Remove a localStorage.
 */
StorageManager.prototype.removeLocalStorage = function(name)
{
	if (this._localStorages[name] !== undefined) {
		this._localStorages[name].clear();
	}
	
	localStorage.removeItem(StorageManager.storageTag);
	localStorage.setItem(StorageManager.storageTag, JSON.stringify(Object.keys(this._localStorages)));
};

/**
 * Clear all the localStorages.<br>
 * THIS IS MORTALLY DANGEROUS AND SHOUD NEVER EVER EVER<br>
 * EVER EVER EVER EVER EVER EVER EVER EVER EVER EVER EVER,<br>
 * I think if you are smart you have get how dangerous it is...,<br>
 * BE USED!!!
 */
StorageManager.prototype.clear = function(name)
{
	var keys = Object.keys(this._localStorages);
	for(var i = 0; i < keys.length; i++) {
		var key = keys[i];
		this._localStorages[key].clear();
	}
	
	localStorage.removeItem(StorageManager.storageTag);
};

/**
 * Sets the value of an associated key previously added.
 */
StorageManager.getInstance = function()
{
	if (StorageManager._instance === null)
		StorageManager._instance = new StorageManager();

	return StorageManager._instance;
};
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
/**
 * This is a useful "generic" Flixel object.<br>
 * Both <code>FlxObject</code> and <code>FlxGroup</code> extend this class,<br>
 * as do the plugins.  Has no size, position or graphical data.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @class Flixel.FlxBasic
 */

/**
 * Instantiate the basic Flixel object.
 * @constructor
 */
Flixel.FlxBasic = function()
{
	this.ID = -1;
	this.exists = true;
	this.active = true;
	this.visible = true;
	this.alive = true;
	this.ignoreDrawDebug = false;

	this.autoClear = true;
};

/**
 * Number of active FlxBasics in the game.
 */
Flixel.FlxBasic.ACTIVECOUNT = 0;
/**
 * Number of visible FlxBasics in the game.
 */
Flixel.FlxBasic.VISIBLECOUNT = 0;
/**
 * IDs seem like they could be pretty useful, huh? They're not actually used for
 * anything yet though.
 */
Flixel.FlxBasic.prototype.ID = 0;
/**
 * Controls whether <code>update()</code> and <code>draw()</code> are
 * automatically called by FlxState/FlxGroup.
 */
Flixel.FlxBasic.prototype.exists = false;
/**
 * Controls whether <code>update()</code> is automatically called by
 * FlxState/FlxGroup.
 */
Flixel.FlxBasic.prototype.active = false;
/**
 * Controls whether <code>draw()</code> is automatically called by
 * FlxState/FlxGroup.
 */
Flixel.FlxBasic.prototype.visible = false;
/**
 * Useful state for many game objects - "dead" (!alive) vs alive.
 * <code>kill()</code> and <code>revive()</code> both flip this switch
 * (along with exists, but you can override that).
 */
Flixel.FlxBasic.prototype.alive = false;
/**
 * An array of camera objects that this object will use during
 * <code>draw()</code>. This value will initialize itself during the first
 * draw to automatically point at the main camera list out in <code>FlxG</code>
 * unless you already set it. You can also change it afterward too, very
 * flexible!
 */
Flixel.FlxBasic.prototype.cameras = null;
/**
 * Setting this to true will prevent the object from appearing when the visual
 * debug mode in the debugger overlay is toggled on.
 */
Flixel.FlxBasic.prototype.ignoreDrawDebug = false;
/**
 * If the Tweener should clear on removal. For Entities, this is when they are
 * removed from a World, and for World this is when the active World is
 * switched.
 */
Flixel.FlxBasic.prototype.autoClear = false;
/**
 * The FlxTween reference.
 */
Flixel.FlxBasic.prototype._tween = null;
/**
 * Handy field used to store what ever you need.
 */
Flixel.FlxBasic.prototype._userData = null;


/**
 * Override this function to null out variables or manually call
 * <code>destroy()</code> on class members if necessary. Don't forget to
 * call <code>super.destroy()</code>!
 * @method Flixel.FlxBasic#destroy
 */
Flixel.FlxBasic.prototype.destroy = function()
{
	// Nothing to destroy initially.
	if (this.autoClear && this.hasTween()) {
		this.clearTweens(true);
		this._tween = null;
	}
};

/**
 * Pre-update is called right before <code>update()</code> on each object
 * in the game loop.
 * @method Flixel.FlxBasic#preUpdate
 */
Flixel.FlxBasic.prototype.preUpdate = function()
{
	Flixel.FlxBasic.ACTIVECOUNT++;
};

/**
 * Override this function to update your class's position and appearance.
 * This is where most of your game rules and behavioral code will go.
 * @method Flixel.FlxBasic#update
 */
Flixel.FlxBasic.prototype.update = function()
{
	// Nothing to update initially.
};

/**
 * Post-update is called right after <code>update()</code> on each object
 * in the game loop.
 * @method Flixel.FlxBasic#postUpdate
 */
Flixel.FlxBasic.prototype.postUpdate = function()
{
	// Nothing to post update initially.
};

/**
 * Override this function to control how the object is drawn. Overriding
 * <code>draw()</code> is rarely necessary, but can be very useful.
 * @method Flixel.FlxBasic#draw
 */
Flixel.FlxBasic.prototype.draw = function()
{
	var camera = Flixel.FlxG.activeCamera;
	
	if (this.cameras === null)
		this.cameras = Flixel.FlxG.cameras;
	if (this.cameras.indexOf(camera)  == -1)
		return;

	Flixel.FlxBasic.VISIBLECOUNT++;
	if(Flixel.FlxG.visualDebug && !this.ignoreDrawDebug)
		this.drawDebug(camera);
};

/**
 * Override this function to draw custom "debug mode" graphics to the
 * specified camera while the debugger's visual mode is toggled on.
 * 
 * @param Camera
 *            Which camera to draw the debug visuals to.
 */
Flixel.FlxBasic.prototype.drawDebug = function(Camera)
{
	// Nothing to draw in debug mode initially.
};

/**
 * Handy function for "killing" game objects. Default behavior is to flag
 * them as nonexistent AND dead. However, if you want the "corpse" to remain
 * in the game, like to animate an effect or whatever, you should override
 * this, setting only alive to false, and leaving exists true.
 */
Flixel.FlxBasic.prototype.kill = function()
{
	this.alive = false;
	this.exists = false;
};

/**
 * Handy function for bringing game objects "back to life". Just sets alive
 * and exists back to true. In practice, this function is most often called
 * by <code>FlxObject.reset()</code>.
 */
Flixel.FlxBasic.prototype.revive = function()
{
	this.alive = true;
	this.exists = true;
};

/**
 * Convert object to readable string name. Useful for debugging, save games, etc.
 */
Flixel.FlxBasic.prototype.toString = function()
{
	return "FlxBasic";
};

/**
 * Add a new FlxTween instance to this object.
 * 
 * @param t
 *            The FlxTween instance.
 * @param start
 *            True if it should start.
 * @return The t instance.
 */
Flixel.FlxBasic.prototype.addTween = function(t, start)
{
	var ft = t;
	if (ft.parent !== null) {
		Flixel.FlxG.log("Cannot add a FlxTween object more than once.");
		return t;
	}
	ft.parent = this;
	ft.next = this._tween;
	var friendTween = this._tween;
	if (this._tween !== null) 
		friendTween.prev = t;
	
	this._tween = t;
	if (start) 
		this._tween.start();
	
	return t;
};

/**
 * Remove a new FlxTween instance to this object.
 * 
 * @param t
 *            The FlxTween instance.
 * @param destroy
 *            True if it should be destroyed.
 * @return The t instance.
 */
Flixel.FlxBasic.prototype.removeTween = function(t, destroy)
{
	var ft = t;
	if (ft.parent != this) 
	{
		Flixel.FlxG.log("Core object does not contain FlxTween.");
		return t;
	}
	if (ft.next !== null) 
		ft.next.prev = ft.prev;
	if (ft.prev !== null)
		ft.prev.next = ft.next;
	else
		this._tween = (ft.next === null) ? null : ft.next;
	
	ft.next = ft.prev = null;
	ft.parent = null;
	if (destroy) t.destroy();
	t.active = false;
	return t;
};

/**
 * Clear all the game tweens.
 * 
 * @param destroy
 *            True if they should be destroyed.
 */
Flixel.FlxBasic.prototype.clearTweens = function(destroy)
{
	destroy = (destroy === undefined) ? false : destroy;

	var ft = this._tween;
	var fn;
	while (ft !== null) {
		fn = ft.next;
		this.removeTween(ft, destroy);
		ft = fn;
	}
};

/**
 * Update the FlxBasic tweens.
 */
Flixel.FlxBasic.prototype.updateTweens = function()
{
	var t;
	var ft = this._tween;
	while (ft !== null)
	{
		t = ft;
		if (t.active) {
			t.update();
			if (ft.finish) {
				ft.finishTween();
			}
		}
		ft = ft.next;
	}
};

/**
 * Return true if the FlxBasic has a tween.
 * 
 * @return True if the FlxBasic has a tween.
 */
Flixel.FlxBasic.prototype.hasTween = function() 
{
	return (this._tween !== null); 
};

/**
 * Returns the user data.
 */
Flixel.FlxBasic.prototype.getUserData = function()
{
	return this._userData;
};

/**
 * Sets the user data.
 * 
 * @param pUserData
 */
Flixel.FlxBasic.prototype.setUserData = function(userData)
{
	this._userData = userData;
};

/**
 * Sets the user data.
 * 
 * @param pUserData
 */
Flixel.FlxBasic.prototype.setUserData = function(userData)
{
	this._userData = userData;
};
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
/**
 * This is a simple path data container.  Basically a list of points that<br>
 * a <code>FlxObject</code> can follow.  Also has code for drawing debug visuals.<br>
 * <code>FlxTilemap.findPath()</code> returns a path object, but you can<br>
 * also just make your own, using the <code>add()</code> functions below<br>
 * or by creating your own array of points.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new path object.
 * 
 * @param Nodes
 *            Optional, can specify all the points for the path up front if you want.
 */
Flixel.FlxPath = function(Nodes)
{
	if (Nodes === null || Nodes === undefined)
		this.nodes = [];
	else
		this.nodes = Nodes;

	this._point = new Flixel.FlxPoint();
	this.debugScrollFactor = new Flixel.FlxPoint(1.0, 1.0);
	this.debugColor = Flixel.FlxG.WHITE;
	this.ignoreDrawDebug = false;

	var debugPathDisplay = Flixel.FlxPath.getManager();

	if (debugPathDisplay !== null)
		debugPathDisplay.add(this);
};

/**
 * The list of <code>FlxPoint</code>s that make up the path data.
 */
Flixel.FlxPath.prototype.nodes = null;
/**
 * Specify a debug display color for the path. Default is white.
 */
Flixel.FlxPath.prototype.debugColor = 0;
/**
 * Specify a debug display scroll factor for the path. Default is (1,1). NOTE: does not affect world movement! Object scroll factors take care of that.
 */
Flixel.FlxPath.prototype.debugScrollFactor = null;
/**
 * Setting this to true will prevent the object from appearing when the visual debug mode in the debugger overlay is toggled on.
 * 
 * @default false
 */
Flixel.FlxPath.prototype.ignoreDrawDebug = false;
/**
 * Internal helper for keeping new variable instantiations under control.
 */
Flixel.FlxPath.prototype._point = null;

/**
 * Clean up memory.
 */
Flixel.FlxPath.prototype.destroy = function()
{
	var debugPathDisplay = Flixel.FlxPath.getManager();
	if (debugPathDisplay !== null)
		debugPathDisplay.remove(this);

	this.debugScrollFactor = null;
	this._point = null;
	this.nodes = null;
};

/**
 * Add a new node to the end of the path at the specified location.
 * 
 * @param X
 *            X position of the new path point in world coordinates.
 * @param Y
 *            Y position of the new path point in world coordinates.
 */
Flixel.FlxPath.prototype.add = function(X, Y)
{
	this.nodes.push(new Flixel.FlxPoint(X, Y));
};

/**
 * Add a new node to the path at the specified location and index within the path.
 * 
 * @param XX
 *            position of the new path point in world coordinates.
 * @param YY
 *            position of the new path point in world coordinates.
 * @param Index
 *            Where within the list of path nodes to insert this new point.
 */
Flixel.FlxPath.prototype.addAt = function(X, Y, Index)
{
	if (Index > this.nodes.length)
		Index = this.nodes.length;
	this.nodes.splice(Index, 0, new Flixel.FlxPoint(X, Y));
};

/**
 * Sometimes its easier or faster to just pass a point object instead of separate X and Y coordinates. This also gives you the option of not creating a new node but actually adding that specific
 * <code>FlxPoint</code> object to the path. This allows you to do neat things, like dynamic paths.
 * 
 * @param Node
 *            The point in world coordinates you want to add to the path.
 * @param AsReferenceWhether
 *            to add the point as a reference, or to create a new point with the specified values.
 */
Flixel.FlxPath.prototype.addPoint = function(Node, AsReference)
{
	if (AsReference)
		this.nodes.push(Node);
	else
		this.nodes.push(new Flixel.FlxPoint(Node.x, Node.y));
};

/**
 * Sometimes its easier or faster to just pass a point object instead of separate X and Y coordinates. This also gives you the option of not creating a new node but actually adding that specific
 * <code>FlxPoint</code> object to the path. This allows you to do neat things, like dynamic paths.
 * 
 * @param Node
 *            The point in world coordinates you want to add to the path.
 * @param Index
 *            Where within the list of path nodes to insert this new point.
 * @param AsReferenceWhether
 *            to add the point as a reference, or to create a new point with the specified values.
 */
Flixel.FlxPath.prototype.addPointAt = function(Node, Index, AsReference)
{
	if (Index > this.nodes.length)
		Index = this.nodes.length;
	if (AsReference)
		this.nodes.splice(Index, 0, Node);
	else
		this.nodes.splice(Index, 0, new Flixel.FlxPoint(Node.x, Node.y));
};

/**
 * Remove a node from the path. NOTE: only works with points added by reference or with references from <code>nodes</code> itself!
 * 
 * @param Node
 *            The point object you want to remove from the path.
 * 
 * @return The node that was excised. Returns null if the node was not found.
 */
Flixel.FlxPath.prototype.remove = function(Node)
{
	var index = this.nodes.indexOf(Node);
	if (index >= 0)
		return this.nodes.splice(index, 1)[0];
	else
		return null;
};

/**
 * Remove a node from the path using the specified position in the list of path nodes.
 * 
 * @param Index
 *            Where within the list of path nodes you want to remove a node.
 * 
 * @return The node that was excised. Returns null if there were no nodes in the path.
 */
Flixel.FlxPath.prototype.removeAt = function(Index)
{
	if (this.nodes.length <= 0)
		return null;
	if (Index >= this.nodes.length)
		Index = this.nodes.length - 1;
	return this.nodes.splice(Index, 1)[0];
};

/**
 * Get the first node in the list.
 * 
 * @return The first node in the path.
 */
Flixel.FlxPath.prototype.head = function()
{
	if (this.nodes.length > 0)
		return this.nodes[0];
	return null;
};

/**
 * Get the last node in the list.
 * 
 * @return The last node in the path.
 */
Flixel.FlxPath.prototype.tail = function()
{
	if (this.nodes.length > 0)
		return this.nodes[this.nodes.length - 1];
	return null;
};

/**
 * While this doesn't override <code>FlxBasic.drawDebug()</code>, the behavior is very similar. Based on this path data, it draws a simple lines-and-boxes representation of the path if the visual
 * debug mode was toggled in the debugger overlay. You can use <code>debugColor</code> and <code>debugScrollFactor</code> to control the path's appearance.
 * 
 * @param CameraThe
 *            camera object the path will draw to.
 */
Flixel.FlxPath.prototype.drawDebug = function(Camera)
{
	if (this.nodes.length <= 0)
		return;
	if (Camera === null || Camera === undefined)
		Camera = Flixel.FlxG.camera;

	// Set up our global flash graphics object to draw out the path
	var gfx = Flixel.FlxG.flashGfx;
	gfx.clearRect(0, 0, Flixel.FlxG.flashGfxSprite.width, Flixel.FlxG.flashGfxSprite.height);

	// Then fill up the object with node and path graphics
	var node;
	var nextNode;
	var i = 0;
	var l = this.nodes.length;
	while (i < l) {
		gfx.beginPath();
		// get a reference to the current node
		node = this.nodes[i];

		// find the screen position of the node on this camera
		this._point.x = node.x - int(Camera.scroll.x * this.debugScrollFactor.x); // copied from getScreenXY()
		this._point.y = node.y - int(Camera.scroll.y * this.debugScrollFactor.y);
		this._point.x = int(this._point.x + ((this._point.x > 0) ? 0.0000001 : -0.0000001));
		this._point.y = int(this._point.y + ((this._point.y > 0) ? 0.0000001 : -0.0000001));

		// decide what color this node should be
		var nodeSize = 2;
		if ((i === 0) || (i == l - 1))
			nodeSize *= 2;
		var nodeColor = Flixel.FlxG.GREEN;
		if (l > 1) {
			if (i === 0)
				nodeColor = Flixel.FlxG.GREEN;
			else if (i == l - 1)
				nodeColor = Flixel.FlxG.RED;
		}

		// draw a box for the node
		gfx.fillStyle = BitmapData.makeRGBA(Flixel.FlxU.addAlphaToColor(nodeColor, 1));
		gfx.fillRect(this._point.x - nodeSize * 0.5, this._point.y - nodeSize * 0.5, nodeSize, nodeSize);

		// then find the next node in the path
		var linealpha = 1;
		if (i < l - 1)
			nextNode = this.nodes[i + 1];
		else {
			nextNode = this.nodes[0];
			linealpha = 0.35;
		}

		// then draw a line to the next node
		gfx.moveTo(this._point.x, this._point.y);

		gfx.lineWidth = 1;
		gfx.strokeStyle = BitmapData.makeRGBA(this.debugColor, linealpha);

		this._point.x = nextNode.x - int(Camera.scroll.x * this.debugScrollFactor.x); // copied from getScreenXY()
		this._point.y = nextNode.y - int(Camera.scroll.y * this.debugScrollFactor.y);
		this._point.x = int(this._point.x + ((this._point.x > 0) ? 0.0000001 : -0.0000001));
		this._point.y = int(this._point.y + ((this._point.y > 0) ? 0.0000001 : -0.0000001));
		gfx.lineTo(this._point.x, this._point.y);

		i++;
		
		gfx.stroke();
	}

	// Then stamp the path down onto the game buffer
	Camera.buffer.copyPixels(Flixel.FlxG.flashGfxSprite, new Flixel.FlxRect(0, 0, Flixel.FlxG.flashGfxSprite.width, Flixel.FlxG.flashGfxSprite.height), new Flixel.FlxPoint(0, 0));
};

/**
 * Returns the path debug display manager.
 */
Flixel.FlxPath.getManager = function()
{
	return Flixel.FlxG.getPlugin(Flixel.plugin.DebugPathDisplay);
};

/**
 * Returns the class name.
 */
Flixel.FlxPath.prototype.toString = function()
{
	return "FlxPath";
};
/**
 * A group of handy methods that are really usefull for all kind of stuff.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGamestalaikaGames
 */
Flixel.FlxU = function() {};

/**
 * The value PI as a float. (180 degrees)
 */
Flixel.FlxU.PI = 3.1415927;    
/**
 * The value 2PI as a float. (360 degrees)
 */
Flixel.FlxU.TWO_PI = 2.0 * Flixel.FlxU.PI;
/**
 * The value PI/2 as a float. (90 degrees)
 */
Flixel.FlxU.HALF_PI = 0.5 * Flixel.FlxU.PI;

/**
 * Opens a web page in a new tab or window.
 * MUST be called from the UI thread or else badness.
 * 
 * @param	URLThe address of the web page.
 */
Flixel.FlxU.openURL = function(url)
{
	var win = window.open(url, '_blank');
	win.focus();
};

/**
 * Get the country of the telephone, in a 3 letter format.
 */
Flixel.FlxU.getCountry = function()
{
	//if(Gdx.app.getType() == ApplicationType.Android)
	//	return  Lo;
	//else
	return "";
};

/**
 * Get the current hour time
 */
Flixel.FlxU.getHour = function()
{
	var date = new Date();
	return date.getHours() + ":" + date.getMinutes();
};

/**
 * Returns the number as a String in score format.
 * 
 * @param num	The score number.
 * @param dig	The number of digits.
 * @param withCommasAdd commas each 3 numbers.
 * TODO: UPDATE!!!!!
 */
Flixel.FlxU.getScoreFormat = function(num, dig, withCommas)
{
	dig = dig || 5;
	
	var result = num+"";
	for(var i = result.length; i < dig; i++) {
		result = "0"+result;
	}

	if(withCommas) {
		return Flixel.FlxU.formatMoney(int(result), false, true);
	} else {
		return result;
	}
};

/**
 * Calculate the absolute value of a number.
 * 
 * @param	Value	Any number.
 * 
 * @return	The absolute value of that number.
 */
Flixel.FlxU.abs = function(Value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Round down to the next whole number. E.g. floor(1.7) == 1, and floor(-2.7) == -2.
 * 
 * @param	Value	Any number.
 * 
 * @return	The rounded value of that number.
 */
Flixel.FlxU.floor = function(Value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Round up to the next whole number.  E.g. ceil(1.3) == 2, and ceil(-2.3) == -3.
 * 
 * @param	Value	Any number.
 * 
 * @return	The rounded value of that number.
 */
Flixel.FlxU.ceil = function(Value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Round to the closest whole number. E.g. round(1.7) == 2, and round(-2.3) == -2.
 * 
 * @param	Value	Any number.
 * 
 * @return	The rounded value of that number.
 */
Flixel.FlxU.round = function(Value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Round to the closes number with the number of decimals given. E.g round(2.954165, 2) == 2.95
 * 
 * @param num The number to round.
 * @param dec The number of decimals wanted.
 * @return The rounded value of that number.
 */
Flixel.FlxU.roundWithDec = function(num, dec)
{
	var p = Math.pow(10, dec);
	num = num * p;
	var tmp = Math.round(num);
	return tmp/p;
};

/**
 * Figure out which number is smaller.
 * 
 * @param	Number1Any number.
 * @param	Number2Any number.
 * 
 * @return	The smaller of the two numbers.
 */
Flixel.FlxU.min = function(Number1 ,Number2)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Figure out which number is larger.
 * 
 * @param	Number1Any number.
 * @param	Number2Any number.
 * 
 * @return	The larger of the two numbers.
 */
Flixel.FlxU.max = function(Number1, Number2)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Bound a number by a minimum and maximum.
 * Ensures that this number is no smaller than the minimum,
 * and no larger than the maximum.
 * 
 * @param	Value	Any number.
 * @param	MinAny number.
 * @param	MaxAny number.
 * 
 * @return	The bounded value of the number.
 */
Flixel.FlxU.bound = function(Value, Min, Max)
{
	var lowerBound = (Value < Min) ? Min : Value;
	return (lowerBound > Max) ? Max : lowerBound;
};

/**
 * Generates a random number based on the seed provided.
 * 
 * @param	Seed	A number between 0 and 1, used to generate a predictable random number (very optional).
 * 
 * @return	A <code>Number</code> between 0 and 1.
 */
Flixel.FlxU.srand = function(Seed)
{
	return ((69621 * int(Seed * 0x7FFFFFFF)) % 0x7FFFFFFF) / 0x7FFFFFFF;
};

/**
 * Generates a random number. NOTE: To create a series of predictable random
 * numbers, add the random number you generate each time to the
 * <code>Seed</code> value before calling <code>random()</code> again.
 * 
 * @param SeedA user-provided value used to calculate a predictable random number.
 * 
 * @return A <code>Number</code> between 0 and 1.
 */
Flixel.FlxU.random = function(Seed)
{
	// Make sure the seed value is OK
	if(Seed === undefined)
		Seed = Math.random();
	if(Seed === 0)
		Seed = Number.MAX_VALUE;
	if(Seed >= 1) {
		if((Seed % 1) === 0)
			Seed /= Math.PI;
		Seed %= 1;
	} else if(Seed < 0)
		Seed = (Seed % 1) + 1;
	
	// Then do an LCG thing and return a predictable random number
	return ((69621 * (Seed * 0x7FFFFFFF)) % 0x7FFFFFFF) / 0x7FFFFFFF;
};

/**
 * Shuffles the entries in an array into a new random order.
 * <code>FlxG.shuffle()</code> is deterministic and safe for use with replays/recordings.
 * HOWEVER, <code>FlxU.shuffle()</code> is NOT deterministic and unsafe for use with replays/recordings.
 * 
 * @param	AA Flash <code>Array</code> object containing...stuff.
 * @param	HowManyTimes	How many swaps to perform during the shuffle operation.  Good rule of thumb is 2-4 times as many objects are in the list.
 * 
 * @return	The same Flash <code>Array</code> object that you passed in in the first place.
 */
Flixel.FlxU.shuffle = function(Objects, HowManyTimes)
{
	var i = 0;
	var index1;
	var index2;
	var object;
	
	while(i < HowManyTimes)
	{
		index1 = Math.random() * Objects.length;
		index2 = Math.random() * Objects.length;
		object = Objects[index2];
		Objects[index2] = Objects[index1];
		Objects[index1] = object;
		i++;
	}
	return Objects;
};

/**
 * Fetch a random entry from the given array.
 * Will return null if random selection is missing, or array has no entries.
 * <code>FlxG.getRandom()</code> is deterministic and safe for use with replays/recordings.
 * HOWEVER, <code>FlxU.getRandom()</code> is NOT deterministic and unsafe for use with replays/recordings.
 * 
 * @param	ObjectsA Flash array of objects.
 * @param	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
 * @param	LengthOptional restriction on the number of values you want to randomly select from.
 * 
 * @return	The random object that was selected.
 */
Flixel.FlxU.getRandom = function(Objects, StartIndex, Length)
{
	if(Objects !== null &&  Objects !== undefined)
	{
		var l = Length;
		if((l === 0) || (l > Objects.length - StartIndex))
			l = Objects.length - StartIndex;
		if(l > 0)
			return Objects[StartIndex + uint(Math.random()*l)];
	}
	return null;
};

/**
 * Just grabs the current "ticks" or time in milliseconds that has passed since Flash Player started up.
 * Useful for finding out how long it takes to execute specific blocks of code.
 * 
 * @return	A <code>uint</code> to be passed to <code>FlxU.endProfile()</code>.
 */
Flixel.FlxU.getTicks = function()
{
	return getTimer();
};

/**
 * Takes two "ticks" timestamps and formats them into the number of seconds that passed as a String.
 * Useful for logging, debugging, the watch window, or whatever else.
 * 
 * @param	StartTicks	The first timestamp from the system.
 * @param	EndTicks	The second timestamp from the system.
 * 
 * @return	A <code>String</code> containing the formatted time elapsed information.
 */
Flixel.FlxU.formatTicks = function(StartTicks, EndTicks)
{
	return ((EndTicks-StartTicks)/1000)+"s";
};

/**
 * Generate a Flash <code>uint</code> color from RGBA components.
 * 
 * @param   Red     The red component, between 0 and 255.
 * @param   Green   The green component, between 0 and 255.
 * @param   Blue    The blue component, between 0 and 255.
 * @param   Alpha   How opaque the color should be, either between 0 and 1 or 0 and 255.
 * 
 * @return  The color as a <code>uint</code>.
 */
Flixel.FlxU.makeColor = function(Red, Green, Blue, Alpha)
{
	return uint((((Alpha>1)?Alpha:((Alpha || 1) * 255)) & 0xFF) << 24 | (Red & 0xFF) << 16 | (Green & 0xFF) << 8 | (Blue & 0xFF));
};

/**
 * Generate a Flash <code>uint</code> color from RGBA components.
 * 
 * @param   Red     The red component, between 0 and 255.
 * @param   Green   The green component, between 0 and 255.
 * @param   Blue    The blue component, between 0 and 255.
 * @param   Alpha   How opaque the color should be, either between 0 and 1 or 0 and 255.
 * 
 * @return  The color as a <code>uint</code>.
 */
Flixel.FlxU.addAlphaToColor = function(color, Alpha)
{
	var colors = Flixel.FlxU.getRGBA(color);
	var Red = colors[0];
	var Green = colors[1];
	var Blue = colors[2];
	
	Alpha = (Alpha === undefined || Alpha === null) ? colors[3] : Alpha;
	
	if(Alpha <= 1) {
		Alpha = int(Alpha * 255);
	}

	return uint((Alpha & 0xFF) << 24 | (Red & 0xFF) << 16 | (Green & 0xFF) << 8 | (Blue & 0xFF));
};

/**
 * Generate a Flash <code>uint</code> color from HSB components.
 * 
 * @param	Hue			A number between 0 and 360, indicating position on a color strip or wheel.
 * @param	Saturation	A number between 0 and 1, indicating how colorful or gray the color should be.  0 is gray, 1 is vibrant.
 * @param	Brightness	A number between 0 and 1, indicating how bright the color should be.  0 is black, 1 is full bright.
 * @param   Alpha		How opaque the color should be, either between 0 and 1 or 0 and 255.
 * 
 * @return	The color as a <code>uint</code>.
 */
Flixel.FlxU.makeColorFromHSB = function(Hue, Saturation, Brightness, Alpha)
{
	var red;
	var green;
	var blue;

	if(Saturation === 0.0) {
		red   = Brightness;
		green = Brightness;        
		blue  = Brightness;
	} else {
		if(Hue == 360)
			Hue = 0;
		var slice = Hue/60;
		var hf = Hue/60 - slice;
		var aa = Brightness*(1 - Saturation);
		var bb = Brightness*(1 - Saturation*hf);
		var cc = Brightness*(1 - Saturation*(1.0 - hf));

		switch (slice) {
			case 0: red = Brightness; green = cc;   blue = aa;  break;
			case 1: red = bb;  green = Brightness;  blue = aa;  break;
			case 2: red = aa;  green = Brightness;  blue = cc;  break;
			case 3: red = aa;  green = bb;   blue = Brightness; break;
			case 4: red = cc;  green = aa;   blue = Brightness; break;
			case 5: red = Brightness; green = aa;   blue = bb;  break;
			default: red = 0;  green = 0;    blue = 0;   break;
		}
	}
	
	return (((Alpha>1)?Alpha:(Alpha * 255)) & 0xFF) << 24 | uint(red*255) << 16 | uint(green*255) << 8 | uint(blue*255);
};

/**
 * Loads an array with the RGBA values of a Flash <code>uint</code> color.
 * RGB values are stored 0-255.  Alpha is stored as a floating point number between 0 and 1.
 * 
 * @param	Color	The color you want to break into components.
 * @param	Results	An optional parameter, allows you to use an array that already exists in memory to store the result.
 * 
 * @return	An <code>Array</code> object containing the Red, Green, Blue and Alpha values of the given color.
 */
Flixel.FlxU.getRGBA = function(Color, Results)
{
	if(Results === undefined || Results === null)
		Results = [];
	Results[0] = (Color >> 16) & 0xFF;
	Results[1] = (Color >> 8) & 0xFF;
	Results[2] = Color & 0xFF;
	Results[3] = ((Color >> 24) & 0xFF) / 255;
	return Results;
};

/**
 * Loads an array with the HSB values of a Flash <code>uint</code> color.
 * Hue is a value between 0 and 360.  Saturation, Brightness and Alpha
 * are as floating point numbers between 0 and 1.
 * 
 * @param	Color	The color you want to break into components.
 * @param	Results	An optional parameter, allows you to use an array that already exists in memory to store the result.
 * 
 * @return	An <code>Array</code> object containing the Red, Green, Blue and Alpha values of the given color.
 */
Flixel.FlxU.getHSB = function(Color, Results)
{
	if(Results === null || Results === undefined)
		Results = [];
	
	var red = Number((Color >> 16) & 0xFF) / 255;
	var green = Number((Color >> 8) & 0xFF) / 255;
	var blue = Number((Color) & 0xFF) / 255;
	
	var m = (red>green)?red:green;
	var dmax = (m>blue)?m:blue;
	m = (red>green)?green:red;
	var dmin = (m>blue)?blue:m;
	var range = dmax - dmin;
	
	Results[2] = dmax;
	Results[1] = 0;
	Results[0] = 0;
	
	if(dmax !== 0)
		Results[1] = range / dmax;
	if(Results[1] !== 0) 
	{
		if (red == dmax)
			Results[0] = (green - blue) / range;
		else if (green == dmax)
			Results[0] = 2 + (blue - red) / range;
		else if (blue == dmax)
			Results[0] = 4 + (red - green) / range;
		Results[0] *= 60;
		if(Results[0] < 0)
			Results[0] += 360;
	}
	
	Results[3] = Number((Color >> 24) & 0xFF) / 255;
	return Results;
};

/**
 * Converts a Flash AARRGGBB format color to a libgdx/openGL rgba8888 format color.
 * 
 * @param	Color	The color to convert.
 * 
 * @return	The converted color.
 */
Flixel.FlxU.argbToRgba = function(Color)
{
	return (Color << 8) | (Color >>> 24);
};

/**
 * Multiplies two colors together. Colors should be in Flash AARRGGBB format.
 * 
 * @param	Color1	The first color to multiply.
 * @param	Color2	The second color to multiply.
 * 
 * @return	The multiplied colors.
 */
Flixel.FlxU.multiplyColors = function(Color1, Color2)
{
	var r = uint((((Color1 >> 16) & 0xFF) * ((Color2 >> 16) & 0xFF) * 0.00392));
	var g = uint((((Color1 >> 8) & 0xFF) * ((Color2 >> 8) & 0xFF) * 0.00392));
	var b = uint(((Color1 & 0xFF) * (Color2 & 0xFF) * 0.00392));
	var a = uint((((Color1 >> 24) & 0xFF) * ((Color2 >> 24) & 0xFF) * 0.00392));

	return Flixel.FlxU.makeColor(r, g, b, a);
};

/**
 * Format seconds as minutes with a colon, an optionally with milliseconds too.
 * 
 * @param	SecondsThe number of seconds (for example, time remaining, time spent, etc).
 * @param	ShowMSWhether to show milliseconds after a "." as well.  Default value is false.
 * 
 * @return	A nicely formatted <code>String</code>, like "1:03".
 */
Flixel.FlxU.formatTime = function(Seconds ,ShowMS)
{
	var timeString = int(Seconds/60) + ":";
	var timeStringHelper = int(Seconds)%60;
	
	if(timeStringHelper < 10)
		timeString += "0";
	timeString += timeStringHelper;

	if(ShowMS) {
		timeString += ".";
		timeStringHelper = (Seconds-int(Seconds))*100;
		if(timeStringHelper < 10)
			timeString += "0";
		timeString += timeStringHelper;
	}
	return timeString;
};

/**
 * Generate a comma-separated string from an array.
 * Especially useful for tracing or other debug output.
 * 
 * @param	AnyArray	Any <code>Array</code> object.
 * 
 * @return	A comma-separated <code>String</code> containing the <code>.toString()</code> output of each element in the array.
 */
Flixel.FlxU.formatArray = function(AnyArray)
{
	if((AnyArray === null || AnyArray === undefined) || (AnyArray.length <= 0))
		return "";
	var string = AnyArray[0].toString();
	var i = 1;
	var l = AnyArray.length;
	while(i < l)
		string += ", " + AnyArray[i++].toString();
	return string;
};

/**
 * Automatically commas and decimals in the right places for displaying money amounts.
 * Does not include a dollar sign or anything, so doesn't really do much
 * if you call say <code>var results:String = FlxU.formatMoney(10,false);</code>
 * However, very handy for displaying large sums or decimal money values.
 * 
 * @param	Amount	How much moneys (in dollars, or the equivalent "main" currency - i.e. not cents).
 * @param	ShowDecimalWhether to show the decimals/cents component. Default value is true.
 * @param	EnglishStyle	Major quantities (thousands, millions, etc) separated by commas, and decimal by a period.  Default value is true.
 * 
 * @return	A nicely formatted <code>String</code>.  Does not include a dollar sign or anything!
 */
Flixel.FlxU.formatMoney = function(Amount, ShowDecimal, EnglishStyle)
{
	var helper;
	var amount = Amount;
	var string = "";
	var comma = "";
	var zeroes = "";

	while(amount > 0) {
		if((string.length > 0) && comma.length <= 0) {
			if(EnglishStyle)
				comma = ",";
			else
				comma = ".";
		}

		zeroes = "";
		helper = amount - int(amount/1000)*1000;
		amount /= 1000;

		if(amount > 0) {
			if(helper < 100)
				zeroes += "0";
			if(helper < 10)
				zeroes += "0";
		}
		string = zeroes + helper + comma + string;
	}

	if(ShowDecimal) {
		amount = int(Amount*100)-(int(Amount)*100);
		string += (EnglishStyle?".":",") + amount;
		if(amount < 10)
			string += "0";
	}

	return string;
};

/**
 * Get the <code>String</code> name of any <code>Object</code>.
 * 
 * @param	ObjThe <code>Object</code> object in question.
 * @param	Simple	Returns only the class name, not the package or packages.
 * 
 * @return	The name of the <code>Class</code> as a <code>String</code> object.
 */
Flixel.FlxU.getClassName = function(Obj, Simple)
{
	return Obj.toString();
};

/**
 * Check to see if two objects have the same class name.
 * 
 * @param	Object1The first object you want to check.
 * @param	Object2The second object you want to check.
 * 
 * @return	Whether they have the same class name or not.
 */
Flixel.FlxU.compareClassNames = function(Object1, Object2)
{
	return Object1.toString() == Object2.toString();
};

/**
 * Look up a <code>Class</code> object by its string name.
 * 
 * @param	Name	The <code>String</code> name of the <code>Class</code> you are interested in.
 * 
 * @return	A <code>Class</code> object.
 */
Flixel.FlxU.getClass = function(Name)
{
	throw new Error("Not implemented in Flixel-JS due to HTML5!!");//return getDefinitionByName(Name);
};

/**
 * Look up a <code>Class</code> object by its string name.
 * 
 * @param	Name	The <code>String</code> name of the <code>Class</code> you are interested in.
 * 
 * @return	A <code>Class</code> object.
 */
Flixel.FlxU.getClassFromObject = function(object)
{
	throw new Error("Not implemented in Flixel-JS due to HTML5!!");//return getDefinitionByName(Flixel.FlxU.getClassName(object));
};

/**
 * A tween-like function that takes a starting velocity
 * and some other factors and returns an altered velocity.
 * 
 * @param	VelocityAny component of velocity (e.g. 20).
 * @param	Acceleration	Rate at which the velocity is changing.
 * @param	Drag	Really kind of a deceleration, this is how much the velocity changes if Acceleration is not set.
 * @param	MaxAn absolute value cap for the velocity.
 * 
 * @return	The altered Velocity value.
 */
Flixel.FlxU.computeVelocity = function(Velocity, Acceleration, Drag, Max, elapsed)
{
	Max = Max || 1000;
	elapsed = elapsed || Flixel.FlxG.elapsed;
	
	if(Acceleration !== 0)
		Velocity += Acceleration * elapsed;
	else if(Drag !== 0) {
		var drag = Drag * elapsed;
		if(Velocity - drag > 0)
			Velocity = Velocity - drag;
		else if(Velocity + drag < 0)
			Velocity += drag;
		else
			Velocity = 0;
	}

	if((Velocity !== 0) && (Max != 10000)) {
		if(Velocity > Max)
			Velocity = Max;
		else if(Velocity < -Max)
			Velocity = -Max;
	}
	return Velocity;
};

//*** NOTE: THESE LAST THREE FUNCTIONS REQUIRE FlxPOINT ***//

/**
 * Rotates a point in 2D space around another point by the given angle.
 * 
 * @param	XThe X coordinate of the point you want to rotate.
 * @param	YThe Y coordinate of the point you want to rotate.
 * @param	PivotX	The X coordinate of the point you want to rotate around.
 * @param	PivotY	The Y coordinate of the point you want to rotate around.
 * @param	Angle	Rotate the point by this many degrees.
 * @param	Point	Optional <code>FlxPoint</code> to store the results in.
 * 
 * @return	A <code>FlxPoint</code> containing the coordinates of the rotated point.
 */
Flixel.FlxU.rotatePoint = function(X, Y, PivotX, PivotY, Angle, Point)
{
	var sin = 0;
	var cos = 0;
	var radians = Angle * -0.017453293;
	
	while (radians < -3.14159265)
		radians += 6.28318531;
	
	while (radians >  3.14159265)
		radians = radians - 6.28318531;
	
	if (radians < 0) {
		sin = 1.27323954 * radians + 0.405284735 * radians * radians;
		if (sin < 0)
			sin = 0.225 * (sin *-sin - sin) + sin;
		else
			sin = 0.225 * (sin * sin - sin) + sin;
	} else {
		sin = 1.27323954 * radians - 0.405284735 * radians * radians;
		if (sin < 0)
			sin = 0.225 * (sin *-sin - sin) + sin;
		else
			sin = 0.225 * (sin * sin - sin) + sin;
	}
	
	radians += 1.57079632;

	if (radians >  3.14159265)
		radians = radians - 6.28318531;

	if (radians < 0) {
		cos = 1.27323954 * radians + 0.405284735 * radians * radians;
		if (cos < 0)
			cos = 0.225 * (cos *-cos - cos) + cos;
		else
			cos = 0.225 * (cos * cos - cos) + cos;
	} else {
		cos = 1.27323954 * radians - 0.405284735 * radians * radians;
		if (cos < 0)
			cos = 0.225 * (cos *-cos - cos) + cos;
		else
			cos = 0.225 * (cos * cos - cos) + cos;
	}
	
	var dx = X-PivotX;
	var dy = PivotY+Y; //Y axis is inverted in flash, normally this would be a subtract operation
	
	if(Point === null)
		Point = new Flixel.FlxPoint();
	
	Point.x = PivotX + cos*dx - sin*dy;
	Point.y = PivotY - sin*dx - cos*dy;
	return Point;
};

/**
 * Calculates the angle between two points.  0 degrees points straight up.
 * 
 * @param	Point1The X coordinate of the point.
 * @param	Point2The Y coordinate of the point.
 * 
 * @return	The angle in degrees, between -180 and 180.
 */
Flixel.FlxU.getAngle = function(Point1, Point2)
{
	var x = Point2.x - Point1.x;
	var y = Point2.y - Point1.y;

	if((x === 0) && (y === 0))
		return 0;
	var c1 = 3.14159265 * 0.25;
	var c2 = 3 * c1;
	var ay = (y < 0)?-y:y;
	var angle = 0;
	
	if (x >= 0)
		angle = c1 - c1 * ((x - ay) / (x + ay));
	else
		angle = c2 - c1 * ((x + ay) / (ay - x));
	angle = ((y < 0)?-angle:angle)*57.2957796;
	if(angle > 90)
		angle = angle - 270;
	else
		angle += 90;
	return angle;
};

/**
 * Calculate the distance between two points.
 * 
 * @param Point1	A <code>FlxPoint</code> object referring to the first location.
 * @param Point2	A <code>FlxPoint</code> object referring to the second location.
 * 
 * @return	The distance between the two points as a floating point <code>Number</code> object.
 */
Flixel.FlxU.getDistance = function(Point1, Point2)
{
	var dx = Point1.x - Point2.x;
	var dy = Point1.y - Point2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Returns the arc cosine of an angle given in radians. 
 * If value is smaller than -1, then the result is PI.
 * If the argument is greater than 1, then the result is 0.
 * 
 * @param value    The angle, in radians.
 * @return value's acos
 */
Flixel.FlxU.acos = function(value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Returns the arc sine of an angle given in radians.
 * If value is smaller than -1, then the result is -HALF_PI.
 * If the argument is greater than 1, then the result is HALF_PI.
 * 
 * @param value	The angle, in radians.
 * @return fValue's asin
 */
Flixel.FlxU.asin = function(value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};


/**
 * Computes and returns the sine of the specified angle in radians.
 * To calculate a radian. This method is only a fast sine approximation.
 * 
 * @param angleRadians	A number that represents an angle measured in radians.
 * @return A number from -1.0 to 1.0.
 */
Flixel.FlxU.sin = function(angleRadians)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Computes and returns the cosine of the specified angle in radians. To
 * calculate a radian. This method is only a fast cosine approximation.
 * 
 * @param angleRadians	A number that represents an angle measured in radians.
 * @return A number from -1.0 to 1.0.
 */
Flixel.FlxU.cos = function(angleRadians)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Returns the value squared. value ^ 2.
 * 
 * @param value	The value to square.
 * @return The square of the given value.
 */
Flixel.FlxU.sqr = function(value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Returns the value squared. value ^ 2.
 * 
 * @param value	The value to square.
 * @return The square of the given value.
 */
Flixel.FlxU.sqrt = function(value)
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Integer cast with respect to its sign.
 * 
 * @param value	A number.
 * @return The number casted to an integer with respect to its sign.
 */
Flixel.FlxU.rint = function(value)
{
	if(value > 0.0) {
		return int(value + 0.5);
	} else if(value < 0.0) {
		return -int(-value + 0.5);
	} else {
		return 0;
	}
};

/**
 * Returns Euler's number e raised to the power of a double value
 * @param value
 * @return
 */
Flixel.FlxU.exp = function(value) 
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Returns the value of the first argument raised to the power of the second argument.
 * Note: before you use this code you have to test it if the approximation is good 
 * enough for you!
 * 
 * @param aThe base.
 * @param bThe exponent.
 * @return
 */
Flixel.FlxU.pow = function(a, b) 
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Returns the natural logarithm (base e) of a double value.
 * 
 * @param value
 */
Flixel.FlxU.log = function(value) 
{
	throw new Error("Do not use FlxU math stuff, use Math. it's faster");
};

/**
 * Fills an array with numbers.
 * 
 * @return An array with numbers.
 */
Flixel.FlxU.fillArray = function(startAt, max)
{
	startAt = startAt || 0;
	max = max || 10;
	
	var a = [];
	for (var i = startAt; i < max; i++)  {
		a[i] = i;
	}
	return a;
};

/**
 * Round up to the next highest power of 2.
 * 
 * @param valueA value that needs to be power of 2.
 * @return	A value of power of 2.
 */
Flixel.FlxU.ceilPowerOfTwo = function(value)
{
	value--;
	value |= value >> 1;
	value |= value >> 2;
	value |= value >> 4;
	value |= value >> 8;
	value |= value >> 16;
	value++;
	return value;
};

/**
 * Round up to the next lowest power of 2.
 * 
 * @param valueA value that needs to be power of 2.
 * @return	A value of power of 2.
 */
Flixel.FlxU.floorPowerOfTwo = function(value)
{
	return Flixel.FlxU.ceilPowerOfTwo(value) >> 1;
};

/**
 * Generates and returns a 2D array.
 * 
 * @param	x	The array's first dimension.
 * @param	y	The array's second dimension.
 * @return	An array of the provided dimensions.
 */
Flixel.FlxU.create2DArray = function(x, y)
{
	var a = new Array(x);
	for (var i = 0; i < x; i++) {
		a[i] = new Array(y);
	}
	return a;
};

/**
 * Returns the class name.
 */
Flixel.FlxU.prototype.toString = function()
{
	return "FlxU";
};
/**
 * This is a global helper class full of useful methods for audio,<br>
 * input, basic info, and the camera system among other things.<br>
 * Utilities for maths and color and things can be found in <code>FlxU</code>.<br>
 * <code>FlxG</code> is specifically for Flixel-specific properties.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Adam Atomic
 */
Flixel.FlxG = function()
{
};

/**
 * If you build and maintain your own version of flixel, you can give it your own name here.
 */
Flixel.FlxG.LIBRARY_NAME = "Flixel";
/**
 * Assign a major version to your library. Appears before the decimal in the console.
 */
Flixel.FlxG.LIBRARY_MAJOR_VERSION = 2;
/**
 * Assign a minor version to your library. Appears after the decimal in the console.
 */
Flixel.FlxG.LIBRARY_MINOR_VERSION = 3;
/**
 * Debugger overlay layout preset: Wide but low windows at the bottom of the screen.
 */
Flixel.FlxG.DEBUGGER_STANDARD = 0;
/**
 * Debugger overlay layout preset: Tiny windows in the screen corners.
 */
Flixel.FlxG.DEBUGGER_MICRO = 1;
/**
 * Debugger overlay layout preset: Large windows taking up bottom half of screen.
 */
Flixel.FlxG.DEBUGGER_BIG = 2;
/**
 * Debugger overlay layout preset: Wide but low windows at the top of the screen.
 */
Flixel.FlxG.DEBUGGER_TOP = 3;
/**
 * Debugger overlay layout preset: Large windows taking up left third of screen.
 */
Flixel.FlxG.DEBUGGER_LEFT = 4;
/**
 * Debugger overlay layout preset: Large windows taking up right third of screen.
 */
Flixel.FlxG.DEBUGGER_RIGHT = 5;
/**
 * Our editor ID for the Admob
 */
Flixel.FlxG.UID = 0;
/**
 * The Android ID.
 */
Flixel.FlxG.DEVICE_ID = 0;
/**
 * Some handy color presets. Less glaring than pure RGB full values. Primarily used in the visual debugger mode for bounding box displays. Red is used to indicate an active, movable, solid object.
 */
Flixel.FlxG.RED = 0xffff0012;
/**
 * Green is used to indicate solid but immovable objects.
 */
Flixel.FlxG.GREEN = 0xff00f225;
/**
 * Blue is used to indicate non-solid objects.
 */
Flixel.FlxG.BLUE = 0xff0090e9;
/**
 * Pink is used to indicate objects that are only partially solid, like one-way platforms.
 */
Flixel.FlxG.PINK = 0xfff01eff;
/**
 * White... for white stuff.
 */
Flixel.FlxG.WHITE = 0xffffffff;
/**
 * And black too.
 */
Flixel.FlxG.BLACK = 0xff000000;
/**
 * Internal tracker for game object.
 */
Flixel.FlxG._game = null;
/**
 * Handy shared variable for implementing your own pause behavior.
 */
Flixel.FlxG.paused = false;
/**
 * Whether you are running in Debug or Release mode. Set automatically by <code>FlxPreloader</code> during startup.
 */
Flixel.FlxG.debug = false;
/**
 * Handy shared variable to check if the pause is on or off.
 */
Flixel.FlxG._disablePause = false;
/**
 * Represents the amount of time in seconds that passed since last frame.
 */
Flixel.FlxG.elapsed = 0;
/**
 * How fast or slow time should pass in the game; default is 1.0.
 */
Flixel.FlxG.timeScale = 0;
/**
 * The width of the screen in game pixels.
 */
Flixel.FlxG.width = 0;
/**
 * The height of the screen in game pixels.
 */
Flixel.FlxG.height = 0;
/**
 * The dimensions of the game world, used by the quad tree for collisions and overlap checks.
 */
Flixel.FlxG.worldBounds = null;
/**
 * How many times the quad tree should divide the world on each axis.<br>
 * Generally, sparse collisions can have fewer divisons, while denser collision activity usually profits from more.<br>
 * Default value is 6.
 */
Flixel.FlxG.worldDivisions = 0;
/**
 * The width in pixels of the display surface.
 */
Flixel.FlxG.screenWidth = 0;
/**
 * The height in pixels of the display surface.
 */
Flixel.FlxG.screenHeight = 0;
/**
 * Whether to show visual debug displays or not. Default = false.
 */
Flixel.FlxG.visualDebug = false;
/**
 * Setting this to true will disable/skip stuff that isn't necessary for mobile platforms like Android. [BETA]
 */
Flixel.FlxG.mobile = false;
/**
 * The global random number generator seed (for deterministic behavior in recordings and saves).
 */
Flixel.FlxG.globalSeed = 0;
/**
 * All the levels you have completed.
 */
Flixel.FlxG.levels = null;
/**
 * The current level.
 */
Flixel.FlxG.level = 0;
/**
 * The scores accomplished each level.
 */
Flixel.FlxG.scores = null;
/**
 * The current score.
 */
Flixel.FlxG.score = 0;
/**
 * <code>saves</code> is a generic bucket for storing FlxSaves so you can access them whenever you want.
 */
Flixel.FlxG.saves = null;
/**
 * The current save.
 */
Flixel.FlxG.save = null;
/**
 * A reference to a <code>FlxMouse</code> object. Important for input!
 */
Flixel.FlxG.mouse = null;
Flixel.FlxG.touch = null;
/**
 * A reference to a <code>FlxKeyboard</code> object. Important for input!
 */
Flixel.FlxG.keys = null;
/**
 * A handy container for a background music object.
 */
Flixel.FlxG.music = null;
/**
 * A list of all the sounds being played in the game.
 */
Flixel.FlxG.sounds = null;
/**
 * Internal volume level, used for global sound control.
 */
Flixel.FlxG.volumeHandler = null;
/**
 * An array of <code>FlxCamera</code> objects that are used to draw stuff. By default flixel creates one camera the size of the screen.
 */
Flixel.FlxG.cameras = null;
/**
 * Internal, keeps track of all the cameras that would have been added to the stage in Flash.
 */
Flixel.FlxG.displayList = null;
/**
 * By default this just refers to the first entry in the cameras array declared above, but you can do what you like with it.
 */
Flixel.FlxG.camera = null;
/**
 * Allows you to possibly slightly optimize the rendering process IF you are not doing any pre-processing in your game state's <code>draw()</code> call.
 * 
 * @default false
 */
Flixel.FlxG.useBufferLocking = false;
/**
 * Internal helper variable for clearing the cameras each frame.
 */
Flixel.FlxG._cameraRect = null;
/**
 * An array container for plugins. By default flixel uses a couple of plugins: DebugPathDisplay, and TimerManager.
 */
Flixel.FlxG.plugins = null;
/**
 * Useful helper objects for doing Flash-specific rendering. Primarily used for "debug visuals" like drawing bounding boxes directly to the screen buffer.
 */
Flixel.FlxG.flashGfxSprite = null;
Flixel.FlxG.flashGfx = null;
/**
 * Internal storage system to prevent graphics from being used repeatedly in memory.
 */
Flixel.FlxG._cache = null;
/**
 * The camera currently being drawn.
 */
Flixel.FlxG.activeCamera = null;
/**
 * Internal storage system to prevent assets from being used repeatedly in memory.
 */
Flixel.FlxG._assetManager = null;
/**
 * Global tweener for tweening between multiple worlds
 */
Flixel.FlxG.tweener = new Flixel.FlxBasic();
/**
 * If there have been a state change request.
 */
Flixel.FlxG.stateChange = false;
/**
 * The FlxStateStack instance.
 */
Flixel.FlxG.stateStack = null;
/**
 * Helper to refer a (1, 1) FlxPoint.
 */
Flixel.FlxG.basicPoint = new Flixel.FlxPoint(1, 1);

//========================================================//
//INTERFACED PLUGINS//
//========================================================//
/**
* If we have to check the license or not (Use for general licensing).
*/
Flixel.FlxG.checkLicense = false;
/**
* If we have Admob or not (Use for Google Admob).
*/
Flixel.FlxG.withAdmob = false;
/**
* The Ad manager instance (Admob in mobile).
*/
//Flixel.FlxG.adManager:FlxAdManager;
/**
* The rotation manager. (ONLY WORKS ON ANDROID)
*/
//Flixel.FlxG.rotationManager:FlxRotation;
/**
* The Pocket Change manager. (ONLY WORKS ON ANDROID)
*/
//Flixel.FlxG.pocketChange:FlxPocketChange;
/**
* The machine model (Android Mode for example).
*/
Flixel.FlxG.model = "";
/**
* The OS system name.
*/
Flixel.FlxG.systemName = "";
/**
* Indicates if the Internet connection was active or not at the time the game was launched.
*/
Flixel.FlxG.isInternetActive = false;
/**
* USed to check if we are on a ouya or not.
*/
Flixel.FlxG.isOuya = false;

//========================================================//
// HTML5 STUFF //
//========================================================//
/**
 * The Device object with all the stuff about the machine.
 */
Flixel.FlxG.device = null;
/**
 * The sound manager object.
 */
Flixel.FlxG.soundManager = null;
/**
 * The HTML5 Loader cache.
 */
Flixel.FlxG.loaderCache = null;
/**
 * The HTML5 scale manager.
 */
Flixel.FlxG.scaleManager = null;

//========================================================//
// STATIC METHODS //
//========================================================//
/**
 * Returns the library name.
 */
Flixel.FlxG.getLibraryName = function()
{
	return Flixel.FlxG.LIBRARY_NAME + " v" + Flixel.FlxG.LIBRARY_MAJOR_VERSION + "." + Flixel.FlxG.LIBRARY_MINOR_VERSION;
};

/**
 * Log data to the debugger.
 * 
 * @param DataAnything
 *            you want to log to the console.
 */
Flixel.FlxG.log = function(Data, tag)
{
	tag = tag || "Flixel";

	// Check if we have a debuger
	if ((Flixel.FlxG._game !== null) && (Flixel.FlxG._game._debugger !== null)) {
		// Check if the data is not null
		if (Data !== null)
			Flixel.FlxG._game._debugger.log.add(tag + ": " + ((Data instanceof Array) ? Flixel.FlxU.formatArray(Data) : Data.toString()));
		// If the data is null print an stack trace
		else {
			Flixel.FlxG._game._debugger.log.add(tag + ": Data is empty -> stackTrace | " + Data);
		}
	} else {
		// Check if the data is not null
		if (Data !== null)
			console.log(tag + ": " + Data);
		// If the data is null print an stack trace
		else {
			console.log(tag + ": Data is empty -> stackTrace | " + Data);
		}
	}
};

/**
 * Print the current stack trace.
 */
Flixel.FlxG.printStackTrace = function()
{
	Flixel.FlxG.log("", "NOT IMPLEMENTED IN HTLM5");
};

/**
 * Disable the pause system.
 * 
 * @param PauseIf
 *            we disable the pause system or not.
 */
Flixel.FlxG.setDisablePause = function(Pause)
{
	Flixel.FlxG._disablePause = Pause;
};

/**
 * Return the true if we disabled the pause system.
 */
Flixel.FlxG.getDisablePause = function()
{
	return Flixel.FlxG._disablePause;
};

/**
 * Check if the game is paused or not.
 */
Flixel.FlxG.getPause = function()
{
	return Flixel.FlxG.paused;
};

/**
 * Return the game instance (DANGEROUS!!!)
 */
Flixel.FlxG.getGame = function()
{
	return Flixel.FlxG._game;
};

/**
 * This method pause/unpause the game. Only do something if the game was not in the pause/unpause state.
 */
Flixel.FlxG.setPause = function(pause)
{	
	var op;
	if (Flixel.FlxG._disablePause) {
		op = Flixel.FlxG.paused;
		Flixel.FlxG.paused = pause;
		if (Flixel.FlxG.paused != op) {
			if (Flixel.FlxG.paused)
				Flixel.FlxG.pauseAudio();
			else
				Flixel.FlxG.resumeAudio();
		}
		return;
	}

	op = Flixel.FlxG.paused;
	Flixel.FlxG.paused = pause;
	if (Flixel.FlxG.paused != op) {
		if (Flixel.FlxG.paused) {
			Flixel.FlxG.pauseAudio();

			// Dispatch pause event
			if (Flixel.FlxG.getStage() !== null)
				Flixel.FlxG.getStage().dispatchEvent(Flixel.plugin.PauseEvent.getEvent(Flixel.plugin.PauseEvent.PAUSE_IN));
			// stateStack.setBackKeyMode(FlxStateStack.DIRECT_BACK);
		} else {
			Flixel.FlxG.resumeAudio();

			// Dispatch pause event
			if (Flixel.FlxG.getStage() !== null)
				Flixel.FlxG.getStage().dispatchEvent(Flixel.plugin.PauseEvent.getEvent(Flixel.plugin.PauseEvent.PAUSE_OUT));
			// stateStack.setBackKeyMode(FlxStateStack.PAUSE_GAME);
		}
	}
};

/**
 * Add a variable to the watch list in the debugger. This lets you see the value of the variable all the time.
 * 
 * @param AnyObjectA
 *            reference to any object in your game, e.g. Player or Robot or this.
 * @param VariableName
 *            The name of the variable you want to watch, in quotes, as a string: e.g. "speed" or "health".
 * @param DisplayNameOptional,
 *            display your own string instead of the class name + variable name: e.g. "enemy count".
 */
Flixel.FlxG.watch = function(AnyObject, VariableName, DisplayName)
{
	if ((Flixel.FlxG._game !== null) && (Flixel.FlxG._game._debugger !== null))
		Flixel.FlxG._game._debugger.watch.add(AnyObject, VariableName, DisplayName);
};

/**
 * Remove a variable from the watch list in the debugger. Don't pass a Variable Name to remove all watched variables for the specified object.
 * 
 * @param AnyObjectA
 *            reference to any object in your game, e.g. Player or Robot or this.
 * @param VariableName
 *            The name of the variable you want to watch, in quotes, as a string: e.g. "speed" or "health".
 */
Flixel.FlxG.unwatch = function(AnyObject, VariableName)
{
	if ((Flixel.FlxG._game !== null) && (Flixel.FlxG._game._debugger !== null))
		Flixel.FlxG._game._debugger.watch.remove(AnyObject, VariableName);
};

/**
 * How many times you want your game to update each second. More updates usually means better collisions and smoother motion. NOTE: This is NOT the same thing as the Flash Player framerate!
 */
Flixel.FlxG.getFramerate = function()
{
	return 1000 / Flixel.FlxG._game._step;
};

/**
 * @private
 */
Flixel.FlxG.setFramerate = function(Framerate)
{
	Flixel.FlxG._game._step = 1000 / Framerate;
	if (Flixel.FlxG._game._maxAccumulation < Flixel.FlxG._game._step)
		Flixel.FlxG._game._maxAccumulation = Flixel.FlxG._game._step;
};

/**
 * How many times you want your game to update each second. More updates usually means better collisions and smoother motion. NOTE: This is NOT the same thing as the Flash Player framerate!
 */
Flixel.FlxG.getFlashFramerate = function()
{
	if (Flixel.FlxG._game.stage !== null)
		return Flixel.FlxG._game.stage.frameRate;
	else
		return 0;
};

/**
 * @private
 */
Flixel.FlxG.setFlashFramerate = function(Framerate)
{
	Flixel.FlxG._game._flashFramerate = Framerate;
	if (Flixel.FlxG._game.stage !== null)
		Flixel.FlxG._game.stage.frameRate = Flixel.FlxG._game._flashFramerate;
	Flixel.FlxG._game._maxAccumulation = 2000 / Flixel.FlxG._game._flashFramerate - 1;
	if (Flixel.FlxG._game._maxAccumulation < Flixel.FlxG._game._step)
		Flixel.FlxG._game._maxAccumulation = Flixel.FlxG._game._step;
};

/**
 * Switch to full-screen display.
 * 
 * @param {boolean}
 *            antialias - You can toggle the anti-alias feature of the canvas before jumping in to full screen (false = retain pixel art, true =
 *            smooth art)
 */
Flixel.FlxG.fullscreen = function(antialias)
{
//	Flixel.FlxG.getStage().displayState = "fullScreen";
//	var fsw = Flixel.FlxG.width * Flixel.FlxG.camera.getZoom();
//	var fsh = Flixel.FlxG.height * Flixel.FlxG.camera.getZoom();
//	Flixel.FlxG.camera.x = (Flixel.FlxG.getStage().fullScreenWidth - fsw) / 2;
//	Flixel.FlxG.camera.y = (Flixel.FlxG.getStage().fullScreenHeight - fsh) / 2;
	if(Flixel.FlxG.scaleManager.isFullScreen())
		Flixel.FlxG.scaleManager.stopFullScreen();
	else
		Flixel.FlxG.scaleManager.startFullScreen();
};

/**
 * Generates a random number. Deterministic, meaning safe to use if you want to record replays in random environments.
 * 
 * @return A <code>Number</code> between 0 and 1.
 */
Flixel.FlxG.random = function()
{
	Flixel.FlxG.globalSeed = Flixel.FlxU.srand(Flixel.FlxG.globalSeed);
	return Flixel.FlxG.globalSeed;
};

/**
 * Shuffles the entries in an array into a new random order. <code>shuffle()</code> is deterministic and safe for use with replays/recordings. HOWEVER, <code>FlxU.shuffle()</code> is NOT
 * deterministic and unsafe for use with replays/recordings.
 * 
 * @param AA
 *            Flash <code>Array</code> object containing...stuff.
 * @param HowManyTimes
 *            How many swaps to perform during the shuffle operation. Good rule of thumb is 2-4 times as many objects are in the list.
 * 
 * @return The same Flash <code>Array</code> object that you passed in in the first place.
 */
Flixel.FlxG.shuffle = function(Objects, HowManyTimes)
{
	var i = 0;
	var index1;
	var index2;
	var object;
	while (i < HowManyTimes) {
		index1 = Flixel.FlxG.random() * Objects.length;
		index2 = Flixel.FlxG.random() * Objects.length;
		object = Objects[index2];
		Objects[index2] = Objects[index1];
		Objects[index1] = object;
		i++;
	}
	return Objects;
};

/**
 * Fetch a random entry from the given array. Will return null if random selection is missing, or array has no entries. <code>getRandom()</code> is deterministic and safe for use with
 * replays/recordings. HOWEVER, <code>FlxU.getRandom()</code> is NOT deterministic and unsafe for use with replays/recordings.
 * 
 * @param ObjectsA
 *            Flash array of objects.
 * @param StartIndex
 *            Optional offset off the front of the array. Default value is 0, or the beginning of the array.
 * @param Length
 *            Optional restriction on the number of values you want to randomly select from.
 * 
 * @return The random object that was selected.
 */
Flixel.FlxG.getRandom = function(Objects, StartIndex, Length)
{
	if (Objects !== null) {
		var l = Length;
		if ((l === 0) || (l > Objects.length - StartIndex))
			l = Objects.length - StartIndex;
		if (l > 0)
			return Objects[StartIndex + uint(Flixel.FlxG.random() * l)];
	}
	return null;
};

/**
 * Load replay data from a string and play it back.
 * 
 * @param DataThe
 *            replay that you want to load.
 * @param StateOptional
 *            parameter: if you recorded a state-specific demo or cutscene, pass a new instance of that state here.
 * @param CancelKeys
 *            Optional parameter: an array of string names of keys (see FlxKeyboard) that can be pressed to cancel the playback, e.g. ["ESCAPE","ENTER"]. Also accepts 2 custom key names: "ANY" and
 *            "MOUSE" (fairly self-explanatory I hope!).
 * @param TimeoutOptional
 *            parameter: set a time limit for the replay. CancelKeys will override this if pressed.
 * @param Callback
 *            Optional parameter: if set, called when the replay finishes. Running to the end, CancelKeys, and Timeout will all trigger Callback(), but only once, and CancelKeys and Timeout will NOT
 *            call stopReplay() if Callback is set!
 */
Flixel.FlxG.loadReplay = function(Data, State, CancelKeys, Timeout, Callback)
{
	Flixel.FlxG._game._replay.load(Data);
	if (State === null)
		Flixel.FlxG.resetGame();
	else
		Flixel.FlxG.switchState(State);
	Flixel.FlxG._game._replayCancelKeys = CancelKeys;
	Flixel.FlxG._game._replayTimer = Timeout * 1000;
	Flixel.FlxG._game._replayCallback = Callback;
	Flixel.FlxG._game._replayRequested = true;
};

/**
 * Resets the game or state and replay requested flag.
 * 
 * @param StandardMode
 *            If true, reload entire game, else just reload current game state.
 */
Flixel.FlxG.reloadReplay = function(StandardMode)
{
	StandardMode = (StandardMode === undefined) ? true : StandardMode;

	if (StandardMode)
		Flixel.FlxG.resetGame();
	else
		Flixel.FlxG.resetState();
	if (Flixel.FlxG._game._replay.frameCount > 0)
		Flixel.FlxG._game._replayRequested = true;
};

/**
 * Stops the current replay.
 */
Flixel.FlxG.stopReplay = function()
{
	Flixel.FlxG._game._replaying = false;
	if (Flixel.FlxG._game._debugger !== null)
		Flixel.FlxG._game._debugger.vcr.stopped();
	Flixel.FlxG.resetInput();
};

/**
 * Resets the game or state and requests a new recording.
 * 
 * @param StandardMode
 *            If true, reset the entire game, else just reset the current state.
 */
Flixel.FlxG.recordReplay = function(StandardMode)
{
	StandardMode = (StandardMode === undefined) ? true : StandardMode;

	if (StandardMode)
		Flixel.FlxG.resetGame();
	else
		Flixel.FlxG.resetState();
	Flixel.FlxG._game._recordingRequested = true;
};

/**
 * Stop recording the current replay and return the replay data.
 * 
 * @return The replay data in simple ASCII format (see <code>FlxReplay.save()</code>).
 */
Flixel.FlxG.stopRecording = function()
{
	Flixel.FlxG._game._recording = false;
	if (Flixel.FlxG._game._debugger !== null)
		Flixel.FlxG._game._debugger.vcr.stopped();
	return Flixel.FlxG._game._replay.save();
};

/**
 * Request a reset of the current game state.
 */
Flixel.FlxG.resetState = function()
{
	Flixel.FlxG._game._requestedState = new (Flixel.FlxU.getClass(Flixel.FlxU.getClassName(Flixel.FlxG._game._state, false)))();
};

/**
 * Like hitting the reset button on a game console, this will re-launch the game as if it just started.
 */
Flixel.FlxG.resetGame = function()
{
	Flixel.FlxG._game._requestedReset = true;
};

/**
 * Reset the input helper objects (useful when changing screens or states)
 */
Flixel.FlxG.resetInput = function()
{
	Flixel.FlxG.keys.reset();
	Flixel.FlxG.mouse.reset();
};

/**
 * Set up and play a looping background soundtrack.
 * 
 * @param MusicThe
 *            sound file you want to loop in the background.
 * @param VolumeHow
 *            loud the sound should be, from 0 to 1.
 */
Flixel.FlxG.playMusic = function(Music, Volume)
{
	if(!Flixel.FlxG.device.canPlayAudio("any"))
		return;

	if (Flixel.FlxG.music === null)
		Flixel.FlxG.music = new Flixel.FlxSound();
	else if (Flixel.FlxG.music.active)
		Flixel.FlxG.music.stop();
	Flixel.FlxG.music.loadEmbedded(Music, true);
	Flixel.FlxG.music.setVolume(Volume);
	Flixel.FlxG.music.survive = true;
	Flixel.FlxG.music.play();
};

/**
 * Creates a new sound object.
 * 
 * @param EmbeddedSound
 *            The embedded sound resource you want to play. To stream, use the optional URL parameter instead.
 * @param Volume
 *            How loud to play it (0 to 1).
 * @param Looped
 *            Whether to loop this sound.
 * @param AutoDestroyWhether
 *            to destroy this sound when it finishes playing. Leave this value set to "false" if you want to re-use this <code>FlxSound</code> instance.
 * @param AutoPlayWhether
 *            to play the sound.
 * @param URLLoad
 *            a sound from an external web resource instead. Only used if EmbeddedSound = null.
 * 
 * @return A <code>FlxSound</code> object.
 */
Flixel.FlxG.loadSound = function(EmbeddedSound, Volume, Looped, AutoDestroy, AutoPlay, URL)
{
	Volume = (Volume === undefined) ? 1.0 : Volume;
	Looped = (Looped === undefined) ? false : Looped;
	AutoDestroy = (AutoDestroy === undefined) ? false : AutoDestroy;
	AutoPlay = (AutoPlay === undefined) ? false : AutoPlay;
	
	if(!Flixel.FlxG.device.canPlayAudio("any"))
		return;
	
	if((EmbeddedSound === null) && (URL === null)) {
		Flixel.FlxG.log("WARNING: loadSound() requires either\nan embedded sound or a URL to work.");
		return null;
	}

	var sound = Flixel.FlxG.sounds.recycle(Flixel.FlxSound);

	if(EmbeddedSound !== null)
		sound.loadEmbedded(EmbeddedSound, Looped, AutoDestroy);
	else
		sound.loadStream(URL, Looped, AutoDestroy);
		sound.setVolume(Volume);
	if(AutoPlay)
		sound.play();
	return sound;
};

/**
 * Creates a new sound object from an embedded <code>Class</code> object. NOTE: Just calls loadSound() with AutoPlay == true.
 * 
 * @param EmbeddedSound
 *            The sound you want to play.
 * @param Volume
 *            How loud to play it (0 to 1).
 * @param Looped
 *            Whether to loop this sound.
 * @param AutoDestroyWhether
 *            to destroy this sound when it finishes playing. Leave this value set to "false" if you want to re-use this <code>FlxSound</code> instance.
 * 
 * @return A <code>FlxSound</code> object.
 */
Flixel.FlxG.play = function(EmbeddedSound, Volume, Looped, AutoDestroy)
{
	return Flixel.FlxG.loadSound(EmbeddedSound, Volume, Looped, AutoDestroy, true);
};

/**
 * Creates a new sound object from a URL. NOTE: Just calls loadSound() with AutoPlay == true.
 * 
 * @param URLThe
 *            URL of the sound you want to play.
 * @param Volume
 *            How loud to play it (0 to 1).
 * @param Looped
 *            Whether or not to loop this sound.
 * @param AutoDestroyWhether
 *            to destroy this sound when it finishes playing. Leave this value set to "false" if you want to re-use this <code>FlxSound</code> instance.
 * 
 * @return A FlxSound object.
 */
Flixel.FlxG.stream = function(URL, Volume, Looped, AutoDestroy)
{
	return Flixel.FlxG.loadSound(null, Volume, Looped, AutoDestroy, true, URL);
};

/**
 * Get the music volume.
 */
Flixel.FlxG.getMusicVolume = function()
{
	return Flixel.FlxG.volumeHandler.musicVolume;
};

/**
 * Get the sound volume.
 */
Flixel.FlxG.getSoundVolume = function()
{
	return Flixel.FlxG.volumeHandler.soundVolume;
};
 
/**
 * Sets the music volume
 */
Flixel.FlxG.setMusicVolume = function(volume)
{
	if(volume < 0)
		volume = 0;
	else if(volume > 1)
		volume = 1;
	
	Flixel.FlxG.volumeHandler.musicVolume = volume;
	Flixel.FlxG.onChange(Flixel.FlxG.volumeHandler.mute ? 0 : volume, Flixel.FlxSound.TYPE_MUSIC);
};

/**
 * Sets the sound volume
 */
Flixel.FlxG.setSoundVolume = function(volume)
{
	if(volume < 0)
		volume = 0;
	else if(volume > 1)
		volume = 1;
	
	Flixel.FlxG.volumeHandler.soundVolume = volume;
	Flixel.FlxG.onChange(Flixel.FlxG.volumeHandler.mute ? 0 : volume, Flixel.FlxSound.TYPE_SFX);
};

/**
 * Get the mute state
 */
Flixel.FlxG.getMute = function()
{
	return Flixel.FlxG.volumeHandler.mute;
};

/**
 * Sets the mute state
 */
Flixel.FlxG.setMute = function(mute)
{
	Flixel.FlxG.volumeHandler.mute = mute;
	if(mute) {
		Flixel.FlxG.onChange(0, Flixel.FlxSound.ALL);
	} else {
		Flixel.FlxG.onChange(Flixel.FlxG.volumeHandler.musicVolume, Flixel.FlxSound.TYPE_MUSIC);
		Flixel.FlxG.onChange(Flixel.FlxG.volumeHandler.soundVolume, Flixel.FlxSound.TYPE_SFX);
	}
};

/**
 * Called by FlxGame on state changes to stop and destroy sounds.
 * 
 * @param ForceDestroyKill
 *            sounds even if they're flagged <code>survive</code>.
 */
Flixel.FlxG.destroySounds = function(ForceDestroy)
{
	ForceDestroy = (ForceDestroy === undefined) ? true : ForceDestroy;
	
	if((Flixel.FlxG.music !== null) && (ForceDestroy || !Flixel.FlxG.music.survive)) {
		Flixel.FlxG.music.destroy();
		Flixel.FlxG.music = null;
	}
	var i = 0;
	var sound;
	var l = Flixel.FlxG.sounds.members.length;

	while(i < l) {
		sound = Flixel.FlxG.sounds.members[i++];
		if((sound !== null && sound !== undefined) && (ForceDestroy || !sound.survive))
			sound.destroy();
	}
	Flixel.FlxG.sounds.clear();
};

/**
 * Called by the game loop to make sure the sounds get updated each frame.
 */
Flixel.FlxG.updateSounds = function()
{
	if((Flixel.FlxG.music !== null) && Flixel.FlxG.music.active)
		Flixel.FlxG.music.update();
	if((Flixel.FlxG.sounds !== null) && Flixel.FlxG.sounds.active)
		Flixel.FlxG.sounds.update();
};

/**
 * Pause all sounds currently playing.
 */
Flixel.FlxG.pauseAudio = function()
{
	if((Flixel.FlxG.music !== null) && Flixel.FlxG.music.exists && Flixel.FlxG.music.active)
		Flixel.FlxG.music.pause();

	var i = 0;
	var sound = null;
	var l = Flixel.FlxG.sounds.length;

	while(i < l) {
		sound = Flixel.FlxG.sounds.members[i++];

		if((sound !== null) && sound.exists && sound.active)
			sound.pause();
	}
};

/**
 * Resume playing existing sounds.
 */
Flixel.FlxG.resumeAudio = function()
{
	if((Flixel.FlxG.music !== null) && Flixel.FlxG.music.exists && Flixel.FlxG.music.isPaused())
		Flixel.FlxG.music.resume();
	var i = 0;
	var sound;
	var l = Flixel.FlxG.sounds.length;

	while(i < l) {
		sound = Flixel.FlxG.sounds.members[i++];
		
		if((sound !== null) && sound.exists)
			sound.resume();
	}
};

/**
 * Check the local bitmap cache to see if a bitmap with this key has been loaded already.
 * 
 * @param KeyThe
 *            string key identifying the bitmap.
 * 
 * @return Whether or not this file can be found in the cache.
 */
Flixel.FlxG.checkBitmapCache = function(Key)
{
	return (Flixel.FlxG._cache[Key] !== undefined) && (Flixel.FlxG._cache[Key] !== null);
};

/**
 * Generates a new <code>BitmapData</code> object (a colored square) and caches it.
 * 
 * @param Width
 *            How wide the square should be.
 * @param Height
 *            How high the square should be.
 * @param Color
 *            What color the square should be (0xAARRGGBB)
 * @param Unique
 *            Ensures that the bitmap data uses a new slot in the cache.
 * @param KeyForce
 *            the cache to use a specific Key to index the bitmap.
 * 
 * @return The <code>BitmapData</code> we just created.
 */
Flixel.FlxG.createBitmap = function(Width, Height, Color, Unique, Key)
{
	Unique = (Unique === undefined) ? false : Unique;
	Key = (Key === undefined) ? null : Key;

	if(Key === null) {
		Key = Width+"x"+Height+":"+Color;
		if(Unique && Flixel.FlxG.checkBitmapCache(Key)) {
			var inc = 0;
			var ukey;
			do {
				ukey = Key + inc++;
			} while(Flixel.FlxG.checkBitmapCache(ukey));
			Key = ukey;
		}
	}

	if(!Flixel.FlxG.checkBitmapCache(Key))
		Flixel.FlxG._cache[Key] = new BitmapData(Width, Height, true, Color);
	return Flixel.FlxG._cache[Key];
};

/**
 * Loads a bitmap from a file, caches it, and generates a horizontally flipped version if necessary.
 * 
 * @param GraphicThe
 *            image file that you want to load.
 * @param ReverseWhether
 *            to generate a flipped version.
 * @param UniqueEnsures
 *            that the bitmap data uses a new slot in the cache.
 * @param Key
 *            Force the cache to use a specific Key to index the bitmap.
 * 
 * @return The <code>BitmapData</code> we just created.
 */
Flixel.FlxG.addBitmap = function(Graphic, Reverse, Unique, Key)
{
	Reverse = (Unique === undefined) ? false : Reverse;
	Unique = (Unique === undefined) ? false : Unique;
	Key = (Key === undefined) ? null : Key;
	
	if(Key === null) {
		Key = String(Graphic)+(Reverse?"_REVERSE_":"");

		if(Unique && Flixel.FlxG.checkBitmapCache(Key)) {
			var inc = 0;
			var ukey;
			do {
				ukey = Key + inc++;
			} while(Flixel.FlxG.checkBitmapCache(ukey));
			Key = ukey;
		}
	}
		
	// If there is no data for this key, generate the requested graphic
	if(!Flixel.FlxG.checkBitmapCache(Key)) {	
		var pixels = null;
	
		// Manager for embeded images
		if(Graphic instanceof Image) {
			var bitmap = new Graphic();
			if(bitmap === null) {
				Flixel.FlxG.log("Error: " + Flixel.FlxU.getClassName(Graphic) + " must be an Image.");
				return Flixel.FlxG.addBitmap(Flixel.data.FlxSystemAsset.ImgDefault, Reverse);
			}
			pixels = bitmap.bitmapData;
			
		} else
		// Manager for atlas images
		if(typeof Graphic === "string") { // Graphic instanceof String will not work for some reason D:!
			pixels = Flixel.FlxG._assetManager.getRegion(Graphic);
		} else {
			Flixel.FlxG.log("Graphic has a wrong format: " + Graphic + ". Only Image or String allowed", "FlxG.addBitmap");
		}
	
		// Check if pixels is null to prevent crazy erros
		if(pixels === null) {
			Flixel.FlxG.log("Graphic was not recogniced: " + Graphic + ". Only Image or String allowed", "FlxG.addBitmap");
			Graphic = Flixel.data.FlxSystemAsset.ImgDefault;
			pixels = Flixel.FlxG.addBitmap(Graphic, Reverse);
		}
	
		// Reverse image if needed
		if(Reverse)
		{
			var newPixels = new BitmapData(pixels.width << 1, pixels.height, true ,0x00000000);
			newPixels.draw(pixels);
			var mtx = new Matrix();
			mtx.scale(-1, 1);
			mtx.translate(newPixels.width, 0);
			newPixels.draw(pixels, mtx);
			//TODO: Make dispose method pixels.dispose();
			pixels = newPixels;	
		}
	
		Flixel.FlxG._cache[Key] = pixels;
	}
	return Flixel.FlxG._cache[Key];
};

/**
 * Dumps the cache's image references.
 */
Flixel.FlxG.clearBitmapCache = function()
{
	Flixel.FlxG._cache = [];
};

/**
 * Read-only: retrieves the Flash stage object (required for event listeners) Will be null if it's not safe/useful yet.
 */
Flixel.FlxG.getStage = function()
{
	if(Flixel.FlxG._game.stage !== null)
		return Flixel.FlxG._game.stage;
	return null;
};

/**
 * Read-only: access the current game state from anywhere.
 */
Flixel.FlxG.getState = function()
{
	return Flixel.FlxG._game._state;
};

/**
 * Read-only: gets the current FlxCamera.
 */
Flixel.FlxG.getActiveCamera = function()
{
	return Flixel.FlxG.activeCamera;
};

/**
 * Switch from the current game state to the one specified here.
 */
Flixel.FlxG.switchState = function(State, saveInStack)
{
	Flixel.FlxG.setState(State, true);
};

/**
 * Switch from the current game state to the one specified here.
 * 
 * @param state
 *            The new state.
 * @param saveInStack
 *            If you want to save the new state in the stack or not.
 */
Flixel.FlxG.setState = function(state, saveInStack)
{
	saveInStack = (saveInStack === undefined) ? true : saveInStack;
	
	// Save the state in the stack if we have to
	//TODO: Make state stack in HTML5
//	if(saveInStack) {
		// Do not save the Splash Screen State
//		if(!state instanceof Flixel.plugin.FlxSplashScreen) {
//			Flixel.FlxG.stateStack.pushState(Flixel.FlxU.getClass(Flixel.FlxU.getClassName(state)));
//		}
	
	// Do not use the normal back mode if we have more than one state
	// if(stateStack.size() > 1)
	// stateStack.setBackKeyMode(FlxStateStack.DIRECT_BACK);
//	}
	
	Flixel.FlxG._game._requestedState = state;
};

/**
 * Change the way the debugger's windows are laid out.
 * 
 * @param LayoutSee
 *            the presets above (e.g. <code>DEBUGGER_MICRO</code>, etc).
 */
Flixel.FlxG.setDebuggerLayout = function(Layout)
{
	if(Flixel.FlxG._game._debugger !== null)
		Flixel.FlxG._game._debugger.setLayout(Layout);
};

/**
 * Just resets the debugger windows to whatever the last selected layout was (<code>DEBUGGER_STANDARD</code> by default).
 */
Flixel.FlxG.resetDebuggerLayout = function()
{
	if(Flixel.FlxG._game._debugger !== null)
		Flixel.FlxG._game._debugger.resetLayout();
};

/**
 * Add a new camera object to the game. Handy for PiP, split-screen, etc.
 * 
 * @param NewCamera
 *            The camera you want to add.
 * 
 * @return This <code>FlxCamera</code> instance.
 */
Flixel.FlxG.addCamera = function(NewCamera)
{
	Flixel.FlxG.cameras.push(NewCamera);
	Flixel.FlxG.displayList.push(NewCamera);
	return NewCamera;
};

/**
 * Remove a camera from the game.
 * 
 * @param Camera
 *            The camera you want to remove.
 * @param Destroy
 *            Whether to call destroy() on the camera, default value is true.
 */
Flixel.FlxG.removeCamera = function(Camera, Destroy)
{
	Destroy = (Destroy === undefined) ? true : Destroy;
	
	if(Camera && Flixel.FlxG._game.contains(Camera._flashSprite)) {
		Flixel.FlxG.displayList.splice(Flixel.FlxG.cameras.indexOf(Camera), 1);
		Flixel.FlxG._game.removeChild(Camera._flashSprite);
	}
	else
		Flixel.FlxG.log("Error removing camera, not part of game.");

	Flixel.FlxG.cameras.splice(Flixel.FlxG.cameras.indexOf(Camera), 1);

	if(Destroy)
		Camera.destroy();
};

/**
 * Dumps all the current cameras and resets to just one camera. Handy for doing split-screen especially.
 * 
 * @param NewCamera
 *            Optional; specify a specific camera object to be the new main camera.
 */
Flixel.FlxG.resetCameras = function(NewCamera)
{
	var cam;
	var i = 0;
	var l = Flixel.FlxG.cameras.length;

	while(i < l) {
		cam = Flixel.FlxG.cameras[i++];
		Flixel.FlxG.displayList.splice(Flixel.FlxG.displayList.indexOf(cam), 1);
		cam.destroy();
	}
	Flixel.FlxG.cameras.length = 0;
	
	if(NewCamera === undefined)
		NewCamera = new Flixel.FlxCamera(0, 0, Flixel.FlxG.width, Flixel.FlxG.height);
	Flixel.FlxG.camera = Flixel.FlxG.addCamera(NewCamera);
};

/**
 * All screens are filled with this color and gradually return to normal.
 * 
 * @param ColorThe
 *            color you want to use.
 * @param Duration
 *            How long it takes for the flash to fade.
 * @param OnComplete
 *            A function you want to run when the flash finishes.
 * @param ForceForce
 *            the effect to reset.
 */
Flixel.FlxG.flash = function(Color, Duration, OnComplete, Force)
{
	Color = Color || 0xffffffff;
	Duration = Duration || 1;
	Force = Force || false;
	
	var i = 0;
	var l = Flixel.FlxG.cameras.length;
	while(i < l)
		Flixel.FlxG.cameras[i++].flash(Color,Duration,OnComplete,Force);
};

/**
 * The screen is gradually filled with this color.
 * 
 * @param ColorThe
 *            color you want to use.
 * @param Duration
 *            How long it takes for the fade to finish.
 * @param OnComplete
 *            A function you want to run when the fade finishes.
 * @param ForceForce
 *            the effect to reset.
 */
Flixel.FlxG.fade = function(Color, Duration, OnComplete, Force)
{
	Color = Color || 0xff000000;
	Duration = Duration || 1;
	Force = Force || false;

	var i = 0;
	var l = Flixel.FlxG.cameras.length;
	while(i < l)
		Flixel.FlxG.cameras[i++].fade(Color, Duration, OnComplete, Force);
};

/**
 * A simple screen-shake effect.
 * 
 * @param Intensity
 *            Percentage of screen size representing the maximum distance that the screen can move while shaking.
 * @param Duration
 *            The length in seconds that the shaking effect should last.
 * @param OnComplete
 *            A function you want to run when the shake effect finishes.
 * @param ForceForce
 *            the effect to reset (default = true, unlike flash() and fade()!).
 * @param Direction
 *            Whether to shake on both axes, just up and down, or just side to side (use class constants SHAKE_BOTH_AXES, SHAKE_VERTICAL_ONLY, or SHAKE_HORIZONTAL_ONLY). Default value is
 *            SHAKE_BOTH_AXES (0).
 */
Flixel.FlxG.shake = function(Intensity, Duration, OnComplete, Force, Direction)
{
	Intensity = Intensity || 0.5;
	Duration = Duration || 0.5;
	Force = (Force === undefined) ? true : Force;
	Direction = Direction || 0;
	
	var i = 0;
	var l = Flixel.FlxG.cameras.length;
	while(i < l)
		Flixel.FlxG.cameras[i++].shake(Intensity, Duration, OnComplete, Force, Direction);
};

/**
 * Get and set the background color of the game. Get functionality is equivalent to camera.bgColor. Set functionality sets the background color of all the current cameras.
 */
Flixel.FlxG.getBgColor = function()
{
	if(Flixel.FlxG.camera === null)
		return 0xff000000;
	else
		return Flixel.FlxG.camera.bgColor;
};

/**
 * Set the background color of all the game cameras.
 */
Flixel.FlxG.setBgColor = function(Color)
{
	var i = 0;
	var l = Flixel.FlxG.cameras.length;
	while(i < l)
		Flixel.FlxG.cameras[i++].bgColor = Color;
};

/**
 * Call this function to see if one <code>FlxObject</code> overlaps another. Can be called with one object and one group, or two groups, or two objects, whatever floats your boat! For maximum
 * performance try bundling a lot of objects together using a <code>FlxGroup</code> (or even bundling groups together!).
 * 
 * <p>
 * NOTE: does NOT take objects' scrollfactor into account, all overlaps are checked in world space.
 * </p>
 * 
 * @param ObjectOrGroup1
 *            The first object or group you want to check.
 * @param ObjectOrGroup2
 *            The second object or group you want to check. If it is the same as the first, flixel knows to just do a comparison within that group.
 * @param NotifyCallback
 *            A function with two <code>FlxObject</code> parameters - e.g. <code>myOverlapFunction(Object1:FlxObject,Object2:FlxObject)</code> - that is called if those two objects overlap.
 * @param ProcessCallback
 *            A function with two <code>FlxObject</code> parameters - e.g. <code>myOverlapFunction(Object1:FlxObject,Object2:FlxObject)</code> - that is called if those two objects overlap. If a
 *            ProcessCallback is provided, then NotifyCallback will only be called if ProcessCallback returns true for those objects!
 * 
 * @return Whether any oevrlaps were detected.
 */
Flixel.FlxG.overlap = function(ObjectOrGroup1, ObjectOrGroup2, NotifyCallback, ProcessCallback)
{
	if(ObjectOrGroup1 === null || ObjectOrGroup1 === undefined)
		ObjectOrGroup1 = Flixel.FlxG.getState();
	if(ObjectOrGroup2 === ObjectOrGroup1)
		ObjectOrGroup2 = null;
	Flixel.system.FlxQuadTree.divisions = Flixel.FlxG.worldDivisions;
	var quadTree = Flixel.system.FlxQuadTree.getNew(Flixel.FlxG.worldBounds.x, Flixel.FlxG.worldBounds.y, Flixel.FlxG.worldBounds.width, Flixel.FlxG.worldBounds.height, null);
	quadTree.load(ObjectOrGroup1, ObjectOrGroup2, NotifyCallback, ProcessCallback);
	var result = quadTree.execute();
	quadTree.destroy();
	return result;
};

/**
 * Call this function to see if one <code>FlxObject</code> collides with another. Can be called with one object and one group, or two groups, or two objects, whatever floats your boat! For maximum
 * performance try bundling a lot of objects together using a <code>FlxGroup</code> (or even bundling groups together!).
 * 
 * <p>
 * This function just calls overlap and presets the ProcessCallback parameter to FlxObject.separate. To create your own collision logic, write your own ProcessCallback and use overlap to set it up.
 * </p>
 * 
 * <p>
 * NOTE: does NOT take objects' scrollfactor into account, all overlaps are checked in world space.
 * </p>
 * 
 * @param ObjectOrGroup1
 *            The first object or group you want to check.
 * @param ObjectOrGroup2
 *            The second object or group you want to check. If it is the same as the first, flixel knows to just do a comparison within that group.
 * @param NotifyCallback
 *            A function with two <code>FlxObject</code> parameters - e.g. <code>myOverlapFunction(Object1:FlxObject,Object2:FlxObject)</code> - that is called if those two objects overlap.
 * 
 * @return Whether any objects were successfully collided/separated.
 */
Flixel.FlxG.collide = function(ObjectOrGroup1, ObjectOrGroup2, NotifyCallback)
{
	return Flixel.FlxG.overlap(ObjectOrGroup1, ObjectOrGroup2, NotifyCallback, Flixel.FlxObject.separate);
};

/**
 * Adds a new plugin to the global plugin array.
 * 
 * @param Plugin
 *            Any object that extends FlxBasic. Useful for managers and other things. See com.ratalaika.Flixel.plugin for some examples!
 * 
 * @return The same <code>FlxBasic</code>-based plugin you passed in.
 */
Flixel.FlxG.addPlugin = function(Plugin)
{
	// Don't add repeats
	var pluginList = Flixel.FlxG.plugins;
	var i = 0;
	var l = pluginList.length;

	while(i < l) {
		if(pluginList[i++].toString() == Plugin.toString())
			return Plugin;
	}
	
	// no repeats! safe to add a new instance of this plugin
	pluginList.push(Plugin);
	return Plugin;
};

/**
 * Retrieves a plugin based on its class name from the global plugin array.
 * 
 * @param ClassType
 *            The class name of the plugin you want to retrieve. See the <code>FlxPath</code> or <code>FlxTimer</code> constructors for example usage.
 * 
 * @return The plugin object, or null if no matching plugin was found.
 */
Flixel.FlxG.getPlugin = function(ClassType)
{
	var pluginList = Flixel.FlxG.plugins;
	var i = 0;
	var l = pluginList.length;

	while(i < l) {
		if(pluginList[i] instanceof ClassType)
			return Flixel.FlxG.plugins[i];
		i++;
	}
	return null;
};

/**
 * Removes an instance of a plugin from the global plugin array.
 * 
 * @param Plugin
 *            The plugin instance you want to remove.
 * 
 * @return The same <code>FlxBasic</code>-based plugin you passed in.
 */
Flixel.FlxG.removePlugin = function(Plugin)
{
	// Don't add repeats
	var pluginList = Flixel.FlxG.plugins;
	var i = pluginList.length-1;

	while(i >= 0) {
		if(pluginList[i] == Plugin)
			pluginList.splice(i,1);
		i--;
	}
	return Plugin;
};

/**
 * Removes an instance of a plugin from the global plugin array.
 * 
 * @param ClassType
 *            The class name of the plugin type you want removed from the array.
 * 
 * @return Whether or not at least one instance of this plugin type was removed.
 */
Flixel.FlxG.removePluginType = function(ClassType)
{
	// Don't add repeats
	var results = false;
	var pluginList = Flixel.FlxG.plugins;
	var i = pluginList.length-1;

	while(i >= 0) {
		if(pluginList[i] instanceof ClassType) {
			pluginList.splice(i,1);
			results = true;
		}
		i--;
	}

	return results;
};

/**
 * Called by <code>FlxGame</code> to set up <code>FlxG</code> during <code>FlxGame</code>'s constructor.
 */
Flixel.FlxG.init = function(Game, Width, Height, Zoom, ScaleMode)
{
	// Set the game stuff
	Flixel.FlxG._game = Game;
	Flixel.FlxG.width = Width;
	Flixel.FlxG.height = Height;
	Flixel.FlxG.scaleManager = new ScaleManager(Width, Height);
	
	// Set the sound stuff
	Flixel.FlxG.sounds = new Flixel.FlxGroup();
	Flixel.FlxG.volumeHandler = new Flixel.system.FlxVolumeHandler();
	Flixel.FlxG.music = null;
	
	// Initialize all the FlxG general variables
	Flixel.FlxG.stateStack = new Flixel.plugin.FlxStateStack();
	Flixel.FlxG.stateChange = false;
	Flixel.FlxG.clearBitmapCache();
	Flixel.FlxG._assetManager = Flixel.system.atlas.FlxAssetManager.getInstance();

	//TODO: Flixel.system.atlas.FlxSystemAsset.init();
	
	// Set up cameras
	Flixel.FlxCamera.defaultZoom = Zoom;
	Flixel.FlxCamera.defaultScaleMode = ScaleMode;
	Flixel.FlxG.cameras = [];
	Flixel.FlxG.displayList = [];
	Flixel.FlxG.camera = null;
	Flixel.FlxG._cameraRect = new Flixel.FlxRect();
	Flixel.FlxG.useBufferLocking = false;

	// Set up flash gfx sprite
	if(Flixel.FlxG.flashGfxSprite === null) {
		Flixel.FlxG.flashGfxSprite = new BitmapData(Flixel.FlxG.width, Flixel.FlxG.height, true, 0x0);
		Flixel.FlxG.flashGfx = Flixel.FlxG.flashGfxSprite.context;
	}

	// Set the plugin stuff
	Flixel.FlxG.plugins = [];
	Flixel.FlxG.addPlugin(new Flixel.plugin.DebugPathDisplay());
	Flixel.FlxG.addPlugin(new Flixel.plugin.TimerManager());
	Flixel.FlxG.addPlugin(Flixel.FlxG.soundManager);

	// Set the input stuff
	Flixel.FlxG.mouse = new Flixel.system.input.Mouse(Flixel.FlxG._game._mouse);
	Flixel.FlxG.touch = Flixel.FlxG.mouse;
	Flixel.FlxG.keys = new Flixel.system.input.Keyboard();
	Flixel.FlxG.mobile = Flixel.FlxG.device.isMobile;

	Flixel.FlxG.levels = [];
	Flixel.FlxG.scores = [];
	Flixel.FlxG.visualDebug = false;
};

/**
 * Called whenever the game is reset, doesn't have to do quite as much work as the basic initialization stuff.
 */
Flixel.FlxG.reset = function()
{
	Flixel.FlxG.clearBitmapCache();
	Flixel.FlxG.resetInput();
	Flixel.FlxG.destroySounds(true);

	Flixel.FlxG.levels.length = 0;
	Flixel.FlxG.scores.length = 0;
	Flixel.FlxG.level = 0;
	Flixel.FlxG.score = 0;
	Flixel.FlxG.paused = false;
	Flixel.FlxG.timeScale = 1.0;
	Flixel.FlxG.elapsed = 0;
	Flixel.FlxG.globalSeed = Math.random();
	Flixel.FlxG.worldBounds = new Flixel.FlxRect(-10, -10, Flixel.FlxG.width + 20, Flixel.FlxG.height + 20);
	Flixel.FlxG.worldDivisions = 6;

	var debugPathDisplay = Flixel.FlxG.getPlugin(Flixel.plugin.DebugPathDisplay);
	if(debugPathDisplay !== null)
		debugPathDisplay.clear();
};

/**
 * Called by the game object to update the keyboard and mouse input tracking objects.
 */
Flixel.FlxG.updateInput = function()
{
	// Update the Keyboard inputs
	Flixel.FlxG.keys.update();

	if(!Flixel.FlxG._game._debuggerUp || !Flixel.FlxG._game._debugger.hasMouse)
		Flixel.FlxG.mouse.update();
};

/**
 * Called by the game object to lock all the camera buffers and clear them for the next draw pass.
 */
Flixel.FlxG.lockCameras = function()
{
	var cam = Flixel.FlxG.activeCamera;

	if(!cam.exists || !cam.visible)
		return;

	if(Flixel.FlxG.useBufferLocking)
		cam.buffer.lock();

	cam.fill(cam.bgColor);
	cam.screen.dirty = true;
};

/**
 * Called by the game object to draw the special FX and unlock all the camera buffers.
 */
Flixel.FlxG.unlockCameras = function()
{
	var cam = Flixel.FlxG.activeCamera;
	
	if(!cam.exists || !cam.visible)
		return;
	
	cam.drawFX();
	if(Flixel.FlxG.useBufferLocking)
		cam.buffer.unlock();
};

/**
 * Called by the game object to update the cameras and their tracking/special effects logic.
 */
Flixel.FlxG.updateCameras = function()
{
	var cam;
	var cams = Flixel.FlxG.cameras;
	var i = 0;
	var l = cams.length;
	while(i < l)
	{
		cam = cams[i++];
		if((cam !== undefined) && cam.exists && cam.active)
			cam.update();
	}
};

/**
 * Used by the game object to call <code>update()</code> on all the plugins.
 */
Flixel.FlxG.updatePlugins = function()
{
	var plugin;
	var pluginList = Flixel.FlxG.plugins;
	var i = 0;
	var l = pluginList.length;
	while(i < l)
	{
		plugin = pluginList[i++];
		if(plugin.exists && plugin.active)
			plugin.update();
	}
};

/**
 * Used by the game object to call <code>draw()</code> on all the plugins.
 */
Flixel.FlxG.drawPlugins = function()
{
	var plugin;
	var pluginList = Flixel.FlxG.plugins;
	var i = 0;
	var l = pluginList.length;
	while (i < l) {
		plugin = pluginList[i++];
		if (plugin.exists && plugin.visible)
			plugin.draw();
	}
};

/**
 * Vibrates for the given amount of time. Note that you'll need the permission <code> <uses-permission android:name="android.permission.VIBRATE" /></code> in your manifest file in order for this to
 * work.
 * 
 * @param Milliseconds
 *            The amount of time to vibrate for.
 */
Flixel.FlxG.vibrate = function(Milliseconds)
{
	if(navigator.vibrate)
		navigator.vibrate(Milliseconds);
};

/**
 * Vibrate with a given pattern. Pass in an array of ints that are the times at which to turn on or off the vibrator. The first one is how long to wait before turning it on, and then after that it
 * alternates. If you want to repeat, pass the index into the pattern at which to start the repeat.
 * 
 * @param Pattern
 *            An array of longs of times to turn the vibrator on or off.<br>
 *            The odd parameters in the list is vibration time, the even ones are pauses.
 * @param Repeat
 *            NOT WORKING ON HTML5
 */
Flixel.FlxG.vibratePattern = function(Pattern, Repeat)
{
	if(navigator.vibrate)
		navigator.vibrate(Pattern);
};

/**
 * Stops the vibrator.
 */
Flixel.FlxG.stopVibrate = function()
{
	if(navigator.vibrate)
		navigator.vibrate(0);
};

/**
 * Change the Pause Screen.
 */
Flixel.FlxG.getPauseGroup = function()
{
	return Flixel.FlxG._game._pause;
};

/**
 * Switch to a previous game state.
 */
Flixel.FlxG.previousGameState = function()
{
	var stateClass = null;

	// Check if we have previous game states
	if (Flixel.FlxG.stateStack.size() > 0)
		stateClass = Flixel.FlxG.stateStack.popState();
	// If we do not have previous game states just switch to normal back state
	if (Flixel.FlxG.stateStack.size() === 0)
		Flixel.FlxG.stateStack.setBackKeyMode(Flixel.plugin.FlxStateStack.NORMAL);

	Flixel.FlxG._game._requestedState = new stateClass();

	// If we had a previous game state just switch to it
	Flixel.FlxG.stateChange = true;
};

/**
 * This method clear the queue of states
 */
Flixel.FlxG.clearPreviousGameStates = function()
{
	Flixel.FlxG.stateStack.clear();
};

/**
 * Exits the application.
 */
Flixel.FlxG.exit = function()
{
	Flixel.FlxG.log("EXIT DO NOTHIG IN Flixel-HTML5!!!");
};

/**
 * A helper method. This method equals: FlxLanguagesManager.getInstance().getString(string)
 */
Flixel.FlxG.getString = function(s)
{
	return Flixel.FlxLanguagesManager.getInstance().getString(s);
};

/**
 * Returns the total time since the game started.
 */
Flixel.FlxG.getTotal = function()
{
	return getTimer();
};

/**
 * Return true if we are on a REAL OUYA device.
 */
Flixel.FlxG.inOUYA = function()
{
	return false;
};

/**
 * Return the FlxAssetManager instance.
 */
Flixel.FlxG.getAssetManager = function()
{
	return Flixel.FlxG._assetManager;
};

/**
 * Tweens numeric public properties of an Object. Shorthand for creating a MultiVarTween tween, starting it and adding it to a Tweener.
 * 
 * @param objectThe
 *            object containing the properties to tween.
 * @param valuesAn
 *            object containing key/value pairs of properties and target values.
 * @param duration
 *            Duration of the tween.
 * @param optionsAn
 *            object containing key/value pairs of the following optional parameters: typeTween type. complete Optional completion callback function. easeOptional easer function. tweenerThe Tweener to
 *            add this Tween to.
 * @return The added MultiVarTween object.
 */
// Flixel.FlxG.tween(FlxBasic object, HashMap<String, Float> values, float duration, options:*=null):MultiVarTween
// {
// int type = FlxTween.ONESHOT;
// IFlxTween complete = null;
// IFlxTweenEase ease = null;
// FlxBasic tweener = FlxG.tweener;
//	
// if (options !== null) {
// type = options.type;
// complete = options.complete;
// ease = options.ease;
// tweener = options.tweener;
// }
// MultiVarTween tween = new MultiVarTween(complete, type);
// tween.tween(object, values, duration, ease);
// tweener.addTween(tween);
// return tween;
// }
// ========================================================//
// CALLBACKS //
// ========================================================//
/**
 * Set this hook to get a callback whenever the volume changes. Function should take the form <code>myVolumeHandler(Volume:Number)</code>.
 */
Flixel.FlxG.onChange = function(volume, type)
{
	switch (type) {
		case Flixel.FlxSound.TYPE_MUSIC:
			if (Flixel.FlxG.music !== null)
				Flixel.FlxG.music.setVolume(volume);
			break;
		case Flixel.FlxSound.TYPE_SFX:
			// Update all the sounds
			for (var i = 0; i < Flixel.FlxG.sounds.members.length; i++) {
				Flixel.FlxG.sounds.members[i].setVolume(volume);
			}
			break;
		case Flixel.FlxSound.ALL:
			if (Flixel.FlxG.music !== null)
				Flixel.FlxG.music.setVolume(volume);
			// Update all the sounds
			for (var t = 0; t < Flixel.FlxG.sounds.members.length; t++) {
				Flixel.FlxG.sounds.members[t].setVolume(volume);
			}
			break;
	}
};

/**
 * Returns the class name.
 */
Flixel.FlxG.prototype.toString = function()
{
	return "FlxG";
};
/**
 * This is an organizational class that can update and render a bunch of <code>FlxBasic</code>s.
 * NOTE: Although <code>FlxGroup</code> extends <code>FlxBasic</code>, it will not automatically
 * add itself to the global collisions quad tree, it will only add its members.
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor
 */
Flixel.FlxGroup = function(MaxSize)
{
	this.members = [];
	this.length = 0;
	this._maxSize = MaxSize || 0;
	this._marker = 0;
	this._sortIndex = null;
	Flixel.FlxGroup.parent.constructor.apply(this);
};
extend(Flixel.FlxGroup, Flixel.FlxBasic);

/**
 * Use with <code>sort()</code> to sort in ascending order.
 */
Flixel.FlxGroup.ASCENDING = -1;
/**
 * Use with <code>sort()</code> to sort in descending order.
 */
Flixel.FlxGroup.DESCENDING = 1;
/**
 * Array of all the <code>FlxBasic</code>s that exist in this group.
 */
Flixel.FlxGroup.prototype.members = null;
/**
 * The number of entries in the members array.
 * For performance and safety you should check this variable
 * instead of members.length unless you really know what you're doing!
 */
Flixel.FlxGroup.prototype.length = 0;
/**
 * Internal tracker for the maximum capacity of the group.
 * Default is 0, or no max capacity.
 */
Flixel.FlxGroup.prototype._maxSize = 0;
/**
 * Internal helper variable for recycling objects a la <code>FlxEmitter</code>.
 */
Flixel.FlxGroup.prototype._marker = 0;
/**
 * Helper for sort.
 */
Flixel.FlxGroup.prototype._sortIndex = null;
/**
 * Helper for sort.
 */
Flixel.FlxGroup.prototype._sortOrder = 0;
/**
 * Helper for sort.
 */
Flixel.FlxGroup.prototype._sortCheckIndexExistence = false;

/**
 * Override this function to handle any deleting or "shutdown" type operations you might need,
 * such as removing traditional Flash children like Sprite objects.
 */
Flixel.FlxGroup.prototype.destroy = function()
{
	if(this.members !== null)
	{
		var basic;
		var i = 0;
		while(i < this.length) {
			basic = this.members[i++];
			if(basic !== undefined && basic !== null) {
				basic.destroy();
			}
		}
		this.members.length = 0;
		this.members = null;
	}
	this.length = 0;
	this._sortIndex = null;

	Flixel.FlxGroup.parent.destroy.apply(this);
};

/**
 * Just making sure we don't increment the active objects count.
 */
Flixel.FlxGroup.prototype.preUpdate = function()
{
};



/**
 * Automatically goes through and calls update on everything you added.
 */
Flixel.FlxGroup.prototype.update = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists && basic.active)
		{
			basic.preUpdate();
			basic.update();
			if (basic.hasTween()) {
				basic.updateTweens();
			}
			basic.postUpdate();
		}
	}

	if (this.hasTween()) {
		this.updateTweens();
	}
};

/**
 * Destroy the dead objects.
 * 
 * @param splice Whether the object should be cut from the array entirely or not.
 */
Flixel.FlxGroup.prototype.destroyDead = function(splice)
{
	if (this.members !== null) {
		var basic;
		var i = 0;
		while (i < this.members.length) {
			basic = this.members[i++];
			if (basic !== undefined && !basic.alive) {
				this.remove(basic, splice);
				basic.destroy();
			}
		}
	}
};

/**
 * Remove all instances of <code>T</code> subclass (FlxSprite, FlxBlock, etc) from the list. The secureClear() destroy() and kill() the objects!
 */
Flixel.FlxGroup.prototype.secureClear = function()
{
	var basic;
	var i = 0;
	while (i < this.members.length) {
		basic = this.members[i++];
		if (basic !== undefined) {
			if (basic instanceof Flixel.FlxGroup) {
				basic.secureClear();
				basic.kill();
				basic.destroy();
			} else {
				basic.kill();
				basic.destroy();
			}
		}
	}
	this.length = 0;
	this.members.length = 0;
};

/**
 * Automatically goes through and calls render on everything you added.
 */
Flixel.FlxGroup.prototype.draw = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists && basic.visible)
			basic.draw();
	}
};

/**
 * The maximum capacity of this group.  Default is 0, meaning no max capacity, and the group can just grow.
 */
Flixel.FlxGroup.prototype.getMaxSize = function()
{
	return this._maxSize;
};

/**
 * @private
 */
Flixel.FlxGroup.prototype.setMaxSize = function(Size)
{
	this._maxSize = Size;
	if(this._marker >= this._maxSize)
		this._marker = 0;
	if((this._maxSize === 0) || (this.members === null) || (this._maxSize >= this.members.length))
		return;
	
	// If the max size has shrunk, we need to get rid of some objects
	var basic;
	var i = this._maxSize;
	var l = this.members.length;
	while(i < l)
	{
		basic = this.members[i++];
		if(basic !== undefined)
			basic.destroy();
	}
	this.length = this.members.length = this._maxSize;
};

/**
 * Adds a new <code>FlxBasic</code> subclass (FlxBasic, FlxSprite, Enemy, etc) to the group.
 * FlxGroup will try to replace a null member of the array first.
 * Failing that, FlxGroup will add it to the end of the member array,
 * assuming there is room for it, and doubling the size of the array if necessary.
 *
 * <p>WARNING: If the group has a maxSize that has already been met,
 * the object will NOT be added to the group!</p>
 *
 * @param	Object		The object you want to add to the group.
 *
 * @return	The same <code>FlxBasic</code> object that was passed in.
 */
Flixel.FlxGroup.prototype.add = function(Object)
{
	if (Object === undefined || Object === null) {
		Flixel.FlxG.log("WARNING: Cannot add a `null` or `undefined` object to a FlxGroup.");
		return null;
	}

	// Don't bother adding an object twice.
	if(this.members.indexOf(Object) >= 0)
		return Object;
	
	// First, look for a null entry where we can add the object.
	var i = 0;
	var l = this.members.length;
	while(i < l)
	{
		if(this.members[i] === undefined)
		{
			this.members[i] = Object;
			if(i >= this.length)
				this.length = i+1;
			return Object;
		}
		i++;
	}
	
	// Failing that, expand the array (if we can) and add the object.
	if(this._maxSize > 0)
	{
		if(this.members.length >= this._maxSize)
			return Object;
		else if(this.members.length * 2 <= this._maxSize)
			this.members.length *= 2;
		else
			this.members.length = this._maxSize;
	}
	else
		this.members.length *= 2;
	
	// If we made it this far, then we successfully grew the group,
	// and we can go ahead and add the object at the first open slot.
	this.members[i] = Object;
	this.length = i+1;
	return Object;
};

/**
 * Recycling is designed to help you reuse game objects without always re-allocating or "newing" them.
 * 
 * <p>If you specified a maximum size for this group (like in FlxEmitter),
 * then recycle will employ what we're calling "rotating" recycling.
 * Recycle() will first check to see if the group is at capacity yet.
 * If group is not yet at capacity, recycle() returns a new object.
 * If the group IS at capacity, then recycle() just returns the next object in line.</p>
 * 
 * <p>If you did NOT specify a maximum size for this group,
 * then recycle() will employ what we're calling "grow-style" recycling.
 * Recycle() will return either the first object with exists == false,
 * or, finding none, add a new object to the array,
 * doubling the size of the array if necessary.</p>
 * 
 * <p>WARNING: If this function needs to create a new object,
 * and no object class was provided, it will return null
 * instead of a valid object!</p>
 * 
 * @param	ObjectClass		The class type you want to recycle (e.g. FlxSprite, EvilRobot, etc). Do NOT "new" the class in the parameter!
 * 
 * @return	A reference to the object that was created.  Don't forget to cast it back to the Class you want (e.g. myObject = myGroup.recycle(myObjectClass) as myObjectClass;).
 */
Flixel.FlxGroup.prototype.recycle = function(ObjectClass)
{
	var basic;
	if(this._maxSize > 0)
	{
		if(this.length < this._maxSize)
		{
			if(ObjectClass === null)
				return null;
			return this.add(new ObjectClass());
		}
		else
		{
			basic = this.members[this._marker++];
			if(this._marker >= this._maxSize)
				this._marker = 0;
			return basic;
		}
	}
	else
	{
		basic = this.getFirstAvailable(ObjectClass);
		if(basic !== null)
			return basic;
		if(ObjectClass === null)
			return null;
		return this.add(new ObjectClass());
	}
};

/**
 * Removes an object from the group.
 * 
 * @param	Object	The <code>FlxBasic</code> you want to remove.
 * @param	Splice	Whether the object should be cut from the array entirely or not.
 * 
 * @return	The removed object.
 */
Flixel.FlxGroup.prototype.remove = function(Object, Splice)
{
	var index = this.members.indexOf(Object);
	Splice = Splice || false;

	if((index < 0) || (index >= this.members.length))
		return null;

	if(Splice) {
		this.members.splice(index, 1);
		this.length--;
	} else
		this.members[index] = undefined;
	return Object;
};

/**
 * Replaces an existing <code>FlxBasic</code> with a new one.
 * 
 * @param	OldObject	The object you want to replace.
 * @param	NewObject	The new object you want to use instead.
 * 
 * @return	The new object.
 */
Flixel.FlxGroup.prototype.replace = function(OldObject, NewObject)
{
	var index = this.members.indexOf(OldObject);
	if((index < 0) || (index >= this.members.length))
		return null;
	this.members[index] = NewObject;
	return NewObject;
};

/**
 * Call this function to sort the group according to a particular value and order.
 * For example, to sort game objects for Zelda-style overlaps you might call
 * <code>myGroup.sort("y",ASCENDING)</code> at the bottom of your
 * <code>FlxState.update()</code> override.  To sort all existing objects after
 * a big explosion or bomb attack, you might call <code>myGroup.sort("exists",DESCENDING)</code>.
 * If you are sure every object in the group has the sorting property you want to sort on, then you
 * might call <code>sort()</code> passing <code>false</code> as the third parameter which disables
 * the index existence check, boosting the sorting performance.
 * 
 * @param	Index	The <code>String</code> name of the member variable you want to sort on.  Default value is "y".
 * @param	Order	A <code>FlxGroup</code> constant that defines the sort order.  Possible values are <code>ASCENDING</code> and <code>DESCENDING</code>.  Default value is <code>ASCENDING</code>.
 * @param	CheckIndexExistence	Whether the method should check if group members have the sorting property you want to sort on. Members without the sorting property are always placed at the end of the group after the sort, in no particular order. Checking the index existence prevents the method from throwing an exception in case it encounters an object without the sorting property, but it causes a huge performance penalty. Default value is <code>true</code>. 
 */
Flixel.FlxGroup.prototype.sort = function(Index, Order, CheckIndexExistence)
{
	this._sortIndex = Index || "y";
	this._sortOrder = Order || Flixel.FlxGroup.ASCENDING;
	this._sortCheckIndexExistence = (CheckIndexExistence === undefined) ? true : CheckIndexExistence;
	this.members.sort(this.sortHandler);
};


/**
 * Go through and set the specified variable to the specified value on all members of the group.
 * 
 * @param	VariableName	The string representation of the variable name you want to modify, for example "visible" or "scrollFactor".
 * @param	Value			The value you want to assign to that variable.
 * @param	Recurse			Default value is true, meaning if <code>setAll()</code> encounters a member that is a group, it will call <code>setAll()</code> on that group rather than modifying its variable.
 */
Flixel.FlxGroup.prototype.setAll = function(VariableName, Value, Recurse)
{
	Recurse = (Recurse === undefined) ? true : Recurse;

	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(Recurse && (basic instanceof Flixel.FlxGroup))
				basic.setAll(VariableName, Value, Recurse);
			else
				basic[VariableName] = Value;
		}
	}
};

/**
 * Go through and call the specified function on all members of the group.
 * Currently only works on functions that have no required parameters.
 * 
 * @param	FunctionName	The string representation of the function you want to call on each object, for example "kill()" or "init()".
 * @param	Recurse			Default value is true, meaning if <code>callAll()</code> encounters a member that is a group, it will call <code>callAll()</code> on that group rather than calling the group's function.
 */ 
Flixel.FlxGroup.prototype.callAll = function(FunctionName, Recurse)
{
	Recurse = (Recurse === undefined) ? true : Recurse;

	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(Recurse && (basic instanceof Flixel.FlxGroup))
				basic.callAll(FunctionName, Recurse);
			else
				basic[FunctionName]();
		}
	}
};

/**
 * Call this function to retrieve the first object with exists == false in the group.
 * This is handy for recycling in general, e.g. respawning enemies.
 * 
 * @param	ObjectClass		An optional parameter that lets you narrow the results to instances of this particular class.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as not existing.
 */
Flixel.FlxGroup.prototype.getFirstAvailable = function(ObjectClass)
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== null) && !basic.exists && ((ObjectClass === null) || (basic instanceof ObjectClass)))
			return basic;
	}
	return null;
};

/**
 * Call this function to retrieve the first index set to 'null'.
 * Returns -1 if no index stores a null object.
 * 
 * @return	An <code>int</code> indicating the first null slot in the group.
 */
Flixel.FlxGroup.prototype.getFirstNull = function()
{
	var i = 0;
	var l = this.members.length;
	while(i < l)
	{
		if(this.members[i] === undefined)
			return i;
		else
			i++;
	}
	return -1;
};

/**
 * Call this function to retrieve the first object with exists == true in the group.
 * This is handy for checking if everything's wiped out, or choosing a squad leader, etc.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as existing.
 */
Flixel.FlxGroup.prototype.getFirstExtant = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists)
			return basic;
	}
	return null;
};

/**
 * Call this function to retrieve the first object with dead == false in the group.
 * This is handy for checking if everything's wiped out, or choosing a squad leader, etc.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as not dead.
 */
Flixel.FlxGroup.prototype.getFirstAlive = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists && basic.alive)
			return basic;
	}
	return null;
};

/**
 * Call this function to retrieve the first object with dead == true in the group.
 * This is handy for checking if everything's wiped out, or choosing a squad leader, etc.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as dead.
 */
Flixel.FlxGroup.prototype.getFirstDead = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && !basic.alive)
			return basic;
	}
	return null;
};

/**
 * Call this function to find out how many members of the group are not dead.
 * 
 * @return	The number of <code>FlxBasic</code>s flagged as not dead.  Returns -1 if group is empty.
 */
Flixel.FlxGroup.prototype.countLiving = function()
{
	var count = -1;
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(count < 0)
				count = 0;
			if(basic.exists && basic.alive)
				count++;
		}
	}
	return count;
};

/**
 * Call this function to find out how many members of the group are dead.
 * 
 * @return	The number of <code>FlxBasic</code>s flagged as dead.  Returns -1 if group is empty.
 */
Flixel.FlxGroup.prototype.countDead = function()
{
	var count = -1;
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(count < 0)
				count = 0;
			if(!basic.alive)
				count++;
		}
	}
	return count;
};

/**
 * Returns a member at random from the group.
 * 
 * @param	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
 * @param	Length		Optional restriction on the number of values you want to randomly select from.
 * 
 * @return	A <code>FlxBasic</code> from the members list.
 */
Flixel.FlxGroup.prototype.getRandom = function(StartIndex, Length)
{
	if(Length === 0 || !Length)
		Length = this.length;
	return Flixel.FlxG.getRandom(this.members, StartIndex, Length);
};

/**
 * Remove all instances of <code>FlxBasic</code> subclass (FlxSprite, FlxBlock, etc) from the list.
 * WARNING: does not destroy() or kill() any of these objects!
 */
Flixel.FlxGroup.prototype.clear = function()
{
	this.length = this.members.length = 0;
};

/**
 * Calls kill on the group's members and then on the group itself.
 */
Flixel.FlxGroup.prototype.kill = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists)
			basic.kill();
	}

	Flixel.FlxGroup.parent.kill.apply(this);
};

/**
 * Returns the members.length of the group.
 * 
 * @return The members.length of the group.
 */
Flixel.FlxGroup.prototype.size = function()
{
	return this.length;
};

/**
 * Helper function for the sort process.
 * 
 * @param	Obj1	The first object being sorted.
 * @param	Obj2	The second object being sorted.
 * 
 * @return	An integer value: -1 (Obj1 before Obj2), 0 (same), or 1 (Obj1 after Obj2).
 */
Flixel.FlxGroup.prototype.sortHandler = function(Obj1, Obj2)
{
	if (this._sortCheckIndexExistence === true)
	{
		// If the sorting property is missing, place the object at the end of the list.
		if(!Obj1 || !(this._sortIndex in Obj1))
			return 1;
		else if(!Obj2 || !(this._sortIndex in Obj2))
			return -1;
	}
	if(Obj1[this._sortIndex] < Obj2[this._sortIndex])
		return this._sortOrder;
	else if(Obj1[this._sortIndex] > Obj2[this._sortIndex])
		return -this._sortOrder;
	return 0;
};

/**
 * Returns the class name.
 */
Flixel.FlxGroup.prototype.toString = function()
{
	return "FlxGroup";
};
/**
 * This is the basic game "state" object - e.g. in a simple game<br>
 * you might have a menu state and a play state.<br>
 * It is for all intents and purpose a fancy FlxGroup.<br>
 * And really, it's not even that fancy.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Internal constructor, shoudn't be called.
 */
Flixel.FlxState = function()
{
	Flixel.FlxState.parent.constructor.apply(this);
};
extend(Flixel.FlxState, Flixel.FlxGroup);

/**
 * If the state is saved or not in the stack.
 */
Flixel.FlxState.saveState = true;

/**
 * This function is called after the game engine successfully switches states. Override this function, NOT the constructor, to initialize or set up your game state. We do NOT recommend overriding the
 * constructor, unless you want some crazy unpredictable things to happen!
 */
Flixel.FlxState.prototype.create = function()
{
};

/**
 * Override this function to do special pre-processing FX like motion blur. You can use scaling or blending modes or whatever you want against <code>FlxState.screen</code> to achieve all sorts of
 * cool FX.
 */
Flixel.FlxState.prototype.preProcess = function()
{
	// Nothing to pre-process initially.
};

/**
 * This function collides <code>defaultGroup</code> against <code>defaultGroup</code> (basically everything you added to this state).
 */
Flixel.FlxState.prototype.collide = function()
{
	Flixel.FlxG.collide(this);
};

/**
 * Override this function to do special post-processing FX like light bloom. You can use scaling or blending modes or whatever you want against <code>FlxState.screen</code> to achieve all sorts of
 * cool FX.
 */
Flixel.FlxState.prototype.postProcess = function()
{
	// Nothing to post process initially
};

/**
 * Returns the class name.
 */
Flixel.FlxState.prototype.toString = function()
{
	return "FlxState";
};
/**
 * FlxGame is the heart of all flixel games, and contains a bunch of basic game loops and things.
 * It is a long and sloppy file that you shouldn't have to worry about too much!
 * It is basically only used to create your game object in the first place,
 * after that FlxG and FlxState have all the useful stuff you actually need.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new game object.
 * 
 * @param CanvasId
 *            The HTML canvas id.
 * @param Loader
 *            An instance of the Loader object.
 * @param GameSizeX
 *            The width of your game in game pixels, not necessarily final
 *            display pixels (see Zoom).
 * @param GameSizeY
 *            The height of your game in game pixels, not necessarily final
 *            display pixels (see Zoom).
 * @param InitialStat
 *            The class name of the state you want to create and switch to first
 *            (e.g. MenuState).
 * @param Zoom
 *            The default level of zoom for the game's cameras (e.g. 2 = all
 *            pixels are now drawn at 2x). Default = 1.
 * @param GameFramerate
 *            How frequently the game should update (default is 60 times per
 *            second).
 * @param FlashFramerate
 *            Sets the actual display framerate for Flash player (default is 30
 *            times per second).
 * @param UseSystemCursor
 *            Whether to use the default OS mouse pointer, or to use custom
 *            flixel ones.
 */
Flixel.FlxGame = function(CanvasId, Loader, GameSizeX, GameSizeY, InitialState, Zoom, GameFramerate, FlashFramerate, UseSystemCursor, ScaleMode)
{
	if (InitialState === undefined || InitialState === null)
		throw new Error("Empty state");

	if (CanvasId === undefined || CanvasId === null)
		throw new Error("Empty canvas");

	if (Loader === undefined || Loader === null)
		throw new Error("Empty loader");

	this.cZoom = Zoom || 1;
	this.cGameFramerate = GameFramerate || 60;
	this.cFlashFramerate = FlashFramerate || 30;
	this.cUseSystemCursor = (UseSystemCursor === undefined) ? true : UseSystemCursor;
	this.cScaleMode = ScaleMode || Flixel.FlxCamera.NO_SCALE;
	this.cGameSizeX = GameSizeX;
	this.cGameSizeY = GameSizeY;
	this.cInitialState = InitialState;
	this.cCanvasId = CanvasId;
	this.cLoader = Loader;

	var _this = this;
	this._onBoot = function()
	{
		_this.boot();
	};

	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		window.setTimeout(this._onBoot, 0);
	} else {
		document.addEventListener('DOMContentLoaded', this._onBoot, false);
		window.addEventListener('load', this._onBoot, false);
	}
};

// Constructor stuff
/**
 * The game canvas id.
 */
Flixel.FlxGame.prototype.cCanvasId = null;
/**
 * The game resource loader.
 */
Flixel.FlxGame.prototype.cLoader = null;
/**
 * The game size X.
 */
Flixel.FlxGame.prototype.cGameSizeX = 0;
/**
 * The game size Y.
 */
Flixel.FlxGame.prototype.cGameSizeY = 0;
/**
 * The game initial state.
 */
Flixel.FlxGame.prototype.cInitialState = null;
/**
 * The game zoom.
 */
Flixel.FlxGame.prototype.cZoom = 0;
/**
 * The game frame rate.
 */
Flixel.FlxGame.prototype.cGameFramerate = 0;
/**
 * The game flash frame rate.
 */
Flixel.FlxGame.prototype.cFlashFramerate = 0;
/**
 * The game uses the system cursor.
 */
Flixel.FlxGame.prototype.cUseSystemCursor = false;
/**
 * The game scale mode.
 */
Flixel.FlxGame.prototype.cScaleMode = 0;

// Normal stuff
/**
 * If we are going to use the spasl screen or not.
 */
Flixel.FlxGame.useSplashScreen = true;
/**
 * The game canvas element.
 */
Flixel.FlxGame.prototype.stage = null;
/**
 * The game resource loader.
 */
Flixel.FlxGame.prototype.loader = null;
/**
 * The setInterval value for loading stuff.
 */
Flixel.FlxGame.prototype.loadingInterval = 0;
/**
 * Sets 0, -, and + to control the global volume sound volume.
 * 
 * @default true
 */
Flixel.FlxGame.prototype.useSoundHotKeys = false;
/**
 * Tells flixel to use the default system mouse cursor instead of custom Flixel
 * mouse cursors.
 * 
 * @default false
 */
Flixel.FlxGame.prototype.useSystemCursor = false;
/**
 * Initialize and allow the flixel debugger overlay even in release mode. Also
 * useful if you don't use FlxPreloader!
 * 
 * @default false
 */
Flixel.FlxGame.prototype.forceDebugger = false;
/**
 * Current game state.
 */
Flixel.FlxGame.prototype._state = null;
/**
 * Mouse cursor.
 */
Flixel.FlxGame.prototype._mouse = null;
/**
 * Class type of the initial/first game state for the game, usually MenuState or
 * something like that.
 */
Flixel.FlxGame.prototype._iState = null;
/**
 * Whether the game object's basic initialization has finished yet.
 */
Flixel.FlxGame.prototype._created = false;
/**
 * Total number of milliseconds elapsed since game start.
 */
Flixel.FlxGame.prototype._total = 0;
/**
 * Total number of milliseconds elapsed since last update loop. Counts down as
 * we step through the game loop.
 */
Flixel.FlxGame.prototype._accumulator = 0;
/**
 * Whether the Flash player lost focus.
 */
Flixel.FlxGame.prototype._lostFocus = false;
/**
 * Milliseconds of time per step of the game loop. event.g. 60 fps = 16ms.
 */
Flixel.FlxGame.prototype._step = 0;
/**
 * Framerate of the Flash player (NOT the game loop). Default = 30.
 */
Flixel.FlxGame.prototype._flashFramerate = 0;
/**
 * Max allowable accumulation (see _accumulator). Should always (and
 * automatically) be set to roughly 2x the flash player framerate.
 */
Flixel.FlxGame.prototype._maxAccumulation = 0;
/**
 * If a state change was requested, the new state object is stored here until we
 * switch to it.
 */
Flixel.FlxGame.prototype._requestedState = null;
/**
 * A flag for keeping track of whether a game reset was requested or not.
 */
Flixel.FlxGame.prototype._requestedReset = false;
/**
 * The "focus lost" screen (see <code>createFocusScreen()</code>).
 */
Flixel.FlxGame.prototype._focus = null;
/**
 * The sound tray display container (see <code>createSoundTray()</code>).
 */
Flixel.FlxGame.prototype._soundTray = null;
/**
 * Helps us auto-hide the sound tray after a volume change.
 */
Flixel.FlxGame.prototype._soundTrayTimer = 0;
/**
 * Helps display the volume bars on the sound tray.
 */
Flixel.FlxGame.prototype._soundTrayBars = null;
/**
 * The debugger overlay object.
 */
Flixel.FlxGame.prototype._debugger = null;
/**
 * A handy boolean that keeps track of whether the debugger exists and is
 * currently visible.
 */
Flixel.FlxGame.prototype._debuggerUp = false;
/**
 * Container for a game replay object.
 */
Flixel.FlxGame.prototype._replay = null;
/**
 * Flag for whether a playback of a recording was requested.
 */
Flixel.FlxGame.prototype._replayRequested = false;
/**
 * Flag for whether a new recording was requested.
 */
Flixel.FlxGame.prototype._recordingRequested = false;
/**
 * Flag for whether a replay is currently playing.
 */
Flixel.FlxGame.prototype._replaying = false;
/**
 * Flag for whether a new recording is being made.
 */
Flixel.FlxGame.prototype._recording = false;
/**
 * Array that keeps track of keypresses that can cancel a replay. Handy for
 * skipping cutscenes or getting out of attract modes!
 */
Flixel.FlxGame.prototype._replayCancelKeys = null;
/**
 * Helps time out a replay if necessary.
 */
Flixel.FlxGame.prototype._replayTimer = 0;
/**
 * This function, if set, is triggered when the callback stops playing.
 */
Flixel.FlxGame.prototype._replayCallback = null;
/**
 * The pause state.
 */
Flixel.FlxGame.prototype._pause = null;
/**
 * If we have booted the game.
 */
Flixel.FlxGame.prototype.isBooted = false;
/**
 * The wrong orientation sprite.<br>
 * You can define it using the scale manager (Flixel.FlxG.scaleManager).
 */
Flixel.FlxGame.prototype.orientationSprite = null;

/**
 * The boot function.
 */
Flixel.FlxGame.prototype.boot = function()
{
	if (this.isBooted) {
		return;
	}

	// Check if we have a body
	if (!document.body) {
		window.setTimeout(this._onBoot, 20); // Delay the boot
	} else {
		document.removeEventListener('DOMContentLoaded', this._onBoot);
		window.removeEventListener('load', this._onBoot);

		// Run the device tests
		Flixel.FlxG.device = new Device();

		// Super high priority init stuff (focus, mouse, etc)
		this._lostFocus = false;
		this._focus = new BitmapData();
		this._focus.visible = false;
		this._soundTray = new BitmapData();
		this._mouse = new BitmapData();
		this.isBooted = true;
		this.loader = this.cLoader;
		Flixel.FlxG.loaderCache = new Cache(); // Initialize the loader cache

		// Initialize the sound manager
		Flixel.FlxG.soundManager = new SoundManager();
		Flixel.FlxG.soundManager.boot();

		// Basic display and update setup stuff
		this.stage = document.getElementById(this.cCanvasId);
		if (this.stage !== null) {
			Flixel.FlxG.screenWidth = this.stage.width;
			Flixel.FlxG.screenHeight = this.stage.height;
		}

		// Prepare the canvas stuff
		this.stage.style.display = 'block';
		this.stage.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
		this.stage.style.msTouchAction = 'none';
		this.stage.style['ms-touch-action'] = 'none';
		this.stage.style['-ms-touch-action'] = 'none';
		this.stage.style['-ms-content-zooming'] = 'none';
		this.stage.style['touch-action'] = 'none';
		this.stage.style['-webkit-touch-callout'] = 'none';
		this.stage.style['-webkit-user-select'] = 'none';
		this.stage.style['-khtml-user-select'] = 'none';
		this.stage.style['-moz-user-select'] = 'none';
		this.stage.style['-ms-user-select'] = 'none';
		this.stage.style['user-select'] = 'none';
		this.stage.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

		// Initialize FlxG stuff
		Flixel.FlxG.init(this, this.cGameSizeX, this.cGameSizeY, this.cZoom, this.cScaleMode);
		Flixel.FlxG.setFramerate(this.cGameFramerate);
		Flixel.FlxG.setFlashFramerate(this.cFlashFramerate);

		// Basic stuff
		this._accumulator = this._step;
		this._total = 0;
		this._state = null;
		this.useSoundHotKeys = true;
		this.useSystemCursor = this.cUseSystemCursor;
		// if (!this.useSystemCursor)
		// flash.ui.Mouse.hide();
		this.forceDebugger = false;
		this._debuggerUp = false;

		// Replay data
		this._replay = new Flixel.system.FlxReplay();
		this._replayRequested = false;
		this._recordingRequested = false;
		this._replaying = false;
		this._recording = false;

		// then get ready to create the game object for real
		if (Flixel.FlxGame.useSplashScreen) {
			this._iState = new Flixel.plugin.FlxSplashScreen();
			Flixel.plugin.FlxSplashScreen.initialGameState = this.cInitialState;
		} else {
			this._iState = this.cInitialState;
		}
		this._requestedState = null;
		this._requestedReset = true;
		this._created = false;

		this.create(); // Call the create method (We simulate here the 1st
						// frame)
	}
};

/**
 * Makes the little volume tray slide out.
 * 
 * @param Silent
 *            Whether or not it should beep.
 */
Flixel.FlxGame.prototype.showSoundTray = function(Silent)
{
	Silent = Silent || false;

//	if (!Silent)
//		Flixel.FlxG.play(SndBeep);

	this._soundTrayTimer = 1;
	this._soundTray.y = 0;
	this._soundTray.visible = true;
	var globalVolume = int(Flixel.FlxG.getMusicVolume() * 10);
	if (Flixel.FlxG.getMute())
		globalVolume = 0;

	for (var i = 0; i < this._soundTrayBars.length; i++) {
		if (i < globalVolume)
			this._soundTrayBars[i].alpha = 1;
		else
			this._soundTrayBars[i].alpha = 0.5;
	}
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Keyboard event.
 */
Flixel.FlxGame.prototype.handleKeyUp = function(event)
{
	if (this._debuggerUp && this._debugger.watch.editing)
		return;
	if (!Flixel.FlxG.mobile) {
		if ((this._debugger !== null) && ((event.keyCode == 222 /* Keyboard.BACKQUOTE */) || (event.keyCode == 220 /* Keyboard.BACKSLASH */) || (event.keyCode == 119 /* Keyboard.F8 */))) {
			this._debugger.visible = !this._debugger.visible;
			this._debuggerUp = this._debugger.visible;
			// if (this._debugger.visible)
			// flash.ui.Mouse.show();
			// else if (!this.useSystemCursor)
			// flash.ui.Mouse.hide();
			// _console.toggle();
			return;
		}
		if (this.useSoundHotKeys) {
			var c = event.keyCode;
			// var code = String.fromCharCode(event.charCode);
			switch (c) {
				case 48 /* Keyboard.NUMBER_0* */:
				case 96 /* Keyboard.NUMPAD_0 */:
					Flixel.FlxG.setMute(!Flixel.FlxG.getMute());
					Flixel.FlxG.onChange(Flixel.FlxG.getMute() ? 0 : Flixel.FlxG.getMusicVolume(),
							Flixel.FlxSound.ALL);
					this.showSoundTray();
					return;
				case 109 /* Keyboard.NUMPAD_SUBTRACT */:
				case 173 /* Keyboard.MINUS */:
					Flixel.FlxG.setMute(false);
					Flixel.FlxG.setMusicVolume(Flixel.FlxG.getMusicVolume() - 0.1);
					this.showSoundTray();
					return;
				case 171 /* Keyboard.NUMPAD_ADD */:
				case 107 /* Keyboard.EQUAL */:
					Flixel.FlxG.setMute(false);
					Flixel.FlxG.setMusicVolume(Flixel.FlxG.getMusicVolume() + 0.1);
					this.showSoundTray();
					return;
				default:
					break;
			}
		}
	}

	if (this._replaying)
		return;

	event.stopPropagation();
	event.preventDefault();

	Flixel.FlxG.keys.handleKeyUp(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Keyboard event.
 */
Flixel.FlxGame.prototype.handleKeyDown = function(event)
{
	if (this._debuggerUp && this._debugger.watch.editing)
		return;

	var c = event.keyCode;
	// var code = String.fromCharCode(event.charCode);
	// Handle pause game keys
	if ((/* c == Keyboard.MENU || */c == 112 /* Keyboard.F1 */|| c == 27 /* Keyboard.ESCAPE */) && !Flixel.FlxG.getDisablePause()) {
		if (!Flixel.FlxG.getPause())
			this.onFocusLost();
		else
			this.onFocus();
	}

	// Handle Android back key
	// TODO: Fix or remove
	// if(KeyCode == Keys.BACK)
	// {
	// // Check in case of fast touch
	// if(FlxG.stateStack !== null) {
	// // Check the stack of states first to prevent infinite loops
	// if(FlxG.stateStack.size() === 0)
	// FlxG.stateStack.setBackKeyMode(FlxStateStack.NORMAL);
	//
	// Make the correct action
	// if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.NORMAL) {
	// Gdx.app.exit();
	// } else if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.DIRECT_BACK)
	// {
	// if(FlxG.getPause())
	// FlxG.setPause(false);
	// FlxG.previousGameState();
	// } else if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.DISABLED) {
	// Do nothing
	// } else if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.PAUSE_GAME) {
	// FlxG.setPause(!FlxG.getPause());
	// FlxG.stateStack.setBackKeyMode(FlxStateStack.DIRECT_BACK);
	// }
	// }
	// }

	if (this._replaying && (this._replayCancelKeys !== null) && (this._debugger === null) && (event.keyCode != 222 /* Keyboard.BACKQUOTE */) && (event.keyCode != 220 /* Keyboard.BACKSLASH */)) {
		// var cancel = false;
		var replayCancelKey;
		var i = 0;
		var l = this._replayCancelKeys.length;
		while (i < l) {
			replayCancelKey = this._replayCancelKeys[i++];
			if ((replayCancelKey == "ANY") || (Flixel.FlxG.keys.getKeyCode(replayCancelKey) == event.keyCode)) {
				if (this._replayCallback !== null) {
					this._replayCallback.callback();
					this._replayCallback = null;
				} else
					Flixel.FlxG.stopReplay();
				break;
			}
		}
		return;
	}

	event.stopPropagation();
	event.preventDefault();

	Flixel.FlxG.keys.handleKeyDown(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseDown = function(event)
{
	if (this._debuggerUp) {
		if (this._debugger.hasMouse)
			return;
		if (this._debugger.watch.editing)
			this._debugger.watch.submit();
	}

	if (this._replaying && (this._replayCancelKeys !== null)) {
		var replayCancelKey;
		var i = 0;
		var l = this._replayCancelKeys.length;

		while (i < l) {
			replayCancelKey = this._replayCancelKeys[i++];
			if ((replayCancelKey == "MOUSE") || (replayCancelKey == "ANY")) {
				if (this._replayCallback !== null) {
					this._replayCallback.callback();
					this._replayCallback = null;
				} else
					Flixel.FlxG.stopReplay();
				break;
			}
		}
		return;
	}

	event.preventDefault();
	Flixel.FlxG.mouse.handleMouseDown(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseUp = function(event)
{
	if ((this._debuggerUp && this._debugger.hasMouse) || this._replaying)
		return;

	event.preventDefault();
	Flixel.FlxG.mouse.handleMouseUp(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseWheel = function(event)
{
	if ((this._debuggerUp && this._debugger.hasMouse) || this._replaying)
		return;

	event.preventDefault();
	Flixel.FlxG.mouse.handleMouseWheel(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseMove = function(event)
{
	if ((this._debuggerUp && this._debugger.hasMouse) || this._replaying)
		return;
	Flixel.FlxG.mouse.handleMouseMove(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Focus event.
 */
Flixel.FlxGame.prototype.onFocus = function(event)
{
	// if (!this._debuggerUp && !this.useSystemCursor)
	// flash.ui.Mouse.hide();
	Flixel.FlxG.resetInput();

	if (this._focus !== null)
		this._lostFocus = this._focus.visible = false;
	// NOT NEEDED: this.stage.frameRate = this._flashFramerate;
	Flixel.FlxG.setPause(false);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Focus lost event.
 */
Flixel.FlxGame.prototype.onFocusLost = function(event)
{
	if ((this.x !== 0) || (this.y !== 0)) {
		this.x = 0;
		this.y = 0;
	}
	// flash.ui.Mouse.show();
	if (this._focus !== null)
		this._lostFocus = this._focus.visible = true;

	// NOT NEEDED: stage.frameRate = 10;
	Flixel.FlxG.setPause(true);
};

/**
 * Handles the onEnterFrameLoading call and figures out how many updates and
 * draw calls to do.
 */
Flixel.FlxGame.prototype.onEnterFrameLoading = function()
{
	var percentage = this.loader.getPercentage();
	var barHeight = 20;
	var barWidth = 100;

	// Calculate the progress
	var progress = Math.floor((percentage / 100) * barWidth);

	// Clear the screen
	var ctx = this.stage.getContext("2d");
	ctx.clearRect(0, 0, Flixel.FlxG.width, Flixel.FlxG.height);
	ctx.fillStyle = "#202020";
	ctx.fillRect(0, 0, Flixel.FlxG.width, Flixel.FlxG.height);

	// Draw the progress bar
	ctx.fillStyle = "black";
	ctx.fillRect((Flixel.FlxG.width / 2) - (barWidth / 2), (Flixel.FlxG.height / 2) - (barHeight / 2), barWidth,
			barHeight);
	ctx.fillStyle = "#55aa00";
	ctx.fillRect((Flixel.FlxG.width / 2) - (barWidth / 2), (Flixel.FlxG.height / 2) - (barHeight / 2), progress,
			barHeight);

	// Draw the loading text
	ctx.font = "40px sans-serif";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Loading...", (Flixel.FlxG.width / 2) - (ctx.measureText("Loading...").width / 2),
			Flixel.FlxG.height - 60);
};

/**
 * Handles the onEnterFrame call and figures out how many updates and draw calls
 * to do.
 */
Flixel.FlxGame.prototype.onEnterFrame = function()
{
	var mark = getTimer();
	var elapsedMS = mark - this._total;
	this._total = mark;

	this.updateSoundTray(elapsedMS);

	if (!this._lostFocus) {
		if ((this._debugger !== null) && this._debugger.vcr.paused) {
			if (this._debugger.vcr.stepRequested) {
				this._debugger.vcr.stepRequested = false;
				this.step();
			}
		} else {
			this._accumulator += elapsedMS;
			if (this._accumulator > this._maxAccumulation)
				this._accumulator = this._maxAccumulation;
			while (this._accumulator >= this._step) {
				this.step();
				this._accumulator = this._accumulator - this._step;
			}
		}

		Flixel.FlxBasic.VISIBLECOUNT = 0;
		this.draw();

		if (this._debuggerUp) {
			this._debugger.perf.flash(elapsedMS);
			this._debugger.perf.visibleObjects(Flixel.FlxBasic.VISIBLECOUNT);
			this._debugger.perf.update();
			this._debugger.watch.update();
		}
	} else if (this._pause.visible && Flixel.FlxG.getPause()) {
		Flixel.FlxBasic.VISIBLECOUNT = 0;
		this.draw();
	}
};

/**
 * If there is a state change requested during the update loop, this function
 * handles actual destroying the old state and related processes, and calls
 * creates on the new state and plugs it into the game object.
 */
Flixel.FlxGame.prototype.switchState = function()
{
	// Basic reset stuff
	Flixel.FlxG.resetCameras();
	Flixel.FlxG.resetInput();
	Flixel.FlxG.destroySounds();
	Flixel.FlxG.clearBitmapCache();

	// Clear the debugger overlay's Watch window
	if (this._debugger !== null)
		this._debugger.watch.removeAll();

	// Clear any timers left in the timer manager
	var timerManager = Flixel.plugin.FlxTimer.getManager();
	if (timerManager !== null)
		timerManager.clear();

	// Destroy the old state (if there is an old state)
	if (this._state !== null) {
		this._state.destroy();
		this._pause.secureClear();
		this._state = null;
	}

	// Finally assign and create the new state
	this._state = this._requestedState;
	this._state.create();
};

/**
 * This is the main game update logic section. The onEnterFrame() handler is in
 * charge of calling this the appropriate number of times each frame. This block
 * handles state changes, replays, all that good stuff.
 */
Flixel.FlxGame.prototype.step = function()
{
	// Handle game reset request
	if (this._requestedReset) {
		this._requestedReset = false;
		this._requestedState = new this._iState.constructor();
		this._replayTimer = 0;
		this._replayCancelKeys = null;
		Flixel.FlxG.reset();
	}

	// Handle replay-related requests
	if (this._recordingRequested) {
		this._recordingRequested = false;
		this._replay.create(Flixel.FlxG.globalSeed);
		this._recording = true;
		if (this._debugger !== null) {
			this._debugger.vcr.recording();
			Flixel.FlxG.log("Flixel: starting new flixel gameplay record.");
		}
	} else if (this._replayRequested) {
		this._replayRequested = false;
		this._replay.rewind();
		Flixel.FlxG.globalSeed = this._replay.seed;
		if (this._debugger !== null)
			this._debugger.vcr.playing();
		this._replaying = true;
	}

	// Handle state switching requests
	if (this._state != this._requestedState)
		this.switchState();

	// Finally actually step through the game physics
	Flixel.FlxBasic.ACTIVECOUNT = 0;
	if (this._replaying) {
		this._replay.playNextFrame();

		if (this._replayTimer > 0) {
			this._replayTimer -= this._step;
			if (this._replayTimer <= 0) {
				if (this._replayCallback !== null) {
					this._replayCallback.callback();
					this._replayCallback = null;
				} else
					Flixel.FlxG.stopReplay();
			}
		}

		if (this._replaying && this._replay.finished) {
			Flixel.FlxG.stopReplay();
			if (this._replayCallback !== null) {
				this._replayCallback.callback();
				this._replayCallback = null;
			}
		}

		if (this._debugger !== null)
			this._debugger.vcr.updateRuntime(this._step);
	} else
		Flixel.FlxG.updateInput();

	if (this._recording) {
		this._replay.recordFrame();
		if (this._debugger !== null)
			this._debugger.vcr.updateRuntime(this._step);
	}

	this.update();
	Flixel.FlxG.mouse.wheel = 0;
	if (this._debuggerUp)
		this._debugger.perf.activeObjects(Flixel.FlxBasic.ACTIVECOUNT);
};

/**
 * This function just updates the soundtray object.
 */
Flixel.FlxGame.prototype.updateSoundTray = function(MS)
{
	// Animate stupid sound tray thing

	if (this._soundTray !== null) {
		if (this._soundTrayTimer > 0)
			this._soundTrayTimer -= MS / 1000;
		else if (this._soundTray.y > -this._soundTray.height) {
			this._soundTray.y -= (MS / 1000) * Flixel.FlxG.height * 2;
			if (this._soundTray.y <= -this._soundTray.height) {
				this._soundTray.visible = false;

				// Save sound preferences
				var soundPrefs = new Flixel.FlxSave();
				if (soundPrefs.bind("Flixel")) {
					if (soundPrefs.data.sound === null)
						soundPrefs.data.sound = {};
					soundPrefs.data.sound.mute = Flixel.FlxG.getMute();
					soundPrefs.data.sound.musicVolume = Flixel.FlxG.getMusicVolume();
					soundPrefs.data.sound.soundVolume = Flixel.FlxG.getSoundVolume();
					soundPrefs.close();
				}
			}
		}
	}
};

/**
 * This function is called by step() and updates the actual game state. May be
 * called multiple times per "frame" or draw call.
 */
Flixel.FlxGame.prototype.update = function()
{
	var mark = getTimer();
	Flixel.FlxG.elapsed = Flixel.FlxG.timeScale * (this._step / 1000);

	// Update the pause stuff if needed
	if (Flixel.FlxG.getPause()) {
		this._pause.update();
		return;
	}

	// Update the wrong orientation stuff if needed
	if(this.orientationSprite && this.orientationSprite.visible === true) {
		this.orientationSprite.update();
		return;
	}

	Flixel.FlxG.updateSounds();
	this._state.preProcess(); // Execute the pre-process stuff
	Flixel.FlxG.updatePlugins();
	this._state.update();
	Flixel.FlxG.updateCameras();

	// TODO: temporary key for turning on debug, delete when FlxDebugger
	// complete
	if (Flixel.FlxG.keys.justPressed("F2") && (Flixel.FlxG.debug || this.forceDebugger))
		Flixel.FlxG.visualDebug = !Flixel.FlxG.visualDebug;

	if (this._debuggerUp)
		this._debugger.perf.flixelUpdate(getTimer() - mark);

	this._state.postProcess(); // Execute the post process stuff.
};

/**
 * Goes through the game state and draws all the game objects and special
 * effects.
 */
Flixel.FlxGame.prototype.draw = function()
{
	if (Flixel.FlxG.getPause() && Flixel.FlxG.debug)
		return;

	var mark = getTimer();
	var i = 0;
	var l = Flixel.FlxG.displayList.length;

	// getContext 2d
	var ctx = this.stage.getContext("2d");
	ctx.clearRect(0, 0, Flixel.FlxG.width, Flixel.FlxG.height);

	while (i < l) {
		Flixel.FlxG.activeCamera = Flixel.FlxG.displayList[i++];

		Flixel.FlxG.lockCameras();
		this._state.draw();

		// Draw the pause menu
		if (Flixel.FlxG.getPause() && this._pause.size() > 0) {
			this._pause.draw();
		}
		
		// Draw the wrong orientation stuff
		if(this.orientationSprite && this.orientationSprite.visible === true)
			this.orientationSprite.draw();

		Flixel.FlxG.unlockCameras();

		Flixel.FlxG.drawPlugins();

		// ctx.drawImage(img, imgStartX, imgStartY,
		// imageWidth, imageHeight,
		// targetX, targetY,
		// finalWidth, finalHeight);

		ctx.drawImage(Flixel.FlxG.activeCamera.buffer._canvas, 0, 0, Flixel.FlxG.activeCamera.width,
				Flixel.FlxG.activeCamera.height, Flixel.FlxG.activeCamera.x, Flixel.FlxG.activeCamera.y,
				Flixel.FlxG.activeCamera.width, Flixel.FlxG.activeCamera.height);
	}

	if (this._debuggerUp)
		this._debugger.perf.flixelDraw(getTimer() - mark);
};

/**
 * Used to instantiate the guts of the flixel game object once we have a valid
 * reference to the root.
 * 
 * @param event
 *            Just a Flash system event, not too important for our purposes.
 */
Flixel.FlxGame.prototype.create = function()
{
	this._total = getTimer();

	// Calculate the canvas offset
	CanvasManager.getOffset(this.stage, Flixel.FlxG.mouse.offset);

	// Add basic input event listeners and mouse container
	window.addEventListener("mousedown", this.handleMouseDown.bind(this), true);
	window.addEventListener("mouseup", this.handleMouseUp.bind(this), true);
	window.addEventListener("mousemove", this.handleMouseMove.bind(this), true);

	window.addEventListener("mousewheel", this.handleMouseWheel.bind(this), true);
	window.addEventListener("DOMMouseScroll", this.handleMouseWheel.bind(this), true);

	window.addEventListener("keydown", this.handleKeyDown.bind(this), false);
	window.addEventListener("keyup", this.handleKeyUp.bind(this), false);

	// Focus gained/lost monitoring
	window.addEventListener("blur", this.onFocusLost.bind(this), false);
	window.addEventListener("focus", this.onFocus.bind(this), false);

	this.createFocusScreen();

	// Set up mouse basics
	this.mouseX = -1;
	this.mouseY = -1;

	// Let mobile devs opt out of unnecessary overlays.
	if (Flixel.FlxG.mobile) {
		// Normal people pointers ._.
		window.addEventListener('touchstart', this.handleMouseDown.bind(this), true);
		window.addEventListener('touchend', this.handleMouseUp.bind(this), true);
		window.addEventListener('touchmove', this.handleMouseMove.bind(this), true);

		// Stupid Microsoft pointers
		window.addEventListener('MSPointerMove', this.handleMouseMove.bind(this), true);
		window.addEventListener('MSPointerDown', this.handleMouseDown.bind(this), true);
		window.addEventListener('MSPointerUp', this.handleMouseUp.bind(this), true);

		// More Stupid Microsoft shit <.< Why change the name, why!?!?!?!
		window.addEventListener('pointerMove', this.handleMouseMove.bind(this), true);
		window.addEventListener('pointerDown', this.handleMouseDown.bind(this), true);
		window.addEventListener('pointerUp', this.handleMouseUp.bind(this), true);
	} else {
		// Debugger overlay
		if (Flixel.FlxG.debug || this.forceDebugger) {
//			this._debugger = new FlxDebugger(Flixel.FlxG.width * Flixel.FlxCamera.defaultZoom, Flixel.FlxG.height * Flixel.FlxCamera.defaultZoom);
//			addChild(this._debugger);
		}

		// Volume display tab
		this.createSoundTray();
	}

	this._pause = new Flixel.plugin.FlxPause(); // Initialize the pause
													// group

	// Finally, set up an event for the actual game loop stuff.
	// addEventListener(Event.ENTER_FRAME, onEnterFrame);

	// Framerate is in FPS, but setInterval wants milliseconds between frames
	// this.update.periodical(1000 * (1 / this.framerate), this);
	this.framerate = 60;
	var _this = this;
	this.loader.onAllLoaded = function()
	{
		clearInterval(_this.loadingInterval);
		setInterval(_this.onEnterFrame.bind(_this), 1000 * (1 / _this.framerate));
	};
	this.loadingInterval = setInterval(this.onEnterFrameLoading.bind(this), 1000 * (1 / this.framerate));
	this.loader.cache = Flixel.FlxG.loaderCache;
	this.loader.start();
};

/**
 * Sets up the "sound tray", the little volume meter that pops down sometimes.
 */
Flixel.FlxGame.prototype.createSoundTray = function()
{
	// TODO: Complete
	// _soundTray.visible = false;
	// _soundTray.scaleX = 2;
	// _soundTray.scaleY = 2;
	// var tmp:Bitmap = new Bitmap(new BitmapData(80,30,true,0x7F000000));
	// _soundTray.x =
	// (FlxG.width/2)*FlxCamera.defaultZoom-(tmp.width/2)*_soundTray.scaleX;
	// _soundTray.addChild(tmp);
	//	
	// var text:TextField = new TextField();
	// text.width = tmp.width;
	// text.height = tmp.height;
	// text.multiline = true;
	// text.wordWrap = true;
	// text.selectable = false;
	// text.embedFonts = true;
	// text.antiAliasType = AntiAliasType.NORMAL;
	// text.gridFitType = GridFitType.PIXEL;
	// text.defaultTextFormat = new
	// TextFormat("system",8,0xffffff,null,null,null,null,null,"center");;
	// _soundTray.addChild(text);
	// text.text = "VOLUME";
	// text.y = 16;
	//	
	// var bx:uint = 10;
	// var by:uint = 14;
	// _soundTrayBars = [];
	// var i:uint = 0;
	// while(i < 10)
	// {
	// tmp = new Bitmap(new BitmapData(4,++i,false,0xffffff));
	// tmp.x = bx;
	// tmp.y = by;
	// _soundTrayBars.push(_soundTray.addChild(tmp));
	// bx += 6;
	// by--;
	// }
	//	
	// _soundTray.y = -_soundTray.height;
	// _soundTray.visible = false;
	// addChild(_soundTray);
	//	
	// // load saved sound preferences for this game if they exist
	// var soundPrefs:FlxSave = new FlxSave();
	// if(soundPrefs.bind("Flixel") && (soundPrefs.data.sound !== null))
	// {
	// if(soundPrefs.data.sound.musicVolume !== null)
	// FlxG.setMusicVolume(soundPrefs.data.sound.musicVolume);
	// if(soundPrefs.data.sound.soundVolume !== null)
	// FlxG.setSoundVolume(soundPrefs.data.sound.soundVolume);
	// if(soundPrefs.data.sound.mute !== null)
	// FlxG.setMute(soundPrefs.data.sound.mute);
	// soundPrefs.destroy();
	// }
};

/**
 * Sets up the darkened overlay with the big white "play" button that appears
 * when a flixel game loses focus.
 */
Flixel.FlxGame.prototype.createFocusScreen = function()
{
	// TODO: Complete
	// var gfx:Graphics = _focus.graphics;
	// var screenWidth:uint = FlxG.width*FlxCamera.defaultZoom;
	// var screenHeight:uint = FlxG.height*FlxCamera.defaultZoom;
	//	
	// // draw transparent black backdrop
	// gfx.moveTo(0,0);
	// gfx.beginFill(0,0.5);
	// gfx.lineTo(screenWidth,0);
	// gfx.lineTo(screenWidth,screenHeight);
	// gfx.lineTo(0,screenHeight);
	// gfx.lineTo(0,0);
	// gfx.endFill();
	//	
	// // draw white arrow
	// var halfWidth:uint = screenWidth/2;
	// var halfHeight:uint = screenHeight/2;
	// var helper:uint = FlxU.min(halfWidth,halfHeight)/3;
	// gfx.moveTo(halfWidth-helper,halfHeight-helper);
	// gfx.beginFill(0xffffff,0.65);
	// gfx.lineTo(halfWidth+helper,halfHeight);
	// gfx.lineTo(halfWidth-helper,halfHeight+helper);
	// gfx.lineTo(halfWidth-helper,halfHeight-helper);
	// gfx.endFill();
	//	
	// var logo:Bitmap = new ImgLogo();
	// logo.scaleX = int(helper/10);
	// if(logo.scaleX < 1)
	// logo.scaleX = 1;
	// logo.scaleY = logo.scaleX;
	// logo.x -= logo.scaleX;
	// logo.alpha = 0.35;
	// _focus.addChild(logo);
	//
	// addChild(_focus);
};

/**
 * Returns the class name.
 */
Flixel.FlxGame.prototype.toString = function()
{
	return "FlxGame";
};
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
/**
 * A simple button class that calls a method when clicked by the mouse.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author	Adam Atomic
 */

/**
 * Creates a new <code>FlxButton</code> object with a gray background and a callback function on the UI thread.
 * 
 * @param X
 *            The X position of the button.
 * @param Y
 *            The Y position of the button.
 * @param Label
 *            The text that you want to appear on the button.
 * @param OnClick
 *            The function to call whenever the button is clicked.
 */
Flixel.FlxButton = function(X, Y, Label, OnClick)
{
	Flixel.FlxButton.parent.constructor.apply(this, [ X, Y ]);

	if (Label !== null) {
		this.label = new Flixel.FlxText(0, 0, 80, Label);
		this.label.setFormat(null, 10, 0x333333, "center");
		this.labelOffset = new Flixel.FlxPoint(-1, 3);
	}
	this.loadGraphic(Flixel.data.FlxSystemAsset.ImgDefaultButton, true, false, 80, 20);

	this.onUp = OnClick;
	this.onDown = null;
	this.onOut = null;
	this.onOver = null;

	this.soundOver = null;
	this.soundOut = null;
	this.soundDown = null;
	this.soundUp = null;

	this.status = Flixel.FlxButton.NORMAL;
	this._onToggle = false;
	this._pressed = false;
	this._initialized = false;
	this.changeAlpha = true;
	this.changeFrame = true;
};
extend(Flixel.FlxButton, Flixel.FlxSprite);

/**
 * Used with public variable <code>status</code>, means not highlighted or pressed.
 */
Flixel.FlxButton.NORMAL = 0;
/**
 * Used with public variable <code>status</code>, means highlighted (usually from mouse over).
 */
Flixel.FlxButton.HIGHLIGHT = 1;
/**
 * Used with public variable <code>status</code>, means pressed (usually from mouse click).
 */
Flixel.FlxButton.PRESSED = 2;
/**
 * The text that appears on the button.
 */
Flixel.FlxButton.prototype.label = null;
/**
 * Controls the offset (from top left) of the text from the button.
 */
Flixel.FlxButton.prototype.labelOffset = null;
/**
 * This function is called when the button is released. We recommend assigning your main button behavior to this function via the <code>FlxButton</code> constructor.
 */
Flixel.FlxButton.prototype.onUp = null;
/**
 * This function is called when the button is pressed down.
 */
Flixel.FlxButton.prototype.onDown = null;
/**
 * This function is called when the mouse goes over the button.
 */
Flixel.FlxButton.prototype.onOver = null;
/**
 * This function is called when the mouse leaves the button area.
 */
Flixel.FlxButton.prototype.onOut = null;
/**
 * Shows the current state of the button.
 */
Flixel.FlxButton.prototype.status = 0;
/**
 * Set this to play a sound when the mouse goes over the button. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundOver = null;
/**
 * Set this to play a sound when the mouse leaves the button. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundOut = null;
/**
 * Set this to play a sound when the button is pressed down. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundDown = null;
/**
 * Set this to play a sound when the button is released. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundUp = null;
/**
 * Used for checkbox-style behavior.
 */
Flixel.FlxButton.prototype._onToggle = false;
/**
 * Tracks whether or not the button is currently pressed.
 */
Flixel.FlxButton.prototype._pressed = false;
/**
 * Whether or not the button has initialized itself yet.
 */
Flixel.FlxButton.prototype._initialized = false;
/**
 * If we want to change the label alpha or not.
 */
Flixel.FlxButton.prototype.changeAlpha = false;
/**
 * IF we want to change the frame or not.
 */
Flixel.FlxButton.prototype.changeFrame = false;

/**
 * Called by the game state when state is changed (if this object belongs to the state)
 */
Flixel.FlxButton.prototype.destroy = function()
{
	if(Flixel.FlxG.mobile) {
		window.removeEventListener("touchend", this.handleMouseUp.bind(this));
		window.removeEventListener("MSPointerDown", this.handleMouseUp.bind(this));
		window.removeEventListener("pointerDown", this.handleMouseUp.bind(this));
	} else {
		window.removeEventListener("mouseup", this.handleMouseUp.bind(this));	
	}
	
	if (this.label !== null) {
		this.label.destroy();
		this.label = null;
	}

	this.onUp = null;
	this.onDown = null;
	this.onOut = null;
	this.onOver = null;

	if (this.soundOver !== null)
		this.soundOver.destroy();
	if (this.soundOut !== null)
		this.soundOut.destroy();
	if (this.soundDown !== null)
		this.soundDown.destroy();
	if (this.soundUp !== null)
		this.soundUp.destroy();

	Flixel.FlxButton.parent.destroy.apply(this);
};

/**
 * Since button uses its own mouse handler for thread reasons, we run a little pre-check here to make sure that we only add the mouse handler when it is actually safe to do so.
 */
Flixel.FlxButton.prototype.preUpdate = function()
{
	Flixel.FlxButton.parent.preUpdate.apply(this);

	if (!this._initialized) {
		if(Flixel.FlxG.mobile) {
			window.addEventListener("touchend", this.handleMouseUp.bind(this));
			window.addEventListener("MSPointerDown", this.handleMouseUp.bind(this));
			window.addEventListener("pointerDown", this.handleMouseUp.bind(this));
		} else {
			window.addEventListener("mouseup", this.handleMouseUp.bind(this));	
		}
		this._initialized = true;
	}
};

/**
 * Called by the game loop automatically, handles mouseover and click detection.
 */
Flixel.FlxButton.prototype.update = function()
{
	this.updateButton(); // Basic button logic

	// Default button appearance is to simply update
	// the label appearance based on animation frame.
	if (this.label === null || !this.changeAlpha)
		return;
	switch (this.getFrame()) {
		case Flixel.FlxButton.HIGHLIGHT: // Extra behavior to accomodate checkbox logic.
			this.label.setAlpha(1.0);
			break;
		case Flixel.FlxButton.PRESSED:
			this.label.setAlpha(0.5);
			this.label.y++;
			break;
		default:
		case Flixel.FlxButton.NORMAL:
			this.label.setAlpha(0.8);
			break;
	}
};

/**
 * Basic button update logic
 */
Flixel.FlxButton.prototype.updateButton = function()
{
	if (this.status == Flixel.FlxButton.PRESSED)
		this.status = Flixel.FlxButton.NORMAL;
	
	// Figure out if the button is highlighted or pressed or what
	// (ignore checkbox behavior for now).
	if (Flixel.FlxG.mouse.getVisible()) {
		if (this.cameras === null)
			this.cameras = Flixel.FlxG.cameras;
		var camera;
		var i = 0;
		var l = this.cameras.length;
		var pointerId = 0;		
		var	totalPointers = Flixel.FlxG.mouse.activePointers + 1;
		var offAll = true;

		while (i < l) {
			camera = this.cameras[i++];
			
			while(pointerId < totalPointers)
			{
				Flixel.FlxG.mouse.getWorldPosition(camera, this._point, pointerId);
				if(this.overlapsPoint(this._point, true, camera))
				{
					offAll = false;
					if(Flixel.FlxG.mouse.pressed(pointerId))
					{
						this.status = Flixel.FlxButton.PRESSED;
						if(Flixel.FlxG.mouse.justPressed(pointerId))
						{
							if(this.onDown !== null) {
								this.onDown.callback();
							}
							if(this.soundDown !== null)
								this.soundDown.play(true);
						}
					}
				
					if(this.status == Flixel.FlxButton.NORMAL)
					{
						this.status = Flixel.FlxButton.HIGHLIGHT;
						if(this.onOver !== null)
							this.onOver.callback();
						if(this.soundOver !== null)
							this.soundOver.play(true);
					}
				}
				++pointerId;
			}
		}
		if (offAll) {
			if (this.status != Flixel.FlxButton.NORMAL) {
				if (this.onOut !== null)
					this.onOut();
				if (this.soundOut !== null)
					this.soundOut.play(true);
			}
			this.status = Flixel.FlxButton.NORMAL;
		}
	}

	// Then if the label and/or the label offset exist,
	// position them to match the button.
	if (this.label !== null) {
		this.label.x = this.x;
		this.label.y = this.y;
	}
	if (this.labelOffset !== null) {
		this.label.x += this.labelOffset.x;
		this.label.y += this.labelOffset.y;
	}

	// Then pick the appropriate frame of animation
	if (this.changeFrame) {
		if ((this.status == Flixel.FlxButton.HIGHLIGHT) && (this._onToggle || Flixel.FlxG.mobile))
			this.setFrame(Flixel.FlxButton.NORMAL);
		else
			this.setFrame(this.status);
	}
};

/**
 * Just draws the button graphic and text label to the screen.
 */
Flixel.FlxButton.prototype.draw = function()
{
	Flixel.FlxButton.parent.draw.apply(this);

	if (this.label !== null) {
		this.label.scrollFactor = this.scrollFactor;
		this.label.cameras = this.cameras;
		this.label.draw();
	}
};

/**
 * Updates the size of the text field to match the button.
 */
Flixel.FlxButton.prototype.resetHelpers = function()
{
	Flixel.FlxButton.parent.resetHelpers.apply(this);

	if (this.label !== null) {
		this.label.width = this.width;
		this.label.dirty = true;
	}
};

/**
 * Set sounds to play during mouse-button interactions. These operations can be done manually as well, and the public sound variables can be used after this for more fine-tuning, such as positional
 * audio, etc.
 * 
 * @param SoundOver
 *            What embedded sound effect to play when the mouse goes over the button. Default is null, or no sound.
 * @param SoundOverVolume
 *            How load the that sound should be.
 * @param SoundOut
 *            What embedded sound effect to play when the mouse leaves the button area. Default is null, or no sound.
 * @param SoundOutVolume
 *            How load the that sound should be.
 * @param SoundDown
 *            What embedded sound effect to play when the mouse presses the button down. Default is null, or no sound.
 * @param SoundDownVolume
 *            How load the that sound should be.
 * @param SoundUp
 *            What embedded sound effect to play when the mouse releases the button. Default is null, or no sound.
 * @param SoundUpVolume
 *            How load the that sound should be.
 */
Flixel.FlxButton.prototype.setSounds = function(SoundOver, SoundOverVolume, SoundOut, SoundOutVolume, SoundDown, SoundDownVolume, SoundUp, SoundUpVolume)
{
	if (SoundOver !== null)
		this.soundOver = Flixel.FlxG.loadSound(SoundOver, SoundOverVolume || 1.0);
	if (SoundOut !== null)
		this.soundOut = Flixel.FlxG.loadSound(SoundOut, SoundOutVolume || 1.0);
	if (SoundDown !== null)
		this.soundDown = Flixel.FlxG.loadSound(SoundDown, SoundDownVolume || 1.0);
	if (SoundUp !== null)
		this.soundUp = Flixel.FlxG.loadSound(SoundUp, SoundUpVolume || 1.0);
};

/**
 * Use this to toggle checkbox-style behavior.
 */
Flixel.FlxButton.prototype.getOn = function()
{
	return this._onToggle;
};

/**
 * @private
 */
Flixel.FlxButton.prototype.setOn = function(On)
{
	this._onToggle = On;
};

/**
 * Internal function for handling the actual callback call (for UI thread dependent calls like <code>FlxU.openURL()</code>).
 */
Flixel.FlxButton.prototype.handleMouseUp = function(event)
{
	if (!this.exists || !this.visible || !this.active || (this.status != Flixel.FlxButton.PRESSED))
		return;
	if (this.onUp !== null)
		this.onUp();
	if (this.soundUp !== null)
		this.soundUp.play(true);
};

/**
 * Returns the class name.
 */
Flixel.FlxButton.prototype.toString = function()
{
	return "FlxButton";
};
/**
 * The camera class is used to display the game's visuals in the Flash player.<br>
 * By default one camera is created automatically, that is the same size as the Flash player.<br>
 * You can add more cameras or even replace the main camera using utilities in <code>FlxG</code>.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Adam Atomic
 */

/**
 * Instantiates a new camera at the specified location, with the specified size and zoom level.
 * 
 * @param X
 *            X location of the camera's display in pixels. Uses native, 1:1 resolution, ignores zoom.
 * @param Y
 *            Y location of the camera's display in pixels. Uses native, 1:1 resolution, ignores zoom.
 * @param Width
 *            The width of the camera display in pixels.
 * @param Height
 *            The height of the camera display in pixels.
 * @param Zoom
 *            The initial zoom level of the camera. A zoom level of 2 will make all pixels display at 2x resolution.
 */
Flixel.FlxCamera = function(X, Y, Width, Height, Zoom, ScaleMode)
{
	Zoom = (Zoom === undefined) ? 0 : Zoom;
	ScaleMode = (ScaleMode === undefined) ? Flixel.FlxCamera.NO_SCALE : ScaleMode;

	Flixel.FlxCamera.parent.constructor.apply(this);

	this.x = X;
	this.y = Y;
	this.width = Width;
	this.height = Height;
	this.target = null;
	this.deadzone = null;
	this.scroll = new Flixel.FlxPoint();
	this._point = new Flixel.FlxPoint();
	this.bounds = null;
	this.screen = new Flixel.FlxSprite();
	this.screen.makeGraphic(this.width, this.height, 0, true);
	this.screen.setOriginToCorner();
	this.buffer = this.screen.getPixels();
	this.bgColor = Flixel.FlxG.getBgColor();
	this._color = 0xFFFFFF;
	this._alpha = 1.0;

	this.setZoom(Zoom); // sets the scale of flash sprite, which in turn loads flashoffset values
	this._flashOffsetX = this.width * 0.5 * this.getZoom();
	this._flashOffsetY = this.height * 0.5 * this.getZoom();
	this._flashRect = new Flixel.FlxRect(0, 0, this.width, this.height);
	this._flashPoint = new Flixel.FlxPoint();

	this._fxFlashColor = 0;
	this._fxFlashDuration = 0.0;
	this._fxFlashComplete = null;
	this._fxFlashAlpha = 0.0;

	this._fxFadeColor = 0;
	this._fxFadeDuration = 0.0;
	this._fxFadeComplete = null;
	this._fxFadeAlpha = 0.0;

	this._fxShakeIntensity = 0.0;
	this._fxShakeDuration = 0.0;
	this._fxShakeComplete = null;
	this._fxShakeOffset = new Flixel.FlxPoint();
	this._fxShakeDirection = 0;

	this._fill = new BitmapData(this.width, this.height, true, 0);

	this._style = -1;
};
extend(Flixel.FlxCamera, Flixel.FlxBasic);

/**
 * Camera "follow" style preset: camera has no deadzone, just tracks the focus object directly.
 */
Flixel.FlxCamera.STYLE_LOCKON = 0;
/**
 * Camera "follow" style preset: camera deadzone is narrow but tall.
 */
Flixel.FlxCamera.STYLE_PLATFORMER = 1;
/**
 * Camera "follow" style preset: camera deadzone is a medium-size square around the focus object.
 */
Flixel.FlxCamera.STYLE_TOPDOWN = 2;
/**
 * Camera "follow" style preset: camera deadzone is a small square around the focus object.
 */
Flixel.FlxCamera.STYLE_TOPDOWN_TIGHT = 3;
/**
 * Camera "follow" style preset: camera will move screenwise.
 */
Flixel.FlxCamera.STYLE_SCREEN_BY_SCREEN = 4;
/**
 * Camera "follow" style preset: camera has no deadzone, just tracks the focus object directly and centers it.
 */
Flixel.FlxCamera.STYLE_NO_DEAD_ZONE = 5;
/**
 * Camera "shake" effect preset: shake camera on both the X and Y axes.
 */
Flixel.FlxCamera.SHAKE_BOTH_AXES = 0;
/**
 * Camera "shake" effect preset: shake camera on the X axis only.
 */
Flixel.FlxCamera.SHAKE_HORIZONTAL_ONLY = 1;
/**
 * Camera "shake" effect preset: shake camera on the Y axis only.
 */
Flixel.FlxCamera.SHAKE_VERTICAL_ONLY = 2;
/**
 * Camera "scale" mode preset: The game is not scaled.
 */
Flixel.FlxCamera.NO_SCALE = 0;
/**
 * Camera "scale" mode preset: Scales the stage to fill the display<br>
 * in the x direction without stretching.
 */
Flixel.FlxCamera.FILL_X = 1;
/**
 * Camera "scale" mode preset: Scales the stage to fill the display<br>
 * in the y direction without stretching.
 */
Flixel.FlxCamera.FILL_Y = 2;
/**
 * Camera "scale" mode preset: Stretches the game to fill the entire screen.
 */
Flixel.FlxCamera.STRETCH = 3;
/**
 * Camera "scale" mode preset: Stretches the game to show all the content.
 */
Flixel.FlxCamera.EXACT_FIT = 4;
/**
 * While you can alter the zoom of each camera after the fact,<br>
 * this variable determines what value the camera will start at when created.
 */
Flixel.FlxCamera.defaultZoom = 0;
/**
 * While you can alter the scale mode of each camera after the fact,<br>
 * this variable determines what value the camera will start at when created.
 */
Flixel.FlxCamera.defaultScaleMode = 0;
/**
 * The X position of this camera's display. Zoom does NOT affect this number.<br>
 * Measured in pixels from the left side of the flash window.
 */
Flixel.FlxCamera.prototype.x = 0;
/**
 * The Y position of this camera's display. Zoom does NOT affect this number.<br>
 * Measured in pixels from the top of the flash window.
 */
Flixel.FlxCamera.prototype.y = 0;
/**
 * How wide the camera display is, in game pixels.
 */
Flixel.FlxCamera.prototype.width = 0;
/**
 * How tall the camera display is, in game pixels.
 */
Flixel.FlxCamera.prototype.height = 0;
/**
 * Tells the camera to follow this <code>FlxObject</code> object around.
 */
Flixel.FlxCamera.prototype.target = null;
/**
 * You can assign a "dead zone" to the camera in order to better control its movement.<br>
 * The camera will always keep the focus object inside the dead zone,<br>
 * unless it is bumping up against the bounds rectangle's edges.<br>
 * The deadzone's coordinates are measured from the camera's upper left corner in game pixels.<br>
 * For rapid prototyping, you can use the preset deadzones (e.g. <code>STYLE_PLATFORMER</code>) with <code>follow()</code>.
 */
Flixel.FlxCamera.prototype.deadzone = null;
/**
 * The edges of the camera's range, i.e. where to stop scrolling. Measured in game pixels and world coordinates.
 */
Flixel.FlxCamera.prototype.bounds = null;
/**
 * Stores the basic parallax scrolling values.
 */
Flixel.FlxCamera.prototype.scroll = null;
/**
 * The actual bitmap data of the camera display itself.
 */
Flixel.FlxCamera.prototype.buffer = null;
/**
 * Sometimes it's easier to just work with a <code>FlxSprite</code> than it is to work<br>
 * directly with the <code>BitmapData</code> buffer.<br>
 * This sprite reference will allow you to do exactly that.
 */
Flixel.FlxCamera.prototype.screen = null;
/**
 * The natural background color of the camera. Defaults to FlxG.bgColor.<br>
 * NOTE: can be transparent for crazy FX!
 */
Flixel.FlxCamera.prototype.bgColor = 0;
/**
 * Indicates how far the camera is zoomed in.
 */
Flixel.FlxCamera.prototype._zoom = 0;
/**
 * Decides how Flixel handles different screen sizes.
 */
Flixel.FlxCamera.prototype._scaleMode = 0;
Flixel.FlxCamera.prototype._screenScaleFactorX = 1;
Flixel.FlxCamera.prototype._screenScaleFactorY = 1;
Flixel.FlxCamera.prototype.viewportWidth = 0;
Flixel.FlxCamera.prototype.viewportHeight = 0;
/**
 * Internal, to help avoid costly allocations.
 */
Flixel.FlxCamera.prototype._point = null;
/**
 * Internal, help with color transforming the flash bitmap.
 */
Flixel.FlxCamera.prototype._color = 0;
/**
 * Internal, used to render buffer to screen space.
 */
Flixel.FlxCamera.prototype._flashOffsetX = 0;
/**
 * Internal, used to render buffer to screen space.
 */
Flixel.FlxCamera.prototype._flashOffsetY = 0;
/**
 * Internal, used to render buffer to screen space.
 */
Flixel.FlxCamera.prototype._flashRect = null;
/**
 * Internal, used to render buffer to screen space.
 */
Flixel.FlxCamera.prototype._flashPoint = null;
/**
 * Internal, used to control the "flash" special effect.
 */
Flixel.FlxCamera.prototype._fxFlashColor = 0;
/**
 * Internal, used to control the "flash" special effect.
 */
Flixel.FlxCamera.prototype._fxFlashDuration = 0;
/**
 * Internal, used to control the "flash" special effect.
 */
Flixel.FlxCamera.prototype._fxFlashComplete = null;
/**
 * Internal, used to control the "flash" special effect.
 */
Flixel.FlxCamera.prototype._fxFlashAlpha = 0;
/**
 * Internal, used to control the "fade" special effect.
 */
Flixel.FlxCamera.prototype._fxFadeColor = 0;
/**
 * Internal, used to control the "fade" special effect.
 */
Flixel.FlxCamera.prototype._fxFadeDuration = 0;
/**
 * Internal, used to control the "fade" special effect.
 */
Flixel.FlxCamera.prototype._fxFadeComplete = null;
/**
 * Internal, used to control the "fade" special effect.
 */
Flixel.FlxCamera.prototype._fxFadeAlpha = 0;
/**
 * Internal, used to control the "shake" special effect.
 */
Flixel.FlxCamera.prototype._fxShakeIntensity = 0;
/**
 * Internal, used to control the "shake" special effect.
 */
Flixel.FlxCamera.prototype._fxShakeDuration = 0;
/**
 * Internal, used to control the "shake" special effect.
 */
Flixel.FlxCamera.prototype._fxShakeComplete = null;
/**
 * Internal, used to control the "shake" special effect.
 */
Flixel.FlxCamera.prototype._fxShakeOffset = null;
/**
 * Internal, used to control the "shake" special effect.
 */
Flixel.FlxCamera.prototype._fxShakeDirection = 0;
/**
 * Internal helper variable for doing better wipes/fills between renders.
 */
Flixel.FlxCamera.prototype._fill = null;
/**
 * Internal helper to store the angle of the camera.
 */
Flixel.FlxCamera.prototype._angle = 0;
/**
 * Internal helper to store the alpha value of the camera.
 */
Flixel.FlxCamera.prototype._alpha = 0;
/**
 * Tells the camera to use this following style.
 */
Flixel.FlxCamera.prototype._style = 0;

/**
 * Clean up memory.
 */
Flixel.FlxCamera.prototype.destroy = function()
{
	if (this.screen !== null)
		this.screen.destroy();
	this.screen = null;
	this.target = null;
	this.scroll = null;
	this.deadzone = null;
	this.bounds = null;
	this.buffer = null;
	this._flashRect = null;
	this._flashPoint = null;
	this._fxFlashComplete = null;
	this._fxFadeComplete = null;
	this._fxShakeComplete = null;
	this._fxShakeOffset = null;
	this._fill = null;

	Flixel.FlxCamera.parent.destroy.apply(this);
};

/**
 * Updates the camera scroll as well as special effects like screen-shake or fades.
 */
Flixel.FlxCamera.prototype.update = function()
{
	// Either follow the object closely,
	// or doublecheck our deadzone and update accordingly.
	if (this.target !== null) {
		if (this.deadzone === null)
			this.focusOn(this.target.getMidpoint(this._point));
		else {
			var edge = 0;
			var targetX = Math.ceil(this.target.x + ((this.target.x > 0) ? 0.0000001 : -0.0000001));
			var targetY = Math.ceil(this.target.y + ((this.target.y > 0) ? 0.0000001 : -0.0000001));

			if (this._style == Flixel.FlxCamera.STYLE_SCREEN_BY_SCREEN) {
				if (targetX > this.scroll.x + this.width)
					this.scroll.x += this.width;
				else if (targetX < this.scroll.x)
					this.scroll.x -= this.width;

				if (targetY > this.scroll.y + this.height)
					this.scroll.y += this.height;
				else if (targetY < this.scroll.y)
					this.scroll.y -= this.height;
			} else {
				edge = targetX - this.deadzone.x;
				if (this.scroll.x > edge)
					this.scroll.x = edge;
				edge = targetX + this.target.width - this.deadzone.x - this.deadzone.width;
				if (this.scroll.x < edge)
					this.scroll.x = edge;

				edge = targetY - this.deadzone.y;
				if (this.scroll.y > edge)
					this.scroll.y = edge;
				edge = targetY + this.target.height - this.deadzone.y - this.deadzone.height;
				if (this.scroll.y < edge)
					this.scroll.y = edge;
			}
		}
	}

	// Make sure we didn't go outside the camera's bounds
	if (this.bounds !== null) {
		var zoomOffsetWidth = 0;
		var zoomOffsetHeight = 0;

		if (this.getZoom() > 1) {
			zoomOffsetWidth = this.width * (this.getZoom() - 1) / (2 * this.getZoom());
			zoomOffsetHeight = this.height * (this.getZoom() - 1) / (2 * this.getZoom());
		}

		if (this.scroll.x < this.bounds.getLeft() - zoomOffsetWidth)
			this.scroll.x = this.bounds.getLeft() - zoomOffsetWidth;
		if (this.scroll.x > this.bounds.getRight() - this.width + zoomOffsetWidth)
			this.scroll.x = this.bounds.getRight() - this.width + zoomOffsetWidth;
		if (this.scroll.y < this.bounds.getTop() - zoomOffsetHeight)
			this.scroll.y = this.bounds.getTop() - zoomOffsetHeight;
		if (this.scroll.y > this.bounds.getBottom() - this.height + zoomOffsetHeight)
			this.scroll.y = this.bounds.getBottom() - this.height + zoomOffsetHeight;
	}

	// Update the "flash" special effect
	if (this._fxFlashAlpha > 0.0) {
		this._fxFlashAlpha -= Flixel.FlxG.elapsed / this._fxFlashDuration;
		if ((this._fxFlashAlpha <= 0) && (this._fxFlashComplete !== null))
			this._fxFlashComplete();
	}

	// Update the "fade" special effect
	if ((this._fxFadeAlpha > 0.0) && (this._fxFadeAlpha < 1.0)) {
		this._fxFadeAlpha += Flixel.FlxG.elapsed / this._fxFadeDuration;
		if (this._fxFadeAlpha >= 1.0) {
			this._fxFadeAlpha = 1.0;
			if (this._fxFadeComplete !== null)
				this._fxFadeComplete();
		}
	}

	// Update the "shake" special effect
	if (this._fxShakeDuration > 0) {
		this._fxShakeDuration -= Flixel.FlxG.elapsed;
		if (this._fxShakeDuration <= 0) {
			this._fxShakeOffset.make();
			if (this._fxShakeComplete !== null)
				this._fxShakeComplete();
		} else {
			if ((this._fxShakeDirection == Flixel.FlxCamera.SHAKE_BOTH_AXES) || (this._fxShakeDirection == Flixel.FlxCamera.SHAKE_HORIZONTAL_ONLY))
				this._fxShakeOffset.x = (Flixel.FlxG.random() * this._fxShakeIntensity * this.width * 2 - this._fxShakeIntensity * this.width) * this._zoom;
			if ((this._fxShakeDirection == Flixel.FlxCamera.SHAKE_BOTH_AXES) || (this._fxShakeDirection == Flixel.FlxCamera.SHAKE_VERTICAL_ONLY))
				this._fxShakeOffset.y = (Flixel.FlxG.random() * this._fxShakeIntensity * this.height * 2 - this._fxShakeIntensity * this.height) * this._zoom;
		}
	}
};

/**
 * Tells this camera object what <code>FlxObject</code> to track.
 * 
 * @param Target
 *            The object you want the camera to track. Set to null to not follow anything.
 * @param Style
 *            Leverage one of the existing "deadzone" presets. If you use a custom deadzone, ignore this parameter and manually specify the deadzone after calling <code>follow()</code>.
 */
Flixel.FlxCamera.prototype.follow = function(Target, Style, Offset)
{
	this._style = (Style === undefined) ? Flixel.FlxCamera.STYLE_LOCKON : Style;
	
	this.target = Target;
	var helper;
	var w = 0;
	var h = 0;

	switch (Style) {
		case Flixel.FlxCamera.STYLE_PLATFORMER:
			w = (this.width / 8) + (Offset !== null ? Offset.x : 0);
			h = (this.height / 3) + (Offset !== null ? Offset.y : 0);
			this.deadzone = new Flixel.FlxRect((this.width - w) / 2, (this.height - h) / 2 - h * 0.25, w, h);
			break;
		case Flixel.FlxCamera.STYLE_TOPDOWN:
			helper = Math.max(this.width, this.height) / 4;
			this.deadzone = new Flixel.FlxRect((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
			break;
		case Flixel.FlxCamera.STYLE_TOPDOWN_TIGHT:
			helper = Math.max(this.width, this.height) / 8;
			this.deadzone = new Flixel.FlxRect((this.width - helper) / 2, (this.height - helper) / 2, helper, helper);
			break;
		case Flixel.FlxCamera.STYLE_LOCKON:
			if (this.target !== null) {
				w = this.target.width + (Offset !== null ? Offset.x : 0);
				h = this.target.height + (Offset !== null ? Offset.y : 0);
			}
			this.deadzone = new Flixel.FlxRect((this.width - w) / 2, (this.height - h) / 2 - h * 0.25, w, h);
			break;
		case Flixel.FlxCamera.STYLE_SCREEN_BY_SCREEN:
			this.deadzone = new Flixel.FlxRect(0, 0, this.width, this.height);
			break;
		default:
			this.deadzone = null;
			break;
	}
};

/**
 * Move the camera focus to this location instantly.
 * 
 * @param Point
 *            Where you want the camera to focus.
 */
Flixel.FlxCamera.prototype.focusOn = function(Point)
{
	Point.x += (Point.x > 0) ? 0.0000001 : -0.0000001;
	Point.y += (Point.y > 0) ? 0.0000001 : -0.0000001;
	this.scroll.make(Point.x - this.width * 0.5, Point.y - this.height * 0.5);
};

/**
 * Specify the boundaries of the level or where the camera is allowed to move.
 * 
 * @param X
 *            The smallest X value of your level (usually 0).
 * @param Y
 *            The smallest Y value of your level (usually 0).
 * @param Width
 *            The largest X value of your level (usually the level width).
 * @param Height
 *            The largest Y value of your level (usually the level height).
 * @param UpdateWorld
 *            Whether the global quad-tree's dimensions should be updated to match (default: false).
 */
Flixel.FlxCamera.prototype.setBounds = function(X, Y, Width, Height, UpdateWorld)
{
	X = X || 0;
	Y = Y || 0;
	Width = Width || 0;
	Height = Height || 0;

	if (this.bounds === null)
		this.bounds = new Flixel.FlxRect();
	this.bounds.make(X, Y, Width, Height);
	if (UpdateWorld)
		Flixel.FlxG.worldBounds.copyFrom(this.bounds);
	this.update();
};

/**
 * The screen is filled with this color and gradually returns to normal.
 * 
 * @param Color
 *            The color you want to use.
 * @param Duration
 *            How long it takes for the flash to fade.
 * @param OnComplete
 *            A function you want to run when the flash finishes.
 * @param Force
 *            Force the effect to reset.
 */
Flixel.FlxCamera.prototype.flash = function(Color, Duration, OnComplete, Force)
{
	Color = Color || 0xffffffff;
	Duration = Duration || 1;
	Force = (Force === undefined) ? false : Force;

	if (!Force && (this._fxFlashAlpha > 0.0))
		return;
	this._fxFlashColor = Color;
	if (Duration <= 0)
		Duration = Number.MIN_VALUE;
	this._fxFlashDuration = Duration;
	this._fxFlashComplete = OnComplete;
	this._fxFlashAlpha = 1.0;
};

/**
 * The screen is gradually filled with this color.
 * 
 * @param Color
 *            The color you want to use.
 * @param Duration
 *            How long it takes for the fade to finish.
 * @param OnComplete
 *            A function you want to run when the fade finishes.
 * @param Force
 *            Force the effect to reset.
 */
Flixel.FlxCamera.prototype.fade = function(Color, Duration, OnComplete, Force)
{
	Color = Color || 0xff000000;
	Duration = Duration || 1;
	Force = (Force === undefined) ? false : Force;

	if (!Force && (this._fxFadeAlpha > 0.0))
		return;
	this._fxFadeColor = Color;
	if (Duration <= 0)
		Duration = Number.MIN_VALUE;
	this._fxFadeDuration = Duration;
	this._fxFadeComplete = OnComplete;
	this._fxFadeAlpha = Number.MIN_VALUE;
};

/**
 * A simple screen-shake effect.
 * 
 * @param Intensity
 *            Percentage of screen size representing the maximum distance that the screen can move while shaking.
 * @param Duration
 *            The length in seconds that the shaking effect should last.
 * @param OnComplete
 *            A function you want to run when the shake effect finishes.
 * @param Force
 *            Force the effect to reset (default = true, unlike flash() and fade()!).
 * @param Direction
 *            Whether to shake on both axes, just up and down, or just side to side (use class constants SHAKE_BOTH_AXES, SHAKE_VERTICAL_ONLY, or SHAKE_HORIZONTAL_ONLY).
 */
Flixel.FlxCamera.prototype.shake = function(Intensity, Duration, OnComplete, Force, Direction)
{
	Intensity = Intensity || 0.05;
	Duration = Duration || 0.5;
	Force = (Force === undefined) ? true : Force;
	Direction = Direction || Flixel.FlxCamera.SHAKE_BOTH_AXES;

	if (!Force && ((this._fxShakeOffset.x !== 0) || (this._fxShakeOffset.y !== 0)))
		return;
	this._fxShakeIntensity = Intensity;
	this._fxShakeDuration = Duration;
	this._fxShakeComplete = OnComplete;
	this._fxShakeDirection = Direction;
	this._fxShakeOffset.make();
};

/**
 * Just turns off all the camera effects instantly.
 */
Flixel.FlxCamera.prototype.stopFX = function()
{
	this._fxFlashAlpha = 0.0;
	this._fxFadeAlpha = 0.0;
	this._fxShakeDuration = 0;
	this.x = this.x + this.width * 0.5;
	this.y = this.y + this.height * 0.5;
};

/**
 * Copy the bounds, focus object, and deadzone info from an existing camera.
 * 
 * @param Camera
 *            The camera you want to copy from.
 * 
 * @return A reference to this <code>FlxCamera</code> object.
 */
Flixel.FlxCamera.prototype.copyFrom = function(Camera)
{
	if (Camera.bounds === null)
		this.bounds = null;
	else {
		if (this.bounds === null)
			this.bounds = new Flixel.FlxRect();
		this.bounds.copyFrom(Camera.bounds);
	}
	this.target = Camera.target;
	if (this.target !== null) {
		if (Camera.deadzone === null)
			this.deadzone = null;
		else {
			if (this.deadzone === null)
				this.deadzone = new Flixel.FlxRect();
			this.deadzone.copyFrom(Camera.deadzone);
		}
	}
	return this;
};

/**
 * The zoom level of this camera. 1 = 1:1, 2 = 2x zoom, etc.
 */
Flixel.FlxCamera.prototype.getZoom = function()
{
	return this._zoom;
};

/**
 * @private
 */
Flixel.FlxCamera.prototype.setZoom = function(Zoom)
{
	if (Zoom === 0)
		this._zoom = Flixel.FlxCamera.defaultZoom;
	else
		this._zoom = Zoom;
	this.setScale(this._zoom, this._zoom);
};

/**
 * The scale mode of this camera.
 */
Flixel.FlxCamera.prototype.getScaleMode = function()
{
	return this._scaleMode;
};

/**
 * @private
 */
Flixel.FlxCamera.prototype.setScaleMode = function(ScaleMode)
{
	if (ScaleMode === 0)
		this._scaleMode = Flixel.FlxCamera.defaultScaleMode;
	else
		this._scaleMode = ScaleMode;
	this.setScale(this._zoom, this._zoom);
};

/**
 * The alpha value of this camera display (a Number between 0.0 and 1.0).
 */
Flixel.FlxCamera.prototype.getAlpha = function()
{
	return this._alpha;
};

/**
 * @private
 */
Flixel.FlxCamera.prototype.setAlpha = function(Alpha)
{
	this._alpha = Alpha;
};

/**
 * The angle of the camera display (in degrees). Currently yields weird display results, since cameras aren't nested in an extra display object yet.
 */
Flixel.FlxCamera.prototype.getAngle = function()
{
	return this._angle;
};

/**
 * @private
 */
Flixel.FlxCamera.prototype.setAngle = function(Angle)
{
	this._angle = Angle;
};

/**
 * The color tint of the camera display.
 */
Flixel.FlxCamera.prototype.getColor = function()
{
	return this._color;
};

/**
 * @private
 */
Flixel.FlxCamera.prototype.setColor = function(Color)
{
	this._color = Color;
};

/**
 * The scale of the camera object, irrespective of zoom. Currently yields weird display results, since cameras aren't nested in an extra display object yet.
 */
Flixel.FlxCamera.prototype.getScale = function()
{
	return this._point.make(this._scaleX, this._scaleY);
};

/**
 * @private
 */
Flixel.FlxCamera.prototype.setScale = function(X, Y)
{
	this._scaleX = X;
	this._scaleY = Y;
	return; // TODO: Fix scaling

	/*var stage = Flixel.FlxG.getStage();
	var screenAspectRatio = Flixel.FlxG.screenWidth / Flixel.FlxG.screenHeight;

	switch (_scaleMode) {
		case Flixel.FlxCamera.NO_SCALE:
			this._screenScaleFactorY = 1;
			this._screenScaleFactorX = 1;
			this.viewportWidth = int(FlxG.screenWidth / X);
			this.viewportHeight = int(FlxG.screenHeight / Y);
			break;

		default:
		case STRETCH:
			this._screenScaleFactorY = Flixel.FlxG.screenHeight / stage.stageHeight;
			this._screenScaleFactorX = Flixel.FlxG.screenWidth / stage.stageWidth;
			this.viewportWidth = int(stage.stageWidth / X);
			this.viewportHeight = int(stage.stageHeight / Y);
			break;

		case FILL_X:
			this._screenScaleFactorX = Flixel.FlxG.screenWidth / (stage.stageHeight * screenAspectRatio);
			this._screenScaleFactorY = Flixel.FlxG.screenHeight / stage.stageHeight;
			this.viewportWidth = int((stage.stageHeight * screenAspectRatio) / X);
			this.viewportHeight = int(stage.stageHeight / Y);
			break;

		case FILL_Y:
			this._screenScaleFactorX = Flixel.FlxG.screenWidth / stage.stageWidth;
			this._screenScaleFactorY = Flixel.FlxG.screenHeight / (stage.stageWidth / screenAspectRatio);
			this.viewportWidth = int(stage.stageWidth / X);
			this.viewportHeight = int((stage.stageWidth / screenAspectRatio) / Y);
			break;
	}

	_scaleX = viewportWidth;
	_scaleY = viewportHeight;*/
};

/**
 * Fill the camera with the specified color.
 * 
 * @param Color
 *            The color to fill with in 0xAARRGGBB hex format.
 * @param BlendAlpha
 *            Whether to blend the alpha value or just wipe the previous contents. Default is true.
 */
Flixel.FlxCamera.prototype.fill = function(Color, BlendAlpha)
{
	BlendAlpha = (BlendAlpha === undefined) ? true : BlendAlpha;

	var finalColor = Flixel.FlxU.multiplyColors(Color, this._color);
	this._fill.fillRect(this._flashRect, finalColor);
	this.buffer.copyPixels(this._fill, this._flashRect, this._flashPoint, null, null, BlendAlpha);
};

/**
 * Internal helper function, handles the actual drawing of all the special effects.
 */
Flixel.FlxCamera.prototype.drawFX = function()
{
	var alphaComponent;

	// Draw the "flash" special effect onto the buffer
	if (this._fxFlashAlpha > 0.0) {
		alphaComponent = this._fxFlashColor >> 24;
		this.fill((uint(((alphaComponent <= 0) ? 0xff : alphaComponent) * this._fxFlashAlpha) << 24) + (this._fxFlashColor & 0x00ffffff));
	}

	// Draw the "fade" special effect onto the buffer
	if (this._fxFadeAlpha > 0.0) {
		alphaComponent = this._fxFadeColor >> 24;
		this.fill((uint(((alphaComponent <= 0) ? 0xff : alphaComponent) * this._fxFadeAlpha) << 24) + (this._fxFadeColor & 0x00ffffff));
	}

	if ((this._fxShakeOffset.x !== 0) || (this._fxShakeOffset.y !== 0)) {
		this.x = this.x + this._flashOffsetX + this._fxShakeOffset.x;
		this.y = this.y + this._flashOffsetY + this._fxShakeOffset.y;
	}
};

/**
 * Returns the class name.
 */
Flixel.FlxCamera.prototype.toString = function()
{
	return "FlxCamera";
};
/**
 * This is a simple particle class that extends the default behavior<br>
 * of <code>FlxSprite</code> to have slightly more specialized behavior<br>
 * common to many game scenarios.  You can override and extend this class<br>
 * just like you would <code>FlxSprite</code>. While <code>FlxEmitter</code><br>
 * used to work with just any old sprite, it now requires a<br>
 * <code>FlxParticle</code> based class.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames 
 * @author Adam Atomic
 */
/**
 * Instantiate a new particle.  Like <code>FlxSprite</code>, all meaningful creation
 * happens during <code>loadGraphic()</code> or <code>makeGraphic()</code> or whatever.
 */
Flixel.FlxParticle = function()
{
	Flixel.FlxParticle.parent.constructor.apply(this);

	this.lifespan = 0;
	this.friction = 500;	
};
extend(Flixel.FlxParticle, Flixel.FlxSprite);

/**
 * How long this particle lives before it disappears.
 * NOTE: this is a maximum, not a minimum; the object
 * could get recycled before its lifespan is up.
 */
Flixel.FlxParticle.prototype.lifespan = 0;
/**
 * Determines how quickly the particles come to rest on the ground.
 * Only used if the particle has gravity-like acceleration applied.
 * @default 500
 */
Flixel.FlxParticle.prototype.friction = 0;

/**
 * The particle's main update logic.  Basically it checks to see if it should
 * be dead yet, and then has some special bounce behavior if there is some gravity on it.
 */
Flixel.FlxParticle.prototype.update = function()
{
	// Lifespan behavior
	if(this.lifespan <= 0)
		return;
	this.lifespan -= Flixel.FlxG.elapsed;
	if(this.lifespan <= 0)
		this.kill();
	
	// Simpler bounce/Flxn behavior for now
	if(this.touching) {
		if(this.angularVelocity !== 0)
			this.angularVelocity = -this.angularVelocity;
	}
	
	if(this.acceleration.y > 0) {// Special behavior for particles with gravity
		if(this.touching & Flixel.FlxObject.FLOOR) {
			this.drag.x = this.friction;

			if(!(this.wasTouching & Flixel.FlxObject.FLOOR)) {
				if(this.velocity.y < -this.elasticity*10) {
					if(this.angularVelocity !== 0)
						this.angularVelocity *= -this.elasticity;
				} else {
					this.velocity.y = 0;
					this.angularVelocity = 0;
				}
			}
		} else
			this.drag.x = 0;
	}
};

/**
 * Triggered whenever this object is launched by a <code>FlxEmitter</code>.
 * You can override this to add custom behavior like a sound or AI or something.
 */
Flixel.FlxParticle.prototype.onEmit = function()
{
};

/**
 * Returns the class name.
 */
Flixel.FlxParticle.prototype.toString = function()
{
	return "FlxParticle";
};
/**
 * <code>FlxEmitter</code> is a lightweight particle emitter.<br>
 * It can be used for one-time explosions or for<br>
 * continuous fx like rain and fire.  <code>FlxEmitter</code><br>
 * is not optimized or anything; all it does is launch<br>
 * <code>FlxParticle</code> objects out at set intervals<br>
 * by setting their positions and velocities accordingly.<br>
 * It is easy to use and relatively efficient,<br>
 * relying on <code>FlxGroup</code>'s RECYCLE POWERS.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author	Adam Atomic
 */

/**
 * Creates a new <code>FlxEmitter</code> object at a specific position. Does NOT automatically generate or attach particles!
 * 
 * @param X
 *            The X position of the emitter.
 * @param Y
 *            The Y position of the emitter.
 * @param Size
 *            Optional, specifies a maximum capacity for this emitter.
 */
Flixel.FlxEmitter = function(X, Y, Size)
{
	Flixel.FlxEmitter.parent.constructor.apply(this, [ Size ]);

	this.x = X;
	this.y = Y;
	this.width = 0;
	this.height = 0;
	this.minParticleSpeed = new Flixel.FlxPoint(-100, -100);
	this.maxParticleSpeed = new Flixel.FlxPoint(100, 100);
	this.minRotation = -360;
	this.maxRotation = 360;
	this.gravity = 0;
	this._particleClass = new Flixel.FlxParticle();
	this.particleDrag = new Flixel.FlxPoint();
	this.frequency = 0.1;
	this.lifespan = 3;
	this.bounce = 0;
	this._quantity = 0;
	this._counter = 0;
	this._explode = true;
	this.on = false;
	this._point = new Flixel.FlxPoint();
	this._waitForKill = false;

};
extend(Flixel.FlxEmitter, Flixel.FlxGroup);

/**
 * The X position of the top left corner of the emitter in world space.
 */
Flixel.FlxEmitter.prototype.x = 0;
/**
 * The Y position of the top left corner of emitter in world space.
 */
Flixel.FlxEmitter.prototype.y = 0;
/**
 * The width of the emitter. Particles can be randomly generated from anywhere within this box.
 */
Flixel.FlxEmitter.prototype.width = 0;
/**
 * The height of the emitter. Particles can be randomly generated from anywhere within this box.
 */
Flixel.FlxEmitter.prototype.height = 0;
/**
 * The minimum possible velocity of a particle. The default value is (-100,-100).
 */
Flixel.FlxEmitter.prototype.minParticleSpeed = null;
/**
 * The maximum possible velocity of a particle. The default value is (100,100).
 */
Flixel.FlxEmitter.prototype.maxParticleSpeed = null;
/**
 * The X and Y drag component of particles launched from the emitter.
 */
Flixel.FlxEmitter.prototype.particleDrag = null;
/**
 * The minimum possible angular velocity of a particle. The default value is -360. NOTE: rotating particles are more expensive to draw than non-rotating ones!
 */
Flixel.FlxEmitter.prototype.minRotation = 0;
/**
 * The maximum possible angular velocity of a particle. The default value is 360. NOTE: rotating particles are more expensive to draw than non-rotating ones!
 */
Flixel.FlxEmitter.prototype.maxRotation = 0;
/**
 * Sets the <code>acceleration.y</code> member of each particle to this value on launch.
 */
Flixel.FlxEmitter.prototype.gravity = 0;
/**
 * Determines whether the emitter is currently emitting particles. It is totally safe to directly toggle this.
 */
Flixel.FlxEmitter.prototype.on = false;
/**
 * How often a particle is emitted (if emitter is started with Explode == false).
 */
Flixel.FlxEmitter.prototype.frequency = 0;
/**
 * How long each particle lives once it is emitted. Set lifespan to 'zero' for particles to live forever.
 */
Flixel.FlxEmitter.prototype.lifespan = 0;
/**
 * How much each particle should bounce. 1 = full bounce, 0 = no bounce.
 */
Flixel.FlxEmitter.prototype.bounce = 0;
/**
 * Internal variable for tracking the class to create when generating particles.
 */
Flixel.FlxEmitter.prototype._particleClass = null;
/**
 * Internal helper for deciding how many particles to launch.
 */
Flixel.FlxEmitter.prototype._quantity = 0;
/**
 * Internal helper for the style of particle emission (all at once, or one at a time).
 */
Flixel.FlxEmitter.prototype._explode = false;
/**
 * Internal helper for deciding when to launch particles or kill them.
 */
Flixel.FlxEmitter.prototype._timer = 0;
/**
 * Internal counter for figuring out how many particles to launch.
 */
Flixel.FlxEmitter.prototype._counter = 0;
/**
 * Internal point object, handy for reusing for memory mgmt purposes.
 */
Flixel.FlxEmitter.prototype._point = null;
/**
 * Internal helper for automatic call the kill() method
 */
Flixel.FlxEmitter.prototype._waitForKill = false;

/**
 * Clean up memory.
 */
Flixel.FlxEmitter.prototype.destroy = function()
{
	this.minParticleSpeed = null;
	this.maxParticleSpeed = null;
	this.particleDrag = null;
	this._particleClass = null;
	this._point = null;

	Flixel.FlxEmitter.parent.destroy.apply(this);
};

/**
 * This function generates a new array of particle sprites to attach to the emitter.
 * 
 * @param Graphics
 *            If you opted to not pre-configure an array of FlxParticle objects, you can simply pass in a particle image or sprite sheet.
 * @param Quantity
 *            The number of particles to generate when using the "create from image" option.
 * @param BakedRotations
 *            How many frames of baked rotation to use (boosts performance). Set to zero to not use baked rotations.
 * @param Multiple
 *            Whether the image in the Graphics param is a single particle or a bunch of particles (if it's a bunch, they need to be square!).
 * @param Collide
 *            Whether the particles should be flagged as not 'dead' (non-colliding particles are higher performance). 0 means no collisions, 0-1 controls scale of particle's bounding box.
 * 
 * @return This FlxEmitter instance (nice for chaining stuff together, if you're into that).
 */
Flixel.FlxEmitter.prototype.makeParticles = function(Graphics, Quantity, BakedRotations, Multiple, Collide)
{
	BakedRotations = BakedRotations || 16;
	Collide = Collide || 0.8;

	this._maxSize = Quantity || 50;

	var totalFrames = 1;
	if (Multiple) {
		var sprite = new Flixel.FlxSprite();
		sprite.loadGraphic(Graphics, true);
		totalFrames = sprite.frames;
		sprite.destroy();
	}

	var randomFrame = 0;
	var particle = null;
	var i = 0;
	while (i < Quantity) {
		particle = new this._particleClass.constructor();

		if (Multiple) {
			randomFrame = Flixel.FlxG.random() * totalFrames;
			if (BakedRotations > 0)
				particle.loadRotatedGraphic(Graphics, BakedRotations, randomFrame);
			else {
				particle.loadGraphic(Graphics, true);
				particle.setFrame(randomFrame);
			}
		} else {
			if (BakedRotations > 0)
				particle.loadRotatedGraphic(Graphics, BakedRotations);
			else
				particle.loadGraphic(Graphics);
		}
		if (Collide > 0) {
			particle.width *= Collide;
			particle.height *= Collide;
			particle.centerOffsets();
		} else
			particle.allowCollisions = Flixel.FlxObject.NONE;
		particle.exists = false;
		this.add(particle);
		i++;
	}
	return this;
};

/**
 * Called automatically by the game loop, decides when to launch particles and when to "die".
 */
Flixel.FlxEmitter.prototype.update = function()
{
	if (this.on) {
		if (this._explode) {
			this.on = false;
			this._waitForKill = true;
			var i = 0;
			var l = this._quantity;
			if ((l <= 0) || (l > this.length))
				l = this.length;
			while (i < l) {
				this.emitParticle();
				i++;
			}
			this._quantity = 0;
		} else {
			// Spawn a particle per frame
			if (this.frequency <= 0) {
				this.emitParticle();
				if ((this._quantity > 0) && (++this._counter >= this._quantity)) {
					this.on = false;
					this._waitForKill = true;
					this._quantity = 0;
				}
			} else {
				this._timer += Flixel.FlxG.elapsed;
				while ((this.frequency > 0) && (this._timer > this.frequency) && this.on) {
					this._timer -= this.frequency;
					this.emitParticle();
					if ((this._quantity > 0) && (++this._counter >= this._quantity)) {
						this.on = false;
						this._waitForKill = true;
						this._quantity = 0;
					}
				}
			}
		}
	}

	Flixel.FlxEmitter.parent.update.apply(this);
};

/**
 * Call this function to turn off all the particles and the emitter.
 */
Flixel.FlxEmitter.prototype.kill = function()
{
	this.on = false;
	this._waitForKill = false;
	Flixel.FlxEmitter.parent.kill.apply(this);
};

/**
 * Call this function to start emitting particles.
 * 
 * @param Explode
 *            Whether the particles should all burst out at once.
 * @param Lifespan
 *            How long each particle lives once emitted. 0 = forever.
 * @param Frequency
 *            Ignored if Explode is set to true. Frequency is how often to emit a particle. 0 = never emit, 0.1 = 1 particle every 0.1 seconds, 5 = 1 particle every 5 seconds.
 * @param Quantity
 *            How many particles to launch. 0 = "all of the particles".
 */
Flixel.FlxEmitter.prototype.start = function(Explode, Lifespan, Frequency, Quantity)
{
	Explode = (Explode === undefined) ? true : Explode;
	Lifespan = Lifespan || 0;
	Frequency = Frequency || 0.1;
	Quantity = Quantity || 0;

	this.revive();
	this.visible = true;
	this.on = true;

	this._explode = Explode;
	this.lifespan = Lifespan;
	this.frequency = Frequency;
	this._quantity += Quantity;

	this._counter = 0;
	this._timer = 0;

	this._waitForKill = false;
};

/**
 * This function can be used both internally and externally to emit the next particle.
 */
Flixel.FlxEmitter.prototype.emitParticle = function()
{
	var particle = this.recycle(this._particleClass);
	particle.lifespan = this.lifespan;
	particle.elasticity = this.bounce;
	particle.reset(this.x - (particle.width >> 1) + Flixel.FlxG.random() * this.width, this.y - (particle.height >> 1) + Flixel.FlxG.random() * this.height);
	particle.visible = true;

	if (this.minParticleSpeed.x != this.maxParticleSpeed.x)
		particle.velocity.x = this.minParticleSpeed.x + Flixel.FlxG.random() * (this.maxParticleSpeed.x - this.minParticleSpeed.x);
	else
		particle.velocity.x = this.minParticleSpeed.x;
	if (this.minParticleSpeed.y != this.maxParticleSpeed.y)
		particle.velocity.y = this.minParticleSpeed.y + Flixel.FlxG.random() * (this.maxParticleSpeed.y - this.minParticleSpeed.y);
	else
		particle.velocity.y = this.minParticleSpeed.y;
	particle.acceleration.y = this.gravity;

	if (this.minRotation != this.maxRotation)
		particle.angularVelocity = this.minRotation + Flixel.FlxG.random() * (this.maxRotation - this.minRotation);
	else
		particle.angularVelocity = this.minRotation;
	if (particle.angularVelocity !== 0)
		particle.angle = Flixel.FlxG.random() * 360 - 180;

	particle.drag.x = this.particleDrag.x;
	particle.drag.y = this.particleDrag.y;
	particle.onEmit();
};

/**
 * Set your own particle class type here. The custom class must extend <code>FlxParticle</code>. Default is <code>FlxParticle</code>.
 */
Flixel.FlxEmitter.prototype.getParticleClass = function()
{
	return this._particleClass;
};

Flixel.FlxEmitter.prototype.setParticleClass = function(value)
{
	var testParticle = new value.constructor();
	if (testParticle instanceof Flixel.FlxParticle) {
		this._particleClass = value;
	} else {
		Flixel.FlxG.log("ERROR: " + Flixel.FlxU.getClassName(testParticle, true) + " must extend FlxParticle in order to be used in a FlxEmitter.");
	}
};

/**
 * A more compact way of setting the width and height of the emitter.
 * 
 * @param Width
 *            The desired width of the emitter (particles are spawned randomly within these dimensions).
 * @param Height
 *            The desired height of the emitter.
 */
Flixel.FlxEmitter.prototype.setSize = function(Width, Height)
{
	this.width = Width;
	this.height = Height;
};

/**
 * A more compact way of setting the X velocity range of the emitter.
 * 
 * @param Min
 *            The minimum value for this range.
 * @param Max
 *            The maximum value for this range.
 */
Flixel.FlxEmitter.prototype.setXSpeed = function(Min, Max)
{
	this.minParticleSpeed.x = Min || 0;
	this.maxParticleSpeed.x = Max || 0;
};

/**
 * A more compact way of setting the Y velocity range of the emitter.
 * 
 * @param Min
 *            The minimum value for this range.
 * @param Max
 *            The maximum value for this range.
 */
Flixel.FlxEmitter.prototype.setYSpeed = function(Min, Max)
{
	this.minParticleSpeed.y = Min || 0;
	this.maxParticleSpeed.y = Max || 0;
};

/**
 * A more compact way of setting the angular velocity constraints of the emitter.
 * 
 * @param Min
 *            The minimum value for this range.
 * @param Max
 *            The maximum value for this range.
 */
Flixel.FlxEmitter.prototype.setRotation = function(Min, Max)
{
	this.minRotation = Min || 0;
	this.maxRotation = Max || 0;
};

/**
 * Change the emitter's midpoint to match the midpoint of a <code>FlxObject</code>.
 * 
 * @param Object
 *            The <code>FlxObject</code> that you want to sync up with.
 */
Flixel.FlxEmitter.prototype.at = function(Object)
{
	Object.getMidpoint(this._point);
	this.x = this._point.x - (this.width >> 1);
	this.y = this._point.y - (this.height >> 1);
};

/**
 * Returns the class name.
 */
Flixel.FlxEmitter.prototype.toString = function()
{
	return "FlxEmitter";
};
/**
 * This is a basic "environment object" class, used to create simple walls and floors.<br>
 * It can be filled with a random selection of tiles to quickly add detail.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Creates a new <code>FlxBlock</code> object with the specified position and size.
 * 
 * @param	X			The X position of the block.
 * @param	Y			The Y position of the block.
 * @param	Width		The width of the block.
 * @param	Height		The height of the block.
 */
Flixel.FlxTileblock = function(X, Y, Width, Height)
{
	Flixel.FlxTileblock.parent.constructor.apply(this, [X, Y]);

	this.makeGraphic(Width, Height, Flixel.FlxG.RED, true);
	this.active = false;
	this.immovable = true;
	this.moves = false;
};
extend(Flixel.FlxTileblock, Flixel.FlxSprite);

/**
 * Fills the block with a randomly arranged selection of graphics from the image provided.
 * 
 * @param	TileGraphic		The graphic class that contains the tiles that should fill this block.
 * @param	TileWidth		The width of a single tile in the graphic.
 * @param	TileHeight		The height of a single tile in the graphic.
 * @param	Empties			The number of "empty" tiles to add to the auto-fill algorithm (e.g. 8 tiles + 4 empties = 1/3 of block will be open holes).
 */
Flixel.FlxTileblock.prototype.loadTiles = function(TileGraphic, TileWidth, TileHeight, Empties)
{
	if(TileGraphic === null)
		return this;
	
	TileWidth = TileWidth || 0;
	TileHeight = TileHeight || 0;
	Empties = Empties || 0;
	
	//First create a tile brush
	var sprite = new Flixel.FlxSprite().loadGraphic(TileGraphic, true, false, TileWidth, TileHeight);
	var spriteWidth = sprite.width;
	var spriteHeight = sprite.height;
	var total = sprite.frames + Empties;
	
	//Then prep the "canvas" as it were (just doublechecking that the size is on tile boundaries)
	var regen = false;
	if(this.width % sprite.width !== 0)
	{
		this.width = uint(this.width / spriteWidth + 1) * spriteWidth;
		regen = true;
	}
	
	if(this.height % sprite.height !== 0)
	{
		this.height = uint(this.height / spriteHeight + 1) * spriteHeight;
		regen = true;
	}
	if(regen)
		this.makeGraphic(this.width, this.height, 0, true);
	else
		this.fill(0);
	
	//Stamp random tiles onto the canvas
	var row = 0;
	var column;
	var destinationX;
	var destinationY = 0;
	var widthInTiles = this.width / spriteWidth;
	var heightInTiles = this.height / spriteHeight;
	while(row < heightInTiles)
	{
		destinationX = 0;
		column = 0;
		while(column < widthInTiles)
		{
			if(Flixel.FlxG.random() * total > Empties)
			{
				sprite.randomFrame();
				sprite.drawFrame();
				this.stamp(sprite, destinationX, destinationY);
			}
			destinationX += spriteWidth;
			column++;
		}
		destinationY += spriteHeight;
		row++;
	}
			
	return this;
};

/**
 * Returns the class name.
 */
Flixel.FlxTileblock.prototype.toString = function()
{
	return "FlxTileblock";
};
/**
 * This is a traditional tilemap display and collision class.
 * It takes a string of comma-separated numbers and then associates
 * those values with tiles from the sheet you pass in.
 * It also includes some handy static parsers that can convert
 * arrays or images into strings that can be loaded.
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * The tilemap constructor just initializes some basic variables.
 */
Flixel.FlxTilemap = function()
{
	Flixel.FlxTilemap.parent.constructor.apply(this);

	this.auto = Flixel.FlxTilemap.OFF;
	this.widthInTiles = 0;
	this.heightInTiles = 0;
	this.totalTiles = 0;
	this._buffers = [];
	this._flashPoint = new Flixel.FlxPoint();
	this._flashRect = null;
	this._data = null;
	this._tileWidth = 0;
	this._tileHeight = 0;
	this._rects = null;
	this._tiles = null;
	this._tileObjects = null;
	this.immovable = true;
	this.moves = false;
	this.cameras = null;
	this._debugTileNotSolid = null;
	this._debugTilePartial = null;
	this._debugTileSolid = null;
	this._debugRect = null;
	this._lastVisualDebug = Flixel.FlxG.visualDebug;
	this._startingIndex = 0;
};
extend(Flixel.FlxTilemap, Flixel.FlxObject);

/**
 * No auto-tiling.
 */
Flixel.FlxTilemap.OFF = 0;
/**
 * Good for levels with thin walls that don'tile need interior corner art.
 */
Flixel.FlxTilemap.AUTO = 1;
/**
 * Better for levels with thick walls that look better with interior corner art.
 */
Flixel.FlxTilemap.ALT = 2;
/**
 * Set this flag to use one of the 16-tile binary auto-tile algorithms (OFF, AUTO, or ALT).
 */
Flixel.FlxTilemap.prototype.auto = 0;
/**
 * Read-only variable, do NOT recommend changing after the map is loaded!
 */
Flixel.FlxTilemap.prototype.widthInTiles = 0;
/**
 * Read-only variable, do NOT recommend changing after the map is loaded!
 */
Flixel.FlxTilemap.prototype.heightInTiles = 0;
/**
 * Read-only variable, do NOT recommend changing after the map is loaded!
 */
Flixel.FlxTilemap.prototype.totalTiles = 0;
/**
 * Rendering helper, minimize new object instantiation on repetitive methods.
 */
Flixel.FlxTilemap.prototype._flashPoint = null;
/**
 * Rendering helper, minimize new object instantiation on repetitive methods.
 */
Flixel.FlxTilemap.prototype._flashRect = null;
/**
 * Internal reference to the bitmap data object that stores the original tile graphics.
 */
Flixel.FlxTilemap.prototype._tiles = null;
/**
 * Internal list of buffers, one for each camera, used for drawing the tilemaps.
 */
Flixel.FlxTilemap.prototype._buffers = null;
/**
 * Internal representation of the actual tile data, as a large 1D array of integers.
 */
Flixel.FlxTilemap.prototype._data = null;
/**
 * Internal representation of rectangles, one for each tile in the entire tilemap, used to speed up drawing.
 */
Flixel.FlxTilemap.prototype._rects = null;
/**
 * Internal, the width of a single tile.
 */
Flixel.FlxTilemap.prototype._tileWidth = 0;
/**
 * Internal, the height of a single tile.
 */
Flixel.FlxTilemap.prototype._tileHeight = 0;
/**
 * Internal collection of tile objects, one for each type of tile in the map (NOTE one for every single tile in the whole map).
 */
Flixel.FlxTilemap.prototype._tileObjects = null;
/**
 * Internal, used for rendering the debug bounding box display.
 */
Flixel.FlxTilemap.prototype._debugTileNotSolid = null;
/**
 * Internal, used for rendering the debug bounding box display.
 */
Flixel.FlxTilemap.prototype._debugTilePartial = null;
/**
 * Internal, used for rendering the debug bounding box display.
 */
Flixel.FlxTilemap.prototype._debugTileSolid = null;
/**
 * Internal, used for rendering the debug bounding box display.
 */
Flixel.FlxTilemap.prototype._debugRect = null;
/**
 * Internal flag for checking to see if we need to refresh the tilemap display to show or hide the bounding boxes.
 */
Flixel.FlxTilemap.prototype._lastVisualDebug = false;
/**
 * Internal, used to sort of insert blank tiles in front of the tiles in the provided graphic.
 */
Flixel.FlxTilemap.prototype._startingIndex = 0;
/**
 * The texture X offset.
 */
Flixel.FlxTilemap.prototype.offsetX = 0;
/**
 * The texture Y offset.
 */
Flixel.FlxTilemap.prototype.offsetY = 0;

/**
 * Clean up memory.
 */
Flixel.FlxTilemap.prototype.destroy = function()
{
	this._flashPoint = null;
	this._flashRect = null;
	this._tiles = null;

	var i = 0;
	var l = 0;

	if (this._tileObjects !== null) {
		i = 0;
		l = this._tileObjects.length;
		while (i < l)
			this._tileObjects[i++].destroy();
		this._tileObjects = null;
	}

	if (this._buffers !== null) {
		i = 0;
		l = this._buffers.length;
		while (i < l)
			this._buffers[i++].destroy();
		this._buffers = null;
	}

	this._data = null;
	this._rects = null;
	this._debugTileNotSolid = null;
	this._debugTilePartial = null;
	this._debugTileSolid = null;
	this._debugRect = null;

	Flixel.FlxTilemap.parent.destroy.apply(this);
};

/**
 * Load the tilemap with string data and a tile graphic.
 * 
 * @param MapData
 *            A string of comma and line-return delineated indices indicating what order the tiles should go in.
 * @param TileGraphic
 *            All the tiles you want to use, arranged in a strip corresponding to the numbers in MapData.
 * @param TileWidth
 *            The width of your tiles (e.g. 8) - defaults to height of the tile graphic if unspecified.
 * @param TileHeight
 *            The height of your tiles (e.g. 8) - defaults to width if unspecified.
 * @param AutoTile
 *            Whether to load the map using an automatic tile placement algorithm. Setting this to either AUTO or ALT will override any values you put for StartingIndex, DrawIndex, or CollideIndex.
 * @param StartingIndex
 *            Used to sort of insert empty tiles in front of the provided graphic. Default is 0, usually safest ot leave it at that. Ignored if AutoTile is set.
 * @param DrawIndex
 *            Initializes all tile objects equal to and after this index as visible. Default value is 1. Ignored if AutoTile is set.
 * @param CollideIndex
 *            Initializes all tile objects equal to and after this index as allowCollisions = ANY. Default value is 1. Ignored if AutoTile is set. Can override and customize per-tile-type collision
 *            behavior using <code>setTileProperties()</code>.
 * 
 * @return A pointer this instance of FlxTilemap, for chaining as usual :)
 */
Flixel.FlxTilemap.prototype.loadMap = function(MapData, TileGraphic, TileWidth, TileHeight, AutoTile, StartingIndex, DrawIndex, CollideIndex, offsetX, offsetY)
{
	TileWidth = TileWidth || 0;
	TileHeight = TileHeight || 0;
	StartingIndex = StartingIndex || 0;
	DrawIndex = (DrawIndex === undefined) ? 1 : DrawIndex;
	CollideIndex = (CollideIndex === undefined) ? 1 : CollideIndex;
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	AutoTile = (AutoTile === undefined) ? Flixel.FlxTilemap.OFF : AutoTile;

	this.auto = AutoTile;
	this._startingIndex = (StartingIndex <= 0) ? 0 : StartingIndex;
	this.offsetX = offsetX;
	this.offsetY = offsetY;

	// Figure out the map dimensions based on the data string
	var columns;
	var rows = MapData.split("\n");
	this.heightInTiles = rows.length;
	this._data = [];
	var row = 0;
	var column;
	while (row < this.heightInTiles) {
		columns = rows[row++].split(",");
		if (columns.length <= 1) {
			this.heightInTiles = this.heightInTiles - 1;
			continue;
		}
		if (this.widthInTiles === 0)
			this.widthInTiles = columns.length;
		column = 0;
		while (column < this.widthInTiles)
			this._data.push(uint(columns[column++]));
	}

	// Pre-process the map data if it's auto-tiled
	var i;
	this.totalTiles = this.widthInTiles * this.heightInTiles;
	if (this.auto > Flixel.FlxTilemap.OFF) {
		this._startingIndex = 1;
		DrawIndex = 1;
		CollideIndex = 1;
		i = 0;
		while (i < this.totalTiles)
			this.autoTile(i++);
	}

	// Figure out the size of the tiles
	this._tiles = Flixel.FlxG.addBitmap(TileGraphic);
	this._tileWidth = TileWidth;
	if (this._tileWidth === 0)
		this._tileWidth = this._tiles.height;
	this._tileHeight = TileHeight;
	if (this._tileHeight === 0)
		this._tileHeight = this._tileWidth;

	// Create some tile objects that we'll use for overlap checks (one for each tile)
	i = 0;
	var l = ((this._tiles.width / (this._tileWidth + this.offsetX)) * (this._tiles.height / (this._tileHeight + this.offsetY))) + this._startingIndex;
	this._tileObjects = new Array(l);
	while (i < l) {
		this._tileObjects[i] = new Flixel.system.FlxTile(this, i, this._tileWidth, this._tileHeight, (i >= DrawIndex), (i >= CollideIndex) ? this.allowCollisions : Flixel.FlxObject.NONE);
		i++;
	}

	// Create debug tiles for rendering bounding boxes on demand
	this._debugTileNotSolid = this.makeDebugTile(Flixel.FlxG.BLUE);
	this._debugTilePartial = this.makeDebugTile(Flixel.FlxG.PINK);
	this._debugTileSolid = this.makeDebugTile(Flixel.FlxG.GREEN);
	this._debugRect = new Flixel.FlxRect(0, 0, this._tileWidth, this._tileHeight);

	// Then go through and create the actual map
	this.width = this.widthInTiles * this._tileWidth;
	this.height = this.heightInTiles * this._tileHeight;
	this._rects = new Array(this.totalTiles);
	i = 0;
	while (i < this.totalTiles)
		this.updateTile(i++);

	return this;
};

/**
 * Internal function to clean up the map loading code. Just generates a wireframe box the size of a tile with the specified color.
 */
Flixel.FlxTilemap.prototype.makeDebugTile = function(Color)
{
	var debugTile = new BitmapData(this._tileWidth, this._tileHeight, true, 0);

	var gfx = Flixel.FlxG.flashGfx;
	gfx.clearRect(0, 0, Flixel.FlxG.flashGfxSprite.width, Flixel.FlxG.flashGfxSprite.height);
	gfx.lineStyle = BitmapData.makeRGBA(Color);//(1, 0.5);
	gfx.beginPath();
	gfx.moveTo(0, 0);
	gfx.lineTo(this._tileWidth - 1, 0);
	gfx.lineTo(this._tileWidth - 1, this._tileHeight - 1);
	gfx.lineTo(0, this._tileHeight - 1);
	gfx.lineTo(0, 0);
	gfx.stroke();

	debugTile.copyPixels(Flixel.FlxG.flashGfxSprite, new Flixel.FlxRect(0, 0, this._tileWidth, this._tileHeight), new Flixel.FlxPoint(0, 0));
	return debugTile;
};

/**
 * Main logic loop for tilemap is pretty simple, just checks to see if visual debug got turned on. If it did, the tilemap is flagged as dirty so it will be redrawn with debug info on the next draw
 * call.
 */
Flixel.FlxTilemap.prototype.update = function()
{
	if (this._lastVisualDebug != Flixel.FlxG.visualDebug) {
		this._lastVisualDebug = Flixel.FlxG.visualDebug;
		this.setDirty();
	}
};

/**
 * Internal function that actually renders the tilemap to the tilemap buffer. Called by draw().
 * 
 * @param Buffer
 *            The <code>FlxTilemapBuffer</code> you are rendering to.
 * @param Camera
 *            The related <code>FlxCamera</code>, mainly for scroll values.
 */
Flixel.FlxTilemap.prototype.drawTilemap = function(Buffer, Camera)
{
	Buffer.fill();

	// Copy tile images into the tile buffer
	this._point.x = int(Camera.scroll.x * this.scrollFactor.x) - this.x; // modified from getScreenXY()
	this._point.y = int(Camera.scroll.y * this.scrollFactor.y) - this.y;
	var screenXInTiles = int((this._point.x + ((this._point.x > 0) ? 0.0000001 : -0.0000001)) / this._tileWidth);
	var screenYInTiles = int((this._point.y + ((this._point.y > 0) ? 0.0000001 : -0.0000001)) / this._tileHeight);
	var screenRows = Buffer.rows;
	var screenColumns = Buffer.columns;

	// Bound the upper left corner
	if (screenXInTiles < 0)
		screenXInTiles = 0;
	if (screenXInTiles > this.widthInTiles - screenColumns)
		screenXInTiles = this.widthInTiles - screenColumns;
	if (screenYInTiles < 0)
		screenYInTiles = 0;
	if (screenYInTiles > this.heightInTiles - screenRows)
		screenYInTiles = this.heightInTiles - screenRows;

	var rowIndex = screenYInTiles * this.widthInTiles + screenXInTiles;
	this._flashPoint.y = 0;
	var row = 0;
	var column;
	var columnIndex;
	var tile;
	var debugTile;
	while (row < screenRows) {
		columnIndex = rowIndex;
		column = 0;
		this._flashPoint.x = 0;
		while (column < screenColumns) {
			this._flashRect = this._rects[columnIndex];
			// Check if the rectangle is null
			if (this._flashRect !== null) {
				Buffer.getPixels().copyPixels(this._tiles, this._flashRect, this._flashPoint, null, null, true);
				// Render the visual debug tile
				if (Flixel.FlxG.visualDebug && !this.ignoreDrawDebug) {
					tile = this._tileObjects[this._data[columnIndex]];
					if (tile !== null) {
						if (tile.allowCollisions <= Flixel.FlxObject.NONE)
							debugTile = this._debugTileNotSolid; // blue
						else if (tile.allowCollisions != Flixel.FlxObject.ANY)
							debugTile = this._debugTilePartial; // pink
						else
							debugTile = this._debugTileSolid; // green
						this._flashPoint.x += tile.offset.x;
						this._flashPoint.y += tile.offset.y;
						Buffer.getPixels().copyPixels(debugTile, this._debugRect, this._flashPoint, null, null, true);
						this._flashPoint.x -= tile.offset.x;
						this._flashPoint.y -= tile.offset.y;
					}
				}
			}
			this._flashPoint.x += this._tileWidth;
			column++;
			columnIndex++;
		}
		rowIndex += this.widthInTiles;
		this._flashPoint.y += this._tileHeight;
		row++;
	}
	Buffer.x = screenXInTiles * this._tileWidth;
	Buffer.y = screenYInTiles * this._tileHeight;
};

/**
 * Draws the tilemap buffers to the cameras and handles flickering.
 */
Flixel.FlxTilemap.prototype.draw = function()
{
	if (this._flickerTimer !== 0) {
		this._flicker = !this._flicker;
		if (this.flicker)
			return;
	}

	var camera = Flixel.FlxG.activeCamera;
	if (this.cameras === null || this.cameras === undefined)
		this.cameras = Flixel.FlxG.cameras;
	if (this.cameras.indexOf(camera) == -1)
		return;

	var buffer;
	var i = this.cameras.indexOf(camera);
	if (this._buffers[i] === null || this._buffers[i] === undefined)
		this._buffers[i] = new Flixel.system.FlxTilemapBuffer(this._tileWidth, this._tileHeight, this.widthInTiles, this.heightInTiles, camera);
	buffer = this._buffers[i++];
	if (!buffer.dirty) {
		this._point.x = this.x - int(camera.scroll.x * this.scrollFactor.x) + buffer.x; // copied from getScreenXY()
		this._point.y = this.y - int(camera.scroll.y * this.scrollFactor.y) + buffer.y;
		buffer.dirty = (this._point.x > 0) || (this._point.y > 0) || (this._point.x + buffer.width < camera.width) || (this._point.y + buffer.height < camera.height);
	}
	
	if (buffer.dirty) {
		this.drawTilemap(buffer, camera);
		buffer.dirty = false;
	}
	if(Flixel.FlxG.keys.justPressed("Q"))
		console.log(this._flashPoint.x);

	this._flashPoint.x = this.x - int(camera.scroll.x * this.scrollFactor.x) + buffer.x; // copied from getScreenXY()
	this._flashPoint.y = this.y - int(camera.scroll.y * this.scrollFactor.y) + buffer.y;
	this._flashPoint.x += (this._flashPoint.x > 0) ? 0.0000001 : -0.0000001;
	this._flashPoint.y += (this._flashPoint.y > 0) ? 0.0000001 : -0.0000001;

	buffer.draw(camera, this._flashPoint);
	Flixel.FlxBasic.VISIBLECOUNT++;
};

/**
 * Fetches the tilemap data array.
 * 
 * @param Simple
 *            If true, returns the data as copy, as a series of 1s and 0s (useful for auto-tiling stuff). Default value is false, meaning it will return the actual data array (NOT a copy).
 * 
 * @return An array the size of the tilemap full of integers indicating tile placement.
 */
Flixel.FlxTilemap.prototype.getData = function(Simple)
{
	Simple = (Simple === undefined) ? false : Simple;

	if (!Simple)
		return this._data;

	var i = 0;
	var l = this._data.length;
	var data = new Array(l);
	while (i < l) {
		data[i] = (this._tileObjects[this._data[i]].allowCollisions > 0) ? 1 : 0;
		i++;
	}
	return data;
};

/**
 * Set the dirty flag on all the tilemap buffers. Basically forces a reset of the drawn tilemaps, even if it wasn'tile necessary.
 * 
 * @param Dirty
 *            Whether to flag the tilemap buffers as dirty or not.
 */
Flixel.FlxTilemap.prototype.setDirty = function(Dirty)
{
	Dirty = (Dirty === undefined) ? true : Dirty;
	var i = 0;
	var l = this._buffers.length;
	while (i < l)
		this._buffers[i++].dirty = Dirty;
};

/**
 * Find a path through the tilemap. Any tile with any collision flags set is treated as impassable. If no path is discovered then a null reference is returned.
 * 
 * @param Start
 *            The start point in world coordinates.
 * @param End
 *            The end point in world coordinates.
 * @param Simplify
 *            Whether to run a basic simplification algorithm over the path data, removing extra points that are on the same line. Default value is true.
 * @param RaySimplify
 *            Whether to run an extra raycasting simplification algorithm over the remaining path data. This can result in some close corners being cut, and should be used with care if at all (yet).
 *            Default value is false.
 * @param WideDiagonal
 *            Whether to require an additional tile to make diagonal movement. Default value is true;
 * @return A <code>FlxPath</code> from the start to the end. If no path could be found, then a null reference is returned.
 */
Flixel.FlxTilemap.prototype.findPath = function(Start, End, Simplify, RaySimplify, WideDiagonal)
{
	Simplify = (Simplify === undefined) ? true : Simplify;
	RaySimplify = (RaySimplify === undefined) ? false : RaySimplify;
	WideDiagonal = (WideDiagonal === undefined) ? true : WideDiagonal;

	// figure out what tile we are starting and ending on.
	var startIndex = int((Start.y - this.y) / this._tileHeight) * this.widthInTiles + int((Start.x - this.x) / this._tileWidth);
	var endIndex = int((End.y - this.y) / this._tileHeight) * this.widthInTiles + int((End.x - this.x) / this._tileWidth);
	
	// check that the start and end are clear.
	if ((this._tileObjects[this._data[startIndex]].allowCollisions > 0) || (this._tileObjects[this._data[endIndex]].allowCollisions > 0))
		return null;

	// figure out how far each of the tiles is from the starting tile
	var distances = this.computePathDistance(startIndex, endIndex, WideDiagonal);
	if (distances === null)
		return null;

	// then count backward to find the shortest path.
	var points = [];
	this.walkPath(distances, endIndex, points);

	// reset the start and end points to be exact
	var node;
	node = points[points.length - 1];
	node.x = Start.x;
	node.y = Start.y;
	node = points[0];
	node.x = End.x;
	node.y = End.y;

	// some simple path cleanup options
	if (Simplify)
		this.simplifyPath(points);
	if (RaySimplify)
		this.raySimplifyPath(points);

	// finally load the remaining points into a new path object and return it
	var path = new Flixel.FlxPath();
	var i = points.length - 1;
	while (i >= 0) {
		node = points[i--];
		if (node !== null)
			path.addPoint(node, true);
	}
	return path;
};

/**
 * Pathfinding helper function, strips out extra points on the same line.
 * 
 * @param Points
 *            An array of <code>FlxPoint</code> nodes.
 */
Flixel.FlxTilemap.prototype.simplifyPath = function(Points)
{
	var deltaPrevious;
	var deltaNext;
	var last = Points[0];
	var node;
	var i = 1;
	var l = Points.length - 1;
	while (i < l) {
		node = Points[i];
		deltaPrevious = (node.x - last.x) / (node.y - last.y);
		deltaNext = (node.x - Points[i + 1].x) / (node.y - Points[i + 1].y);
		if ((last.x == Points[i + 1].x) || (last.y == Points[i + 1].y) || (deltaPrevious == deltaNext))
			Points[i] = null;
		else
			last = node;
		i++;
	}
};

/**
 * Pathfinding helper function, strips out even more points by raycasting from one point to the next and dropping unnecessary points.
 * 
 * @param Points
 *            An array of <code>FlxPoint</code> nodes.
 */
Flixel.FlxTilemap.prototype.raySimplifyPath = function(Points)
{
	var source = Points[0];
	var lastIndex = -1;
	var node;
	var i = 1;
	var l = Points.length;
	while (i < l) {
		node = Points[i++];
		if (node === null)
			continue;
		if (this.ray(source, node, this._point)) {
			if (lastIndex >= 0)
				Points[lastIndex] = null;
		} else
			source = Points[lastIndex];
		lastIndex = i - 1;
	}
};

/**
 * Pathfinding helper function, floods a grid with distance information until it finds the end point. NOTE: Currently this process does NOT use any kind of fancy heuristic! It's pretty brute.
 * 
 * @param StartIndex
 *            The starting tile's map index.
 * @param EndIndex
 *            The ending tile's map index.
 * 
 * @return A Flash <code>Array</code> of <code>FlxPoint</code> nodes. If the end tile could not be found, then a null <code>Array</code> is returned instead.
 */
Flixel.FlxTilemap.prototype.computePathDistance = function(StartIndex, EndIndex, WideDiagonal)
{
	// Create a distance-based representation of the tilemap.
	// All walls are flagged as -2, all open areas as -1.
	var mapSize = this.widthInTiles * this.heightInTiles;
	var distances = new Array(mapSize);
	var i = 0;
	while (i < mapSize) {
		if (this._tileObjects[this._data[i]].allowCollisions)
			distances[i] = -2;
		else
			distances[i] = -1;
		i++;
	}

	distances[StartIndex] = 0;
	var distance = 1;
	var neighbors;
	neighbors = []; // Moved to the bottom line due to a weird error on the semantic validator ._.
	neighbors.push(StartIndex);
	var current;
	var currentIndex;
	var left;
	var right;
	var up;
	var down;
	var currentLength;
	var foundEnd = false;
	while (neighbors.length > 0) {
		current = neighbors;
		neighbors = [];

		i = 0;
		currentLength = current.length;
		while (i < currentLength) {
			currentIndex = current[i++];
			if (currentIndex == EndIndex) {
				foundEnd = true;
				neighbors.length = 0;
				break;
			}

			// basic map bounds
			left = currentIndex % this.widthInTiles > 0;
			right = currentIndex % this.widthInTiles < this.widthInTiles - 1;
			up = currentIndex / this.widthInTiles > 0;
			down = currentIndex / this.widthInTiles < this.heightInTiles - 1;

			var index;
			if (up) {
				index = currentIndex - this.widthInTiles;
				if (distances[index] == -1) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
			if (right) {
				index = currentIndex + 1;
				if (distances[index] == -1) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
			if (down) {
				index = currentIndex + this.widthInTiles;
				if (distances[index] == -1) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
			if (left) {
				index = currentIndex - 1;
				if (distances[index] == -1) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
			if (up && right) {
				index = currentIndex - this.widthInTiles + 1;
				if (WideDiagonal && (distances[index] == -1) && (distances[currentIndex - this.widthInTiles] >= -1) && (distances[currentIndex + 1] >= -1)) {
					distances[index] = distance;
					neighbors.push(index);
				} else if (!WideDiagonal && (distances[index] == -1)) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
			if (right && down) {
				index = currentIndex + this.widthInTiles + 1;
				if (WideDiagonal && (distances[index] == -1) && (distances[currentIndex + this.widthInTiles] >= -1) && (distances[currentIndex + 1] >= -1)) {
					distances[index] = distance;
					neighbors.push(index);
				} else if (!WideDiagonal && (distances[index] == -1)) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
			if (left && down) {
				index = currentIndex + this.widthInTiles - 1;
				if (WideDiagonal && (distances[index] == -1) && (distances[currentIndex + this.widthInTiles] >= -1) && (distances[currentIndex - 1] >= -1)) {
					distances[index] = distance;
					neighbors.push(index);
				} else if (!WideDiagonal && (distances[index] == -1)) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
			if (up && left) {
				index = currentIndex - this.widthInTiles - 1;
				if (WideDiagonal && (distances[index] == -1) && (distances[currentIndex - this.widthInTiles] >= -1) && (distances[currentIndex - 1] >= -1)) {
					distances[index] = distance;
					neighbors.push(index);
				} else if (!WideDiagonal && (distances[index] == -1)) {
					distances[index] = distance;
					neighbors.push(index);
				}
			}
		}
		distance++;
	}
	if (!foundEnd)
		distances = null;
	return distances;
};

/**
 * Pathfinding helper function, recursively walks the grid and finds a shortest path back to the start.
 * 
 * @param Data
 *            A Flash <code>Array</code> of distance information.
 * @param Start
 *            The tile we're on in our walk backward.
 * @param Points
 *            A Flash <code>Array</code> of <code>FlxPoint</code> nodes composing the path from the start to the end, compiled in reverse order.
 */
Flixel.FlxTilemap.prototype.walkPath = function(Data, Start, Points)
{
	Points.push(new Flixel.FlxPoint(this.x + uint(Start % this.widthInTiles) * this._tileWidth + this._tileWidth * 0.5, this.y + uint(Start / this.widthInTiles) * this._tileHeight + this._tileHeight * 0.5));
	if (Data[Start] === 0)
		return;

	// basic map bounds
	var left = Start % this.widthInTiles > 0;
	var right = Start % this.widthInTiles < this.widthInTiles - 1;
	var up = Start / this.widthInTiles > 0;
	var down = Start / this.widthInTiles < this.heightInTiles - 1;

	var current = Data[Start];
	var i;
	if (up) {
		i = Start - this.widthInTiles;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
	if (right) {
		i = Start + 1;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
	if (down) {
		i = Start + this.widthInTiles;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
	if (left) {
		i = Start - 1;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
	if (up && right) {
		i = Start - this.widthInTiles + 1;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
	if (right && down) {
		i = Start + this.widthInTiles + 1;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
	if (left && down) {
		i = Start + this.widthInTiles - 1;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
	if (up && left) {
		i = Start - this.widthInTiles - 1;
		if ((Data[i] >= 0) && (Data[i] < current)) {
			this.walkPath(Data, i, Points);
			return;
		}
	}
};

/**
 * Checks to see if some <code>FlxObject</code> overlaps this <code>FlxObject</code> object in world space. If the group has a LOT of things in it, it might be faster to use
 * <code>FlxG.overlaps()</code>. WARNING: Currently tilemaps do NOT support screen space overlap checks!
 * 
 * @param Object
 *            The object being tested.
 * @param InScreenSpace
 *            Whether to take scroll factors into account when checking for overlap.
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will just grab the first global camera.
 * 
 * @return Whether or not the two objects overlap.
 */
Flixel.FlxTilemap.prototype.overlaps = function(ObjectOrGroup, InScreenSpace, Camera)
{
	InScreenSpace = (InScreenSpace === undefined) ? false : InScreenSpace;

	if (ObjectOrGroup instanceof Flixel.FlxGroup) {
		var results = false;
		var basic;
		var i = 0;
		var members = ObjectOrGroup.members;
		while (i < length) {
			basic = members[i++];
			if (basic instanceof Flixel.FlxObject) {
				if (this.overlapsWithCallback(basic))
					results = true;
			} else {
				if (this.overlaps(basic, InScreenSpace, Camera))
					results = true;
			}
		}
		return results;
	} else if (ObjectOrGroup instanceof Flixel.FlxObject)
		return this.overlapsWithCallback(ObjectOrGroup);
	return false;
};

/**
 * Checks to see if this <code>FlxObject</code> were located at the given position, would it overlap the <code>FlxObject</code> or <code>FlxGroup</code>? This is distinct from overlapsPoint(),
 * which just checks that point, rather than taking the object's size into account. WARNING: Currently tilemaps do NOT support screen space overlap checks!
 * 
 * @param X
 *            The X position you want to check. Pretends this object (the caller, not the parameter) is located here.
 * @param Y
 *            The Y position you want to check. Pretends this object (the caller, not the parameter) is located here.
 * @param ObjectOrGroup
 *            The object or group being tested.
 * @param InScreenSpace
 *            Whether to take scroll factors into account when checking for overlap. Default is false, or "only compare in world space."
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will just grab the first global camera.
 * 
 * @return Whether or not the two objects overlap.
 */
Flixel.FlxTilemap.prototype.overlapsAt = function(X, Y, ObjectOrGroup, InScreenSpace, Camera)
{
	InScreenSpace = (InScreenSpace === undefined) ? false : InScreenSpace;

	if (ObjectOrGroup instanceof Flixel.FlxGroup) {
		var results = false;
		var basic;
		var i = 0;
		var members = ObjectOrGroup.members;
		while (i < length) {
			basic = members[i++];
			if (basic instanceof Flixel.FlxObject) {
				this._point.x = X;
				this._point.y = Y;
				if (this.overlapsWithCallback(basic, null, false, this._point))
					results = true;
			} else {
				if (this.overlapsAt(X, Y, basic, InScreenSpace, Camera))
					results = true;
			}
		}
		return results;
	} else if (ObjectOrGroup instanceof Flixel.FlxObject) {
		this._point.x = X;
		this._point.y = Y;
		return this.overlapsWithCallback(ObjectOrGroup, null, false, this._point);
	}
	return false;
};

/**
 * Checks if the Object overlaps any tiles with any collision flags set, and calls the specified callback function (if there is one). Also calls the tile's registered callback if the filter matches.
 * 
 * @param Object
 *            The <code>FlxObject</code> you are checking for overlaps against.
 * @param Callback
 *            An optional function that takes the form "myCallback(Object1:FlxObject,Object2:FlxObject)", where Object1 is a FlxTile object, and Object2 is the object passed in in the first parameter
 *            of this method.
 * @param FlipCallbackParams
 *            Used to preserve A-B list ordering from FlxObject.separate() - returns the FlxTile object as the second parameter instead.
 * @param Position
 *            Optional, specify a custom position for the tilemap (useful for overlapsAt()-type funcitonality).
 * 
 * @return Whether there were overlaps, or if a callback was specified, whatever the return value of the callback was.
 */
Flixel.FlxTilemap.prototype.overlapsWithCallback = function(Object, Callback, FlipCallbackParams, Position)
{
	FlipCallbackParams = (FlipCallbackParams === undefined) ? false : FlipCallbackParams;
	Position = (Position === undefined) ? null : Position;

	var results = false;

	var X = this.x;
	var Y = this.y;
	if (Position !== null) {
		X = Position.x;
		Y = Position.y;
	}

	// Figure out what tiles we need to check against
	var selectionX = Math.floor((Object.x - X) / this._tileWidth);
	var selectionY = Math.floor((Object.y - Y) / this._tileHeight);
	var selectionWidth = selectionX + (Math.ceil(Object.width / this._tileWidth)) + 1;
	var selectionHeight = selectionY + Math.ceil(Object.height / this._tileHeight) + 1;

	// Then bound these coordinates by the map edges
	if (selectionX < 0)
		selectionX = 0;
	if (selectionY < 0)
		selectionY = 0;
	if (selectionWidth > this.widthInTiles)
		selectionWidth = this.widthInTiles;
	if (selectionHeight > this.heightInTiles)
		selectionHeight = this.heightInTiles;

	// Then loop through this selection of tiles and call FlxObject.separate() accordingly
	var rowStart = selectionY * this.widthInTiles;
	var row = selectionY;
	var column;
	var tile;
	var overlapFound;
	var deltaX = X - this.last.x;
	var deltaY = Y - this.last.y;
	while (row < selectionHeight) {
		column = selectionX;
		while (column < selectionWidth) {
			overlapFound = false;
			tile = this._tileObjects[this._data[rowStart + column]];
			if (tile.allowCollisions) {
				tile.x = X + column * this._tileWidth + tile.offset.x;
				tile.y = Y + row * this._tileHeight + tile.offset.y;
				tile.last.x = tile.x - deltaX;
				tile.last.y = tile.y - deltaY;
				if (Callback !== null) {
					if (FlipCallbackParams)
						overlapFound = Callback(Object, tile);
					else
						overlapFound = Callback(tile, Object);
				} else
					overlapFound = (Object.x + Object.width > tile.x) && (Object.x < tile.x + tile.width) && (Object.y + Object.height > tile.y) && (Object.y < tile.y + tile.height);
				if (overlapFound) {
					if ((tile.callback !== null) && ((tile.filter === null) || (Object instanceof tile.filter))) {
						tile.mapIndex = rowStart + column;
						tile.callback(tile, Object);
					}
					results = true;
				}
			} else if ((tile.callback !== null) && ((tile.filter === null) || (Object instanceof tile.filter))) {
				tile.mapIndex = rowStart + column;
				tile.callback(tile, Object);
			}
			column++;
		}
		rowStart += this.widthInTiles;
		row++;
	}
	return results;
};

/**
 * Checks to see if a point in 2D world space overlaps this <code>FlxObject</code> object.
 * 
 * @param Point
 *            The point in world space you want to check.
 * @param InScreenSpace
 *            Whether to take scroll factors into account when checking for overlap.
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will just grab the first global camera.
 * 
 * @return Whether or not the point overlaps this object.
 */
Flixel.FlxTilemap.prototype.overlapsPoint = function(Point, InScreenSpace, Camera)
{
	InScreenSpace = (InScreenSpace === undefined) ? false : InScreenSpace;

	if (!InScreenSpace)
		return this._tileObjects[this._data[uint(uint((Point.y - this.y) / this._tileHeight) * this.widthInTiles + (Point.x - this.x) / this._tileWidth)]].allowCollisions > 0;

	if (Camera === null)
		Camera = Flixel.FlxG.camera;
	Point.x = Point.x - Camera.scroll.x;
	Point.y = Point.y - Camera.scroll.y;
	this.getScreenXY(this._point, Camera);
	return this._tileObjects[this._data[uint(uint((Point.y - this._point.y) / this._tileHeight) * this.widthInTiles + (Point.x - this._point.x) / this._tileWidth)]].allowCollisions > 0;
};

/**
 * Check the value of a particular tile.
 * 
 * @param X
 *            The X coordinate of the tile (in tiles, not pixels).
 * @param Y
 *            The Y coordinate of the tile (in tiles, not pixels).
 * 
 * @return A uint containing the value of the tile at this spot in the array.
 */
Flixel.FlxTilemap.prototype.getTile = function(X, Y)
{
	return this._data[Y * this.widthInTiles + X];
};

/**
 * Get the value of a tile in the tilemap by index.
 * 
 * @param Index
 *            The slot in the data array (Y * widthInTiles + X) where this tile is stored.
 * 
 * @return A uint containing the value of the tile at this spot in the array.
 */
Flixel.FlxTilemap.prototype.getTileByIndex = function(Index)
{
	return this._data[Index];
};

/**
 * Returns a new Flash <code>Array</code> full of every map index of the requested tile type.
 * 
 * @param Index
 *            The requested tile type.
 * 
 * @return An <code>Array</code> with a list of all map indices of that tile type.
 */
Flixel.FlxTilemap.prototype.getTileInstances = function(Index)
{
	var array = null;
	var i = 0;
	var l = this.widthInTiles * this.heightInTiles;
	while (i < l) {
		if (this._data[i] == Index) {
			if (array === null)
				array = [];
			array.push(i);
		}
		i++;
	}

	return array;
};

/**
 * Returns a new Flash <code>Array</code> full of every coordinate of the requested tile type.
 * 
 * @param Index
 *            The requested tile type.
 * @param Midpoint
 *            Whether to return the coordinates of the tile midpoint, or upper left corner. Default is true, return midpoint.
 * 
 * @return An <code>Array</code> with a list of all the coordinates of that tile type.
 */
Flixel.FlxTilemap.prototype.getTileCoords = function(Index, Midpoint)
{
	Midpoint = (Midpoint === undefined) ? true : Midpoint;
	var array = null;

	var point;
	var i = 0;
	var l = this.widthInTiles * this.heightInTiles;
	while (i < l) {
		if (this._data[i] == Index) {
			point = new Flixel.FlxPoint(this.x + uint(i % this.widthInTiles) * this._tileWidth, this.y + uint(i / this.widthInTiles) * this._tileHeight);
			if (Midpoint) {
				point.x += this._tileWidth * 0.5;
				point.y += this._tileHeight * 0.5;
			}
			if (array === null)
				array = [];
			array.push(point);
		}
		i++;
	}

	return array;
};

/**
 * Change the data and graphic of a tile in the tilemap.
 * 
 * @param X
 *            The X coordinate of the tile (in tiles, not pixels).
 * @param Y
 *            The Y coordinate of the tile (in tiles, not pixels).
 * @param Tile
 *            The new integer data you wish to inject.
 * @param UpdateGraphics
 *            Whether the graphical representation of this tile should change.
 * 
 * @return Whether or not the tile was actually changed.
 */
Flixel.FlxTilemap.prototype.setTile = function(X, Y, Tile, UpdateGraphics)
{
	if ((X >= this.widthInTiles) || (Y >= this.heightInTiles))
		return false;

	UpdateGraphics = (UpdateGraphics === undefined) ? true : UpdateGraphics;

	return this.setTileByIndex(Y * this.widthInTiles + X, Tile, UpdateGraphics);
};

/**
 * Change the data and graphic of a tile in the tilemap.
 * 
 * @param Index
 *            The slot in the data array (Y * widthInTiles + X) where this tile is stored.
 * @param Tile
 *            The new integer data you wish to inject.
 * @param UpdateGraphics
 *            Whether the graphical representation of this tile should change.
 * 
 * @return Whether or not the tile was actually changed.
 */
Flixel.FlxTilemap.prototype.setTileByIndex = function(Index, Tile, UpdateGraphics)
{
	UpdateGraphics = (UpdateGraphics === undefined) ? true : UpdateGraphics;

	if (Index >= this._data.length)
		return false;

	var ok = true;
	this._data[Index] = Tile;

	if (!UpdateGraphics)
		return ok;

	this.setDirty();

	if (this.auto == Flixel.FlxTilemap.OFF) {
		this.updateTile(Index);
		return ok;
	}

	// If this map is autotiled and it changes, locally update the arrangement
	var i;
	var row = int(Index / this.widthInTiles) - 1;
	var rowLength = row + 3;
	var column = Index % this.widthInTiles - 1;
	var columnHeight = column + 3;
	while (row < rowLength) {
		column = columnHeight - 3;
		while (column < columnHeight) {
			if ((row >= 0) && (row < this.heightInTiles) && (column >= 0) && (column < this.widthInTiles)) {
				i = row * this.widthInTiles + column;
				this.autoTile(i);
				this.updateTile(i);
			}
			column++;
		}
		row++;
	}

	return ok;
};

/**
 * Adjust collision settings and/or bind a callback function to a range of tiles. This callback function, if present, is triggered by calls to overlap() or overlapsWithCallback().
 * 
 * @param Tile
 *            The tile or tiles you want to adjust.
 * @param AllowCollisions
 *            Modify the tile or tiles to only allow collisions from certain directions, use FlxObject constants NONE, ANY, LEFT, RIGHT, etc. Default is "ANY".
 * @param Callback
 *            The function to trigger, e.g. <code>lavaCallback(Tile:FlxTile, Object:FlxObject)</code>.
 * @param CallbackFilter
 *            If you only want the callback to go off for certain classes or objects based on a certain class, set that class here.
 * @param Range
 *            If you want this callback to work for a bunch of different tiles, input the range here. Default value is 1.
 */
Flixel.FlxTilemap.prototype.setTileProperties = function(Tile, AllowCollisions, Callback, CallbackFilter, Range)
{
	AllowCollisions = AllowCollisions || 0x1111;
	Range = Range || 1;

	if (Range <= 0)
		Range = 1;
	var tile;
	var i = Tile;
	var l = Tile + Range;
	while (i < l) {
		tile = this._tileObjects[i++];
		tile.allowCollisions = AllowCollisions;
		tile.callback = Callback;
		tile.filter = CallbackFilter;
	}
};

/**
 * Call this function to lock the automatic camera to the map's edges.
 * 
 * @param Camera
 *            Specify which game camera you want. If null getScreenXY() will just grab the first global camera.
 * @param Border
 *            Adjusts the camera follow boundary by whatever number of tiles you specify here. Handy for blocking off deadends that are offscreen, etc. Use a negative number to add padding instead of
 *            hiding the edges.
 * @param UpdateWorld
 *            Whether to update the collision system's world size, default value is true.
 */
Flixel.FlxTilemap.prototype.follow = function(Camera, Border, UpdateWorld)
{
	Border = Border || 0;
	UpdateWorld = (UpdateWorld === undefined) ? true : UpdateWorld;

	if (Camera === null)
		Camera = Flixel.FlxG.camera;
	Camera.setBounds(this.x + Border * this._tileWidth, this.y + Border * this._tileHeight, this.width - Border * this._tileWidth * 2, this.height - Border * this._tileHeight * 2, UpdateWorld);
};

/**
 * Get the world coordinates and size of the entire tilemap as a <code>FlxRect</code>.
 * 
 * @param Bounds
 *            Optional, pass in a pre-existing <code>FlxRect</code> to prevent instantiation of a new object.
 * 
 * @return A <code>FlxRect</code> containing the world coordinates and size of the entire tilemap.
 */
Flixel.FlxTilemap.prototype.getBounds = function(Bounds)
{
	if (Bounds === null)
		Bounds = new Flixel.FlxRect();
	return Bounds.make(this.x, this.y, this.width, this.height);
};

/**
 * Shoots a ray from the start point to the end point. If/when it passes through a tile, it stores that point and returns false.
 * 
 * @param Start
 *            The world coordinates of the start of the ray.
 * @param End
 *            The world coordinates of the end of the ray.
 * @param Result
 *            A <code>Point</code> object containing the first wall impact.
 * @param Resolution
 *            Defaults to 1, meaning check every tile or so. Higher means more checks!
 * @return Returns true if the ray made it from Start to End without hitting anything. Returns false and fills Result if a tile was hit.
 */
Flixel.FlxTilemap.prototype.ray = function(Start, End, Result, Resolution)
{
	Resolution = Resolution || 1;

	var step = this._tileWidth;
	if (this._tileHeight < this._tileWidth)
		step = this._tileHeight;
	step /= Resolution;
	var deltaX = End.x - Start.x;
	var deltaY = End.y - Start.y;
	var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	var steps = Math.ceil(distance / step);
	var stepX = deltaX / steps;
	var stepY = deltaY / steps;
	var curX = Start.x - stepX - this.x;
	var curY = Start.y - stepY - this.y;
	var tileX;
	var tileY;
	var i = 0;
	while (i < steps) {
		curX += stepX;
		curY += stepY;

		if ((curX < 0) || (curX > this.width) || (curY < 0) || (curY > this.height)) {
			i++;
			continue;
		}

		tileX = curX / this._tileWidth;
		tileY = curY / this._tileHeight;
		if (this._tileObjects[this._data[tileY * this.widthInTiles + tileX]].allowCollisions) {
			// Some basic helper stuff
			tileX *= this._tileWidth;
			tileY *= this._tileHeight;
			var rx = 0;
			var ry = 0;
			var q;
			var lx = curX - stepX;
			var ly = curY - stepY;

			// Figure out if it crosses the X boundary
			q = tileX;
			if (deltaX < 0)
				q += this._tileWidth;
			rx = q;
			ry = ly + stepY * ((q - lx) / stepX);
			if ((ry > tileY) && (ry < tileY + this._tileHeight)) {
				if (Result !== null) {
					Result.x = rx;
					Result.y = ry;
				}
				return false;
			}

			// Else, figure out if it crosses the Y boundary
			q = tileY;
			if (deltaY < 0)
				q += this._tileHeight;
			rx = lx + stepX * ((q - ly) / stepY);
			ry = q;
			if ((rx > tileX) && (rx < tileX + this._tileWidth)) {
				if (Result !== null) {
					Result.x = rx;
					Result.y = ry;
				}
				return false;
			}
			return true;
		}
		i++;
	}
	return true;
};

/**
 * Works exactly like ray() except it explicitly returns the hit result. Shoots a ray from the start point to the end point. If/when it passes through a tile, it returns that point. If it does not, it
 * returns null. Usage: FlxPoint hit = tilemap.rayHit(startPoint, endPoint); if (hit !== null) //code ;
 * 
 * @param Start
 *            The world coordinates of the start of the ray.
 * @param End
 *            The world coordinates of the end of the ray.
 * @param Resolution
 *            Defaults to 1, meaning check every tile or so. Higher means more checks!
 * @return Returns null if the ray made it from Start to End without hitting anything. Returns FlxPoint if a tile was hit.
 */
Flixel.FlxTilemap.prototype.rayHit = function(Start, End, Resolution)
{
	Resolution = Resolution || 1;

	var Result = null;
	var step = this._tileWidth;
	if (this._tileHeight < this._tileWidth)
		step = this._tileHeight;
	step /= Resolution;
	var deltaX = End.x - Start.x;
	var deltaY = End.y - Start.y;
	var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	var steps = Math.ceil(distance / step);
	var stepX = deltaX / steps;
	var stepY = deltaY / steps;
	var curX = Start.x - stepX - this.x;
	var curY = Start.y - stepY - this.y;
	var tileX;
	var tileY;
	var i = 0;
	while (i < steps) {
		curX += stepX;
		curY += stepY;

		if ((curX < 0) || (curX > this.width) || (curY < 0) || (curY > this.height)) {
			i++;
			continue;
		}

		tileX = curX / this._tileWidth;
		tileY = curY / this._tileHeight;
		if (this._tileObjects[this._data[tileY * this.widthInTiles + tileX]].allowCollisions) {
			// Some basic helper stuff
			tileX *= this._tileWidth;
			tileY *= this._tileHeight;
			var rx = 0;
			var ry = 0;
			var q;
			var lx = curX - stepX;
			var ly = curY - stepY;

			// Figure out if it crosses the X boundary
			q = tileX;
			if (deltaX < 0)
				q += this._tileWidth;
			rx = q;
			ry = ly + stepY * ((q - lx) / stepX);
			if ((ry > tileY) && (ry < tileY + this._tileHeight)) {
				if (Result !== null) {
					Result.x = rx;
					Result.y = ry;
				}
				return Result;
			}

			// Else, figure out if it crosses the Y boundary
			q = tileY;
			if (deltaY < 0) {
				q += this._tileHeight;
			}
			rx = lx + stepX * ((q - ly) / stepY);
			ry = q;
			if ((rx > tileX) && (rx < tileX + this._tileWidth)) {
				if (Result === null)
					Result = new Flixel.FlxPoint();

				Result.x = rx;
				Result.y = ry;
				return Result;
			}
			return null;
		}
		i++;
	}
	return null;
};

/**
 * Converts a one-dimensional array of tile data to a comma-separated string.
 * 
 * @param Data
 *            An array full of integer tile references.
 * @param Width
 *            The number of tiles in each row.
 * @param Invert
 *            Recommended only for 1-bit arrays - changes 0s to 1s and vice versa.
 * 
 * @return A comma-separated string containing the level data in a <code>FlxTilemap</code>-friendly format.
 */
Flixel.FlxTilemap.arrayToCSV = function(Data, Width, Invert)
{
	Invert = (Invert === undefined) ? false : Invert;

	var row = 0;
	var column;
	var csv = "";
	var Height = Data.length / Width;
	var index;
	while (row < Height) {
		column = 0;
		while (column < Width) {
			index = Data[row * Width + column];
			if (Invert) {
				if (index === 0)
					index = 1;
				else if (index == 1)
					index = 0;
			}

			if (column === 0) {
				if (row === 0)
					csv += index;
				else
					csv += "\n" + index;
			} else
				csv += ", " + index;
			column++;
		}
		row++;
	}
	return csv;
};

/**
 * Converts a <code>TiledMap</code> object to a comma-separated string.
 * 
 * @param Map
 *            A <code>TiledMap</code> instance.
 * @param Layer
 *            Which layer of the <code>TiledMap</code> to use.
 * 
 * @return A comma-separated string containing the level data in a <code>FlxTilemap</code>-friendly format.
 */
Flixel.FlxTilemap.tiledmapToCSV = function(map, layer, tileSet)
{
	var mapLayer = null;

	if (typeof layer === "string")
		mapLayer = map.getLayer(layer);
	else
		mapLayer = map.getLayers()[int(layer)];
	
	if(mapLayer === null || mapLayer === undefined)
		throw new Error("FlxTilemap: Layer " + layer + " do not exist in map!");

	var max = 0xFFFFFF;
	var offset = 0;
	if (tileSet) {
		offset = tileSet.firstGID;
		max = tileSet.numTiles - 1;
	}
	var result = "";
	for (var i = 0; i < mapLayer.tileGIDs.length; i++) {
		var row = mapLayer.tileGIDs[i];
		var chunk = "";
		var id = 0;
		for (var j = 0; j < row.length; j++) {
			id = row[j];
			id -= offset;
			if (id < 0 || id > max)
				id = 0;
			result += chunk;
			chunk = id + ",";
		}
		result += id + "\n";
	}
	return result;
};

/**
 * Converts a <code>BitmapData</code> object to a comma-separated string. Black pixels are flagged as 'solid' by default, non-black pixels are set as non-colliding. Black pixels must be PURE BLACK.
 * 
 * @param bitmapData
 *            A Flash <code>BitmapData</code> object, preferably black and white.
 * @param Invert
 *            Load white pixels as solid instead.
 * @param Scale
 *            Default is 1. Scale of 2 means each pixel forms a 2x2 block of tiles, and so on.
 * @param ColorMap
 *            An array of color values (uint 0xAARRGGBB) in the order they're intended to be assigned as indices
 * 
 * @return A comma-separated string containing the level data in a <code>FlxTilemap</code>-friendly format.
 */
Flixel.FlxTilemap.bitmapToCSV = function(bitmapData, Invert, Scale, ColorMap)
{
	Invert = (Invert === undefined) ? false : Invert;
	Scale = Scale || 1;

	// Import and scale image if necessary
	if (Scale > 1) {
		var bd = bitmapData;
		bitmapData = new BitmapData(bitmapData.width * Scale, bitmapData.height * Scale);
		var mtx = new Matrix();
		mtx.scale(Scale, Scale);
		bitmapData.draw(bd, mtx);
	}

	// Walk image and export pixel values
	var row = 0;
	var column;
	var pixel;
	var csv = "";
	var bitmapWidth = bitmapData.width;
	var bitmapHeight = bitmapData.height;
	while (row < bitmapHeight) {
		column = 0;
		while (column < bitmapWidth) {
			// Decide if this pixel/tile is solid (1) or not (0)
			pixel = bitmapData.getPixel(column, row);
			if (ColorMap !== null)
				pixel = ColorMap.indexOf(pixel);
			else if ((Invert && (pixel > 0)) || (!Invert && (pixel === 0)))
				pixel = 1;
			else
				pixel = 0;

			// Write the result to the string
			if (column === 0) {
				if (row === 0)
					csv += pixel;
				else
					csv += "\n" + pixel;
			} else
				csv += ", " + pixel;
			column++;
		}
		row++;
	}
	return csv;
};

/**
 * Converts a resource image file to a comma-separated string. Black pixels are flagged as 'solid' by default, non-black pixels are set as non-colliding. Black pixels must be PURE BLACK.
 * 
 * @param ImageFile
 *            An embedded graphic, preferably black and white.
 * @param Invert
 *            Load white pixels as solid instead.
 * @param Scale
 *            Default is 1. Scale of 2 means each pixel forms a 2x2 block of tiles, and so on.
 * 
 * @return A comma-separated string containing the level data in a <code>FlxTilemap</code>-friendly format.
 */
Flixel.FlxTilemap.imageToCSV = function(ImageFile, Invert, Scale)
{
	var tmp = BitmapData.fromImage(ImageFile);
	Invert = (Invert === undefined) ? false : Invert;
	Scale = Scale || 1;
	return this.bitmapToCSV(tmp, Invert, Scale);
};

/**
 * An internal function used by the binary auto-tilers.
 * 
 * @param Index
 *            The index of the tile you want to analyze.
 */
Flixel.FlxTilemap.prototype.autoTile = function(Index)
{
	if (this._data[Index] === 0)
		return;

	this._data[Index] = 0;
	if ((Index - this.widthInTiles < 0) || (this._data[Index - this.widthInTiles] > 0)) // UP
		this._data[Index] += 1;
	if ((Index % this.widthInTiles >= this.widthInTiles - 1) || (this._data[Index + 1] > 0)) // RIGHT
		this._data[Index] += 2;
	if ((Index + this.widthInTiles >= this.totalTiles) || (this._data[Index + this.widthInTiles] > 0)) // DOWN
		this._data[Index] += 4;
	if ((Index % this.widthInTiles <= 0) || (this._data[Index - 1] > 0)) // LEFT
		this._data[Index] += 8;

	// The alternate algo checks for interior corners
	if ((this.auto == Flixel.FlxTilemap.ALT) && (this._data[Index] == 15)) {
		if ((Index % this.widthInTiles > 0) && (Index + this.widthInTiles < this.totalTiles) && (this._data[Index + this.widthInTiles - 1] <= 0))
			this._data[Index] = 1; // BOTTOM LEFT OPEN
		if ((Index % this.widthInTiles > 0) && (Index - this.widthInTiles >= 0) && (this._data[Index - this.widthInTiles - 1] <= 0))
			this._data[Index] = 2; // TOP LEFT OPEN
		if ((Index % this.widthInTiles < this.widthInTiles - 1) && (Index - this.widthInTiles >= 0) && (this._data[Index - this.widthInTiles + 1] <= 0))
			this._data[Index] = 4; // TOP RIGHT OPEN
		if ((Index % this.widthInTiles < this.widthInTiles - 1) && (Index + this.widthInTiles < this.totalTiles) && (this._data[Index + this.widthInTiles + 1] <= 0))
			this._data[Index] = 8; // BOTTOM RIGHT OPEN
	}
	this._data[Index] += 1;
};

/**
 * Internal function used in setTileByIndex() and the constructor to update the map.
 * 
 * @param Index
 *            The index of the tile you want to update.
 */
Flixel.FlxTilemap.prototype.updateTile = function(Index)
{
	var tile = this._tileObjects[this._data[Index]];
	if ((tile === null || tile === undefined) || !tile.visible) {
		this._rects[Index] = null;
		return;
	}
	var rx = (this._data[Index] - this._startingIndex) * (this._tileWidth + this.offsetX);
	var ry = 0;
	if (rx >= this._tiles.width) {
		ry = uint(rx / this._tiles.width) * (this._tileHeight + this.offsetY);
		rx %= this._tiles.width;
	}
	this._rects[Index] = new Flixel.FlxRect(rx, ry, this._tileWidth, this._tileHeight);
};

/**
 * Returns the tile collision info.
 * 
 * @param index
 *            The index of the tile you want the info.
 */
Flixel.FlxTilemap.prototype.getTileCollision = function(index)
{
	var tile = null;
	if (this._data[index] < this._tileObjects.size)
		tile = this._tileObjects[this._data[index]];
	if ((tile === null) || !tile.visible) {
		return Flixel.FlxObject.NONE;
	}
	return tile.allowCollisions;
};

/**
 * Change a particular tile to FlxSprite. Or just copy the graphic if you don't want any changes to map data itself.
 * 
 * @link http://forums.flixel.org/index.php/topic,5398.0.html
 * @param X
 *            The X coordinate of the tile (in tiles, not pixels).
 * @param Y
 *            The Y coordinate of the tile (in tiles, not pixels).
 * @param NewTile
 *            New tile to the mapdata. Use -1 if you dont want any changes. Default = 0 (empty)
 * @return FlxSprite.
 */
Flixel.FlxTilemap.prototype.tileToFlxSprite = function(X, Y, NewTile)
{
	var rowIndex = X + (Y * this.widthInTiles);

	var tile = this._tileObjects[this._data[rowIndex]];
	var rect = null;
	if ((tile === null || tile === undefined) || !tile.visible) {
		// Nothing to do here: rect object should stay null.
	} else {
		var rx = (this._data[rowIndex] - this._startingIndex) * this._tileWidth;
		var ry = 0;
		if (rx >= this._tiles.width) {
			ry = uint(rx / this._tiles.width) * this._tileHeight;
			rx %= this._tiles.width;
		}
		rect = new Flixel.FlxRect(rx, ry, this._tileWidth, this._tileHeight);
	}

	var tileSprite = new Flixel.FlxSprite();
	tileSprite.makeGraphic(this._tileWidth, this._tileHeight, 0x00000000, true);

	tileSprite.x = X * this._tileWidth + this.x;
	tileSprite.y = Y * this._tileHeight + this.y;
	if (rect !== null)
		tileSprite.getPixels().copyPixels(this._tiles, rect, new Flixel.FlxPoint());
	tileSprite.dirty = true;

	if (NewTile >= 0)
		this.setTile(X, Y, NewTile);

	return tileSprite;
};

/**
 * Return the tile width.
 */
Flixel.FlxTilemap.prototype.getTileWidth = function()
{
	return this._tileWidth;
};

/**
 * Return the tile height.
 */
Flixel.FlxTilemap.prototype.getTileHeight = function()
{
	return this._tileHeight;
};

/**
 * Return a tile object
 */
Flixel.FlxTilemap.prototype.getTileObject = function(tile)
{
	return this._tileObjects[tile];
};

/**
 * Returns the class name.
 */
Flixel.FlxTilemap.prototype.toString = function()
{
	return "FlxTilemap";
};
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
/**
 * This class is only for internal use for Flixel self.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Ka Wing Chin
 */
Flixel.data.FlxSystemAsset = function()
{
};

/**
 * The file handler.
 */
Flixel.data.FlxSystemAsset.systemFont = null;
/**
 * Tile map default images.
 */
Flixel.data.FlxSystemAsset.ImgAuto = "com/ratalaika/flixel/data/pack.txt:autotiles";
/**
 * Tile map alternative default images.
 */
Flixel.data.FlxSystemAsset.ImgAutoAlt = "com/ratalaika/flixel/data/pack.txt:autotiles_alt";
/**
 * The powered by logo.
 */
Flixel.data.FlxSystemAsset.poweredBy = "com/ratalaika/flixel/data/pack.txt:poweredby";
/**
 * The default image.
 */
Flixel.data.FlxSystemAsset.ImgDefault = "com/ratalaika/flixel/data/pack.txt:default";
/**
 * The default button image.
 */
Flixel.data.FlxSystemAsset.ImgDefaultButton = "com/ratalaika/flixel/data/pack.txt:button";

// Load the game pad images
Flixel.data.FlxSystemAsset.ImgButtonA = "com/ratalaika/flixel/data/pack.txt:button_a";
Flixel.data.FlxSystemAsset.ImgButtonB = "com/ratalaika/flixel/data/pack.txt:button_b";
Flixel.data.FlxSystemAsset.ImgButtonC = "com/ratalaika/flixel/data/pack.txt:button_c";
Flixel.data.FlxSystemAsset.ImgButtonY = "com/ratalaika/flixel/data/pack.txt:button_y";
Flixel.data.FlxSystemAsset.ImgButtonX = "com/ratalaika/flixel/data/pack.txt:button_x";
Flixel.data.FlxSystemAsset.ImgButtonLeft = "com/ratalaika/flixel/data/pack.txt:button_left";
Flixel.data.FlxSystemAsset.ImgButtonUp = "com/ratalaika/flixel/data/pack.txt:button_up";
Flixel.data.FlxSystemAsset.ImgButtonRight = "com/ratalaika/flixel/data/pack.txt:button_right";
Flixel.data.FlxSystemAsset.ImgButtonDown = "com/ratalaika/flixel/data/pack.txt:button_down";
Flixel.data.FlxSystemAsset.ImgCenter = "com/ratalaika/flixel/data/pack.txt:dpad_center";

// Load the Digital pad images
Flixel.data.FlxSystemAsset.dpad = new Array(5);
Flixel.data.FlxSystemAsset.dpad[0] = "com/ratalaika/flixel/data/pack.txt:dpad_up";
Flixel.data.FlxSystemAsset.dpad[1] = "com/ratalaika/flixel/data/pack.txt:dpad_down";
Flixel.data.FlxSystemAsset.dpad[2] = "com/ratalaika/flixel/data/pack.txt:dpad_left";
Flixel.data.FlxSystemAsset.dpad[3] = "com/ratalaika/flixel/data/pack.txt:dpad_right";
Flixel.data.FlxSystemAsset.dpad[4] = "com/ratalaika/flixel/data/pack.txt:dpad_base";

// Load the Game pad images
Flixel.data.FlxSystemAsset.gpad = new Array(4);
Flixel.data.FlxSystemAsset.gpad[0] = "com/ratalaika/flixel/data/pack.txt:gpad_up";
Flixel.data.FlxSystemAsset.gpad[1] = "com/ratalaika/flixel/data/pack.txt:gpad_down";
Flixel.data.FlxSystemAsset.gpad[2] = "com/ratalaika/flixel/data/pack.txt:gpad_left";
Flixel.data.FlxSystemAsset.gpad[3] = "com/ratalaika/flixel/data/pack.txt:gpad_right";

// Load the Analog pad images
Flixel.data.FlxSystemAsset.ImgControlBase = "com/ratalaika/flixel/data/pack.txt:base";
Flixel.data.FlxSystemAsset.ImgControlKnob = "com/ratalaika/flixel/data/pack.txt:stick";
/**
 * The ScaleManager object is responsible for helping you manage the scaling,<br>
 * resizing and alignment of your game within the browser.<br>
 * 
 * @class ScaleManager
 * @constructor
 * @param {number}
 *            width - The native width of the game.
 * @param {number}
 *            height - The native height of the game.
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var ScaleManager = function(width, height)
{
	// Save initial variables
	this.width = width;
	this.height = height;

	// Check the window orientation
	if (window.orientation) {
		this.orientation = window.orientation;
	} else {
		if (window.outerWidth > window.outerHeight) {
			this.orientation = 90;
		} else {
			this.orientation = 0;
		}
	}

	// Add listeners to all the functions that we need
	var _this = this;
	window.addEventListener('orientationchange', function(event)
	{
		return _this.checkOrientation(event);
	}, false);
	window.addEventListener('resize', function(event)
	{
		return _this.checkResize(event);
	}, false);
	document.addEventListener('webkitfullscreenchange', function(event)
	{
		return _this.fullScreenChange(event);
	}, false);
	document.addEventListener('mozfullscreenchange', function(event)
	{
		return _this.fullScreenChange(event);
	}, false);
	document.addEventListener('fullscreenchange', function(event)
	{
		return _this.fullScreenChange(event);
	}, false);
};

/**
 * @property {number} width - Width of the stage after calculation.
 */
ScaleManager.prototype.width = 0;
/**
 * @property {number} height - Height of the stage after calculation.
 */
ScaleManager.prototype.height = 0;
/**
 * @property {number} minWidth - Minimum width the canvas should be scaled to (in pixels).
 * @default
 */
ScaleManager.prototype.minWidth = null;
/**
 * @property {number} maxWidth - Maximum width the canvas should be scaled to (in pixels). If null it will scale to whatever width the browser can
 *           handle.
 * @default
 */
ScaleManager.prototype.maxWidth = null;
/**
 * @property {number} minHeight - Minimum height the canvas should be scaled to (in pixels).
 * @default
 */
ScaleManager.prototype.minHeight = null;
/**
 * @property {number} maxHeight - Maximum height the canvas should be scaled to (in pixels). If null it will scale to whatever height the browser can
 *           handle.
 * @default
 */
ScaleManager.prototype.maxHeight = null;
/**
 * @property {number} _startHeight - Stage height when starting the game.
 * @default
 * @private
 */
ScaleManager.prototype._startHeight = 0;
/**
 * @property {boolean} forceLandscape - If the game should be forced to use Landscape mode, this is set to true by Game.Stage
 * @default
 */
ScaleManager.prototype.forceLandscape = false;
/**
 * @property {boolean} forcePortrait - If the game should be forced to use Portrait mode, this is set to true by Game.Stage
 * @default
 */
ScaleManager.prototype.forcePortrait = false;
/**
 * @property {boolean} incorrectOrientation - If the game should be forced to use a specific orientation and the device currently isn't in that
 *           orientation this is set to true.
 * @default
 */
ScaleManager.prototype.incorrectOrientation = false;
/**
 * @property {boolean} pageAlignHorizontally - If you wish to align your game in the middle of the page then you can set this value to true. It will
 *           place a re-calculated margin-left pixel value onto the canvas element which is updated on orientation/resizing. It doesn't care about any
 *           other DOM element that may be on the page, it literally just sets the margin.
 * @default
 */
ScaleManager.prototype.pageAlignHorizontally = false;
/**
 * @property {boolean} pageAlignVertically - If you wish to align your game in the middle of the page then you can set this value to true. It will
 *           place a re-calculated margin-left pixel value onto the canvas element which is updated on orientation/resizing. It doesn't care about any
 *           other DOM element that may be on the page, it literally just sets the margin.
 * @default
 */
ScaleManager.prototype.pageAlignVertically = false;
/**
 * @property {number} _width - Cached stage width for full screen mode.
 * @default
 * @private
 */
ScaleManager.prototype._width = 0;
/**
 * @property {number} _height - Cached stage height for full screen mode.
 * @default
 * @private
 */
ScaleManager.prototype._height = 0;
/**
 * @property {number} maxIterations - The maximum number of times it will try to resize the canvas to fill the browser.
 * @default
 */
ScaleManager.prototype.maxIterations = 5;
/**
 * @property {Flixel.FlxSprite} orientationSprite - The Sprite that is optionally displayed if the browser enters an unsupported orientation.
 * @default
 */
ScaleManager.prototype.orientationSprite = null;
/**
 * @property {Function} enterLandscape - The function that is called when the browser enters landscape orientation.
 */
ScaleManager.prototype.enterLandscape = null;
/**
 * @property {Function} enterPortrait - The function that is called when the browser enters horizontal orientation.
 */
ScaleManager.prototype.enterPortrait = null;
/**
 * @property {Function} enterIncorrectOrientation - The function that is called when the browser enters an incorrect orientation, as defined by
 *           forceOrientation.
 */
ScaleManager.prototype.enterIncorrectOrientation = null;
/**
 * @property {Function} leaveIncorrectOrientation - The function that is called when the browser leaves an incorrect orientation, as defined by
 *           forceOrientation.
 */
ScaleManager.prototype.leaveIncorrectOrientation = null;
/**
 * @property {Function} hasResized - The function that is called when the game scale changes.
 */
ScaleManager.prototype.hasResized = null;
/**
 * @property {Flixel.FlxPoint} scaleFactor - The scale factor based on the game dimensions vs. the scaled dimensions.
 * @readonly
 */
ScaleManager.prototype.scaleFactor = new Flixel.FlxPoint(1, 1);
/**
 * @property {Flixel.FlxPoint} scaleFactorInversed - The inversed scale factor. The displayed dimensions divided by the game dimensions.
 * @readonly
 */
ScaleManager.prototype.scaleFactorInversed = new Flixel.FlxPoint(1, 1);
/**
 * @property {Flixel.FlxPoint} margin - If the game canvas is seto to align by adjusting the margin, the margin calculation values are stored in this
 *           Point.
 * @readonly
 */
ScaleManager.prototype.margin = new Flixel.FlxPoint(0, 0);
/**
 * @property {number} aspectRatio - Aspect ratio.
 * @default
 */
ScaleManager.prototype.aspectRatio = 0;
/**
 * @property {any} event- The native browser events from full screen API changes.
 */
ScaleManager.prototype.event = null;

/**
 * Tries to enter the browser into full screen mode. Please note that this needs to be supported by the web browser and isn't the same thing as
 * setting your game to fill the browser.
 * 
 * @method ScaleManager#startFullScreen
 * @param {boolean}
 *            antialias - You can toggle the anti-alias feature of the canvas before jumping in to full screen (false = retain pixel art, true =
 *            smooth art)
 */
ScaleManager.prototype.startFullScreen = function(antialias)
{
	if (this.isFullScreen()) {
		return;
	}

	if (typeof antialias !== 'undefined') {
		CanvasManager.setSmoothingEnabled(Flixel.FlxG.getStage().getContext("2d"), antialias);
	}

	var element = Flixel.FlxG.getStage();

	this._width = this.width;
	this._height = this.height;

	console.log('startFullScreen', this._width, this._height);

	if (element.requestFullScreen) {
		element.requestFullScreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	}
};

/**
 * Stops full screen mode if the browser is in it.
 * 
 * @method ScaleManager#stopFullScreen
 */
ScaleManager.prototype.stopFullScreen = function()
{
	if (document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
};

/**
 * Called automatically when the browser enters of leaves full screen mode.
 * 
 * @method ScaleManager#fullScreenChange
 * @param {Event}
 *            event - The fullscreenchange event
 * @protected
 */
ScaleManager.prototype.fullScreenChange = function(event)
{
	this.event = event;

	if (this.isFullScreen()) {
		Flixel.FlxG.getStage().style['width'] = '100%';
		Flixel.FlxG.getStage().style['height'] = '100%';

		this.setMaximum();

		Flixel.FlxG.mouse.scale.make(Flixel.FlxG.width / this.width, Flixel.FlxG.height / this.height);

		this.aspectRatio = this.width / this.height;
		this.scaleFactor.x = Flixel.FlxG.width / this.width;
		this.scaleFactor.y = Flixel.FlxG.height / this.height;
	} else {
		Flixel.FlxG.getStage().style['width'] = Flixel.FlxG.width + 'px';
		Flixel.FlxG.getStage().style['height'] = Flixel.FlxG.height + 'px';

		this.width = this._width;
		this.height = this._height;

		Flixel.FlxG.mouse.scale.make(Flixel.FlxG.width / this.width, Flixel.FlxG.height / this.height);

		this.aspectRatio = this.width / this.height;
		this.scaleFactor.x = Flixel.FlxG.width / this.width;
		this.scaleFactor.y = Flixel.FlxG.height / this.height;
	}
};

/**
 * If you need your game to run in only one orientation you can force that to happen. The optional orientationImage is displayed when the game is in
 * the incorrect orientation.
 * 
 * @method ScaleManager#forceOrientation
 * @param {boolean}
 *            forceLandscape - true if the game should run in landscape mode only.
 * @param {boolean}
 *            [forcePortrait=false] - true if the game should run in portrait mode only.
 * @param {string}
 *            [orientationImage=''] - The string of an image in the Cache to display when this game is in the incorrect orientation.
 */
ScaleManager.prototype.forceOrientation = function(forceLandscape, forcePortrait, orientationImage)
{
	if (typeof forcePortrait === 'undefined') {
		forcePortrait = false;
	}

	this.forceLandscape = forceLandscape;
	this.forcePortrait = forcePortrait;

	if (typeof orientationImage !== 'undefined') {
		Flixel.FlxG.getGame().orientationSprite = new Flixel.FlxSprite(0, 0 , orientationImage);
		Flixel.FlxG.getGame().orientationSprite.x = Flixel.FlxG.width / 2;
		Flixel.FlxG.getGame().orientationSprite.y = Flixel.FlxG.height / 2;

		this.checkOrientationState();

		if (this.incorrectOrientation) {
			Flixel.FlxG.getGame().orientationSprite.visible = true;
		} else {
			Flixel.FlxG.getGame().orientationSprite.visible = false;
		}
	}
};

/**
 * Checks if the browser is in the correct orientation for your game (if forceLandscape or forcePortrait have been set)
 * 
 * @method ScaleManager#checkOrientationState
 */
ScaleManager.prototype.checkOrientationState = function()
{
	// They are in the wrong orientation
	if (this.incorrectOrientation) {
		if ((this.forceLandscape && window.innerWidth > window.innerHeight) || (this.forcePortrait && window.innerHeight > window.innerWidth)) {
			// Back to normal
			Flixel.FlxG.setPause(false);
			this.incorrectOrientation = false;

			// Call the event if needed
			if(this.leaveIncorrectOrientation)
				this.leaveIncorrectOrientation();

			if (Flixel.FlxG.getGame().orientationSprite) {
				Flixel.FlxG.getGame().orientationSprite.visible = false;
			}

			this.refresh();
		}
	} else {
		if ((this.forceLandscape && window.innerWidth < window.innerHeight) || (this.forcePortrait && window.innerHeight < window.innerWidth)) {
			// Show orientation screen
			Flixel.FlxG.setPause(true);
			this.incorrectOrientation = true;
			
			// Call the event if needed
			if(this.enterIncorrectOrientation)
				this.enterIncorrectOrientation();

			if (Flixel.FlxG.getGame().orientationSprite && Flixel.FlxG.getGame().orientationSprite.visible === false) {
				Flixel.FlxG.getGame().orientationSprite.visible = true;
			}

			this.refresh();
		}
	}
};

/**
 * Handle window.orientationchange events
 * 
 * @method ScaleManager#checkOrientation
 * @param {Event}
 *            event - The orientationchange event data.
 */
ScaleManager.prototype.checkOrientation = function(event)
{
	this.event = event;

	this.orientation = window.orientation;

	if (this.isLandscape() && this.enterLandscape) {
		this.enterLandscape(this.orientation, true, false);
	} else if (this.isPortrait() && this.enterPortrait) {
		this.enterPortrait(this.orientation, false, true);
	}

	if (Flixel.FlxCamera.defaultScaleMode !== Flixel.FlxCamera.NO_SCALE) {
		this.refresh();
	}
};

/**
 * Handle window.resize events
 * 
 * @method ScaleManager#checkResize
 * @param {Event}
 *            event - The resize event data.
 */
ScaleManager.prototype.checkResize = function(event)
{
	this.event = event;

	if (window.outerWidth > window.outerHeight) {
		this.orientation = 90;
	} else {
		this.orientation = 0;
	}

	if (this.isLandscape && this.enterLandscape) {
		this.enterLandscape(this.orientation, true, false);
	} else if(this.enterPortrait) {
		this.enterPortrait(this.orientation, false, true);
	}

	if (Flixel.FlxCamera.defaultScaleMode !== Flixel.FlxCamera.NO_SCALE) {
		this.refresh();
	}

	this.checkOrientationState();
};

/**
 * Re-calculate scale mode and update screen size.
 * 
 * @method ScaleManager#refresh
 */
ScaleManager.prototype.refresh = function()
{
	// We can't do anything about the status bars in iPads, web apps or desktops
	if (Flixel.FlxG.device.iPad === false && Flixel.FlxG.device.webApp === false && Flixel.FlxG.device.desktop === false) {
		if (Flixel.FlxG.device.android && Flixel.FlxG.device.chrome === false) {
			window.scrollTo(0, 1);
		} else {
			window.scrollTo(0, 0);
		}
	}

	if (this._check == null && this.maxIterations > 0) {
		this._iterations = this.maxIterations;
		var _this = this;
		_this.height; // WTF Eclipse and his weird errors
		this._check = window.setInterval(function() { return _this.setScreenSize(); }, 10);
		this.setScreenSize();
	}
};

/**
 * Set screen size automatically based on the scaleMode.
 * 
 * @param {boolean}
 *            force - If force is true it will try to resize the game regardless of the document dimensions.
 */
ScaleManager.prototype.setScreenSize = function(force)
{
	if (typeof force == 'undefined') {
		force = false;
	}

	if (Flixel.FlxG.device.iPad === false && Flixel.FlxG.device.webApp === false && Flixel.FlxG.device.desktop === false) {
		if (Flixel.FlxG.device.android && Flixel.FlxG.device.chrome === false) {
			window.scrollTo(0, 1);
		} else {
			window.scrollTo(0, 0);
		}
	}

	this._iterations--;

	if (force || window.innerHeight > this._startHeight || this._iterations < 0) {
		// Set minimum height of content to new window height
		document.documentElement['style'].minHeight = window.innerHeight + 'px';

		if (this.incorrectOrientation === true) {
			this.setMaximum();
		} else if (Flixel.FlxCamera.defaultScaleMode == Flixel.FlxCamera.EXACT_FIT) {
			this.setExactFit();
		} else if (Flixel.FlxCamera.defaultScaleMode == Flixel.FlxCamera.STRETCH) {
			this.setShowAll();
		}

		this.setSize();
		clearInterval(this._check);
		this._check = null;
	}
};

/**
 * Sets the canvas style width and height values based on minWidth/Height and maxWidth/Height.
 * 
 * @method ScaleManager#setSize
 */
ScaleManager.prototype.setSize = function()
{
	if (this.incorrectOrientation === false) {
		if (this.maxWidth && this.width > this.maxWidth) {
			this.width = this.maxWidth;
		}

		if (this.maxHeight && this.height > this.maxHeight) {
			this.height = this.maxHeight;
		}

		if (this.minWidth && this.width < this.minWidth) {
			this.width = this.minWidth;
		}

		if (this.minHeight && this.height < this.minHeight) {
			this.height = this.minHeight;
		}
	}

	Flixel.FlxG.getStage().style.width = this.width + 'px';
	Flixel.FlxG.getStage().style.height = this.height + 'px';

	Flixel.FlxG.mouse.scale.make(Flixel.FlxG.width / this.width, Flixel.FlxG.height / this.height);

	if (this.pageAlignHorizontally) {
		if (this.width < window.innerWidth && this.incorrectOrientation === false) {
			this.margin.x = Math.round((window.innerWidth - this.width) / 2);
			Flixel.FlxG.getStage().marginLeft = this.margin.x + 'px';
		} else {
			this.margin.x = 0;
			Flixel.FlxG.getStage().style.marginLeft = '0px';
		}
	}

	if (this.pageAlignVertically) {
		if (this.height < window.innerHeight && this.incorrectOrientation === false) {
			this.margin.y = Math.round((window.innerHeight - this.height) / 2);
			Flixel.FlxG.getStage().style.marginTop = this.margin.y + 'px';
		} else {
			this.margin.y = 0;
			Flixel.FlxG.getStage().style.marginTop = '0px';
		}
	}

	CanvasManager.getOffset(Flixel.FlxG.getStage(), Flixel.FlxG.mouse.offset);

	this.aspectRatio = this.width / this.height;

	this.scaleFactor.x = Flixel.FlxG.width / this.width;
	this.scaleFactor.y = Flixel.FlxG.height / this.height;

	this.scaleFactorInversed.x = this.width / Flixel.FlxG.width;
	this.scaleFactorInversed.y = this.height / Flixel.FlxG.height;

	if(this.hasResized)
		this.hasResized(this.width, this.height);

	this.checkOrientationState();
};

/**
 * Sets this.width equal to window.innerWidth and this.height equal to window.innerHeight
 * 
 * @method ScaleManager#setMaximum
 */
ScaleManager.prototype.setMaximum = function()
{
	this.width = window.innerWidth;
	this.height = window.innerHeight;
};

/**
 * Calculates the multiplier needed to scale the game proportionally.
 * 
 * @method ScaleManager#setShowAll
 */
ScaleManager.prototype.setShowAll = function()
{
	var multiplier = Math.min((window.innerHeight / Flixel.FlxG.height), (window.innerWidth / Flixel.FlxG.width));

	this.width = Math.round(Flixel.FlxG.width * multiplier);
	this.height = Math.round(Flixel.FlxG.height * multiplier);
};

/**
 * Sets the width and height values of the canvas, no larger than the maxWidth / maxHeight.
 * 
 * @method ScaleManager#setExactFit
 */
ScaleManager.prototype.setExactFit = function()
{
	var availableWidth = window.innerWidth;
	var availableHeight = window.innerHeight;

	// console.log('available', availableWidth, availableHeight);

	if (this.maxWidth && availableWidth > this.maxWidth) {
		this.width = this.maxWidth;
	} else {
		this.width = availableWidth;
	}

	if (this.maxHeight && availableHeight > this.maxHeight) {
		this.height = this.maxHeight;
	} else {
		this.height = availableHeight;
	}
};

/**
 * Returns true if the browser is in full screen mode, otherwise false.
 * 
 * @method ScaleManager#isFullScreen
 */
ScaleManager.prototype.isFullScreen = function()
{
	return (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
};

/**
 * Returns true if the browser dimensions match a portrait display.
 * 
 * @method ScaleManager#isPortrait
 */
ScaleManager.prototype.isPortrait = function()
{
	return this.orientation === 0 || this.orientation == 180;
};

/**
 * Returns true if the browser dimensions match a landscape display.
 * 
 * @method ScaleManager#isLandscape
 */
ScaleManager.prototype.isLandscape = function()
{
	return this.orientation === 90 || this.orientation === -90;
};
/**
 * The SoundChannel class controls a sound in an application.<br>
 * <br>
 * Every sound is assigned to a sound channel, and the application<br>
 * can have multiple sound channels that are mixed together.<br>
 * <br>
 * The SoundChannel class contains a stop() method, properties for<br>
 * monitoring the amplitude (volume) of the channel, and a property<br>
 * for assigning a SoundTransform object to the channel.<br>
 * <br>
 * We use this class to manage the sound in a HTML5 way, and also to<br>
 * add some consistency to the Flixel Sound class.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * Class constructor.
 * 
 * @param key
 *            Asset key for the sound.
 * @param volume
 *            Default value for the volume, between 0 and 1.
 * @param loopWhether
 *            or not the sound will loop.
 */
var SoundChannel = function(key, volume, loop, connect)
{

	if (typeof volume == 'undefined') {
		volume = 1;
	}
	if (typeof loop == 'undefined') {
		loop = false;
	}
	if (typeof connect === 'undefined') {
		connect = Flixel.FlxG.soundManager.connectToMaster;
	}

	// Save the constructor stuff
	this.name = key;
	this.key = key;
	this.loop = loop;
	this._volume = volume;

	// Check what sound engine we are using
	this.usingWebAudio = Flixel.FlxG.soundManager.usingWebAudio;
	this.usingAudioTag = Flixel.FlxG.soundManager.usingAudioTag;

	// If we are using web audio
	if (this.usingWebAudio) {
		this.context = Flixel.FlxG.soundManager.context; // Get the sound
		// context
		this.masterGainNode = Flixel.FlxG.soundManager.masterGain; //

		if (typeof this.context.createGain === 'undefined') {
			this.gainNode = this.context.createGainNode();
		} else {
			this.gainNode = this.context.createGain();
		}

		this.gainNode.gain.value = volume * Flixel.FlxG.soundManager.getVolume();

		if (connect) {
			this.gainNode.connect(this.masterGainNode);
		}
	} else {
		if (Flixel.FlxG.loaderCache.getSound(key) && Flixel.FlxG.loaderCache.isSoundReady(key)) {
			this._sound = Flixel.FlxG.loaderCache.getSoundData(key);
			this.totalDuration = 0;

			if (this._sound.duration) {
				this.totalDuration = this._sound.duration;
			}
		} else {
			Flixel.FlxG.loaderCache.onSoundUnlock.add(this.soundHasUnlocked, this);
		}
	}
};

/**
 * @property {string} name - Name of the sound.
 */
SoundChannel.prototype.name = null;
/**
 * @property {string} key - Asset key for the sound.
 */
SoundChannel.prototype.key = null;
/**
 * @property {boolean} loop - Whether or not the sound will loop.
 */
SoundChannel.prototype.loop = false;
/**
 * @property {number} _volume - The global audio volume. A value between 0
 *           (silence) and 1 (full volume).
 * @private
 */
SoundChannel.prototype._volume = 0;
/**
 * @SoundChannel.prototype.rty {object} markers - The sound markers.
 */
SoundChannel.prototype.markers = {};
/**
 * @property {AudioContext} context - Reference to the AudioContext instance.
 */
SoundChannel.prototype.context = null;
/**
 * @property {Description} _buffer - Decoded data buffer / Audio tag.
 * @private
 */
SoundChannel.prototype._buffer = null;
/**
 * @property {boolean} _muted - Boolean indicating whether the sound is muted or
 *           not.
 * @private
 * @default
 */
SoundChannel.prototype._muted = false;
/**
 * @property {boolean} autoplay - Boolean indicating whether the sound should
 *           start automatically.
 */
SoundChannel.prototype.autoplay = false;
/**
 * @property {number} totalDuration - The total duration of the sound, in
 *           milliseconds
 */
SoundChannel.prototype.totalDuration = 0;
/**
 * @property {number} startTime - The time the Sound starts at (typically 0
 *           unless starting from a marker)
 * @default
 */
SoundChannel.prototype.startTime = 0;
/**
 * @property {number} currentTime - The current time the sound is at.
 */
SoundChannel.prototype.currentTime = 0;
/**
 * @property {number} duration - The duration of the sound.
 */
SoundChannel.prototype.duration = 0;
/**
 * @property {number} stopTime - The time the sound stopped.
 */
SoundChannel.prototype.stopTime = 0;
/**
 * @property {boolean} paused - true if the sound is paused, otherwise false.
 * @default
 */
SoundChannel.prototype.paused = false;
/**
 * @property {number} pausedPosition - The position the sound had reached when
 *           it was paused.
 */
SoundChannel.prototype.pausedPosition = 0;
/**
 * @property {number} pausedTime - The game time at which the sound was paused.
 */
SoundChannel.prototype.pausedTime = 0;
/**
 * @property {boolean} isPlaying - true if the sound is currently playing,
 *           otherwise false.
 * @default
 */
SoundChannel.prototype.isPlaying = false;
/**
 * @property {string} currentMarker - The string ID of the currently playing
 *           marker, if any.
 * @default
 */
SoundChannel.prototype.currentMarker = '';
/**
 * @property {boolean} pendingPlayback - true if the sound file is pending
 *           playback
 * @readonly
 */
SoundChannel.prototype.pendingPlayback = false;
/**
 * @property {boolean} override - if true when you play this sound it will
 *           always start from the beginning.
 * @default
 */
SoundChannel.prototype.override = false;
/**
 * @property {boolean} usingWebAudio - true if this sound is being played with
 *           Web Audio.
 * @readonly
 */
SoundChannel.prototype.usingWebAudio = false;
/**
 * @property {boolean} usingAudioTag - true if the sound is being played via the
 *           Audio tag.
 */
SoundChannel.prototype.usingAudioTag = false;
/**
 * @property {object} externalNode - If defined this Sound won't connect to the
 *           SoundManager master gain node, but will instead connect to
 *           externalNode.input.
 */
SoundChannel.prototype.externalNode = null;
/**
 * @property onDecoded - The onDecoded function is called when the sound has
 *           finished decoding (typically for mp3 files)
 */
SoundChannel.prototype.onDecoded = null;
/**
 * @property onPlay - The onPlay function is called each time this sound is
 *           played.
 */
SoundChannel.prototype.onPlay = null;
/**
 * @property onPause - The onPause function is called when this sound is
 *           paused.
 */
SoundChannel.prototype.onPause = null;
/**
 * @property onResume - The onResume function is called when this sound is
 *           resumed from a paused state.
 */
SoundChannel.prototype.onResume = null;
/**
 * @property onLoop - The onLoop function is called when this sound loops
 *           during playback.
 */
SoundChannel.prototype.onLoop = null;
/**
 * @property onStop - The onStop function is called when this sound stops
 *           playback.
 */
SoundChannel.prototype.onStop = null;
/**
 * @property onMute - The onMouse function is called when this sound is muted.
 */
SoundChannel.prototype.onMute = null;
/**
 * @property onMarkerComplete - The onMarkerComplete function is called when a
 *           marker within this sound completes playback.
 */
SoundChannel.prototype.onMarkerComplete = null;

/**
 * Called automatically when this sound is unlocked.
 * 
 * @method SoundChannel#soundHasUnlocked
 * @param {string}
 *            key - The cache key of the sound file to check for
 *            decoding.
 * @protected
 */
SoundChannel.prototype.soundHasUnlocked = function(key)
{
	if (key == this.key) {
		this._sound = Flixel.FlxG.loaderCache.getSoundData(this.key);
		this.totalDuration = this._sound.duration;
		// console.log('sound has unlocked' + this._sound);
	}
};

/**
 * Description.
 * 
 * @method SoundChannel#addMarker
 * @param {string}
 *            name - Description.
 * @param {Description}
 *            start - Description.
 * @param {Description}
 *            stop - Description.
 * @param {Description}
 *            volume - Description.
 * @param {Description}
 *            loop - Description. addMarker: function (name, start, stop,
 *            volume, loop) {
 * 
 * volume = volume || 1; if (typeof loop == 'undefined') { loop = false; }
 * 
 * this.markers[name] = { name: name, start: start, stop: stop, volume: volume,
 * duration: stop - start, loop: loop }; };
 */

/**
 * Adds a marker into the current Sound. A marker is represented by a unique key
 * and a start time and duration. This allows you to bundle multiple sounds
 * together into a single audio file and use markers to jump between them for
 * playback.
 * 
 * @method SoundChannel#addMarker
 * @param {string}
 *            name - A unique name for this marker, i.e. 'explosion', 'gunshot',
 *            etc.
 * @param {number}
 *            start - The start point of this marker in the audio file, given in
 *            seconds. 2.5 = 2500ms, 0.5 = 500ms, etc.
 * @param {number}
 *            duration - The duration of the marker in seconds. 2.5 = 2500ms,
 *            0.5 = 500ms, etc.
 * @param {number}
 *            [volume=1] - The volume the sound will play back at, between 0
 *            (silent) and 1 (full volume).
 * @param {boolean}
 *            [loop=false] - Sets if the sound will loop or not.
 */
SoundChannel.prototype.addMarker = function(name, start, duration, volume, loop)
{
	volume = volume || 1;
	if (typeof loop == 'undefined') {
		loop = false;
	}

	this.markers[name] = {
		name : name,
		start : start,
		stop : start + duration,
		volume : volume,
		duration : duration,
		durationMS : duration * 1000,
		loop : loop
	};

};

/**
 * Removes a marker from the sound.
 * 
 * @method SoundChannel#removeMarker
 * @param {string}
 *            name - The key of the marker to remove.
 */
SoundChannel.prototype.removeMarker = function(name)
{
	delete this.markers[name];
};

/**
 * Called automatically by the SoundManager.
 */
SoundChannel.prototype.update = function()
{	
	if (this.pendingPlayback && Flixel.FlxG.loaderCache.isSoundReady(this.key)) {
		this.pendingPlayback = false;
		this.play(this._tempMarker, this._tempPosition, this._tempVolume, this._tempLoop);
	}

	if (this.isPlaying) {
		this.currentTime = getTimer() - this.startTime;

		if (this.currentTime >= this.durationMS) {
			// console.log(this.currentMarker, 'has hit duration');
			if (this.usingWebAudio) {
				if (this.loop) {
					// console.log('loop1');
					// won't work with markers, needs to reset the position
					if(this.onLoop !== null)
						this.onLoop();

					if (this.currentMarker === '') {
						// console.log('loop2');
						this.currentTime = 0;
						this.startTime = getTimer();
					} else {
						// console.log('loop3');
						this.play(this.currentMarker, 0, this.getVolume(), true, true);
					}
				} else {
					// console.log('stopping, no loop for marker');
					this.stop();
				}
			} else {
				if (this.loop) {
					if(this.onLoop !== null)
						this.onLoop();
					this.play(this.currentMarker, 0, this.getVolume(), true, true);
				} else {
					this.stop();
				}
			}
		}
	}
};

/**
 * Play this sound, or a marked section of it.
 * 
 * @param {string}
 *            [marker=''] - If you want to play a marker then give the key here,
 *            otherwise leave blank to play the full sound.
 * @param {number}
 *            [position=0] - The starting position to play the sound from - this
 *            is ignored if you provide a marker.
 * @param {number}
 *            [volume=1] - Volume of the sound you want to play. If none is
 *            given it will use the volume given to the Sound when it was
 *            created (which defaults to 1 if none was specified).
 * @param {boolean}
 *            [loop=false] - Loop when it finished playing?
 * @param {boolean}
 *            [forceRestart=true] - If the sound is already playing you can set
 *            forceRestart to restart it from the beginning.
 * @return {SoundChannel} This sound instance.
 */
SoundChannel.prototype.play = function(marker, position, volume, loop, forceRestart)
{
	marker = marker || '';
	position = position || 0;

	if (typeof volume === 'undefined') {
		volume = this._volume;
	}
	if (typeof loop === 'undefined') {
		loop = false;
	}
	if (typeof forceRestart === 'undefined') {
		forceRestart = true;
	}

	// console.log(this.name + ' play ' + marker + ' position ' + position +
	// ' volume ' + volume + ' loop ' + loop, 'force', forceRestart);

	if (this.isPlaying === true && forceRestart === false && this.override === false) {
		// Use Restart instead
		return;
	}

	if (this.isPlaying && this.override) {
		// console.log('asked to play ' + marker + ' but already playing ' +
		// this.currentMarker);

		if (this.usingWebAudio) {
			if (typeof this._sound.stop === 'undefined') {
				this._sound.noteOff(0);
			} else {
				this._sound.stop(0);
			}
		} else if (this.usingAudioTag) {
			this._sound.pause();
			this._sound.currentTime = 0;
		}
	}

	this.currentMarker = marker;

	if (marker !== '') {
		if (this.markers[marker]) {
			this.position = this.markers[marker].start;
			this.setVolume(this.markers[marker].volume);
			this.loop = this.markers[marker].loop;
			this.duration = this.markers[marker].duration;
			this.durationMS = this.markers[marker].durationMS;

			// console.log('Marker Loaded: ', marker, 'start:',
			// this.position, 'end: ', this.duration, 'loop', this.loop);

			this._tempMarker = marker;
			this._tempPosition = this.position;
			this._tempVolume = this.getVolume;
			this._tempLoop = this.loop;
		} else {
			console.warn("SoundChannel.play: audio marker " + marker + " doesn't exist");
			return;
		}
	} else {
		// console.log('no marker info loaded', marker);

		this.position = position;
		this.setVolume(volume);
		this.loop = loop;
		this.duration = 0;
		this.durationMS = 0;

		this._tempMarker = marker;
		this._tempPosition = position;
		this._tempVolume = volume;
		this._tempLoop = loop;
	}

	if (this.usingWebAudio) {
		// Does the sound need decoding?
		if (Flixel.FlxG.loaderCache.isSoundDecoded(this.key)) {
			// Do we need to do this every time we play? How about just if
			// the buffer is empty?
			if (this._buffer === null) {
				this._buffer = Flixel.FlxG.loaderCache.getSoundData(this.key);
			}

			this._sound = this.context.createBufferSource();
			this._sound.buffer = this._buffer;

			if (this.externalNode) {
				this._sound.connect(this.externalNode.input);
			} else {
				this._sound.connect(this.gainNode);
			}

			this.totalDuration = this._sound.buffer.duration;

			if (this.duration === 0) {
				// console.log('duration reset');
				this.duration = this.totalDuration;
				this.durationMS = this.totalDuration * 1000;
			}

			if (this.loop && marker === '') {
				this._sound.loop = true;
			}

			// Useful to cache this somewhere perhaps?
			if (typeof this._sound.start === 'undefined') {
				this._sound.noteGrainOn(0, this.position, this.duration);
				// this._sound.noteGrainOn(0, this.position, this.duration /
				// 1000);
				// this._sound.noteOn(0); // the zero is vitally important,
				// crashes iOS6 without it
			} else {
				// this._sound.start(0, this.position, this.duration /
				// 1000);
				this._sound.start(0, this.position, this.duration);
			}

			this.isPlaying = true;
			this.startTime = getTimer();
			this.currentTime = 0;
			this.stopTime = this.startTime + this.durationMS;

			if(this.onPlay !== null)
				this.onPlay();
		} else {
			this.pendingPlayback = true;

			if (Flixel.FlxG.loaderCache.getSound(this.key) && Flixel.FlxG.loaderCache.getSound(this.key).isDecoding === false) {
				Flixel.FlxG.soundManager.decode(this.key, this);
			}
		}
	} else {
		// console.log('Sound play Audio');
		if (Flixel.FlxG.loaderCache.getSound(this.key) && Flixel.FlxG.loaderCache.getSound(this.key).locked) {
			// console.log('tried playing locked sound, pending set, reload
			// started');
			Flixel.FlxG.loaderCache.reloadSound(this.key);
			this.pendingPlayback = true;
		} else {
			// console.log('sound not locked, state?',
			// this._sound.readyState);
			if (this._sound && this._sound.readyState == 4) {
				this._sound.play();
				// This doesn't become available until you call play(),
				// wonderful ...
				this.totalDuration = this._sound.duration;

				if (this.duration === 0) {
					this.duration = this.totalDuration;
					this.durationMS = this.totalDuration * 1000;
				}

				// console.log('playing', this._sound);
				this._sound.currentTime = this.position;
				this._sound.muted = this._muted;

				if (this._muted) {
					this._sound.volume = 0;
				} else {
					this._sound.volume = this._volume;
				}

				this.isPlaying = true;
				this.startTime = getTimer();
				this.currentTime = 0;
				this.stopTime = this.startTime + this.durationMS;

				if(this.onPlay !== null)
					this.onPlay();
			} else {
				this.pendingPlayback = true;
			}
		}
	}
};

/**
 * Restart the sound, or a marked section of it.
 * 
 * @method SoundChannel#restart
 * @param {string}
 *            [marker=''] - If you want to play a marker then give the key here,
 *            otherwise leave blank to play the full sound.
 * @param {number}
 *            [position=0] - The starting position to play the sound from - this
 *            is ignored if you provide a marker.
 * @param {number}
 *            [volume=1] - Volume of the sound you want to play.
 * @param {boolean}
 *            [loop=false] - Loop when it finished playing?
 */
SoundChannel.prototype.restart = function(marker, position, volume, loop)
{
	marker = marker || '';
	position = position || 0;
	volume = volume || 1;
	if (typeof loop == 'undefined') {
		loop = false;
	}

	this.play(marker, position, volume, loop, true);
};

/**
 * Pauses the sound
 * 
 * @method SoundChannel#pause
 */
SoundChannel.prototype.pause = function()
{
	if (this.isPlaying && this._sound) {
		this.stop();
		this.isPlaying = false;
		this.paused = true;
		this.pausedPosition = this.currentTime;
		this.pausedTime = getTimer();

		if(this.onPause !== null)
			this.onPause();
	}
};

/**
 * Resumes the sound
 * 
 * @method SoundChannel#resume
 */
SoundChannel.prototype.resume = function()
{

	if (this.paused && this._sound) {
		if (this.usingWebAudio) {
			var p = this.position + (this.pausedPosition / 1000);

			this._sound = this.context.createBufferSource();
			this._sound.buffer = this._buffer;
			this._sound.connect(this.gainNode);

			if (typeof this._sound.start === 'undefined') {
				this._sound.noteGrainOn(0, p, this.duration);
				// this._sound.noteOn(0); // the zero is vitally important,
				// crashes iOS6 without it
			} else {
				this._sound.start(0, p, this.duration);
			}
		} else {
			this._sound.play();
		}

		this.isPlaying = true;
		this.paused = false;
		this.startTime += (getTimer() - this.pausedTime);

		if(this.onResume !== null)
			this.onResume();
	}

};

/**
 * Stop playing this sound.
 */
SoundChannel.prototype.stop = function()
{

	if (this.isPlaying && this._sound) {
		if (this.usingWebAudio) {
			if (typeof this._sound.stop === 'undefined') {
				this._sound.noteOff(0);
			} else {
				this._sound.stop(0);
			}
		} else if (this.usingAudioTag) {
			this._sound.pause();
			this._sound.currentTime = 0;
		}
	}

	this.isPlaying = false;
	var prevMarker = this.currentMarker;

	this.currentMarker = '';

	if(this.onStop !== null)
		this.onStop(prevMarker);

};

/**
 * @property {boolean} isDecoding - Returns true if the sound file is still
 *           decoding.
 */
SoundChannel.prototype.isDecoding = function()
{
	return Flixel.FlxG.loaderCache.getSound(this.key).isDecoding;
};

/**
 * @property {boolean} isDecoded - Returns true if the sound file has decoded.
 */
SoundChannel.prototype.isDecoded = function()
{
	return Flixel.FlxG.loaderCache.isSoundDecoded(this.key);
};

/**
 * @property {boolean} mute - Gets or sets the muted state of this sound.
 */
SoundChannel.prototype.getMute = function()
{
	return this._muted;
};

SoundChannel.prototype.setMute = function(value)
{
	value = value || null;

	if (value) {
		this._muted = true;

		if (this.usingWebAudio) {
			this._muteVolume = this.gainNode.gain.value;
			this.gainNode.gain.value = 0;
		} else if (this.usingAudioTag && this._sound) {
			this._muteVolume = this._sound.volume;
			this._sound.volume = 0;
		}
	} else {
		this._muted = false;

		if (this.usingWebAudio) {
			this.gainNode.gain.value = this._muteVolume;
		} else if (this.usingAudioTag && this._sound) {
			this._sound.volume = this._muteVolume;
		}
	}

	if(this.onMute !== null)
		this.onMute();
};

/**
 * Return the current volume.
 */
SoundChannel.prototype.getVolume = function()
{
	return this._volume;
};

/**
 * Set the volume.
 * 
 * @param volume
 *            The new volume.
 */
SoundChannel.prototype.setVolume = function(volume)
{
	if (this.usingWebAudio) {
		this._volume = volume;
		this.gainNode.gain.value = volume;
	} else if (this.usingAudioTag && this._sound) {
		// Causes an Index size error in Firefox if you don't clamp the value
		if (volume >= 0 && volume <= 1) {
			this._volume = volume;
			this._sound.volume = volume;
		}
	}
};

/**
 * Sound Manager constructor.<br>
 * The Sound Manager is responsible for playing back audio<br>
 * via either the Legacy HTML Audio tag or via Web Audio<br>
 * if the browser supports it.<br>
 * <br>
 * Note: On Firefox 25+ on Linux if you have media.gstreamer disabled in<br>
 * about:config then it cannot play back mp3 or m4a files.<br>
 * Took from Phaser.<br>
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var SoundManager = function()
{
	SoundManager.parent.constructor.apply(this);

	this._sounds = [];
	this._volume = 1;
	this.usingWebAudio = true;
	this.connectToMaster = true;
	this.channels = 32;
	this.cache = Flixel.FlxG.loaderCache;
};
extend(SoundManager, Flixel.FlxBasic);

/**
 * @property onSoundDecode - The function called when a sound decodes (typically only for mp3 files)
 */
SoundManager.prototype.onSoundDecode = null;
/**
 * A reference to the loader cache.
 */
SoundManager.prototype.cache = null;
/**
 * If the sound is muted or not.
 */
SoundManager.prototype._muted = false;
/**
 * Internal unlock tracking var.
 */
SoundManager.prototype._unlockSource = null;
/**
 * The global audio volume.<br>
 * A value between 0 (silence) and 1 (full volume).
 */
SoundManager.prototype._volume = 0;
/**
 * An array containing all the sounds
 */
SoundManager.prototype._sounds = null;
/**
 * The AudioContext being used for playback.
 */
SoundManager.prototype.context = null;
/**
 * True if SoundManager.prototype sound is being played with Web Audio.
 */
SoundManager.prototype.usingWebAudio = false;
/**
 * True if the sound is being played via the Audio tag.
 */
SoundManager.prototype.usingAudioTag = false;
/**
 * Has audio been disabled via the Flixel object?<br>
 * Useful if you need to use a 3rd party audio library instead.
 */
SoundManager.prototype.noAudio = false;
/**
 * Used in conjunction with Sound.externalNode SoundManager.prototype<br>
 * allows you to stop a Sound node being connected to the SoundManager master gain node.
 */
SoundManager.prototype.connectToMaster = false;
/**
 * True if the audio system is currently locked awaiting a touch event.
 */
SoundManager.prototype.touchLocked = false;
/**
 * The number of audio channels to use in playback.
 */
SoundManager.prototype.channels = 0;

/**
 * Initializes the sound manager.
 */
SoundManager.prototype.boot = function()
{
	if (Flixel.FlxG.device.iOS && Flixel.FlxG.device.webAudio === false) {
		this.channels = 1;
	}

	if (Flixel.FlxG.device.iOS || Flixel.fakeiOSTouchLock) {
		// this.game.input.touch.callbackContext = this;
		// this.game.input.touch.touchStartCallback = this.unlock;
		// this.game.input.mouse.callbackContext = this;
		// this.game.input.mouse.mouseDownCallback = this.unlock;
		this.touchLocked = true;
	} else {
		// What about iOS5?
		this.touchLocked = false;
	}

	// Check to see if all audio playback is disabled (i.e. handled by a 3rd party class)
	if (Flixel.disableAudio === true) {
		this.usingWebAudio = false;
		this.noAudio = true;
		return;
	}

	// Check if the Web Audio API is disabled (for testing Audio Tag playback during development)
	if (Flixel.disableWebAudio === true) {
		this.usingWebAudio = false;
		this.usingAudioTag = true;
		this.noAudio = false;
		return;
	}

	if (!!window.AudioContext) {
		this.context = new window.AudioContext();
	} else if (!!window.webkitAudioContext) {
		this.context = new window.webkitAudioContext();
	} else if (!!window.Audio) {
		this.usingWebAudio = false;
		this.usingAudioTag = true;
	} else {
		this.usingWebAudio = false;
		this.noAudio = true;
	}

	if (this.context !== null) {
		if (typeof this.context.createGain === 'undefined') {
			this.masterGain = this.context.createGainNode();
		} else {
			this.masterGain = this.context.createGain();
		}

		this.masterGain.gain.value = 1;
		this.masterGain.connect(this.context.destination);
	}

};

/**
 * Enables the audio, usually after the first touch.
 * 
 * @method SoundManager#unlock
 */
SoundManager.prototype.unlock = function()
{
	if (this.touchLocked === false) {
		return;
	}

	// Global override (mostly for Audio Tag testing)
	if (Flixel.FlxG.device.webAudio === false || Flixel.disableWebAudio === true) {
		// Create an Audio tag?
		this.touchLocked = false;
		this._unlockSource = null;
		this.game.input.touch.callbackContext = null;
		this.game.input.touch.touchStartCallback = null;
		this.game.input.mouse.callbackContext = null;
		this.game.input.mouse.mouseDownCallback = null;
	} else {
		// Create empty buffer and play it
		var buffer = this.context.createBuffer(1, 1, 22050);
		this._unlockSource = this.context.createBufferSource();
		this._unlockSource.buffer = buffer;
		this._unlockSource.connect(this.context.destination);
		this._unlockSource.noteOn(0);
	}
};

/**
 * Overridden destroy method.
 */
SoundManager.prototype.destroy = function()
{
	this.stopAll();
	delete this._sounds;

	SoundManager.parent.destroy.apply(this);
};

/**
 * Stops all the sounds in the game.
 */
SoundManager.prototype.stopAll = function()
{
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i]) {
			this._sounds[i].stop();
		}
	}
};

/**
 * Pauses all the sounds in the game.
 */
SoundManager.prototype.pauseAll = function()
{
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i]) {
			this._sounds[i].pause();
		}
	}
};

/**
 * resumes every sound in the game.
 * 
 * @method SoundManager#resumeAll
 */
SoundManager.prototype.resumeAll = function()
{
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i]) {
			this._sounds[i].resume();
		}
	}
};

/**
 * Decode a sound by its assets key.
 * 
 * @method SoundManager#decode
 * @param {string}
 *            key - Assets key of the sound to be decoded.
 * @param {SoundChannel}
 *            [sound] - Its buffer will be set to decoded data.
 */
SoundManager.prototype.decode = function(key, sound)
{
	sound = sound || null;

	var soundData = this.cache.getSoundData(key);

	if (soundData) {
		if (this.cache.isSoundDecoded(key) === false) {
			this.cache.updateSound(key, 'isDecoding', true);

			var that = this;

			this.context.decodeAudioData(soundData, function(buffer)
			{
				that.cache.decodedSound(key, buffer);
				if (sound && this.onSoundDecode !== null) {
					that.onSoundDecode(sound);
				}
			});
		}
	}
};

/**
 * Updates every sound in the game.
 * 
 * @method SoundManager#update
 */
SoundManager.prototype.update = function()
{
	if (this.touchLocked) {
		if (Flixel.FlxG.device.webAudio && this._unlockSource !== null) {
			if ((this._unlockSource.playbackState === this._unlockSource.PLAYING_STATE || this._unlockSource.playbackState === this._unlockSource.FINISHED_STATE)) {
				this.touchLocked = false;
				this._unlockSource = null;
				this.game.input.touch.callbackContext = null;
				this.game.input.touch.touchStartCallback = null;
			}
		}
	}

	for (var i = 0; i < this._sounds.length; i++) {
		this._sounds[i].update();
	}
};

/**
 * Adds a new Sound into the SoundManager.
 * 
 * @param key
 *            Asset key for the sound.
 * @param volume
 *            [volume=1] - Default value for the volume.
 * @param loop
 *            [loop=false] - Whether or not the sound will loop.
 * @param connect
 *            [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under
 *            WebAudio.
 */
SoundManager.prototype.add = function(key, volume, loop, connect)
{
	if (typeof volume === 'undefined') {
		volume = 1;
	}
	if (typeof loop === 'undefined') {
		loop = false;
	}
	if (typeof connect === 'undefined') {
		connect = this.connectToMaster;
	}

	var sound = new SoundChannel(key, volume, loop, connect);

	this._sounds.push(sound);

	return sound;
};

/**
 * Adds a new Sound into the SoundManager and starts it playing.
 * 
 * @param {string}
 *            key - Asset key for the sound.
 * @param {number}
 *            [volume=1] - Default value for the volume.
 * @param {boolean}
 *            [loop=false] - Whether or not the sound will loop.
 * @return The new sound instance.
 */
SoundManager.prototype.play = function(key, volume, loop)
{
	var sound = this.add(key, volume, loop);
	sound.play();
	return sound;
};

/**
 * Return the mute value.
 */
SoundManager.prototype.getMute = function()
{
	return this._muted;
};

/**
 * Set the mute value.
 */
SoundManager.prototype.setMute = function(value)
{
	value = value || null;
	var i = 0;

	if (value) {
		if (this._muted) {
			return;
		}

		this._muted = true;

		if (this.usingWebAudio) {
			this._muteVolume = this.masterGain.gain.value;
			this.masterGain.gain.value = 0;
		}

		// Loop through sounds
		for (i = 0; i < this._sounds.length; i++) {
			if (this._sounds[i].usingAudioTag) {
				this._sounds[i].mute = true;
			}
		}
	} else {
		if (this._muted === false) {
			return;
		}

		this._muted = false;

		if (this.usingWebAudio) {
			this.masterGain.gain.value = this._muteVolume;
		}

		// Loop through sounds
		for (i = 0; i < this._sounds.length; i++) {
			if (this._sounds[i].usingAudioTag) {
				this._sounds[i].mute = false;
			}
		}
	}
};

/**
 * Return the volume value.
 */
SoundManager.prototype.getVolume = function()
{
	if (this.usingWebAudio) {
		return this.masterGain.gain.value;
	} else {
		return this._volume;
	}

};

/**
 * Set the volume value.
 */
SoundManager.prototype.setVolume = function(value)
{
	value = (value > 1) ? 1 : (value < 0) ? 0 : value;

	this._volume = value;

	if (this.usingWebAudio) {
		this.masterGain.gain.value = value;
	}

	// Loop through the sound cache and change the volume of all html audio tags
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i].usingAudioTag) {
			this._sounds[i].volume = this._sounds[i].volume * value;
		}
	}
};

/**
 * Return the class name.
 */
SoundManager.prototype.toString = function()
{
	return "SoundManager";
};
/**
 * The SoundTransform class contains properties for volume and panning.<br>
 * A support file for transforming sound stuff.<br>
 * No pan support yet<br>
 * Used to maintain Flash and Java consistency.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var SoundTransform = function()
{
};

/**
 * The left-to-right panning of the sound, ranging from -1 (full pan left) to 1 (full pan right).
 */
SoundTransform.prototype.pan = 0;
/**
 * The volume, ranging from 0 (silent) to 1 (full volume).
 */
SoundTransform.prototype.volume = 0;
/**
 * This is the universal Flixel sound object, used for streaming, music, and sound effects.
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * The FlxSound constructor gets all the variables initialized, but NOT ready to
 * play a sound yet.
 */
Flixel.FlxSound = function()
{
	Flixel.FlxSound.parent.constructor.apply(this);

	this.reset();
};
extend(Flixel.FlxSound, Flixel.FlxBasic);

/**
 * The ALL ID.
 */
Flixel.FlxSound.ALL = 0;
/**
 * Automatically determine the type of file.
 */
Flixel.FlxSound.TYPE_AUTO = 0;
/**
 * A short audio clip.
 */
Flixel.FlxSound.TYPE_SFX = 1;
/**
 * A large music file.
 */
Flixel.FlxSound.TYPE_MUSIC = 2;
/**
 * The X position of this sound in world coordinates. Only really matters if you
 * are doing proximity/panning stuff.
 */
Flixel.FlxSound.prototype.x = 0;
/**
 * The Y position of this sound in world coordinates. Only really matters if you
 * are doing proximity/panning stuff.
 */
Flixel.FlxSound.prototype.y = 0;
/**
 * Whether or not this sound should be automatically destroyed when you switch
 * states.
 */
Flixel.FlxSound.prototype.survive = false;
/**
 * The ID3 song name. Defaults to null. Currently only works for streamed
 * sounds.
 */
Flixel.FlxSound.prototype.name = null;
/**
 * The ID3 artist name. Defaults to null. Currently only works for streamed
 * sounds.
 */
Flixel.FlxSound.prototype.artist = null;
/**
 * Stores the average wave amplitude of both stereo channels
 */
Flixel.FlxSound.prototype.amplitude = 0;
/**
 * Just the amplitude of the left stereo channel
 */
Flixel.FlxSound.prototype.amplitudeLeft = 0;
/**
 * Just the amplitude of the left stereo channel
 */
Flixel.FlxSound.prototype.amplitudeRight = 0;
/**
 * Whether to call destroy() when the sound has finished.
 */
Flixel.FlxSound.prototype.autoDestroy = false;
/**
 * Internal tracker for a Flash sound object.
 */
Flixel.FlxSound.prototype._sound = null;
/**
 * Internal tracker for a Flash sound channel object.
 */
Flixel.FlxSound.prototype._channel = null;
/**
 * Internal tracker for a Flash sound transform object.
 */
Flixel.FlxSound.prototype._transform = null;
/**
 * Internal tracker for whether the sound is paused or not (not the same as
 * stopped).
 */
Flixel.FlxSound.prototype._paused = false;
/**
 * Internal tracker for the position in runtime of the music playback.
 */
Flixel.FlxSound.prototype._position = 0;
/**
 * Internal tracker for how loud the sound is.
 */
Flixel.FlxSound.prototype._volume = 0;
/**
 * Internal tracker for total volume adjustment.
 */
Flixel.FlxSound.prototype._volumeAdjust = 0;
/**
 * Internal tracker for whether the sound is looping or not.
 */
Flixel.FlxSound.prototype._looped = false;
/**
 * Internal tracker for the sound's "target" (for proximity and panning).
 */
Flixel.FlxSound.prototype._target = null;
/**
 * Internal tracker for the maximum effective radius of this sound (for
 * proximity and panning).
 */
Flixel.FlxSound.prototype._radius = 0;
/**
 * Internal tracker for whether to pan the sound left and right. Default is
 * false.
 */
Flixel.FlxSound.prototype._pan = false;
/**
 * Internal timer used to keep track of requests to fade out the sound playback.
 */
Flixel.FlxSound.prototype._fadeOutTimer = 0;
/**
 * Internal helper for fading out sounds.
 */
Flixel.FlxSound.prototype._fadeOutTotal = 0;
/**
 * Internal flag for whether to pause or stop the sound when it's done fading
 * out.
 */
Flixel.FlxSound.prototype._pauseOnFadeOut = false;
/**
 * Internal timer for fading in the sound playback.
 */
Flixel.FlxSound.prototype._fadeInTimer = 0;
/**
 * Internal helper for fading in sounds.
 */
Flixel.FlxSound.prototype._fadeInTotal = 0;

/**
 * An internal function for clearing all the variables used by sounds.
 */
Flixel.FlxSound.prototype.reset = function()
{
	this.destroy();

	this.x = 0;
	this.y = 0;

	this._position = 0;
	this._paused = false;
	this._volume = 1.0;
	this._volumeAdjust = 1.0;
	this._looped = false;
	this._target = null;
	this._radius = 0;
	this._pan = false;
	this._fadeOutTimer = 0;
	this._fadeOutTotal = 0;
	this._pauseOnFadeOut = false;
	this._fadeInTimer = 0;
	this._fadeInTotal = 0;
	this.visible = false;
	this.amplitude = 0;
	this.amplitudeLeft = 0;
	this.amplitudeRight = 0;
	this.autoDestroy = false;

	if (this._transform === null)
		this._transform = new SoundTransform();
	this._transform.pan = 0;
};

/**
 * Clean up memory.
 */
Flixel.FlxSound.prototype.destroy = function()
{
	this._transform = null;
	this.exists = false;
	this.active = false;
	this._target = null;
	this.name = null;
	this.artist = null;

	if (this._channel) {
		this._channel.stop();
		this._channel = null;
	}

	Flixel.FlxSound.parent.destroy.apply(this);
};

/**
 * Handles fade out, fade in, panning, proximity, and amplitude operations each
 * frame.
 */
Flixel.FlxSound.prototype.update = function()
{
	if (!this.getPlaying())
		return;

	this._position = this._channel.position;

	var radialMultiplier = 1.0;
	var fadeMultiplier = 1.0;

	// Distance-based volume control
	if (this._target !== null) {
		radialMultiplier = Flixel.FlxU.getDistance(new Flixel.FlxPoint(this._target.x, this._target.y), new Flixel.FlxPoint(this.x, this.y)) / this._radius;
		if (radialMultiplier < 0)
			radialMultiplier = 0;
		if (radialMultiplier > 1)
			radialMultiplier = 1;

		radialMultiplier = 1 - radialMultiplier;

		if (this._pan) {
			var d = (this.x - this._target.x) / this._radius;
			if (d < -1)
				d = -1;
			else if (d > 1)
				d = 1;
			this._transform.pan = d;
		}
	}

	// Cross-fading volume control
	if (this._fadeOutTimer > 0) {
		this._fadeOutTimer -= Flixel.FlxG.elapsed;
		if (this._fadeOutTimer <= 0) {
			if (this._pauseOnFadeOut)
				this.pause();
			else
				this.stop();
		}
		fadeMultiplier = this._fadeOutTimer / this._fadeOutTotal;
		if (fadeMultiplier < 0)
			fadeMultiplier = 0;
	} else if (this._fadeInTimer > 0) {
		this._fadeInTimer -= Flixel.FlxG.elapsed;
		fadeMultiplier = this._fadeInTimer / this._fadeInTotal;
		if (fadeMultiplier < 0)
			fadeMultiplier = 0;
		fadeMultiplier = 1 - fadeMultiplier;
	}

	this._volumeAdjust = radialMultiplier * fadeMultiplier;
	this.updateTransform();

	// TODO: Amplitude data
	// if (this._transform.volume > 0) {
	// this.amplitudeLeft = this._channel.leftPeak / this._transform.volume;
	// this.amplitudeRight = this._channel.rightPeak / this._transform.volume;
	// this.amplitude = (this.amplitudeLeft + this.amplitudeRight) * 0.5;
	// } else {
	// this.amplitudeLeft = 0;
	// this.amplitudeRight = 0;
	// this.amplitude = 0;
	// }
};

/**
 * Overridden kill method.
 */
Flixel.FlxSound.prototype.kill = function()
{
	Flixel.FlxSound.parent.kill.apply(this);
	this.cleanup(false);
};

/**
 * One of two main setup functions for sounds, this function loads a sound from
 * an embedded MP3.
 * 
 * @param EmbeddedSound
 *            An embedded Class object representing an MP3 file.
 * @param Looped
 *            Whether or not this sound should loop endlessly.
 * @param AutoDestroy
 *            Whether or not this <code>FlxSound</code> instance should be
 *            destroyed when the sound finishes playing. Default value is false,
 *            but FlxG.play() and FlxG.stream() will set it to true by default.
 * 
 * @return This <code>FlxSound</code> instance (nice for chaining stuff
 *         together, if you're into that).
 */
Flixel.FlxSound.prototype.loadEmbedded = function(EmbeddedSound, Looped, AutoDestroy)
{
	Looped = (Looped === undefined) ? false : Looped;
	AutoDestroy = (AutoDestroy === undefined) ? false : AutoDestroy;

	this.cleanup(true);

	this._sound = EmbeddedSound;
	// NOTE: can't pull ID3 info from embedded sound currently
	this._looped = Looped;
	this.autoDestroy = AutoDestroy;
	this.updateTransform();
	this.exists = true;
	return this;
};

/**
 * One of two main setup functions for sounds, this function loads a sound from
 * a URL.
 * 
 * @param EmbeddedSound
 *            A string representing the URL of the MP3 file you want to play.
 * @param Looped
 *            Whether or not this sound should loop endlessly.
 * @param AutoDestroy
 *            Whether or not this <code>FlxSound</code> instance should be
 *            destroyed when the sound finishes playing. Default value is false,
 *            but FlxG.play() and FlxG.stream() will set it to true by default.
 * 
 * @return This <code>FlxSound</code> instance (nice for chaining stuff
 *         together, if you're into that).
 */
Flixel.FlxSound.prototype.loadStream = function(SoundURL, Looped, AutoDestroy)
{
	Looped = (Looped === undefined) ? false : Looped;
	AutoDestroy = (AutoDestroy === undefined) ? false : AutoDestroy;

	this.cleanup(true);

	this._sound = SoundURL;
	// _sound.addEventListener(Event.ID3, gotID3);
	// _sound.load(new URLRequest(SoundURL));
	this._looped = Looped;
	this.autoDestroy = AutoDestroy;
	this.updateTransform();
	this.exists = true;
	return this;
};

/**
 * Call this function if you want this sound's volume to change based on
 * distance from a particular FlxCore object.
 * 
 * @param X
 *            The X position of the sound.
 * @param Y
 *            The Y position of the sound.
 * @param TargetObject
 *            The object you want to track.
 * @param Radius
 *            The maximum distance this sound can travel.
 * @param Pan
 *            Whether the sound should pan in addition to the volume changes
 *            (default: true).
 * 
 * @return This FlxSound instance (nice for chaining stuff together, if you're
 *         into that).
 */
Flixel.FlxSound.prototype.proximity = function(X, Y, TargetObject, Radius, Pan)
{
	Pan = (Pan === undefined) ? true : Pan;

	this.x = X;
	this.y = Y;
	this._target = TargetObject;
	this._radius = Radius;
	this._pan = Pan;
	return this;
};

/**
 * Call this function to play the sound - also works on paused sounds.
 * 
 * @param ForceRestart
 *            Whether to start the sound over or not. Default value is false,
 *            meaning if the sound is already playing or was paused when you
 *            call <code>play()</code>, it will continue playing from its
 *            current position, NOT start again from the beginning.
 */
Flixel.FlxSound.prototype.play = function(ForceRestart)
{
	ForceRestart = (ForceRestart === undefined) ? false : ForceRestart;
	
	if (!this.exists)
		return;
	

	if (this.getPlaying()) {
		return;
	}

	if (this._paused)
		this.resume();
	else
		this.startSound(0, ForceRestart);
};

/**
 * Unpause a sound. Only works on sounds that have been paused.
 */
Flixel.FlxSound.prototype.resume = function()
{
	if (this._channel !== null) {
		if(this._channel.paused)
			this._channel.resume();
		else
			this._channel.play();
	}
	
	this._paused = false;
	this.active = true;
};

/**
 * Call this function to pause this sound.
 */
Flixel.FlxSound.prototype.pause = function()
{
	if (!this.getPlaying())
		return;

	if (this._channel !== null)
		this._channel.pause();

	this._paused = true;
	this.active = false;
};

/**
 * Call this function to stop this sound.
 */
Flixel.FlxSound.prototype.stop = function()
{
	if (this._channel !== null)
		this._channel.stop();

	this._paused = false;
	this.active = false;
};

/**
 * Call this function to make this sound fade out over a certain time interval.
 * 
 * @param Seconds
 *            The amount of time the fade out operation should take.
 * @param PauseInstead
 *            Tells the sound to pause on fadeout, instead of stopping.
 */
Flixel.FlxSound.prototype.fadeOut = function(Seconds, PauseInstead)
{
	PauseInstead = (PauseInstead === undefined) ? false : PauseInstead;

	if (!this.getPlaying()) {
		return;
	}

	this._pauseOnFadeOut = PauseInstead;
	this._fadeInTimer = 0;
	this._fadeOutTimer = Seconds;
	this._fadeOutTotal = this._fadeOutTimer;
};

/**
 * Call this function to make a sound fade in over a certain time interval
 * (calls <code>play()</code> automatically).
 * 
 * @param Seconds
 *            The amount of time the fade-in operation should take.
 */
Flixel.FlxSound.prototype.fadeIn = function(Seconds)
{
	this._fadeOutTimer = 0;
	this._fadeInTimer = Seconds;
	this._fadeInTotal = this._fadeInTimer;
	this.play();
};

/**
 * Whether or not the sound is currently playing.
 */
Flixel.FlxSound.prototype.getPlaying = function()
{
	return (this._channel !== null && this._channel.isPlaying);
};

/**
 * Set <code>volume</code> to a value between 0 and 1 to change how this sound
 * is.
 */
Flixel.FlxSound.prototype.getVolume = function()
{
	return this._volume;
};

/**
 * @private
 */
Flixel.FlxSound.prototype.setVolume = function(Volume)
{
	this._volume = Volume;
	if (this._volume < 0)
		this._volume = 0;
	else if (this._volume > 1)
		this._volume = 1;
	this.updateTransform();
};

/**
 * Returns the currently selected "real" volume of the sound (takes fades and
 * proximity into account).
 * 
 * @return The adjusted volume of the sound.
 */
Flixel.FlxSound.prototype.getActualVolume = function()
{
	return this._volume * this._volumeAdjust;
};

/**
 * Call after adjusting the volume to update the sound channel's settings.
 */
Flixel.FlxSound.prototype.updateTransform = function()
{
	this._transform.volume = (Flixel.FlxG.getMute() ? 0 : 1) * Flixel.FlxG.getMusicVolume() * this._volume * this._volumeAdjust;
	if (this._channel !== null)
		this._channel.setVolume(this._transform.volume);
};

/**
 * An internal helper function used to attempt to start playing the sound and
 * populate the <code>_channel</code> variable.
 */
Flixel.FlxSound.prototype.startSound = function(Position, ForceRestart)
{
	ForceRestart = (ForceRestart === undefined) ? false : ForceRestart;
	
	this._position = Position;
	this._paused = false;
	
	// Initialize the channel if needed
	if(this._channel === null)
		this._channel = Flixel.FlxG.soundManager.add(this._sound, this._volume, this._looped);
	
	this._channel.play('', this._position, this._volume, this._looped, ForceRestart);

	// Check if the sound is active or not
	if (this._channel !== null) {
		this.active = true;
	} else {
		this.exists = false;
		this.active = false;
	}
};

/**
 * An internal helper function used to help Flash clean up (and potentially
 * re-use) finished sounds. Will stop the current sound and destroy the
 * associated <code>SoundChannel</code>, plus, any other commands ordered by
 * the passed in parameters.
 * 
 * @param destroySound
 *            Whether or not to destroy the sound. If this is true, the position
 *            and fading will be reset as well.
 * @param resetPosition
 *            Whether or not to reset the position of the sound.
 * @param resetFading
 *            Whether or not to reset the current fading variables of the sound.
 */
Flixel.FlxSound.prototype.cleanup = function(destroySound, resetPosition, resetFading)
{
	resetPosition = (resetPosition === undefined) ? true : resetPosition;
	resetFading = (resetFading === undefined) ? true : resetFading;

	if (destroySound) {
		this.reset();
		return;
	}

	if (this._channel) {
		this._channel.onStop = null;
		this._channel.stop();
		this._channel = null;
	}

	this.active = false;

	if (resetPosition) {
		this._position = 0;
		this._paused = false;
	}

	if (resetFading) {
		this._fade = null;
		this._onFadeComplete = null;
	}
};

/**
 * Internal event handler for ID3 info (i.e. fetching the song name).
 * 
 * @param event
 *            An <code>Event</code> object.
 */
Flixel.FlxSound.prototype.gotID3 = function(event)
{
	Flixel.FlxG.log("got ID3 info! NOT WORKING ON HTML5");
	this.name = ""; // _sound.id3.songName;
	this.artist = ""; // _sound.id3.artist;
};

/**
 * Return true if the music is paused.
 */
Flixel.FlxSound.prototype.isPaused = function()
{
	return this._paused;
};

/**
 * Return the music position
 */
Flixel.FlxSound.prototype.getPosition = function()
{
	if (this._channel !== null) {
		return this._channel.position;
	} else {
		return -1;
	}
};

/**
 * Start the sound from a position.
 */
Flixel.FlxSound.prototype.setPosition = function(pos)
{
	this.pause();
	this.startSound(pos);
};

/**
 * Returns the class name.
 */
Flixel.FlxSound.prototype.toString = function()
{
	return "FlxSound";
};
/**
 * This class manages all the volume stuff of the Flixel. It could be use
 * internally or extend it in order to create your own crazy hacks.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
Flixel.system.FlxVolumeHandler = function()
{
	/**
	 * The volume of the music
	 */
	this.musicVolume = 0.5;
	/**
	 * The volume of the sounds
	 */
	this.soundVolume = 0.5;
	/**
	 * If we are muted or not
	 */
	this.mute = false;
};
/**
 * A very basic object pool. Used by <code>FlxQuadTree</code> and<br>
 * <code>FlxList</code> to avoid costly instantiations every frame.<br>
 * <br>
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Thomas Weston
 */
Flixel.plugin.FlxObjectPool = function(StartSize)
{
	StartSize = (StartSize === undefined) ? 0 : StartSize;

	this._internalPool = [];

	for (var i = 0; i < StartSize; i++) {
		this._internalPool.push(this.create());
	}
};

/**
 * Internal, stores the pooled objects.
 */
Flixel.plugin.FlxObjectPool.prototype._internalPool = null;

/**
 * Put an object back in the pool.
 * 
 * @param Object
 *            The object to pool.
 */
Flixel.plugin.FlxObjectPool.prototype.dispose = function(Object)
{
	if(this._internalPool.indexOf(Object) == -1)
		this._internalPool.push(Object);
};

/**
 * Gets an object from the pool. If the pool is empty, returns a new object.
 * 
 * @return A new object.
 */
Flixel.plugin.FlxObjectPool.prototype.getNew = function()
{
	var object = null;
	if (this._internalPool.length > 0)
		object = this._internalPool.pop();
	else
		object = this.create();
	return object;
};

/**
 * Instantiates a new object.
 * 
 * @return A new object.
 */
Flixel.plugin.FlxObjectPool.prototype.create = function()
{
};
/**
 * FlxMath
 * -- Part of the Flixel Power Tools set
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Richard Davey / Photon Storm
 */

/**
 * Adds a set of fast Math functions and extends a few commonly used ones
 */
Flixel.plugin.FlxMath = function()
{
};

Flixel.plugin.FlxMath.getrandmax = Number.MAX_VALUE;
Flixel.plugin.FlxMath.mr = 0;
Flixel.plugin.FlxMath.cosTable = [];
Flixel.plugin.FlxMath.sinTable = [];

Flixel.plugin.FlxMath.coefficient1 = Math.PI / 4;
Flixel.plugin.FlxMath.RADTODEG = 180 / Math.PI;
Flixel.plugin.FlxMath.DEGTORAD = Math.PI / 180;

/**
 * Returns true if the given x/y coordinate is within the given rectangular block
 * 
 * @param pointX
 *            The X value to test
 * @param pointY
 *            The Y value to test
 * @param rectX
 *            The X value of the region to test within
 * @param rectY
 *            The Y value of the region to test within
 * @param rectWidth
 *            The width of the region to test within
 * @param rectHeight
 *            The height of the region to test within
 * 
 * @return true if pointX/pointY is within the region, otherwise false
 */
Flixel.plugin.FlxMath.pointInCoordinates = function(pointX, pointY, rectX, rectY, rectWidth, rectHeight)
{
	if (pointX >= rectX && pointX <= (rectX + rectWidth))
	{
		if (pointY >= rectY && pointY <= (rectY + rectHeight))
		{
			return true;
		}
	}

	return false;
};

/**
 * Returns true if the given x/y coordinate is within the given rectangular block
 * 
 * @param pointX
 *            The X value to test
 * @param pointY
 *            The Y value to test
 * @param rect
 *            The FlxRect to test within
 * @return true if pointX/pointY is within the FlxRect, otherwise false
 */
Flixel.plugin.FlxMath.pointInFlxRect = function(pointX, pointY, rect)
{
	if (rect === undefined)
		return false;

	if (pointX >= rect.x && pointX <= rect.getRight() && pointY >= rect.y && pointY <= rect.getBottom())
		return true;

	return false;
};

/**
 * Returns true if the mouse world x/y coordinate are within the given rectangular block
 * 
 * @param useWorldCoords
 *            If true the world x/y coordinates of the mouse will be used, otherwise screen x/y
 * @param rect
 *            The FlxRect to test within. If this is null for any reason this function always returns true.
 * 
 * @return true if mouse is within the FlxRect, otherwise false
 */
Flixel.plugin.FlxMath.mouseInFlxRect = function(useWorldCoords, rect)
{
	if (rect === undefined || rect === null)
		return true;

	if (useWorldCoords)
		return Flixel.plugin.FlxMath.pointInFlxRect(Flixel.FlxG.mouse.x, Flixel.FlxG.mouse.y, rect);
	else
		return Flixel.plugin.FlxMath.pointInFlxRect(Flixel.FlxG.mouse.screenX, Flixel.FlxG.mouse.screenY, rect);
};

/**
 * Returns true if the given x/y coordinate is within the Rectangle
 * 
 * @param pointX
 *            The X value to test
 * @param pointY
 *            The Y value to test
 * @param rect
 *            The Rectangle to test within
 * @return true if pointX/pointY is within the Rectangle, otherwise false
 */
Flixel.plugin.FlxMath.pointInRectangle = function(pointX, pointY, rect)
{
	if (pointX >= rect.x && pointX <= rect.right && pointY >= rect.y && pointY <= rect.bottom)
		return true;

	return false;
};

/**
 * A faster (but much less accurate) version of Math.atan2(). For close range / loose comparisons this works very well, but avoid for long-distance or high accuracy simulations. Based on:
 * http://blog.gamingyourway.com/PermaLink,guid,78341247-3344-4a7a-acb2-c742742edbb1.aspx
 * <p>
 * Computes and returns the angle of the point y/x in radians, when measured counterclockwise from a circle's x axis (where 0,0 represents the center of the circle). The return value is
 * between positive pi and negative pi. Note that the first parameter to atan2 is always the y coordinate.
 * </p>
 * 
 * @param y
 *            The y coordinate of the point
 * @param x
 *            The x coordinate of the point
 * @return The angle of the point x/y in radians
 */
Flixel.plugin.FlxMath.atan2 = function(y, x)
{
	var absY = y;
	var coefficient2 = 3 * Flixel.plugin.FlxMath.coefficient1;
	var r;
	var angle;

	if (absY < 0)
		absY = -absY;

	if (x >= 0) {
		r = (x - absY) / (x + absY);
		angle = Flixel.plugin.FlxMath.coefficient1 - Flixel.plugin.FlxMath.coefficient1 * r;
	} else {
		r = (x + absY) / (absY - x);
		angle = coefficient2 - Flixel.plugin.FlxMath.coefficient1 * r;
	}

	return y < 0 ? -angle : angle;
};

/**
 * Generate a sine and cosine table simultaneously and extremely quickly. Based on research by Franky of scene.at
 * <p>
 * The parameters allow you to specify the length, amplitude and frequency of the wave. Once you have called this function you should get the results via getSinTable() and getCosTable(). This
 * generator is fast enough to be used in real-time.
 * </p>
 * 
 * @param length
 *            The length of the wave
 * @param sinAmplitude
 *            The amplitude to apply to the sine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
 * @param cosAmplitude
 *            The amplitude to apply to the cosine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
 * @param frequency
 *            The frequency of the sine and cosine table data
 * @return Returns the sine table
 * @see getSinTable
 * @see getCosTable
 */
Flixel.plugin.FlxMath.sinCosGenerator = function(length, sinAmplitude, cosAmplitude, frequency)
{
	sinAmplitude = (sinAmplitude === undefined) ? 1.0 : sinAmplitude;
	cosAmplitude = (cosAmplitude === undefined) ? 1.0 : cosAmplitude;
	frequency = (frequency === undefined) ? 1.0 : frequency;
	
	var sin = sinAmplitude;
	var cos = cosAmplitude;
	var frq = frequency * Math.PI / length;

	Flixel.plugin.FlxMath.cosTable = [];
	Flixel.plugin.FlxMath.sinTable = [];

	for (var c = 0; c < length; c++)
	{
		cos -= sin * frq;
		sin += cos * frq;

		Flixel.plugin.FlxMath.cosTable[c] = cos;
		Flixel.plugin.FlxMath.sinTable[c] = sin;
	}

	return Flixel.plugin.FlxMath.sinTable;
};

/**
 * Returns the sine table generated by sinCosGenerator(), or an empty array object if not yet populated
 * 
 * @return Array of sine wave data
 * @see sinCosGenerator
 */
Flixel.plugin.FlxMath.getSinTable = function()
{
	return Flixel.plugin.FlxMath.sinTable;
};

/**
 * Returns the cosine table generated by sinCosGenerator(), or an empty array object if not yet populated
 * 
 * @return Array of cosine wave data
 * @see sinCosGenerator
 */
Flixel.plugin.FlxMath.getCosTable = function()
{
	return Flixel.plugin.FlxMath.cosTable;
};

/**
 * A faster version of Math.sqrt
 * <p>
 * Computes and returns the square root of the specified number.
 * </p>
 * 
 * @link http://osflash.org/as3_speed_optimizations#as3_speed_tests
 * @param val
 *            A number greater than or equal to 0
 * @return If the parameter val is greater than or equal to zero, a number; otherwise NaN (not a number).
 */
Flixel.plugin.FlxMath.sqrt = function(val)
{
	if (isNaN(val))
		return NaN;

	var thresh = 0.002;
	var b = val * 0.25;
	var a;
	var c;

	if (val === 0)
		return 0;

	do {
		c = val / b;
		b = (b + c) * 0.5;
		a = b - c;
		if (a < 0) a = -a;
	}
	while (a > thresh);

	return b;
};

/**
 * Generates a small random number between 0 and 65535 very quickly
 * <p>
 * Generates a small random number between 0 and 65535 using an extremely fast cyclical generator, with an even spread of numbers. After the 65536th call to this function the value resets.
 * </p>
 * 
 * @return A pseudo random value between 0 and 65536 inclusive.
 */
Flixel.plugin.FlxMath.miniRand = function()
{
	var result = Flixel.plugin.FlxMath.mr;

	result++;
	result *= 75;
	result %= 65537;
	result--;

	Flixel.plugin.FlxMath.mr++;

	if (Flixel.plugin.FlxMath.mr == 65536)
	{
		Flixel.plugin.FlxMath.mr = 0;
	}

	return result;
};

/**
 * Generate a random integer
 * <p>
 * If called without the optional min, max arguments rand() returns a peudo-random integer between 0 and getrandmax(). If you want a random number between 5 and 15, for example, (inclusive)
 * use rand(5, 15) Parameter order is insignificant, the return will always be between the lowest and highest value.
 * </p>
 * 
 * @param min
 *            The lowest value to return (default: 0)
 * @param max
 *            The highest value to return (default: getrandmax)
 * @param excludes
 *            An Array of integers that will NOT be returned (default: null)
 * @return A pseudo-random value between min (or 0) and max (or getrandmax, inclusive)
 */
Flixel.plugin.FlxMath.rand = function(min, max, excludes)
{
	if (isNaN(min))
		min = 0;

	if (isNaN(max))
		max = Flixel.plugin.FlxMath.getrandmax;

	if (min == max)
		return min;

	if (excludes !== null && excludes !== undefined) {
		// Sort the exclusion array
		excludes.sort(Array.NUMERIC);

		var result;

		do {
			if (min < max)
				result = int(min + (Flixel.FlxG.random() * (max - min)));
			else
				result = int(max + (Flixel.FlxG.random() * (min - max)));
		}
		while (excludes.indexOf(result) >= 0);

		return result;
	} else {
		// Reverse check
		if (min < max)
			return int(min + (Flixel.FlxG.random() * (max - min)));
		else
			return int(max + (Flixel.FlxG.random() * (min - max)));
	}
};

/**
 * Generate a random float (number)
 * <p>
 * If called without the optional min, max arguments rand() returns a peudo-random float between 0 and getrandmax(). If you want a random number between 5 and 15, for example, (inclusive) use
 * rand(5, 15) Parameter order is insignificant, the return will always be between the lowest and highest value.
 * </p>
 * 
 * @param min
 *            The lowest value to return (default: 0)
 * @param max
 *            The highest value to return (default: getrandmax)
 * @return A pseudo random value between min (or 0) and max (or getrandmax, inclusive)
 */
Flixel.plugin.FlxMath.randFloat = function(min, max)
{
	if (isNaN(min)) {
		min = 0;
	}

	if (isNaN(max)) {
		max = Flixel.plugin.FlxMath.getrandmax;
	}

	if (min == max)
		return min;
	else if (min < max)
		return min + (Math.random() * (max - min + 1));
	else
		return max + (Math.random() * (min - max + 1));
};

/**
 * Generate a random boolean result based on the chance value
 * <p>
 * Returns true or false based on the chance value (default 50%). For example if you wanted a player to have a 30% chance of getting a bonus, call chanceRoll(30) - true means the chance
 * passed, false means it failed.
 * </p>
 * 
 * @param chance
 *            The chance of receiving the value. Should be given as a uint between 0 and 100 (effectively 0% to 100%)
 * @return true if the roll passed, or false
 */
Flixel.plugin.FlxMath.chanceRoll = function(chance)
{
	chance =  (chance === undefined) ? 50 : chance;

	if (chance <= 0) {
		return false;
	} else if (chance >= 100) {
		return true;
	} else {
		if (Math.random() * 100 >= chance)
			return false;
		else
			return true;
	}
};

/**
 * Adds the given amount to the value, but never lets the value go over the specified maximum
 * 
 * @param value
 *            The value to add the amount to
 * @param amount
 *            The amount to add to the value
 * @param max
 *            The maximum the value is allowed to be
 * @return The new value
 */
Flixel.plugin.FlxMath.maxAdd = function(value, amount, max)
{
	value += amount;

	if (value > max)
		value = max;

	return value;
};

/**
 * Adds value to amount and ensures that the result always stays between 0 and max, by wrapping the value around.
 * <p>
 * Values must be positive integers, and are passed through Math.abs
 * </p>
 * 
 * @param value
 *            The value to add the amount to
 * @param amount
 *            The amount to add to the value
 * @param max
 *            The maximum the value is allowed to be
 * @return The wrapped value
 */
Flixel.plugin.FlxMath.wrapValue = function(value, amount, max)
{
	var diff;

	value = Math.abs(value);
	amount = Math.abs(amount);
	max = Math.abs(max);

	diff = (value + amount) % max;

	return diff;
};

/**
 * Finds the length of the given vector
 * 
 * @param dx
 * @param dy
 * 
 * @return
 */
Flixel.plugin.FlxMath.vectorLength = function(dx, dy)
{
	return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Finds the dot product value of two vectors
 * 
 * @param ax
 *            Vector X
 * @param ay
 *            Vector Y
 * @param bx
 *            Vector X
 * @param by
 *            Vector Y
 * 
 * @return Dot product
 */
Flixel.plugin.FlxMath.dotProduct = function(ax, ay, bx, by)
{
	return ax * bx + ay * by;
};

/**
 * Randomly returns either a 1 or -1
 * 
 * @return 1 or -1
 */
Flixel.plugin.FlxMath.randomSign = function()
{
	return (Math.random() > 0.5) ? 1 : -1;
};

/**
 * Returns true if the number given is odd.
 * 
 * @param n
 *            The number to check
 * 
 * @return True if the given number is odd. False if the given number is even.
 */
Flixel.plugin.FlxMath.isOdd = function(n)
{
	if (n & 1)
		return true;
	else
		return false;
};

/**
 * Returns true if the number given is even.
 * 
 * @param n
 *            The number to check
 * 
 * @return True if the given number is even. False if the given number is odd.
 */
Flixel.plugin.FlxMath.isEven = function(n)
{
	if (n & 1)
		return false;
	else
		return true;
};

/**
 * Keeps an angle value between -180 and +180<br>
 * Should be called whenever the angle is updated on the FlxSprite to stop it from going insane.
 * 
 * @param angle
 *            The angle value to check
 * 
 * @return The new angle value, returns the same as the input angle if it was within bounds
 */
Flixel.plugin.FlxMath.wrapAngle = function(angle)
{
	var result = int(angle);

	if (angle > 180) {
		result = -180;
	} else if (angle < -180) {
		result = 180;
	}

	return result;
};

/**
 * Keeps an angle value between the given min and max values
 * 
 * @param angle
 *            The angle value to check. Must be between -180 and +180
 * @param min
 *            The minimum angle that is allowed (must be -180 or greater)
 * @param max
 *            The maximum angle that is allowed (must be 180 or less)
 * 
 * @return The new angle value, returns the same as the input angle if it was within bounds
 */
Flixel.plugin.FlxMath.angleLimit = function(angle, min, max)
{
	var result = angle;

	if (angle > max) {
		result = max;
	} else if (angle < min) {
		result = min;
	}

	return result;
};

/**
 * Converts a Radian value into a Degree
 * <p>
 * Converts the radians value into degrees and returns
 * </p>
 * 
 * @param radians
 *            The value in radians
 * @return Number Degrees
 */
Flixel.plugin.FlxMath.asDegrees = function(radians)
{
	return radians * Flixel.plugin.FlxMath.RADTODEG;
};

/**
 * Converts a Degrees value into a Radian
 * <p>
 * Converts the degrees value into radians and returns
 * </p>
 * 
 * @param degrees
 *            The value in degrees
 * @return Number Radians
 */
Flixel.plugin.FlxMath.asRadians = function(degrees)
{
	return degrees * Flixel.plugin.FlxMath.DEGTORAD;
};

/**
 * Force a value into a range.
 * 
 * @param value
 *            The desired value.
 * @param min
 *            The minimum value.
 * @param max
 *            The maximum value.
 * @return The value inside the range.
 */
Flixel.plugin.FlxMath.constrainRange = function(value, min, max)
{
	if (value > max) return max;
	else if (value < min) return min;
	else return value;
};
/**
 * This is the Pause window, it has the main menu<br>
 * designed to close or finish the pause in the game.<br>
 * You can also add your own menus to the Pause window.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
Flixel.plugin.FlxPause = function()
{
	Flixel.plugin.FlxPause.parent.constructor.apply(this);
};
extend(Flixel.plugin.FlxPause, Flixel.FlxGroup);

/**
 * Returns the class name.
 */
Flixel.plugin.FlxPause.prototype.toString = function()
{
	return "FlxPause";
};
/**
 * An event for the pause system.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param type			The event type.
 */
Flixel.plugin.PauseEvent = function()
{
};

/**
 * The pause in event name.
 */
Flixel.plugin.PauseEvent.PAUSE_IN = "pauseIn";
/**
 * The pause out event name.
 */
Flixel.plugin.PauseEvent.PAUSE_OUT = "pauseOut";

/**
 * Get a new instance.
 */
Flixel.plugin.PauseEvent.getEvent = function(type)
{
	if(Flixel.FlxG.device.ie) {
		var event = document.createEvent("CustomEvent"); 
		event.initCustomEvent(type, false, false, null); 
		return event;
	} else {
		return new CustomEvent(type);
	}
};
/**
 * A simple manager for tracking and updating game timer objects.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiates a new timer manager.
 */
Flixel.plugin.TimerManager = function()
{
	Flixel.plugin.TimerManager.parent.constructor.apply(this);

	this._timers = [];
	this.visible = false; // don't call draw on this plugin
};
extend(Flixel.plugin.TimerManager, Flixel.FlxBasic);

/**
 * The array with the timers
 */
Flixel.plugin.TimerManager.prototype._timers = null;

/**
 * Clean up memory.
 */
Flixel.plugin.TimerManager.prototype.destroy = function()
{
	this.clear();
	this._timers = null;

	Flixel.plugin.TimerManager.parent.destroy.apply(this);
};

/**
 * Called by <code>FlxG.updatePlugins()</code> before the game state has been updated. Cycles through timers and calls <code>update()</code> on each one.
 */
Flixel.plugin.TimerManager.prototype.update = function()
{
	var i = this._timers.length - 1;
	var timer;
	while (i >= 0) {
		timer = this._timers[i--];
		if ((timer !== null) && !timer.paused && !timer.finished && (timer.time > 0))
			timer.update();
	}
};

/**
 * Add a new timer to the timer manager. Usually called automatically by <code>FlxTimer</code>'s constructor.
 * 
 * @param Timer
 *            The <code>FlxTimer</code> you want to add to the manager.
 */
Flixel.plugin.TimerManager.prototype.add = function(Timer)
{
	this._timers.push(Timer);
};

/**
 * Remove a timer from the timer manager. Usually called automatically by <code>FlxTimer</code>'s <code>stop()</code> function.
 * 
 * @param Timer
 *            The <code>FlxTimer</code> you want to remove from the manager.
 */
Flixel.plugin.TimerManager.prototype.remove = function(Timer)
{
	var index = this._timers.indexOf(Timer);
	if (index >= 0)
		this._timers.splice(index, 1);
};

/**
 * Removes all the timers from the timer manager.
 */
Flixel.plugin.TimerManager.prototype.clear = function()
{
	if (this._timers !== null) {
		var i = this._timers.length - 1;
		while (i >= 0) {
			var timer = this._timers[i--];
			if (timer !== null)
				timer.destroy();
		}
		this._timers.length = 0;
	}
};

/**
 * Return the class name.
 */
Flixel.plugin.TimerManager.prototype.toString = function()
{
	return "TimerManager";
};
/**
 * A simple manager for tracking and drawing FlxPath debug data to the screen.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiates a new debug path display manager.
 */
Flixel.plugin.DebugPathDisplay = function()
{
	Flixel.plugin.DebugPathDisplay.parent.constructor.apply(this);

	this._paths = [];
	this.active = false; // don't call update on this plugin
};
extend(Flixel.plugin.DebugPathDisplay, Flixel.FlxBasic);

/**
 * The array with all the paths.
 */
Flixel.plugin.DebugPathDisplay.prototype._paths = null;

/**
 * Clean up memory.
 */
Flixel.plugin.DebugPathDisplay.prototype.destroy = function()
{
	this.clear();
	this._paths = null;

	Flixel.plugin.DebugPathDisplay.parent.destroy.apply(this);
};

/**
 * Called by <code>FlxG.drawPlugins()</code> after the game state has been drawn.<br>
 * Cycles through cameras and calls <code>drawDebug()</code> on each one.
 */
Flixel.plugin.DebugPathDisplay.prototype.draw = function()
{
	if (!Flixel.FlxG.visualDebug || this.ignoreDrawDebug)
		return;

	if (this.cameras === null || this.cameras === undefined)
		this.cameras = Flixel.FlxG.cameras;
	var i = 0;
	var l = this.cameras.length;
	while (i < l)
		this.drawDebug(this.cameras[i++]);
};

/**
 * Similar to <code>FlxObject</code>'s <code>drawDebug()</code> functionality,<br>
 * this function calls <code>drawDebug()</code> on each <code>FlxPath</code> for the specified camera.<br>
 * Very helpful for debugging!<br>
 * 
 * @param Camera
 *            Which <code>FlxCamera</code> object to draw the debug data to.
 */
Flixel.plugin.DebugPathDisplay.prototype.drawDebug = function(Camera)
{
	if (Camera === undefined || Camera === null)
		Camera = Flixel.FlxG.camera;

	var i = this._paths.length - 1;
	var path;
	while (i >= 0) {
		path = this._paths[i--];
		if ((path !== null) && !path.ignoreDrawDebug)
			path.drawDebug(Camera);
	}
};

/**
 * Add a path to the path debug display manager.<br>
 * Usually called automatically by <code>FlxPath</code>'s constructor.
 * 
 * @param Path
 *            The <code>FlxPath</code> you want to add to the manager.
 */
Flixel.plugin.DebugPathDisplay.prototype.add = function(Path)
{
	this._paths.push(Path);
};

/**
 * Remove a path from the path debug display manager.<br>
 * Usually called automatically by <code>FlxPath</code>'s <code>destroy()</code> function.
 * 
 * @param Path
 *            The <code>FlxPath</code> you want to remove from the manager.
 */
Flixel.plugin.DebugPathDisplay.prototype.remove = function(Path)
{
	var index = this._paths.indexOf(Path);
	if (index >= 0)
		this._paths.splice(index, 1);
};

/**
 * Removes all the paths from the path debug display manager.
 */
Flixel.plugin.DebugPathDisplay.prototype.clear = function()
{
	if (this._paths !== null) {
		var i = this._paths.length - 1;
		while (i >= 0) {
			var path = this._paths[i--];
			if (path !== null)
				path.destroy();
		}
		this._paths.length = 0;
	}
};

/**
 * Return the class name.
 */
Flixel.plugin.DebugPathDisplay.prototype.toString = function()
{
	return "DebugPathDisplay";
};
/**
 * A simple timer class, leveraging the new plugins system.
 * Can be used with callbacks or by polling the <code>finished</code> flag.
 * Not intended to be added to a game state or group; the timer manager
 * is responsible for actually calling update(), not the user.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate the timer. Does not set or start the timer.
 */
Flixel.plugin.FlxTimer = function()
{
	this.time = 0;
	this.loops = 0;
	this._callback = null;
	this._timeCounter = 0;
	this._loopsCounter = 0;

	this.paused = false;
	this.finished = false;
};

/**
 * How much time the timer was set for.
 */
Flixel.plugin.FlxTimer.prototype.time = 0;
/**
 * How many loops the timer was set for.
 */
Flixel.plugin.FlxTimer.prototype.loops = 0;
/**
 * Pauses or checks the pause state of the timer.
 */
Flixel.plugin.FlxTimer.prototype.paused = false;
/**
 * Check to see if the timer is finished.
 */
Flixel.plugin.FlxTimer.prototype.finished = false;
/**
 * Internal tracker for the time's-up callback function.<br>
 * Callback should be formed "onTimer(Timer:FlxTimer);"
 */
Flixel.plugin.FlxTimer.prototype._callback = null;
/**
 * Internal tracker for the actual timer counting up.
 */
Flixel.plugin.FlxTimer.prototype._timeCounter = 0;
/**
 * Internal tracker for the loops counting up.
 */
Flixel.plugin.FlxTimer.prototype._loopsCounter = 0;

/**
 * Clean up memory.
 */
Flixel.plugin.FlxTimer.prototype.destroy = function()
{
	this.stop();
	this._callback = null;
};

/**
 * Called by the timer manager plugin to update the timer. If time runs out, the loop counter is advanced, the timer reset, and the callback called if it exists. If the timer runs out of loops, then
 * the timer calls <code>stop()</code>. However, callbacks are called AFTER <code>stop()</code> is called.
 */
Flixel.plugin.FlxTimer.prototype.update = function()
{
	this._timeCounter += Flixel.FlxG.elapsed;
	while ((this._timeCounter >= this.time) && !this.paused && !this.finished) {
		this._timeCounter -= this.time;

		this._loopsCounter++;
		if ((this.loops > 0) && (this._loopsCounter >= this.loops))
			this.stop();

		if (this._callback !== null)
			this._callback(this);
	}
};

/**
 * Starts or resumes the timer. If this timer was paused, then all the parameters are ignored, and the timer is resumed. Adds the timer to the timer manager.
 * 
 * @param Time
 *            How many seconds it takes for the timer to go off.
 * @param Loops
 *            How many times the timer should go off. Default is 1, or "just count down once."
 * @param Callback
 *            Optional, triggered whenever the time runs out, once for each loop. Callback should be formed "onTimer(Timer:FlxTimer);"
 * 
 * @return A reference to itself (handy for chaining or whatever).
 */
Flixel.plugin.FlxTimer.prototype.start = function(Time, Loops, Callback)
{
	Time = (Time === undefined) ? 1 : Time;
	Loops = (Loops === undefined) ? 1 : Loops;

	var timerManager = Flixel.plugin.FlxTimer.getManager();
	if (timerManager !== null)
		timerManager.add(this);

	if (this.paused) {
		this.paused = false;
		return this;
	}

	this.paused = false;
	this.finished = false;
	this.time = Time;
	this.loops = Loops;
	this._callback = Callback;
	this._timeCounter = 0;
	this._loopsCounter = 0;
	return this;
};

/**
 * Stops the timer and removes it from the timer manager.
 */
Flixel.plugin.FlxTimer.prototype.stop = function()
{
	this.finished = true;
	var timerManager = Flixel.plugin.FlxTimer.getManager();
	if (timerManager !== null)
		timerManager.remove(this);
};

/**
 * Read-only: check how much time is left on the timer.
 */
Flixel.plugin.FlxTimer.prototype.getTimeLeft = function()
{
	return this.time - this._timeCounter;
};

/**
 * Read-only: check how many loops are left on the timer.
 */
Flixel.plugin.FlxTimer.prototype.getLoopsLeft = function()
{
	return this.loops - this._loopsCounter;
};

/**
 * Read-only: how far along the timer is, on a scale of 0.0 to 1.0.
 */
Flixel.plugin.FlxTimer.prototype.getProgress = function()
{
	if (this.time > 0)
		return this._timeCounter / this.time;
	else
		return 0;
};

/**
 * Return the Timer Manager plugin.
 */
Flixel.plugin.FlxTimer.getManager = function()
{
	return Flixel.FlxG.getPlugin(Flixel.plugin.TimerManager);
};
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
/**
 * This class manages a stack of states used in order to allow<br>
 * a stack trace. This will be useful so the back key in Android<br>
 * devices act as a real back key.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.plugin.FlxStateStack = function()
{
	this._stateStack = [];
	this._currentMode = Flixel.plugin.FlxStateStack.NORMAL;
};

/**
 * The back key act as in the normal Android devices.
 */
Flixel.plugin.FlxStateStack.NORMAL = 0x0;
/**
 * The normal mode of the back key. Go to the previous state.
 */
// Flixel.plugin.FlxStateStack.DIRECT_BACK = 0x01;
/**
 * The back key pause the game first, and then go to the previous state.
 */
Flixel.plugin.FlxStateStack.PAUSE_GAME = 0x02;
/**
 * The back key is disabled.
 */
Flixel.plugin.FlxStateStack.DISABLED = 0x03;
/**
 * The back mode (Used for the Android Back Key).
 */
Flixel.plugin.FlxStateStack.prototype._currentMode = 0;
/**
 * The state stack.
 */
Flixel.plugin.FlxStateStack.prototype._stateStack = null;

/**
 * Get the current mode of the back key.
 */
Flixel.plugin.FlxStateStack.prototype.getBackKeyMode = function()
{
	return this._currentMode;
};

/**
 * Set the back key mode.
 */
Flixel.plugin.FlxStateStack.prototype.setBackKeyMode = function(mode)
{
	this._currentMode = mode;
};

/**
 * Push a new state in the stack.
 */
Flixel.plugin.FlxStateStack.prototype.pushState = function(state)
{
	var testState = new state.constructor();

	if (testState instanceof Flixel.FlxState) {
		this._stateStack.push(state);
	} else {
		Flixel.FlxG.log("ERROR: " + Flixel.FlxU.getClassName(testState, true) + " must extend Flxstate in order to be used in a FlxStateStack.");
	}
};

/**
 * Push a new state in the stack.
 */
Flixel.plugin.FlxStateStack.prototype.popState = function()
{
	return this._stateStack.pop();
};

/**
 * Returns the size of the stack.
 */
Flixel.plugin.FlxStateStack.prototype.size = function()
{
	return this._stateStack.length;
};

/**
 * Clear the state stack.
 */
Flixel.plugin.FlxStateStack.prototype.clear = function()
{
	this._stateStack.length = 0;
};
/**
 * Splash Screen State, it is call each time the game runs.<br>
 * During the splash screen the game can't be paused.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.plugin.FlxSplashScreen = function()
{
	Flixel.plugin.FlxSplashScreen.parent.constructor.apply(this);
};
extend(Flixel.plugin.FlxSplashScreen, Flixel.FlxState);

/**
 * The pixel size.
 */
Flixel.plugin.FlxSplashScreen.PIXEL_SIZE = 32;
/**
 * The logo timer.
 */
Flixel.plugin.FlxSplashScreen.LOGO_TIMER = 2;
/**
 * The initial game state after the spash screen.
 */
Flixel.plugin.FlxSplashScreen.initialGameState = null;
/**
 * Timer to control the Logo animation.
 */
Flixel.plugin.FlxSplashScreen._logoTimer = 0;

/**
 * We create the whole splash screen state.
 */
Flixel.plugin.FlxSplashScreen.prototype.create = function()
{
	// Set the background color
	Flixel.FlxG.setBgColor(Flixel.FlxG.BLACK);

	// Turn the pause off
	Flixel.FlxG.setDisablePause(true);

	// Set the logo timer
	this._logoTimer = 0;

	// Calculate the scale stuff
	var scale = 1;
	if (Flixel.FlxG.height > 200 && Flixel.FlxG.height > Flixel.FlxG.width)
		scale = 2;
	var pixelSize = Flixel.plugin.FlxSplashScreen.PIXEL_SIZE * scale;

	// Initialize the powered by
	var poweredBy = new Flixel.FlxSprite();
	poweredBy.loadGraphic(Flixel.data.FlxSystemAsset.poweredBy);
	poweredBy.scaleSprite(scale, scale);

	// Set the top and left positions
	var top = (Flixel.FlxG.height / 2) - (((pixelSize * 4) + Flixel.plugin.FlxSplashScreen.PIXEL_SIZE / 2 + int(poweredBy.height)) / 2);
	var left = Flixel.FlxG.width / 2 - pixelSize;

	// Prevent top out of screen
	if (top < 0)
		top = 5;

	// Add all the logo pixels
	this.add(new Flixel.plugin.FlxLogoPixel(left + pixelSize, top, (0xFFFF003F), pixelSize)); // Red
	this.add(new Flixel.plugin.FlxLogoPixel(left, top + pixelSize, (0xFFFFBF37), pixelSize)); // Gold
	this.add(new Flixel.plugin.FlxLogoPixel(left + pixelSize, top + (pixelSize * 2), (0xFF0BC8FF), pixelSize)); // Light Blue
	this.add(new Flixel.plugin.FlxLogoPixel(left, top + (pixelSize * 2), (0xFF3B43FF), pixelSize)); // Dark Blue
	this.add(new Flixel.plugin.FlxLogoPixel(left, top + (pixelSize * 3), (0xFF00B92B), pixelSize)); // Green

	// Set the powered by position
	poweredBy.x = Flixel.FlxG.width / 2 - poweredBy.width / 2;
	poweredBy.y = top + (pixelSize * 4) + Flixel.plugin.FlxSplashScreen.PIXEL_SIZE / 2;
	this.add(poweredBy);
};

/**
 * We override the update method, so we can control the time of the splash screen. We call the garbage collector after the splash screen. And then we start the initial game state.
 */
Flixel.plugin.FlxSplashScreen.prototype.update = function()
{
	Flixel.plugin.FlxSplashScreen.parent.update.apply(this);

	this._logoTimer += Flixel.FlxG.elapsed; // Update the logo timer

	// Change the state if we complete the logo timer
	if (this._logoTimer > Flixel.plugin.FlxSplashScreen.LOGO_TIMER) {
		Flixel.FlxG.setDisablePause(false);
		Flixel.FlxG.switchState(new Flixel.plugin.FlxSplashScreen.initialGameState.constructor());
	}
};
/**
 * This automates the color-rotation effect on the 'S'<br>
 * image during game launch, not used in actual game code.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param xPos
 *            The X position.
 * @param yPos
 *            The Y position.
 * @param finalColor
 *            The final color.
 * @param Size
 *            The size of the pixel.
 */
Flixel.plugin.FlxLogoPixel = function(xPos, yPos, finalColor, Size)
{
	Flixel.plugin.FlxSplashScreen.parent.constructor.apply(this);

	// Build up the color layers
	this._layers = [];
	var colors = [ 0xACFFFFFF, finalColor, 0xACFFFFFF, finalColor, 0xACFFFFFF ];

	// Create the background with the final color
	var background = new Flixel.FlxSprite(xPos, yPos);
	background.makeGraphic(Size, Size, finalColor);
	this.add(background);
	this._layers[0] = background;

	// Create the rest of the layers
	var l = colors.length;
	var index = 0;
	for (var i = 0; i < l; i++) {
		var coloredBlock = new Flixel.FlxSprite(xPos, yPos);
		coloredBlock.makeGraphic(Size, Size, colors[index]);
		this.add(coloredBlock);
		this._layers[i + 1] = coloredBlock;

		if (++index >= l)
			index = 0;
	}
	this._curLayer = this._layers.length - 1;
};
extend(Flixel.plugin.FlxLogoPixel, Flixel.FlxGroup);

/**
 * All the sprite images organized as layers.
 */
Flixel.plugin.FlxLogoPixel.prototype._layers = null;
/**
 * The current layer.
 */
Flixel.plugin.FlxLogoPixel.prototype._curLayer = 0;

/**
 * Overridden update method.
 */
Flixel.plugin.FlxLogoPixel.prototype.update = function()
{
	// If we are in the first layer stop the animation
	if (this._curLayer === 0)
		return;

	// Update the alpha value
	if (this._layers[this._curLayer].getAlpha() >= 0.1)
		this._layers[this._curLayer].setAlpha(this._layers[this._curLayer].getAlpha() - 0.1);
	else {
		this._layers[this._curLayer].setAlpha(0);
		this._curLayer--;
	}
};
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
					(lines.length * (characterHeight + this.customSpacingY)) - this.customSpacingY, true, 0xf);
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
/**
 * Just a helper structure for the FlxSprite animation system.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor
 * 
 * @param Name
 *            What this animation should be called (e.g. "run")
 * @param Frames
 *            An array of numbers indicating what frames to play in what order
 *            (e.g. 1, 2, 3)
 * @param FrameRate
 *            The speed in frames per second that the animation should play at
 *            (e.g. 40)
 * @param Looped
 *            Whether or not the animation is looped or just plays once
 */
Flixel.system.FlxAnim = function(Name, Frames, FrameRate, Looped)
{
	// Set up the constructor stuff
	this.name = Name;
	this.delay = 0;
	if (FrameRate > 0)
		this.delay = 1.0 / FrameRate;
	this.frames = Frames;
	this.looped = (Looped === undefined) ? true : Looped;
};

/**
 * String name of the animation (e.g. "walk")
 */
Flixel.system.FlxAnim.prototype.name = null;
/**
 * Seconds between frames (basically the framerate)
 */
Flixel.system.FlxAnim.prototype.delay = null;
/**
 * A list of frames stored as <code>uint</code> objects
 */
Flixel.system.FlxAnim.prototype.frames = null;
/**
 * Whether or not the animation is looped
 */
Flixel.system.FlxAnim.prototype.looped = null;

/**
 * Clean up memory.
 */
Flixel.system.FlxAnim.prototype.destroy = function()
{
	this.frames = null;
};
/**
 * The pool that returns an instance of the FlxList.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
Flixel.system.FlxListPool = function(StartSize)
{
	Flixel.system.FlxListPool.parent.constructor.apply(this, [StartSize]);
};
extend(Flixel.system.FlxListPool, Flixel.plugin.FlxObjectPool);

/**
 * Overridden create method.
 * 
 * @returns {Flixel.system.FlxList}
 */
Flixel.system.FlxListPool.prototype.create = function()
{
	return new Flixel.system.FlxList();
};
/**
 * A miniature linked list class.<br>
 * Useful for optimizing time-critical or highly repetitive tasks!<br>
 * See <code>FlxQuadTree</code> for how to use it, IF YOU DARE.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 * @author	Ka Wing Chin
 */

/**
 * Creates a new link, and sets <code>object</code> and <code>next</code> to
 * <code>null</code>.
 */
Flixel.system.FlxList = function()
{
	this.object = null;
	this.next = null;
	this.ID = int(Math.random() * 100);
};

/**
 * Stores a reference to a <code>FlxObject</code>.
 */
Flixel.system.FlxList.prototype.object = null;
/**
 * Stores a reference to the next link in the list.
 */
Flixel.system.FlxList.prototype.next = null;
/**
 * An ID for each list.
 */
Flixel.system.FlxList.prototype.ID = null;

/**
 * Clean up memory.
 */
Flixel.system.FlxList.prototype.destroy = function()
{
	this.object = null;
	if (this.next !== null)
		this.next.destroy();
	this.next = null;

	Flixel.system.FlxList._pool.dispose(this);
};

/**
 * Internal, a pool of <code>FlxList</code>s to prevent constant
 * <code>new</code> calls.
 */
Flixel.system.FlxList._pool = new Flixel.system.FlxListPool();

/**
 * Gets a new <code>FlxList</code> from the pool.
 * 
 * @return
 */
Flixel.system.FlxList.getNew = function()
{
	return Flixel.system.FlxList._pool.getNew();
};
/**
 * The pool that returns an instance of the FlxQuadTree.
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
Flixel.system.FlxQuadTreePool = function(StartSize)
{
	Flixel.system.FlxQuadTreePool.parent.constructor.apply(this, [StartSize]);
};
extend(Flixel.system.FlxQuadTreePool, Flixel.plugin.FlxObjectPool);

/**
 * Overridden create method.
 * 
 * @returns {Flixel.system.FlxQuadTree}
 */
Flixel.system.FlxQuadTreePool.prototype.create = function()
{
	return new Flixel.system.FlxQuadTree();
};
/**
 * A fairly generic quad tree structure for rapid overlap checks.<br>
 * FlxQuadTree is also configured for single or dual list operation.<br>
 * You can add items either to its A list or its B list.<br>
 * When you do an overlap check, you can compare the A list to itself,<br>
 * or the A list against the B list.  Handy for different things!<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Private constructor.
 */
Flixel.system.FlxQuadTree = function()
{
	Flixel.system.FlxQuadTree.parent.constructor.apply(this);
};
extend(Flixel.system.FlxQuadTree, Flixel.FlxRect);

/**
 * Flag for specifying that you want to add an object to the A list.
 */
Flixel.system.FlxQuadTree.A_LIST = 0;
/**
 * Flag for specifying that you want to add an object to the B list.
 */
Flixel.system.FlxQuadTree.B_LIST = 1;

/**
 * Controls the granularity of the quad tree. Default is 6 (decent performance on large and small worlds).
 */
Flixel.system.FlxQuadTree.divisions = 0;

/**
 * Whether this branch of the tree can be subdivided or not.
 */
Flixel.system.FlxQuadTree.prototype._canSubdivide = false;

/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._headA = null;
/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._tailA = null;
/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._headB = null;
/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._tailB = null;

/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree._min = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._northWestTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._northEastTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._southEastTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._southWestTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._leftEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._rightEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._topEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._bottomEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._halfWidth = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._halfHeight = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._midpointX = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._midpointY = 0;

/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._object = null;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectLeftEdge = 0;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectTopEdge = 0;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectRightEdge = 0;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectBottomEdge = 0;

/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._list = 0;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._useBothLists = false;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._processingCallback = null;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._notifyCallback = null;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._iterator = null;

/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullX = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullY = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullWidth = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullHeight = 0;

/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullX = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullY = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullWidth = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullHeight = 0;

/**
 * How deep this quadtree is.
 */
Flixel.system.FlxQuadTree.prototype.deep = 0;

/**
 * Internal, a pool of <code>FlxQuadTree</code>s to prevent constant <code>new</code> calls.
 */
Flixel.system.FlxQuadTree._pool = new Flixel.system.FlxQuadTreePool();

/**
 * Get a new Quad Tree node from the pool.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 * @param WidthDesired
 *            width of this node.
 * @param HeightDesired
 *            height of this node.
 * @param ParentThe
 *            parent branch or node. Pass null to create a root.
 * 
 * @return A new <code>FlxQuadTree</code>.
 */
Flixel.system.FlxQuadTree.getNew = function(X, Y, Width, Height, Parent)
{
	var quadTree = Flixel.system.FlxQuadTree._pool.getNew();
	quadTree.init(X, Y, Width, Height, Parent);
	return quadTree;
};

/**
 * Instantiate a new Quad Tree node.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 * @param WidthDesired
 *            width of this node.
 * @param HeightDesired
 *            height of this node.
 * @param ParentThe
 *            parent branch or node. Pass null to create a root.
 */
Flixel.system.FlxQuadTree.prototype.init = function(X, Y, Width, Height, Parent)
{
	this.make(X, Y, Width, Height);
	this._headA = this._tailA = Flixel.system.FlxList.getNew();
	this._headB = this._tailB = Flixel.system.FlxList.getNew();
	this.deep = (Parent !== null) ? Parent.deep + 1 : 0;

	// Copy the parent's children (if there are any)
	if (Parent !== null) {
		var iterator;
		var ot;

		if (Parent._headA.object !== null)
		{
			iterator = Parent._headA;

			while (iterator !== null)
			{
				if (this._tailA.object !== null)
				{
					ot = this._tailA;
					this._tailA = Flixel.system.FlxList.getNew();
					ot.next = this._tailA;
				}
				this._tailA.object = iterator.object;
				iterator = iterator.next;
			}
		}
		if (Parent._headB.object !== null)
		{
			iterator = Parent._headB;
			while (iterator !== null)
			{
				if (this._tailB.object !== null)
				{
					ot = this._tailB;
					this._tailB = Flixel.system.FlxList.getNew();
					ot.next = this._tailB;
				}
				this._tailB.object = iterator.object;
				iterator = iterator.next;
			}
		}
	} else
		Flixel.system.FlxQuadTree._min = (this.width + this.height) / (2 * Flixel.system.FlxQuadTree.divisions);
	this._canSubdivide = (this.width > Flixel.system.FlxQuadTree._min) || (this.height > Flixel.system.FlxQuadTree._min);

	// Set up comparison/sort helpers
	this._northWestTree = null;
	this._northEastTree = null;
	this._southEastTree = null;
	this._southWestTree = null;
	this._leftEdge = this.x;
	this._rightEdge = this.x + this.width;
	this._halfWidth = this.width / 2;
	this._midpointX = this._leftEdge + this._halfWidth;
	this._topEdge = this.y;
	this._bottomEdge = this.y + this.height;
	this._halfHeight = this.height / 2;
	this._midpointY = this._topEdge + this._halfHeight;
};

/**
 * Clean up memory.
 */
Flixel.system.FlxQuadTree.prototype.destroy = function()
{
	if (this._headA !== null)
		this._headA.destroy();
	if (this._tailA !== null)
		this._tailA.destroy();
	if (this._headB !== null)
		this._headB.destroy();
	if (this._tailB !== null)
		this._tailB.destroy();

	this._headA = null;
	this._tailA = null;
	this._headB = null;
	this._tailB = null;

	if (this._northWestTree !== null)
		this._northWestTree.destroy();
	if (this._northEastTree !== null)
		this._northEastTree.destroy();
	if (this._southEastTree !== null)
		this._southEastTree.destroy();
	if (this._southWestTree !== null)
		this._southWestTree.destroy();

	this._northWestTree = null;
	this._northEastTree = null;
	this._southEastTree = null;
	this._southWestTree = null;

	Flixel.system.FlxQuadTree._object = null;
	Flixel.system.FlxQuadTree._processingCallback = null;
	Flixel.system.FlxQuadTree._notifyCallback = null;

	Flixel.system.FlxQuadTree._pool.dispose(this);
};

/**
 * Load objects and/or groups into the quad tree, and register notify and processing callbacks.
 * 
 * @param ObjectOrGroup1
 *            Any object that is or extends FlxObject or FlxGroup.
 * @param ObjectOrGroup2
 *            Any object that is or extends FlxObject or FlxGroup. If null, the first parameter will be checked against itself.
 * @param NotifyCallback
 *            A function with the form <code>myFunction(Object1:FlxObject,Object2:FlxObject):void</code> that is called whenever two objects are found to overlap in world space, and either no
 *            ProcessCallback is specified, or the ProcessCallback returns true.
 * @param ProcessCallback
 *            A function with the form <code>myFunction(Object1:FlxObject,Object2:FlxObject):Boolean</code> that is called whenever two objects are found to overlap in world space. The
 *            NotifyCallback is only called if this function returns true. See FlxObject.separate().
 */
Flixel.system.FlxQuadTree.prototype.load = function(ObjectOrGroup1, ObjectOrGroup2, NotifyCallback, ProcessCallback)
{

	this.add(ObjectOrGroup1, Flixel.system.FlxQuadTree.A_LIST);

	if (ObjectOrGroup2 !== null && ObjectOrGroup2 !== undefined) {
		this.add(ObjectOrGroup2, Flixel.system.FlxQuadTree.B_LIST);
		Flixel.system.FlxQuadTree._useBothLists = true;
	} else
		Flixel.system.FlxQuadTree._useBothLists = false;

	Flixel.system.FlxQuadTree._notifyCallback = NotifyCallback;
	Flixel.system.FlxQuadTree._processingCallback = ProcessCallback;
};

/**
 * Call this function to add an object to the root of the tree. This function will recursively add all group members, but not the groups themselves.
 * 
 * @param ObjectOrGroup
 *            FlxObjects are just added, FlxGroups are recursed and their applicable members added accordingly.
 * @param List
 *            A <code>uint</code> flag indicating the list to which you want to add the objects. Options are <code>A_LIST</code> and <code>B_LIST</code>.
 */
Flixel.system.FlxQuadTree.prototype.add = function(ObjectOrGroup, List)
{
	Flixel.system.FlxQuadTree._list = List;

	if (ObjectOrGroup instanceof Flixel.FlxGroup)
	{
		var i = 0;
		var basic;
		var members = ObjectOrGroup.members;
		var l = ObjectOrGroup.length;

		while (i < l) {
			basic = members[i++];
	
			if ((basic !== null && basic !== undefined) && basic.exists)
			{
				if (basic instanceof Flixel.FlxGroup) {
					this.add(basic, List);
				}
				else if (basic instanceof Flixel.FlxObject)
				{
					Flixel.system.FlxQuadTree._object = basic;

					if (Flixel.system.FlxQuadTree._object.exists && Flixel.system.FlxQuadTree._object.allowCollisions)
					{
						Flixel.system.FlxQuadTree._objectLeftEdge = Flixel.system.FlxQuadTree._object.x;
						Flixel.system.FlxQuadTree._objectTopEdge = Flixel.system.FlxQuadTree._object.y;
						Flixel.system.FlxQuadTree._objectRightEdge = Flixel.system.FlxQuadTree._object.x + Flixel.system.FlxQuadTree._object.width;
						Flixel.system.FlxQuadTree._objectBottomEdge = Flixel.system.FlxQuadTree._object.y + Flixel.system.FlxQuadTree._object.height;
						this.addObject();
					}
				}
			}
		}
	} else {
		Flixel.system.FlxQuadTree._object = ObjectOrGroup;

		if (Flixel.system.FlxQuadTree._object.exists && Flixel.system.FlxQuadTree._object.allowCollisions)
		{
			Flixel.system.FlxQuadTree._objectLeftEdge = Flixel.system.FlxQuadTree._object.x;
			Flixel.system.FlxQuadTree._objectTopEdge = Flixel.system.FlxQuadTree._object.y;
			Flixel.system.FlxQuadTree._objectRightEdge = Flixel.system.FlxQuadTree._object.x + Flixel.system.FlxQuadTree._object.width;
			Flixel.system.FlxQuadTree._objectBottomEdge = Flixel.system.FlxQuadTree._object.y + Flixel.system.FlxQuadTree._object.height;
			this.addObject();
		}
	}
};

/**
 * Internal function for recursively navigating and creating the tree while adding objects to the appropriate nodes.
 */
Flixel.system.FlxQuadTree.prototype.addObject = function()
{
	// If this quad (not its children) lies entirely inside this object, add it here
	if (!this._canSubdivide || ((this._leftEdge >= Flixel.system.FlxQuadTree._objectLeftEdge) &&  (this._rightEdge <= Flixel.system.FlxQuadTree._objectRightEdge) &&  (this._topEdge >= Flixel.system.FlxQuadTree._objectTopEdge) && (this._bottomEdge <= Flixel.system.FlxQuadTree._objectBottomEdge))) {
		this.addToList();
		return;
	}

	// See if the selected object fits completely inside any of the quadrants
	if ((Flixel.system.FlxQuadTree._objectLeftEdge > this._leftEdge) && (Flixel.system.FlxQuadTree._objectRightEdge < this._midpointX)) {
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._midpointY)) {
			if (this._northWestTree === null)
				this._northWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._topEdge, this._halfWidth, this._halfHeight, this);
			this._northWestTree.addObject();
			return;
		}
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._bottomEdge)) {
			if (this._southWestTree === null)
				this._southWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._midpointY, this._halfWidth, this._halfHeight, this);
			this._southWestTree.addObject();
			return;
		}
	}
	if ((Flixel.system.FlxQuadTree._objectLeftEdge > this._midpointX) && (Flixel.system.FlxQuadTree._objectRightEdge < this._rightEdge)) {
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._midpointY)) {
			if (this._northEastTree === null)
				this._northEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._topEdge, this._halfWidth, this._halfHeight, this);
			this._northEastTree.addObject();
			return;
		}
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._bottomEdge)) {
			if (this._southEastTree === null)
				this._southEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._midpointY, this._halfWidth, this._halfHeight, this);
			this._southEastTree.addObject();
			return;
		}
	}

	// If it wasn't completely contained we have to check out the partial overlaps
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._leftEdge) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._midpointX) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectTopEdge < this._midpointY)) {
		if (this._northWestTree === null)
			this._northWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._topEdge, this._halfWidth, this._halfHeight, this);
		this._northWestTree.addObject();
	}
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._midpointX) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._rightEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectTopEdge < this._midpointY)) {
		if (this._northEastTree === null)
			this._northEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._topEdge, this._halfWidth, this._halfHeight, this);
		this._northEastTree.addObject();
	}
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._midpointX) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._rightEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectTopEdge < this._bottomEdge)) {
		if (this._southEastTree === null)
			this._southEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._midpointY, this._halfWidth, this._halfHeight, this);
		this._southEastTree.addObject();
	}
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._leftEdge) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._midpointX) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectTopEdge < this._bottomEdge)) {
		if (this._southWestTree === null)
			this._southWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._midpointY, this._halfWidth, this._halfHeight, this);
		this._southWestTree.addObject();
	}
};

/**
 * Internal function for recursively adding objects to leaf lists.
 */
Flixel.system.FlxQuadTree.prototype.addToList = function()
{
	var ot;
	
	if (Flixel.system.FlxQuadTree._list == Flixel.system.FlxQuadTree.A_LIST)
	{
		if (this._tailA.object !== null)
		{
			ot = this._tailA;
			this._tailA = Flixel.system.FlxList.getNew();
			ot.next = this._tailA;
		}
		this._tailA.object = Flixel.system.FlxQuadTree._object;
	}
	else
	{
		if (this._tailB.object !== null)
		{
			ot = this._tailB;
			this._tailB = Flixel.system.FlxList.getNew();
			ot.next = this._tailB;
		}
		this._tailB.object = Flixel.system.FlxQuadTree._object;
	}

	if (!this._canSubdivide)
		return;
	if (this._northWestTree !== null)
		this._northWestTree.addToList();
	if (this._northEastTree !== null)
		this._northEastTree.addToList();
	if (this._southEastTree !== null)
		this._southEastTree.addToList();
	if (this._southWestTree !== null)
		this._southWestTree.addToList();
};

/**
 * <code>FlxQuadTree</code>'s other main function. Call this after adding objects using <code>FlxQuadTree.load()</code> to compare the objects that you loaded.
 * 
 * @return Whether or not any overlaps were found.
 */
Flixel.system.FlxQuadTree.prototype.execute = function()
{
	var overlapProcessed = false;
	var iterator;
	
	if (this._headA.object !== null) {
		iterator = this._headA;
		
		while (iterator !== null)
		{
			Flixel.system.FlxQuadTree._object = iterator.object;
			if (Flixel.system.FlxQuadTree._useBothLists)
				Flixel.system.FlxQuadTree._iterator = this._headB;
			else
				Flixel.system.FlxQuadTree._iterator = iterator.next;

			if (Flixel.system.FlxQuadTree._object.exists && (Flixel.system.FlxQuadTree._object.allowCollisions > 0) && (Flixel.system.FlxQuadTree._iterator !== null) && (Flixel.system.FlxQuadTree._iterator.object !== null) && Flixel.system.FlxQuadTree._iterator.object.exists && this.overlapNode()) {
				overlapProcessed = true;
			}

			iterator = iterator.next;
		}
	}

	// Advance through the tree by calling overlap on each child
	if ((this._northWestTree !== null) && this._northWestTree.execute())
		overlapProcessed = true;
	if ((this._northEastTree !== null) && this._northEastTree.execute())
		overlapProcessed = true;
	if ((this._southEastTree !== null) && this._southEastTree.execute())
		overlapProcessed = true;
	if ((this._southWestTree !== null) && this._southWestTree.execute())
		overlapProcessed = true;

	return overlapProcessed;
};

/**
 * An internal function for comparing an object against the contents of a node.
 * 
 * @return Whether or not any overlaps were found.
 */
Flixel.system.FlxQuadTree.prototype.overlapNode = function()
{
	// Walk the list and check for overlaps
	var overlapProcessed = false;
	var checkObject;
	var iterator = Flixel.system.FlxQuadTree._iterator;

	while (iterator !== null) {
		if (!Flixel.system.FlxQuadTree._object.exists || (Flixel.system.FlxQuadTree._object.allowCollisions <= 0))
			break;

		checkObject = iterator.object;
		if ((Flixel.system.FlxQuadTree._object === checkObject) || !checkObject.exists || (checkObject.allowCollisions <= 0)) {
			iterator = iterator.next;
			continue;
		}

		// Calculate bulk hull for _object
		Flixel.system.FlxQuadTree._objectHullX = (Flixel.system.FlxQuadTree._object.x < Flixel.system.FlxQuadTree._object.last.x) ? Flixel.system.FlxQuadTree._object.x : Flixel.system.FlxQuadTree._object.last.x;
		Flixel.system.FlxQuadTree._objectHullY = (Flixel.system.FlxQuadTree._object.y < Flixel.system.FlxQuadTree._object.last.y) ? Flixel.system.FlxQuadTree._object.y : Flixel.system.FlxQuadTree._object.last.y;
		Flixel.system.FlxQuadTree._objectHullWidth = Flixel.system.FlxQuadTree._object.x - Flixel.system.FlxQuadTree._object.last.x;
		Flixel.system.FlxQuadTree._objectHullWidth = Flixel.system.FlxQuadTree._object.width + ((Flixel.system.FlxQuadTree._objectHullWidth > 0) ? Flixel.system.FlxQuadTree._objectHullWidth : -Flixel.system.FlxQuadTree._objectHullWidth);
		Flixel.system.FlxQuadTree._objectHullHeight = Flixel.system.FlxQuadTree._object.y - Flixel.system.FlxQuadTree._object.last.y;
		Flixel.system.FlxQuadTree._objectHullHeight = Flixel.system.FlxQuadTree._object.height + ((Flixel.system.FlxQuadTree._objectHullHeight > 0) ? Flixel.system.FlxQuadTree._objectHullHeight : -Flixel.system.FlxQuadTree._objectHullHeight);

		// calculate bulk hull for checkObject
		Flixel.system.FlxQuadTree._checkObjectHullX = (checkObject.x < checkObject.last.x) ? checkObject.x : checkObject.last.x;
		Flixel.system.FlxQuadTree._checkObjectHullY = (checkObject.y < checkObject.last.y) ? checkObject.y : checkObject.last.y;
		Flixel.system.FlxQuadTree._checkObjectHullWidth = checkObject.x - checkObject.last.x;
		Flixel.system.FlxQuadTree._checkObjectHullWidth = checkObject.width + ((Flixel.system.FlxQuadTree._checkObjectHullWidth > 0) ? Flixel.system.FlxQuadTree._checkObjectHullWidth : -Flixel.system.FlxQuadTree._checkObjectHullWidth);
		Flixel.system.FlxQuadTree._checkObjectHullHeight = checkObject.y - checkObject.last.y;
		Flixel.system.FlxQuadTree._checkObjectHullHeight = checkObject.height + ((Flixel.system.FlxQuadTree._checkObjectHullHeight > 0) ? Flixel.system.FlxQuadTree._checkObjectHullHeight : -Flixel.system.FlxQuadTree._checkObjectHullHeight);

		// check for intersection of the two hulls
		if ((Flixel.system.FlxQuadTree._objectHullX + Flixel.system.FlxQuadTree._objectHullWidth > Flixel.system.FlxQuadTree._checkObjectHullX) && (Flixel.system.FlxQuadTree._objectHullX < Flixel.system.FlxQuadTree._checkObjectHullX + Flixel.system.FlxQuadTree._checkObjectHullWidth) && (Flixel.system.FlxQuadTree._objectHullY + Flixel.system.FlxQuadTree._objectHullHeight > Flixel.system.FlxQuadTree._checkObjectHullY) && (Flixel.system.FlxQuadTree._objectHullY < Flixel.system.FlxQuadTree._checkObjectHullY + Flixel.system.FlxQuadTree._checkObjectHullHeight)) {
			// Execute callback functions if they exist
			if ((Flixel.system.FlxQuadTree._processingCallback === null || Flixel.system.FlxQuadTree._processingCallback === undefined) || Flixel.system.FlxQuadTree._processingCallback(Flixel.system.FlxQuadTree._object, checkObject))
				overlapProcessed = true;
			if (overlapProcessed && (Flixel.system.FlxQuadTree._notifyCallback !== null && Flixel.system.FlxQuadTree._notifyCallback !== undefined))
				Flixel.system.FlxQuadTree._notifyCallback(Flixel.system.FlxQuadTree._object, checkObject);
		}

		iterator = iterator.next;
	}

	Flixel.system.FlxQuadTree._iterator = iterator;

	return overlapProcessed;
};
/**
 * A simple helper object for <code>FlxTilemap</code> that helps expand
 * collision opportunities and control. You can use
 * <code>FlxTilemap.setTileProperties()</code> to alter the collision
 * properties and callback functions and filters for this object to do
 * things like one-way tiles or whatever.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate this new tile object. This is usually called from
 * <code>FlxTilemap.loadMap()</code>.
 * 
 * @param Tilemap
 *            A reference to the tilemap object creating the tile.
 * @param Index
 *            The actual core map data index for this tile type.
 * @param Width
 *            The width of the tile.
 * @param Height
 *            The height of the tile.
 * @param Visible
 *            Whether the tile is visible or not.
 * @param AllowCollisions
 *            The collision flags for the object. By default this value is ANY
 *            or NONE depending on the parameters sent to loadMap().
 */
Flixel.system.FlxTile = function(Tilemap, Index, Width, Height, Visible, AllowCollisions)
{	
	Flixel.system.FlxTile.parent.constructor.apply(this, [0, 0, Width, Height]);
	
	this.immovable = true;
	this.moves = false;
	this.callback = null;
	this.filter = null;

	this.tilemap = Tilemap;
	this.index = Index;
	this.visible = Visible;
	this.allowCollisions = AllowCollisions;

	this.mapIndex = 0;
	this.offset = new Flixel.FlxPoint();
};

extend(Flixel.system.FlxTile, Flixel.FlxObject);


/**
 * This function is called whenever an object hits a tile of this type. This
 * function should take the form
 * <code>myFunction(Tile:FlxTile,Object:FlxObject):void</code>. Defaults to
 * null, set through <code>FlxTilemap.setTileProperties()</code>.
 */
Flixel.system.FlxTile.prototype.callback = null;
/**
 * Each tile can store its own filter class for their callback functions. That
 * is, the callback will only be triggered if an object with a class type
 * matching the filter touched it. Defaults to null, set through
 * <code>FlxTilemap.setTileProperties()</code>.
 */
Flixel.system.FlxTile.prototype.filter = null;
/**
 * A reference to the tilemap this tile object belongs to.
 */
Flixel.system.FlxTile.prototype.tilemap = null;
/**
 * The index of this tile type in the core map data. For example, if your map
 * only has 16 kinds of tiles in it, this number is usually between 0 and 15.
 */
Flixel.system.FlxTile.prototype.index = null;
/**
 * The current map index of this tile object at this moment. You can think of
 * tile objects as moving around the tilemap helping with collisions. This value
 * is only reliable and useful if used from the callback function.
 */
Flixel.system.FlxTile.prototype.mapIndex = null;
/**
 * The collision and draw debug offset.
 */
Flixel.system.FlxTile.prototype.offset = null;


/**
 * Clean up memory.
 */
Flixel.system.FlxTile.prototype.destroy = function()
{
	this.callback = null;
	this.tilemap = null;
	this.offset = null;

	Flixel.system.FlxTile.parent.destroy.apply(this);
};

/**
 * Helper function that adjusts the offset automatically to center the bounding
 * box within the graphic.
 */
Flixel.system.FlxTile.prototype.centerOffsets = function()
{
	this.offset.set(0, 0);
};
/**
 * A helper object to keep tilemap drawing performance decent across the new multi-camera system.
 * Pretty much don't even have to think about this class unless you are doing some crazy hacking.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Instantiates a new camera-specific buffer for storing the visual tilemap data.
 *  
 * @param TileWidthThe width of the tiles in this tilemap.
 * @param TileHeight	The height of the tiles in this tilemap.
 * @param WidthInTiles	How many tiles wide the tilemap is.
 * @param HeightInTiles	How many tiles tall the tilemap is.
 * @param CameraWhich camera this buffer relates to.
 */
Flixel.system.FlxTilemapBuffer = function(TileWidth, TileHeight, WidthInTiles, HeightInTiles, Camera)
{
	if(Camera === null)
		Camera = Flixel.FlxG.camera;

	this.columns = Math.ceil(Camera.width / TileWidth) + 1;
	if(this.columns > WidthInTiles)
		this.columns = WidthInTiles;
	this.rows = Math.ceil(Camera.height / TileHeight) + 1;
	if(this.rows > HeightInTiles)
		this.rows = HeightInTiles;
	
	this._pixels = new BitmapData(this.columns * TileWidth, this.rows * TileHeight, true, 0);
	this.width = this._pixels.width;
	this.height = this._pixels.height;	
	this._flashRect = new Flixel.FlxRect(0, 0, this.width, this.height);
	this.dirty = true;
};

/**
 * The current X position of the buffer.
 */
Flixel.system.FlxTilemapBuffer.prototype.x = 0;
/**
 * The current Y position of the buffer.
 */
Flixel.system.FlxTilemapBuffer.prototype.y = 0;
/**
 * The width of the buffer (usually just a few tiles wider than the camera).
 */
Flixel.system.FlxTilemapBuffer.prototype.width = 0;
/**
 * The height of the buffer (usually just a few tiles taller than the camera).
 */
Flixel.system.FlxTilemapBuffer.prototype.height = 0;
/**
 * Whether the buffer needs to be redrawn.
 */
Flixel.system.FlxTilemapBuffer.prototype.dirty = false;
/**
 * How many rows of tiles fit in this buffer.
 */
Flixel.system.FlxTilemapBuffer.prototype.rows = 0;
/**
 * How many columns of tiles fit in this buffer.
 */
Flixel.system.FlxTilemapBuffer.prototype.columns = 0;
/**
 * The bitmap data.
 */
Flixel.system.FlxTilemapBuffer.prototype._pixels = null;	
/**
 * The flash drawing rectangle.
 */
Flixel.system.FlxTilemapBuffer.prototype._flashRect = null;

/**
 * Clean up memory.
 */
Flixel.system.FlxTilemapBuffer.prototype.destroy = function()
{
	this._pixels = null;
};

/**
 * Fill the buffer with the specified color.
 * Default value is transparent.
 * 
 * @param	Color	What color to fill with, in 0xAARRGGBB hex format.
 */
Flixel.system.FlxTilemapBuffer.prototype.fill = function(Color)
{
	Color = (Color === undefined) ? 0 : Color;
	this._pixels.fillRect(this._flashRect, Color);
};

/**
 * Read-only, nab the actual buffer <code>BitmapData</code> object.
 * 
 * @return	The buffer bitmap data.
 */
Flixel.system.FlxTilemapBuffer.prototype.getPixels = function()
{
	return this._pixels;
};

/**
 * Just stamps this buffer onto the specified camera at the specified location.
 * 
 * @param	CameraWhich camera to draw the buffer onto.
 * @param	FlashPoint	Where to draw the buffer at in camera coordinates.
 */
Flixel.system.FlxTilemapBuffer.prototype.draw = function(Camera, FlashPoint)
{
	Camera.buffer.copyPixels(this._pixels, this._flashRect, FlashPoint, null, null, true);
};
/**
 * The replay object both records and replays game recordings, as well as handle saving and loading replays to and from files. Gameplay recordings are essentially a list of keyboard and mouse inputs,
 * but since Flixel is fairly deterministic, we can use these to play back recordings of gameplay with a decent amount of fidelity.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new replay object. Doesn't actually do much until you call create() or load().
 */
Flixel.system.FlxReplay = function()
{
	this.seed = 0;
	this.frame = 0;
	this.frameCount = 0;
	this.finished = false;
	this._frames = null;
	this._capacity = 0;
	this._marker = 0;
};
/**
 * The random number generator seed value for this recording.
 */
Flixel.system.FlxReplay.prototype.seed = 0;
/**
 * The current frame for this recording.
 */
Flixel.system.FlxReplay.prototype.frame = 0;
/**
 * The number of frames in this recording.
 */
Flixel.system.FlxReplay.prototype.frameCount = 0;
/**
 * Whether the replay has finished playing or not.
 */
Flixel.system.FlxReplay.prototype.finished = false;
/**
 * Internal container for all the frames in this replay.
 */
Flixel.system.FlxReplay.prototype._frames = null;
/**
 * Internal tracker for max number of frames we can fit before growing the <code>_frames</code> again.
 */
Flixel.system.FlxReplay.prototype._capacity = 0;
/**
 * Internal helper variable for keeping track of where we are in <code>_frames</code> during recording or replay.
 */
Flixel.system.FlxReplay.prototype._marker = 0;

/**
 * Clean up memory.
 */
Flixel.system.FlxReplay.prototype.destroy = function()
{
	if (this._frames !== null) {
		var i = this.frameCount - 1;
		while (i >= 0)
			this._frames[i--].destroy();
		this._frames = null;
	}
};

/**
 * Create a new gameplay recording. Requires the current random number generator seed.
 * 
 * @param Seed
 *            The current seed from the random number generator.
 */
Flixel.system.FlxReplay.prototype.create = function(Seed)
{
	this.destroy();
	this.init();
	this.seed = Seed;
	this.rewind();
};

/**
 * Load replay data from a <code>String</code> object. Strings can come from embedded assets or external files loaded through the debugger overlay.
 * 
 * @param FileContents
 *            A <code>String</code> object containing a gameplay recording.
 */
Flixel.system.FlxReplay.prototype.load = function(FileContents)
{
	this.init();

	var lines = FileContents.split("\n");

	this.seed = Number(lines[0]);

	var line;
	var i = 1;
	var l = lines.length;

	while (i < l) {
		line = lines[i++];
		if (line.length > 3) {
			this._frames[this.frameCount++] = new Flixel.system.replay.FrameRecord().load(line);
			if (this.frameCount >= this._capacity) {
				this._capacity *= 2;
				this._frames.length = this._capacity;
			}
		}
	}

	this.rewind();
};

/**
 * Common initialization terms used by both <code>create()</code> and <code>load()</code> to set up the replay object.
 */
Flixel.system.FlxReplay.prototype.init = function()
{
	this._capacity = 100;
	this._frames = new Array(this._capacity);
	this.frameCount = 0;
};

/**
 * Save the current recording data off to a <code>String</code> object. Basically goes through and calls <code>FrameRecord.save()</code> on each frame in the replay.
 * 
 * return The gameplay recording in simple ASCII format.
 */
Flixel.system.FlxReplay.prototype.save = function()
{
	if (this.frameCount <= 0)
		return null;
	var output = this.seed + "\n";
	var i = 0;

	while (i < this.frameCount)
		output += this._frames[i++].save() + "\n";
	return output;
};

/**
 * Get the current input data from the input managers and store it in a new frame record.
 */
Flixel.system.FlxReplay.prototype.recordFrame = function()
{
	var keysRecord = Flixel.FlxG.keys.record();
	var mouseRecord = Flixel.FlxG.mouse.record();

	if ((keysRecord === null) && (mouseRecord === null)) {
		this.frame++;
		return;
	}
	this._frames[this.frameCount++] = new Flixel.system.replay.FrameRecord().create(this.frame++, keysRecord, mouseRecord);
	if (this.frameCount >= this._capacity) {
		this._capacity *= 2;
		this._frames.length = this._capacity;
	}
};

/**
 * Get the current frame record data and load it into the input managers.
 */
Flixel.system.FlxReplay.prototype.playNextFrame = function()
{
	Flixel.FlxG.resetInput();

	if (this._marker >= this.frameCount) {
		this.finished = true;
		return;
	}
	if (this._frames[this._marker].frame != this.frame++)
		return;

	var fr = this._frames[this._marker++];
	if (fr.keys !== null)
		Flixel.FlxG.keys.playback(fr.keys);
	if (fr.mouse !== null)
		Flixel.FlxG.mouse.playback(fr.mouse);
};

/**
 * Reset the replay back to the first frame.
 */
Flixel.system.FlxReplay.prototype.rewind = function()
{
	this._marker = 0;
	this.frame = 0;
	this.finished = false;
};

/**
 * Helper class for the new replay system.  Represents all the game inputs for one "frame" or "step" of the game loop.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Instantiate array new frame record.
 */
Flixel.system.replay.FrameRecord = function()
{
	this.frame = 0;
	this.keys = null;
	this.mouse = null;
};

/**
 * Which frame of the game loop this record is from or for.
 */
Flixel.system.replay.FrameRecord.prototype.frame = 0;
/**
 * An array of simple integer pairs referring to what key is pressed, and what state its in.
 */
Flixel.system.replay.FrameRecord.prototype.keys = null;
/**
 * A container for the 4 mouse state integers.
 */
Flixel.system.replay.FrameRecord.prototype.mouse = null;

/**
 * Load this frame record with input data from the input managers.
 * 
 * @param Frame
 *            What frame it is.
 * @param Keys
 *            Keyboard data from the keyboard manager.
 * @param Mouse
 *            Mouse data from the mouse manager.
 * 
 * @return A reference to this <code>FrameRecord</code> object.
 * 
 */
Flixel.system.replay.FrameRecord.prototype.create = function(Frame, Keys, Mouse)
{
	this.frame = Frame;
	this.keys = Keys;
	this.mouse = Mouse;
	return this;
};

/**
 * Clean up memory.
 */
Flixel.system.replay.FrameRecord.prototype.destroy = function()
{
	this.keys = null;
	this.mouse = null;
};

/**
 * Save the frame record data to array simple ASCII string.
 * 
 * @return A <code>String</code> object containing the relevant frame record data.
 */
Flixel.system.replay.FrameRecord.prototype.save = function()
{
	var output = this.frame + "k";

	if (this.keys !== null) {
		var object;
		var i = 0;
		var l = this.keys.length;
		while (i < l) {
			if (i > 0)
				output += ",";
			object = this.keys[i++];
			output += object.code + ":" + object.value;
		}
	}

	output += "m";
	if (this.mouse !== null)
		output += this.mouse.x + "," + this.mouse.y + "," + this.mouse.button + "," + this.mouse.wheel;

	return output;
};

/**
 * Load the frame record data from array simple ASCII string.
 * 
 * @param Data
 *            A <code>String</code> object containing the relevant frame record data.
 */
Flixel.system.replay.FrameRecord.prototype.load = function(Data)
{
	var i;
	var l;

	// get frame number
	var array = Data.split("k");
	this.frame = Number(array[0]);

	// split up keyboard and mouse data
	array = array[1].split("m");
	var keyData = array[0];
	var mouseData = array[1];

	// parse keyboard data
	if (keyData.length > 0) {
		// get keystroke data pairs
		array = keyData.split(",");

		// go through each data pair and enter it into this frame's key state
		var keyPair;
		i = 0;
		l = array.length;
		while (i < l) {
			keyPair = array[i++].split(":");
			if (keyPair.length == 2) {
				if (this.keys === null)
					this.keys = [];
				this.keys.push({ code : Number(keyPair[0]), value : Number(keyPair[1]) });
			}
		}
	}

	// mouse data is just 4 integers, easy peezy
	if (mouseData.length > 0) {
		array = mouseData.split(",");
		if (array.length >= 4)
			this.mouse = new Flixel.system.replay.MouseRecord(Number(array[0]), Number(array[1]), Number(array[2]), Number(array[3]));
	}

	return this;
};
/**
 * A helper class for the frame records, part of the replay/demo/recording system.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new mouse input record.
 * 
 * @param X
 *            The main X value of the mouse in screen space.
 * @param Y
 *            The main Y value of the mouse in screen space.
 * @param Button
 *            The state of the left mouse button.
 * @param Wheel
 *            The state of the mouse wheel.
 */
Flixel.system.replay.MouseRecord = function(X, Y, Button, Wheel)
{
	this.x = X;
	this.y = Y;
	this.button = Button;
	this.wheel = Wheel;
};

/**
 * The main X value of the mouse in screen space.
 */
Flixel.system.replay.MouseRecord.prototype.x = 0;
/**
 * The main Y value of the mouse in screen space.
 */
Flixel.system.replay.MouseRecord.prototype.y = 0;
/**
 * The state of the left mouse button.
 */
Flixel.system.replay.MouseRecord.prototype.button = 0;
/**
 * The state of the mouse wheel.
 */
Flixel.system.replay.MouseRecord.prototype.wheel = 0;
/**
 * An asset manager that loads the whole images and texts referencig to them.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.system.atlas.FlxAssetManager = function()
{
	if (Flixel.system.atlas.FlxAssetManager._instance !== undefined)
		throw new Error("FlxAssetManager: Call getInstance()");

	this._atlasMap = {};
	this._keyMap = {};
	this._items = 0;
};

/**
 * The static instance.
 */
Flixel.system.atlas.FlxAssetManager._instance = new Flixel.system.atlas.FlxAssetManager();
/**
 * A dictionary with all the atlases we loaded.
 */
Flixel.system.atlas.FlxAssetManager.prototype._atlasMap = null;
/**
 * A dictionary with all the atlases keys we loaded.
 */
Flixel.system.atlas.FlxAssetManager.prototype._keyMap = null;
/**
 * The number of loaded atlases.
 */
Flixel.system.atlas.FlxAssetManager.prototype._items = 0;

/**
 * Load a new atlas.
 * 
 * @param pathFile
 *            The text file.
 * @param id
 *            The file id (normally the file route -> path/path1/pack.txt).
 */
Flixel.system.atlas.FlxAssetManager.prototype.loadAtlas = function(fileText, graphicImage, atlasId)
{
	var atlasInfo = new Flixel.system.atlas.FlxAtlasInfo();
	atlasInfo.loadAtlas(fileText, graphicImage);
	this._atlasMap[atlasId] = atlasInfo;
	this._keyMap[this._items] = atlasId;
	this._items++;
	console.log("New atlas loaded: " + atlasId);
};

/**
 * Return a bitmap from an atlas.
 * 
 * @param id
 *            The region id, normally (path/file.txt:region).
 */
Flixel.system.atlas.FlxAssetManager.prototype.getRegion = function(id)
{
	var path = id.split(":")[0];
	var region = id.split(":")[1];

	if (this._atlasMap[path] !== null && this._atlasMap[path] !== undefined) {
		var atlasInfo = this._atlasMap[path];

		// Check if the atlas info is null
		if (atlasInfo === null || atlasInfo === undefined) {
			Flixel.FlxG.log("The atlasInfo (" + id + ") couldn't be found", "FlxAssetManager");
			return null;
		}

		var bitmapData = atlasInfo.getRegion(region);

		// Check if the bitmapdata is null
		if (bitmapData === null || bitmapData === undefined) {
			Flixel.FlxG.log("The bitmapData (" + id + ") couldn't be found", "FlxAssetManager");
			return null;
		}

		// We copy the original bitmap data because it will be disposed in FlxG.addBitmap
		var newBitmapData = new BitmapData(bitmapData.width, bitmapData.height, true, 0x00000000);
		newBitmapData.draw(bitmapData);

		return newBitmapData;
	} else {
		Flixel.FlxG.log("The path (" + path + ") couldn't be found", "FlxAssetManager");
		return null;
	}
};

/**
 * Return the number of loaded atlas.
 */
Flixel.system.atlas.FlxAssetManager.prototype.getNumAtlas = function()
{
	return this._items;
};

/**
 * Return true if all the atlas images has been loaded.
 */
Flixel.system.atlas.FlxAssetManager.prototype.allLoaded = function()
{
	var allLoaded = true;
	for (var i = 0; i < this._items; i++) {
		allLoaded = allLoaded && this._atlasMap[this._keyMap[i]].loaded();
	}

	return allLoaded;
};

/**
 * Return a Tiled map instance.
 */
Flixel.system.atlas.FlxAssetManager.prototype.getEmbedMap = function(mapJson)
{
	var tiledMap = new Flixel.plugin.tmx.TiledMap(JSON.parse(mapJson));
	return tiledMap;
};

/**
 * Return the isntance of this object.
 */
Flixel.system.atlas.FlxAssetManager.getInstance = function()
{
	return Flixel.system.atlas.FlxAssetManager._instance;
};
/**
 * A class that holds all the atlas info.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.system.atlas.FlxAtlasInfo = function()
{
	this._regionMap = {};
	this._regionBitmap = {};
	this._items = 0;
	this.bitmapData = null;
};

/**
 * A dictionary with all the regions we loaded.<br>
 * In format K, V -> String, FlxRegionInfo.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype._regionMap = null;
/**
 * A dictionary with all the regions we loaded. In format K, V -> String, BitmapData.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype._regionBitmap = null;
/**
 * The number of loaded regions.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype._items = 0;
/**
 * The atlas bitmapdata.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.bitmapData = null;

/**
 * Load a new atlas where the image file is NOT embed in the swf file.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.loadAtlas = function(fileText, graphicImage)
{
	var txt = fileText;

	// Read the file
	var splitedTxt = txt.split("\n");
	// Do not read the next 3 lines they are stupid stuff for HTML 5

	// Load the image
	this._loaded = true;
	var bitmap = BitmapData.fromImage(graphicImage);
	if (bitmap === undefined || bitmap === null) {
		// THIS SHOUDN'T EVER HAPPEN
		Flixel.FlxG.log("Error: While loading an atlas image.", "FlxSystemAsset");
		return;
	}
	this.bitmapData = bitmap;

	// Parse the text file
	this.parsePackFile(splitedTxt);
};

/**
 * Parse the pack file and obtain all the regions.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.parsePackFile = function(splitedTxt)
{
	var elem = null;
	var info = null;

	// Read each file element
	var exit = false;
	var line = 4;

	while (!exit) {
		elem = splitedTxt[line];
		// unused: var rotate = splitedTxt[line + 1];
		var xy = splitedTxt[line + 2];
		var size = splitedTxt[line + 3];
		// unused: var orig = splitedTxt[line + 4];
		// unused: var offset = splitedTxt[line + 5];
		// unused: var index = splitedTxt[line + 6];

		// Extract the info from the strings
		// Extract the point
		xy = xy.replace(" xy: ", "").replace(" ", "");
		var x = Number(xy.split(",")[0]);
		var y = Number(xy.split(",")[1]);
		var position = new Flixel.FlxPoint(x, y);

		// Extrat the size
		size = size.replace(" size: ", "").replace(" ", "");
		var w = Number(size.split(",")[0]);
		var h = Number(size.split(",")[1]);
		var coordsSize = new Flixel.FlxPoint(w, h);

		info = new Flixel.system.atlas.FlxRegionInfo(elem, position, coordsSize);
		this._regionMap[elem] = info;
		this._items++;
		
		if(Flixel.FlxG.debug)
			console.log("New region added " + elem);

		// Increase the line counter
		line += 7;
		if (splitedTxt.length < line + 6)
			exit = true;
	}
};

/**
 * Return the number of loaded regions.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.getNumRegions = function()
{
	return this._items;
};

/**
 * Return the BitmapData according to one region.
 * 
 * @param region
 *            The region id.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.getRegion = function(region)
{
	// If an error happend while loading
	if (this._error || this.bitmapData === null)
		return null;

	if (this.checkRegionCache(region))
		return this._regionBitmap[region];
	else {
		var regionInfo = this._regionMap[region];
		if(regionInfo !== null) {
			var pixels = new BitmapData(regionInfo.size.x, regionInfo.size.y, true, 0x00000000);
			pixels.copyPixels(this.bitmapData, new Flixel.FlxRect(regionInfo.position.x, regionInfo.position.y, regionInfo.size.x, regionInfo.size.y), new Flixel.FlxPoint(), null, null, false, true);
			this._regionBitmap[region] = pixels;
			return pixels;
		} else
			throw new Error("Error loading region: " + region);
	}
};

/**
 * Check the local bitmap cache to see if a region with this key has been loaded already.
 * 
 * @param Key
 *            The string key identifying the region.
 * 
 * @return Whether or not this region can be found in the cache.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.checkRegionCache = function(key)
{
	return (this._regionBitmap[key] !== undefined) && (this._regionBitmap[key] !== null);
};
/**
 * A class that holds all the region info.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param elem
 *            The elem name.
 * @param size
 *            The image size.
 * @param coordinates
 *            The image top-left coordinates.
 */
Flixel.system.atlas.FlxRegionInfo = function(elem, position, size)
{
	this.elemName = elem;
	this.position = position;
	this.size = size;
};

/**
 * The file name.
 */
Flixel.system.atlas.FlxRegionInfo.prototype.elemName = null;
/**
 * The image size.
 */
Flixel.system.atlas.FlxRegionInfo.prototype.size = null;
/**
 * The image coordinates.
 */
Flixel.system.atlas.FlxRegionInfo.prototype.position = null;
/**
 * Basic input class that manages the fast-access Booleans and detailed key-state tracking.
 * Keyboard extends this with actual specific key data.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor.
 */
Flixel.system.input.Input = function()
{
	this._lookup = {};
	this._map = new Array(this._total);
};

/**
 * @private
 */
Flixel.system.input.Input.prototype._lookup = null;
/**
 * @private
 */
Flixel.system.input.Input.prototype._map = null;
/**
 * @private
 */
Flixel.system.input.Input.prototype._total = 256;

/**
 * Updates the key states (for tracking just pressed, just released, etc).
 */
Flixel.system.input.Input.prototype.update = function()
{
	var i = 0;
	while(i < this._total)
	{
		var o = this._map[i++];
		if(o === undefined) continue;
		if((o.last == -1) && (o.current == -1)) o.current = 0;
		else if((o.last == 2) && (o.current == 2)) o.current = 1;
		o.last = o.current;
	}
};

/**
 * Resets all the keys.
 */
Flixel.system.input.Input.prototype.reset = function()
{
	var i = 0;
	while(i < this._total)
	{
		var o = this._map[i++];
		if(o === undefined) continue;
		this[o.name] = false;
		o.current = 0;
		o.last = 0;
	}
};

/**
 * Check to see if this key is pressed.
 * 
 * @param	Key		One of the key constants listed above (e.g. "LEFT" or "A").
 * 
 * @return	Whether the key is pressed
 */
Flixel.system.input.Input.prototype.pressed = function(Key) { return this[Key]; };

/**
 * Check to see if this key was just pressed.
 * 
 * @param	Key		One of the key constants listed above (e.g. "LEFT" or "A").
 * 
 * @return	Whether the key was just pressed
 */
Flixel.system.input.Input.prototype.justPressed = function(Key) { return this._map[this._lookup[Key]].current == 2; };

/**
 * Check to see if this key is just released.
 * 
 * @param	Key		One of the key constants listed above (e.g. "LEFT" or "A").
 * 
 * @return	Whether the key is just released.
 */
Flixel.system.input.Input.prototype.justReleased = function(Key) { return this._map[this._lookup[Key]].current == -1; };

/**
 * If any keys are not "released" (0),
 * this function will return an array indicating
 * which keys are pressed and what state they are in.
 * 
 * @return	An array of key state data.  Null if there is no data.
 */
Flixel.system.input.Input.prototype.record = function()
{
	var data = null;
	var i = 0;
	while(i < this._total)
	{
		var o = this._map[i++];
		if((o === undefined) || (o.current === 0))
			continue;
		if(data === undefined)
			data = [];
		data.push({code: i-1, value: o.current});
	}
	return data;
};

/**
 * Part of the keystroke recording system.
 * Takes data about key presses and sets it into array.
 * 
 * @param	Record	Array of data about key states.
 */
Flixel.system.input.Input.prototype.playback = function(Record)
{
	var i = 0;
	var l = Record.length;
	var o;
	var o2;
	while(i < l)
	{
		o = Record[i++];
		o2 = this._map[o.code];
		o2.current = o.value;
		if(o.value > 0)
			this[o2.name] = true;
	}
};

/**
 * Look up the key code for any given string name of the key or button.
 * 
 * @param	KeyName		The <code>String</code> name of the key.
 * 
 * @return	The key code for that key.
 */
Flixel.system.input.Input.prototype.getKeyCode = function(KeyName)
{
	return this._lookup[KeyName];
};

/**
 * Check to see if any keys are pressed right now.
 * 
 * @return	Whether any keys are currently pressed.
 */
Flixel.system.input.Input.prototype.any = function()
{
	var i = 0;
	while(i < this._total)
	{
		var o = this._map[i++];
		if((o !== null) && (o.current > 0))
			return true;
	}
	return false;
};

/**
 * An internal helper function used to build the key array.
 * 
 * @param	KeyName		String name of the key (e.g. "LEFT" or "A")
 * @param	KeyCode		The numeric Flash code for this key.
 */
Flixel.system.input.Input.prototype.addKey = function(KeyName, KeyCode)
{
	this._lookup[KeyName] = KeyCode;
	this._map[KeyCode] = { name: KeyName, current: 0, last: 0 };
};

/**
 * Clean up memory.
 */
Flixel.system.input.Input.prototype.destroy = function()
{
	this._lookup = null;
	this._map = null;
};
/**
 * This class helps contain and track the mouse pointer in your game.
 * Automatically accounts for parallax scrolling, etc.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor.
 */
Flixel.system.input.Mouse = function(CursorContainer)
{
	Flixel.system.input.Mouse.parent.constructor.apply(this);

	this.screenX = 0;
	this.screenY = 0;
	this._lastWheel = this.wheel = 0;
	this._point = new Flixel.FlxPoint();
	this._pointers = [];
	this._pointers.push(new Flixel.system.input.Mouse.Pointer());
	this.activePointers = 0;
	this.offset = new Flixel.FlxPoint();
	this.scale = new Flixel.FlxPoint(1, 1);
};
extend(Flixel.system.input.Mouse, Flixel.FlxPoint);

/**
 * Current "delta" value of mouse wheel.  If the wheel was just scrolled up, it will have a positive value.  If it was just scrolled down, it will have a negative value.  If it wasn't just scroll this frame, it will be 0.
 */
Flixel.system.input.Mouse.prototype.wheel = 0;
/**
 * Current X position of the mouse pointer on the screen.
 */
Flixel.system.input.Mouse.prototype.screenX = 0;
/**
 * Current Y position of the mouse pointer on the screen.
 */
Flixel.system.input.Mouse.prototype.screenY = 0;
/**
 * Helper variables for recording purposes.
 */
Flixel.system.input.Mouse.prototype._lastWheel = 0;
/**
 * Pre allocated point used to prevent to much initialization.
 */
Flixel.system.input.Mouse.prototype._point = null;
/**
 * An array of all the pointers in the game.
 */
Flixel.system.input.Mouse.prototype._pointers = null;
/**
 * The current active pointers.
 */
Flixel.system.input.Mouse.prototype.activePointers = 0;
/**
 * This is just a reference to the current cursor image, if there is one.
 */
Flixel.system.input.Mouse.prototype._cursor = null;
/**
 * The screen offset.
 */
Flixel.system.input.Mouse.prototype.offset = null;
/**
 * The screen scale.
 */
Flixel.system.input.Mouse.prototype.scale = null;

/**
 * Clean up memory.
 */
Flixel.system.input.Mouse.prototype.destroy = function()
{
	this._point = null;
	this._pointers.length = 0;
	this._pointers = null;
	this.offset = null;
};

/**
 * Either show an existing cursor or load a new one.
 * 
 * @param	Graphic		The image you want to use for the cursor.
 * @param	Scale		Change the size of the cursor.  Default = 1, or native size.  2 = 2x as big, 0.5 = half size, etc.
 * @param	XOffset		The number of pixels between the mouse's screen position and the graphic's top left corner.
 * @param	YOffset		The number of pixels between the mouse's screen position and the graphic's top left corner. 
 */
Flixel.system.input.Mouse.prototype.show = function(Graphic, Scale, XOffset, YOffset)
{
	Scale = (Scale === undefined) ? 1 : Scale;
	XOffset = (XOffset === undefined) ? 0 : XOffset;
	YOffset = (YOffset === undefined) ? 0 : YOffset;

	if (Graphic !== null && Graphic !== undefined)
		this.load(Graphic, Scale, XOffset, YOffset);
	else if (this._cursor === null)
		this.load();
};

/**
 * Hides the mouse cursor
 */
Flixel.system.input.Mouse.prototype.hide = function()
{
	// Show the cursor
	Flixel.FlxG.getStage().style.cursor = "";

	if (this._cursor !== null)
		this._cursor.visible = false;
};

/**
 * Read only, check visibility of mouse cursor.
 */
Flixel.system.input.Mouse.prototype.getVisible = function()
{
	if (this._cursor === null || Flixel.FlxG.device.isMobile)
		return true;
	else
		return this._cursor.visible;
};

/**
 * Load a new mouse cursor graphic
 * 
 * @param	Graphic		The image you want to use for the cursor.
 * @param	Scale		Change the size of the cursor.
 * @param	XOffset		The number of pixels between the mouse's screen position and the graphic's top left corner.
 * @param	YOffset		The number of pixels between the mouse's screen position and the graphic's top left corner. 
 */
Flixel.system.input.Mouse.prototype.load = function(Graphic, Scale, XOffset, YOffset)
{
	Scale = (Scale === undefined) ? 1 : Scale;
	XOffset = (XOffset === undefined) ? 0 : XOffset;
	YOffset = (YOffset === undefined) ? 0 : YOffset;

	if (Graphic === null) {
		Flixel.FlxG.getStage().style.cursor = "";
		Graphic = Flixel.data.FlxSystemAsset.ImgDefault; // TODO: Default cursor
		return;
	}
	this._cursor = new Flixel.FlxSprite();
	this._cursor.loadGraphic(Graphic);
	this._cursor.offset.x = XOffset;
	this._cursor.offset.y = YOffset;
	this._cursor.scale.x = this._cursor.scale.x = Scale;

	// Hide system cursor
	Flixel.FlxG.getStage().style.cursor = "none";
};

/**
 * Unload the current cursor graphic.  If the current cursor is visible,
 * then the default system cursor is loaded up to replace the old one.
 */
Flixel.system.input.Mouse.prototype.unload = function()
{
	if (this._cursor !== null) {
		if (this._cursor.visible)
			this.load();
		else {
			this._cursor = null;
		}
	}
};

/**
 * Called by the internal game loop to update the mouse pointer's position in the game world.
 * Also updates the just pressed/just released flags.
 * 
 * @param	X			The current X position of the mouse in the window.
 * @param	Y			The current Y position of the mouse in the window.
 * @param	XScroll		The amount the game world has scrolled horizontally.
 * @param	YScroll		The amount the game world has scrolled vertically.
 */
Flixel.system.input.Mouse.prototype.update = function()
{
	var o;
	var i = 0;
	var l = this._pointers.length;

	while (i < l) {
		o = this._pointers[i];

		if ((o.last == -1) && (o.current == -1))
			o.current = 0;
		else if ((o.last == 2) && (o.current == 2))
			o.current = 1;
		o.last = o.current;

		++i;
	}

	this.updateCursor();
};

/**
 * Internal function for helping to update the cursor graphic and world coordinates.
 */
Flixel.system.input.Mouse.prototype.updateCursor = function()
{
	var o = this._pointers[0];
	
	// Actually position the Flixel mouse cursor graphic
	if(this._cursor !== null) {
		this._cursor.x = o.screenPosition.x;
		this._cursor.y = o.screenPosition.y;
	}
	
	// Update the x, y, screenX, and screenY variables based on the default camera.
	// This is basically a combination of getWorldPosition() and getScreenPosition()
	var camera = Flixel.FlxG.camera;
	if (camera !== undefined && camera !== null) {
		this.screenX = int((o.screenPosition.x - camera.x)/(camera.getZoom() * camera._screenScaleFactorX));
		this.screenY = int((o.screenPosition.y - camera.y)/(camera.getZoom() * camera._screenScaleFactorY));
		this.x = this.screenX + camera.scroll.x;
		this.y = this.screenY + camera.scroll.y;
	}
};

/**
 * Fetch the world position of the mouse on any given camera.
 * NOTE: Mouse.x and Mouse.y also store the world position of the mouse cursor on the main camera.
 * 
 * @param Camera	If unspecified, first/main global camera is used instead.
 * @param Point		An existing point object to store the results (if you don't want a new one created). 
 * 
 * @return The mouse's location in world space.
 */
Flixel.system.input.Mouse.prototype.getWorldPosition = function(Camera, Point, Pointer)
{
	Pointer = (Pointer ===  undefined) ? 0 : Pointer;
	
	if (Camera === null || Camera === undefined)
		Camera = Flixel.FlxG.camera;
	if (Point === null || Point === undefined)
		Point = new Flixel.FlxPoint();

	this.getScreenPosition(Camera, this._point, Pointer);
	Point.x = this._point.x + Camera.scroll.x;
	Point.y = this._point.y + Camera.scroll.y;
	return Point;
};

/**
 * Fetch the screen position of the mouse on any given camera.
 * NOTE: Mouse.screenX and Mouse.screenY also store the screen position of the mouse cursor on the main camera.
 * 
 * @param Camera	If unspecified, first/main global camera is used instead.
 * @param Point		An existing point object to store the results (if you don't want a new one created). 
 * 
 * @return The mouse's location in screen space.
 */
Flixel.system.input.Mouse.prototype.getScreenPosition = function(Camera, Point, Pointer)
{
	Pointer = (Pointer ===  undefined) ? 0 : Pointer;
	
	if (Camera === null || Camera === undefined)
		Camera = Flixel.FlxG.camera;
	if (Point === null || Point === undefined)
		Point = new Flixel.FlxPoint();
	
	if (Pointer >= this._pointers.length)
		return Point;
	
	var o = this._pointers[Pointer];

	Point.x = (o.screenPosition.x - Camera.x) / (Camera.getZoom() * Camera._screenScaleFactorX);
	Point.y = (o.screenPosition.y - Camera.y) / (Camera.getZoom() * Camera._screenScaleFactorY);
	return Point;
};

/**
 * Resets the just pressed/just released flags and sets mouse to not pressed.
 */
Flixel.system.input.Mouse.prototype.reset = function()
{
	this._pointers.length = 0;
	this._pointers.push(new Flixel.system.input.Mouse.Pointer());
};

/**
 * Check to see if the mouse is pressed.
 * 
 * @return	Whether the mouse is pressed.
 */
Flixel.system.input.Mouse.prototype.pressed = function(Pointer)
{
	Pointer = (Pointer === undefined) ? 0 : Pointer;
	
	if (Pointer >= this._pointers.length)
		return false;
	return this._pointers[Pointer].current > 0;
};

/**
 * Check to see if the mouse was just pressed.
 * 
 * @return Whether the mouse was just pressed.
 */
Flixel.system.input.Mouse.prototype.justPressed = function(Pointer)
{
	Pointer = (Pointer === undefined) ? 0 : Pointer;
	
	if (Pointer >= this._pointers.length)
		return false;
	return this._pointers[Pointer].current == 2;
};

/**
 * Check to see if the mouse was just released.
 * 
 * @return	Whether the mouse was just released.
 */
Flixel.system.input.Mouse.prototype.justReleased = function(Pointer)
{
	Pointer = (Pointer === undefined) ? 0 : Pointer;
	
	if (Pointer >= this._pointers.length)
		return false;
	return this._pointers[Pointer].current == -1;
};

/**
 * Event handler so FlxGame can update the mouse.
 * 
 * @param	event	A <code>MouseEvent</code> object.
 */
Flixel.system.input.Mouse.prototype.handleMouseDown = function(event)
{
	var o;
	var Pointer = 0;
	
	// Check it it's a touch event or not
	if (event.changedTouches) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			Pointer = event.changedTouches[i].identifier;
			var touch = event.changedTouches[i];

			if (Pointer >= this._pointers.length) {
				o = new Flixel.system.input.Mouse.Pointer();
				this._pointers.push(o);
			} else
				o = this._pointers[Pointer];

			if (o.current > 0)
				o.current = 1;
			else
				o.current = 2;
			
			o.screenPosition.x = (touch.pageX - this.offset.x) * this.scale.x;
			o.screenPosition.y = (touch.pageY - this.offset.y) * this.scale.y;

			this.activePointers++;
		}
	} else {
		if (Pointer >= this._pointers.length) {
			o = new Flixel.system.input.Mouse.Pointer();
			this._pointers.push(o);
		} else
			o = this._pointers[Pointer];

		if (o.current > 0)
			o.current = 1;
		else
			o.current = 2;
		
		o.screenPosition.x = (event.pageX - this.offset.x) * this.scale.x;
		o.screenPosition.y = (event.pageY - this.offset.y) * this.scale.y;
		
		this.activePointers++;
	}
};

/**
 * Event handler so FlxGame can update the mouse.
 * 
 * @param	event	A <code>MouseEvent</code> object.
 */
Flixel.system.input.Mouse.prototype.handleMouseUp = function(event)
{
	var o;
	var Pointer = 0;

	// Check it it's a touch event or not
	if (event.changedTouches) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			Pointer = event.changedTouches[i].identifier;
			var touch = event.changedTouches[i];

			if (Pointer >= this._pointers.length) {
				o = new Flixel.system.input.Mouse.Pointer();
				this._pointers.push(o);
			} else
				o = this._pointers[Pointer];

			if (o.current > 0)
				o.current = -1;
			else
				o.current = 0;
			
			o.screenPosition.x = (touch.pageX - this.offset.x) * this.scale.x;
			o.screenPosition.y = (touch.pageY - this.offset.y) * this.scale.y;

			this.activePointers--;
		}
	} else {
		if (Pointer >= this._pointers.length) {
			o = new Flixel.system.input.Mouse.Pointer();
			this._pointers.push(o);
		} else
			o = this._pointers[Pointer];

		if (o.current > 0)
			o.current = -1;
		else
			o.current = 0;
		
		o.screenPosition.x = (event.pageX - this.offset.x) * this.scale.x;
		o.screenPosition.y = (event.pageY - this.offset.y) * this.scale.y;
		
		this.activePointers--;
	}
};

/**
 * Event handler so FlxGame can update the mouse.
 * 
 * @param	event	A <code>MouseEvent</code> object.
 */
Flixel.system.input.Mouse.prototype.handleMouseWheel = function(event)
{
	this.wheel = event.delta;
};

/**
 * Event handler so FlxGame can update the mouse.
 * 
 * @param	event	A <code>MouseEvent</code> object.
 */
Flixel.system.input.Mouse.prototype.handleMouseMove = function(event)
{
	var o;
	var Pointer = 0;
	
	// Check it it's a touch event or not
	if (event.changedTouches) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			Pointer = event.changedTouches[i].identifier;
			var touch = event.changedTouches[i];

			if (Pointer >= this._pointers.length) {
				o = new Flixel.system.input.Mouse.Pointer();
				this._pointers.push(o);
			} else
				o = this._pointers[Pointer];

			o.screenPosition.x = (touch.pageX - this.offset.x) * this.scale.x;
			o.screenPosition.y = (touch.pageY - this.offset.y) * this.scale.y;
		}
	} else {
		if (Pointer >= this._pointers.length) {
			o = new Flixel.system.input.Mouse.Pointer();
			this._pointers.push(o);
		} else
			o = this._pointers[Pointer];

		o.screenPosition.x = (event.pageX - this.offset.x) * this.scale.x;
		o.screenPosition.y = (event.pageY - this.offset.y) * this.scale.y;	

	}

	//this.clientX = event.clientX;
	//this.clientY = event.clientY;

	//this.pageX = event.pageX;
	//this.pageY = event.pageY;

	//this.screenX = event.screenX;
	//this.screenY = event.screenY;
};

/**
 * If the mouse changed state or is pressed, return that info now
 * 
 * @return	An array of key state data.  Null if there is no data.
 */
//TODO: This should record all pointers, not just the first one.
Flixel.system.input.Mouse.prototype.record = function()
{
	var o = this._pointers[0];
	
	if((o.lastX == o.screenPosition.x) && (o.lastY == o.screenPosition.y) && (o.current === 0) && (this._lastWheel == this.wheel))
		return null;
	o.lastX = o.screenPosition.x;
	o.lastY = o.screenPosition.y;
	this._lastWheel = this.wheel;
	return new Flixel.system.replay.MouseRecord(o.lastX, o.lastY, o.current, this._lastWheel);
};

/**
 * Part of the keystroke recording system.
 * Takes data about key presses and sets it into array.
 * 
 * @param	KeyStates	Array of data about key states.
 */
//TODO: This should play all pointers, not just the first one.
Flixel.system.input.Mouse.prototype.playback = function(Record)
{
	var o = this._pointers[0];
	
	o.current = Record.button;
	this.wheel = Record.wheel;
	o.screenPosition.x = Record.x;
	o.screenPosition.y = Record.y;
	this.updateCursor();
};

/**
 * Set the mouse off set.
 * 
 * @param offset	The offset of the stage.
 */
Flixel.system.input.Mouse.prototype.setOffset = function(point)
{
	this.offset.copyFrom(point);
};

/**
 * An internal helper class to store the state of the pointers in game.
 */
Flixel.system.input.Mouse.Pointer = function()
{
	/**
	 * The current pressed state of the pointer.
	 */
	this.current = 0;
	/**
	 * The last pressed state of the pointer.
	 */
	this.last = 0;
	/**
	 * The current position of the pointer in screen space.
	 */
	this.screenPosition = new Flixel.FlxPoint();
	/**
	 * The last X position of the pointer in screen space.
	 */
	this.lastX = 0;
	/**
	 * The last Y position of the pointer in screen space.
	 */
	this.lastY = 0;
};
/**
 * Keeps track of what keys are pressed and how with handy booleans or strings.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */
Flixel.system.input.Keyboard = function()
{
	Flixel.system.input.Keyboard.parent.constructor.apply(this);
	
	var i;

	//LETTERS
	i = 65;
	while(i <= 90)
		this.addKey(String.fromCharCode(i), i++);
	
	//NUMBERS
	i = 48;
	this.addKey("ZERO",i++);
	this.addKey("ONE",i++);
	this.addKey("TWO",i++);
	this.addKey("THREE",i++);
	this.addKey("FOUR",i++);
	this.addKey("FIVE",i++);
	this.addKey("SIX",i++);
	this.addKey("SEVEN",i++);
	this.addKey("EIGHT",i++);
	this.addKey("NINE",i++);
	i = 96;
	this.addKey("NUMPADZERO",i++);
	this.addKey("NUMPADONE",i++);
	this.addKey("NUMPADTWO",i++);
	this.addKey("NUMPADTHREE",i++);
	this.addKey("NUMPADFOUR",i++);
	this.addKey("NUMPADFIVE",i++);
	this.addKey("NUMPADSIX",i++);
	this.addKey("NUMPADSEVEN",i++);
	this.addKey("NUMPADEIGHT",i++);
	this.addKey("NUMPADNINE",i++);
	this.addKey("PAGEUP", 33);
	this.addKey("PAGEDOWN", 34);
	this.addKey("HOME", 36);
	this.addKey("END", 35);
	this.addKey("INSERT", 45);
	
	//FUNCTION KEYS
	i = 1;
	while(i <= 12)
		this.addKey("F"+i, 111+(i++));
	
	//SPECIAL KEYS + PUNCTUATION
	this.addKey("ESCAPE",27);
	this.addKey("MINUS",189);
	this.addKey("NUMPADMINUS",109);
	this.addKey("PLUS",187);
	this.addKey("NUMPADPLUS",107);
	this.addKey("DELETE",46);
	this.addKey("BACKSPACE",8);
	this.addKey("LBRACKET",219);
	this.addKey("RBRACKET",221);
	this.addKey("BACKSLASH",220);
	this.addKey("CAPSLOCK",20);
	this.addKey("SEMICOLON",186);
	this.addKey("QUOTE",222);
	this.addKey("ENTER",13);
	this.addKey("SHIFT",16);
	this.addKey("COMMA",188);
	this.addKey("PERIOD",190);
	this.addKey("NUMPADPERIOD",110);
	this.addKey("SLASH",191);
	this.addKey("NUMPADSLASH",191);
	this.addKey("CONTROL",17);
	this.addKey("ALT",18);
	this.addKey("SPACE",32);
	this.addKey("UP",38);
	this.addKey("DOWN",40);
	this.addKey("LEFT",37);
	this.addKey("RIGHT",39);
	this.addKey("TAB",9);
};
extend(Flixel.system.input.Keyboard, Flixel.system.input.Input);

/**
 * All the keys
 */
Flixel.system.input.Keyboard.prototype.ESCAPE = false;
Flixel.system.input.Keyboard.prototype.F1 = false;
Flixel.system.input.Keyboard.prototype.F2 = false;
Flixel.system.input.Keyboard.prototype.F3 = false;
Flixel.system.input.Keyboard.prototype.F4 = false;
Flixel.system.input.Keyboard.prototype.F5 = false;
Flixel.system.input.Keyboard.prototype.F6 = false;
Flixel.system.input.Keyboard.prototype.F7 = false;
Flixel.system.input.Keyboard.prototype.F8 = false;
Flixel.system.input.Keyboard.prototype.F9 = false;
Flixel.system.input.Keyboard.prototype.F10 = false;
Flixel.system.input.Keyboard.prototype.F11 = false;
Flixel.system.input.Keyboard.prototype.F12 = false;
Flixel.system.input.Keyboard.prototype.ONE = false;
Flixel.system.input.Keyboard.prototype.TWO = false;
Flixel.system.input.Keyboard.prototype.THREE = false;
Flixel.system.input.Keyboard.prototype.FOUR = false;
Flixel.system.input.Keyboard.prototype.FIVE = false;
Flixel.system.input.Keyboard.prototype.SIX = false;
Flixel.system.input.Keyboard.prototype.SEVEN = false;
Flixel.system.input.Keyboard.prototype.EIGHT = false;
Flixel.system.input.Keyboard.prototype.NINE = false;
Flixel.system.input.Keyboard.prototype.ZERO = false;
Flixel.system.input.Keyboard.prototype.NUMPADONE = false;
Flixel.system.input.Keyboard.prototype.NUMPADTWO = false;
Flixel.system.input.Keyboard.prototype.NUMPADTHREE = false;
Flixel.system.input.Keyboard.prototype.NUMPADFOUR = false;
Flixel.system.input.Keyboard.prototype.NUMPADFIVE = false;
Flixel.system.input.Keyboard.prototype.NUMPADSIX = false;
Flixel.system.input.Keyboard.prototype.NUMPADSEVEN = false;
Flixel.system.input.Keyboard.prototype.NUMPADEIGHT = false;
Flixel.system.input.Keyboard.prototype.NUMPADNINE = false;
Flixel.system.input.Keyboard.prototype.NUMPADZERO = false;
Flixel.system.input.Keyboard.prototype.PAGEUP = false;
Flixel.system.input.Keyboard.prototype.PAGEDOWN = false;
Flixel.system.input.Keyboard.prototype.HOME = false;
Flixel.system.input.Keyboard.prototype.END = false;
Flixel.system.input.Keyboard.prototype.INSERT = false;
Flixel.system.input.Keyboard.prototype.MINUS = false;
Flixel.system.input.Keyboard.prototype.NUMPADMINUS = false;
Flixel.system.input.Keyboard.prototype.PLUS = false;
Flixel.system.input.Keyboard.prototype.NUMPADPLUS = false;
Flixel.system.input.Keyboard.prototype.DELETE = false;
Flixel.system.input.Keyboard.prototype.BACKSPACE = false;
Flixel.system.input.Keyboard.prototype.TAB = false;
Flixel.system.input.Keyboard.prototype.Q = false;
Flixel.system.input.Keyboard.prototype.W = false;
Flixel.system.input.Keyboard.prototype.E = false;
Flixel.system.input.Keyboard.prototype.R = false;
Flixel.system.input.Keyboard.prototype.T = false;
Flixel.system.input.Keyboard.prototype.Y = false;
Flixel.system.input.Keyboard.prototype.U = false;
Flixel.system.input.Keyboard.prototype.I = false;
Flixel.system.input.Keyboard.prototype.O = false;
Flixel.system.input.Keyboard.prototype.P = false;
Flixel.system.input.Keyboard.prototype.LBRACKET = false;
Flixel.system.input.Keyboard.prototype.RBRACKET = false;
Flixel.system.input.Keyboard.prototype.BACKSLASH = false;
Flixel.system.input.Keyboard.prototype.CAPSLOCK = false;
Flixel.system.input.Keyboard.prototype.A = false;
Flixel.system.input.Keyboard.prototype.S = false;
Flixel.system.input.Keyboard.prototype.D = false;
Flixel.system.input.Keyboard.prototype.F = false;
Flixel.system.input.Keyboard.prototype.G = false;
Flixel.system.input.Keyboard.prototype.H = false;
Flixel.system.input.Keyboard.prototype.J = false;
Flixel.system.input.Keyboard.prototype.K = false;
Flixel.system.input.Keyboard.prototype.L = false;
Flixel.system.input.Keyboard.prototype.SEMICOLON = false;
Flixel.system.input.Keyboard.prototype.QUOTE = false;
Flixel.system.input.Keyboard.prototype.ENTER = false;
Flixel.system.input.Keyboard.prototype.SHIFT = false;
Flixel.system.input.Keyboard.prototype.Z = false;
Flixel.system.input.Keyboard.prototype.X = false;
Flixel.system.input.Keyboard.prototype.C = false;
Flixel.system.input.Keyboard.prototype.V = false;
Flixel.system.input.Keyboard.prototype.B = false;
Flixel.system.input.Keyboard.prototype.N = false;
Flixel.system.input.Keyboard.prototype.M = false;
Flixel.system.input.Keyboard.prototype.COMMA = false;
Flixel.system.input.Keyboard.prototype.PERIOD = false;
Flixel.system.input.Keyboard.prototype.NUMPADPERIOD = false;
Flixel.system.input.Keyboard.prototype.SLASH = false;
Flixel.system.input.Keyboard.prototype.NUMPADSLASH = false;
Flixel.system.input.Keyboard.prototype.CONTROL = false;
Flixel.system.input.Keyboard.prototype.ALT = false;
Flixel.system.input.Keyboard.prototype.SPACE = false;
Flixel.system.input.Keyboard.prototype.UP = false;
Flixel.system.input.Keyboard.prototype.DOWN = false;
Flixel.system.input.Keyboard.prototype.LEFT = false;
Flixel.system.input.Keyboard.prototype.RIGHT = false;
		
/**
 * Event handler so FlxGame can toggle keys.
 * 
 * @param	FlashEvent	A <code>KeyboardEvent</code> object.
 */
Flixel.system.input.Keyboard.prototype.handleKeyDown = function(FlashEvent)
{
	var object = this._map[FlashEvent.keyCode];
	if(object === null || object === undefined) return;
	if(object.current > 0) object.current = 1;
	else object.current = 2;
	this[object.name] = true;
};
		
/**
 * Event handler so FlxGame can toggle keys.
 * 
 * @param	FlashEvent	A <code>KeyboardEvent</code> object.
 */
Flixel.system.input.Keyboard.prototype.handleKeyUp = function(FlashEvent)
{
	var object = this._map[FlashEvent.keyCode];
	if(object === null || object === undefined) return;
	if(object.current > 0) object.current = -1;
	else object.current = 0;
	this[object.name] = false;
};
/**
 * An analog stick or thumbstick with callbacks.
 * It can easily be customized by overriding the parent methods.
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 * @author	Ka Wing Chin
 */

/**
 * Class constructor.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 * @param radius
 *            The radius where the thumb can move. If 0, the background will be use as radius.
 * @param dragRadius
 *            The radius where the thumb can move. Default 0, the background * 1.25 will be used as radius.
 * @param ease
 *            The duration of the easing. The value must be between 0 and 1.
 */
Flixel.system.input.pads.FlxAnalog = function(x, y, radius, dragRadius, ease)
{
	x = (x === undefined) ? 0 : x;
	y = (y === undefined) ? 0 : y;
	radius = (radius === undefined) ? 0 : radius;
	dragRadius = (dragRadius === undefined) ? 0 : dragRadius;
	ease = (ease === undefined) ? 0.25 : ease;
	
	Flixel.system.input.pads.FlxAnalog.parent.constructor.apply(this);

	this.x = x;
	this.y = y;		
	this._radius = radius;
	this._dragRadius = dragRadius;
	this._ease = ease;
	this._terminated = false;

	Flixel.system.input.pads.FlxAnalog._analogs.push(this);

	this.status = Flixel.system.input.pads.FlxAnalog.NORMAL;
	this._direction = 0;
	this._amount = 0;
	this.acceleration = new Flixel.FlxPoint();
	this._point = new Flixel.FlxPoint();

	this.createBase();
	this.createThumb();
	this.createZone();
	this.createDragZone();
};
extend(Flixel.system.input.pads.FlxAnalog, Flixel.FlxGroup);

/**
 * Used with public variable <code>status</code>, means not highlighted or pressed.
 */
Flixel.system.input.pads.FlxAnalog.NORMAL = 0;
/**
 * Used with public variable <code>status</code>, means highlighted (usually from mouse over).
 */
Flixel.system.input.pads.FlxAnalog.HIGHLIGHT = 1;
/**
 * Used with public variable <code>status</code>, means pressed (usually from mouse click).
 */
Flixel.system.input.pads.FlxAnalog.PRESSED = 2;
/**
 * An list of analogs that are currently active.
 */
Flixel.system.input.pads.FlxAnalog._analogs = [];
/**
 * Shows the current state of the button.
 */
Flixel.system.input.pads.FlxAnalog.prototype.status = 0;
/**
 * X position of the upper left corner of this object in world space.
 */
Flixel.system.input.pads.FlxAnalog.prototype.x = 0;
/**
 * Y position of the upper left corner of this object in world space.
 */
Flixel.system.input.pads.FlxAnalog.prototype.y = 0;
/**
 * This is just a pre-allocated x-y point container to be used however you like
 */
Flixel.system.input.pads.FlxAnalog.prototype._point = null;
/**
 * This function is called when the button is released.
 */
Flixel.system.input.pads.FlxAnalog.prototype.onUp = null;
/**
 * This function is called when the button is pressed down.
 */
Flixel.system.input.pads.FlxAnalog.prototype.onDown = null;
/**
 * This function is called when the mouse goes over the button.
 */
Flixel.system.input.pads.FlxAnalog.prototype.onOver = null;
/**
 * This function is called when the button is hold down.
 */
Flixel.system.input.pads.FlxAnalog.prototype.onPressed = null;
/**
 * The area which the joystick will react.
 */
Flixel.system.input.pads.FlxAnalog.prototype._zone = null;
/**
 * The background of the joystick, also known as the base.
 */
Flixel.system.input.pads.FlxAnalog.prototype.bg = null;
/**
 * The thumb
 */
Flixel.system.input.pads.FlxAnalog.prototype.thumb = null;
/**
 * The radius where the thumb can move.
 */
Flixel.system.input.pads.FlxAnalog.prototype._radius = 0;
Flixel.system.input.pads.FlxAnalog.prototype._direction = 0;
Flixel.system.input.pads.FlxAnalog.prototype._amount = 0;
/**
 * The area which the touch is allowed to drag.
 */
Flixel.system.input.pads.FlxAnalog.prototype._dragZone = null;
/**
 * The radius where the touch can move while dragging the thumb.
 */
Flixel.system.input.pads.FlxAnalog.prototype._dragRadius = 0;
/**
 * How fast the speed of this object is changing.
 */
Flixel.system.input.pads.FlxAnalog.prototype.acceleration = null;
/**
 * The speed of easing when the thumb is released.
 */
Flixel.system.input.pads.FlxAnalog.prototype._ease = 0;
/**
 * If the analog is terminated or not.
 */
Flixel.system.input.pads.FlxAnalog.prototype._terminated = false;

/**
 * Creates the background of the analog stick. Override this to customize the background.
 */
Flixel.system.input.pads.FlxAnalog.prototype.createBase = function()
{
	this.bg = new Flixel.FlxSprite(this.x, this.y).loadGraphic(Flixel.data.FlxSystemAsset.ImgControlBase);
	this.bg.x += -this.bg.width * 0.5;
	this.bg.y += -this.bg.height * 0.5;
	this.bg.scrollFactor.x = this.bg.scrollFactor.y = 0;
	this.bg.setSolid(false);
	this.bg.ignoreDrawDebug = true;
	this.add(this.bg);	
};

/**
 * Creates the thumb of the analog stick. Override this to customize the thumb.
 */
Flixel.system.input.pads.FlxAnalog.prototype.createThumb = function()
{
	this.thumb = new Flixel.FlxSprite(this.x, this.y).loadGraphic(Flixel.data.FlxSystemAsset.ImgControlKnob);
	this.thumb.scrollFactor.x = this.thumb.scrollFactor.y = 0;
	this.thumb.setSolid(false);
	this.thumb.ignoreDrawDebug = true;
	this.add(this.thumb);
};

/**
 * Creates the touch zone. It's based on the size of the background. The thumb will react when the mouse is in the zone. Override this to customize
 * the zone.
 * 
 * @param contract
 *            Contract the size.
 */
Flixel.system.input.pads.FlxAnalog.prototype.createZone = function()
{
	if(this._radius === 0)
		this._radius = this.bg.width * 0.5;
	this._zone = new Flixel.system.input.pads.FlxAnalog.Circle(this.x, this.y, this._radius);
};

/**
 * Creates the move zone. The thumb can only move in this zone. It's based on the size of the background * 1.25. When the mouse is out the zone, the
 * thumb will be released. Override this to customize the drag zone.
 */
Flixel.system.input.pads.FlxAnalog.prototype.createDragZone = function()
{
	if(this._dragRadius === 0)
		this._dragRadius = this.bg.width * 1.25;
	this._dragZone = new Flixel.system.input.pads.FlxAnalog.Circle(this.x, this.y, this._dragRadius);
};

/**
 * Clean up memory.
 */
Flixel.system.input.pads.FlxAnalog.prototype.destroy = function()
{
	Flixel.system.input.pads.FlxAnalog.parent.destroy.apply(this);
	Flixel.system.input.pads.FlxAnalog._analogs.splice(Flixel.system.input.pads.FlxAnalog._analogs.indexOf(this), 1); // Remove our self from the array
	this.onUp = this.onDown = this.onOver = this.onPressed = null;
	this.acceleration = null;
	this._point = null;
	this.thumb = null;
	this._zone = null;
	this._dragZone = null;
	this.bg = null;
	this.thumb = null;
};

/**
 * Update the behavior.
 */
Flixel.system.input.pads.FlxAnalog.prototype.update = function()
{
	var offAll = true;
	var pointerId = 0;
	var	totalPointers = Flixel.FlxG.mouse.activePointers + 1;		

	while(pointerId < totalPointers)
	{	
		if(!this.updateAnalog(pointerId))
		{
			offAll = false;
			break;
		}
		++pointerId;
	}

	this.thumb.x = (this.x + Math.cos(this._direction) * this._amount * this._radius - (this.thumb.width * 0.5));
	this.thumb.y = (this.y + Math.sin(this._direction) * this._amount * this._radius - (this.thumb.height * 0.5));

	if(offAll)
		this.status = Flixel.system.input.pads.FlxAnalog.NORMAL;

	Flixel.system.input.pads.FlxAnalog.parent.update.apply(this);
};

/**
 * Update the analog according to a pointer id.
 * 
 * @param pointerId
 *            The desired pointer id.
 * @return If the analog was updated.
 */
Flixel.system.input.pads.FlxAnalog.prototype.updateAnalog = function(pointerId)
{		
	var offAll = true;
	Flixel.FlxG.mouse.getScreenPosition(Flixel.FlxG.camera, this._point, pointerId);

	if(this._zone.contains(this._point.x, this._point.y) || (this._dragZone.contains(this._point.x, this._point.y) && this.status == Flixel.system.input.pads.FlxAnalog.PRESSED))
	{
		offAll = false;
		if(Flixel.FlxG.mouse.pressed(pointerId))
		{
			this.status = Flixel.system.input.pads.FlxAnalog.PRESSED;			
			if(Flixel.FlxG.mouse.justPressed(pointerId))
			{
				if(this.onDown !== null)
					this.onDown();
			}

			if(this.status == Flixel.system.input.pads.FlxAnalog.PRESSED)
			{
				if(this.onPressed !== null)
					this.onPressed();						

				var dx = this._point.x - this.x;
				var dy = this._point.y - this.y;

				var dist = Math.sqrt(dx * dx + dy * dy);
				if(dist < 1) 
					dist = 0;
				this._direction = Math.atan2(dy, dx);
				this._amount = Math.min(this._radius, dist) / this._radius;

				this.acceleration.x = (Math.cos(this._direction) * this._amount * this._radius);
				this.acceleration.y = (Math.sin(this._direction) * this._amount * this._radius);			
			}
		}
		else if(Flixel.FlxG.mouse.justReleased(pointerId) && this.status == Flixel.system.input.pads.FlxAnalog.PRESSED)
		{
			this.status = Flixel.system.input.pads.FlxAnalog.HIGHLIGHT;
			if(this.onUp !== null)
				this.onUp();
			this.acceleration.x = 0;
			this.acceleration.y = 0;
		}					

		if(this.status == Flixel.system.input.pads.FlxAnalog.NORMAL)
		{
			this.status = Flixel.system.input.pads.FlxAnalog.HIGHLIGHT;
			if(this.onOver !== null)
				this.onOver();
		}
	}
	if((this.status == Flixel.system.input.pads.FlxAnalog.HIGHLIGHT || this.status == Flixel.system.input.pads.FlxAnalog.NORMAL) && this._amount !== 0)
	{				
		this._amount *= this._ease;
		if(Math.abs(this._amount) < 0.1) 
			this._amount = 0;
	}
	return offAll;
};

/**
 * Returns the angle in degrees.
 * 
 * @return The angle.
 */
Flixel.system.input.pads.FlxAnalog.prototype.getAngle = function()
{
	return (Math.atan2(this.acceleration.y, this.acceleration.x) * Flixel.plugin.FlxMath.RADTODEG);
};

/**
 * Whether the thumb is pressed or not.
 */
Flixel.system.input.pads.FlxAnalog.prototype.pressed = function(name)
{
	if(name !== undefined || name !== null)
		return false;

	return this.status == Flixel.system.input.pads.FlxAnalog.PRESSED;
};

/**
 * Whether the thumb is just pressed or not.
 */
Flixel.system.input.pads.FlxAnalog.prototype.justPressed = function()
{
	return Flixel.FlxG.mouse.justPressed() && this.status == Flixel.system.input.pads.FlxAnalog.PRESSED;
};

/**
 * Whether the thumb is just released or not.
 */
Flixel.system.input.pads.FlxAnalog.prototype.justReleased = function()
{
	return Flixel.FlxG.mouse.justReleased() && this.status == Flixel.system.input.pads.FlxAnalog.HIGHLIGHT;
};

/**
 * Set <code>alpha</code> to a number between 0 and 1 to change the opacity of the analog.
 * 
 * @param Alpha
 */
Flixel.system.input.pads.FlxAnalog.prototype.setAlpha = function(Alpha)
{
	for(var i = 0; i < this.members.length; i++)
	{
		this.members[i].setAlpha(Alpha);
	}
};

/**
 * Show all the Analog PAD buttons.
 */
Flixel.system.input.pads.FlxAnalog.prototype.show = function()
{
	this.visible = true;
	this.active = true;
};

/**
 * Hide all the Analog PAD buttons.
 */
Flixel.system.input.pads.FlxAnalog.prototype.hide = function()
{
	this.visible = false;
	this.active = false;
};

/**
 * Terminate the whole Analog PAD.
 */
Flixel.system.input.pads.FlxAnalog.prototype.terminate = function()
{
	this._terminated = true;
};

/**
 * Tells the caller if the Analog PAD should be instanced again.
 * 
 * @return If the Analog PAD should be instanced again.
 */
Flixel.system.input.pads.FlxAnalog.prototype.isTerminated = function()
{
	return this._terminated;
};

Flixel.system.input.pads.FlxAnalog.prototype.justTouching = function(name) {
	return false;
};

Flixel.system.input.pads.FlxAnalog.prototype.justRemoved = function(name) {
	return false;
};


Flixel.system.input.pads.FlxAnalog.Circle = function(x, y, radius)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
};

Flixel.system.input.pads.FlxAnalog.Circle.prototype.x = 0;
Flixel.system.input.pads.FlxAnalog.Circle.prototype.y = 0;
Flixel.system.input.pads.FlxAnalog.Circle.prototype.radius = 0;

/**
 * Whether this circle contains the point or not.
 * 
 * @param x
 *            The point X.
 * @param y
 *            The point Y.
 * @returns {Boolean} If the circle contains the point.
 */
Flixel.system.input.pads.FlxAnalog.Circle.prototype.contains = function(X, Y)
{
	X = this.x - X;
	Y = this.y - Y;
	return X * X + Y * Y <= this.radius * this.radius;
};
/**
 * A handy class that represent a structure
 * for all the Flixel game pads.
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Abstract constructor do not call!!
 */
Flixel.system.input.pads.FlxGamePad = function()
{
	Flixel.system.input.pads.FlxGamePad.parent.constructor.apply(this);
};
extend(Flixel.system.input.pads.FlxGamePad, Flixel.FlxGroup);

/**
 * The Extended Game Pad ID.
 */
Flixel.system.input.pads.FlxGamePad.EXTENDED_GAMEPAD = 1;
/**
 * The Controller Game Pad
 */
Flixel.system.input.pads.FlxGamePad.CONTROLLER_GAMEPAD = 2;
/**
 * The Digital Game Pad.
 */
Flixel.system.input.pads.FlxGamePad.DIGITAL_GAMEPAD = 3;
/**
 * The Analog Game Pad.
 */
Flixel.system.input.pads.FlxGamePad.ANALOG_GAMEPAD = 4;

/**
 * The X coordinate of the group.
 */
Flixel.system.input.pads.FlxGamePad.prototype.x = 0;
/**
 * The Y coordinate of the group.
 */
Flixel.system.input.pads.FlxGamePad.prototype.y = 0;
/**
 * Contain all the Button names and a reference to the button object.
 */
Flixel.system.input.pads.FlxGamePad.prototype._map = null;
/**
 * Help to check the game pad status
 */
Flixel.system.input.pads.FlxGamePad.prototype._terminated = false;

/**
 * Check if any of the Game Pad keys has been pressed.
 * 
 * @param name
 *            Key Name
 * @return True if pressed, false otherwise.
 */
Flixel.system.input.pads.FlxGamePad.prototype.pressed = function(name)
{
};

/**
 * Check if any of the Game Pad keys has been just touched.
 * 
 * @param name
 *            Key Name
 * @return
 */
Flixel.system.input.pads.FlxGamePad.prototype.justTouching = function(name)
{
};

/**
 * Check if any of the Game Pad keys has been just removed.
 * 
 * @param name
 *            Key Name
 * @return
 */
Flixel.system.input.pads.FlxGamePad.prototype.justRemoved = function(name)
{
};

/**
 * Show all the Game Pad buttons.
 */
Flixel.system.input.pads.FlxGamePad.prototype.show = function()
{
};

/**
 * Hide all the Game Pad buttons.
 */
Flixel.system.input.pads.FlxGamePad.prototype.hide = function()
{
};

/**
 * Terminate the whole Game Pad.
 */
Flixel.system.input.pads.FlxGamePad.prototype.terminate = function()
{
};
/**
 * Tells the caller if the Game Pad should be instanced again.
 * 
 * @return If the Game Pad should be instanced again.
 */
Flixel.system.input.pads.FlxGamePad.prototype.isTerminated = function()
{
};

/**
 * Set <code>alpha</code> to a number between 0 and 1 to change the opacity of
 * the gamepad.
 * 
 * @param Alpha
 */
Flixel.system.input.pads.FlxGamePad.prototype.setAlpha = function(alpha)
{
};
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
/**
 * Class to handle a Digital Pad in the screen.
 * This Digital Pad will help the character to move and thing's like that.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * DPad class constructor.
 * 
 * @param X
 *            The x-pos on screen.
 * @param Y
 *            The y-pos on screen.
 */
Flixel.system.input.pads.FlxDigitalPad = function(X, Y)
{
	this.x = X;
	this.y = Y;
	this._terminated = false;
	this._map = {};

	// BASE
	var base = new Flixel.FlxSprite(X, Y);
	base.loadGraphic(Flixel.data.FlxSystemAsset.dpad[4]);
	base.setSolid(false);
	base.immovable = true;
	// _container.add(base);

	// Button UP
	var up = new Flixel.system.input.pads.FlxPadButton();
	up.loadGraphic(Flixel.data.FlxSystemAsset.dpad[0]);
	up.setSolid(false);
	up.immovable = true;
	up.x = X + (base.width / 2) - (up.width / 2);
	up.y = Y - up.height;
	up.setAlpha(0.75);
	this.add(up);
	this.addButton("UP", up);

	// Button RIGHT
	var right = new Flixel.system.input.pads.FlxPadButton();
	right.loadGraphic(Flixel.data.FlxSystemAsset.dpad[3]);
	right.setSolid(false);
	right.immovable = true;
	right.x = X + base.width - right.width;
	right.y = Y - (base.height / 2) + right.width - right.height;
	right.setAlpha(0.75);
	this.add(right);
	this.addButton("RIGHT", right);

	// Button DOWN
	var down = new Flixel.system.input.pads.FlxPadButton();
	down.loadGraphic(Flixel.data.FlxSystemAsset.dpad[1]);
	down.setSolid(false);
	down.immovable = true;
	down.x = X + (base.width / 2) - (down.width / 2);
	down.y = Y - base.height;
	down.setAlpha(0.75);
	this.add(down);
	this.addButton("DOWN", down);

	// Button LEFT
	var left = new Flixel.system.input.pads.FlxPadButton();
	left.loadGraphic(Flixel.data.FlxSystemAsset.dpad[2]);
	left.setSolid(false);
	left.immovable = true;
	left.x = X;
	left.y = Y - (base.height / 2) + left.width - left.height;
	left.setAlpha(0.75);
	this.add(left);
	this.addButton("LEFT", left);
};
extend(Flixel.system.input.pads.FlxDigitalPad, Flixel.system.input.pads.FlxGamePad);

/**
 * Overridden function of the DPad, this function will update all the DPad buttons.
 * This will only happen if the DPad is visible, not terminated and the game is not paused.
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.update = function()
{		
	if(this.visible && !Flixel.FlxG.getPause() && !this._terminated) {
		Flixel.system.input.pads.FlxDigitalPad.parent.update.apply(this);
	}
};

/**
 * Check if any of the DPad keys has been pressed.
 * @param name	Key Name
 * @return 
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.pressed = function(name)
{
	if (this._map[name]) {
		return this._map[name].status == Flixel.system.input.pads.FlxPadButton.STATUS_PRESSED;
	}
	return false;
};

/**
 * Check if any of the DPad keys has been just touched.
 * @param name	Key Name
 * @return 
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.justTouching = function(name)
{
	if (this._map[name]) {
		return this._map[name].status == Flixel.system.input.pads.FlxPadButton.STATUS_JUST_PRESSED;
	}
	return false;
};

/**
 * Check if any of the DPad keys has been just removed.
 * @param name	Key Name
 * @return 
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.justRemoved = function(name)
{
	if (this._map[name]) {
		return this._map[name].status == Flixel.system.input.pads.FlxPadButton.STATUS_JUST_RELEASED;
	}
	return false;
};

/**
 * Add the button to the FlxGroup container
 * 
 * @param ButtonName	String name of the key (e.g. "LEFT" or "A")
 * @param Button		The Button instance.
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.addButton = function(ButtonName, Button)
{
	this._map[ButtonName] = Button;
};

/**
 * Show all the DPad buttons.
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.show = function()
{
	this.visible = true;
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].active = true;
	}
};

/**
 * Hide all the DPad buttons.
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.hide = function()
{
	this.visible = false;
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].active = false;
	}
};

/**
 * Terminate the whole DPad.
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.terminate = function()
{
	this._terminated = true;
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].destroy();
	}
	delete this._map;
};

/**
 * Tells the caller if the DPad should be instanced again.
 * @return If the DPad should be instanced again.
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.isTerminated = function()
{
	return this._terminated;
};

/**
 * {@inheritDoc}
 */
Flixel.system.input.pads.FlxDigitalPad.prototype.setAlpha = function(alpha)
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].setAlpha(alpha);
	}
};
/**
 * A Digital Pad button.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Creates a new <code>FlxPadButton</code> object with a gray background and a
 * callback function on the UI thread.
 * 
 * @param X
 *            The X position of the button.
 * @param Y
 *            The Y position of the button.
 * @param Label
 *            The text that you want to appear on the button.
 * @param OnClick
 *            The function to call whenever the button is clicked.
 */
Flixel.system.input.pads.FlxPadButton = function(X, Y)
{
	Flixel.system.input.pads.FlxPadButton.parent.constructor.apply(this, [ X, Y ]);
	this.loadGraphic(Flixel.data.FlxSystemAsset.ImgDefaultButton, false, false, 80, 20);

	this.status = Flixel.system.input.pads.FlxPadButton.STATUS_NORMAL;
};
extend(Flixel.system.input.pads.FlxPadButton, Flixel.FlxSprite);

/**
 * This means the button has no finger on it.
 */
Flixel.system.input.pads.FlxPadButton.STATUS_NORMAL = 0;
/**
 * This means the finger has just touched the button.
 */
Flixel.system.input.pads.FlxPadButton.STATUS_JUST_PRESSED = 1;
/**
 * This means the finger is still pressing the button.
 */
Flixel.system.input.pads.FlxPadButton.STATUS_PRESSED = 2;
/**
 * This means the finger has just removed from the button.
 */
Flixel.system.input.pads.FlxPadButton.STATUS_JUST_RELEASED = 3;
/**
 * This means that the mouse is over the button but not pressing it (ONLY FOR
 * DESKTOP).
 */
Flixel.system.input.pads.FlxPadButton.STATUS_OVER = 4;
/**
 * Shows the current state of the button.
 */
Flixel.system.input.pads.FlxPadButton.prototype.status = 0;
/**
 * The last detected pointer id.
 */
Flixel.system.input.pads.FlxPadButton.prototype._pointerId = 0;

/**
 * Basic button update logic
 */
Flixel.system.input.pads.FlxPadButton.prototype.update = function()
{
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
			if (this.overlapsPoint(this._point, true, camera)) {
				offAll = false;

				if (Flixel.FlxG.mouse.pressed(pointerId)) {
					this.status = Flixel.system.input.pads.FlxPadButton.STATUS_PRESSED;
					if (Flixel.FlxG.mouse.justPressed(pointerId)) {
						this.status = Flixel.system.input.pads.FlxPadButton.STATUS_JUST_PRESSED;
					}
					this._pointerId = pointerId;
				}
			}
			++pointerId;
		}
	}

	// Terminate the just released stuff
	if(this.status == Flixel.system.input.pads.FlxPadButton.STATUS_JUST_RELEASED) {
		this.status = Flixel.system.input.pads.FlxPadButton.STATUS_NORMAL;
	}

	// Check if we need to set the button as just released
	// We can have the mouse over the button and not being touching it
	if (offAll || (!offAll && !Flixel.FlxG.mouse.pressed(this._pointerId))) {
		if (this.status == Flixel.system.input.pads.FlxPadButton.STATUS_PRESSED) {
			if (Flixel.FlxG.mouse.justReleased(this._pointerId))
				this.status = Flixel.system.input.pads.FlxPadButton.STATUS_JUST_RELEASED;
			else
				this.status = Flixel.system.input.pads.FlxPadButton.STATUS_NORMAL;
		}
	}

	// Then pick the appropriate frame of animation
	if (this.status == Flixel.system.input.pads.FlxPadButton.STATUS_JUST_PRESSED || this.status == Flixel.system.input.pads.FlxPadButton.STATUS_JUST_RELEASED)
		this.setFrame(Flixel.system.input.pads.FlxPadButton.STATUS_NORMAL);
	else
		this.setFrame(this.status);
};
/**
 * A gamepad which contains 4 directional buttons and 4 action buttons.<br>
 * It's easy to set the callbacks and to customize the layout.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Create a gamepad which contains 4 directional buttons and 4 action buttons.
 * 
 * @param DPad
 *            The D-Pad mode. FlxVirtualPad.FULL for example.
 * @param Action
 *            The action buttons mode. FlxVirtualPad.A_B_C for example.
 */
Flixel.system.input.pads.FlxVirtualPad = function(DPad, Action)
{
	this.dPad = new Flixel.FlxGroup();
	this.actions = new Flixel.FlxGroup();

	switch (DPad) {
		case Flixel.system.input.pads.FlxVirtualPad.DPAD_FULL:
			this.dPad.add(this.add(this.buttonUp = this.createButton(35, Flixel.FlxG.height - 99, 29, 36, Flixel.data.FlxSystemAsset.ImgButtonUp)));
			this.dPad.add(this.add(this.buttonLeft = this.createButton(0, Flixel.FlxG.height - 64, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonLeft)));
			this.dPad.add(this.add(this.buttonRight = this.createButton(64, Flixel.FlxG.height - 64, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonRight)));
			this.dPad.add(this.add(this.buttonDown = this.createButton(35, Flixel.FlxG.height - 39, 29, 39, Flixel.data.FlxSystemAsset.ImgButtonDown)));
			this.dPad.add(this.add(this.createCenter(this.buttonLeft.x + this.buttonLeft.width, Flixel.FlxG.height - 65, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad.UP_DOWN:
			this.dPad.add(this.add(this.buttonUp = this.createButton(35, Flixel.FlxG.height - 101, 29, 36, Flixel.data.FlxSystemAsset.ImgButtonUp)));
			this.dPad.add(this.add(this.buttonDown = this.createButton(35, Flixel.FlxG.height - 39, 29, 39, Flixel.data.FlxSystemAsset.ImgButtonDown)));
			this.dPad.add(this.add(this.createCenter(35, Flixel.FlxG.height - 66, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad.LEFT_RIGHT:
			this.dPad.add(this.add(this.buttonLeft = this.createButton(0, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonLeft)));
			this.dPad.add(this.add(this.buttonRight = this.createButton(64, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonRight)));
			this.dPad.add(this.add(this.createCenter(this.buttonLeft.x + this.buttonLeft.width, Flixel.FlxG.height - 45, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad.UP_LEFT_RIGHT:
			this.dPad.add(this.add(this.buttonUp = this.createButton(35, Flixel.FlxG.height - 79, 29, 36, Flixel.data.FlxSystemAsset.ImgButtonUp)));
			this.dPad.add(this.add(this.buttonLeft = this.createButton(0, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonLeft)));
			this.dPad.add(this.add(this.buttonRight = this.createButton(64, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonRight)));
			this.dPad.add(this.add(this.createCenter(this.buttonLeft.x + this.buttonLeft.width, Flixel.FlxG.height - 45, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));
			break;
		default:
			break;
	}

	switch (Action) {
		case Flixel.system.input.pads.FlxVirtualPad.A:
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 50, Flixel.FlxG.height - 68, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad.A_B:
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 41, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 37, Flixel.FlxG.height - 72, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad.A_B_C:
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 99, Flixel.FlxG.height - 41, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 62, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			this.actions.add(this.add(this.buttonC = this.createButton(Flixel.FlxG.width - 37, Flixel.FlxG.height - 83, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonC)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad.A_B_X_Y:
			this.actions.add(this.add(this.buttonY = this.createButton(Flixel.FlxG.width - 99, Flixel.FlxG.height - 72, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonY)));
			this.actions.add(this.add(this.buttonX = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 103, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonX)));
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 41, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 37, Flixel.FlxG.height - 72, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad.B:
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 50, Flixel.FlxG.height - 68, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			break;
		default:
			break;
	}
};
extend(Flixel.system.input.pads.FlxVirtualPad, Flixel.FlxGroup);

/**
 * Don't use any directional button.
 */
Flixel.system.input.pads.FlxVirtualPad.DPAD_NONE = 0;
/**
 * Use the set of 4 directions or A, B, X, and Y.
 */
Flixel.system.input.pads.FlxVirtualPad.DPAD_FULL = 1;
/**
 * Use UP and DOWN direction buttons.
 */
Flixel.system.input.pads.FlxVirtualPad.UP_DOWN = 2;
/**
 * Use LEFT and RIGHT direction buttons.
 */
Flixel.system.input.pads.FlxVirtualPad.LEFT_RIGHT = 3;
/**
 * Use UP, LEFT and RIGHT direction buttons.
 */
Flixel.system.input.pads.FlxVirtualPad.UP_LEFT_RIGHT = 4;
/**
 * Don't use any action buttons.
 */
Flixel.system.input.pads.FlxVirtualPad.ACTION_NONE = 0;
/**
 * Use only A button.
 */
Flixel.system.input.pads.FlxVirtualPad.A = 1;
/**
 * Use A and B button.
 */
Flixel.system.input.pads.FlxVirtualPad.A_B = 2;
/**
 * Use A, B and C button.
 */
Flixel.system.input.pads.FlxVirtualPad.A_B_C = 3;
/**
 * Use A, B, X and Y button.
 */
Flixel.system.input.pads.FlxVirtualPad.A_B_X_Y = 4;
/**
 * Use only B button.
 */
Flixel.system.input.pads.FlxVirtualPad.B = 5;

/**
 * Button A
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonA = null;
/**
 * Button B
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonB = null;
/**
 * Button C
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonC = null;
/**
 * Button Y
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonY = null;
/**
 * Button X
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonX = null;
/**
 * Button LEFT DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonLeft = null;
/**
 * Button UP DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonUp = null;
/**
 * Button RIGHT DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonRight = null;
/**
 * BUTTON DOWN DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.buttonDown = null;
/**
 * Group of directions buttons.
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.dPad = null;
/**
 * Group of action buttons.
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.actions = null;

/**
 * Overridden destroy method.
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.destroy = function()
{
	Flixel.system.input.pads.FlxVirtualPad.parent.destroy.apply(this);
	if (this.dPad !== null)
		this.dPad.destroy();
	if (this.actions !== null)
		this.actions.destroy();
	this.dPad = this.actions = null;
	this.buttonA = this.buttonB = this.buttonC = this.buttonY = this.buttonX = null;
	this.buttonLeft = this.buttonUp = this.buttonDown = this.buttonRight = null;
};

/**
 * Creates a button
 * 
 * @param X
 *            The x-position of the button.
 * @param Y
 *            The y-position of the button.
 * @param Width
 *            The width of the button.
 * @param Height
 *            The height of the button.
 * @param Image
 *            The image of the button. It must contains 3 frames (NORMAL, HIGHLIGHT, PRESSED).
 * @param Callback
 *            The callback for the button.
 * @return The button.
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.createButton = function(X, Y, Width, Height, Image)
{
	var button = new Flixel.system.input.pads.FlxPadButton(X, Y);
	button.loadGraphic(Image, true, false, Width, Height);
	button.setSolid(false);
	button.immovable = true;
	button.ignoreDrawDebug = true;
	button.scrollFactor.x = button.scrollFactor.y = 0;
	return button;
};

Flixel.system.input.pads.FlxVirtualPad.prototype.createCenter = function(X, Y, Width, Height, Image)
{
	var center = new Flixel.FlxSprite(X, Y).loadGraphic(Image, false, false, Width, Height);
	center.setSolid(false);
	center.immovable = true;
	center.ignoreDrawDebug = true;
	center.scrollFactor.x = center.scrollFactor.y = 0;
	return center;
};

/**
 * Set <code>alpha</code> to a number between 0 and 1 to change the opacity of the gamepad.
 * 
 * @param Alpha
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.setAlpha = function(Alpha)
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].setAlpha(Alpha);
	}
};

/**
 * Set the offset position of the D-PAD.
 * 
 * @param X
 *            The x-offset
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.setDPadPosition = function(X, Y)
{
	for (var i = 0; i < this.dPad.members.length; i++) {
		this.dPad.members[i].x += X;
		this.dPad.members[i].y += Y;
	}
};

/**
 * Set the x-offset position of the D-PAD.
 * 
 * @param X
 *            The x-offset
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.setDPadPositionX = function(X)
{
	for (var i = 0; i < this.dPad.members.length; i++)
		this.dPad.members[i].x += X;
};

/**
 * Set the y-offset position of the D-PAD.
 * 
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.setDPadPositionY = function(Y)
{
	for (var i = 0; i < this.dPad.members.length; i++)
		this.dPad.members[i].y += Y;
};

/**
 * Set the offset position of the action buttons.
 * 
 * @param X
 *            The x-offset
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.setActionPosition = function(X, Y)
{
	for (var i = 0; i < this.actions.members.length; i++) {
		this.actions.members[i].x += X;
		this.actions.members[i].y += Y;
	}
};

/**
 * Set the x-offset position of the action buttons.
 * 
 * @param X
 *            The x-offset
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.setActionPositionX = function(X)
{
	for (var i = 0; i < this.actions.members.length; i++)
		this.actions.members[i].x += X;
};

/**
 * Set the y-offset position of the action buttons.
 * 
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.setActionPositionY = function(Y)
{
	for (var i = 0; i < this.actions.members.length; i++)
		this.actions.members[i].y += Y;
};

/**
 * Show the DPAD.
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.show = function()
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].visible = true;
	}
};

/**
 * Show the DPAD.
 */
Flixel.system.input.pads.FlxVirtualPad.prototype.hide = function()
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].visible = false;
	}
};
/**
 * A gamepad which contains 4 directional buttons and 4 action buttons.<br>
 * It's easy to set the callbacks and to customize the layout.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Create a gamepad which contains 4 directional buttons and 4 action buttons.
 * 
 * @param DPad
 *            The D-Pad mode. FlxVirtualPad2.FULL for example.
 * @param Action
 *            The action buttons mode. FlxVirtualPad2.A_B_C for example.
 */
Flixel.system.input.pads.FlxVirtualPad2 = function(DPad, Action)
{
	this.dPad = new Flixel.FlxGroup();
	this.actions = new Flixel.FlxGroup();

	switch (DPad) {
		case Flixel.system.input.pads.FlxVirtualPad2.DPAD_FULL:
			this.dPad.add(this.add(this.buttonUp = this.createButton(35, Flixel.FlxG.height - 99, 29, 36, Flixel.data.FlxSystemAsset.ImgButtonUp)));
			this.dPad.add(this.add(this.buttonLeft = this.createButton(0, Flixel.FlxG.height - 64, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonLeft)));
			this.dPad.add(this.add(this.buttonRight = this.createButton(64, Flixel.FlxG.height - 64, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonRight)));
			this.dPad.add(this.add(this.buttonDown = this.createButton(35, Flixel.FlxG.height - 39, 29, 39, Flixel.data.FlxSystemAsset.ImgButtonDown)));
			this.dPad.add(this.add(this.createCenter(this.buttonLeft.x + this.buttonLeft.width, Flixel.FlxG.height - 65, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));
			
			// Set up the rectangles
			this.buttonUp.addRectangle(this.buttonUp.x - this.buttonUp.width, this.buttonUp.y - 120 - this.buttonUp.height, (this.buttonUp.width *  3), 120 + this.buttonUp.height * 2);
			this.buttonLeft.addRectangle(this.buttonLeft.x - this.buttonLeft.width, this.buttonLeft.y - this.buttonLeft.height, this.buttonLeft.width * 2, this.buttonLeft.height * 3);
			this.buttonRight.addRectangle(this.buttonRight.x, this.buttonRight.y - this.buttonRight.height, this.buttonRight.width * 3, this.buttonRight.height * 3);
			this.buttonDown.addRectangle(this.buttonDown.x - this.buttonDown.width, this.buttonDown.y, this.buttonDown.width * 3, this.buttonDown.height * 3);
			break;
		case Flixel.system.input.pads.FlxVirtualPad2.UP_DOWN:
			this.dPad.add(this.add(this.buttonUp = this.createButton(35, Flixel.FlxG.height - 101, 29, 36, Flixel.data.FlxSystemAsset.ImgButtonUp)));
			this.dPad.add(this.add(this.buttonDown = this.createButton(35, Flixel.FlxG.height - 39, 29, 39, Flixel.data.FlxSystemAsset.ImgButtonDown)));
			this.dPad.add(this.add(this.createCenter(35, Flixel.FlxG.height - 66, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));

			// Set up the rectangles
			this.buttonUp.addRectangle(this.buttonUp.x - this.buttonUp.width, this.buttonUp.y - 120 - this.buttonUp.height, (this.buttonUp.width *  3), 120 + this.buttonUp.height * 2);
			this.buttonDown.addRectangle(this.buttonDown.x - this.buttonDown.width, this.buttonDown.y, this.buttonDown.width * 3, this.buttonDown.height * 3);
			break;
		case Flixel.system.input.pads.FlxVirtualPad2.LEFT_RIGHT:
			this.dPad.add(this.add(this.buttonLeft = this.createButton(0, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonLeft)));
			this.dPad.add(this.add(this.buttonRight = this.createButton(64, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonRight)));
			this.dPad.add(this.add(this.createCenter(this.buttonLeft.x + this.buttonLeft.width, Flixel.FlxG.height - 45, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));

			// Set up the rectangles
			this.buttonLeft.addRectangle(this.buttonLeft.x - this.buttonLeft.width, this.buttonLeft.y - this.buttonLeft.height, this.buttonLeft.width * 2, this.buttonLeft.height * 3);
			this.buttonRight.addRectangle(this.buttonRight.x, this.buttonRight.y - this.buttonRight.height, this.buttonRight.width * 3, this.buttonRight.height * 3);
			break;
		case Flixel.system.input.pads.FlxVirtualPad2.UP_LEFT_RIGHT:
			this.dPad.add(this.add(this.buttonUp = this.createButton(35, Flixel.FlxG.height - 79, 29, 36, Flixel.data.FlxSystemAsset.ImgButtonUp)));
			this.dPad.add(this.add(this.buttonLeft = this.createButton(0, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonLeft)));
			this.dPad.add(this.add(this.buttonRight = this.createButton(64, Flixel.FlxG.height - 44, 35, 29, Flixel.data.FlxSystemAsset.ImgButtonRight)));
			this.dPad.add(this.add(this.createCenter(this.buttonLeft.x + this.buttonLeft.width, Flixel.FlxG.height - 45, 29, 27, Flixel.data.FlxSystemAsset.ImgCenter)));

			// Set up the rectangles
			this.buttonUp.addRectangle(this.buttonUp.x - this.buttonUp.width, this.buttonUp.y - 120 - this.buttonUp.height, (this.buttonUp.width *  3), 120 + this.buttonUp.height * 2);
			this.buttonLeft.addRectangle(this.buttonLeft.x - this.buttonLeft.width, this.buttonLeft.y - this.buttonLeft.height, this.buttonLeft.width * 2, this.buttonLeft.height * 3);
			this.buttonRight.addRectangle(this.buttonRight.x, this.buttonRight.y - this.buttonRight.height, this.buttonRight.width * 3, this.buttonRight.height * 3);
			break;
		default:
			break;
	}

	switch (Action) {
		case Flixel.system.input.pads.FlxVirtualPad2.A:
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 50, Flixel.FlxG.height - 68, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad2.A_B:
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 41, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 37, Flixel.FlxG.height - 72, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad2.A_B_C:
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 99, Flixel.FlxG.height - 41, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 62, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			this.actions.add(this.add(this.buttonC = this.createButton(Flixel.FlxG.width - 37, Flixel.FlxG.height - 83, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonC)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad2.A_B_X_Y:
			this.actions.add(this.add(this.buttonY = this.createButton(Flixel.FlxG.width - 99, Flixel.FlxG.height - 72, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonY)));
			this.actions.add(this.add(this.buttonX = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 103, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonX)));
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 68, Flixel.FlxG.height - 41, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			this.actions.add(this.add(this.buttonA = this.createButton(Flixel.FlxG.width - 37, Flixel.FlxG.height - 72, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonA)));
			break;
		case Flixel.system.input.pads.FlxVirtualPad2.B:
			this.actions.add(this.add(this.buttonB = this.createButton(Flixel.FlxG.width - 50, Flixel.FlxG.height - 68, 37, 37, Flixel.data.FlxSystemAsset.ImgButtonB)));
			
			// Set up the rectangles
			this.buttonB.addRectangle(this.buttonB.x - this.buttonB.width, this.buttonB.y - this.buttonB.height, this.buttonB.width * 3, this.buttonB.height * 3);
			break;
		default:
			break;
	}
};
extend(Flixel.system.input.pads.FlxVirtualPad2, Flixel.FlxGroup);

/**
 * Don't use any directional button.
 */
Flixel.system.input.pads.FlxVirtualPad2.DPAD_NONE = 0;
/**
 * Use the set of 4 directions or A, B, X, and Y.
 */
Flixel.system.input.pads.FlxVirtualPad2.DPAD_FULL = 1;
/**
 * Use UP and DOWN direction buttons.
 */
Flixel.system.input.pads.FlxVirtualPad2.UP_DOWN = 2;
/**
 * Use LEFT and RIGHT direction buttons.
 */
Flixel.system.input.pads.FlxVirtualPad2.LEFT_RIGHT = 3;
/**
 * Use UP, LEFT and RIGHT direction buttons.
 */
Flixel.system.input.pads.FlxVirtualPad2.UP_LEFT_RIGHT = 4;
/**
 * Don't use any action buttons.
 */
Flixel.system.input.pads.FlxVirtualPad2.ACTION_NONE = 0;
/**
 * Use only A button.
 */
Flixel.system.input.pads.FlxVirtualPad2.A = 1;
/**
 * Use A and B button.
 */
Flixel.system.input.pads.FlxVirtualPad2.A_B = 2;
/**
 * Use A, B and C button.
 */
Flixel.system.input.pads.FlxVirtualPad2.A_B_C = 3;
/**
 * Use A, B, X and Y button.
 */
Flixel.system.input.pads.FlxVirtualPad2.A_B_X_Y = 4;
/**
 * Use only B button.
 */
Flixel.system.input.pads.FlxVirtualPad2.B = 5;

/**
 * Button A
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonA = null;
/**
 * Button B
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonB = null;
/**
 * Button C
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonC = null;
/**
 * Button Y
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonY = null;
/**
 * Button X
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonX = null;
/**
 * Button LEFT DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonLeft = null;
/**
 * Button UP DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonUp = null;
/**
 * Button RIGHT DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonRight = null;
/**
 * BUTTON DOWN DIRECTION
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.buttonDown = null;
/**
 * Group of directions buttons.
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.dPad = null;
/**
 * Group of action buttons.
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.actions = null;

/**
 * Overridden destroy method.
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.destroy = function()
{
	Flixel.system.input.pads.FlxVirtualPad2.parent.destroy.apply(this);
	if (this.dPad !== null)
		this.dPad.destroy();
	if (this.actions !== null)
		this.actions.destroy();
	this.dPad = this.actions = null;
	this.buttonA = this.buttonB = this.buttonC = this.buttonY = this.buttonX = null;
	this.buttonLeft = this.buttonUp = this.buttonDown = this.buttonRight = null;
};

/**
 * Creates a button
 * 
 * @param X
 *            The x-position of the button.
 * @param Y
 *            The y-position of the button.
 * @param Width
 *            The width of the button.
 * @param Height
 *            The height of the button.
 * @param Image
 *            The image of the button. It must contains 3 frames (NORMAL, HIGHLIGHT, PRESSED).
 * @param Callback
 *            The callback for the button.
 * @return The button.
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.createButton = function(X, Y, Width, Height, Image)
{
	var button = new Flixel.plugin.FlxRectangleButton(X, Y);
	button.loadGraphic(Image, true, false, Width, Height);
	button.setSolid(false);
	button.immovable = true;
	button.ignoreDrawDebug = true;
	button.scrollFactor.x = button.scrollFactor.y = 0;
	return button;
};

Flixel.system.input.pads.FlxVirtualPad2.prototype.createCenter = function(X, Y, Width, Height, Image)
{
	var center = new Flixel.FlxSprite(X, Y).loadGraphic(Image, false, false, Width, Height);
	center.setSolid(false);
	center.immovable = true;
	center.ignoreDrawDebug = true;
	center.scrollFactor.x = center.scrollFactor.y = 0;
	return center;
};

/**
 * Set <code>alpha</code> to a number between 0 and 1 to change the opacity of the gamepad.
 * 
 * @param Alpha
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.setAlpha = function(Alpha)
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].setAlpha(Alpha);
	}
};

/**
 * Set the offset position of the D-PAD.
 * 
 * @param X
 *            The x-offset
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.setDPadPosition = function(X, Y)
{
	for (var i = 0; i < this.dPad.members.length; i++) {
		this.dPad.members[i].x += X;
		this.dPad.members[i].y += Y;
	}
};

/**
 * Set the x-offset position of the D-PAD.
 * 
 * @param X
 *            The x-offset
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.setDPadPositionX = function(X)
{
	for (var i = 0; i < this.dPad.members.length; i++)
		this.dPad.members[i].x += X;
};

/**
 * Set the y-offset position of the D-PAD.
 * 
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.setDPadPositionY = function(Y)
{
	for (var i = 0; i < this.dPad.members.length; i++)
		this.dPad.members[i].y += Y;
};

/**
 * Set the offset position of the action buttons.
 * 
 * @param X
 *            The x-offset
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.setActionPosition = function(X, Y)
{
	for (var i = 0; i < this.actions.members.length; i++) {
		this.actions.members[i].x += X;
		this.actions.members[i].y += Y;
	}
};

/**
 * Set the x-offset position of the action buttons.
 * 
 * @param X
 *            The x-offset
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.setActionPositionX = function(X)
{
	for (var i = 0; i < this.actions.members.length; i++)
		this.actions.members[i].x += X;
};

/**
 * Set the y-offset position of the action buttons.
 * 
 * @param Y
 *            The y-offset
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.setActionPositionY = function(Y)
{
	for (var i = 0; i < this.actions.members.length; i++)
		this.actions.members[i].y += Y;
};

/**
 * Show the DPAD.
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.show = function()
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].visible = true;
	}
};

/**
 * Show the DPAD.
 */
Flixel.system.input.pads.FlxVirtualPad2.prototype.hide = function()
{
	for (var i = 0; i < this.members.length; i++) {
		this.members[i].visible = false;
	}
};
/**
 * Represents a tiled map, adds the concept of tiles and tilesets.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Class constructor.
 * 
 * @param source
 *            The XML of the map file.
 */
Flixel.plugin.tmx.TiledMap = function(source)
{
	// Read the map header
	this.version = source.version ? source.version : "unknown";
	this.orientation = source.orientation ? source.orientation : "orthogonal";
	this.width = source.width;
	this.height = source.height;
	this.tileWidth = source.tilewidth;
	this.tileHeight = source.tileheight;

	// Define the node and the i out side the fors JS lint error check likes this way ._.
	var node = null;
	var i = 0;

	// Read properties
	if(source.properties) {
		for (i = 0; i < source.properties.length; i++) {
			node = source.properties[i];
			this.properties = this.properties ? this.properties.extend(node) : new Flixel.plugin.tmx.MapProperties(node);
	
		}
	}

	// Count all the layers
	var k = 0;

	// Load tilesets
	if(source.tilesets) {
		for (i = 0; i < source.tilesets.length; i++) {
			node = source.tilesets[i];
			this.tileSets[node.name] = new Flixel.plugin.tmx.MapTileSet(node, this);
		}
	}

	// Load the map layers
	if(source.layers) {
		for (i = 0; i < source.layers.length; i++) {
			node = source.layers[i];

			// Check if it is data or object layer
			if(node.data) {
				this.tileLayers[node.name] = new Flixel.plugin.tmx.MapLayer(node, this);
				this.layers[k++] = this.tileLayers[node.name];
			} else if(node.objects) {
				this.objectGroups[node.name] = new Flixel.plugin.tmx.MapObjects(node, this);
				this.layers[k++] = this.objectGroups[node.name];
			}
		}
	}
};

/**
 * The map version.
 */
Flixel.plugin.tmx.TiledMap.prototype.version = null;
/**
 * The map orientation.<br>
 * Normally orthogonal or isometric.
 */
Flixel.plugin.tmx.TiledMap.prototype.orientation = null;
/**
 * The width of the map in tiles.
 */
Flixel.plugin.tmx.TiledMap.prototype.width = 0;
/**
 * The height of the map in tiles.
 */
Flixel.plugin.tmx.TiledMap.prototype.height = 0;
/**
 * The width of the map tiles, in pixels.
 */
Flixel.plugin.tmx.TiledMap.prototype.tileWidth = 0;
/**
 * The height of the map tiles, in pixels.
 */
Flixel.plugin.tmx.TiledMap.prototype.tileHeight = 0;
/**
 * The map properties.
 */
Flixel.plugin.tmx.TiledMap.prototype.properties = null;
/**
 * All the map tiled layers.
 */
Flixel.plugin.tmx.TiledMap.prototype.tileLayers = {};
/**
 * All the map tile sets.
 */
Flixel.plugin.tmx.TiledMap.prototype.tileSets = {};
/**
 * All the map object groups.
 */
Flixel.plugin.tmx.TiledMap.prototype.objectGroups = {};
/**
 * All the map layers.
 */
Flixel.plugin.tmx.TiledMap.prototype.layers = [];

/**
 * Return a map tileset.
 * 
 * @param name
 *            The tileset name.
 */
Flixel.plugin.tmx.TiledMap.prototype.getTileSet = function(name)
{
	return this.tileSets[name];
};

/**
 * Return a map layer.
 * 
 * @param name
 *            The name layer.
 */
Flixel.plugin.tmx.TiledMap.prototype.getLayer = function(name)
{
	return this.tileLayers[name];
};

/**
 * Return a map object group.
 * 
 * @param name
 *            The object group name.
 */
Flixel.plugin.tmx.TiledMap.prototype.getObjectGroup = function(name)
{
	return this.objectGroups[name];
};

/**
 * Return all the map layers. This includes object group layers aswell.
 */
Flixel.plugin.tmx.TiledMap.prototype.getLayers = function()
{
	return this.layers;
};

/**
 * Return a Tileset.
 * 
 * Wworks only after TmxTileSet has been initialized with an image.
 */
Flixel.plugin.tmx.TiledMap.prototype.getGidOwner = function(gid)
{
	for (var i = 0; i < this.tileSets.length; i++) {
		var tileSet = this.tileSets[i];
		if (tileSet.hasGid(gid))
			return tileSet;
	}
	return null;
};
Flixel.plugin.tmx.MapTileSet = function(source, parent)
{
	this.firstGID = source.firstgid;

	this.imageSource = source.image.source;

	this.map = parent;
	this.name = source.name;
	this.tileWidth = source.tilewidth;
	this.tileHeight = source.tileheight;
	this.spacing = source.spacing;
	this.margin = source.margin;

	// read properties if needed
	if(source.tileproperties) {
		for (var tileId in source.tileproperties) {
			this._tileProps[Number.toInteger(tileId)] = new Flixel.plugin.tmx.MapProperties(source.tileproperties[tileId]);
		}
	}
};

Flixel.plugin.tmx.MapTileSet.prototype._tileProps = [];
Flixel.plugin.tmx.MapTileSet.prototype._image = null;

Flixel.plugin.tmx.MapTileSet.prototype.firstGID = 0;
Flixel.plugin.tmx.MapTileSet.prototype.map = null;
Flixel.plugin.tmx.MapTileSet.prototype.name = null;
Flixel.plugin.tmx.MapTileSet.prototype.tileWidth = 0;
Flixel.plugin.tmx.MapTileSet.prototype.tileHeight = 0;
Flixel.plugin.tmx.MapTileSet.prototype.spacing = 0;
Flixel.plugin.tmx.MapTileSet.prototype.margin = 0;
Flixel.plugin.tmx.MapTileSet.prototype.imageSource = null;

// available only after immage has been assigned:
Flixel.plugin.tmx.MapTileSet.prototype.numTiles = 0xFFFFFF;
Flixel.plugin.tmx.MapTileSet.prototype.numRows = 1;
Flixel.plugin.tmx.MapTileSet.prototype.numCols = 1;

Flixel.plugin.tmx.MapTileSet.prototype.getImage = function()
{
	return this._image;
};

Flixel.plugin.tmx.MapTileSet.prototype.setImage = function(v)
{
	this._image = v;
	// TODO: consider spacing & margin
	this.numCols = Math.floor(v.width / this.tileWidth);
	this.numRows = Math.floor(v.height / this.tileHeight);
	this.numTiles = this.numRows * this.numCols;
};

Flixel.plugin.tmx.MapTileSet.prototype.hasGid = function(gid)
{
	return (gid >= this.firstGID) && (gid < this.firstGID + this.numTiles);
};

Flixel.plugin.tmx.MapTileSet.prototype.fromGid = function(gid)
{
	return gid - this.firstGID;
};

Flixel.plugin.tmx.MapTileSet.prototype.toGid = function(id)
{
	return this.firstGID + id;
};

Flixel.plugin.tmx.MapTileSet.prototype.getPropertiesByGid = function(gid)
{
	return this._tileProps[gid - this.firstGID];
};

Flixel.plugin.tmx.MapTileSet.prototype.getProperties = function(id)
{
	return this._tileProps[id];
};

Flixel.plugin.tmx.MapTileSet.prototype.getRect = function(id)
{
	// TODO: consider spacing & margin
	return new Flixel.FlxRect((id % this.numCols) * this.tileWidth, (id / this.numCols) * this.tileHeight);
};
/*******************************************************************************
 * Copyright (c) 2010 by Thomas Jahn
 * This content is released under the MIT License. (Just like Flixel)
 * For questions mail me at lithander@gmx.de!
 ******************************************************************************/

/**
 * The representation of a map layer.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param source
 *            The XML representation of this layer.
 * @param parent
 *            The parent map.
 */
Flixel.plugin.tmx.MapLayer = function(source, parent)
{
	// Store the paren map
	this.map = parent;

	// Store the layer own stuff
	this.name = source.name;
	this.x = source.x;
	this.y = source.y;
	this.width = source.width;
	this.height = source.height;
	this.visible = !source.visible || (source.visible !== 0);
	this.opacity = source.opacity;

	// Load the layer properties
	if(source.properties) {
		this.properties = new Flixel.plugin.tmx.MapProperties(source.properties);
	}

	// Load tile GIDs
	this.tileGIDs = [];
	if (source.data) {
		// Create a 2dimensional array
		var lineWidth = this.width;
		var rowIdx = -1;
		for (var i = 0; i < source.data.length; i++) {
			var node = source.data[i];
			// New line?
			if (++lineWidth >= this.width) {
				this.tileGIDs[++rowIdx] = [];
				lineWidth = 0;
			}
			this.tileGIDs[rowIdx].push(node);
		}
	}
};

/**
 * The map where this layer is placed.
 */
Flixel.plugin.tmx.MapLayer.prototype.map = null;
/**
 * The layer name.
 */
Flixel.plugin.tmx.MapLayer.prototype.name = null;
/**
 * The X coordinate of this layer.
 */
Flixel.plugin.tmx.MapLayer.prototype.x = 0;
/**
 * The Y coordinate of this layer.
 */
Flixel.plugin.tmx.MapLayer.prototype.y = 0;
/**
 * The layer width.
 */
Flixel.plugin.tmx.MapLayer.prototype.width = 0;
/**
 * The layer height.
 */
Flixel.plugin.tmx.MapLayer.prototype.height = 0;
/**
 * The layer opacity (alpha value).
 */
Flixel.plugin.tmx.MapLayer.prototype.opacity = 0;
/**
 * If the layer is visible or not.
 */
Flixel.plugin.tmx.MapLayer.prototype.visible = false;
/**
 * The tile gid.
 */
Flixel.plugin.tmx.MapLayer.prototype.tileGIDs = null;
/**
 * The layer properties.
 */
Flixel.plugin.tmx.MapLayer.prototype.properties = null;

/**
 * Convert this layer to a string usable for FlxTilemap.
 * 
 * @param tileSet
 *            The map tileset.
 */
Flixel.plugin.tmx.MapLayer.prototype.toCsv = function(tileSet)
{
	var max = 0xFFFFFF;
	var offset = 0;
	if (tileSet) {
		offset = tileSet.firstGID;
		max = tileSet.numTiles - 1;
	}
	var result = "";
	for ( var row in this.tileGIDs) {
		var chunk = "";
		var id = 0;
		for (id in row) {
			id -= offset;
			if (id < 0 || id > max)
				id = 0;
			result += chunk;
			chunk = id + ",";
		}
		result += id + "\n";
	}
	return result;
};

/**
 * Convert a string into array.
 * 
 * @param input
 *            The string to convert.
 * @param lineWidth
 *            The line width.
 */
Flixel.plugin.tmx.MapLayer.prototype.csvToArray = function(input, lineWidth)
{
	var result = [];
	var rows = input.split("\n");
	for ( var row in rows) {
		var resultRow = [];
		var entries = row.split(",", lineWidth);
		for ( var entry in entries)
			resultRow.push(uint(entry)); // Convert to uint
		result.push(resultRow);
	}
	return result;
};
/**
 * The representation of a map object group.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */
/**
 * Class constructor.
 * 
 * @param source
 *            The XML representation of this group.
 * @param parent
 *            The parent map.
 */
Flixel.plugin.tmx.MapObjects = function(source, parent)
{
	// Store the paren map
	this.map = parent;

	// Store the group own stuff
	this.name = source.name;
	this.x = source.x;
	this.y = source.y;
	this.width = source.width;
	this.height = source.height;
	this.visible = !source.visible || (source.visible !== 0);
	this.opacity = source.opacity;

	// Load the group properties
	if(source.properties) {
		this.properties = new Flixel.plugin.tmx.MapProperties(source.properties);
	}

	// Load the group objects
	for (var i = 0; i < source.objects.length; i++) {
		var node = source.objects[i];
		this.objects.push(new Flixel.plugin.tmx.MapObject(node, this));
	}
};

/**
 * The map where this group is placed.
 */
Flixel.plugin.tmx.MapObjects.prototype.map = null;
/**
 * The group name.
 */
Flixel.plugin.tmx.MapObjects.prototype.name = null;
/**
 * The X coordinate of this group.
 */
Flixel.plugin.tmx.MapObjects.prototype.x = 0;
/**
 * The Y coordinate of this group.
 */
Flixel.plugin.tmx.MapObjects.prototype.y = 0;
/**
 * The group width.
 */
Flixel.plugin.tmx.MapObjects.prototype.width = 0;
/**
 * The group height.
 */
Flixel.plugin.tmx.MapObjects.prototype.height = 0;
/**
 * The group opacity (alpha value).
 */
Flixel.plugin.tmx.MapObjects.prototype.opacity = 0;
/**
 * If the group is visible or not.
 */
Flixel.plugin.tmx.MapObjects.prototype.visible = false;
/**
 * The group properties.
 */
Flixel.plugin.tmx.MapObjects.prototype.properties = null;
/**
 * All The group objects.
 */
Flixel.plugin.tmx.MapObjects.prototype.objects = [];

/**
 * Return the number of objects.
 */
Flixel.plugin.tmx.MapObjects.prototype.getCount = function()
{
	return this.objects.length;
};

/**
 * Return an object form this map.
 */
Flixel.plugin.tmx.MapObjects.prototype.get = function(index)
{
	return this.objects[index];
};
/**
 * The representation of a map object.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param source
 *            The XML representation of this object.
 * @param parent
 *            The parent group.
 */
Flixel.plugin.tmx.MapObject = function(source, parent)
{
	// Store the paren group
	this.group = parent;

	// Store the object own stuff
	this.name = source.name;
	this.type = source.type;
	this.x = source.x;
	this.y = source.y;
	this.width = source.width;
	this.height = source.height;

	// Resolve inheritence
	this.shared = null;
	this.gid = -1;
	if (source.gid) // Object with tile association?
	{
		this.gid = source.gid;
		for (var i = 0; i < this.group.map.tileSets.length; i++) {
			var tileSet = this.group.map.tileSets[i];
			this.shared = tileSet.getPropertiesByGid(this.gid);
			if (this.shared)
				break;
		}
	}

	// Load the object properties
	if(source.properties) {
		this.custom = new Flixel.plugin.tmx.MapProperties(source.properties);
	}

	// Initialize if needed
	if (this.custom === null)
		this.custom = new Flixel.plugin.tmx.MapProperties();

	// Save the coordinates as properties
	this.custom.x = this.x;
	this.custom.y = this.y;
};

/**
 * The group in which this object is stored.
 */
Flixel.plugin.tmx.MapObject.prototype.group = null;
/**
 * The object name.
 */
Flixel.plugin.tmx.MapObject.prototype.name = null;
/**
 * The object type.
 */
Flixel.plugin.tmx.MapObject.prototype.type = null;
/**
 * The X coordinate of this object.
 */
Flixel.plugin.tmx.MapObject.prototype.x = 0;
/**
 * The Y coordinate of this object.
 */
Flixel.plugin.tmx.MapObject.prototype.y = 0;
/**
 * The object width.
 */
Flixel.plugin.tmx.MapObject.prototype.width = 0;
/**
 * The object height.
 */
Flixel.plugin.tmx.MapObject.prototype.height = 0;
/**
 * An reference to a tile.
 */
Flixel.plugin.tmx.MapObject.prototype.gid = 0;
/**
 * The object custom properties.
 */
Flixel.plugin.tmx.MapObject.prototype.custom = null;
/**
 * The object shared properties.
 */
Flixel.plugin.tmx.MapObject.prototype.shared = null;

/**
 * Return the object properties.
 */
Flixel.plugin.tmx.MapObject.prototype.getProperties = function()
{
	return this.custom;
};

/**
 * Return the object name.
 */
Flixel.plugin.tmx.MapObject.prototype.getName = function()
{
	return this.name;
};

/**
 * Hold all the properties of the TMX file.<br> 
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param source
 *            The XML to create the properties with.
 */
Flixel.plugin.tmx.MapProperties = function(source)
{
	if (source !== null)
		this.readProperties(source);
};

/**
 * Expand the current properties of this class.
 * 
 * @param source
 *            The XML to expand the properties with.
 */
Flixel.plugin.tmx.MapProperties.prototype.readProperties = function(source)
{
	// Loop throw all properties
	for (var name in source) {
		var key = name;
		var value = source[name];
		this[key] = value;
	}
	return this;
};

/**
 * Returns a property if exists.
 */
Flixel.plugin.tmx.MapProperties.prototype.get = function(key)
{
	return this[key];
};
/**
 * A class to help automate and simplify save game functionality.
 * Basicaly a wrapper for the localStorage thing, but
 * handles some annoying storage request stuff too.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Blanks out the containers.
 */
Flixel.plugin.store.FlxSave = function()
{
	this.destroy();
};

Flixel.plugin.store.FlxSave.SUCCESS = 0;
Flixel.plugin.store.FlxSave.PENDING = 1;
Flixel.plugin.store.FlxSave.ERROR = 2;

/**
 * Allows you to directly access the data container in the local shared object.
 * 
 * @default null
 */
Flixel.plugin.store.FlxSave.prototype.data = null;
/**
 * The name of the local shared object.
 * 
 * @default null
 */
Flixel.plugin.store.FlxSave.prototype.name = null;
/**
 * The local shared object itself.
 * 
 * @default null
 */
Flixel.plugin.store.FlxSave.prototype._sharedObject = null;

/**
 * Internal tracker for callback function in case save takes too long.
 */
Flixel.plugin.store.FlxSave.prototype._onComplete = null;
/**
 * Internal tracker for save object close request.
 */
Flixel.plugin.store.FlxSave.prototype._closeRequested = false;

/**
 * Clean up memory.
 */
Flixel.plugin.store.FlxSave.prototype.destroy = function()
{
	this._sharedObject = null;
	this.name = null;
	this.data = null;
	this._onComplete = null;
	this._closeRequested = false;
};

/**
 * Automatically creates or reconnects to locally saved data.
 * 
 * @param Name
 *            The name of the object (should be the same each time to access old
 *            data).
 * 
 * @return Whether or not you successfully connected to the save data.
 */
Flixel.plugin.store.FlxSave.prototype.bind = function(Name)
{
	this.destroy();
	this.name = Name;
	try {
		this._sharedObject = StorageManager.getInstance().createLocalStorage(this.name);
	} catch (e) {
		Flixel.FlxG.log("ERROR: There was a problem binding to\nthe localStorage data from FlxSave.");
		this.destroy();
		return false;
	}
	this.data = [];

	// Populate the data if needed
	var keys = Object.keys(this._sharedObject._data);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		this.data[key] = this._sharedObject._data[key];
	}

	return true;
};

/**
 * A way to safely call <code>flush()</code> and <code>destroy()</code> on
 * your save file. Will correctly handle storage size popups and all that good
 * stuff. If you don't want to save your changes first, just call
 * <code>destroy()</code> instead.
 * 
 * @param MinFileSize
 *            If you need X amount of space for your save, specify it here.
 * @param OnComplete
 *            This callback will be triggered when the data is written
 *            successfully.
 * 
 * @return The result of result of the <code>flush()</code> call (see below
 *         for more details).
 */
Flixel.plugin.store.FlxSave.prototype.close = function(MinFileSize, OnComplete)
{
	this._closeRequested = true;
	return this.flush(MinFileSize, OnComplete);
};

/**
 * Writes the local shared object to disk immediately. Leaves the object open in
 * memory.
 * 
 * @param MinFileSize
 *            If you need X amount of space for your save, specify it here.<br>
 *            It's unused in HTML5!!
 * @param OnComplete
 *            This callback will be triggered when the data is written
 *            successfully.
 * 
 * @return Whether or not the data was written immediately. False could be an
 *         error OR a storage request popup.
 */
Flixel.plugin.store.FlxSave.prototype.flush = function(MinFileSize, OnComplete)
{
	if (!this.checkBinding())
		return false;

	// Save all the values on data
	this._sharedObject.add(this.data);

	this._onComplete = (OnComplete === undefined) ? null : OnComplete;
	return this.onDone(Flixel.plugin.store.FlxSave.SUCCESS);
};

/**
 * Erases everything stored in the local shared object. Data is immediately
 * erased and the object is saved that way, so use with caution!
 * 
 * @return Returns false if the save object is not bound yet.
 */
Flixel.plugin.store.FlxSave.prototype.erase = function()
{
	if (!this.checkBinding())
		return false;
	this._sharedObject.clear();
	return true;
};

/**
 * Event handler for special case storage requests. Handles logging of errors
 * and calling of callback.
 * 
 * @param Result
 *            One of the result codes (PENDING, ERROR, or SUCCESS).
 * 
 * @return Whether the operation was a success or not.
 */
Flixel.plugin.store.FlxSave.prototype.onDone = function(Result)
{
	switch (Result) {
		case Flixel.plugin.store.FlxSave.ERROR:
			Flixel.FlxG.log("ERROR: There was a problem flushing\nthe shared object data from FlxSave.");
			break;
		default:
			break;
	}
	if (this._onComplete !== null)
		this._onComplete(Result == Flixel.plugin.store.FlxSave.SUCCESS);
	if (this._closeRequested)
		this.destroy();
	return Result == Flixel.plugin.store.FlxSave.SUCCESS;
};

/**
 * Handy utility function for checking and warning if the shared object is bound
 * yet or not.
 * 
 * @return Whether the shared object was bound yet.
 */
Flixel.plugin.store.FlxSave.prototype.checkBinding = function()
{
	if (this._sharedObject === null) {
		Flixel.FlxG.log("You must call FlxSave.bind()\nbefore you can read or write data.");
		return false;
	}
	return true;
};
/**
 * A handy class use to manage the Android Like Shared Preferences.<br>
 * In Desktop it create simple text documents.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.plugin.store.FlxPreferences = function(name)
{
	this.preferences = new Flixel.plugin.store.FlxSave();
	this.preferences.bind(name);
};


/**
 * The reference to the Preferences object.
 */
Flixel.plugin.store.FlxPreferences.prototype.preferences = null;

/**
 * Static initializer.
 */
Flixel.plugin.store.FlxPreferences.initPreferences = function(name)
{
	name = (name === undefined) ? "FlixelPref" : name;
	return new Flixel.plugin.store.FlxPreferences(name);
};

/**
 * Get a boolean value from the preferences.
 * 
 * @param key
 *            The key of the boolean.
 * @param def
 *            The default value.
 * @return The boolean attached to the key, or the default value if it is not
 *         found.
 */
Flixel.plugin.store.FlxPreferences.prototype.getBoolean = function(key, def)
{
	return (this.preferences.data[key] === undefined) ? def : this.preferences.data[key];
};

/**
 * Get a integer value from the preferences.
 * 
 * @param key
 *            The key of the integer.
 * @param def
 *            The default value.
 * @return The integer attached to the key, or the default value if it is not
 *         found.
 */
Flixel.plugin.store.FlxPreferences.prototype.getInt= function(key, def)
{
	return (this.preferences.data[key] === undefined) ? def : this.preferences.data[key];
};

/**
 * Get a float value from the preferences.
 * 
 * @param key
 *            The key of the float.
 * @param def
 *            The default value.
 * @return The float attached to the key, or the default value if it is not
 *         found.
 */
Flixel.plugin.store.FlxPreferences.prototype.getFloat= function(key, def)
{
	return (isNaN(this.preferences.data[key]) || this.preferences.data[key] === undefined || this.preferences.data[key] === null) ? def : this.preferences.data[key];
};

/**
 * Get a string value from the preferences.
 * 
 * @param key
 *            The key of the string.
 * @param def
 *            The default value.
 * @return The string attached to the key, or the default value if it is not
 *         found.
 */
Flixel.plugin.store.FlxPreferences.prototype.getString= function(key, def)
{
	return (this.preferences.data[key] === undefined) ? def : this.preferences.data[key];
};

/**
 * Get a long value from the preferences.
 * 
 * @param key
 *            The key of the long.
 * @param def
 *            The default value.
 * @return The long attached to the key, or the default value if it is not
 *         found.
 */
Flixel.plugin.store.FlxPreferences.prototype.getLong= function(key, def)
{
	return (this.preferences.data[key] === undefined) ? def : this.preferences.data[key];
};

/**
 * Set a boolean value from the preferences.
 * 
 * @param key
 *            The key of the boolean.
 * @param value
 *            The boolean value.
 */
Flixel.plugin.store.FlxPreferences.prototype.setBoolean= function(key, value)
{
	this.preferences.data[key] = value;
	this.preferences.flush();
};

/**
 * Set a integer value from the preferences.
 * 
 * @param key
 *            The key of the integer.
 * @param value
 *            The integer value.
 */
Flixel.plugin.store.FlxPreferences.prototype.setInt= function(key, value)
{
	this.preferences.data[key] = value;
	this.preferences.flush();
};

/**
 * Set a float value from the preferences.
 * 
 * @param key
 *            The key of the float.
 * @param value
 *            The float value.
 */
Flixel.plugin.store.FlxPreferences.prototype.setFloat= function(key, value)
{
	this.preferences.data[key] = value;
	this.preferences.flush();
};

/**
 * Set a string value from the preferences.
 * 
 * @param key
 *            The key of the string.
 * @param value
 *            The string value.
 */
Flixel.plugin.store.FlxPreferences.prototype.setString= function(key, value)
{
	this.preferences.data[key] = value;
	this.preferences.flush();
};

/**
 * Set a long value from the preferences.
 * 
 * @param key
 *            The key of the long.
 * @param value
 *            The long value.
 */
Flixel.plugin.store.FlxPreferences.prototype.setLong= function(key, value)
{
	this.preferences.data[key] = value;
	this.preferences.flush();
};

/**
 * Remove the preference attached to the string
 * 
 * @param key
 *            The key of the preference.
 */
Flixel.plugin.store.FlxPreferences.prototype.removePreference = function(key)
{
	this.preferences.data[key] = null;
	this.preferences.flush();
};

/**
 * Clear all the preferences. THEY CAN'T BE RECOVERED!!! USE AT YOUR OWN RISK!!!
 */
Flixel.plugin.store.FlxPreferences.prototype.clearPreferences = function()
{
	this.preferences.erase();
	this.preferences.flush();
};
/**
 * A tween plugin for flixel. It uses the Universal Tween Engine by Aurelien
 * Ribon. It supports different tweens, timeline, parallel and many callbacks.
 * By default the FlxSprite and TweenSprite accessor is register. To register
 * your own accessor you'll need CustomClass + Accessor.
 * 
 * Take a look at: http://code.google.com/p/java-universal-tween-engine/
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Ka Wing Chin
 */
Flixel.plugin.tweens.TweenPlugin = function()
{
	/**
	 * A TweenManager updates all your tweens and timelines at once. Its main
	 * interest is that it handles the tween/timeline life-cycles for you, as
	 * (the)well pooling constraints (if object pooling is enabled). Just give
	 * it a bunch of tweens or timelines and call update() periodically, you
	 * don't need to care for anything else! Relax and enjoy your animations.
	 */
	Flixel.plugin.tweens.TweenPlugin.parent.constructor.apply(this);

};
extend(Flixel.plugin.tweens.TweenPlugin, Flixel.FlxBasic);
/**
 * The global tween class.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor. Specify basic information about the Tween.
 * 
 * @param duration
 *            Duration of the tween (in seconds or frames).
 * @param type
 *            Tween type, one of Tween.PERSIST (default), Tween.LOOPING, or
 *            Tween.ONESHOT.
 * @param complete
 *            Optional callback for when the Tween completes.
 * @param ease
 *            Optional easer method to apply to the Tweened value.
 */
Flixel.plugin.tweens.FlxTween = function(duration, type, complete, ease)
{
	type = (type === undefined) ? 0 : type;
	complete = (complete === undefined) ? null : complete;
	ease = (ease === undefined) ? null : ease;

	this._target = duration;
	if (type === 0) {
		type = Flixel.plugin.tweens.FlxTween.PERSIST;
	} else if (type == Flixel.plugin.tweens.FlxTween.BACKWARD) {
		type = Flixel.plugin.tweens.FlxTween.PERSIST | Flixel.plugin.tweens.FlxTween.BACKWARD;
	}
	this._type = type;
	this.complete = complete;
	this._ease = ease;
	this._t = 0;

	this._backward = (this._type & Flixel.plugin.tweens.FlxTween.BACKWARD) > 0;
};



/**
 * Persistent Tween type, will stop when it finishes.
 */
Flixel.plugin.tweens.FlxTween.PERSIST = 1;
/**
 * Looping Tween type, will restart immediately when it finishes.
 */
Flixel.plugin.tweens.FlxTween.LOOPING = 2;
/**
 * "To and from" Tween type, will play tween hither and thither
 */
Flixel.plugin.tweens.FlxTween.PINGPONG = 4;
/**
 * Oneshot Tween type, will stop and remove itself from its core
 * container when it finishes.
 */
Flixel.plugin.tweens.FlxTween.ONESHOT = 8;
/**
 * Backward Tween type, will play tween in reverse direction
 */
Flixel.plugin.tweens.FlxTween.BACKWARD = 16;
/**
 * True if the tweening is active.
 */
Flixel.plugin.tweens.FlxTween.prototype.active = false;
/**
 * This method will be called when the tween complete.
 */
Flixel.plugin.tweens.FlxTween.prototype.complete = null;
/**
 * The period of time that tween has completed.
 */
Flixel.plugin.tweens.FlxTween.prototype.percent = 0;
/**
 * The scale of time.
 */
Flixel.plugin.tweens.FlxTween.prototype.scale = 0;
/**
 * The type of tween.
 */
Flixel.plugin.tweens.FlxTween.prototype._type = 0;
/**
 * The easer method to apply to the Tweened value.
 */
Flixel.plugin.tweens.FlxTween.prototype._ease = null;
/**
 * The percent of completed tween.
 */
Flixel.plugin.tweens.FlxTween.prototype._t = 0;
/**
 * The time that has passed since the tween started.
 */
Flixel.plugin.tweens.FlxTween.prototype._time = 0;
/**
 * Duration of the tween (in seconds or frames).
 */
Flixel.plugin.tweens.FlxTween.prototype._target = 0;
/**
 * True if the tweening has finished.
 */
Flixel.plugin.tweens.FlxTween.prototype.finish = false;
/**
 * The parent object.
 */
Flixel.plugin.tweens.FlxTween.prototype.parent = null;
/**
 * The previous tween.
 */
Flixel.plugin.tweens.FlxTween.prototype.prev = null;
/**
 * The next tween.
 */
Flixel.plugin.tweens.FlxTween.prototype.next = null;
/**
 * If the tween has to be played in a reverse direction.
 */
Flixel.plugin.tweens.FlxTween.prototype._backward = false;

/**
 * Destroy method.
 */
Flixel.plugin.tweens.FlxTween.prototype.destroy = function()
{
	this.complete = null;
	this.parent = null;
	this._ease = null;
};

/**
 * Updates the Tween, called by World.
 */
Flixel.plugin.tweens.FlxTween.prototype.update = function()
{
	this._time += Flixel.FlxG.elapsed;
	this._t = this._time / this._target;
	if (this._ease !== null) {
		this._t = this._ease(this._t);
	}
	
	if (this._backward) {
		this._t = 1 - this._t;
	}
	
	if (this._time >= this._target) {
		if (!this._backward) {
			this._t = 1;
		} else {
			this._t = 0;
		}
		this.finish = true;
	}
};

/**
 * Starts the Tween, or restarts it if it's currently running.
 */
Flixel.plugin.tweens.FlxTween.prototype.start = function()
{
	this._time = 0;
	if (this._target === 0) {
		this.active = false;
		return;
	}
	this.active = true;
};

/**
 * Immediately stops the Tween and removes it from its Tweener without
 * calling the complete callback.
 */
Flixel.plugin.tweens.FlxTween.prototype.cancel = function()
{
	this.active = false;
	if (this.parent !== null) {
		this.parent.removeTween(this);
	}
};

/**
 * Called when the Tween completes.
 */
Flixel.plugin.tweens.FlxTween.prototype.finishTween = function()
{
	if (this.complete !== null)
		this.complete();
	
	switch ((this._type & ~Flixel.plugin.tweens.FlxTween.BACKWARD))
	{
		case Flixel.plugin.tweens.FlxTween.PERSIST:
			this._time = this._target;
			this.active = false;
			break;
		case Flixel.plugin.tweens.FlxTween.LOOPING:
			this._time %= this._target;
			this._t = this._time / this._target;
			if (this._ease !== null && this._t > 0 && this._t < 1) this._t = this._ease(this._t);
			this.start();
			break;
		case Flixel.plugin.tweens.FlxTween.PINGPONG:
			this._time %= this._target;
			this._t = this._time / this._target;
			if (this._ease !== null && this._t > 0 && this._t < 1) this._t = this._ease(this._t);
			if (this._backward) this._t = 1 - this._t;
			this._backward = !this._backward;
			this.start();
			break;
		case Flixel.plugin.tweens.FlxTween.ONESHOT:
			this._time = this._target;
			this.active = false;
			this.parent.removeTween(this, true);
			break;
	}
	this.finish = false;
};

/**
 * Get the percent of completed tween.
 * 
 * @return
 */
Flixel.plugin.tweens.FlxTween.prototype.getPercent = function()
{
	return this._time / this._target;
};

/**
 * Set the percent.
 * 
 * @param value
 *            The percent value.
 * @return
 */
Flixel.plugin.tweens.FlxTween.prototype.setPercent = function(value)
{
	this._time = this._target * value;
	return this._time;
};

/**
 * Return the time scale.
 */
Flixel.plugin.tweens.FlxTween.prototype.getScale = function()
{
	return this._t;
};
/**
 * Static class with useful easer floats that can be used by Tweens.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

Flixel.plugin.tweens.util.Ease = function()
{
};

/** Quadratic in. */
Flixel.plugin.tweens.util.Ease.quadIn = function(t)
{
	return t * t;
};

/** Quadratic out. */
Flixel.plugin.tweens.util.Ease.quadOut = function(t)
{
	return -t * (t - 2);
};

/** Quadratic in and out. */
Flixel.plugin.tweens.util.Ease.quadInOut = function(t)
{
	return t <= 0.5 ? t * t * 2 : 1 - (--t) * t * 2;
};

/** Cubic in. */
Flixel.plugin.tweens.util.Ease.cubeIn = function(t)
{
	return t * t * t;
};

/** Cubic out. */
Flixel.plugin.tweens.util.Ease.cubeOut = function(t)
{
	return 1 + (--t) * t * t;
};

/** Cubic in and out. */
Flixel.plugin.tweens.util.Ease.cubeInOut = function(t)
{
	return t <= 0.5 ? t * t * t * 4 : 1 + (--t) * t * t * 4;
};

/** Quart in. */
Flixel.plugin.tweens.util.Ease.quartIn = function(t)
{
	return t * t * t * t;
};

/** Quart out. */
Flixel.plugin.tweens.util.Ease.quartOut = function(t)
{
	return 1 - (t -= 1) * t * t * t;
};

/** Quart in and out. */
Flixel.plugin.tweens.util.Ease.quartInOut = function(t)
{
	return t <= 0.5 ? t * t * t * t * 8 : (1 - (t = t * 2 - 2) * t * t * t) / 2 + 0.5;
};

/** Quint in. */
Flixel.plugin.tweens.util.Ease.quintIn = function(t)
{
	return t * t * t * t * t;
};

/** Quint out. */
Flixel.plugin.tweens.util.Ease.quintOut = function(t)
{
	return (t = t - 1) * t * t * t * t + 1;
};

/** Quint in and out. */
Flixel.plugin.tweens.util.Ease.quintInOut = function(t)
{
	return ((t *= 2) < 1) ? (t * t * t * t * t) / 2 : ((t -= 2) * t * t * t * t + 2) / 2;
};

/** Sine in. */
Flixel.plugin.tweens.util.Ease.sineIn = function(t)
{
	return -Math.cos(Flixel.plugin.tweens.util.Ease.PI2 * t) + 1;
};

/** Sine out. */
Flixel.plugin.tweens.util.Ease.sineOut = function(t)
{
	return Math.sin(Flixel.plugin.tweens.util.Ease.PI2 * t);
};

/** Sine in and out. */
Flixel.plugin.tweens.util.Ease.sineInOut = function(t)
{
	return -Math.cos(Flixel.plugin.tweens.util.Ease.PI * t) / 2 + 0.5;
};

/** Bounce in. */
Flixel.plugin.tweens.util.Ease.bounceIn = function(t)
{
	t = 1 - t;
	if (t < Flixel.plugin.tweens.util.Ease.B1)
		return 1 - 7.5625 * t * t;
	if (t < Flixel.plugin.tweens.util.Ease.B2)
		return 1 - (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B3) * (t - Flixel.plugin.tweens.util.Ease.B3) + 0.75);
	if (t < Flixel.plugin.tweens.util.Ease.B4)
		return 1 - (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B5) * (t - Flixel.plugin.tweens.util.Ease.B5) + 0.9375);
	return 1 - (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B6) * (t - Flixel.plugin.tweens.util.Ease.B6) + 0.984375);
};

/** Bounce out. */
Flixel.plugin.tweens.util.Ease.bounceOut = function(t)
{
	if (t < Flixel.plugin.tweens.util.Ease.B1)
		return 7.5625 * t * t;
	if (t < Flixel.plugin.tweens.util.Ease.B2)
		return 7.5625 * (t - Flixel.plugin.tweens.util.Ease.B3) * (t - Flixel.plugin.tweens.util.Ease.B3) + 0.75;
	if (t < Flixel.plugin.tweens.util.Ease.B4)
		return 7.5625 * (t - Flixel.plugin.tweens.util.Ease.B5) * (t - Flixel.plugin.tweens.util.Ease.B5) + 0.9375;
	return 7.5625 * (t - Flixel.plugin.tweens.util.Ease.B6) * (t - Flixel.plugin.tweens.util.Ease.B6) + 0.984375;
};

/** Bounce in and out. */
Flixel.plugin.tweens.util.Ease.bounceInOut = function(t)
{
	if (t < 0.5) {
		t = 1 - t * 2;
		if (t < Flixel.plugin.tweens.util.Ease.B1)
			return (1 - 7.5625 * t * t) / 2;
		if (t < Flixel.plugin.tweens.util.Ease.B2)
			return (1 - (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B3) * (t - Flixel.plugin.tweens.util.Ease.B3) + 0.75)) / 2;
		if (t < Flixel.plugin.tweens.util.Ease.B4)
			return (1 - (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B5) * (t - Flixel.plugin.tweens.util.Ease.B5) + 0.9375)) / 2;
		return (1 - (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B6) * (t - Flixel.plugin.tweens.util.Ease.B6) + 0.984375)) / 2;
	}
	t = t * 2 - 1;
	if (t < Flixel.plugin.tweens.util.Ease.B1)
		return (7.5625 * t * t) / 2 + 0.5;
	if (t < Flixel.plugin.tweens.util.Ease.B2)
		return (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B3) * (t - Flixel.plugin.tweens.util.Ease.B3) + 0.75) / 2 + 0.5;
	if (t < Flixel.plugin.tweens.util.Ease.B4)
		return (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B5) * (t - Flixel.plugin.tweens.util.Ease.B5) + 0.9375) / 2 + 0.5;
	return (7.5625 * (t - Flixel.plugin.tweens.util.Ease.B6) * (t - Flixel.plugin.tweens.util.Ease.B6) + 0.984375) / 2 + 0.5;
};

/** Circle in. */
Flixel.plugin.tweens.util.Ease.circIn = function(t)
{
	return -(Math.sqrt(1 - t * t) - 1);
};

/** Circle out. */
Flixel.plugin.tweens.util.Ease.circOut = function(t)
{
	return Math.sqrt(1 - (t - 1) * (t - 1));
};

/** Circle in and out. */
Flixel.plugin.tweens.util.Ease.circInOut = function(t)
{
	return t <= 0.5 ? (Math.sqrt(1 - t * t * 4) - 1) / -2 : (Math.sqrt(1 - (t * 2 - 2) * (t * 2 - 2)) + 1) / 2;
};

/** Exponential in. */
Flixel.plugin.tweens.util.Ease.expoIn = function(t)
{
	return Math.pow(2, 10 * (t - 1));
};

/** Exponential out. */
Flixel.plugin.tweens.util.Ease.expoOut = function(t)
{
	return -Math.pow(2, -10 * t) + 1;
};

/** Exponential in and out. */
Flixel.plugin.tweens.util.Ease.expoInOut = function(t)
{
	return t < 0.5 ? Math.pow(2, 10 * (t * 2 - 1)) / 2 : (-Math.pow(2, -10 * (t * 2 - 1)) + 2) / 2;
};

/** Back in. */
Flixel.plugin.tweens.util.Ease.backIn = function(t)
{
	return t * t * (2.70158 * t - 1.70158);
};

/** Back out. */
Flixel.plugin.tweens.util.Ease.backOut = function(t)
{
	return 1 - (--t) * (t) * (-2.70158 * t - 1.70158);
};

/** Back in and out. */
Flixel.plugin.tweens.util.Ease.backInOut = function(t)
{
	t *= 2;
	if (t < 1)
		return t * t * (2.70158 * t - 1.70158) / 2;
	t--;
	return (1 - (--t) * (t) * (-2.70158 * t - 1.70158)) / 2 + 0.5;
};

// Easing constants.
Flixel.plugin.tweens.util.Ease.PI = Flixel.FlxU.PI;
Flixel.plugin.tweens.util.Ease.PI2 = Flixel.FlxU.HALF_PI;
// private static const EL = 2 * PI / 0.45;
Flixel.plugin.tweens.util.Ease.B1 = 1 / 2.75;
Flixel.plugin.tweens.util.Ease.B2 = 2 / 2.75;
Flixel.plugin.tweens.util.Ease.B3 = 1.5 / 2.75;
Flixel.plugin.tweens.util.Ease.B4 = 2.5 / 2.75;
Flixel.plugin.tweens.util.Ease.B5 = 2.25 / 2.75;
Flixel.plugin.tweens.util.Ease.B6 = 2.625 / 2.75;

/**
 * Operation o in/out easers:
 * 
 * in(t) return t; out(t) return 1 - in(1 - t); inOut(t) return (t <= .5) ? in(t *
 * 2) / 2 : out(t * 2 - 1) / 2 + .5;
 */

/**
 * Tweens from one angle to another.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor.
 * 
 * @param complete
 *            Optional completion callback.
 * @param type
 *            Tween type.
 */
Flixel.plugin.tweens.misc.AngleTween = function(complete, type)
{
	type = (type === undefined) ? 0 : type;
	
	Flixel.plugin.tweens.misc.AngleTween.parent.constructor.apply(this, [0, type, complete]);
	this.angle = 0;
};
extend(Flixel.plugin.tweens.misc.AngleTween, Flixel.plugin.tweens.FlxTween);

/**
 * The current value.
 */
Flixel.plugin.tweens.misc.AngleTween.prototype.angle = 0;

// Tween information.
Flixel.plugin.tweens.misc.AngleTween.prototype._start = 0;
Flixel.plugin.tweens.misc.AngleTween.prototype._range = 0;

/**
 * Tweens the value from one angle to another.
 * 
 * @param       fromAngle               Start angle.
 * @param       toAngle                 End angle.
 * @param       duration                Duration of the tween.
 * @param       ease                    Optional easer function.
 */
Flixel.plugin.tweens.misc.AngleTween.prototype.tween = function(fromAngle, toAngle, duration, ease)
{
	ease = (ease === undefined) ? null : ease;

	this._start = this.angle = fromAngle;
	var d = toAngle - this.angle;
	var a = Math.abs(d);
	if (a > 181)  {
		this._range = (360 - a) * (d > 0 ? -1 : 1);
	} else if (a < 179)  {
		this._range = d;
	} else {
		this._range = Flixel.plugin.FlxMath.randFloat(-180, 180);
	}

	this._target = duration;
	this._ease = ease;
	this.start();
};

/**
 * Updates the Tween.
 */
Flixel.plugin.tweens.misc.AngleTween.prototype.update = function()
{
	Flixel.plugin.tweens.misc.AngleTween.parent.update.apply(this);

	this.angle = (this._start + this._range * this._t) % 360;
	if (this.angle < 0)  {
		this.angle += 360;
	}
};
/**
 * Tweens a numeric value.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor.
 * 
 * @param complete
 *            Optional completion callback.
 * @param type
 *            Tween type.
 */
Flixel.plugin.tweens.misc.NumTween = function(complete, type)
{
	type = (type === undefined) ? 0 : type;
	Flixel.plugin.tweens.misc.AngleTween.parent.constructor.apply(this, [0, type, complete]);
	this.value = 0;
};

/**
 * The current value.
 */
Flixel.plugin.tweens.misc.NumTween.prototype.value = 0;

// Tween information.
Flixel.plugin.tweens.misc.NumTween.prototype._start = 0;
Flixel.plugin.tweens.misc.NumTween.prototype._range = 0;

/**
 * Tweens the value from one value to another.
 * @param       fromValue               Start value.
 * @param       toValue                 End value.
 * @param       duration                Duration of the tween.
 * @param       ease                    Optional easer function.
 */
Flixel.plugin.tweens.misc.NumTween.prototype.tween = function(fromValue, toValue, duration, ease)
{
	ease = (ease === undefined) ? null : ease;

	this._start = this.value = fromValue;
	this._range = toValue - this.value;
	this._target = duration;
	this._ease = ease;
	this.start();
};

/** @private Updates the Tween. */
Flixel.plugin.tweens.misc.NumTween.prototype.update = function()
{
	Flixel.plugin.tweens.misc.NumTween.parent.update.apply(this);
	this.value = this._start + this._range * this._t;
};
/**
 * Tweens a float public property of an FlxBasic.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor.
 * 
 * @param complete
 *            Optional completion callback.
 * @param type
 *            Tween type.
 */
Flixel.plugin.tweens.misc.VarTween = function(complete, type)
{
	type = (type === undefined) ? 0 : type;
	
	Flixel.plugin.tweens.misc.VarTween.parent.constructor.apply(this, [0, type, complete]);
};
extend(Flixel.plugin.tweens.misc.VarTween, Flixel.plugin.tweens.FlxTween);

// Tween information.
Flixel.plugin.tweens.misc.VarTween.prototype._object = null;
Flixel.plugin.tweens.misc.VarTween.prototype._property = null;
Flixel.plugin.tweens.misc.VarTween.prototype._start = 0;
Flixel.plugin.tweens.misc.VarTween.prototype._range = 0;

/**
 * Overridden destroy method.
 */
Flixel.plugin.tweens.misc.VarTween.prototype.destroy = function()
{
	Flixel.plugin.tweens.misc.VarTween.parent.destroy.apply(this);
	this._object = null;
};

/**
 * Tweens a numeric public property.
* 
 * @param	object		The object containing the property.
 * @param	property	The name of the property (eg. "x").
 * @param	to			Value to tween to.
 * @param	duration	Duration of the tween.
 * @param	ease		Optional easer function.
 */
Flixel.plugin.tweens.misc.VarTween.prototype.tween = function(object, property, to, duration, ease)
{
	this._object = object;
	this._ease = (ease === undefined) ? null : ease;
	this._property = property;
	var a = 0;
	
	// Check if the variable is a number
	try {
		a = this._object[this._property];
	} catch(e) {
		throw new Error(e);
	}
	
	this._start = a;
	this._range = to - this._start;
	this._target = duration;
	this.start();
};

/**
 * Updates the Tween.
 */
Flixel.plugin.tweens.misc.VarTween.prototype.update = function()
{
	Flixel.plugin.tweens.misc.VarTween.parent.update.apply(this);
	try {
		this._object[this._property] = this._start + this._range * this._t;
	} catch(e) {
		throw new Error(e);
	}
};
/**
 * Define all the exports
 */
// Define the export array
var FlixelExport = [];

// Flixel it self
FlixelExport.push(Flixel);
FlixelExport.push("Flixel");

// Useful methods
FlixelExport.push(int);
FlixelExport.push("int");
FlixelExport.push(uint);
FlixelExport.push("uint");
FlixelExport.push(extend);
FlixelExport.push("extend");
FlixelExport.push(startTimer);
FlixelExport.push("startTimer");
FlixelExport.push(getTimer);
FlixelExport.push("getTimer");
FlixelExport.push(sleep);
FlixelExport.push("sleep");

// Support classes
FlixelExport.push(BitmapData);
FlixelExport.push("BitmapData");
FlixelExport.push(CanvasManager);
FlixelExport.push("CanvasManager");
FlixelExport.push(ColorTransform);
FlixelExport.push("ColorTransform");
FlixelExport.push(Matrix);
FlixelExport.push("Matrix");
FlixelExport.push(ScaleManager);
FlixelExport.push("ScaleManager");

// Loader and cache
FlixelExport.push(Cache);
FlixelExport.push("Cache");
FlixelExport.push(Device);
FlixelExport.push("Device");
FlixelExport.push(Loader);
FlixelExport.push("Loader");
FlixelExport.push(Resource);
FlixelExport.push("Resource");

// Storage stuff
FlixelExport.push(LocalStorage);
FlixelExport.push("LocalStorage");
FlixelExport.push(StorageManager);
FlixelExport.push("StorageManager");

// Sound stuff
FlixelExport.push(SoundChannel);
FlixelExport.push("SoundChannel");
FlixelExport.push(SoundManager);
FlixelExport.push("SoundManager");
FlixelExport.push(SoundTransform);
FlixelExport.push("SoundTransform");  return FlixelExport;
}));