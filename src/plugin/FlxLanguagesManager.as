package com.ratalaika.Flixel.plugin
{
	import com.ratalaika.Flixel.FlxG;

	import flash.utils.ByteArray;
	import flash.utils.Dictionary;

	/**
	 * A class used to give Flixel multi language support.<br>
	 * This class use a singleton pattern.<br>
	 * <br>
	 * v1.0 Initial version<br>
	 * 
	 * @version 1.0 - 25/04/2013
	 * @author ratalaika / ratalaikaGames
	 * @author siondream
	 */
	public class FlxLanguagesManager
	{
		/**
		 * The unique instance of the FlxLanguagesManager.
		 */
		private static var _instance:FlxLanguagesManager = null;
		/**
		 * The default language.
		 */
		public static const DEFAULT_LANGUAGE:String = "en_UK";
		/**
		 * The Spanish language ID.
		 */
		public static const SPANISH_LANGUAGE:String = "es_ES";
		/**
		 * The language hash map.
		 */
		private var _language:Dictionary = null;
		/**
		 * The current language name.
		 */
		private var _languageName:String = null;

		/**
		 * Class constructor.
		 */
		public function FlxLanguagesManager()
		{
			if(_instance !== null) {
				throw new Error("Singleton... use getInstance()");
			}
			
			// Create language map
			_language = new Dictionary();
		}

		/**
		 * Returns the FlxLanguagesManager unique instance.
		 */
		public static function getInstance():FlxLanguagesManager
		{
			if(_instance === null) {
				_instance = new FlxLanguagesManager();
			} 
			return _instance;
		}

		/**
		 * Return the language name.
		 */
		public function getLanguage():String
		{
			return _languageName;
		}
		
		/**
		 * Set the language.
		 */
		public function setLanguage(language:String):void
		{
			_languageName = language;
		}
		
		/**
		 * Set the default system language.
		 */
		public function setDefaultLanguage():void
		{
			_languageName = DEFAULT_LANGUAGE;
		}
		
		/**
		 * Get a string formated with the current arguments.
		 * 
		 * @param key		The string key.
		 * @return			True if it was correctly loaded, false other wise.
		 */
		public function getString(key:String):String
		{
			var string:String;
			if (_language !== null) {
				// Look for string in selected language
				string = _language[key];
				
				if (string !== null) {
					return string;
				}
			}
			
			// Key not found, return the key itself
			return key;
		}

		/**
		 * Load a new language, or the default language if that language does not exist.
		 * 
		 * @param languageName		The language name.
		 * @return					True if it was correctly loaded, false other wise.
		 */
		public function loadLanguage(languageFile:Class, languageName:String=DEFAULT_LANGUAGE):Boolean
		{
			try {
				var txt:String = (new languageFile() as ByteArray).toString();
				var xmlFile:XML = new XML(txt);

				for(var str:* in xmlFile.language.(@name == languageName) .. *) {
					var key:String = xmlFile.language.(@name == languageName).string[str].@key;
					var value:String = xmlFile.language.(@name == languageName).string[str].@value;
					_language[key] = value.split("@").join("\n");
				}

				return true;
			} catch(e:Error) {
				FlxG.log("FlxLanguagesManager", "Error loading languages file:\n" + languageFile + "\nThe error: " + e.message + "\n" + e.getStackTrace());
				return false;
			}
			return false;
		}
	}
}