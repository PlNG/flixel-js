/**
 * Hold all the properties of the TMX file.<br> 
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
 *            The XML to create the properties with.
 */
Flixel.plugin.tmx.MapProperties = function(source)
{
	if (source !== null)
		this.readProperties(source);
};

/**
 * Expand the current properties of this class.
 * 
 * @param source
 *            The XML to expand the properties with.
 */
Flixel.plugin.tmx.MapProperties.prototype.readProperties = function(source)
{
	// Loop throw all properties
	for (var name in source) {
		var key = name;
		var value = source[name];
		this[key] = value;
	}
	return this;
};

/**
 * Returns a property if exists.
 */
Flixel.plugin.tmx.MapProperties.prototype.get = function(key)
{
	return this[key];
};