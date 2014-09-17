module.exports = function(grunt)
{
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadTasks('./tasks');

	grunt.initConfig({
		// The working directories
		compile_dir : 'build',
		dist_dir : 'dist',
		source_dir : 'src',
		docs_dir : 'docs',

		// All the source files
		src : {
			Flixel : [
			// Global elements
			'src/Flixel.js',
			// Support elements
			'src/support/Matrix.js',
			'src/support/ColorTransform.js',
			'src/support/BitmapData.js',
			'src/support/CanvasManager.js',
			'src/support/Device.js',
			'src/support/Cache.js',
			'src/support/Resource.js',
			'src/support/Loader.js',
			'src/support/LocalStorage.js',
			'src/support/StorageManager.js',
			// Basic elements
			'src/FlxPoint.js',
			'src/FlxRect.js',
			'src/FlxBasic.js',
			'src/FlxObject.js',
			'src/FlxPath.js',
			// Game Loop elements
			'src/FlxU.js',
			'src/FlxG.js',
			'src/FlxGroup.js',
			'src/FlxState.js',
			'src/FlxGame.js',
			// Graphical elements
			'src/FlxSprite.js',
			'src/FlxButton.js',
			'src/FlxCamera.js',
			'src/FlxParticle.js',
			'src/FlxEmitter.js',
			'src/FlxTileblock.js',
			'src/FlxTilemap.js',
			'src/FlxText.js',
			'src/data/FlxSystemAsset.js',
			'src/support/ScaleManager.js',
			// Sound elements
			'src/support/SoundChannel.js',
			'src/support/SoundManager.js',
			'src/support/SoundTransform.js',
			'src/FlxSound.js',
			'src/system/FlxVolumeHandler.js',
			// Plugin elements
			'src/plugin/FlxObjectPool.js',
			'src/plugin/FlxMath.js',
			'src/plugin/FlxPause.js',
			'src/plugin/PauseEvent.js',
			'src/plugin/TimerManager.js',
			'src/plugin/DebugPathDisplay.js',
			'src/plugin/FlxTimer.js',
			'src/plugin/FlxVelocity.js',
			'src/plugin/FlxStateStack.js',
			'src/plugin/FlxSplashScreen.js',
			'src/plugin/FlxLogoPixel.js',
			'src/plugin/FlxRectangleButton.js',
			'src/plugin/FlxBitmapFont.js',
			// Plugins powertools
			'src/plugin/powertools/FlxBar.js',
			// System elements
			'src/system/FlxAnim.js',
			'src/system/FlxListPool.js',
			'src/system/FlxList.js',
			'src/system/FlxQuadTreePool.js',
			'src/system/FlxQuadTree.js',
			'src/system/FlxTile.js',
			'src/system/FlxTilemapBuffer.js',
			'src/system/FlxReplay.js',
			// Replay elements
			'src/system/replay/FrameRecord.js',
			'src/system/replay/MouseRecord.js',
			// Atlas elements
			'src/system/atlas/FlxAssetManager.js',
			'src/system/atlas/FlxAtlasInfo.js',
			'src/system/atlas/FlxRegionInfo.js',
			// Input elements
			'src/system/input/Input.js',
			'src/system/input/Mouse.js',
			'src/system/input/Keyboard.js',
			// Game pads
			'src/system/input/pads/FlxAnalog.js',
			'src/system/input/pads/FlxGamePad.js',
			'src/system/input/pads/FlxControllerPad.js',
			'src/system/input/pads/FlxDigitalPad.js',
			'src/system/input/pads/FlxPadButton.js',
			'src/system/input/pads/FlxVirtualPad.js',
			'src/system/input/pads/FlxVirtualPad2.js',
			// TiledMap elements
			'src/plugin/tmx/TiledMap.js',
			'src/plugin/tmx/MapTileSet.js',
			'src/plugin/tmx/MapLayer.js',
			'src/plugin/tmx/MapObjects.js',
			'src/plugin/tmx/MapObject.js',
			'src/plugin/tmx/MapProperties.js',
			// Storage elements
			'src/plugin/store/FlxSave.js',
			'src/plugin/store/FlxPreferences.js',
			// Tweening system
			'src/plugin/tweens/TweenPlugin.js',
			'src/plugin/tweens/FlxTween.js',
			'src/plugin/tweens/util/Ease.js',
			'src/plugin/tweens/misc/AngleTween.js',
			'src/plugin/tweens/misc/NumTween.js',
			'src/plugin/tweens/misc/VarTween.js',
			// Define all the exports
			'src/support/Exports.js',
			]
		},
		pkg : grunt.file.readJSON('package.json'),

		// Compile stuff
		clean : [ '<%= compile_dir %>' ],
		concat : {
			Flixel : {
				options : {
					process : {
						data : {
							version : '<%= pkg.version %>',
							buildDate : '<%= grunt.template.today() %>'
						}
					}
				},
				src : [ '<%= src.Flixel %>' ],
				dest : '<%= compile_dir %>/Flixel.js'
			}
		},
		umd : {
			Flixel : {
				src : '<%= concat.Flixel.dest %>',
				dest : '<%= umd.Flixel.src %>'
			}
		},
		uglify : {
			Flixel : {
				options : {
					banner : '/*! Flixel v<%= pkg.version %> | (c) 2014 Ratalaika Games. */\n'
				},
				src : [ '<%= umd.Flixel.dest %>' ],
				dest : '<%= compile_dir %>/Flixel.min.js'
			}
		},
		copy : {
			Flixel : {
				nonull: true,
				src: '<%= compile_dir %>/Flixel.min.js',
				dest: '<%= dist_dir %>/Flixel.js',
			}
		},
		
		// Documentation stuff
		jsdoc : {
			dist : {
				src: ['readme.md',
					'<%= source_dir %>',
					'<%= source_dir %>/data',
					'<%= source_dir %>/plugin',
					'<%= source_dir %>/plugin/powetools',
					'<%= source_dir %>/plugin/store',
					'<%= source_dir %>/plugin/tmx',
					'<%= source_dir %>/plugin/tweens',
					'<%= source_dir %>/plugin/tweens/misc',
					'<%= source_dir %>/plugin/tweens/motion',
					'<%= source_dir %>/plugin/tweens/sound',
					'<%= source_dir %>/plugin/tweens/util',
					'<%= source_dir %>/support',
					'<%= source_dir %>/system',
					'<%= source_dir %>/system/atlas',
					'<%= source_dir %>/system/debug',
					'<%= source_dir %>/system/input',
					'<%= source_dir %>/system/input/pads',
					'<%= source_dir %>/system/replay',
					],
				options: {
					destination: '<%= docs_dir%>',
					lenient : true // Continue even if there are any errors
				}
			}
		},

		// Testing stuff
		connect: {
			server: {
				options: {
					port: 8080,
					base: ['test_files', 'build']
				}
			}
		},
		watch: {
			files: 'src/**/*.js',
			tasks: ['concat', 'umd']
		},
		open: {
			dev: {
				path: 'http://localhost:8080/index.html'
			}
		},

		// Check the code
		jshint: {
			all: ['Gruntfile.js', '<%= source_dir %>/**/*.js', '<%= compile_dir %>/Flixel.js']
		}
	});

	grunt.registerTask('default', ['connect', 'open', 'watch']);
	grunt.registerTask('build', [ 'clean', 'concat', 'umd', 'uglify', 'copy' ]);
	grunt.registerTask('check', [ 'jshint' ]);
	grunt.registerTask('docs', [ 'jsdoc' ]);
};
