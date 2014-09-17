/**
 * The replay object both records and replays game recordings, as well as handle saving and loading replays to and from files. Gameplay recordings are essentially a list of keyboard and mouse inputs,
 * but since Flixel is fairly deterministic, we can use these to play back recordings of gameplay with a decent amount of fidelity.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	Adam Atomic
 * @author	ratalaika / ratalaikaGames
 */

/**
 * Instantiate a new replay object. Doesn't actually do much until you call create() or load().
 */
Flixel.system.FlxReplay = function()
{
	this.seed = 0;
	this.frame = 0;
	this.frameCount = 0;
	this.finished = false;
	this._frames = null;
	this._capacity = 0;
	this._marker = 0;
};
/**
 * The random number generator seed value for this recording.
 */
Flixel.system.FlxReplay.prototype.seed = 0;
/**
 * The current frame for this recording.
 */
Flixel.system.FlxReplay.prototype.frame = 0;
/**
 * The number of frames in this recording.
 */
Flixel.system.FlxReplay.prototype.frameCount = 0;
/**
 * Whether the replay has finished playing or not.
 */
Flixel.system.FlxReplay.prototype.finished = false;
/**
 * Internal container for all the frames in this replay.
 */
Flixel.system.FlxReplay.prototype._frames = null;
/**
 * Internal tracker for max number of frames we can fit before growing the <code>_frames</code> again.
 */
Flixel.system.FlxReplay.prototype._capacity = 0;
/**
 * Internal helper variable for keeping track of where we are in <code>_frames</code> during recording or replay.
 */
Flixel.system.FlxReplay.prototype._marker = 0;

/**
 * Clean up memory.
 */
Flixel.system.FlxReplay.prototype.destroy = function()
{
	if (this._frames !== null) {
		var i = this.frameCount - 1;
		while (i >= 0)
			this._frames[i--].destroy();
		this._frames = null;
	}
};

/**
 * Create a new gameplay recording. Requires the current random number generator seed.
 * 
 * @param Seed
 *            The current seed from the random number generator.
 */
Flixel.system.FlxReplay.prototype.create = function(Seed)
{
	this.destroy();
	this.init();
	this.seed = Seed;
	this.rewind();
};

/**
 * Load replay data from a <code>String</code> object. Strings can come from embedded assets or external files loaded through the debugger overlay.
 * 
 * @param FileContents
 *            A <code>String</code> object containing a gameplay recording.
 */
Flixel.system.FlxReplay.prototype.load = function(FileContents)
{
	this.init();

	var lines = FileContents.split("\n");

	this.seed = Number(lines[0]);

	var line;
	var i = 1;
	var l = lines.length;

	while (i < l) {
		line = lines[i++];
		if (line.length > 3) {
			this._frames[this.frameCount++] = new Flixel.system.replay.FrameRecord().load(line);
			if (this.frameCount >= this._capacity) {
				this._capacity *= 2;
				this._frames.length = this._capacity;
			}
		}
	}

	this.rewind();
};

/**
 * Common initialization terms used by both <code>create()</code> and <code>load()</code> to set up the replay object.
 */
Flixel.system.FlxReplay.prototype.init = function()
{
	this._capacity = 100;
	this._frames = new Array(this._capacity);
	this.frameCount = 0;
};

/**
 * Save the current recording data off to a <code>String</code> object. Basically goes through and calls <code>FrameRecord.save()</code> on each frame in the replay.
 * 
 * return The gameplay recording in simple ASCII format.
 */
Flixel.system.FlxReplay.prototype.save = function()
{
	if (this.frameCount <= 0)
		return null;
	var output = this.seed + "\n";
	var i = 0;

	while (i < this.frameCount)
		output += this._frames[i++].save() + "\n";
	return output;
};

/**
 * Get the current input data from the input managers and store it in a new frame record.
 */
Flixel.system.FlxReplay.prototype.recordFrame = function()
{
	var keysRecord = Flixel.FlxG.keys.record();
	var mouseRecord = Flixel.FlxG.mouse.record();

	if ((keysRecord === null) && (mouseRecord === null)) {
		this.frame++;
		return;
	}
	this._frames[this.frameCount++] = new Flixel.system.replay.FrameRecord().create(this.frame++, keysRecord, mouseRecord);
	if (this.frameCount >= this._capacity) {
		this._capacity *= 2;
		this._frames.length = this._capacity;
	}
};

/**
 * Get the current frame record data and load it into the input managers.
 */
Flixel.system.FlxReplay.prototype.playNextFrame = function()
{
	Flixel.FlxG.resetInput();

	if (this._marker >= this.frameCount) {
		this.finished = true;
		return;
	}
	if (this._frames[this._marker].frame != this.frame++)
		return;

	var fr = this._frames[this._marker++];
	if (fr.keys !== null)
		Flixel.FlxG.keys.playback(fr.keys);
	if (fr.mouse !== null)
		Flixel.FlxG.mouse.playback(fr.mouse);
};

/**
 * Reset the replay back to the first frame.
 */
Flixel.system.FlxReplay.prototype.rewind = function()
{
	this._marker = 0;
	this.frame = 0;
	this.finished = false;
};
