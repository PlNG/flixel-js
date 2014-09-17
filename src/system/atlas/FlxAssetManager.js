/**
 * An asset manager that loads the whole images and texts referencig to them.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 */
Flixel.system.atlas.FlxAssetManager = function()
{
	if (Flixel.system.atlas.FlxAssetManager._instance !== undefined)
		throw new Error("FlxAssetManager: Call getInstance()");

	this._atlasMap = {};
	this._keyMap = {};
	this._items = 0;
};

/**
 * The static instance.
 */
Flixel.system.atlas.FlxAssetManager._instance = new Flixel.system.atlas.FlxAssetManager();
/**
 * A dictionary with all the atlases we loaded.
 */
Flixel.system.atlas.FlxAssetManager.prototype._atlasMap = null;
/**
 * A dictionary with all the atlases keys we loaded.
 */
Flixel.system.atlas.FlxAssetManager.prototype._keyMap = null;
/**
 * The number of loaded atlases.
 */
Flixel.system.atlas.FlxAssetManager.prototype._items = 0;

/**
 * Load a new atlas.
 * 
 * @param pathFile
 *            The text file.
 * @param id
 *            The file id (normally the file route -> path/path1/pack.txt).
 */
Flixel.system.atlas.FlxAssetManager.prototype.loadAtlas = function(fileText, graphicImage, atlasId)
{
	var atlasInfo = new Flixel.system.atlas.FlxAtlasInfo();
	atlasInfo.loadAtlas(fileText, graphicImage);
	this._atlasMap[atlasId] = atlasInfo;
	this._keyMap[this._items] = atlasId;
	this._items++;
	console.log("New atlas loaded: " + atlasId);
};

/**
 * Return a bitmap from an atlas.
 * 
 * @param id
 *            The region id, normally (path/file.txt:region).
 */
Flixel.system.atlas.FlxAssetManager.prototype.getRegion = function(id)
{
	var path = id.split(":")[0];
	var region = id.split(":")[1];

	if (this._atlasMap[path] !== null && this._atlasMap[path] !== undefined) {
		var atlasInfo = this._atlasMap[path];

		// Check if the atlas info is null
		if (atlasInfo === null || atlasInfo === undefined) {
			Flixel.FlxG.log("The atlasInfo (" + id + ") couldn't be found", "FlxAssetManager");
			return null;
		}

		var bitmapData = atlasInfo.getRegion(region);

		// Check if the bitmapdata is null
		if (bitmapData === null || bitmapData === undefined) {
			Flixel.FlxG.log("The bitmapData (" + id + ") couldn't be found", "FlxAssetManager");
			return null;
		}

		// We copy the original bitmap data because it will be disposed in FlxG.addBitmap
		var newBitmapData = new BitmapData(bitmapData.width, bitmapData.height, true, 0x00000000);
		newBitmapData.draw(bitmapData);

		return newBitmapData;
	} else {
		Flixel.FlxG.log("The path (" + path + ") couldn't be found", "FlxAssetManager");
		return null;
	}
};

/**
 * Return the number of loaded atlas.
 */
Flixel.system.atlas.FlxAssetManager.prototype.getNumAtlas = function()
{
	return this._items;
};

/**
 * Return true if all the atlas images has been loaded.
 */
Flixel.system.atlas.FlxAssetManager.prototype.allLoaded = function()
{
	var allLoaded = true;
	for (var i = 0; i < this._items; i++) {
		allLoaded = allLoaded && this._atlasMap[this._keyMap[i]].loaded();
	}

	return allLoaded;
};

/**
 * Return a Tiled map instance.
 */
Flixel.system.atlas.FlxAssetManager.prototype.getEmbedMap = function(mapJson)
{
	var tiledMap = new Flixel.plugin.tmx.TiledMap(JSON.parse(mapJson));
	return tiledMap;
};

/**
 * Return the isntance of this object.
 */
Flixel.system.atlas.FlxAssetManager.getInstance = function()
{
	return Flixel.system.atlas.FlxAssetManager._instance;
};