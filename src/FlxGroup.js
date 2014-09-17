/**
 * This is an organizational class that can update and render a bunch of <code>FlxBasic</code>s.
 * NOTE: Although <code>FlxGroup</code> extends <code>FlxBasic</code>, it will not automatically
 * add itself to the global collisions quad tree, it will only add its members.
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Constructor
 */
Flixel.FlxGroup = function(MaxSize)
{
	this.members = [];
	this.length = 0;
	this._maxSize = MaxSize || 0;
	this._marker = 0;
	this._sortIndex = null;
	Flixel.FlxGroup.parent.constructor.apply(this);
};
extend(Flixel.FlxGroup, Flixel.FlxBasic);

/**
 * Use with <code>sort()</code> to sort in ascending order.
 */
Flixel.FlxGroup.ASCENDING = -1;
/**
 * Use with <code>sort()</code> to sort in descending order.
 */
Flixel.FlxGroup.DESCENDING = 1;
/**
 * Array of all the <code>FlxBasic</code>s that exist in this group.
 */
Flixel.FlxGroup.prototype.members = null;
/**
 * The number of entries in the members array.
 * For performance and safety you should check this variable
 * instead of members.length unless you really know what you're doing!
 */
Flixel.FlxGroup.prototype.length = 0;
/**
 * Internal tracker for the maximum capacity of the group.
 * Default is 0, or no max capacity.
 */
Flixel.FlxGroup.prototype._maxSize = 0;
/**
 * Internal helper variable for recycling objects a la <code>FlxEmitter</code>.
 */
Flixel.FlxGroup.prototype._marker = 0;
/**
 * Helper for sort.
 */
Flixel.FlxGroup.prototype._sortIndex = null;
/**
 * Helper for sort.
 */
Flixel.FlxGroup.prototype._sortOrder = 0;
/**
 * Helper for sort.
 */
Flixel.FlxGroup.prototype._sortCheckIndexExistence = false;

/**
 * Override this function to handle any deleting or "shutdown" type operations you might need,
 * such as removing traditional Flash children like Sprite objects.
 */
Flixel.FlxGroup.prototype.destroy = function()
{
	if(this.members !== null)
	{
		var basic;
		var i = 0;
		while(i < this.length) {
			basic = this.members[i++];
			if(basic !== undefined && basic !== null) {
				basic.destroy();
			}
		}
		this.members.length = 0;
		this.members = null;
	}
	this.length = 0;
	this._sortIndex = null;

	Flixel.FlxGroup.parent.destroy.apply(this);
};

/**
 * Just making sure we don't increment the active objects count.
 */
Flixel.FlxGroup.prototype.preUpdate = function()
{
};



/**
 * Automatically goes through and calls update on everything you added.
 */
Flixel.FlxGroup.prototype.update = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists && basic.active)
		{
			basic.preUpdate();
			basic.update();
			if (basic.hasTween()) {
				basic.updateTweens();
			}
			basic.postUpdate();
		}
	}

	if (this.hasTween()) {
		this.updateTweens();
	}
};

/**
 * Destroy the dead objects.
 * 
 * @param splice Whether the object should be cut from the array entirely or not.
 */
Flixel.FlxGroup.prototype.destroyDead = function(splice)
{
	if (this.members !== null) {
		var basic;
		var i = 0;
		while (i < this.members.length) {
			basic = this.members[i++];
			if (basic !== undefined && !basic.alive) {
				this.remove(basic, splice);
				basic.destroy();
			}
		}
	}
};

/**
 * Remove all instances of <code>T</code> subclass (FlxSprite, FlxBlock, etc) from the list. The secureClear() destroy() and kill() the objects!
 */
Flixel.FlxGroup.prototype.secureClear = function()
{
	var basic;
	var i = 0;
	while (i < this.members.length) {
		basic = this.members[i++];
		if (basic !== undefined) {
			if (basic instanceof Flixel.FlxGroup) {
				basic.secureClear();
				basic.kill();
				basic.destroy();
			} else {
				basic.kill();
				basic.destroy();
			}
		}
	}
	this.length = 0;
	this.members.length = 0;
};

/**
 * Automatically goes through and calls render on everything you added.
 */
Flixel.FlxGroup.prototype.draw = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists && basic.visible)
			basic.draw();
	}
};

/**
 * The maximum capacity of this group.  Default is 0, meaning no max capacity, and the group can just grow.
 */
Flixel.FlxGroup.prototype.getMaxSize = function()
{
	return this._maxSize;
};

/**
 * @private
 */
Flixel.FlxGroup.prototype.setMaxSize = function(Size)
{
	this._maxSize = Size;
	if(this._marker >= this._maxSize)
		this._marker = 0;
	if((this._maxSize === 0) || (this.members === null) || (this._maxSize >= this.members.length))
		return;
	
	// If the max size has shrunk, we need to get rid of some objects
	var basic;
	var i = this._maxSize;
	var l = this.members.length;
	while(i < l)
	{
		basic = this.members[i++];
		if(basic !== undefined)
			basic.destroy();
	}
	this.length = this.members.length = this._maxSize;
};

/**
 * Adds a new <code>FlxBasic</code> subclass (FlxBasic, FlxSprite, Enemy, etc) to the group.
 * FlxGroup will try to replace a null member of the array first.
 * Failing that, FlxGroup will add it to the end of the member array,
 * assuming there is room for it, and doubling the size of the array if necessary.
 *
 * <p>WARNING: If the group has a maxSize that has already been met,
 * the object will NOT be added to the group!</p>
 *
 * @param	Object		The object you want to add to the group.
 *
 * @return	The same <code>FlxBasic</code> object that was passed in.
 */
Flixel.FlxGroup.prototype.add = function(Object)
{
	if (Object === undefined || Object === null) {
		Flixel.FlxG.log("WARNING: Cannot add a `null` or `undefined` object to a FlxGroup.");
		return null;
	}

	// Don't bother adding an object twice.
	if(this.members.indexOf(Object) >= 0)
		return Object;
	
	// First, look for a null entry where we can add the object.
	var i = 0;
	var l = this.members.length;
	while(i < l)
	{
		if(this.members[i] === undefined)
		{
			this.members[i] = Object;
			if(i >= this.length)
				this.length = i+1;
			return Object;
		}
		i++;
	}
	
	// Failing that, expand the array (if we can) and add the object.
	if(this._maxSize > 0)
	{
		if(this.members.length >= this._maxSize)
			return Object;
		else if(this.members.length * 2 <= this._maxSize)
			this.members.length *= 2;
		else
			this.members.length = this._maxSize;
	}
	else
		this.members.length *= 2;
	
	// If we made it this far, then we successfully grew the group,
	// and we can go ahead and add the object at the first open slot.
	this.members[i] = Object;
	this.length = i+1;
	return Object;
};

/**
 * Recycling is designed to help you reuse game objects without always re-allocating or "newing" them.
 * 
 * <p>If you specified a maximum size for this group (like in FlxEmitter),
 * then recycle will employ what we're calling "rotating" recycling.
 * Recycle() will first check to see if the group is at capacity yet.
 * If group is not yet at capacity, recycle() returns a new object.
 * If the group IS at capacity, then recycle() just returns the next object in line.</p>
 * 
 * <p>If you did NOT specify a maximum size for this group,
 * then recycle() will employ what we're calling "grow-style" recycling.
 * Recycle() will return either the first object with exists == false,
 * or, finding none, add a new object to the array,
 * doubling the size of the array if necessary.</p>
 * 
 * <p>WARNING: If this function needs to create a new object,
 * and no object class was provided, it will return null
 * instead of a valid object!</p>
 * 
 * @param	ObjectClass		The class type you want to recycle (e.g. FlxSprite, EvilRobot, etc). Do NOT "new" the class in the parameter!
 * 
 * @return	A reference to the object that was created.  Don't forget to cast it back to the Class you want (e.g. myObject = myGroup.recycle(myObjectClass) as myObjectClass;).
 */
Flixel.FlxGroup.prototype.recycle = function(ObjectClass)
{
	var basic;
	if(this._maxSize > 0)
	{
		if(this.length < this._maxSize)
		{
			if(ObjectClass === null)
				return null;
			return this.add(new ObjectClass());
		}
		else
		{
			basic = this.members[this._marker++];
			if(this._marker >= this._maxSize)
				this._marker = 0;
			return basic;
		}
	}
	else
	{
		basic = this.getFirstAvailable(ObjectClass);
		if(basic !== null)
			return basic;
		if(ObjectClass === null)
			return null;
		return this.add(new ObjectClass());
	}
};

/**
 * Removes an object from the group.
 * 
 * @param	Object	The <code>FlxBasic</code> you want to remove.
 * @param	Splice	Whether the object should be cut from the array entirely or not.
 * 
 * @return	The removed object.
 */
Flixel.FlxGroup.prototype.remove = function(Object, Splice)
{
	var index = this.members.indexOf(Object);
	Splice = Splice || false;

	if((index < 0) || (index >= this.members.length))
		return null;

	if(Splice) {
		this.members.splice(index, 1);
		this.length--;
	} else
		this.members[index] = undefined;
	return Object;
};

/**
 * Replaces an existing <code>FlxBasic</code> with a new one.
 * 
 * @param	OldObject	The object you want to replace.
 * @param	NewObject	The new object you want to use instead.
 * 
 * @return	The new object.
 */
Flixel.FlxGroup.prototype.replace = function(OldObject, NewObject)
{
	var index = this.members.indexOf(OldObject);
	if((index < 0) || (index >= this.members.length))
		return null;
	this.members[index] = NewObject;
	return NewObject;
};

/**
 * Call this function to sort the group according to a particular value and order.
 * For example, to sort game objects for Zelda-style overlaps you might call
 * <code>myGroup.sort("y",ASCENDING)</code> at the bottom of your
 * <code>FlxState.update()</code> override.  To sort all existing objects after
 * a big explosion or bomb attack, you might call <code>myGroup.sort("exists",DESCENDING)</code>.
 * If you are sure every object in the group has the sorting property you want to sort on, then you
 * might call <code>sort()</code> passing <code>false</code> as the third parameter which disables
 * the index existence check, boosting the sorting performance.
 * 
 * @param	Index	The <code>String</code> name of the member variable you want to sort on.  Default value is "y".
 * @param	Order	A <code>FlxGroup</code> constant that defines the sort order.  Possible values are <code>ASCENDING</code> and <code>DESCENDING</code>.  Default value is <code>ASCENDING</code>.
 * @param	CheckIndexExistence	Whether the method should check if group members have the sorting property you want to sort on. Members without the sorting property are always placed at the end of the group after the sort, in no particular order. Checking the index existence prevents the method from throwing an exception in case it encounters an object without the sorting property, but it causes a huge performance penalty. Default value is <code>true</code>. 
 */
Flixel.FlxGroup.prototype.sort = function(Index, Order, CheckIndexExistence)
{
	this._sortIndex = Index || "y";
	this._sortOrder = Order || Flixel.FlxGroup.ASCENDING;
	this._sortCheckIndexExistence = (CheckIndexExistence === undefined) ? true : CheckIndexExistence;
	this.members.sort(this.sortHandler);
};


/**
 * Go through and set the specified variable to the specified value on all members of the group.
 * 
 * @param	VariableName	The string representation of the variable name you want to modify, for example "visible" or "scrollFactor".
 * @param	Value			The value you want to assign to that variable.
 * @param	Recurse			Default value is true, meaning if <code>setAll()</code> encounters a member that is a group, it will call <code>setAll()</code> on that group rather than modifying its variable.
 */
Flixel.FlxGroup.prototype.setAll = function(VariableName, Value, Recurse)
{
	Recurse = (Recurse === undefined) ? true : Recurse;

	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(Recurse && (basic instanceof Flixel.FlxGroup))
				basic.setAll(VariableName, Value, Recurse);
			else
				basic[VariableName] = Value;
		}
	}
};

/**
 * Go through and call the specified function on all members of the group.
 * Currently only works on functions that have no required parameters.
 * 
 * @param	FunctionName	The string representation of the function you want to call on each object, for example "kill()" or "init()".
 * @param	Recurse			Default value is true, meaning if <code>callAll()</code> encounters a member that is a group, it will call <code>callAll()</code> on that group rather than calling the group's function.
 */ 
Flixel.FlxGroup.prototype.callAll = function(FunctionName, Recurse)
{
	Recurse = (Recurse === undefined) ? true : Recurse;

	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(Recurse && (basic instanceof Flixel.FlxGroup))
				basic.callAll(FunctionName, Recurse);
			else
				basic[FunctionName]();
		}
	}
};

/**
 * Call this function to retrieve the first object with exists == false in the group.
 * This is handy for recycling in general, e.g. respawning enemies.
 * 
 * @param	ObjectClass		An optional parameter that lets you narrow the results to instances of this particular class.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as not existing.
 */
Flixel.FlxGroup.prototype.getFirstAvailable = function(ObjectClass)
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== null) && !basic.exists && ((ObjectClass === null) || (basic instanceof ObjectClass)))
			return basic;
	}
	return null;
};

/**
 * Call this function to retrieve the first index set to 'null'.
 * Returns -1 if no index stores a null object.
 * 
 * @return	An <code>int</code> indicating the first null slot in the group.
 */
Flixel.FlxGroup.prototype.getFirstNull = function()
{
	var i = 0;
	var l = this.members.length;
	while(i < l)
	{
		if(this.members[i] === undefined)
			return i;
		else
			i++;
	}
	return -1;
};

/**
 * Call this function to retrieve the first object with exists == true in the group.
 * This is handy for checking if everything's wiped out, or choosing a squad leader, etc.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as existing.
 */
Flixel.FlxGroup.prototype.getFirstExtant = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists)
			return basic;
	}
	return null;
};

/**
 * Call this function to retrieve the first object with dead == false in the group.
 * This is handy for checking if everything's wiped out, or choosing a squad leader, etc.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as not dead.
 */
Flixel.FlxGroup.prototype.getFirstAlive = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists && basic.alive)
			return basic;
	}
	return null;
};

/**
 * Call this function to retrieve the first object with dead == true in the group.
 * This is handy for checking if everything's wiped out, or choosing a squad leader, etc.
 * 
 * @return	A <code>FlxBasic</code> currently flagged as dead.
 */
Flixel.FlxGroup.prototype.getFirstDead = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && !basic.alive)
			return basic;
	}
	return null;
};

/**
 * Call this function to find out how many members of the group are not dead.
 * 
 * @return	The number of <code>FlxBasic</code>s flagged as not dead.  Returns -1 if group is empty.
 */
Flixel.FlxGroup.prototype.countLiving = function()
{
	var count = -1;
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(count < 0)
				count = 0;
			if(basic.exists && basic.alive)
				count++;
		}
	}
	return count;
};

/**
 * Call this function to find out how many members of the group are dead.
 * 
 * @return	The number of <code>FlxBasic</code>s flagged as dead.  Returns -1 if group is empty.
 */
Flixel.FlxGroup.prototype.countDead = function()
{
	var count = -1;
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if(basic !== undefined)
		{
			if(count < 0)
				count = 0;
			if(!basic.alive)
				count++;
		}
	}
	return count;
};

/**
 * Returns a member at random from the group.
 * 
 * @param	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
 * @param	Length		Optional restriction on the number of values you want to randomly select from.
 * 
 * @return	A <code>FlxBasic</code> from the members list.
 */
Flixel.FlxGroup.prototype.getRandom = function(StartIndex, Length)
{
	if(Length === 0 || !Length)
		Length = this.length;
	return Flixel.FlxG.getRandom(this.members, StartIndex, Length);
};

/**
 * Remove all instances of <code>FlxBasic</code> subclass (FlxSprite, FlxBlock, etc) from the list.
 * WARNING: does not destroy() or kill() any of these objects!
 */
Flixel.FlxGroup.prototype.clear = function()
{
	this.length = this.members.length = 0;
};

/**
 * Calls kill on the group's members and then on the group itself.
 */
Flixel.FlxGroup.prototype.kill = function()
{
	var basic;
	var i = 0;
	while(i < this.length)
	{
		basic = this.members[i++];
		if((basic !== undefined) && basic.exists)
			basic.kill();
	}

	Flixel.FlxGroup.parent.kill.apply(this);
};

/**
 * Returns the members.length of the group.
 * 
 * @return The members.length of the group.
 */
Flixel.FlxGroup.prototype.size = function()
{
	return this.length;
};

/**
 * Helper function for the sort process.
 * 
 * @param	Obj1	The first object being sorted.
 * @param	Obj2	The second object being sorted.
 * 
 * @return	An integer value: -1 (Obj1 before Obj2), 0 (same), or 1 (Obj1 after Obj2).
 */
Flixel.FlxGroup.prototype.sortHandler = function(Obj1, Obj2)
{
	if (this._sortCheckIndexExistence === true)
	{
		// If the sorting property is missing, place the object at the end of the list.
		if(!Obj1 || !(this._sortIndex in Obj1))
			return 1;
		else if(!Obj2 || !(this._sortIndex in Obj2))
			return -1;
	}
	if(Obj1[this._sortIndex] < Obj2[this._sortIndex])
		return this._sortOrder;
	else if(Obj1[this._sortIndex] > Obj2[this._sortIndex])
		return -this._sortOrder;
	return 0;
};

/**
 * Returns the class name.
 */
Flixel.FlxGroup.prototype.toString = function()
{
	return "FlxGroup";
};