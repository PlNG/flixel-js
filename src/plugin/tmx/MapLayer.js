/*******************************************************************************
 * Copyright (c) 2010 by Thomas Jahn
 * This content is released under the MIT License. (Just like Flixel)
 * For questions mail me at lithander@gmx.de!
 ******************************************************************************/

/**
 * The representation of a map layer.<br>
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
 *            The XML representation of this layer.
 * @param parent
 *            The parent map.
 */
Flixel.plugin.tmx.MapLayer = function(source, parent)
{
	// Store the paren map
	this.map = parent;

	// Store the layer own stuff
	this.name = source.name;
	this.x = source.x;
	this.y = source.y;
	this.width = source.width;
	this.height = source.height;
	this.visible = !source.visible || (source.visible !== 0);
	this.opacity = source.opacity;

	// Load the layer properties
	if(source.properties) {
		this.properties = new Flixel.plugin.tmx.MapProperties(source.properties);
	}

	// Load tile GIDs
	this.tileGIDs = [];
	if (source.data) {
		// Create a 2dimensional array
		var lineWidth = this.width;
		var rowIdx = -1;
		for (var i = 0; i < source.data.length; i++) {
			var node = source.data[i];
			// New line?
			if (++lineWidth >= this.width) {
				this.tileGIDs[++rowIdx] = [];
				lineWidth = 0;
			}
			this.tileGIDs[rowIdx].push(node);
		}
	}
};

/**
 * The map where this layer is placed.
 */
Flixel.plugin.tmx.MapLayer.prototype.map = null;
/**
 * The layer name.
 */
Flixel.plugin.tmx.MapLayer.prototype.name = null;
/**
 * The X coordinate of this layer.
 */
Flixel.plugin.tmx.MapLayer.prototype.x = 0;
/**
 * The Y coordinate of this layer.
 */
Flixel.plugin.tmx.MapLayer.prototype.y = 0;
/**
 * The layer width.
 */
Flixel.plugin.tmx.MapLayer.prototype.width = 0;
/**
 * The layer height.
 */
Flixel.plugin.tmx.MapLayer.prototype.height = 0;
/**
 * The layer opacity (alpha value).
 */
Flixel.plugin.tmx.MapLayer.prototype.opacity = 0;
/**
 * If the layer is visible or not.
 */
Flixel.plugin.tmx.MapLayer.prototype.visible = false;
/**
 * The tile gid.
 */
Flixel.plugin.tmx.MapLayer.prototype.tileGIDs = null;
/**
 * The layer properties.
 */
Flixel.plugin.tmx.MapLayer.prototype.properties = null;

/**
 * Convert this layer to a string usable for FlxTilemap.
 * 
 * @param tileSet
 *            The map tileset.
 */
Flixel.plugin.tmx.MapLayer.prototype.toCsv = function(tileSet)
{
	var max = 0xFFFFFF;
	var offset = 0;
	if (tileSet) {
		offset = tileSet.firstGID;
		max = tileSet.numTiles - 1;
	}
	var result = "";
	for ( var row in this.tileGIDs) {
		var chunk = "";
		var id = 0;
		for (id in row) {
			id -= offset;
			if (id < 0 || id > max)
				id = 0;
			result += chunk;
			chunk = id + ",";
		}
		result += id + "\n";
	}
	return result;
};

/**
 * Convert a string into array.
 * 
 * @param input
 *            The string to convert.
 * @param lineWidth
 *            The line width.
 */
Flixel.plugin.tmx.MapLayer.prototype.csvToArray = function(input, lineWidth)
{
	var result = [];
	var rows = input.split("\n");
	for ( var row in rows) {
		var resultRow = [];
		var entries = row.split(",", lineWidth);
		for ( var entry in entries)
			resultRow.push(uint(entry)); // Convert to uint
		result.push(resultRow);
	}
	return result;
};