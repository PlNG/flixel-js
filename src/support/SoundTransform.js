/**
 * The SoundTransform class contains properties for volume and panning.<br>
 * A support file for transforming sound stuff.<br>
 * No pan support yet<br>
 * Used to maintain Flash and Java consistency.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var SoundTransform = function()
{
};

/**
 * The left-to-right panning of the sound, ranging from -1 (full pan left) to 1 (full pan right).
 */
SoundTransform.prototype.pan = 0;
/**
 * The volume, ranging from 0 (silent) to 1 (full volume).
 */
SoundTransform.prototype.volume = 0;