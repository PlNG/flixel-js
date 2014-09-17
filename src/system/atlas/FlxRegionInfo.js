/**
 * A class that holds all the region info.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Class constructor.
 * 
 * @param elem
 *            The elem name.
 * @param size
 *            The image size.
 * @param coordinates
 *            The image top-left coordinates.
 */
Flixel.system.atlas.FlxRegionInfo = function(elem, position, size)
{
	this.elemName = elem;
	this.position = position;
	this.size = size;
};

/**
 * The file name.
 */
Flixel.system.atlas.FlxRegionInfo.prototype.elemName = null;
/**
 * The image size.
 */
Flixel.system.atlas.FlxRegionInfo.prototype.size = null;
/**
 * The image coordinates.
 */
Flixel.system.atlas.FlxRegionInfo.prototype.position = null;