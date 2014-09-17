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