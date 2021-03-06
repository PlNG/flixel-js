/**
 * The Canvas class handles everything related to the canvas tag as a DOM Element,<br>
 * like styles, offset, aspect ratio.
 * 
 * v1.0 Initial version
 * 
 * @version 1.0 - 17/09/2014
 * @author ratalaika / ratalaikaGames
 * @author Richard Davey <rich@photonstorm.com>
 */
var CanvasManager = function()
{
};

/**
 * Creates the &lt;canvas&gt; tag
 * 
 * @method CanvasManager.create
 * @param {number}
 *            width - The desired width.
 * @param {number}
 *            height - The desired height.
 * @return {HTMLCanvasElement} The newly created &lt;canvas&gt; tag.
 */
CanvasManager.create = function(width, height)
{

	width = width || 256;
	height = height || 256;

	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	canvas.style.display = 'block';

	return canvas;

};

/**
 * Get the DOM offset values of any given element
 * 
 * @method CanvasManager.getOffset
 * @param {HTMLElement}
 *            element - The targeted element that we want to retrieve the offset.
 * @param {Flixel.FlxPoint}
 *            [point] - The point we want to take the x/y values of the offset.
 * @return {Flixel.FlxPoint} - A point objet with the offsetX and Y as its properties.
 */
CanvasManager.getOffset = function(element, point)
{

	point = point || new Flixel.FlxPoint();

	var box = element.getBoundingClientRect();
	var clientTop = element.clientTop || document.body.clientTop || 0;
	var clientLeft = element.clientLeft || document.body.clientLeft || 0;
	var scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop;
	var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

	point.x = box.left + scrollLeft - clientLeft;
	point.y = box.top + scrollTop - clientTop;

	return point;

};

/**
 * Returns the aspect ratio of the given canvas.
 * 
 * @method CanvasManager.getAspectRatio
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to get the aspect ratio from.
 * @return {number} The ratio between canvas' width and height.
 */
CanvasManager.getAspectRatio = function(canvas)
{
	return canvas.width / canvas.height;
};

/**
 * Sets the background color behind the canvas.<br>
 * This changes the canvas style property.
 * 
 * @method CanvasManager.setBackgroundColor
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the background color on.
 * @param {string}
 *            [color] - The color to set. Can be in the format 'rgb(r,g,b)', or '#RRGGBB' or any valid CSS color.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.setBackgroundColor = function(canvas, color)
{

	color = color || 'rgb(0,0,0)';

	canvas.style.backgroundColor = color;

	return canvas;

};

/**
 * Sets the touch-action property on the canvas style.<br>
 * Can be used to disable default browser touch actions.
 * 
 * @method CanvasManager.setTouchAction
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the touch action on.
 * @param {String}
 *            [value] - The touch action to set. Defaults to 'none'.
 * @return {HTMLCanvasElement} The source canvas.
 */
CanvasManager.setTouchAction = function(canvas, value)
{

	value = value || 'none';

	canvas.style.msTouchAction = value;
	canvas.style['ms-touch-action'] = value;
	canvas.style['touch-action'] = value;

	return canvas;

};

/**
 * Sets the user-select property on the canvas style.<br>
 * Can be used to disable default browser selection actions.
 * 
 * @method CanvasManager.setUserSelect
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the touch action on.
 * @param {String}
 *            [value] - The touch action to set. Defaults to 'none'.
 * @return {HTMLCanvasElement} The source canvas.
 */
CanvasManager.setUserSelect = function(canvas, value)
{

	value = value || 'none';

	canvas.style['-webkit-touch-callout'] = value;
	canvas.style['-webkit-user-select'] = value;
	canvas.style['-khtml-user-select'] = value;
	canvas.style['-moz-user-select'] = value;
	canvas.style['-ms-user-select'] = value;
	canvas.style['user-select'] = value;
	canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

	return canvas;

};

/**
 * Adds the given canvas element to the DOM. The canvas will be added as a child of the given parent.<br>
 * If no parent is given it will be added as a child of the document.body.
 * 
 * @method CanvasManager.addToDOM
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set the touch action on.
 * @param {string|HTMLElement}
 *            parent - The DOM element to add the canvas to. Defaults to ''.
 * @param {boolean}
 *            overflowHidden - If set to true it will add the overflow='hidden' style to the parent DOM element.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.addToDOM = function(canvas, parent, overflowHidden)
{
	overflowHidden = (overflowHidden === undefined) ? true : overflowHidden;
	var target = null;

	if (parent) {
		// hopefully an element ID
		if (typeof parent === 'string') {
			target = document.getElementById(parent);
		} else
		// quick test for a HTMLelement
		if (typeof parent === 'object' && parent.nodeType === 1) {
			target = parent;
		}

		if (overflowHidden) {
			target.style.overflow = 'hidden';
		}
	}

	// fallback, covers an invalid ID and a none HTMLelement object
	if (!target) {
		target = document.body;
	}

	target.appendChild(canvas);

	return canvas;
};

/**
 * Sets the transform of the given canvas to the matrix values provided.
 * 
 * @method CanvasManager.setTransform
 * @param {CanvasRenderingContext2D}
 *            context - The context to set the transform on.
 * @param {number}
 *            translateX - The value to translate horizontally by.
 * @param {number}
 *            translateY - The value to translate vertically by.
 * @param {number}
 *            scaleX - The value to scale horizontally by.
 * @param {number}
 *            scaleY - The value to scale vertically by.
 * @param {number}
 *            skewX - The value to skew horizontaly by.
 * @param {number}
 *            skewY - The value to skew vertically by.
 * @return {CanvasRenderingContext2D} Returns the source context.
 */
CanvasManager.setTransform = function(context, translateX, translateY, scaleX, scaleY, skewX, skewY)
{
	context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);
	return context;
};

/**
 * Sets the Image Smoothing property on the given context. Set to false to disable image smoothing.<br>
 * By default browsers have image smoothing enabled, which isn't always what you visually want,<br>
 * especially when using pixel art in a game. Note that this sets the property on the context itself, so<br>
 * that any image drawn to the context will be affected. This sets the property across all current<br>
 * browsers but support is patchy on earlier browsers, especially on mobile.
 * 
 * @method CanvasManager.setSmoothingEnabled
 * @param {CanvasRenderingContext2D}
 *            context - The context to enable or disable the image smoothing on.
 * @param {boolean}
 *            value - If set to true it will enable image smoothing, false will disable it.
 * @return {CanvasRenderingContext2D} Returns the source context.
 */
CanvasManager.setSmoothingEnabled = function(context, value)
{
	context['imageSmoothingEnabled'] = value;
	context['mozImageSmoothingEnabled'] = value;
	context['oImageSmoothingEnabled'] = value;
	context['webkitImageSmoothingEnabled'] = value;
	context['msImageSmoothingEnabled'] = value;

	return context;
};

/**
 * Sets the CSS image-rendering property on the given canvas to be 'crisp'<br>
 * (aka 'optimize contrast on webkit'). Note that if this doesn't given the<br>
 * desired result then see the setSmoothingEnabled.
 * 
 * @method CanvasManager.setImageRenderingCrisp
 * @param {HTMLCanvasElement}
 *            canvas - The canvas to set image-rendering crisp on.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.setImageRenderingCrisp = function(canvas)
{
	canvas.style['image-rendering'] = 'crisp-edges';
	canvas.style['image-rendering'] = '-moz-crisp-edges';
	canvas.style['image-rendering'] = '-webkit-optimize-contrast';
	canvas.style.msInterpolationMode = 'nearest-neighbor';

	return canvas;
};

/**
 * Sets the CSS image-rendering property on the given canvas to be 'bicubic' (aka 'auto').<br>
 * Note that if this doesn't given the desired result then see<br>
 * the CanvasUtils.setSmoothingEnabled method.
 * 
 * @method CanvasManager.setImageRenderingBicubic
 * @param {HTMLCanvasElement}
 *            canvas The canvas to set image-rendering bicubic on.
 * @return {HTMLCanvasElement} Returns the source canvas.
 */
CanvasManager.setImageRenderingBicubic = function(canvas)
{
	canvas.style['image-rendering'] = 'auto';
	canvas.style.msInterpolationMode = 'bicubic';

	return canvas;
};