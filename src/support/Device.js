/**
 * Detects device support capabilities.<br>
 * Using some elements from System.js by MrDoob and Modernizr<br>
 * Took from Phaser.<br>
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * Class constructor.<br>
 * Runs all the tests.
 */
var Device = function()
{
	// Run the checks
	this.checkAudio();
	this.checkBrowser();
	this.checkCSS3D();
	this.checkDevice();
	this.checkFeatures();
	this.checkOS();
};

/**
 * An optional 'fix' for the horrendous Android stock browser bug
 * https://code.google.com/p/android/issues/detail?id=39247
 * 
 * @property {boolean} patchAndroidClearRectBug - Description.
 * @default
 */
Device.prototype.patchAndroidClearRectBug = false;

// Operating System

/**
 * @property {boolean} desktop - Is running desktop?
 * @default
 */
Device.prototype.desktop = false;

/**
 * @property {boolean} iOS - Is running on iOS?
 * @default
 */
Device.prototype.iOS = false;

/**
 * @property {boolean} android - Is running on android?
 * @default
 */
Device.prototype.android = false;

/**
 * @property {boolean} chromeOS - Is running on chromeOS?
 * @default
 */
Device.prototype.chromeOS = false;

/**
 * @property {boolean} linux - Is running on linux?
 * @default
 */
Device.prototype.linux = false;

/**
 * @property {boolean} macOS - Is running on macOS?
 * @default
 */
Device.prototype.macOS = false;

/**
 * @property {boolean} windows - Is running on windows?
 * @default
 */
Device.prototype.windows = false;

/**
 * @property {boolean} firefoxOS - Is running on FirefoxOS phones?
 * @default
 */
Device.prototype.firefoxOS = false;

/**
 * @property {boolean} cocoonJS - Is the game running under CocoonJS?
 * @default
 */
Device.prototype.cocoonJS = false;

// Features

/**
 * @property {boolean} canvas - Is canvas available?
 * @default
 */
Device.prototype.canvas = false;

/**
 * @property {boolean} file - Is file available?
 * @default
 */
Device.prototype.file = false;

/**
 * @property {boolean} fileSystem - Is fileSystem available?
 * @default
 */
Device.prototype.fileSystem = false;

/**
 * @property {boolean} localStorage - Is localStorage available?
 * @default
 */
Device.prototype.localStorage = false;

/**
 * @property {boolean} webGL - Is webGL available?
 * @default
 */
Device.prototype.webGL = false;

/**
 * @property {boolean} worker - Is worker available?
 * @default
 */
Device.prototype.worker = false;

/**
 * @property {boolean} touch - Is touch available?
 * @default
 */
Device.prototype.touch = false;

/**
 * @property {boolean} mspointer - Is mspointer available?
 * @default
 */
Device.prototype.mspointer = false;

/**
 * @property {boolean} css3D - Is css3D available?
 * @default
 */
Device.prototype.css3D = false;

/**
 * @property {boolean} pointerLock - Is Pointer Lock available?
 * @default
 */
Device.prototype.pointerLock = false;

// Browser

/**
 * @property {boolean} arora - Is running in arora?
 * @default
 */
Device.prototype.arora = false;

/**
 * @property {boolean} chrome - Is running in chrome?
 * @default
 */
Device.prototype.chrome = false;

/**
 * @property {boolean} epiphany - Is running in epiphany?
 * @default
 */
Device.prototype.epiphany = false;

/**
 * @property {boolean} firefox - Is running in firefox?
 * @default
 */
Device.prototype.firefox = false;

/**
 * @property {boolean} ie - Is running in ie?
 * @default
 */
Device.prototype.ie = false;

/**
 * @property {number} ieVersion - Version of ie?
 * @default
 */
Device.prototype.ieVersion = 0;

/**
 * @property {boolean} mobileSafari - Is running in mobileSafari?
 * @default
 */
Device.prototype.mobileSafari = false;

/**
 * @property {boolean} midori - Is running in midori?
 * @default
 */
Device.prototype.midori = false;

/**
 * @property {boolean} opera - Is running in opera?
 * @default
 */
Device.prototype.opera = false;

/**
 * @property {boolean} safari - Is running in safari?
 * @default
 */
Device.prototype.safari = false;
Device.prototype.webApp = false;

// Audio

/**
 * @property {boolean} audioData - Are Audio tags available?
 * @default
 */
Device.prototype.audioData = false;

/**
 * @property {boolean} webAudio - Is the WebAudio API available?
 * @default
 */
Device.prototype.webAudio = false;

/**
 * @property {boolean} ogg - Can this device play ogg files?
 * @default
 */
Device.prototype.ogg = false;

/**
 * @property {boolean} opus - Can this device play opus files?
 * @default
 */
Device.prototype.opus = false;

/**
 * @property {boolean} mp3 - Can this device play mp3 files?
 * @default
 */
Device.prototype.mp3 = false;

/**
 * @property {boolean} wav - Can this device play wav files?
 * @default
 */
Device.prototype.wav = false;
/**
 * Can this device play m4a files?
 * 
 * @property {boolean} m4a - True if this device can play m4a files.
 * @default
 */
Device.prototype.m4a = false;

/**
 * @property {boolean} webm - Can this device play webm files?
 * @default
 */
Device.prototype.webm = false;

// Device

/**
 * @property {boolean} iPhone - Is running on iPhone?
 * @default
 */
Device.prototype.iPhone = false;

/**
 * @property {boolean} iPhone4 - Is running on iPhone4?
 * @default
 */
Device.prototype.iPhone4 = false;

/**
 * @property {boolean} iPad - Is running on iPad?
 * @default
 */
Device.prototype.iPad = false;

/**
 * @property {boolean} windowsPhone - Is running on Windows Phone?
 * @default
 */
Device.prototype.windowsPhone = false;

/**
 * @property {number} pixelRatio - PixelRatio of the host device?
 * @default
 */
Device.prototype.pixelRatio = 0;

/**
 * @property {boolean} isMobile - Is running on phones?
 * @default
 */
Device.prototype.isMobile = false;

// Storage stuff
/**
 * Browser Local Storage capabilities <br>
 * (this flag will be set to false if cookies are blocked)
 */
Device.prototype.localStorage = false;

/**
 * Check which OS is game running on.
 * 
 * @method Phaser.Device#_checkOS
 * @private
 */
Device.prototype.checkOS = function()
{

	var ua = navigator.userAgent;

	if (/Android/.test(ua)) {
		this.android = true;
	} else if (/CrOS/.test(ua)) {
		this.chromeOS = true;
	} else if (/iP[ao]d|iPhone/i.test(ua)) {
		this.iOS = true;
	} else if (/Linux/.test(ua)) {
		this.linux = true;
	} else if (/Mac OS/.test(ua)) {
		this.macOS = true;
	} else if (/Windows/.test(ua)) {
		this.windows = true;
	} else if (/Mobile;.*Firefox\/(\d+)/.test(ua)) {
		this.firefoxOS = true;
	} else if(/Windows Phone/i.test(ua)) {
		this.windowsPhone = true;
	}

	if (this.windows || this.macOS || this.linux) {
		this.desktop = true;
	} else {
		// navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows
		// Phone|Mobi/i)
		this.isMobile = this.android || this.iOS || this.firefoxOS || this.windowsPhone || false;
	}

	/*var that = this;
	(function()
	{
		var ua = navigator.userAgent,
			uaHolder = that,
		userAgents = [ {
			platform : "androidChrome",
			regex : /Android .* Chrome\/(\d+)[.\d]+/
		}, {
			platform : "android",
			regex : /Android (\d+)/
		}, {
			platform : "android",
			regex : /Silk\/1./,
			forceVersion : 2,
			extra : {
				silk : 1
			}
		}, {
			platform : "android",
			regex : /Silk\/2./,
			forceVersion : 4,
			extra : {
				silk : 2
			}
		}, {
			platform : "windowsPhone",
			regex : /Windows Phone (?:OS )?(\d+)[.\d]+/
		}, {
			platform : "ie",
			regex : /MSIE (\d+)/
		}, {
			platform : "ios",
			regex : /iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/
		}, {
			platform : "webos",
			regex : /(?:web|hpw)OS\/(\d+)/
		}, {
			platform : "safari",
			regex : /Version\/(\d+)[.\d]+\s+Safari/
		}, {
			platform : "chrome",
			regex : /Chrome\/(\d+)[.\d]+/
		}, {
			platform : "androidFirefox",
			regex : /Android;.*Firefox\/(\d+)/
		}, {
			platform : "firefoxOS",
			regex : /Mobile;.*Firefox\/(\d+)/
		}, {
			platform : "firefox",
			regex : /Firefox\/(\d+)/
		}, {
			platform : "blackberry",
			regex : /BB1\d;.*Version\/(\d+\.\d+)/
		} ];
		for (var uaIndex = 0, curUA, s, o; curUA = userAgents[uaIndex]; uaIndex++) {
			s = curUA.regex.exec(ua);
			if (s) {
				curUA.forceVersion ? o = curUA.forceVersion : o = Number(s[1]), uaHolder[curUA.platform] = o, curUA.extra
						&& enyo.mixin(uaHolder, curUA.extra);
				break;
			}
		}
		enyo.dumbConsole = Boolean(uaHolder.android || uaHolder.ios || uaHolder.webos);
	}());*/

};

/**
 * Check HTML5 features of the host environment.
 * 
 * @method Phaser.Device#_checkFeatures
 * @private
 */
Device.prototype.checkFeatures = function()
{

	this.canvas = !!window.CanvasRenderingContext2D;

	try {
		this.localStorage = !!localStorage.getItem;
	} catch (error) {
		this.localStorage = false;
	}

	this.file = !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob;
	this.fileSystem = !!window.requestFileSystem;
	this.webGL = (function()
	{
		try {
			var canvas = document.createElement('canvas');
			return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
		} catch (e) {
			return false;
		}
	})();

	if (this.webGL === null || this.webGL === false) {
		this.webGL = false;
	} else {
		this.webGL = true;
	}

	this.worker = !!window.Worker;

	if ('ontouchstart' in document.documentElement || window.navigator.msPointerEnabled) {
		this.touch = true;
	}

	if (window.navigator.msPointerEnabled) {
		this.mspointer = true;
	}

	this.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

	try {
		this.localStorage = !!window.localStorage;
	} catch (e) {
		// the above generates an exception when cookies are blocked
		this.localStorage = false;
	}
};

/**
 * Check what browser is game running in.
 * 
 * @method Phaser.Device#_checkBrowser
 * @private
 */
Device.prototype.checkBrowser = function()
{

	var ua = navigator.userAgent;

	if (/Arora/.test(ua)) {
		this.arora = true;
	} else if (/Chrome/.test(ua)) {
		this.chrome = true;
	} else if (/Epiphany/.test(ua)) {
		this.epiphany = true;
	} else if (/Firefox/.test(ua)) {
		this.firefox = true;
	} else if (/Mobile Safari/.test(ua)) {
		this.mobileSafari = true;
	} else if (/MSIE (\d+\.\d+);/.test(ua)) {
		this.ie = true;
		this.ieVersion = parseInt(RegExp.$1);
	} else if (/Midori/.test(ua)) {
		this.midori = true;
	} else if (/Opera/.test(ua)) {
		this.opera = true;
	} else if (/Safari/.test(ua)) {
		this.safari = true;
	}

	// WebApp mode in iOS
	if (navigator.standalone) {
		this.webApp = true;
	}

	if (navigator.isCocoonJS) {
		this.cocoonJS = true;
	}
};

/**
 * Check audio support.
 * 
 * @method Phaser.Device#_checkAudio
 * @private
 */
Device.prototype.checkAudio = function()
{

	this.audioData = !!(window.Audio);
	this.webAudio = !!(window.webkitAudioContext || window.AudioContext);
	var audioElement = document.createElement('audio');

	try {
		var result = !!audioElement.canPlayType;
		if (result) {

			if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
				this.ogg = true;
			}

			if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '')) {
				this.opus = true;
			}

			if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
				this.mp3 = true;
			}

			// Mimetypes accepted:
			// developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
			// bit.ly/iphoneoscodecs
			if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
				this.wav = true;
			}

			if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
				this.m4a = true;
			}

			if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')) {
				this.webm = true;
			}
		}
	} catch (e) {
	}

};

/**
 * Check PixelRatio of devices.
 * 
 * @method Phaser.Device#_checkDevice
 * @private
 */
Device.prototype.checkDevice = function()
{
	this.pixelRatio = window.devicePixelRatio || 1;
	this.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
	this.iPhone4 = (this.pixelRatio == 2 && this.iPhone);
	this.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;
};

/**
 * Check whether the host environment support 3D CSS.
 * 
 * @method Phaser.Device#_checkCSS3D
 * @private
 */
Device.prototype.checkCSS3D = function()
{
	var el = document.createElement('p');
	var has3d = false;
	var transforms = {
		'webkitTransform' : '-webkit-transform',
		'OTransform' : '-o-transform',
		'msTransform' : '-ms-transform',
		'MozTransform' : '-moz-transform',
		'transform' : 'transform'
	};

	// Add it to the body to get the computed style.
	if (document.body !== null)
		document.body.insertBefore(el, null);

	for ( var t in transforms) {
		if (el.style[t] !== undefined) {
			el.style[t] = "translate3d(1px,1px,1px)";
			has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		}
	}

	if (document.body !== null)
		document.body.removeChild(el);
	this.css3D = (has3d !== undefined && has3d !== false && has3d.length > 0 && has3d !== "none");
};

/**
 * Check whether the host environment can play audio.
 * 
 * @method Phaser.Device#canPlayAudio
 * @param {string}
 *            type - One of 'mp3, 'ogg', 'm4a', 'wav', 'webm'.
 * @return {boolean} True if the given file type is supported by the browser,
 *         otherwise false.
 */
Device.prototype.canPlayAudio = function(type)
{
	if (type == 'mp3' && this.mp3) {
		return false;
	} else if (type == 'ogg' && (this.ogg || this.opus)) {
		return false;
	} else if (type == 'm4a' && this.m4a) {
		return true;
	} else if (type == 'wav' && this.wav) {
		return true;
	} else if (type == 'webm' && this.webm) {
		return true;
	} else if (type == 'any') {
		return this.canPlayAudio("mp3") || this.canPlayAudio("ogg") || this.canPlayAudio("m4a") || this.canPlayAudio("wav") || this.canPlayAudio("webm");
	}

	return false;
};

/**
 * Check whether the console is open.
 * 
 * @method Phaser.Device#isConsoleOpen
 * @return {boolean} True if the browser dev console is open.
 */
Device.prototype.isConsoleOpen = function()
{

	if (window.console && window.console.firebug) {
		return true;
	}

	if (window.console) {
		console.profile();
		console.profileEnd();

		if (console.clear) {
			console.clear();
		}

		return console.profiles.length > 0;
	}

	return false;

};

/**
 * Return the device storage
 * 
 * @param type
 *            The type of storage.
 */
Device.prototype.getStorage = function(type)
{
	type = type || "local";

	switch (type) {
		case "local":
			return;

		default:
			break;
	}
	Flixel.FlxG.log("Storage type " + type + " not supported.", "Device");
};