/**
 * Sound Manager constructor.<br>
 * The Sound Manager is responsible for playing back audio<br>
 * via either the Legacy HTML Audio tag or via Web Audio<br>
 * if the browser supports it.<br>
 * <br>
 * Note: On Firefox 25+ on Linux if you have media.gstreamer disabled in<br>
 * about:config then it cannot play back mp3 or m4a files.<br>
 * Took from Phaser.<br>
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var SoundManager = function()
{
	SoundManager.parent.constructor.apply(this);

	this._sounds = [];
	this._volume = 1;
	this.usingWebAudio = true;
	this.connectToMaster = true;
	this.channels = 32;
	this.cache = Flixel.FlxG.loaderCache;
};
extend(SoundManager, Flixel.FlxBasic);

/**
 * @property onSoundDecode - The function called when a sound decodes (typically only for mp3 files)
 */
SoundManager.prototype.onSoundDecode = null;
/**
 * A reference to the loader cache.
 */
SoundManager.prototype.cache = null;
/**
 * If the sound is muted or not.
 */
SoundManager.prototype._muted = false;
/**
 * Internal unlock tracking var.
 */
SoundManager.prototype._unlockSource = null;
/**
 * The global audio volume.<br>
 * A value between 0 (silence) and 1 (full volume).
 */
SoundManager.prototype._volume = 0;
/**
 * An array containing all the sounds
 */
SoundManager.prototype._sounds = null;
/**
 * The AudioContext being used for playback.
 */
SoundManager.prototype.context = null;
/**
 * True if SoundManager.prototype sound is being played with Web Audio.
 */
SoundManager.prototype.usingWebAudio = false;
/**
 * True if the sound is being played via the Audio tag.
 */
SoundManager.prototype.usingAudioTag = false;
/**
 * Has audio been disabled via the Flixel object?<br>
 * Useful if you need to use a 3rd party audio library instead.
 */
SoundManager.prototype.noAudio = false;
/**
 * Used in conjunction with Sound.externalNode SoundManager.prototype<br>
 * allows you to stop a Sound node being connected to the SoundManager master gain node.
 */
SoundManager.prototype.connectToMaster = false;
/**
 * True if the audio system is currently locked awaiting a touch event.
 */
SoundManager.prototype.touchLocked = false;
/**
 * The number of audio channels to use in playback.
 */
SoundManager.prototype.channels = 0;

/**
 * Initializes the sound manager.
 */
SoundManager.prototype.boot = function()
{
	if (Flixel.FlxG.device.iOS && Flixel.FlxG.device.webAudio === false) {
		this.channels = 1;
	}

	if (Flixel.FlxG.device.iOS || Flixel.fakeiOSTouchLock) {
		// this.game.input.touch.callbackContext = this;
		// this.game.input.touch.touchStartCallback = this.unlock;
		// this.game.input.mouse.callbackContext = this;
		// this.game.input.mouse.mouseDownCallback = this.unlock;
		this.touchLocked = true;
	} else {
		// What about iOS5?
		this.touchLocked = false;
	}

	// Check to see if all audio playback is disabled (i.e. handled by a 3rd party class)
	if (Flixel.disableAudio === true) {
		this.usingWebAudio = false;
		this.noAudio = true;
		return;
	}

	// Check if the Web Audio API is disabled (for testing Audio Tag playback during development)
	if (Flixel.disableWebAudio === true) {
		this.usingWebAudio = false;
		this.usingAudioTag = true;
		this.noAudio = false;
		return;
	}

	if (!!window.AudioContext) {
		this.context = new window.AudioContext();
	} else if (!!window.webkitAudioContext) {
		this.context = new window.webkitAudioContext();
	} else if (!!window.Audio) {
		this.usingWebAudio = false;
		this.usingAudioTag = true;
	} else {
		this.usingWebAudio = false;
		this.noAudio = true;
	}

	if (this.context !== null) {
		if (typeof this.context.createGain === 'undefined') {
			this.masterGain = this.context.createGainNode();
		} else {
			this.masterGain = this.context.createGain();
		}

		this.masterGain.gain.value = 1;
		this.masterGain.connect(this.context.destination);
	}

};

/**
 * Enables the audio, usually after the first touch.
 * 
 * @method SoundManager#unlock
 */
SoundManager.prototype.unlock = function()
{
	if (this.touchLocked === false) {
		return;
	}

	// Global override (mostly for Audio Tag testing)
	if (Flixel.FlxG.device.webAudio === false || Flixel.disableWebAudio === true) {
		// Create an Audio tag?
		this.touchLocked = false;
		this._unlockSource = null;
		this.game.input.touch.callbackContext = null;
		this.game.input.touch.touchStartCallback = null;
		this.game.input.mouse.callbackContext = null;
		this.game.input.mouse.mouseDownCallback = null;
	} else {
		// Create empty buffer and play it
		var buffer = this.context.createBuffer(1, 1, 22050);
		this._unlockSource = this.context.createBufferSource();
		this._unlockSource.buffer = buffer;
		this._unlockSource.connect(this.context.destination);
		this._unlockSource.noteOn(0);
	}
};

/**
 * Overridden destroy method.
 */
SoundManager.prototype.destroy = function()
{
	this.stopAll();
	delete this._sounds;

	SoundManager.parent.destroy.apply(this);
};

/**
 * Stops all the sounds in the game.
 */
SoundManager.prototype.stopAll = function()
{
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i]) {
			this._sounds[i].stop();
		}
	}
};

/**
 * Pauses all the sounds in the game.
 */
SoundManager.prototype.pauseAll = function()
{
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i]) {
			this._sounds[i].pause();
		}
	}
};

/**
 * resumes every sound in the game.
 * 
 * @method SoundManager#resumeAll
 */
SoundManager.prototype.resumeAll = function()
{
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i]) {
			this._sounds[i].resume();
		}
	}
};

/**
 * Decode a sound by its assets key.
 * 
 * @method SoundManager#decode
 * @param {string}
 *            key - Assets key of the sound to be decoded.
 * @param {SoundChannel}
 *            [sound] - Its buffer will be set to decoded data.
 */
SoundManager.prototype.decode = function(key, sound)
{
	sound = sound || null;

	var soundData = this.cache.getSoundData(key);

	if (soundData) {
		if (this.cache.isSoundDecoded(key) === false) {
			this.cache.updateSound(key, 'isDecoding', true);

			var that = this;

			this.context.decodeAudioData(soundData, function(buffer)
			{
				that.cache.decodedSound(key, buffer);
				if (sound && this.onSoundDecode !== null) {
					that.onSoundDecode(sound);
				}
			});
		}
	}
};

/**
 * Updates every sound in the game.
 * 
 * @method SoundManager#update
 */
SoundManager.prototype.update = function()
{
	if (this.touchLocked) {
		if (Flixel.FlxG.device.webAudio && this._unlockSource !== null) {
			if ((this._unlockSource.playbackState === this._unlockSource.PLAYING_STATE || this._unlockSource.playbackState === this._unlockSource.FINISHED_STATE)) {
				this.touchLocked = false;
				this._unlockSource = null;
				this.game.input.touch.callbackContext = null;
				this.game.input.touch.touchStartCallback = null;
			}
		}
	}

	for (var i = 0; i < this._sounds.length; i++) {
		this._sounds[i].update();
	}
};

/**
 * Adds a new Sound into the SoundManager.
 * 
 * @param key
 *            Asset key for the sound.
 * @param volume
 *            [volume=1] - Default value for the volume.
 * @param loop
 *            [loop=false] - Whether or not the sound will loop.
 * @param connect
 *            [connect=true] - Controls if the created Sound object will connect to the master gainNode of the SoundManager when running under
 *            WebAudio.
 */
SoundManager.prototype.add = function(key, volume, loop, connect)
{
	if (typeof volume === 'undefined') {
		volume = 1;
	}
	if (typeof loop === 'undefined') {
		loop = false;
	}
	if (typeof connect === 'undefined') {
		connect = this.connectToMaster;
	}

	var sound = new SoundChannel(key, volume, loop, connect);

	this._sounds.push(sound);

	return sound;
};

/**
 * Adds a new Sound into the SoundManager and starts it playing.
 * 
 * @param {string}
 *            key - Asset key for the sound.
 * @param {number}
 *            [volume=1] - Default value for the volume.
 * @param {boolean}
 *            [loop=false] - Whether or not the sound will loop.
 * @return The new sound instance.
 */
SoundManager.prototype.play = function(key, volume, loop)
{
	var sound = this.add(key, volume, loop);
	sound.play();
	return sound;
};

/**
 * Return the mute value.
 */
SoundManager.prototype.getMute = function()
{
	return this._muted;
};

/**
 * Set the mute value.
 */
SoundManager.prototype.setMute = function(value)
{
	value = value || null;
	var i = 0;

	if (value) {
		if (this._muted) {
			return;
		}

		this._muted = true;

		if (this.usingWebAudio) {
			this._muteVolume = this.masterGain.gain.value;
			this.masterGain.gain.value = 0;
		}

		// Loop through sounds
		for (i = 0; i < this._sounds.length; i++) {
			if (this._sounds[i].usingAudioTag) {
				this._sounds[i].mute = true;
			}
		}
	} else {
		if (this._muted === false) {
			return;
		}

		this._muted = false;

		if (this.usingWebAudio) {
			this.masterGain.gain.value = this._muteVolume;
		}

		// Loop through sounds
		for (i = 0; i < this._sounds.length; i++) {
			if (this._sounds[i].usingAudioTag) {
				this._sounds[i].mute = false;
			}
		}
	}
};

/**
 * Return the volume value.
 */
SoundManager.prototype.getVolume = function()
{
	if (this.usingWebAudio) {
		return this.masterGain.gain.value;
	} else {
		return this._volume;
	}

};

/**
 * Set the volume value.
 */
SoundManager.prototype.setVolume = function(value)
{
	value = (value > 1) ? 1 : (value < 0) ? 0 : value;

	this._volume = value;

	if (this.usingWebAudio) {
		this.masterGain.gain.value = value;
	}

	// Loop through the sound cache and change the volume of all html audio tags
	for (var i = 0; i < this._sounds.length; i++) {
		if (this._sounds[i].usingAudioTag) {
			this._sounds[i].volume = this._sounds[i].volume * value;
		}
	}
};

/**
 * Return the class name.
 */
SoundManager.prototype.toString = function()
{
	return "SoundManager";
};