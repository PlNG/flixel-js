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