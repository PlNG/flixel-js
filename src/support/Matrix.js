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