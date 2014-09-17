/*jslint bitwise: true */
/**
 * Simulates the Java / AS3 class extension.
 * 
 * @param Child		The Child class.
 * @param Parent	The Parent class.
 */
var extend = function(Child, Parent)
{
	Child.prototype = inherit(Parent.prototype);
	Child.prototype.constructor = Child;
	Child.parent = Parent.prototype;
};

/**
 * Inherits one class from another one.
 * 
 * @param proto		The class prototype.
 * @returns {F}		The new prototype.
 */
function inherit(proto)
{
	function F() {}
	F.prototype = proto;
	return new F();
}

/**
 * Sleep time simulator.<br>
 * Use for DEBUG ONLY.
 * 
 * @param milliseconds
 *				The amount of time to sleep.
 */
var sleep = function(milliseconds)
{
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
};

/**
 * Simulate the flash method: flash.utils.getTimer();
 * 
 * @returns {Number}
 */
var startTimer = new Date().getTime();
var getTimer = function()
{
	var d = new Date();
	return (d.getTime() - startTimer);
};

/**
 * Simulates the flash method: int()<br>
 * It's the same as Math.floor.
 */
var int = function(number)
{
	return Math.floor(number);
};

/**
 * Simulates the flash method: uint()<br>
 * It's the same as Math.floor for number >= 0.
 */
var uint = function(number)
{
	if(number >= 0)
		return Math.floor(number);
	else {
		var result = 4294967295; // 0xFFFFFFFF
		result -= Math.floor(Math.abs(number)) - 1;
		return result;
	}
};

/**
 * String padding.
 * 
 * @param len		The new length of the string.
 * @param chr		The characters to pad with.
 * @param side		The side to path ('left' or 'right')
 * @returns {String}
 */
String.prototype.pad = function(len, chr, side) {
	chr = (chr === undefined || chr === null) ? " " : chr;

	var t = len - this.length;
	var padstr = "";
	while (t > 0) {
		padstr += chr;
		t--;
	}
	switch (side) {
		case 'left': return padstr + this;
		case 'right': return this + padstr;
		default: break;
	}

	return;
};

/**
 * Define the console if needed.
 * Windows Phone 8, and IE do not
 * have the console defined if it's turned off.
 */
if (!window.console) {
	window.console = {};
	
	// Union of Chrome, FF, IE, and Safari console methods
	var m = [
		"log", "info", "warn", "error", "debug", "trace", "dir", "group",
		"groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
		"dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
	];

	// define undefined methods as noops to prevent errors
	for (var i = 0; i < m.length; i++) {
		if (!window.console[m[i]]) {
			window.console[m[i]] = function(message)
			{
				// Check if we can propagate the message.
				if(window.external.notify)
					window.external.notify(message);
			}
		}
	}
}

/**
 * Main Flixel JS class.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author	ratalaika / ratalaikaGames
 * @namespace Flixel
 */
var Flixel = Flixel ||
{
	VERSION : '<%= version %>',
	AUTO : 0,
	CANVAS : 1,
	WEBGL : 2,
};

/**
 * Define all the packages.
 */
Flixel.data = function() {};

Flixel.plugin = function() {};
Flixel.plugin.powertools = function() {};
Flixel.plugin.store = function() {};
Flixel.plugin.tmx = function() {};
Flixel.plugin.tweens = function() {};
Flixel.plugin.tweens.misc = function() {};
Flixel.plugin.tweens.motion = function() {};
Flixel.plugin.tweens.sound = function() {};
Flixel.plugin.tweens.util = function() {};

Flixel.system = function() {};
Flixel.system.atlas = function() {};
Flixel.system.debug = function() {};
Flixel.system.input = function() {};
Flixel.system.input.pads = function() {};
Flixel.system.replay = function() {};