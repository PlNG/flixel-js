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