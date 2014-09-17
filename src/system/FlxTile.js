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