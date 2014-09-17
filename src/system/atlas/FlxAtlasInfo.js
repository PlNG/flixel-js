/**
 * A class that holds all the atlas info.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.system.atlas.FlxAtlasInfo = function()
{
	this._regionMap = {};
	this._regionBitmap = {};
	this._items = 0;
	this.bitmapData = null;
};

/**
 * A dictionary with all the regions we loaded.<br>
 * In format K, V -> String, FlxRegionInfo.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype._regionMap = null;
/**
 * A dictionary with all the regions we loaded. In format K, V -> String, BitmapData.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype._regionBitmap = null;
/**
 * The number of loaded regions.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype._items = 0;
/**
 * The atlas bitmapdata.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.bitmapData = null;

/**
 * Load a new atlas where the image file is NOT embed in the swf file.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.loadAtlas = function(fileText, graphicImage)
{
	var txt = fileText;

	// Read the file
	var splitedTxt = txt.split("\n");
	// Do not read the next 3 lines they are stupid stuff for HTML 5

	// Load the image
	this._loaded = true;
	var bitmap = BitmapData.fromImage(graphicImage);
	if (bitmap === undefined || bitmap === null) {
		// THIS SHOUDN'T EVER HAPPEN
		Flixel.FlxG.log("Error: While loading an atlas image.", "FlxSystemAsset");
		return;
	}
	this.bitmapData = bitmap;

	// Parse the text file
	this.parsePackFile(splitedTxt);
};

/**
 * Parse the pack file and obtain all the regions.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.parsePackFile = function(splitedTxt)
{
	var elem = null;
	var info = null;

	// Read each file element
	var exit = false;
	var line = 4;

	while (!exit) {
		elem = splitedTxt[line];
		// unused: var rotate = splitedTxt[line + 1];
		var xy = splitedTxt[line + 2];
		var size = splitedTxt[line + 3];
		// unused: var orig = splitedTxt[line + 4];
		// unused: var offset = splitedTxt[line + 5];
		// unused: var index = splitedTxt[line + 6];

		// Extract the info from the strings
		// Extract the point
		xy = xy.replace(" xy: ", "").replace(" ", "");
		var x = Number(xy.split(",")[0]);
		var y = Number(xy.split(",")[1]);
		var position = new Flixel.FlxPoint(x, y);

		// Extrat the size
		size = size.replace(" size: ", "").replace(" ", "");
		var w = Number(size.split(",")[0]);
		var h = Number(size.split(",")[1]);
		var coordsSize = new Flixel.FlxPoint(w, h);

		info = new Flixel.system.atlas.FlxRegionInfo(elem, position, coordsSize);
		this._regionMap[elem] = info;
		this._items++;
		
		if(Flixel.FlxG.debug)
			console.log("New region added " + elem);

		// Increase the line counter
		line += 7;
		if (splitedTxt.length < line + 6)
			exit = true;
	}
};

/**
 * Return the number of loaded regions.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.getNumRegions = function()
{
	return this._items;
};

/**
 * Return the BitmapData according to one region.
 * 
 * @param region
 *            The region id.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.getRegion = function(region)
{
	// If an error happend while loading
	if (this._error || this.bitmapData === null)
		return null;

	if (this.checkRegionCache(region))
		return this._regionBitmap[region];
	else {
		var regionInfo = this._regionMap[region];
		if(regionInfo !== null) {
			var pixels = new BitmapData(regionInfo.size.x, regionInfo.size.y, true, 0x00000000);
			pixels.copyPixels(this.bitmapData, new Flixel.FlxRect(regionInfo.position.x, regionInfo.position.y, regionInfo.size.x, regionInfo.size.y), new Flixel.FlxPoint(), null, null, false, true);
			this._regionBitmap[region] = pixels;
			return pixels;
		} else
			throw new Error("Error loading region: " + region);
	}
};

/**
 * Check the local bitmap cache to see if a region with this key has been loaded already.
 * 
 * @param Key
 *            The string key identifying the region.
 * 
 * @return Whether or not this region can be found in the cache.
 */
Flixel.system.atlas.FlxAtlasInfo.prototype.checkRegionCache = function(key)
{
	return (this._regionBitmap[key] !== undefined) && (this._regionBitmap[key] !== null);
};