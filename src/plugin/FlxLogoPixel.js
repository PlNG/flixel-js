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