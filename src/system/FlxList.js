/**
 * A miniature linked list class.<br>
 * Useful for optimizing time-critical or highly repetitive tasks!<br>
 * See <code>FlxQuadTree</code> for how to use it, IF YOU DARE.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 * @author	Ka Wing Chin
 */

/**
 * Creates a new link, and sets <code>object</code> and <code>next</code> to
 * <code>null</code>.
 */
Flixel.system.FlxList = function()
{
	this.object = null;
	this.next = null;
	this.ID = int(Math.random() * 100);
};

/**
 * Stores a reference to a <code>FlxObject</code>.
 */
Flixel.system.FlxList.prototype.object = null;
/**
 * Stores a reference to the next link in the list.
 */
Flixel.system.FlxList.prototype.next = null;
/**
 * An ID for each list.
 */
Flixel.system.FlxList.prototype.ID = null;

/**
 * Clean up memory.
 */
Flixel.system.FlxList.prototype.destroy = function()
{
	this.object = null;
	if (this.next !== null)
		this.next.destroy();
	this.next = null;

	Flixel.system.FlxList._pool.dispose(this);
};

/**
 * Internal, a pool of <code>FlxList</code>s to prevent constant
 * <code>new</code> calls.
 */
Flixel.system.FlxList._pool = new Flixel.system.FlxListPool();

/**
 * Gets a new <code>FlxList</code> from the pool.
 * 
 * @return
 */
Flixel.system.FlxList.getNew = function()
{
	return Flixel.system.FlxList._pool.getNew();
};