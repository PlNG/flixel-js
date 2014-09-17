Flixel.plugin.tmx.MapTileSet = function(source, parent)
{
	this.firstGID = source.firstgid;

	this.imageSource = source.image.source;

	this.map = parent;
	this.name = source.name;
	this.tileWidth = source.tilewidth;
	this.tileHeight = source.tileheight;
	this.spacing = source.spacing;
	this.margin = source.margin;

	// read properties if needed
	if(source.tileproperties) {
		for (var tileId in source.tileproperties) {
			this._tileProps[Number.toInteger(tileId)] = new Flixel.plugin.tmx.MapProperties(source.tileproperties[tileId]);
		}
	}
};

Flixel.plugin.tmx.MapTileSet.prototype._tileProps = [];
Flixel.plugin.tmx.MapTileSet.prototype._image = null;

Flixel.plugin.tmx.MapTileSet.prototype.firstGID = 0;
Flixel.plugin.tmx.MapTileSet.prototype.map = null;
Flixel.plugin.tmx.MapTileSet.prototype.name = null;
Flixel.plugin.tmx.MapTileSet.prototype.tileWidth = 0;
Flixel.plugin.tmx.MapTileSet.prototype.tileHeight = 0;
Flixel.plugin.tmx.MapTileSet.prototype.spacing = 0;
Flixel.plugin.tmx.MapTileSet.prototype.margin = 0;
Flixel.plugin.tmx.MapTileSet.prototype.imageSource = null;

// available only after immage has been assigned:
Flixel.plugin.tmx.MapTileSet.prototype.numTiles = 0xFFFFFF;
Flixel.plugin.tmx.MapTileSet.prototype.numRows = 1;
Flixel.plugin.tmx.MapTileSet.prototype.numCols = 1;

Flixel.plugin.tmx.MapTileSet.prototype.getImage = function()
{
	return this._image;
};

Flixel.plugin.tmx.MapTileSet.prototype.setImage = function(v)
{
	this._image = v;
	// TODO: consider spacing & margin
	this.numCols = Math.floor(v.width / this.tileWidth);
	this.numRows = Math.floor(v.height / this.tileHeight);
	this.numTiles = this.numRows * this.numCols;
};

Flixel.plugin.tmx.MapTileSet.prototype.hasGid = function(gid)
{
	return (gid >= this.firstGID) && (gid < this.firstGID + this.numTiles);
};

Flixel.plugin.tmx.MapTileSet.prototype.fromGid = function(gid)
{
	return gid - this.firstGID;
};

Flixel.plugin.tmx.MapTileSet.prototype.toGid = function(id)
{
	return this.firstGID + id;
};

Flixel.plugin.tmx.MapTileSet.prototype.getPropertiesByGid = function(gid)
{
	return this._tileProps[gid - this.firstGID];
};

Flixel.plugin.tmx.MapTileSet.prototype.getProperties = function(id)
{
	return this._tileProps[id];
};

Flixel.plugin.tmx.MapTileSet.prototype.getRect = function(id)
{
	// TODO: consider spacing & margin
	return new Flixel.FlxRect((id % this.numCols) * this.tileWidth, (id / this.numCols) * this.tileHeight);
};