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