![Flixel JS 1.0](http://ratalaika.com/flixel-js/logo.png)

##Flixel JS 1.0
Flixel JS is a port of the famous AS3 library Flixel.

# Index
- [About](#about)
- [Getting Started](#getting-started)
- [Features](#features)
- [Bugs?](#bugs)
- [License](#license)


<a name="#about"></a>
##About
Flixel JS is a port of the famous AS3 library Flixel.
It has some improvements and also some new stuff like support for SpriteSheets or Tiled Map format parser.

It's still new and shinny so you may find some bugs.

Version: 1.0.0 "NewWorld" - Released: 17th September 2014

By Adrian Vega, [ratalaika](http://www.ratalaika.com)

Things you can do now:
* Why not following me on [Twitter](https://twitter.com/ratalaika)?
* You can check out the [examples](https://github.com/ratalaika/flixel-js-examples)!
* Also why not reading the [documentation](http://flixeljs.ratalaika.com/docs)?

<a name="#features"></a>
##Features
***Simple Features***
* Integrated basic collision
* Groups
* Sound
* Mouse input
* Keyboard input
* Touch input
* Color utilities
* Particles
* Text display
* Save games and preferences
* Camera scrolling
* Tilemap support
* Tiled Map format parser

***Advance Features***
* Record and play back
* Path finding
* Camera systems for split screen
* Object recycling
* Tweening
* Sprite Sheep loading for performance
* On Screen game pads
* Bitmap Fonts


<a name="#getting-started"></a>
##Getting Started
***Installing NodeJS and Grunt***
You can get a copy of NodeJS on its site <a target="_blank" href="http://nodejs.org/">here</a> and install it. After installing it you will want to install grunt from the command line.
If you have installed Grunt in the past you may want to remove it first:
<pre lang="javascript">> npm uninstall -g grunt</pre>
Now you can install Grunt's command line tools by typing out the following:
<pre lang="javascript">> npm install -g grunt-cli</pre>
From here, Grunt should work via the command line.

***Setting up the Template's Dependencies***
Via the command line, cd into the template's directory on your compute and run the following command:
<pre lang="javascript">> npm install</pre>
This will run through all the dependencies in the package.json file and install them locally for the project to use. 
After that you can simply run:
<pre lang="javascript">> grunt</pre>

<a name="bugs"></a>
## Bugs?
If you find any kind of bug, or weird problems with the library add them to the [Issue Tracker][issues].
Add as much information as possible, also upload the source code that causes the problem if you can :)!

<a name="license"></a>
## License
Flixel JS is released under the [MIT License](http://opensource.org/licenses/MIT).
Flixel JS uses source code from multiple open source projects. Check the license file for more information.

[issues]: https://github.com/ratalaika/flixel-js/issues
[contribute]: https://github.com/ratalaika/flixel-js/blob/master/CONTRIBUTING.md
