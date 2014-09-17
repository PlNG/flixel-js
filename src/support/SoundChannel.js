/**
 * The SoundChannel class controls a sound in an application.<br>
 * <br>
 * Every sound is assigned to a sound channel, and the application<br>
 * can have multiple sound channels that are mixed together.<br>
 * <br>
 * The SoundChannel class contains a stop() method, properties for<br>
 * monitoring the amplitude (volume) of the channel, and a property<br>
 * for assigning a SoundTransform object to the channel.<br>
 * <br>
 * We use this class to manage the sound in a HTML5 way, and also to<br>
 * add some consistency to the Flixel Sound class.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * Class constructor.
 * 
 * @param key
 *            Asset key for the sound.
 * @param volume
 *            Default value for the volume, between 0 and 1.
 * @param loopWhether
 *            or not the sound will loop.
 */
var SoundChannel = function(key, volume, loop, connect)
{

	if (typeof volume == 'undefined') {
		volume = 1;
	}
	if (typeof loop == 'undefined') {
		loop = false;
	}
	if (typeof connect === 'undefined') {
		connect = Flixel.FlxG.soundManager.connectToMaster;
	}

	// Save the constructor stuff
	this.name = key;
	this.key = key;
	this.loop = loop;
	this._volume = volume;

	// Check what sound engine we are using
	this.usingWebAudio = Flixel.FlxG.soundManager.usingWebAudio;
	this.usingAudioTag = Flixel.FlxG.soundManager.usingAudioTag;

	// If we are using web audio
	if (this.usingWebAudio) {
		this.context = Flixel.FlxG.soundManager.context; // Get the sound
		// context
		this.masterGainNode = Flixel.FlxG.soundManager.masterGain; //

		if (typeof this.context.createGain === 'undefined') {
			this.gainNode = this.context.createGainNode();
		} else {
			this.gainNode = this.context.createGain();
		}

		this.gainNode.gain.value = volume * Flixel.FlxG.soundManager.getVolume();

		if (connect) {
			this.gainNode.connect(this.masterGainNode);
		}
	} else {
		if (Flixel.FlxG.loaderCache.getSound(key) && Flixel.FlxG.loaderCache.isSoundReady(key)) {
			this._sound = Flixel.FlxG.loaderCache.getSoundData(key);
			this.totalDuration = 0;

			if (this._sound.duration) {
				this.totalDuration = this._sound.duration;
			}
		} else {
			Flixel.FlxG.loaderCache.onSoundUnlock.add(this.soundHasUnlocked, this);
		}
	}
};

/**
 * @property {string} name - Name of the sound.
 */
SoundChannel.prototype.name = null;
/**
 * @property {string} key - Asset key for the sound.
 */
SoundChannel.prototype.key = null;
/**
 * @property {boolean} loop - Whether or not the sound will loop.
 */
SoundChannel.prototype.loop = false;
/**
 * @property {number} _volume - The global audio volume. A value between 0
 *           (silence) and 1 (full volume).
 * @private
 */
SoundChannel.prototype._volume = 0;
/**
 * @SoundChannel.prototype.rty {object} markers - The sound markers.
 */
SoundChannel.prototype.markers = {};
/**
 * @property {AudioContext} context - Reference to the AudioContext instance.
 */
SoundChannel.prototype.context = null;
/**
 * @property {Description} _buffer - Decoded data buffer / Audio tag.
 * @private
 */
SoundChannel.prototype._buffer = null;
/**
 * @property {boolean} _muted - Boolean indicating whether the sound is muted or
 *           not.
 * @private
 * @default
 */
SoundChannel.prototype._muted = false;
/**
 * @property {boolean} autoplay - Boolean indicating whether the sound should
 *           start automatically.
 */
SoundChannel.prototype.autoplay = false;
/**
 * @property {number} totalDuration - The total duration of the sound, in
 *           milliseconds
 */
SoundChannel.prototype.totalDuration = 0;
/**
 * @property {number} startTime - The time the Sound starts at (typically 0
 *           unless starting from a marker)
 * @default
 */
SoundChannel.prototype.startTime = 0;
/**
 * @property {number} currentTime - The current time the sound is at.
 */
SoundChannel.prototype.currentTime = 0;
/**
 * @property {number} duration - The duration of the sound.
 */
SoundChannel.prototype.duration = 0;
/**
 * @property {number} stopTime - The time the sound stopped.
 */
SoundChannel.prototype.stopTime = 0;
/**
 * @property {boolean} paused - true if the sound is paused, otherwise false.
 * @default
 */
SoundChannel.prototype.paused = false;
/**
 * @property {number} pausedPosition - The position the sound had reached when
 *           it was paused.
 */
SoundChannel.prototype.pausedPosition = 0;
/**
 * @property {number} pausedTime - The game time at which the sound was paused.
 */
SoundChannel.prototype.pausedTime = 0;
/**
 * @property {boolean} isPlaying - true if the sound is currently playing,
 *           otherwise false.
 * @default
 */
SoundChannel.prototype.isPlaying = false;
/**
 * @property {string} currentMarker - The string ID of the currently playing
 *           marker, if any.
 * @default
 */
SoundChannel.prototype.currentMarker = '';
/**
 * @property {boolean} pendingPlayback - true if the sound file is pending
 *           playback
 * @readonly
 */
SoundChannel.prototype.pendingPlayback = false;
/**
 * @property {boolean} override - if true when you play this sound it will
 *           always start from the beginning.
 * @default
 */
SoundChannel.prototype.override = false;
/**
 * @property {boolean} usingWebAudio - true if this sound is being played with
 *           Web Audio.
 * @readonly
 */
SoundChannel.prototype.usingWebAudio = false;
/**
 * @property {boolean} usingAudioTag - true if the sound is being played via the
 *           Audio tag.
 */
SoundChannel.prototype.usingAudioTag = false;
/**
 * @property {object} externalNode - If defined this Sound won't connect to the
 *           SoundManager master gain node, but will instead connect to
 *           externalNode.input.
 */
SoundChannel.prototype.externalNode = null;
/**
 * @property onDecoded - The onDecoded function is called when the sound has
 *           finished decoding (typically for mp3 files)
 */
SoundChannel.prototype.onDecoded = null;
/**
 * @property onPlay - The onPlay function is called each time this sound is
 *           played.
 */
SoundChannel.prototype.onPlay = null;
/**
 * @property onPause - The onPause function is called when this sound is
 *           paused.
 */
SoundChannel.prototype.onPause = null;
/**
 * @property onResume - The onResume function is called when this sound is
 *           resumed from a paused state.
 */
SoundChannel.prototype.onResume = null;
/**
 * @property onLoop - The onLoop function is called when this sound loops
 *           during playback.
 */
SoundChannel.prototype.onLoop = null;
/**
 * @property onStop - The onStop function is called when this sound stops
 *           playback.
 */
SoundChannel.prototype.onStop = null;
/**
 * @property onMute - The onMouse function is called when this sound is muted.
 */
SoundChannel.prototype.onMute = null;
/**
 * @property onMarkerComplete - The onMarkerComplete function is called when a
 *           marker within this sound completes playback.
 */
SoundChannel.prototype.onMarkerComplete = null;

/**
 * Called automatically when this sound is unlocked.
 * 
 * @method SoundChannel#soundHasUnlocked
 * @param {string}
 *            key - The cache key of the sound file to check for
 *            decoding.
 * @protected
 */
SoundChannel.prototype.soundHasUnlocked = function(key)
{
	if (key == this.key) {
		this._sound = Flixel.FlxG.loaderCache.getSoundData(this.key);
		this.totalDuration = this._sound.duration;
		// console.log('sound has unlocked' + this._sound);
	}
};

/**
 * Description.
 * 
 * @method SoundChannel#addMarker
 * @param {string}
 *            name - Description.
 * @param {Description}
 *            start - Description.
 * @param {Description}
 *            stop - Description.
 * @param {Description}
 *            volume - Description.
 * @param {Description}
 *            loop - Description. addMarker: function (name, start, stop,
 *            volume, loop) {
 * 
 * volume = volume || 1; if (typeof loop == 'undefined') { loop = false; }
 * 
 * this.markers[name] = { name: name, start: start, stop: stop, volume: volume,
 * duration: stop - start, loop: loop }; };
 */

/**
 * Adds a marker into the current Sound. A marker is represented by a unique key
 * and a start time and duration. This allows you to bundle multiple sounds
 * together into a single audio file and use markers to jump between them for
 * playback.
 * 
 * @method SoundChannel#addMarker
 * @param {string}
 *            name - A unique name for this marker, i.e. 'explosion', 'gunshot',
 *            etc.
 * @param {number}
 *            start - The start point of this marker in the audio file, given in
 *            seconds. 2.5 = 2500ms, 0.5 = 500ms, etc.
 * @param {number}
 *            duration - The duration of the marker in seconds. 2.5 = 2500ms,
 *            0.5 = 500ms, etc.
 * @param {number}
 *            [volume=1] - The volume the sound will play back at, between 0
 *            (silent) and 1 (full volume).
 * @param {boolean}
 *            [loop=false] - Sets if the sound will loop or not.
 */
SoundChannel.prototype.addMarker = function(name, start, duration, volume, loop)
{
	volume = volume || 1;
	if (typeof loop == 'undefined') {
		loop = false;
	}

	this.markers[name] = {
		name : name,
		start : start,
		stop : start + duration,
		volume : volume,
		duration : duration,
		durationMS : duration * 1000,
		loop : loop
	};

};

/**
 * Removes a marker from the sound.
 * 
 * @method SoundChannel#removeMarker
 * @param {string}
 *            name - The key of the marker to remove.
 */
SoundChannel.prototype.removeMarker = function(name)
{
	delete this.markers[name];
};

/**
 * Called automatically by the SoundManager.
 */
SoundChannel.prototype.update = function()
{	
	if (this.pendingPlayback && Flixel.FlxG.loaderCache.isSoundReady(this.key)) {
		this.pendingPlayback = false;
		this.play(this._tempMarker, this._tempPosition, this._tempVolume, this._tempLoop);
	}

	if (this.isPlaying) {
		this.currentTime = getTimer() - this.startTime;

		if (this.currentTime >= this.durationMS) {
			// console.log(this.currentMarker, 'has hit duration');
			if (this.usingWebAudio) {
				if (this.loop) {
					// console.log('loop1');
					// won't work with markers, needs to reset the position
					if(this.onLoop !== null)
						this.onLoop();

					if (this.currentMarker === '') {
						// console.log('loop2');
						this.currentTime = 0;
						this.startTime = getTimer();
					} else {
						// console.log('loop3');
						this.play(this.currentMarker, 0, this.getVolume(), true, true);
					}
				} else {
					// console.log('stopping, no loop for marker');
					this.stop();
				}
			} else {
				if (this.loop) {
					if(this.onLoop !== null)
						this.onLoop();
					this.play(this.currentMarker, 0, this.getVolume(), true, true);
				} else {
					this.stop();
				}
			}
		}
	}
};

/**
 * Play this sound, or a marked section of it.
 * 
 * @param {string}
 *            [marker=''] - If you want to play a marker then give the key here,
 *            otherwise leave blank to play the full sound.
 * @param {number}
 *            [position=0] - The starting position to play the sound from - this
 *            is ignored if you provide a marker.
 * @param {number}
 *            [volume=1] - Volume of the sound you want to play. If none is
 *            given it will use the volume given to the Sound when it was
 *            created (which defaults to 1 if none was specified).
 * @param {boolean}
 *            [loop=false] - Loop when it finished playing?
 * @param {boolean}
 *            [forceRestart=true] - If the sound is already playing you can set
 *            forceRestart to restart it from the beginning.
 * @return {SoundChannel} This sound instance.
 */
SoundChannel.prototype.play = function(marker, position, volume, loop, forceRestart)
{
	marker = marker || '';
	position = position || 0;

	if (typeof volume === 'undefined') {
		volume = this._volume;
	}
	if (typeof loop === 'undefined') {
		loop = false;
	}
	if (typeof forceRestart === 'undefined') {
		forceRestart = true;
	}

	// console.log(this.name + ' play ' + marker + ' position ' + position +
	// ' volume ' + volume + ' loop ' + loop, 'force', forceRestart);

	if (this.isPlaying === true && forceRestart === false && this.override === false) {
		// Use Restart instead
		return;
	}

	if (this.isPlaying && this.override) {
		// console.log('asked to play ' + marker + ' but already playing ' +
		// this.currentMarker);

		if (this.usingWebAudio) {
			if (typeof this._sound.stop === 'undefined') {
				this._sound.noteOff(0);
			} else {
				this._sound.stop(0);
			}
		} else if (this.usingAudioTag) {
			this._sound.pause();
			this._sound.currentTime = 0;
		}
	}

	this.currentMarker = marker;

	if (marker !== '') {
		if (this.markers[marker]) {
			this.position = this.markers[marker].start;
			this.setVolume(this.markers[marker].volume);
			this.loop = this.markers[marker].loop;
			this.duration = this.markers[marker].duration;
			this.durationMS = this.markers[marker].durationMS;

			// console.log('Marker Loaded: ', marker, 'start:',
			// this.position, 'end: ', this.duration, 'loop', this.loop);

			this._tempMarker = marker;
			this._tempPosition = this.position;
			this._tempVolume = this.getVolume;
			this._tempLoop = this.loop;
		} else {
			console.warn("SoundChannel.play: audio marker " + marker + " doesn't exist");
			return;
		}
	} else {
		// console.log('no marker info loaded', marker);

		this.position = position;
		this.setVolume(volume);
		this.loop = loop;
		this.duration = 0;
		this.durationMS = 0;

		this._tempMarker = marker;
		this._tempPosition = position;
		this._tempVolume = volume;
		this._tempLoop = loop;
	}

	if (this.usingWebAudio) {
		// Does the sound need decoding?
		if (Flixel.FlxG.loaderCache.isSoundDecoded(this.key)) {
			// Do we need to do this every time we play? How about just if
			// the buffer is empty?
			if (this._buffer === null) {
				this._buffer = Flixel.FlxG.loaderCache.getSoundData(this.key);
			}

			this._sound = this.context.createBufferSource();
			this._sound.buffer = this._buffer;

			if (this.externalNode) {
				this._sound.connect(this.externalNode.input);
			} else {
				this._sound.connect(this.gainNode);
			}

			this.totalDuration = this._sound.buffer.duration;

			if (this.duration === 0) {
				// console.log('duration reset');
				this.duration = this.totalDuration;
				this.durationMS = this.totalDuration * 1000;
			}

			if (this.loop && marker === '') {
				this._sound.loop = true;
			}

			// Useful to cache this somewhere perhaps?
			if (typeof this._sound.start === 'undefined') {
				this._sound.noteGrainOn(0, this.position, this.duration);
				// this._sound.noteGrainOn(0, this.position, this.duration /
				// 1000);
				// this._sound.noteOn(0); // the zero is vitally important,
				// crashes iOS6 without it
			} else {
				// this._sound.start(0, this.position, this.duration /
				// 1000);
				this._sound.start(0, this.position, this.duration);
			}

			this.isPlaying = true;
			this.startTime = getTimer();
			this.currentTime = 0;
			this.stopTime = this.startTime + this.durationMS;

			if(this.onPlay !== null)
				this.onPlay();
		} else {
			this.pendingPlayback = true;

			if (Flixel.FlxG.loaderCache.getSound(this.key) && Flixel.FlxG.loaderCache.getSound(this.key).isDecoding === false) {
				Flixel.FlxG.soundManager.decode(this.key, this);
			}
		}
	} else {
		// console.log('Sound play Audio');
		if (Flixel.FlxG.loaderCache.getSound(this.key) && Flixel.FlxG.loaderCache.getSound(this.key).locked) {
			// console.log('tried playing locked sound, pending set, reload
			// started');
			Flixel.FlxG.loaderCache.reloadSound(this.key);
			this.pendingPlayback = true;
		} else {
			// console.log('sound not locked, state?',
			// this._sound.readyState);
			if (this._sound && this._sound.readyState == 4) {
				this._sound.play();
				// This doesn't become available until you call play(),
				// wonderful ...
				this.totalDuration = this._sound.duration;

				if (this.duration === 0) {
					this.duration = this.totalDuration;
					this.durationMS = this.totalDuration * 1000;
				}

				// console.log('playing', this._sound);
				this._sound.currentTime = this.position;
				this._sound.muted = this._muted;

				if (this._muted) {
					this._sound.volume = 0;
				} else {
					this._sound.volume = this._volume;
				}

				this.isPlaying = true;
				this.startTime = getTimer();
				this.currentTime = 0;
				this.stopTime = this.startTime + this.durationMS;

				if(this.onPlay !== null)
					this.onPlay();
			} else {
				this.pendingPlayback = true;
			}
		}
	}
};

/**
 * Restart the sound, or a marked section of it.
 * 
 * @method SoundChannel#restart
 * @param {string}
 *            [marker=''] - If you want to play a marker then give the key here,
 *            otherwise leave blank to play the full sound.
 * @param {number}
 *            [position=0] - The starting position to play the sound from - this
 *            is ignored if you provide a marker.
 * @param {number}
 *            [volume=1] - Volume of the sound you want to play.
 * @param {boolean}
 *            [loop=false] - Loop when it finished playing?
 */
SoundChannel.prototype.restart = function(marker, position, volume, loop)
{
	marker = marker || '';
	position = position || 0;
	volume = volume || 1;
	if (typeof loop == 'undefined') {
		loop = false;
	}

	this.play(marker, position, volume, loop, true);
};

/**
 * Pauses the sound
 * 
 * @method SoundChannel#pause
 */
SoundChannel.prototype.pause = function()
{
	if (this.isPlaying && this._sound) {
		this.stop();
		this.isPlaying = false;
		this.paused = true;
		this.pausedPosition = this.currentTime;
		this.pausedTime = getTimer();

		if(this.onPause !== null)
			this.onPause();
	}
};

/**
 * Resumes the sound
 * 
 * @method SoundChannel#resume
 */
SoundChannel.prototype.resume = function()
{

	if (this.paused && this._sound) {
		if (this.usingWebAudio) {
			var p = this.position + (this.pausedPosition / 1000);

			this._sound = this.context.createBufferSource();
			this._sound.buffer = this._buffer;
			this._sound.connect(this.gainNode);

			if (typeof this._sound.start === 'undefined') {
				this._sound.noteGrainOn(0, p, this.duration);
				// this._sound.noteOn(0); // the zero is vitally important,
				// crashes iOS6 without it
			} else {
				this._sound.start(0, p, this.duration);
			}
		} else {
			this._sound.play();
		}

		this.isPlaying = true;
		this.paused = false;
		this.startTime += (getTimer() - this.pausedTime);

		if(this.onResume !== null)
			this.onResume();
	}

};

/**
 * Stop playing this sound.
 */
SoundChannel.prototype.stop = function()
{

	if (this.isPlaying && this._sound) {
		if (this.usingWebAudio) {
			if (typeof this._sound.stop === 'undefined') {
				this._sound.noteOff(0);
			} else {
				this._sound.stop(0);
			}
		} else if (this.usingAudioTag) {
			this._sound.pause();
			this._sound.currentTime = 0;
		}
	}

	this.isPlaying = false;
	var prevMarker = this.currentMarker;

	this.currentMarker = '';

	if(this.onStop !== null)
		this.onStop(prevMarker);

};

/**
 * @property {boolean} isDecoding - Returns true if the sound file is still
 *           decoding.
 */
SoundChannel.prototype.isDecoding = function()
{
	return Flixel.FlxG.loaderCache.getSound(this.key).isDecoding;
};

/**
 * @property {boolean} isDecoded - Returns true if the sound file has decoded.
 */
SoundChannel.prototype.isDecoded = function()
{
	return Flixel.FlxG.loaderCache.isSoundDecoded(this.key);
};

/**
 * @property {boolean} mute - Gets or sets the muted state of this sound.
 */
SoundChannel.prototype.getMute = function()
{
	return this._muted;
};

SoundChannel.prototype.setMute = function(value)
{
	value = value || null;

	if (value) {
		this._muted = true;

		if (this.usingWebAudio) {
			this._muteVolume = this.gainNode.gain.value;
			this.gainNode.gain.value = 0;
		} else if (this.usingAudioTag && this._sound) {
			this._muteVolume = this._sound.volume;
			this._sound.volume = 0;
		}
	} else {
		this._muted = false;

		if (this.usingWebAudio) {
			this.gainNode.gain.value = this._muteVolume;
		} else if (this.usingAudioTag && this._sound) {
			this._sound.volume = this._muteVolume;
		}
	}

	if(this.onMute !== null)
		this.onMute();
};

/**
 * Return the current volume.
 */
SoundChannel.prototype.getVolume = function()
{
	return this._volume;
};

/**
 * Set the volume.
 * 
 * @param volume
 *            The new volume.
 */
SoundChannel.prototype.setVolume = function(volume)
{
	if (this.usingWebAudio) {
		this._volume = volume;
		this.gainNode.gain.value = volume;
	} else if (this.usingAudioTag && this._sound) {
		// Causes an Index size error in Firefox if you don't clamp the value
		if (volume >= 0 && volume <= 1) {
			this._volume = volume;
			this._sound.volume = volume;
		}
	}
};
