/**
 * FlxGame is the heart of all flixel games, and contains a bunch of basic game loops and things.
 * It is a long and sloppy file that you shouldn't have to worry about too much!
 * It is basically only used to create your game object in the first place,
 * after that FlxG and FlxState have all the useful stuff you actually need.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new game object.
 * 
 * @param CanvasId
 *            The HTML canvas id.
 * @param Loader
 *            An instance of the Loader object.
 * @param GameSizeX
 *            The width of your game in game pixels, not necessarily final
 *            display pixels (see Zoom).
 * @param GameSizeY
 *            The height of your game in game pixels, not necessarily final
 *            display pixels (see Zoom).
 * @param InitialStat
 *            The class name of the state you want to create and switch to first
 *            (e.g. MenuState).
 * @param Zoom
 *            The default level of zoom for the game's cameras (e.g. 2 = all
 *            pixels are now drawn at 2x). Default = 1.
 * @param GameFramerate
 *            How frequently the game should update (default is 60 times per
 *            second).
 * @param FlashFramerate
 *            Sets the actual display framerate for Flash player (default is 30
 *            times per second).
 * @param UseSystemCursor
 *            Whether to use the default OS mouse pointer, or to use custom
 *            flixel ones.
 */
Flixel.FlxGame = function(CanvasId, Loader, GameSizeX, GameSizeY, InitialState, Zoom, GameFramerate, FlashFramerate, UseSystemCursor, ScaleMode)
{
	if (InitialState === undefined || InitialState === null)
		throw new Error("Empty state");

	if (CanvasId === undefined || CanvasId === null)
		throw new Error("Empty canvas");

	if (Loader === undefined || Loader === null)
		throw new Error("Empty loader");

	this.cZoom = Zoom || 1;
	this.cGameFramerate = GameFramerate || 60;
	this.cFlashFramerate = FlashFramerate || 30;
	this.cUseSystemCursor = (UseSystemCursor === undefined) ? true : UseSystemCursor;
	this.cScaleMode = ScaleMode || Flixel.FlxCamera.NO_SCALE;
	this.cGameSizeX = GameSizeX;
	this.cGameSizeY = GameSizeY;
	this.cInitialState = InitialState;
	this.cCanvasId = CanvasId;
	this.cLoader = Loader;

	var _this = this;
	this._onBoot = function()
	{
		_this.boot();
	};

	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		window.setTimeout(this._onBoot, 0);
	} else {
		document.addEventListener('DOMContentLoaded', this._onBoot, false);
		window.addEventListener('load', this._onBoot, false);
	}
};

// Constructor stuff
/**
 * The game canvas id.
 */
Flixel.FlxGame.prototype.cCanvasId = null;
/**
 * The game resource loader.
 */
Flixel.FlxGame.prototype.cLoader = null;
/**
 * The game size X.
 */
Flixel.FlxGame.prototype.cGameSizeX = 0;
/**
 * The game size Y.
 */
Flixel.FlxGame.prototype.cGameSizeY = 0;
/**
 * The game initial state.
 */
Flixel.FlxGame.prototype.cInitialState = null;
/**
 * The game zoom.
 */
Flixel.FlxGame.prototype.cZoom = 0;
/**
 * The game frame rate.
 */
Flixel.FlxGame.prototype.cGameFramerate = 0;
/**
 * The game flash frame rate.
 */
Flixel.FlxGame.prototype.cFlashFramerate = 0;
/**
 * The game uses the system cursor.
 */
Flixel.FlxGame.prototype.cUseSystemCursor = false;
/**
 * The game scale mode.
 */
Flixel.FlxGame.prototype.cScaleMode = 0;

// Normal stuff
/**
 * If we are going to use the spasl screen or not.
 */
Flixel.FlxGame.useSplashScreen = true;
/**
 * The game canvas element.
 */
Flixel.FlxGame.prototype.stage = null;
/**
 * The game resource loader.
 */
Flixel.FlxGame.prototype.loader = null;
/**
 * The setInterval value for loading stuff.
 */
Flixel.FlxGame.prototype.loadingInterval = 0;
/**
 * Sets 0, -, and + to control the global volume sound volume.
 * 
 * @default true
 */
Flixel.FlxGame.prototype.useSoundHotKeys = false;
/**
 * Tells flixel to use the default system mouse cursor instead of custom Flixel
 * mouse cursors.
 * 
 * @default false
 */
Flixel.FlxGame.prototype.useSystemCursor = false;
/**
 * Initialize and allow the flixel debugger overlay even in release mode. Also
 * useful if you don't use FlxPreloader!
 * 
 * @default false
 */
Flixel.FlxGame.prototype.forceDebugger = false;
/**
 * Current game state.
 */
Flixel.FlxGame.prototype._state = null;
/**
 * Mouse cursor.
 */
Flixel.FlxGame.prototype._mouse = null;
/**
 * Class type of the initial/first game state for the game, usually MenuState or
 * something like that.
 */
Flixel.FlxGame.prototype._iState = null;
/**
 * Whether the game object's basic initialization has finished yet.
 */
Flixel.FlxGame.prototype._created = false;
/**
 * Total number of milliseconds elapsed since game start.
 */
Flixel.FlxGame.prototype._total = 0;
/**
 * Total number of milliseconds elapsed since last update loop. Counts down as
 * we step through the game loop.
 */
Flixel.FlxGame.prototype._accumulator = 0;
/**
 * Whether the Flash player lost focus.
 */
Flixel.FlxGame.prototype._lostFocus = false;
/**
 * Milliseconds of time per step of the game loop. event.g. 60 fps = 16ms.
 */
Flixel.FlxGame.prototype._step = 0;
/**
 * Framerate of the Flash player (NOT the game loop). Default = 30.
 */
Flixel.FlxGame.prototype._flashFramerate = 0;
/**
 * Max allowable accumulation (see _accumulator). Should always (and
 * automatically) be set to roughly 2x the flash player framerate.
 */
Flixel.FlxGame.prototype._maxAccumulation = 0;
/**
 * If a state change was requested, the new state object is stored here until we
 * switch to it.
 */
Flixel.FlxGame.prototype._requestedState = null;
/**
 * A flag for keeping track of whether a game reset was requested or not.
 */
Flixel.FlxGame.prototype._requestedReset = false;
/**
 * The "focus lost" screen (see <code>createFocusScreen()</code>).
 */
Flixel.FlxGame.prototype._focus = null;
/**
 * The sound tray display container (see <code>createSoundTray()</code>).
 */
Flixel.FlxGame.prototype._soundTray = null;
/**
 * Helps us auto-hide the sound tray after a volume change.
 */
Flixel.FlxGame.prototype._soundTrayTimer = 0;
/**
 * Helps display the volume bars on the sound tray.
 */
Flixel.FlxGame.prototype._soundTrayBars = null;
/**
 * The debugger overlay object.
 */
Flixel.FlxGame.prototype._debugger = null;
/**
 * A handy boolean that keeps track of whether the debugger exists and is
 * currently visible.
 */
Flixel.FlxGame.prototype._debuggerUp = false;
/**
 * Container for a game replay object.
 */
Flixel.FlxGame.prototype._replay = null;
/**
 * Flag for whether a playback of a recording was requested.
 */
Flixel.FlxGame.prototype._replayRequested = false;
/**
 * Flag for whether a new recording was requested.
 */
Flixel.FlxGame.prototype._recordingRequested = false;
/**
 * Flag for whether a replay is currently playing.
 */
Flixel.FlxGame.prototype._replaying = false;
/**
 * Flag for whether a new recording is being made.
 */
Flixel.FlxGame.prototype._recording = false;
/**
 * Array that keeps track of keypresses that can cancel a replay. Handy for
 * skipping cutscenes or getting out of attract modes!
 */
Flixel.FlxGame.prototype._replayCancelKeys = null;
/**
 * Helps time out a replay if necessary.
 */
Flixel.FlxGame.prototype._replayTimer = 0;
/**
 * This function, if set, is triggered when the callback stops playing.
 */
Flixel.FlxGame.prototype._replayCallback = null;
/**
 * The pause state.
 */
Flixel.FlxGame.prototype._pause = null;
/**
 * If we have booted the game.
 */
Flixel.FlxGame.prototype.isBooted = false;
/**
 * The wrong orientation sprite.<br>
 * You can define it using the scale manager (Flixel.FlxG.scaleManager).
 */
Flixel.FlxGame.prototype.orientationSprite = null;

/**
 * The boot function.
 */
Flixel.FlxGame.prototype.boot = function()
{
	if (this.isBooted) {
		return;
	}

	// Check if we have a body
	if (!document.body) {
		window.setTimeout(this._onBoot, 20); // Delay the boot
	} else {
		document.removeEventListener('DOMContentLoaded', this._onBoot);
		window.removeEventListener('load', this._onBoot);

		// Run the device tests
		Flixel.FlxG.device = new Device();

		// Super high priority init stuff (focus, mouse, etc)
		this._lostFocus = false;
		this._focus = new BitmapData();
		this._focus.visible = false;
		this._soundTray = new BitmapData();
		this._mouse = new BitmapData();
		this.isBooted = true;
		this.loader = this.cLoader;
		Flixel.FlxG.loaderCache = new Cache(); // Initialize the loader cache

		// Initialize the sound manager
		Flixel.FlxG.soundManager = new SoundManager();
		Flixel.FlxG.soundManager.boot();

		// Basic display and update setup stuff
		this.stage = document.getElementById(this.cCanvasId);
		if (this.stage !== null) {
			Flixel.FlxG.screenWidth = this.stage.width;
			Flixel.FlxG.screenHeight = this.stage.height;
		}

		// Prepare the canvas stuff
		this.stage.style.display = 'block';
		this.stage.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
		this.stage.style.msTouchAction = 'none';
		this.stage.style['ms-touch-action'] = 'none';
		this.stage.style['-ms-touch-action'] = 'none';
		this.stage.style['-ms-content-zooming'] = 'none';
		this.stage.style['touch-action'] = 'none';
		this.stage.style['-webkit-touch-callout'] = 'none';
		this.stage.style['-webkit-user-select'] = 'none';
		this.stage.style['-khtml-user-select'] = 'none';
		this.stage.style['-moz-user-select'] = 'none';
		this.stage.style['-ms-user-select'] = 'none';
		this.stage.style['user-select'] = 'none';
		this.stage.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

		// Initialize FlxG stuff
		Flixel.FlxG.init(this, this.cGameSizeX, this.cGameSizeY, this.cZoom, this.cScaleMode);
		Flixel.FlxG.setFramerate(this.cGameFramerate);
		Flixel.FlxG.setFlashFramerate(this.cFlashFramerate);

		// Basic stuff
		this._accumulator = this._step;
		this._total = 0;
		this._state = null;
		this.useSoundHotKeys = true;
		this.useSystemCursor = this.cUseSystemCursor;
		// if (!this.useSystemCursor)
		// flash.ui.Mouse.hide();
		this.forceDebugger = false;
		this._debuggerUp = false;

		// Replay data
		this._replay = new Flixel.system.FlxReplay();
		this._replayRequested = false;
		this._recordingRequested = false;
		this._replaying = false;
		this._recording = false;

		// then get ready to create the game object for real
		if (Flixel.FlxGame.useSplashScreen) {
			this._iState = new Flixel.plugin.FlxSplashScreen();
			Flixel.plugin.FlxSplashScreen.initialGameState = this.cInitialState;
		} else {
			this._iState = this.cInitialState;
		}
		this._requestedState = null;
		this._requestedReset = true;
		this._created = false;

		this.create(); // Call the create method (We simulate here the 1st
						// frame)
	}
};

/**
 * Makes the little volume tray slide out.
 * 
 * @param Silent
 *            Whether or not it should beep.
 */
Flixel.FlxGame.prototype.showSoundTray = function(Silent)
{
	Silent = Silent || false;

//	if (!Silent)
//		Flixel.FlxG.play(SndBeep);

	this._soundTrayTimer = 1;
	this._soundTray.y = 0;
	this._soundTray.visible = true;
	var globalVolume = int(Flixel.FlxG.getMusicVolume() * 10);
	if (Flixel.FlxG.getMute())
		globalVolume = 0;

	for (var i = 0; i < this._soundTrayBars.length; i++) {
		if (i < globalVolume)
			this._soundTrayBars[i].alpha = 1;
		else
			this._soundTrayBars[i].alpha = 0.5;
	}
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Keyboard event.
 */
Flixel.FlxGame.prototype.handleKeyUp = function(event)
{
	if (this._debuggerUp && this._debugger.watch.editing)
		return;
	if (!Flixel.FlxG.mobile) {
		if ((this._debugger !== null) && ((event.keyCode == 222 /* Keyboard.BACKQUOTE */) || (event.keyCode == 220 /* Keyboard.BACKSLASH */) || (event.keyCode == 119 /* Keyboard.F8 */))) {
			this._debugger.visible = !this._debugger.visible;
			this._debuggerUp = this._debugger.visible;
			// if (this._debugger.visible)
			// flash.ui.Mouse.show();
			// else if (!this.useSystemCursor)
			// flash.ui.Mouse.hide();
			// _console.toggle();
			return;
		}
		if (this.useSoundHotKeys) {
			var c = event.keyCode;
			// var code = String.fromCharCode(event.charCode);
			switch (c) {
				case 48 /* Keyboard.NUMBER_0* */:
				case 96 /* Keyboard.NUMPAD_0 */:
					Flixel.FlxG.setMute(!Flixel.FlxG.getMute());
					Flixel.FlxG.onChange(Flixel.FlxG.getMute() ? 0 : Flixel.FlxG.getMusicVolume(),
							Flixel.FlxSound.ALL);
					this.showSoundTray();
					return;
				case 109 /* Keyboard.NUMPAD_SUBTRACT */:
				case 173 /* Keyboard.MINUS */:
					Flixel.FlxG.setMute(false);
					Flixel.FlxG.setMusicVolume(Flixel.FlxG.getMusicVolume() - 0.1);
					this.showSoundTray();
					return;
				case 171 /* Keyboard.NUMPAD_ADD */:
				case 107 /* Keyboard.EQUAL */:
					Flixel.FlxG.setMute(false);
					Flixel.FlxG.setMusicVolume(Flixel.FlxG.getMusicVolume() + 0.1);
					this.showSoundTray();
					return;
				default:
					break;
			}
		}
	}

	if (this._replaying)
		return;

	event.stopPropagation();
	event.preventDefault();

	Flixel.FlxG.keys.handleKeyUp(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Keyboard event.
 */
Flixel.FlxGame.prototype.handleKeyDown = function(event)
{
	if (this._debuggerUp && this._debugger.watch.editing)
		return;

	var c = event.keyCode;
	// var code = String.fromCharCode(event.charCode);
	// Handle pause game keys
	if ((/* c == Keyboard.MENU || */c == 112 /* Keyboard.F1 */|| c == 27 /* Keyboard.ESCAPE */) && !Flixel.FlxG.getDisablePause()) {
		if (!Flixel.FlxG.getPause())
			this.onFocusLost();
		else
			this.onFocus();
	}

	// Handle Android back key
	// TODO: Fix or remove
	// if(KeyCode == Keys.BACK)
	// {
	// // Check in case of fast touch
	// if(FlxG.stateStack !== null) {
	// // Check the stack of states first to prevent infinite loops
	// if(FlxG.stateStack.size() === 0)
	// FlxG.stateStack.setBackKeyMode(FlxStateStack.NORMAL);
	//
	// Make the correct action
	// if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.NORMAL) {
	// Gdx.app.exit();
	// } else if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.DIRECT_BACK)
	// {
	// if(FlxG.getPause())
	// FlxG.setPause(false);
	// FlxG.previousGameState();
	// } else if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.DISABLED) {
	// Do nothing
	// } else if(FlxG.stateStack.getBackKeyMode() == FlxStateStack.PAUSE_GAME) {
	// FlxG.setPause(!FlxG.getPause());
	// FlxG.stateStack.setBackKeyMode(FlxStateStack.DIRECT_BACK);
	// }
	// }
	// }

	if (this._replaying && (this._replayCancelKeys !== null) && (this._debugger === null) && (event.keyCode != 222 /* Keyboard.BACKQUOTE */) && (event.keyCode != 220 /* Keyboard.BACKSLASH */)) {
		// var cancel = false;
		var replayCancelKey;
		var i = 0;
		var l = this._replayCancelKeys.length;
		while (i < l) {
			replayCancelKey = this._replayCancelKeys[i++];
			if ((replayCancelKey == "ANY") || (Flixel.FlxG.keys.getKeyCode(replayCancelKey) == event.keyCode)) {
				if (this._replayCallback !== null) {
					this._replayCallback.callback();
					this._replayCallback = null;
				} else
					Flixel.FlxG.stopReplay();
				break;
			}
		}
		return;
	}

	event.stopPropagation();
	event.preventDefault();

	Flixel.FlxG.keys.handleKeyDown(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseDown = function(event)
{
	if (this._debuggerUp) {
		if (this._debugger.hasMouse)
			return;
		if (this._debugger.watch.editing)
			this._debugger.watch.submit();
	}

	if (this._replaying && (this._replayCancelKeys !== null)) {
		var replayCancelKey;
		var i = 0;
		var l = this._replayCancelKeys.length;

		while (i < l) {
			replayCancelKey = this._replayCancelKeys[i++];
			if ((replayCancelKey == "MOUSE") || (replayCancelKey == "ANY")) {
				if (this._replayCallback !== null) {
					this._replayCallback.callback();
					this._replayCallback = null;
				} else
					Flixel.FlxG.stopReplay();
				break;
			}
		}
		return;
	}

	event.preventDefault();
	Flixel.FlxG.mouse.handleMouseDown(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseUp = function(event)
{
	if ((this._debuggerUp && this._debugger.hasMouse) || this._replaying)
		return;

	event.preventDefault();
	Flixel.FlxG.mouse.handleMouseUp(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseWheel = function(event)
{
	if ((this._debuggerUp && this._debugger.hasMouse) || this._replaying)
		return;

	event.preventDefault();
	Flixel.FlxG.mouse.handleMouseWheel(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Mouse event.
 */
Flixel.FlxGame.prototype.handleMouseMove = function(event)
{
	if ((this._debuggerUp && this._debugger.hasMouse) || this._replaying)
		return;
	Flixel.FlxG.mouse.handleMouseMove(event);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Focus event.
 */
Flixel.FlxGame.prototype.onFocus = function(event)
{
	// if (!this._debuggerUp && !this.useSystemCursor)
	// flash.ui.Mouse.hide();
	Flixel.FlxG.resetInput();

	if (this._focus !== null)
		this._lostFocus = this._focus.visible = false;
	// NOT NEEDED: this.stage.frameRate = this._flashFramerate;
	Flixel.FlxG.setPause(false);
};

/**
 * Internal event handler for input and focus.
 * 
 * @param event
 *            Focus lost event.
 */
Flixel.FlxGame.prototype.onFocusLost = function(event)
{
	if ((this.x !== 0) || (this.y !== 0)) {
		this.x = 0;
		this.y = 0;
	}
	// flash.ui.Mouse.show();
	if (this._focus !== null)
		this._lostFocus = this._focus.visible = true;

	// NOT NEEDED: stage.frameRate = 10;
	Flixel.FlxG.setPause(true);
};

/**
 * Handles the onEnterFrameLoading call and figures out how many updates and
 * draw calls to do.
 */
Flixel.FlxGame.prototype.onEnterFrameLoading = function()
{
	var percentage = this.loader.getPercentage();
	var barHeight = 20;
	var barWidth = 100;

	// Calculate the progress
	var progress = Math.floor((percentage / 100) * barWidth);

	// Clear the screen
	var ctx = this.stage.getContext("2d");
	ctx.clearRect(0, 0, Flixel.FlxG.width, Flixel.FlxG.height);
	ctx.fillStyle = "#202020";
	ctx.fillRect(0, 0, Flixel.FlxG.width, Flixel.FlxG.height);

	// Draw the progress bar
	ctx.fillStyle = "black";
	ctx.fillRect((Flixel.FlxG.width / 2) - (barWidth / 2), (Flixel.FlxG.height / 2) - (barHeight / 2), barWidth,
			barHeight);
	ctx.fillStyle = "#55aa00";
	ctx.fillRect((Flixel.FlxG.width / 2) - (barWidth / 2), (Flixel.FlxG.height / 2) - (barHeight / 2), progress,
			barHeight);

	// Draw the loading text
	ctx.font = "40px sans-serif";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Loading...", (Flixel.FlxG.width / 2) - (ctx.measureText("Loading...").width / 2),
			Flixel.FlxG.height - 60);
};

/**
 * Handles the onEnterFrame call and figures out how many updates and draw calls
 * to do.
 */
Flixel.FlxGame.prototype.onEnterFrame = function()
{
	var mark = getTimer();
	var elapsedMS = mark - this._total;
	this._total = mark;

	this.updateSoundTray(elapsedMS);

	if (!this._lostFocus) {
		if ((this._debugger !== null) && this._debugger.vcr.paused) {
			if (this._debugger.vcr.stepRequested) {
				this._debugger.vcr.stepRequested = false;
				this.step();
			}
		} else {
			this._accumulator += elapsedMS;
			if (this._accumulator > this._maxAccumulation)
				this._accumulator = this._maxAccumulation;
			while (this._accumulator >= this._step) {
				this.step();
				this._accumulator = this._accumulator - this._step;
			}
		}

		Flixel.FlxBasic.VISIBLECOUNT = 0;
		this.draw();

		if (this._debuggerUp) {
			this._debugger.perf.flash(elapsedMS);
			this._debugger.perf.visibleObjects(Flixel.FlxBasic.VISIBLECOUNT);
			this._debugger.perf.update();
			this._debugger.watch.update();
		}
	} else if (this._pause.visible && Flixel.FlxG.getPause()) {
		Flixel.FlxBasic.VISIBLECOUNT = 0;
		this.draw();
	}
};

/**
 * If there is a state change requested during the update loop, this function
 * handles actual destroying the old state and related processes, and calls
 * creates on the new state and plugs it into the game object.
 */
Flixel.FlxGame.prototype.switchState = function()
{
	// Basic reset stuff
	Flixel.FlxG.resetCameras();
	Flixel.FlxG.resetInput();
	Flixel.FlxG.destroySounds();
	Flixel.FlxG.clearBitmapCache();

	// Clear the debugger overlay's Watch window
	if (this._debugger !== null)
		this._debugger.watch.removeAll();

	// Clear any timers left in the timer manager
	var timerManager = Flixel.plugin.FlxTimer.getManager();
	if (timerManager !== null)
		timerManager.clear();

	// Destroy the old state (if there is an old state)
	if (this._state !== null) {
		this._state.destroy();
		this._pause.secureClear();
		this._state = null;
	}

	// Finally assign and create the new state
	this._state = this._requestedState;
	this._state.create();
};

/**
 * This is the main game update logic section. The onEnterFrame() handler is in
 * charge of calling this the appropriate number of times each frame. This block
 * handles state changes, replays, all that good stuff.
 */
Flixel.FlxGame.prototype.step = function()
{
	// Handle game reset request
	if (this._requestedReset) {
		this._requestedReset = false;
		this._requestedState = new this._iState.constructor();
		this._replayTimer = 0;
		this._replayCancelKeys = null;
		Flixel.FlxG.reset();
	}

	// Handle replay-related requests
	if (this._recordingRequested) {
		this._recordingRequested = false;
		this._replay.create(Flixel.FlxG.globalSeed);
		this._recording = true;
		if (this._debugger !== null) {
			this._debugger.vcr.recording();
			Flixel.FlxG.log("Flixel: starting new flixel gameplay record.");
		}
	} else if (this._replayRequested) {
		this._replayRequested = false;
		this._replay.rewind();
		Flixel.FlxG.globalSeed = this._replay.seed;
		if (this._debugger !== null)
			this._debugger.vcr.playing();
		this._replaying = true;
	}

	// Handle state switching requests
	if (this._state != this._requestedState)
		this.switchState();

	// Finally actually step through the game physics
	Flixel.FlxBasic.ACTIVECOUNT = 0;
	if (this._replaying) {
		this._replay.playNextFrame();

		if (this._replayTimer > 0) {
			this._replayTimer -= this._step;
			if (this._replayTimer <= 0) {
				if (this._replayCallback !== null) {
					this._replayCallback.callback();
					this._replayCallback = null;
				} else
					Flixel.FlxG.stopReplay();
			}
		}

		if (this._replaying && this._replay.finished) {
			Flixel.FlxG.stopReplay();
			if (this._replayCallback !== null) {
				this._replayCallback.callback();
				this._replayCallback = null;
			}
		}

		if (this._debugger !== null)
			this._debugger.vcr.updateRuntime(this._step);
	} else
		Flixel.FlxG.updateInput();

	if (this._recording) {
		this._replay.recordFrame();
		if (this._debugger !== null)
			this._debugger.vcr.updateRuntime(this._step);
	}

	this.update();
	Flixel.FlxG.mouse.wheel = 0;
	if (this._debuggerUp)
		this._debugger.perf.activeObjects(Flixel.FlxBasic.ACTIVECOUNT);
};

/**
 * This function just updates the soundtray object.
 */
Flixel.FlxGame.prototype.updateSoundTray = function(MS)
{
	// Animate stupid sound tray thing

	if (this._soundTray !== null) {
		if (this._soundTrayTimer > 0)
			this._soundTrayTimer -= MS / 1000;
		else if (this._soundTray.y > -this._soundTray.height) {
			this._soundTray.y -= (MS / 1000) * Flixel.FlxG.height * 2;
			if (this._soundTray.y <= -this._soundTray.height) {
				this._soundTray.visible = false;

				// Save sound preferences
				var soundPrefs = new Flixel.FlxSave();
				if (soundPrefs.bind("Flixel")) {
					if (soundPrefs.data.sound === null)
						soundPrefs.data.sound = {};
					soundPrefs.data.sound.mute = Flixel.FlxG.getMute();
					soundPrefs.data.sound.musicVolume = Flixel.FlxG.getMusicVolume();
					soundPrefs.data.sound.soundVolume = Flixel.FlxG.getSoundVolume();
					soundPrefs.close();
				}
			}
		}
	}
};

/**
 * This function is called by step() and updates the actual game state. May be
 * called multiple times per "frame" or draw call.
 */
Flixel.FlxGame.prototype.update = function()
{
	var mark = getTimer();
	Flixel.FlxG.elapsed = Flixel.FlxG.timeScale * (this._step / 1000);

	// Update the pause stuff if needed
	if (Flixel.FlxG.getPause()) {
		this._pause.update();
		return;
	}

	// Update the wrong orientation stuff if needed
	if(this.orientationSprite && this.orientationSprite.visible === true) {
		this.orientationSprite.update();
		return;
	}

	Flixel.FlxG.updateSounds();
	this._state.preProcess(); // Execute the pre-process stuff
	Flixel.FlxG.updatePlugins();
	this._state.update();
	Flixel.FlxG.updateCameras();

	// TODO: temporary key for turning on debug, delete when FlxDebugger
	// complete
	if (Flixel.FlxG.keys.justPressed("F2") && (Flixel.FlxG.debug || this.forceDebugger))
		Flixel.FlxG.visualDebug = !Flixel.FlxG.visualDebug;

	if (this._debuggerUp)
		this._debugger.perf.flixelUpdate(getTimer() - mark);

	this._state.postProcess(); // Execute the post process stuff.
};

/**
 * Goes through the game state and draws all the game objects and special
 * effects.
 */
Flixel.FlxGame.prototype.draw = function()
{
	if (Flixel.FlxG.getPause() && Flixel.FlxG.debug)
		return;

	var mark = getTimer();
	var i = 0;
	var l = Flixel.FlxG.displayList.length;

	// getContext 2d
	var ctx = this.stage.getContext("2d");
	ctx.clearRect(0, 0, Flixel.FlxG.width, Flixel.FlxG.height);

	while (i < l) {
		Flixel.FlxG.activeCamera = Flixel.FlxG.displayList[i++];

		Flixel.FlxG.lockCameras();
		this._state.draw();

		// Draw the pause menu
		if (Flixel.FlxG.getPause() && this._pause.size() > 0) {
			this._pause.draw();
		}
		
		// Draw the wrong orientation stuff
		if(this.orientationSprite && this.orientationSprite.visible === true)
			this.orientationSprite.draw();

		Flixel.FlxG.unlockCameras();

		Flixel.FlxG.drawPlugins();

		// ctx.drawImage(img, imgStartX, imgStartY,
		// imageWidth, imageHeight,
		// targetX, targetY,
		// finalWidth, finalHeight);

		ctx.drawImage(Flixel.FlxG.activeCamera.buffer._canvas, 0, 0, Flixel.FlxG.activeCamera.width,
				Flixel.FlxG.activeCamera.height, Flixel.FlxG.activeCamera.x, Flixel.FlxG.activeCamera.y,
				Flixel.FlxG.activeCamera.width, Flixel.FlxG.activeCamera.height);
	}

	if (this._debuggerUp)
		this._debugger.perf.flixelDraw(getTimer() - mark);
};

/**
 * Used to instantiate the guts of the flixel game object once we have a valid
 * reference to the root.
 * 
 * @param event
 *            Just a Flash system event, not too important for our purposes.
 */
Flixel.FlxGame.prototype.create = function()
{
	this._total = getTimer();

	// Calculate the canvas offset
	CanvasManager.getOffset(this.stage, Flixel.FlxG.mouse.offset);

	// Add basic input event listeners and mouse container
	window.addEventListener("mousedown", this.handleMouseDown.bind(this), true);
	window.addEventListener("mouseup", this.handleMouseUp.bind(this), true);
	window.addEventListener("mousemove", this.handleMouseMove.bind(this), true);

	window.addEventListener("mousewheel", this.handleMouseWheel.bind(this), true);
	window.addEventListener("DOMMouseScroll", this.handleMouseWheel.bind(this), true);

	window.addEventListener("keydown", this.handleKeyDown.bind(this), false);
	window.addEventListener("keyup", this.handleKeyUp.bind(this), false);

	// Focus gained/lost monitoring
	window.addEventListener("blur", this.onFocusLost.bind(this), false);
	window.addEventListener("focus", this.onFocus.bind(this), false);

	this.createFocusScreen();

	// Set up mouse basics
	this.mouseX = -1;
	this.mouseY = -1;

	// Let mobile devs opt out of unnecessary overlays.
	if (Flixel.FlxG.mobile) {
		// Normal people pointers ._.
		window.addEventListener('touchstart', this.handleMouseDown.bind(this), true);
		window.addEventListener('touchend', this.handleMouseUp.bind(this), true);
		window.addEventListener('touchmove', this.handleMouseMove.bind(this), true);

		// Stupid Microsoft pointers
		window.addEventListener('MSPointerMove', this.handleMouseMove.bind(this), true);
		window.addEventListener('MSPointerDown', this.handleMouseDown.bind(this), true);
		window.addEventListener('MSPointerUp', this.handleMouseUp.bind(this), true);

		// More Stupid Microsoft shit <.< Why change the name, why!?!?!?!
		window.addEventListener('pointerMove', this.handleMouseMove.bind(this), true);
		window.addEventListener('pointerDown', this.handleMouseDown.bind(this), true);
		window.addEventListener('pointerUp', this.handleMouseUp.bind(this), true);
	} else {
		// Debugger overlay
		if (Flixel.FlxG.debug || this.forceDebugger) {
//			this._debugger = new FlxDebugger(Flixel.FlxG.width * Flixel.FlxCamera.defaultZoom, Flixel.FlxG.height * Flixel.FlxCamera.defaultZoom);
//			addChild(this._debugger);
		}

		// Volume display tab
		this.createSoundTray();
	}

	this._pause = new Flixel.plugin.FlxPause(); // Initialize the pause
													// group

	// Finally, set up an event for the actual game loop stuff.
	// addEventListener(Event.ENTER_FRAME, onEnterFrame);

	// Framerate is in FPS, but setInterval wants milliseconds between frames
	// this.update.periodical(1000 * (1 / this.framerate), this);
	this.framerate = 60;
	var _this = this;
	this.loader.onAllLoaded = function()
	{
		clearInterval(_this.loadingInterval);
		setInterval(_this.onEnterFrame.bind(_this), 1000 * (1 / _this.framerate));
	};
	this.loadingInterval = setInterval(this.onEnterFrameLoading.bind(this), 1000 * (1 / this.framerate));
	this.loader.cache = Flixel.FlxG.loaderCache;
	this.loader.start();
};

/**
 * Sets up the "sound tray", the little volume meter that pops down sometimes.
 */
Flixel.FlxGame.prototype.createSoundTray = function()
{
	// TODO: Complete
	// _soundTray.visible = false;
	// _soundTray.scaleX = 2;
	// _soundTray.scaleY = 2;
	// var tmp:Bitmap = new Bitmap(new BitmapData(80,30,true,0x7F000000));
	// _soundTray.x =
	// (FlxG.width/2)*FlxCamera.defaultZoom-(tmp.width/2)*_soundTray.scaleX;
	// _soundTray.addChild(tmp);
	//	
	// var text:TextField = new TextField();
	// text.width = tmp.width;
	// text.height = tmp.height;
	// text.multiline = true;
	// text.wordWrap = true;
	// text.selectable = false;
	// text.embedFonts = true;
	// text.antiAliasType = AntiAliasType.NORMAL;
	// text.gridFitType = GridFitType.PIXEL;
	// text.defaultTextFormat = new
	// TextFormat("system",8,0xffffff,null,null,null,null,null,"center");;
	// _soundTray.addChild(text);
	// text.text = "VOLUME";
	// text.y = 16;
	//	
	// var bx:uint = 10;
	// var by:uint = 14;
	// _soundTrayBars = [];
	// var i:uint = 0;
	// while(i < 10)
	// {
	// tmp = new Bitmap(new BitmapData(4,++i,false,0xffffff));
	// tmp.x = bx;
	// tmp.y = by;
	// _soundTrayBars.push(_soundTray.addChild(tmp));
	// bx += 6;
	// by--;
	// }
	//	
	// _soundTray.y = -_soundTray.height;
	// _soundTray.visible = false;
	// addChild(_soundTray);
	//	
	// // load saved sound preferences for this game if they exist
	// var soundPrefs:FlxSave = new FlxSave();
	// if(soundPrefs.bind("Flixel") && (soundPrefs.data.sound !== null))
	// {
	// if(soundPrefs.data.sound.musicVolume !== null)
	// FlxG.setMusicVolume(soundPrefs.data.sound.musicVolume);
	// if(soundPrefs.data.sound.soundVolume !== null)
	// FlxG.setSoundVolume(soundPrefs.data.sound.soundVolume);
	// if(soundPrefs.data.sound.mute !== null)
	// FlxG.setMute(soundPrefs.data.sound.mute);
	// soundPrefs.destroy();
	// }
};

/**
 * Sets up the darkened overlay with the big white "play" button that appears
 * when a flixel game loses focus.
 */
Flixel.FlxGame.prototype.createFocusScreen = function()
{
	// TODO: Complete
	// var gfx:Graphics = _focus.graphics;
	// var screenWidth:uint = FlxG.width*FlxCamera.defaultZoom;
	// var screenHeight:uint = FlxG.height*FlxCamera.defaultZoom;
	//	
	// // draw transparent black backdrop
	// gfx.moveTo(0,0);
	// gfx.beginFill(0,0.5);
	// gfx.lineTo(screenWidth,0);
	// gfx.lineTo(screenWidth,screenHeight);
	// gfx.lineTo(0,screenHeight);
	// gfx.lineTo(0,0);
	// gfx.endFill();
	//	
	// // draw white arrow
	// var halfWidth:uint = screenWidth/2;
	// var halfHeight:uint = screenHeight/2;
	// var helper:uint = FlxU.min(halfWidth,halfHeight)/3;
	// gfx.moveTo(halfWidth-helper,halfHeight-helper);
	// gfx.beginFill(0xffffff,0.65);
	// gfx.lineTo(halfWidth+helper,halfHeight);
	// gfx.lineTo(halfWidth-helper,halfHeight+helper);
	// gfx.lineTo(halfWidth-helper,halfHeight-helper);
	// gfx.endFill();
	//	
	// var logo:Bitmap = new ImgLogo();
	// logo.scaleX = int(helper/10);
	// if(logo.scaleX < 1)
	// logo.scaleX = 1;
	// logo.scaleY = logo.scaleX;
	// logo.x -= logo.scaleX;
	// logo.alpha = 0.35;
	// _focus.addChild(logo);
	//
	// addChild(_focus);
};

/**
 * Returns the class name.
 */
Flixel.FlxGame.prototype.toString = function()
{
	return "FlxGame";
};