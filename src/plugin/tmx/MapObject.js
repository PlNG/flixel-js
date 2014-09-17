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
