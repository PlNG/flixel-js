/**
 * A fairly generic quad tree structure for rapid overlap checks.<br>
 * FlxQuadTree is also configured for single or dual list operation.<br>
 * You can add items either to its A list or its B list.<br>
 * When you do an overlap check, you can compare the A list to itself,<br>
 * or the A list against the B list.  Handy for different things!<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Private constructor.
 */
Flixel.system.FlxQuadTree = function()
{
	Flixel.system.FlxQuadTree.parent.constructor.apply(this);
};
extend(Flixel.system.FlxQuadTree, Flixel.FlxRect);

/**
 * Flag for specifying that you want to add an object to the A list.
 */
Flixel.system.FlxQuadTree.A_LIST = 0;
/**
 * Flag for specifying that you want to add an object to the B list.
 */
Flixel.system.FlxQuadTree.B_LIST = 1;

/**
 * Controls the granularity of the quad tree. Default is 6 (decent performance on large and small worlds).
 */
Flixel.system.FlxQuadTree.divisions = 0;

/**
 * Whether this branch of the tree can be subdivided or not.
 */
Flixel.system.FlxQuadTree.prototype._canSubdivide = false;

/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._headA = null;
/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._tailA = null;
/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._headB = null;
/**
 * Refers to the internal A and B linked lists, which are used to store objects in the leaves.
 */
Flixel.system.FlxQuadTree.prototype._tailB = null;

/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree._min = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._northWestTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._northEastTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._southEastTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._southWestTree = null;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._leftEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._rightEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._topEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._bottomEdge = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._halfWidth = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._halfHeight = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._midpointX = 0;
/**
 * Internal, governs and assists with the formation of the tree.
 */
Flixel.system.FlxQuadTree.prototype._midpointY = 0;

/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._object = null;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectLeftEdge = 0;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectTopEdge = 0;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectRightEdge = 0;
/**
 * Internal, used to reduce recursive method parameters during object placement and tree formation.
 */
Flixel.system.FlxQuadTree._objectBottomEdge = 0;

/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._list = 0;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._useBothLists = false;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._processingCallback = null;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._notifyCallback = null;
/**
 * Internal, used during tree processing and overlap checks.
 */
Flixel.system.FlxQuadTree._iterator = null;

/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullX = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullY = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullWidth = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._objectHullHeight = 0;

/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullX = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullY = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullWidth = 0;
/**
 * Internal, helpers for comparing actual object-to-object overlap - see <code>overlapNode()</code>.
 */
Flixel.system.FlxQuadTree._checkObjectHullHeight = 0;

/**
 * How deep this quadtree is.
 */
Flixel.system.FlxQuadTree.prototype.deep = 0;

/**
 * Internal, a pool of <code>FlxQuadTree</code>s to prevent constant <code>new</code> calls.
 */
Flixel.system.FlxQuadTree._pool = new Flixel.system.FlxQuadTreePool();

/**
 * Get a new Quad Tree node from the pool.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 * @param WidthDesired
 *            width of this node.
 * @param HeightDesired
 *            height of this node.
 * @param ParentThe
 *            parent branch or node. Pass null to create a root.
 * 
 * @return A new <code>FlxQuadTree</code>.
 */
Flixel.system.FlxQuadTree.getNew = function(X, Y, Width, Height, Parent)
{
	var quadTree = Flixel.system.FlxQuadTree._pool.getNew();
	quadTree.init(X, Y, Width, Height, Parent);
	return quadTree;
};

/**
 * Instantiate a new Quad Tree node.
 * 
 * @param X
 *            The X-coordinate of the point in space.
 * @param Y
 *            The Y-coordinate of the point in space.
 * @param WidthDesired
 *            width of this node.
 * @param HeightDesired
 *            height of this node.
 * @param ParentThe
 *            parent branch or node. Pass null to create a root.
 */
Flixel.system.FlxQuadTree.prototype.init = function(X, Y, Width, Height, Parent)
{
	this.make(X, Y, Width, Height);
	this._headA = this._tailA = Flixel.system.FlxList.getNew();
	this._headB = this._tailB = Flixel.system.FlxList.getNew();
	this.deep = (Parent !== null) ? Parent.deep + 1 : 0;

	// Copy the parent's children (if there are any)
	if (Parent !== null) {
		var iterator;
		var ot;

		if (Parent._headA.object !== null)
		{
			iterator = Parent._headA;

			while (iterator !== null)
			{
				if (this._tailA.object !== null)
				{
					ot = this._tailA;
					this._tailA = Flixel.system.FlxList.getNew();
					ot.next = this._tailA;
				}
				this._tailA.object = iterator.object;
				iterator = iterator.next;
			}
		}
		if (Parent._headB.object !== null)
		{
			iterator = Parent._headB;
			while (iterator !== null)
			{
				if (this._tailB.object !== null)
				{
					ot = this._tailB;
					this._tailB = Flixel.system.FlxList.getNew();
					ot.next = this._tailB;
				}
				this._tailB.object = iterator.object;
				iterator = iterator.next;
			}
		}
	} else
		Flixel.system.FlxQuadTree._min = (this.width + this.height) / (2 * Flixel.system.FlxQuadTree.divisions);
	this._canSubdivide = (this.width > Flixel.system.FlxQuadTree._min) || (this.height > Flixel.system.FlxQuadTree._min);

	// Set up comparison/sort helpers
	this._northWestTree = null;
	this._northEastTree = null;
	this._southEastTree = null;
	this._southWestTree = null;
	this._leftEdge = this.x;
	this._rightEdge = this.x + this.width;
	this._halfWidth = this.width / 2;
	this._midpointX = this._leftEdge + this._halfWidth;
	this._topEdge = this.y;
	this._bottomEdge = this.y + this.height;
	this._halfHeight = this.height / 2;
	this._midpointY = this._topEdge + this._halfHeight;
};

/**
 * Clean up memory.
 */
Flixel.system.FlxQuadTree.prototype.destroy = function()
{
	if (this._headA !== null)
		this._headA.destroy();
	if (this._tailA !== null)
		this._tailA.destroy();
	if (this._headB !== null)
		this._headB.destroy();
	if (this._tailB !== null)
		this._tailB.destroy();

	this._headA = null;
	this._tailA = null;
	this._headB = null;
	this._tailB = null;

	if (this._northWestTree !== null)
		this._northWestTree.destroy();
	if (this._northEastTree !== null)
		this._northEastTree.destroy();
	if (this._southEastTree !== null)
		this._southEastTree.destroy();
	if (this._southWestTree !== null)
		this._southWestTree.destroy();

	this._northWestTree = null;
	this._northEastTree = null;
	this._southEastTree = null;
	this._southWestTree = null;

	Flixel.system.FlxQuadTree._object = null;
	Flixel.system.FlxQuadTree._processingCallback = null;
	Flixel.system.FlxQuadTree._notifyCallback = null;

	Flixel.system.FlxQuadTree._pool.dispose(this);
};

/**
 * Load objects and/or groups into the quad tree, and register notify and processing callbacks.
 * 
 * @param ObjectOrGroup1
 *            Any object that is or extends FlxObject or FlxGroup.
 * @param ObjectOrGroup2
 *            Any object that is or extends FlxObject or FlxGroup. If null, the first parameter will be checked against itself.
 * @param NotifyCallback
 *            A function with the form <code>myFunction(Object1:FlxObject,Object2:FlxObject):void</code> that is called whenever two objects are found to overlap in world space, and either no
 *            ProcessCallback is specified, or the ProcessCallback returns true.
 * @param ProcessCallback
 *            A function with the form <code>myFunction(Object1:FlxObject,Object2:FlxObject):Boolean</code> that is called whenever two objects are found to overlap in world space. The
 *            NotifyCallback is only called if this function returns true. See FlxObject.separate().
 */
Flixel.system.FlxQuadTree.prototype.load = function(ObjectOrGroup1, ObjectOrGroup2, NotifyCallback, ProcessCallback)
{

	this.add(ObjectOrGroup1, Flixel.system.FlxQuadTree.A_LIST);

	if (ObjectOrGroup2 !== null && ObjectOrGroup2 !== undefined) {
		this.add(ObjectOrGroup2, Flixel.system.FlxQuadTree.B_LIST);
		Flixel.system.FlxQuadTree._useBothLists = true;
	} else
		Flixel.system.FlxQuadTree._useBothLists = false;

	Flixel.system.FlxQuadTree._notifyCallback = NotifyCallback;
	Flixel.system.FlxQuadTree._processingCallback = ProcessCallback;
};

/**
 * Call this function to add an object to the root of the tree. This function will recursively add all group members, but not the groups themselves.
 * 
 * @param ObjectOrGroup
 *            FlxObjects are just added, FlxGroups are recursed and their applicable members added accordingly.
 * @param List
 *            A <code>uint</code> flag indicating the list to which you want to add the objects. Options are <code>A_LIST</code> and <code>B_LIST</code>.
 */
Flixel.system.FlxQuadTree.prototype.add = function(ObjectOrGroup, List)
{
	Flixel.system.FlxQuadTree._list = List;

	if (ObjectOrGroup instanceof Flixel.FlxGroup)
	{
		var i = 0;
		var basic;
		var members = ObjectOrGroup.members;
		var l = ObjectOrGroup.length;

		while (i < l) {
			basic = members[i++];
	
			if ((basic !== null && basic !== undefined) && basic.exists)
			{
				if (basic instanceof Flixel.FlxGroup) {
					this.add(basic, List);
				}
				else if (basic instanceof Flixel.FlxObject)
				{
					Flixel.system.FlxQuadTree._object = basic;

					if (Flixel.system.FlxQuadTree._object.exists && Flixel.system.FlxQuadTree._object.allowCollisions)
					{
						Flixel.system.FlxQuadTree._objectLeftEdge = Flixel.system.FlxQuadTree._object.x;
						Flixel.system.FlxQuadTree._objectTopEdge = Flixel.system.FlxQuadTree._object.y;
						Flixel.system.FlxQuadTree._objectRightEdge = Flixel.system.FlxQuadTree._object.x + Flixel.system.FlxQuadTree._object.width;
						Flixel.system.FlxQuadTree._objectBottomEdge = Flixel.system.FlxQuadTree._object.y + Flixel.system.FlxQuadTree._object.height;
						this.addObject();
					}
				}
			}
		}
	} else {
		Flixel.system.FlxQuadTree._object = ObjectOrGroup;

		if (Flixel.system.FlxQuadTree._object.exists && Flixel.system.FlxQuadTree._object.allowCollisions)
		{
			Flixel.system.FlxQuadTree._objectLeftEdge = Flixel.system.FlxQuadTree._object.x;
			Flixel.system.FlxQuadTree._objectTopEdge = Flixel.system.FlxQuadTree._object.y;
			Flixel.system.FlxQuadTree._objectRightEdge = Flixel.system.FlxQuadTree._object.x + Flixel.system.FlxQuadTree._object.width;
			Flixel.system.FlxQuadTree._objectBottomEdge = Flixel.system.FlxQuadTree._object.y + Flixel.system.FlxQuadTree._object.height;
			this.addObject();
		}
	}
};

/**
 * Internal function for recursively navigating and creating the tree while adding objects to the appropriate nodes.
 */
Flixel.system.FlxQuadTree.prototype.addObject = function()
{
	// If this quad (not its children) lies entirely inside this object, add it here
	if (!this._canSubdivide || ((this._leftEdge >= Flixel.system.FlxQuadTree._objectLeftEdge) &&  (this._rightEdge <= Flixel.system.FlxQuadTree._objectRightEdge) &&  (this._topEdge >= Flixel.system.FlxQuadTree._objectTopEdge) && (this._bottomEdge <= Flixel.system.FlxQuadTree._objectBottomEdge))) {
		this.addToList();
		return;
	}

	// See if the selected object fits completely inside any of the quadrants
	if ((Flixel.system.FlxQuadTree._objectLeftEdge > this._leftEdge) && (Flixel.system.FlxQuadTree._objectRightEdge < this._midpointX)) {
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._midpointY)) {
			if (this._northWestTree === null)
				this._northWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._topEdge, this._halfWidth, this._halfHeight, this);
			this._northWestTree.addObject();
			return;
		}
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._bottomEdge)) {
			if (this._southWestTree === null)
				this._southWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._midpointY, this._halfWidth, this._halfHeight, this);
			this._southWestTree.addObject();
			return;
		}
	}
	if ((Flixel.system.FlxQuadTree._objectLeftEdge > this._midpointX) && (Flixel.system.FlxQuadTree._objectRightEdge < this._rightEdge)) {
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._midpointY)) {
			if (this._northEastTree === null)
				this._northEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._topEdge, this._halfWidth, this._halfHeight, this);
			this._northEastTree.addObject();
			return;
		}
		if ((Flixel.system.FlxQuadTree._objectTopEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectBottomEdge < this._bottomEdge)) {
			if (this._southEastTree === null)
				this._southEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._midpointY, this._halfWidth, this._halfHeight, this);
			this._southEastTree.addObject();
			return;
		}
	}

	// If it wasn't completely contained we have to check out the partial overlaps
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._leftEdge) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._midpointX) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectTopEdge < this._midpointY)) {
		if (this._northWestTree === null)
			this._northWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._topEdge, this._halfWidth, this._halfHeight, this);
		this._northWestTree.addObject();
	}
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._midpointX) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._rightEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._topEdge) && (Flixel.system.FlxQuadTree._objectTopEdge < this._midpointY)) {
		if (this._northEastTree === null)
			this._northEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._topEdge, this._halfWidth, this._halfHeight, this);
		this._northEastTree.addObject();
	}
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._midpointX) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._rightEdge) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectTopEdge < this._bottomEdge)) {
		if (this._southEastTree === null)
			this._southEastTree = Flixel.system.FlxQuadTree.getNew(this._midpointX, this._midpointY, this._halfWidth, this._halfHeight, this);
		this._southEastTree.addObject();
	}
	if ((Flixel.system.FlxQuadTree._objectRightEdge > this._leftEdge) && (Flixel.system.FlxQuadTree._objectLeftEdge < this._midpointX) && (Flixel.system.FlxQuadTree._objectBottomEdge > this._midpointY) && (Flixel.system.FlxQuadTree._objectTopEdge < this._bottomEdge)) {
		if (this._southWestTree === null)
			this._southWestTree = Flixel.system.FlxQuadTree.getNew(this._leftEdge, this._midpointY, this._halfWidth, this._halfHeight, this);
		this._southWestTree.addObject();
	}
};

/**
 * Internal function for recursively adding objects to leaf lists.
 */
Flixel.system.FlxQuadTree.prototype.addToList = function()
{
	var ot;
	
	if (Flixel.system.FlxQuadTree._list == Flixel.system.FlxQuadTree.A_LIST)
	{
		if (this._tailA.object !== null)
		{
			ot = this._tailA;
			this._tailA = Flixel.system.FlxList.getNew();
			ot.next = this._tailA;
		}
		this._tailA.object = Flixel.system.FlxQuadTree._object;
	}
	else
	{
		if (this._tailB.object !== null)
		{
			ot = this._tailB;
			this._tailB = Flixel.system.FlxList.getNew();
			ot.next = this._tailB;
		}
		this._tailB.object = Flixel.system.FlxQuadTree._object;
	}

	if (!this._canSubdivide)
		return;
	if (this._northWestTree !== null)
		this._northWestTree.addToList();
	if (this._northEastTree !== null)
		this._northEastTree.addToList();
	if (this._southEastTree !== null)
		this._southEastTree.addToList();
	if (this._southWestTree !== null)
		this._southWestTree.addToList();
};

/**
 * <code>FlxQuadTree</code>'s other main function. Call this after adding objects using <code>FlxQuadTree.load()</code> to compare the objects that you loaded.
 * 
 * @return Whether or not any overlaps were found.
 */
Flixel.system.FlxQuadTree.prototype.execute = function()
{
	var overlapProcessed = false;
	var iterator;
	
	if (this._headA.object !== null) {
		iterator = this._headA;
		
		while (iterator !== null)
		{
			Flixel.system.FlxQuadTree._object = iterator.object;
			if (Flixel.system.FlxQuadTree._useBothLists)
				Flixel.system.FlxQuadTree._iterator = this._headB;
			else
				Flixel.system.FlxQuadTree._iterator = iterator.next;

			if (Flixel.system.FlxQuadTree._object.exists && (Flixel.system.FlxQuadTree._object.allowCollisions > 0) && (Flixel.system.FlxQuadTree._iterator !== null) && (Flixel.system.FlxQuadTree._iterator.object !== null) && Flixel.system.FlxQuadTree._iterator.object.exists && this.overlapNode()) {
				overlapProcessed = true;
			}

			iterator = iterator.next;
		}
	}

	// Advance through the tree by calling overlap on each child
	if ((this._northWestTree !== null) && this._northWestTree.execute())
		overlapProcessed = true;
	if ((this._northEastTree !== null) && this._northEastTree.execute())
		overlapProcessed = true;
	if ((this._southEastTree !== null) && this._southEastTree.execute())
		overlapProcessed = true;
	if ((this._southWestTree !== null) && this._southWestTree.execute())
		overlapProcessed = true;

	return overlapProcessed;
};

/**
 * An internal function for comparing an object against the contents of a node.
 * 
 * @return Whether or not any overlaps were found.
 */
Flixel.system.FlxQuadTree.prototype.overlapNode = function()
{
	// Walk the list and check for overlaps
	var overlapProcessed = false;
	var checkObject;
	var iterator = Flixel.system.FlxQuadTree._iterator;

	while (iterator !== null) {
		if (!Flixel.system.FlxQuadTree._object.exists || (Flixel.system.FlxQuadTree._object.allowCollisions <= 0))
			break;

		checkObject = iterator.object;
		if ((Flixel.system.FlxQuadTree._object === checkObject) || !checkObject.exists || (checkObject.allowCollisions <= 0)) {
			iterator = iterator.next;
			continue;
		}

		// Calculate bulk hull for _object
		Flixel.system.FlxQuadTree._objectHullX = (Flixel.system.FlxQuadTree._object.x < Flixel.system.FlxQuadTree._object.last.x) ? Flixel.system.FlxQuadTree._object.x : Flixel.system.FlxQuadTree._object.last.x;
		Flixel.system.FlxQuadTree._objectHullY = (Flixel.system.FlxQuadTree._object.y < Flixel.system.FlxQuadTree._object.last.y) ? Flixel.system.FlxQuadTree._object.y : Flixel.system.FlxQuadTree._object.last.y;
		Flixel.system.FlxQuadTree._objectHullWidth = Flixel.system.FlxQuadTree._object.x - Flixel.system.FlxQuadTree._object.last.x;
		Flixel.system.FlxQuadTree._objectHullWidth = Flixel.system.FlxQuadTree._object.width + ((Flixel.system.FlxQuadTree._objectHullWidth > 0) ? Flixel.system.FlxQuadTree._objectHullWidth : -Flixel.system.FlxQuadTree._objectHullWidth);
		Flixel.system.FlxQuadTree._objectHullHeight = Flixel.system.FlxQuadTree._object.y - Flixel.system.FlxQuadTree._object.last.y;
		Flixel.system.FlxQuadTree._objectHullHeight = Flixel.system.FlxQuadTree._object.height + ((Flixel.system.FlxQuadTree._objectHullHeight > 0) ? Flixel.system.FlxQuadTree._objectHullHeight : -Flixel.system.FlxQuadTree._objectHullHeight);

		// calculate bulk hull for checkObject
		Flixel.system.FlxQuadTree._checkObjectHullX = (checkObject.x < checkObject.last.x) ? checkObject.x : checkObject.last.x;
		Flixel.system.FlxQuadTree._checkObjectHullY = (checkObject.y < checkObject.last.y) ? checkObject.y : checkObject.last.y;
		Flixel.system.FlxQuadTree._checkObjectHullWidth = checkObject.x - checkObject.last.x;
		Flixel.system.FlxQuadTree._checkObjectHullWidth = checkObject.width + ((Flixel.system.FlxQuadTree._checkObjectHullWidth > 0) ? Flixel.system.FlxQuadTree._checkObjectHullWidth : -Flixel.system.FlxQuadTree._checkObjectHullWidth);
		Flixel.system.FlxQuadTree._checkObjectHullHeight = checkObject.y - checkObject.last.y;
		Flixel.system.FlxQuadTree._checkObjectHullHeight = checkObject.height + ((Flixel.system.FlxQuadTree._checkObjectHullHeight > 0) ? Flixel.system.FlxQuadTree._checkObjectHullHeight : -Flixel.system.FlxQuadTree._checkObjectHullHeight);

		// check for intersection of the two hulls
		if ((Flixel.system.FlxQuadTree._objectHullX + Flixel.system.FlxQuadTree._objectHullWidth > Flixel.system.FlxQuadTree._checkObjectHullX) && (Flixel.system.FlxQuadTree._objectHullX < Flixel.system.FlxQuadTree._checkObjectHullX + Flixel.system.FlxQuadTree._checkObjectHullWidth) && (Flixel.system.FlxQuadTree._objectHullY + Flixel.system.FlxQuadTree._objectHullHeight > Flixel.system.FlxQuadTree._checkObjectHullY) && (Flixel.system.FlxQuadTree._objectHullY < Flixel.system.FlxQuadTree._checkObjectHullY + Flixel.system.FlxQuadTree._checkObjectHullHeight)) {
			// Execute callback functions if they exist
			if ((Flixel.system.FlxQuadTree._processingCallback === null || Flixel.system.FlxQuadTree._processingCallback === undefined) || Flixel.system.FlxQuadTree._processingCallback(Flixel.system.FlxQuadTree._object, checkObject))
				overlapProcessed = true;
			if (overlapProcessed && (Flixel.system.FlxQuadTree._notifyCallback !== null && Flixel.system.FlxQuadTree._notifyCallback !== undefined))
				Flixel.system.FlxQuadTree._notifyCallback(Flixel.system.FlxQuadTree._object, checkObject);
		}

		iterator = iterator.next;
	}

	Flixel.system.FlxQuadTree._iterator = iterator;

	return overlapProcessed;
};