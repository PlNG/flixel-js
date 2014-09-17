/**
 * Each asset is an instance of the Asset class.<br>
 * Global "assets" variable holds reference to all of them.<br>
 * Instead of passing a classname to certain Flixel methods, you pass and asset object:<br>
 *  - asset.example - and its properties are at asset.example.name, asset.example.src, etc.<br>
 * <br>
 * Audio: audio/mpeg (mp3), audio/webm, audio/ogg, application/ogg<br>
 * Video: video/webm, video/ogg<br>
 * Images: image/jpeg, image/gif, image/png, image/bmp<br>
 *
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */

/**
 * The assets class constructor.
 * 
 * @param callback
 *            Function to call when all assets will be loaded.
 */
var Loader = function()
{
	this.resourceList = [];
	this.resourceCount = 0;
	this.loadCount = 0;

	this.onAssetLoaded = null;
	this.onAllLoaded = null;
};

/**
 * The cache of the loader.
 */
Loader.prototype.cache = null;
/**
 * The resource list.
 */
Loader.prototype.resourceList = null;
/**
 * The total number of assets.
 */
Loader.prototype.resourceCount = 0;
/**
 * The total number of loaded assets.
 */
Loader.prototype.loadCount = 0;
/**
 * Function to call when an asset is loaded.
 */
Loader.prototype.onResourceLoaded = null;
/**
 * Function to call when all assets will be loaded.
 */
Loader.prototype.onAllLoaded = null;
/**
 * An XMLHttpRequest object used for loading text and audio data.
 */
Loader.prototype._xmlHttpRequest = new XMLHttpRequest();
/**
 * The current file we are loading.
 */
Loader.prototype._curFile = 0;
/**
 * The time when we started loading.
 */
Loader.prototype._start = 0;
/**
 * If we are loading or not.
 */
Loader.prototype.loading = false;

// ========================================================//
// MISC STUFF //
// ========================================================//
/**
 * Returns the percentage of resources loaded.
 */
Loader.prototype.getPercentage = function()
{
	return (this.loadCount * 100) / this.resourceCount;
};

/**
 * Private method ONLY used by loader.
 * 
 * @param {array|string}
 *            urls - Either an array of audio file URLs or a string containing a
 *            single URL path.
 * @private
 */
Loader.prototype.getAudioURL = function(urls)
{
	var extension;

	if (typeof urls === 'string') {
		urls = [ urls ];
	}

	for (var i = 0; i < urls.length; i++) {
		extension = urls[i].toLowerCase();
		extension = extension.substr((Math.max(0, extension.lastIndexOf(".")) || Infinity) + 1);

		if (Flixel.FlxG.device.canPlayAudio(extension)) {
			return urls[i];
		}
	}
	return null;
};

// ========================================================//
// RESOURCE ADDERS //
// ========================================================//

/**
 * Add a new image to the loader
 * 
 * @param imageKey
 *            The image key.
 * @param imageUrl
 *            The image url.
 */
Loader.prototype.addImage = function(imageKey, imageUrl)
{
	var info = {
		url : imageUrl
	};
	this.resourceList.push(new Resource(imageKey, info, 'image'));
	this.resourceCount++;
};

/**
 * Add a new atlas to the loader
 * 
 * @param atlasKey
 *            The atlas key.
 * @param atlasImageUrl
 *            The atlas image url.
 * @param atlasPackFileUrl
 *            The atlas pack file url.
 * @param atlasId
 *            The atlas id.
 * @param content
 *            The optional content of the atlas text. (Windows Phone 8 needs this).
 */
Loader.prototype.addAtlas = function(atlasKey, atlasImageUrl, atlasPackFileUrl, atlasId, content)
{
	var info = {
		packFileUrl : atlasPackFileUrl,
		atlasId : atlasId,
		atlasImageUrl : atlasImageUrl,
		content : content
	};
	this.resourceList.push(new Resource(atlasKey, info, 'atlas'));
	this.resourceCount++;
};

/**
 * Add a new atlas to the loader
 * 
 * @param textKey
 *            The text key.
 * @param textUrl
 *            The text url.
 */
Loader.prototype.addText = function(textKey, textUrl)
{
	var info = {
		url : textUrl,
	};
	this.resourceList.push(new Resource(textKey, info, 'text'));
	this.resourceCount++;
};

/**
 * Add a new audio file to the loader.
 * 
 * @param audioKey
 *            The text key.
 * @param audioUrls
 *            The text urls.
 */
Loader.prototype.addAudio = function(audioKey, audioUrls, autoDecode)
{
	autoDecode = (autoDecode === undefined) ? true : autoDecode;

	var info = {
		url : audioUrls,
		buffer : null,
		autoDecode : autoDecode
	};

	this.resourceList.push(new Resource(audioKey, info, 'audio'));
	this.resourceCount++;
};

// ========================================================//
// RESOURCE LOADERS //
// ========================================================//
/**
 * Start loading all files.
 */
Loader.prototype.start = function()
{
	if(Flixel.FlxG.getGame() === undefined || Flixel.FlxG.getGame() === null) {
		throw new Error("Loader: Do not call start direclty!");
	}
	
	console.log("Loader started, we are going to load " + this.resourceCount + " resources.");

	this._start = getTimer(); // Get the time when we started
	this.loading = true; // Mark as loading
	this._curFile = 0; // Reset the current file
	this.loadCount = 0; // Reset the counter
	this.loadFile(); // Start loading the first file
};

/**
 * Load all the added assets.
 */
Loader.prototype.loadFile = function()
{
	var _this = this; // Store this object

	var resource = this.resourceList[this._curFile];

	if (resource instanceof Resource) {
		switch (resource.type) {
			case 'image':
				resource.image = new Image();
				resource.image.relatedResource = resource;
				resource.image.index = this._curFile;
				resource.image.onload = function()
				{
					return _this.imageLoaded(resource.key);
				};
				resource.image.onerror = function()
				{
					return _this.fileError(resource.key);
				};
				resource.image.src = resource.info.url;
				break;

			case 'atlas':
				var url = resource.info.packFileUrl;
				
				// Check if we have the content
				if(resource.info.content) {
					// Store the pack text
					resource.info.packText = resource.info.content;

					// Load the atlas image
					resource.info.atlasImage = new Image();
					resource.info.atlasImage.relatedResource = resource;
					resource.info.atlasImage.index = this._curFile;
					resource.info.atlasImage.onload = function()
					{
						return _this.atlasLoaded(resource.key);
					};
					resource.info.atlasImage.onerror = function()
					{
						return _this.fileError(resource.key);
					};
					resource.info.atlasImage.src = resource.info.atlasImageUrl;
				} else
				// Read the file
				{
					this._xmlHttpRequest.open("GET", url, true);
					this._xmlHttpRequest.responseType = "text";
					this._xmlHttpRequest.onload = function()
					{
						return _this.atlasTextCompleted(resource.key);
					};
					this._xmlHttpRequest.onerror = function()
					{
						return _this.fileError(resource.key);
					};
					this._xmlHttpRequest.send();
				}
				
				break;

			case 'audio':
				url = this.getAudioURL(resource.info.url);

				if (url !== null) {
					resource.info.finalUrl = url; // Save the selected url
					
					// WebAudio or Audio Tag?
					if (Flixel.FlxG.soundManager.usingWebAudio) {
						this._xmlHttpRequest.open("GET", url, true);
						this._xmlHttpRequest.responseType = "arraybuffer";
						this._xmlHttpRequest.onload = function()
						{
							return _this.audioCompleted(resource.key);
						};
						this._xmlHttpRequest.onerror = function()
						{
							return _this.fileError(resource.key);
						};
						this._xmlHttpRequest.send();
					} else if (Flixel.FlxG.soundManager.usingAudioTag) {
						if (Flixel.FlxG.soundManager.touchLocked) {
							// If audio is locked we can't do this yet, so need
							// to
							// queue this load request. Bum.
							resource.data = new Audio();
							resource.data.name = resource.key;
							resource.data.preload = 'auto';
							resource.data.src = url;
							this.fileComplete(resource.key);
						} else {
							resource.data = new Audio();
							resource.data.name = resource.key;
							resource.data.onerror = function()
							{
								return _this.fileError(resource.key);
							};
							resource.data.preload = 'auto';
							resource.data.src = url;
							resource.data.addEventListener('canplaythrough', _this.audioComplete(resource.key), false);
							resource.data.load();
						}
					}
				} else {
					this.fileError(resource.key);
				}

				break;
			case 'text':
				url = resource.info.url;
				this._xmlHttpRequest.open("GET", url, true);
				this._xmlHttpRequest.responseType = "text";
				this._xmlHttpRequest.onload = function()
				{
					return _this.textCompleted(resource.key);
				};
				this._xmlHttpRequest.onerror = function()
				{
					return _this.fileError(resource.key);
				};
				this._xmlHttpRequest.send();
				break;
		}
	}
};

/**
 * Load the next file
 */
Loader.prototype.loadNextFile = function()
{
	// Call the callback with the last loaded resource key
	if (this.onAssetLoaded !== null)
		this.onAssetLoaded(this.resourceList[this._curFile].key);

	// Increase the file counter
	this._curFile++;
	this.loadCount++;

	console.log("Loading new file, remaining " + (this.resourceCount - this.loadCount));

	// Check if we have loaded all
	if (this.loadCount >= this.resourceCount) {
		console.log("All resources loaded in: " + (getTimer() - this._start));
		if (this.onAllLoaded !== null)
			this.onAllLoaded();
	} else
		this.loadFile();
};

// ========================================================//
// CALLBACKS //
// ========================================================//

/**
 * Callback for when an image is loaded.
 */
Loader.prototype.imageLoaded = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current
														// resource
	this.cache.images[key] = BitmapData.fromImage(resource.image); // Store it
																	// in the
																	// image
																	// array
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for when an image is loaded.
 */
Loader.prototype.atlasLoaded = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current
														// resource
	Flixel.system.atlas.FlxAssetManager.getInstance().loadAtlas(resource.info.packText, resource.info.atlasImage,
			resource.info.atlasId); // Store it in the atlas manager
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for when an atlas text is loaded
 */
Loader.prototype.atlasTextCompleted = function(key)
{
	var _this = this; // Store this object

	// Store the pack text
	var resource = this.resourceList[this._curFile];
	resource.info.packText = this._xmlHttpRequest.responseText;

	// Load the atlas image
	resource.info.atlasImage = new Image();
	resource.info.atlasImage.relatedResource = resource;
	resource.info.atlasImage.index = this._curFile;
	resource.info.atlasImage.onload = function()
	{
		return _this.atlasLoaded(resource.key);
	};
	resource.info.atlasImage.onerror = function()
	{
		return _this.fileError(resource.key);
	};
	resource.info.atlasImage.src = resource.info.atlasImageUrl;
};

/**
 * Callback for when an atlas text is loaded
 */
Loader.prototype.textCompleted = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current resource
	resource.info.text = this._xmlHttpRequest.responseText; // Store the text
	
	this.cache.addText(key, resource.info.text);
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for when an atlas text is loaded
 */
Loader.prototype.fileError = function(key)
{
	console.warn("Error while loading: " + key);
	this.loadNextFile(); // Load the next file
};

/**
 * Callback for loading audio.
 */
Loader.prototype.audioCompleted = function(key)
{
	var resource = this.resourceList[this._curFile]; // Get the current resource

	if (Flixel.FlxG.soundManager.usingWebAudio) {
		resource.data = this._xmlHttpRequest.response;

		this.cache.addSound(resource.key, resource.info.finalUrl, resource.data, true, false);

		if (resource.info.autoDecode) {
			this.cache.updateSound(key, 'isDecoding', true);

			var that = this;
			var resKey = resource.key;

			Flixel.FlxG.soundManager.context.decodeAudioData(resource.data, function(buffer)
			{
				if (buffer) {
					that.cache.decodedSound(resKey, buffer);
				}
			});
		}
	} else {
		resource.data.removeEventListener('canplaythrough');
		this.cache.addSound(resource.key, resource.url, resource.data, false, true);
	}

	this.loadNextFile(); // Load the next file
};