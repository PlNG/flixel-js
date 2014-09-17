/**
 * A simple button class that calls a method when clicked by the mouse.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author	Adam Atomic
 */

/**
 * Creates a new <code>FlxButton</code> object with a gray background and a callback function on the UI thread.
 * 
 * @param X
 *            The X position of the button.
 * @param Y
 *            The Y position of the button.
 * @param Label
 *            The text that you want to appear on the button.
 * @param OnClick
 *            The function to call whenever the button is clicked.
 */
Flixel.FlxButton = function(X, Y, Label, OnClick)
{
	Flixel.FlxButton.parent.constructor.apply(this, [ X, Y ]);

	if (Label !== null) {
		this.label = new Flixel.FlxText(0, 0, 80, Label);
		this.label.setFormat(null, 10, 0x333333, "center");
		this.labelOffset = new Flixel.FlxPoint(-1, 3);
	}
	this.loadGraphic(Flixel.data.FlxSystemAsset.ImgDefaultButton, true, false, 80, 20);

	this.onUp = OnClick;
	this.onDown = null;
	this.onOut = null;
	this.onOver = null;

	this.soundOver = null;
	this.soundOut = null;
	this.soundDown = null;
	this.soundUp = null;

	this.status = Flixel.FlxButton.NORMAL;
	this._onToggle = false;
	this._pressed = false;
	this._initialized = false;
	this.changeAlpha = true;
	this.changeFrame = true;
};
extend(Flixel.FlxButton, Flixel.FlxSprite);

/**
 * Used with public variable <code>status</code>, means not highlighted or pressed.
 */
Flixel.FlxButton.NORMAL = 0;
/**
 * Used with public variable <code>status</code>, means highlighted (usually from mouse over).
 */
Flixel.FlxButton.HIGHLIGHT = 1;
/**
 * Used with public variable <code>status</code>, means pressed (usually from mouse click).
 */
Flixel.FlxButton.PRESSED = 2;
/**
 * The text that appears on the button.
 */
Flixel.FlxButton.prototype.label = null;
/**
 * Controls the offset (from top left) of the text from the button.
 */
Flixel.FlxButton.prototype.labelOffset = null;
/**
 * This function is called when the button is released. We recommend assigning your main button behavior to this function via the <code>FlxButton</code> constructor.
 */
Flixel.FlxButton.prototype.onUp = null;
/**
 * This function is called when the button is pressed down.
 */
Flixel.FlxButton.prototype.onDown = null;
/**
 * This function is called when the mouse goes over the button.
 */
Flixel.FlxButton.prototype.onOver = null;
/**
 * This function is called when the mouse leaves the button area.
 */
Flixel.FlxButton.prototype.onOut = null;
/**
 * Shows the current state of the button.
 */
Flixel.FlxButton.prototype.status = 0;
/**
 * Set this to play a sound when the mouse goes over the button. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundOver = null;
/**
 * Set this to play a sound when the mouse leaves the button. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundOut = null;
/**
 * Set this to play a sound when the button is pressed down. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundDown = null;
/**
 * Set this to play a sound when the button is released. We recommend using the helper function setSounds()!
 */
Flixel.FlxButton.prototype.soundUp = null;
/**
 * Used for checkbox-style behavior.
 */
Flixel.FlxButton.prototype._onToggle = false;
/**
 * Tracks whether or not the button is currently pressed.
 */
Flixel.FlxButton.prototype._pressed = false;
/**
 * Whether or not the button has initialized itself yet.
 */
Flixel.FlxButton.prototype._initialized = false;
/**
 * If we want to change the label alpha or not.
 */
Flixel.FlxButton.prototype.changeAlpha = false;
/**
 * IF we want to change the frame or not.
 */
Flixel.FlxButton.prototype.changeFrame = false;

/**
 * Called by the game state when state is changed (if this object belongs to the state)
 */
Flixel.FlxButton.prototype.destroy = function()
{
	if(Flixel.FlxG.mobile) {
		window.removeEventListener("touchend", this.handleMouseUp.bind(this));
		window.removeEventListener("MSPointerDown", this.handleMouseUp.bind(this));
		window.removeEventListener("pointerDown", this.handleMouseUp.bind(this));
	} else {
		window.removeEventListener("mouseup", this.handleMouseUp.bind(this));	
	}
	
	if (this.label !== null) {
		this.label.destroy();
		this.label = null;
	}

	this.onUp = null;
	this.onDown = null;
	this.onOut = null;
	this.onOver = null;

	if (this.soundOver !== null)
		this.soundOver.destroy();
	if (this.soundOut !== null)
		this.soundOut.destroy();
	if (this.soundDown !== null)
		this.soundDown.destroy();
	if (this.soundUp !== null)
		this.soundUp.destroy();

	Flixel.FlxButton.parent.destroy.apply(this);
};

/**
 * Since button uses its own mouse handler for thread reasons, we run a little pre-check here to make sure that we only add the mouse handler when it is actually safe to do so.
 */
Flixel.FlxButton.prototype.preUpdate = function()
{
	Flixel.FlxButton.parent.preUpdate.apply(this);

	if (!this._initialized) {
		if(Flixel.FlxG.mobile) {
			window.addEventListener("touchend", this.handleMouseUp.bind(this));
			window.addEventListener("MSPointerDown", this.handleMouseUp.bind(this));
			window.addEventListener("pointerDown", this.handleMouseUp.bind(this));
		} else {
			window.addEventListener("mouseup", this.handleMouseUp.bind(this));	
		}
		this._initialized = true;
	}
};

/**
 * Called by the game loop automatically, handles mouseover and click detection.
 */
Flixel.FlxButton.prototype.update = function()
{
	this.updateButton(); // Basic button logic

	// Default button appearance is to simply update
	// the label appearance based on animation frame.
	if (this.label === null || !this.changeAlpha)
		return;
	switch (this.getFrame()) {
		case Flixel.FlxButton.HIGHLIGHT: // Extra behavior to accomodate checkbox logic.
			this.label.setAlpha(1.0);
			break;
		case Flixel.FlxButton.PRESSED:
			this.label.setAlpha(0.5);
			this.label.y++;
			break;
		default:
		case Flixel.FlxButton.NORMAL:
			this.label.setAlpha(0.8);
			break;
	}
};

/**
 * Basic button update logic
 */
Flixel.FlxButton.prototype.updateButton = function()
{
	if (this.status == Flixel.FlxButton.PRESSED)
		this.status = Flixel.FlxButton.NORMAL;
	
	// Figure out if the button is highlighted or pressed or what
	// (ignore checkbox behavior for now).
	if (Flixel.FlxG.mouse.getVisible()) {
		if (this.cameras === null)
			this.cameras = Flixel.FlxG.cameras;
		var camera;
		var i = 0;
		var l = this.cameras.length;
		var pointerId = 0;		
		var	totalPointers = Flixel.FlxG.mouse.activePointers + 1;
		var offAll = true;

		while (i < l) {
			camera = this.cameras[i++];
			
			while(pointerId < totalPointers)
			{
				Flixel.FlxG.mouse.getWorldPosition(camera, this._point, pointerId);
				if(this.overlapsPoint(this._point, true, camera))
				{
					offAll = false;
					if(Flixel.FlxG.mouse.pressed(pointerId))
					{
						this.status = Flixel.FlxButton.PRESSED;
						if(Flixel.FlxG.mouse.justPressed(pointerId))
						{
							if(this.onDown !== null) {
								this.onDown.callback();
							}
							if(this.soundDown !== null)
								this.soundDown.play(true);
						}
					}
				
					if(this.status == Flixel.FlxButton.NORMAL)
					{
						this.status = Flixel.FlxButton.HIGHLIGHT;
						if(this.onOver !== null)
							this.onOver.callback();
						if(this.soundOver !== null)
							this.soundOver.play(true);
					}
				}
				++pointerId;
			}
		}
		if (offAll) {
			if (this.status != Flixel.FlxButton.NORMAL) {
				if (this.onOut !== null)
					this.onOut();
				if (this.soundOut !== null)
					this.soundOut.play(true);
			}
			this.status = Flixel.FlxButton.NORMAL;
		}
	}

	// Then if the label and/or the label offset exist,
	// position them to match the button.
	if (this.label !== null) {
		this.label.x = this.x;
		this.label.y = this.y;
	}
	if (this.labelOffset !== null) {
		this.label.x += this.labelOffset.x;
		this.label.y += this.labelOffset.y;
	}

	// Then pick the appropriate frame of animation
	if (this.changeFrame) {
		if ((this.status == Flixel.FlxButton.HIGHLIGHT) && (this._onToggle || Flixel.FlxG.mobile))
			this.setFrame(Flixel.FlxButton.NORMAL);
		else
			this.setFrame(this.status);
	}
};

/**
 * Just draws the button graphic and text label to the screen.
 */
Flixel.FlxButton.prototype.draw = function()
{
	Flixel.FlxButton.parent.draw.apply(this);

	if (this.label !== null) {
		this.label.scrollFactor = this.scrollFactor;
		this.label.cameras = this.cameras;
		this.label.draw();
	}
};

/**
 * Updates the size of the text field to match the button.
 */
Flixel.FlxButton.prototype.resetHelpers = function()
{
	Flixel.FlxButton.parent.resetHelpers.apply(this);

	if (this.label !== null) {
		this.label.width = this.width;
		this.label.dirty = true;
	}
};

/**
 * Set sounds to play during mouse-button interactions. These operations can be done manually as well, and the public sound variables can be used after this for more fine-tuning, such as positional
 * audio, etc.
 * 
 * @param SoundOver
 *            What embedded sound effect to play when the mouse goes over the button. Default is null, or no sound.
 * @param SoundOverVolume
 *            How load the that sound should be.
 * @param SoundOut
 *            What embedded sound effect to play when the mouse leaves the button area. Default is null, or no sound.
 * @param SoundOutVolume
 *            How load the that sound should be.
 * @param SoundDown
 *            What embedded sound effect to play when the mouse presses the button down. Default is null, or no sound.
 * @param SoundDownVolume
 *            How load the that sound should be.
 * @param SoundUp
 *            What embedded sound effect to play when the mouse releases the button. Default is null, or no sound.
 * @param SoundUpVolume
 *            How load the that sound should be.
 */
Flixel.FlxButton.prototype.setSounds = function(SoundOver, SoundOverVolume, SoundOut, SoundOutVolume, SoundDown, SoundDownVolume, SoundUp, SoundUpVolume)
{
	if (SoundOver !== null)
		this.soundOver = Flixel.FlxG.loadSound(SoundOver, SoundOverVolume || 1.0);
	if (SoundOut !== null)
		this.soundOut = Flixel.FlxG.loadSound(SoundOut, SoundOutVolume || 1.0);
	if (SoundDown !== null)
		this.soundDown = Flixel.FlxG.loadSound(SoundDown, SoundDownVolume || 1.0);
	if (SoundUp !== null)
		this.soundUp = Flixel.FlxG.loadSound(SoundUp, SoundUpVolume || 1.0);
};

/**
 * Use this to toggle checkbox-style behavior.
 */
Flixel.FlxButton.prototype.getOn = function()
{
	return this._onToggle;
};

/**
 * @private
 */
Flixel.FlxButton.prototype.setOn = function(On)
{
	this._onToggle = On;
};

/**
 * Internal function for handling the actual callback call (for UI thread dependent calls like <code>FlxU.openURL()</code>).
 */
Flixel.FlxButton.prototype.handleMouseUp = function(event)
{
	if (!this.exists || !this.visible || !this.active || (this.status != Flixel.FlxButton.PRESSED))
		return;
	if (this.onUp !== null)
		this.onUp();
	if (this.soundUp !== null)
		this.soundUp.play(true);
};

/**
 * Returns the class name.
 */
Flixel.FlxButton.prototype.toString = function()
{
	return "FlxButton";
};