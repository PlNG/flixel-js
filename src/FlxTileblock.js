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