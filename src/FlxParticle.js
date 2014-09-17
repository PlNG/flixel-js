/**
 * This is a simple particle class that extends the default behavior<br>
 * of <code>FlxSprite</code> to have slightly more specialized behavior<br>
 * common to many game scenarios.  You can override and extend this class<br>
 * just like you would <code>FlxSprite</code>. While <code>FlxEmitter</code><br>
 * used to work with just any old sprite, it now requires a<br>
 * <code>FlxParticle</code> based class.<br>
 * <br>
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames 
 * @author Adam Atomic
 */
/**
 * Instantiate a new particle.  Like <code>FlxSprite</code>, all meaningful creation
 * happens during <code>loadGraphic()</code> or <code>makeGraphic()</code> or whatever.
 */
Flixel.FlxParticle = function()
{
	Flixel.FlxParticle.parent.constructor.apply(this);

	this.lifespan = 0;
	this.friction = 500;	
};
extend(Flixel.FlxParticle, Flixel.FlxSprite);

/**
 * How long this particle lives before it disappears.
 * NOTE: this is a maximum, not a minimum; the object
 * could get recycled before its lifespan is up.
 */
Flixel.FlxParticle.prototype.lifespan = 0;
/**
 * Determines how quickly the particles come to rest on the ground.
 * Only used if the particle has gravity-like acceleration applied.
 * @default 500
 */
Flixel.FlxParticle.prototype.friction = 0;

/**
 * The particle's main update logic.  Basically it checks to see if it should
 * be dead yet, and then has some special bounce behavior if there is some gravity on it.
 */
Flixel.FlxParticle.prototype.update = function()
{
	// Lifespan behavior
	if(this.lifespan <= 0)
		return;
	this.lifespan -= Flixel.FlxG.elapsed;
	if(this.lifespan <= 0)
		this.kill();
	
	// Simpler bounce/Flxn behavior for now
	if(this.touching) {
		if(this.angularVelocity !== 0)
			this.angularVelocity = -this.angularVelocity;
	}
	
	if(this.acceleration.y > 0) {// Special behavior for particles with gravity
		if(this.touching & Flixel.FlxObject.FLOOR) {
			this.drag.x = this.friction;

			if(!(this.wasTouching & Flixel.FlxObject.FLOOR)) {
				if(this.velocity.y < -this.elasticity*10) {
					if(this.angularVelocity !== 0)
						this.angularVelocity *= -this.elasticity;
				} else {
					this.velocity.y = 0;
					this.angularVelocity = 0;
				}
			}
		} else
			this.drag.x = 0;
	}
};

/**
 * Triggered whenever this object is launched by a <code>FlxEmitter</code>.
 * You can override this to add custom behavior like a sound or AI or something.
 */
Flixel.FlxParticle.prototype.onEmit = function()
{
};

/**
 * Returns the class name.
 */
Flixel.FlxParticle.prototype.toString = function()
{
	return "FlxParticle";
};