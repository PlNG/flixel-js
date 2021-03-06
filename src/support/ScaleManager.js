/**
 * The ScaleManager object is responsible for helping you manage the scaling,<br>
 * resizing and alignment of your game within the browser.<br>
 * 
 * @class ScaleManager
 * @constructor
 * @param {number}
 *            width - The native width of the game.
 * @param {number}
 *            height - The native height of the game.
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var ScaleManager = function(width, height)
{
	// Save initial variables
	this.width = width;
	this.height = height;

	// Check the window orientation
	if (window.orientation) {
		this.orientation = window.orientation;
	} else {
		if (window.outerWidth > window.outerHeight) {
			this.orientation = 90;
		} else {
			this.orientation = 0;
		}
	}

	// Add listeners to all the functions that we need
	var _this = this;
	window.addEventListener('orientationchange', function(event)
	{
		return _this.checkOrientation(event);
	}, false);
	window.addEventListener('resize', function(event)
	{
		return _this.checkResize(event);
	}, false);
	document.addEventListener('webkitfullscreenchange', function(event)
	{
		return _this.fullScreenChange(event);
	}, false);
	document.addEventListener('mozfullscreenchange', function(event)
	{
		return _this.fullScreenChange(event);
	}, false);
	document.addEventListener('fullscreenchange', function(event)
	{
		return _this.fullScreenChange(event);
	}, false);
};

/**
 * @property {number} width - Width of the stage after calculation.
 */
ScaleManager.prototype.width = 0;
/**
 * @property {number} height - Height of the stage after calculation.
 */
ScaleManager.prototype.height = 0;
/**
 * @property {number} minWidth - Minimum width the canvas should be scaled to (in pixels).
 * @default
 */
ScaleManager.prototype.minWidth = null;
/**
 * @property {number} maxWidth - Maximum width the canvas should be scaled to (in pixels). If null it will scale to whatever width the browser can
 *           handle.
 * @default
 */
ScaleManager.prototype.maxWidth = null;
/**
 * @property {number} minHeight - Minimum height the canvas should be scaled to (in pixels).
 * @default
 */
ScaleManager.prototype.minHeight = null;
/**
 * @property {number} maxHeight - Maximum height the canvas should be scaled to (in pixels). If null it will scale to whatever height the browser can
 *           handle.
 * @default
 */
ScaleManager.prototype.maxHeight = null;
/**
 * @property {number} _startHeight - Stage height when starting the game.
 * @default
 * @private
 */
ScaleManager.prototype._startHeight = 0;
/**
 * @property {boolean} forceLandscape - If the game should be forced to use Landscape mode, this is set to true by Game.Stage
 * @default
 */
ScaleManager.prototype.forceLandscape = false;
/**
 * @property {boolean} forcePortrait - If the game should be forced to use Portrait mode, this is set to true by Game.Stage
 * @default
 */
ScaleManager.prototype.forcePortrait = false;
/**
 * @property {boolean} incorrectOrientation - If the game should be forced to use a specific orientation and the device currently isn't in that
 *           orientation this is set to true.
 * @default
 */
ScaleManager.prototype.incorrectOrientation = false;
/**
 * @property {boolean} pageAlignHorizontally - If you wish to align your game in the middle of the page then you can set this value to true. It will
 *           place a re-calculated margin-left pixel value onto the canvas element which is updated on orientation/resizing. It doesn't care about any
 *           other DOM element that may be on the page, it literally just sets the margin.
 * @default
 */
ScaleManager.prototype.pageAlignHorizontally = false;
/**
 * @property {boolean} pageAlignVertically - If you wish to align your game in the middle of the page then you can set this value to true. It will
 *           place a re-calculated margin-left pixel value onto the canvas element which is updated on orientation/resizing. It doesn't care about any
 *           other DOM element that may be on the page, it literally just sets the margin.
 * @default
 */
ScaleManager.prototype.pageAlignVertically = false;
/**
 * @property {number} _width - Cached stage width for full screen mode.
 * @default
 * @private
 */
ScaleManager.prototype._width = 0;
/**
 * @property {number} _height - Cached stage height for full screen mode.
 * @default
 * @private
 */
ScaleManager.prototype._height = 0;
/**
 * @property {number} maxIterations - The maximum number of times it will try to resize the canvas to fill the browser.
 * @default
 */
ScaleManager.prototype.maxIterations = 5;
/**
 * @property {Flixel.FlxSprite} orientationSprite - The Sprite that is optionally displayed if the browser enters an unsupported orientation.
 * @default
 */
ScaleManager.prototype.orientationSprite = null;
/**
 * @property {Function} enterLandscape - The function that is called when the browser enters landscape orientation.
 */
ScaleManager.prototype.enterLandscape = null;
/**
 * @property {Function} enterPortrait - The function that is called when the browser enters horizontal orientation.
 */
ScaleManager.prototype.enterPortrait = null;
/**
 * @property {Function} enterIncorrectOrientation - The function that is called when the browser enters an incorrect orientation, as defined by
 *           forceOrientation.
 */
ScaleManager.prototype.enterIncorrectOrientation = null;
/**
 * @property {Function} leaveIncorrectOrientation - The function that is called when the browser leaves an incorrect orientation, as defined by
 *           forceOrientation.
 */
ScaleManager.prototype.leaveIncorrectOrientation = null;
/**
 * @property {Function} hasResized - The function that is called when the game scale changes.
 */
ScaleManager.prototype.hasResized = null;
/**
 * @property {Flixel.FlxPoint} scaleFactor - The scale factor based on the game dimensions vs. the scaled dimensions.
 * @readonly
 */
ScaleManager.prototype.scaleFactor = new Flixel.FlxPoint(1, 1);
/**
 * @property {Flixel.FlxPoint} scaleFactorInversed - The inversed scale factor. The displayed dimensions divided by the game dimensions.
 * @readonly
 */
ScaleManager.prototype.scaleFactorInversed = new Flixel.FlxPoint(1, 1);
/**
 * @property {Flixel.FlxPoint} margin - If the game canvas is seto to align by adjusting the margin, the margin calculation values are stored in this
 *           Point.
 * @readonly
 */
ScaleManager.prototype.margin = new Flixel.FlxPoint(0, 0);
/**
 * @property {number} aspectRatio - Aspect ratio.
 * @default
 */
ScaleManager.prototype.aspectRatio = 0;
/**
 * @property {any} event- The native browser events from full screen API changes.
 */
ScaleManager.prototype.event = null;

/**
 * Tries to enter the browser into full screen mode. Please note that this needs to be supported by the web browser and isn't the same thing as
 * setting your game to fill the browser.
 * 
 * @method ScaleManager#startFullScreen
 * @param {boolean}
 *            antialias - You can toggle the anti-alias feature of the canvas before jumping in to full screen (false = retain pixel art, true =
 *            smooth art)
 */
ScaleManager.prototype.startFullScreen = function(antialias)
{
	if (this.isFullScreen()) {
		return;
	}

	if (typeof antialias !== 'undefined') {
		CanvasManager.setSmoothingEnabled(Flixel.FlxG.getStage().getContext("2d"), antialias);
	}

	var element = Flixel.FlxG.getStage();

	this._width = this.width;
	this._height = this.height;

	console.log('startFullScreen', this._width, this._height);

	if (element.requestFullScreen) {
		element.requestFullScreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	}
};

/**
 * Stops full screen mode if the browser is in it.
 * 
 * @method ScaleManager#stopFullScreen
 */
ScaleManager.prototype.stopFullScreen = function()
{
	if (document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
};

/**
 * Called automatically when the browser enters of leaves full screen mode.
 * 
 * @method ScaleManager#fullScreenChange
 * @param {Event}
 *            event - The fullscreenchange event
 * @protected
 */
ScaleManager.prototype.fullScreenChange = function(event)
{
	this.event = event;

	if (this.isFullScreen()) {
		Flixel.FlxG.getStage().style['width'] = '100%';
		Flixel.FlxG.getStage().style['height'] = '100%';

		this.setMaximum();

		Flixel.FlxG.mouse.scale.make(Flixel.FlxG.width / this.width, Flixel.FlxG.height / this.height);

		this.aspectRatio = this.width / this.height;
		this.scaleFactor.x = Flixel.FlxG.width / this.width;
		this.scaleFactor.y = Flixel.FlxG.height / this.height;
	} else {
		Flixel.FlxG.getStage().style['width'] = Flixel.FlxG.width + 'px';
		Flixel.FlxG.getStage().style['height'] = Flixel.FlxG.height + 'px';

		this.width = this._width;
		this.height = this._height;

		Flixel.FlxG.mouse.scale.make(Flixel.FlxG.width / this.width, Flixel.FlxG.height / this.height);

		this.aspectRatio = this.width / this.height;
		this.scaleFactor.x = Flixel.FlxG.width / this.width;
		this.scaleFactor.y = Flixel.FlxG.height / this.height;
	}
};

/**
 * If you need your game to run in only one orientation you can force that to happen. The optional orientationImage is displayed when the game is in
 * the incorrect orientation.
 * 
 * @method ScaleManager#forceOrientation
 * @param {boolean}
 *            forceLandscape - true if the game should run in landscape mode only.
 * @param {boolean}
 *            [forcePortrait=false] - true if the game should run in portrait mode only.
 * @param {string}
 *            [orientationImage=''] - The string of an image in the Cache to display when this game is in the incorrect orientation.
 */
ScaleManager.prototype.forceOrientation = function(forceLandscape, forcePortrait, orientationImage)
{
	if (typeof forcePortrait === 'undefined') {
		forcePortrait = false;
	}

	this.forceLandscape = forceLandscape;
	this.forcePortrait = forcePortrait;

	if (typeof orientationImage !== 'undefined') {
		Flixel.FlxG.getGame().orientationSprite = new Flixel.FlxSprite(0, 0 , orientationImage);
		Flixel.FlxG.getGame().orientationSprite.x = Flixel.FlxG.width / 2;
		Flixel.FlxG.getGame().orientationSprite.y = Flixel.FlxG.height / 2;

		this.checkOrientationState();

		if (this.incorrectOrientation) {
			Flixel.FlxG.getGame().orientationSprite.visible = true;
		} else {
			Flixel.FlxG.getGame().orientationSprite.visible = false;
		}
	}
};

/**
 * Checks if the browser is in the correct orientation for your game (if forceLandscape or forcePortrait have been set)
 * 
 * @method ScaleManager#checkOrientationState
 */
ScaleManager.prototype.checkOrientationState = function()
{
	// They are in the wrong orientation
	if (this.incorrectOrientation) {
		if ((this.forceLandscape && window.innerWidth > window.innerHeight) || (this.forcePortrait && window.innerHeight > window.innerWidth)) {
			// Back to normal
			Flixel.FlxG.setPause(false);
			this.incorrectOrientation = false;

			// Call the event if needed
			if(this.leaveIncorrectOrientation)
				this.leaveIncorrectOrientation();

			if (Flixel.FlxG.getGame().orientationSprite) {
				Flixel.FlxG.getGame().orientationSprite.visible = false;
			}

			this.refresh();
		}
	} else {
		if ((this.forceLandscape && window.innerWidth < window.innerHeight) || (this.forcePortrait && window.innerHeight < window.innerWidth)) {
			// Show orientation screen
			Flixel.FlxG.setPause(true);
			this.incorrectOrientation = true;
			
			// Call the event if needed
			if(this.enterIncorrectOrientation)
				this.enterIncorrectOrientation();

			if (Flixel.FlxG.getGame().orientationSprite && Flixel.FlxG.getGame().orientationSprite.visible === false) {
				Flixel.FlxG.getGame().orientationSprite.visible = true;
			}

			this.refresh();
		}
	}
};

/**
 * Handle window.orientationchange events
 * 
 * @method ScaleManager#checkOrientation
 * @param {Event}
 *            event - The orientationchange event data.
 */
ScaleManager.prototype.checkOrientation = function(event)
{
	this.event = event;

	this.orientation = window.orientation;

	if (this.isLandscape() && this.enterLandscape) {
		this.enterLandscape(this.orientation, true, false);
	} else if (this.isPortrait() && this.enterPortrait) {
		this.enterPortrait(this.orientation, false, true);
	}

	if (Flixel.FlxCamera.defaultScaleMode !== Flixel.FlxCamera.NO_SCALE) {
		this.refresh();
	}
};

/**
 * Handle window.resize events
 * 
 * @method ScaleManager#checkResize
 * @param {Event}
 *            event - The resize event data.
 */
ScaleManager.prototype.checkResize = function(event)
{
	this.event = event;

	if (window.outerWidth > window.outerHeight) {
		this.orientation = 90;
	} else {
		this.orientation = 0;
	}

	if (this.isLandscape && this.enterLandscape) {
		this.enterLandscape(this.orientation, true, false);
	} else if(this.enterPortrait) {
		this.enterPortrait(this.orientation, false, true);
	}

	if (Flixel.FlxCamera.defaultScaleMode !== Flixel.FlxCamera.NO_SCALE) {
		this.refresh();
	}

	this.checkOrientationState();
};

/**
 * Re-calculate scale mode and update screen size.
 * 
 * @method ScaleManager#refresh
 */
ScaleManager.prototype.refresh = function()
{
	// We can't do anything about the status bars in iPads, web apps or desktops
	if (Flixel.FlxG.device.iPad === false && Flixel.FlxG.device.webApp === false && Flixel.FlxG.device.desktop === false) {
		if (Flixel.FlxG.device.android && Flixel.FlxG.device.chrome === false) {
			window.scrollTo(0, 1);
		} else {
			window.scrollTo(0, 0);
		}
	}

	if (this._check == null && this.maxIterations > 0) {
		this._iterations = this.maxIterations;
		var _this = this;
		_this.height; // WTF Eclipse and his weird errors
		this._check = window.setInterval(function() { return _this.setScreenSize(); }, 10);
		this.setScreenSize();
	}
};

/**
 * Set screen size automatically based on the scaleMode.
 * 
 * @param {boolean}
 *            force - If force is true it will try to resize the game regardless of the document dimensions.
 */
ScaleManager.prototype.setScreenSize = function(force)
{
	if (typeof force == 'undefined') {
		force = false;
	}

	if (Flixel.FlxG.device.iPad === false && Flixel.FlxG.device.webApp === false && Flixel.FlxG.device.desktop === false) {
		if (Flixel.FlxG.device.android && Flixel.FlxG.device.chrome === false) {
			window.scrollTo(0, 1);
		} else {
			window.scrollTo(0, 0);
		}
	}

	this._iterations--;

	if (force || window.innerHeight > this._startHeight || this._iterations < 0) {
		// Set minimum height of content to new window height
		document.documentElement['style'].minHeight = window.innerHeight + 'px';

		if (this.incorrectOrientation === true) {
			this.setMaximum();
		} else if (Flixel.FlxCamera.defaultScaleMode == Flixel.FlxCamera.EXACT_FIT) {
			this.setExactFit();
		} else if (Flixel.FlxCamera.defaultScaleMode == Flixel.FlxCamera.STRETCH) {
			this.setShowAll();
		}

		this.setSize();
		clearInterval(this._check);
		this._check = null;
	}
};

/**
 * Sets the canvas style width and height values based on minWidth/Height and maxWidth/Height.
 * 
 * @method ScaleManager#setSize
 */
ScaleManager.prototype.setSize = function()
{
	if (this.incorrectOrientation === false) {
		if (this.maxWidth && this.width > this.maxWidth) {
			this.width = this.maxWidth;
		}

		if (this.maxHeight && this.height > this.maxHeight) {
			this.height = this.maxHeight;
		}

		if (this.minWidth && this.width < this.minWidth) {
			this.width = this.minWidth;
		}

		if (this.minHeight && this.height < this.minHeight) {
			this.height = this.minHeight;
		}
	}

	Flixel.FlxG.getStage().style.width = this.width + 'px';
	Flixel.FlxG.getStage().style.height = this.height + 'px';

	Flixel.FlxG.mouse.scale.make(Flixel.FlxG.width / this.width, Flixel.FlxG.height / this.height);

	if (this.pageAlignHorizontally) {
		if (this.width < window.innerWidth && this.incorrectOrientation === false) {
			this.margin.x = Math.round((window.innerWidth - this.width) / 2);
			Flixel.FlxG.getStage().marginLeft = this.margin.x + 'px';
		} else {
			this.margin.x = 0;
			Flixel.FlxG.getStage().style.marginLeft = '0px';
		}
	}

	if (this.pageAlignVertically) {
		if (this.height < window.innerHeight && this.incorrectOrientation === false) {
			this.margin.y = Math.round((window.innerHeight - this.height) / 2);
			Flixel.FlxG.getStage().style.marginTop = this.margin.y + 'px';
		} else {
			this.margin.y = 0;
			Flixel.FlxG.getStage().style.marginTop = '0px';
		}
	}

	CanvasManager.getOffset(Flixel.FlxG.getStage(), Flixel.FlxG.mouse.offset);

	this.aspectRatio = this.width / this.height;

	this.scaleFactor.x = Flixel.FlxG.width / this.width;
	this.scaleFactor.y = Flixel.FlxG.height / this.height;

	this.scaleFactorInversed.x = this.width / Flixel.FlxG.width;
	this.scaleFactorInversed.y = this.height / Flixel.FlxG.height;

	if(this.hasResized)
		this.hasResized(this.width, this.height);

	this.checkOrientationState();
};

/**
 * Sets this.width equal to window.innerWidth and this.height equal to window.innerHeight
 * 
 * @method ScaleManager#setMaximum
 */
ScaleManager.prototype.setMaximum = function()
{
	this.width = window.innerWidth;
	this.height = window.innerHeight;
};

/**
 * Calculates the multiplier needed to scale the game proportionally.
 * 
 * @method ScaleManager#setShowAll
 */
ScaleManager.prototype.setShowAll = function()
{
	var multiplier = Math.min((window.innerHeight / Flixel.FlxG.height), (window.innerWidth / Flixel.FlxG.width));

	this.width = Math.round(Flixel.FlxG.width * multiplier);
	this.height = Math.round(Flixel.FlxG.height * multiplier);
};

/**
 * Sets the width and height values of the canvas, no larger than the maxWidth / maxHeight.
 * 
 * @method ScaleManager#setExactFit
 */
ScaleManager.prototype.setExactFit = function()
{
	var availableWidth = window.innerWidth;
	var availableHeight = window.innerHeight;

	// console.log('available', availableWidth, availableHeight);

	if (this.maxWidth && availableWidth > this.maxWidth) {
		this.width = this.maxWidth;
	} else {
		this.width = availableWidth;
	}

	if (this.maxHeight && availableHeight > this.maxHeight) {
		this.height = this.maxHeight;
	} else {
		this.height = availableHeight;
	}
};

/**
 * Returns true if the browser is in full screen mode, otherwise false.
 * 
 * @method ScaleManager#isFullScreen
 */
ScaleManager.prototype.isFullScreen = function()
{
	return (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
};

/**
 * Returns true if the browser dimensions match a portrait display.
 * 
 * @method ScaleManager#isPortrait
 */
ScaleManager.prototype.isPortrait = function()
{
	return this.orientation === 0 || this.orientation == 180;
};

/**
 * Returns true if the browser dimensions match a landscape display.
 * 
 * @method ScaleManager#isLandscape
 */
ScaleManager.prototype.isLandscape = function()
{
	return this.orientation === 90 || this.orientation === -90;
};