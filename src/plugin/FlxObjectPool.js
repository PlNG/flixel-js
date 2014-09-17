/**
 * A very basic object pool. Used by <code>FlxQuadTree</code> and<br>
 * <code>FlxList</code> to avoid costly instantiations every frame.<br>
 * <br>
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @author	Thomas Weston
 */
Flixel.plugin.FlxObjectPool = function(StartSize)
{
	StartSize = (StartSize === undefined) ? 0 : StartSize;

	this._internalPool = [];

	for (var i = 0; i < StartSize; i++) {
		this._internalPool.push(this.create());
	}
};

/**
 * Internal, stores the pooled objects.
 */
Flixel.plugin.FlxObjectPool.prototype._internalPool = null;

/**
 * Put an object back in the pool.
 * 
 * @param Object
 *            The object to pool.
 */
Flixel.plugin.FlxObjectPool.prototype.dispose = function(Object)
{
	if(this._internalPool.indexOf(Object) == -1)
		this._internalPool.push(Object);
};

/**
 * Gets an object from the pool. If the pool is empty, returns a new object.
 * 
 * @return A new object.
 */
Flixel.plugin.FlxObjectPool.prototype.getNew = function()
{
	var object = null;
	if (this._internalPool.length > 0)
		object = this._internalPool.pop();
	else
		object = this.create();
	return object;
};

/**
 * Instantiates a new object.
 * 
 * @return A new object.
 */
Flixel.plugin.FlxObjectPool.prototype.create = function()
{
};