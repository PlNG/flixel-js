Flixel JS 1.0

## Installing NodeJS and Grunt
You can get a copy of NodeJS on its site <a target="_blank" href="http://nodejs.org/">here</a> and install it. After installing it you will want to install grunt from the command line.
If you have installed Grunt in the past you may want to remove it first:
<pre lang="javascript">> npm uninstall -g grunt</pre>
Now you can install Grunt's command line tools by typing out the following:
<pre lang="javascript">> npm install -g grunt-cli</pre>
From here, Grunt should work via the command line.

## Setting up the Template's Dependencies
Via the command line, cd into the template's directory on your compute and run the following command:
<pre lang="javascript">> npm install</pre>
This will run through all the dependencies in the package.json file and install them locally for the project to use. 
After that you can simply run:
<pre lang="javascript">> grunt</pre>


<a name="license"></a>
## License

Flixel JS is released under the [MIT License](http://opensource.org/licenses/MIT).

[issues]: https://github.com/flixel-js/flixel-js/issues
[contribute]: https://github.com/flixel-js/flixel-js/blob/master/CONTRIBUTING.md
