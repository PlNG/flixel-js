/**
 * A simple cache system for the loaded resources.
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * Class constructor.
 */
var Cache = function()
{
	this.images = [];
	this._text = [];
	this._sounds = [];
};

/**
 * The image list.
 */
Cache.prototype.images = null;
/**
 * The text list.
 */
Cache.prototype._text = null;
/**
 * The sound list.
 */
Cache.prototype._sounds = null;

/**
 * Get text by key.
 * 
 * @param {string}
 *            key - Asset key of the text you want.
 * @return The text you want.
 */
Cache.prototype.getText = function(key)
{
	if (this._text[key]) {
		return this._text[key].text;
	}

	return null;
};

/**
 * Add a new text.
 * 
 * @param key
 *            Asset key for the text.
 * @param text
 *            The text to add.
 */
Cache.prototype.addText = function(key, text)
{
	this._text[key] = {
		text : text
	};
};

/**
 * Add a new sound.
 * 
 * @param key
 *            Asset key for the sound.
 * @param url
 *            URL of this sound file.
 * @param data
 *            Extra sound data.
 * @param webAudio
 *            True if the file is using web audio.
 * @param audioTag
 *            True if the file is using legacy HTML audio.
 */
Cache.prototype.addSound = function(key, url, data, webAudio, audioTag)
{

	webAudio = (webAudio === undefined) ? true : webAudio;
	audioTag = (audioTag === undefined) ? false : audioTag;

	var decoded = false;

	if (audioTag) {
		decoded = true;
	}

	this._sounds[key] = {
		url : url,
		data : data,
		isDecoding : false,
		decoded : decoded,
		webAudio : webAudio,
		audioTag : audioTag
	};
};

/**
 * Update some sound values.
 * 
 * @param key
 *            Asset key for the sound.
 * @param property
 *            The property to update.
 * @param value
 *            The new value.
 */
Cache.prototype.updateSound = function(key, property, value)
{
	if (this._sounds[key]) {
		this._sounds[key][property] = value;
	}
};

/**
 * Add a new decoded sound.
 * 
 * @param key
 *            Asset key for the sound.
 * @param data
 *            Extra sound data.
 */
Cache.prototype.decodedSound = function(key, data)
{
	this._sounds[key].data = data;
	this._sounds[key].decoded = true;
	this._sounds[key].isDecoding = false;
};

/**
 * Get sound by key.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return The sound you want.
 */
Cache.prototype.getSound = function(key)
{
	if (this._sounds[key]) {
		return this._sounds[key];
	}

	return null;
};

/**
 * Get sound data by key.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return {object} The sound data you want.
 */
Cache.prototype.getSoundData = function(key)
{
	if (this._sounds[key]) {
		return this._sounds[key].data;
	}

	return null;
};

/**
 * Check if the given sound has finished decoding.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return {boolean} The decoded state of the Sound object.
 */
Cache.prototype.isSoundDecoded = function(key)
{
	if (this._sounds[key]) {
		return this._sounds[key].decoded;
	}
};

/**
 * Check if the given sound is ready for playback. A sound is considered ready
 * when it has finished decoding and the device is no longer touch locked.
 * 
 * @param {string}
 *            key - Asset key of the sound you want.
 * @return {boolean} True if the sound is decoded and the device is not touch
 *         locked.
 */
Cache.prototype.isSoundReady = function(key)
{
	return (this._sounds[key] && this._sounds[key].decoded && Flixel.FlxG.soundManager.touchLocked === false);
};