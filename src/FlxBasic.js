/**
 * This is a useful "generic" Flixel object.<br>
 * Both <code>FlxObject</code> and <code>FlxGroup</code> extend this class,<br>
 * as do the plugins.  Has no size, position or graphical data.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @class Flixel.FlxBasic
 */

/**
 * Instantiate the basic Flixel object.
 * @constructor
 */
Flixel.FlxBasic = function()
{
	this.ID = -1;
	this.exists = true;
	this.active = true;
	this.visible = true;
	this.alive = true;
	this.ignoreDrawDebug = false;

	this.autoClear = true;
};

/**
 * Number of active FlxBasics in the game.
 */
Flixel.FlxBasic.ACTIVECOUNT = 0;
/**
 * Number of visible FlxBasics in the game.
 */
Flixel.FlxBasic.VISIBLECOUNT = 0;
/**
 * IDs seem like they could be pretty useful, huh? They're not actually used for
 * anything yet though.
 */
Flixel.FlxBasic.prototype.ID = 0;
/**
 * Controls whether <code>update()</code> and <code>draw()</code> are
 * automatically called by FlxState/FlxGroup.
 */
Flixel.FlxBasic.prototype.exists = false;
/**
 * Controls whether <code>update()</code> is automatically called by
 * FlxState/FlxGroup.
 */
Flixel.FlxBasic.prototype.active = false;
/**
 * Controls whether <code>draw()</code> is automatically called by
 * FlxState/FlxGroup.
 */
Flixel.FlxBasic.prototype.visible = false;
/**
 * Useful state for many game objects - "dead" (!alive) vs alive.
 * <code>kill()</code> and <code>revive()</code> both flip this switch
 * (along with exists, but you can override that).
 */
Flixel.FlxBasic.prototype.alive = false;
/**
 * An array of camera objects that this object will use during
 * <code>draw()</code>. This value will initialize itself during the first
 * draw to automatically point at the main camera list out in <code>FlxG</code>
 * unless you already set it. You can also change it afterward too, very
 * flexible!
 */
Flixel.FlxBasic.prototype.cameras = null;
/**
 * Setting this to true will prevent the object from appearing when the visual
 * debug mode in the debugger overlay is toggled on.
 */
Flixel.FlxBasic.prototype.ignoreDrawDebug = false;
/**
 * If the Tweener should clear on removal. For Entities, this is when they are
 * removed from a World, and for World this is when the active World is
 * switched.
 */
Flixel.FlxBasic.prototype.autoClear = false;
/**
 * The FlxTween reference.
 */
Flixel.FlxBasic.prototype._tween = null;
/**
 * Handy field used to store what ever you need.
 */
Flixel.FlxBasic.prototype._userData = null;


/**
 * Override this function to null out variables or manually call
 * <code>destroy()</code> on class members if necessary. Don't forget to
 * call <code>super.destroy()</code>!
 * @method Flixel.FlxBasic#destroy
 */
Flixel.FlxBasic.prototype.destroy = function()
{
	// Nothing to destroy initially.
	if (this.autoClear && this.hasTween()) {
		this.clearTweens(true);
		this._tween = null;
	}
};

/**
 * Pre-update is called right before <code>update()</code> on each object
 * in the game loop.
 * @method Flixel.FlxBasic#preUpdate
 */
Flixel.FlxBasic.prototype.preUpdate = function()
{
	Flixel.FlxBasic.ACTIVECOUNT++;
};

/**
 * Override this function to update your class's position and appearance.
 * This is where most of your game rules and behavioral code will go.
 * @method Flixel.FlxBasic#update
 */
Flixel.FlxBasic.prototype.update = function()
{
	// Nothing to update initially.
};

/**
 * Post-update is called right after <code>update()</code> on each object
 * in the game loop.
 * @method Flixel.FlxBasic#postUpdate
 */
Flixel.FlxBasic.prototype.postUpdate = function()
{
	// Nothing to post update initially.
};

/**
 * Override this function to control how the object is drawn. Overriding
 * <code>draw()</code> is rarely necessary, but can be very useful.
 * @method Flixel.FlxBasic#draw
 */
Flixel.FlxBasic.prototype.draw = function()
{
	var camera = Flixel.FlxG.activeCamera;
	
	if (this.cameras === null)
		this.cameras = Flixel.FlxG.cameras;
	if (this.cameras.indexOf(camera)  == -1)
		return;

	Flixel.FlxBasic.VISIBLECOUNT++;
	if(Flixel.FlxG.visualDebug && !this.ignoreDrawDebug)
		this.drawDebug(camera);
};

/**
 * Override this function to draw custom "debug mode" graphics to the
 * specified camera while the debugger's visual mode is toggled on.
 * 
 * @param Camera
 *            Which camera to draw the debug visuals to.
 */
Flixel.FlxBasic.prototype.drawDebug = function(Camera)
{
	// Nothing to draw in debug mode initially.
};

/**
 * Handy function for "killing" game objects. Default behavior is to flag
 * them as nonexistent AND dead. However, if you want the "corpse" to remain
 * in the game, like to animate an effect or whatever, you should override
 * this, setting only alive to false, and leaving exists true.
 */
Flixel.FlxBasic.prototype.kill = function()
{
	this.alive = false;
	this.exists = false;
};

/**
 * Handy function for bringing game objects "back to life". Just sets alive
 * and exists back to true. In practice, this function is most often called
 * by <code>FlxObject.reset()</code>.
 */
Flixel.FlxBasic.prototype.revive = function()
{
	this.alive = true;
	this.exists = true;
};

/**
 * Convert object to readable string name. Useful for debugging, save games, etc.
 */
Flixel.FlxBasic.prototype.toString = function()
{
	return "FlxBasic";
};

/**
 * Add a new FlxTween instance to this object.
 * 
 * @param t
 *            The FlxTween instance.
 * @param start
 *            True if it should start.
 * @return The t instance.
 */
Flixel.FlxBasic.prototype.addTween = function(t, start)
{
	var ft = t;
	if (ft.parent !== null) {
		Flixel.FlxG.log("Cannot add a FlxTween object more than once.");
		return t;
	}
	ft.parent = this;
	ft.next = this._tween;
	var friendTween = this._tween;
	if (this._tween !== null) 
		friendTween.prev = t;
	
	this._tween = t;
	if (start) 
		this._tween.start();
	
	return t;
};

/**
 * Remove a new FlxTween instance to this object.
 * 
 * @param t
 *            The FlxTween instance.
 * @param destroy
 *            True if it should be destroyed.
 * @return The t instance.
 */
Flixel.FlxBasic.prototype.removeTween = function(t, destroy)
{
	var ft = t;
	if (ft.parent != this) 
	{
		Flixel.FlxG.log("Core object does not contain FlxTween.");
		return t;
	}
	if (ft.next !== null) 
		ft.next.prev = ft.prev;
	if (ft.prev !== null)
		ft.prev.next = ft.next;
	else
		this._tween = (ft.next === null) ? null : ft.next;
	
	ft.next = ft.prev = null;
	ft.parent = null;
	if (destroy) t.destroy();
	t.active = false;
	return t;
};

/**
 * Clear all the game tweens.
 * 
 * @param destroy
 *            True if they should be destroyed.
 */
Flixel.FlxBasic.prototype.clearTweens = function(destroy)
{
	destroy = (destroy === undefined) ? false : destroy;

	var ft = this._tween;
	var fn;
	while (ft !== null) {
		fn = ft.next;
		this.removeTween(ft, destroy);
		ft = fn;
	}
};

/**
 * Update the FlxBasic tweens.
 */
Flixel.FlxBasic.prototype.updateTweens = function()
{
	var t;
	var ft = this._tween;
	while (ft !== null)
	{
		t = ft;
		if (t.active) {
			t.update();
			if (ft.finish) {
				ft.finishTween();
			}
		}
		ft = ft.next;
	}
};

/**
 * Return true if the FlxBasic has a tween.
 * 
 * @return True if the FlxBasic has a tween.
 */
Flixel.FlxBasic.prototype.hasTween = function() 
{
	return (this._tween !== null); 
};

/**
 * Returns the user data.
 */
Flixel.FlxBasic.prototype.getUserData = function()
{
	return this._userData;
};

/**
 * Sets the user data.
 * 
 * @param pUserData
 */
Flixel.FlxBasic.prototype.setUserData = function(userData)
{
	this._userData = userData;
};

/**
 * Sets the user data.
 * 
 * @param pUserData
 */
Flixel.FlxBasic.prototype.setUserData = function(userData)
{
	this._userData = userData;
};