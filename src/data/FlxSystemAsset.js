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