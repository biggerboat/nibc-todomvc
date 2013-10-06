requirejs.config({
	paths:{
		"vendors":"../vendors",
		"text":"../vendors/requirejs-text/text",
		"jquery":"../vendors/jquery/jquery",
		"handlebars":"../vendors/handlebars/handlebars",
		"underscore":"../vendors/underscore/underscore",
		"backbone":"../vendors/backbone/backbone",
		"injector-js":"../vendors/injector.js/injector-js",
		"navigator-js":"../vendors/navigator.js/navigator-js",
		"backbone-super":"../vendors/backbone-super/backbone-super/backbone-super",
		"backbone-command":"../vendors/backbone-command/backbone-command",
		"backbone-injector":"../vendors/backbone-injector/backbone-injector",
		"backbone-recursive-tojson":"../vendors/backbone-recursive-toJSON/backbone-recursive-tojson",
		"TweenLite":"../vendors/greensock-js/src/uncompressed/TweenLite",
		"TweenEasePack":"../vendors/greensock-js/src/uncompressed/easing/EasePack",
		"TweenCSSPlugin":"../vendors/greensock-js/src/uncompressed/plugins/CSSPlugin",
		"handlebars-helpers":"plugins/handlebars-helpers",
		"templates":"../templates"
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim:{

		"handlebars":{
			"exports":"Handlebars"
		},

		"injector-js":{
			"exports":"injector.Injector"
		},

		"navigator-js":{
			"deps":["jquery"],
			"exports":"navigatorjs.Navigator"
		},

		"underscore":{
			"exports":"_"
		},

		"backbone":{
			"deps":["underscore", "jquery"],
			"exports":"Backbone"  //attaches "Backbone" to the window object
		},

		"backbone-super":{
			"deps":["backbone"]
		},

		"backbone-command":{
			"deps":["backbone"],
			exports:"Backbone.Command"
		},

		"backbone-injector":{
			"deps":["injector-js", "backbone"]
		},

		"backbone-recursive-tojson": {
			deps: ["backbone"]
		},

		"TweenLite":{
			"exports":"TweenLite"
		},

		"TweenEasePack":{
			"deps":["TweenLite"]
		},

		"TweenCSSPlugin":{
			"deps":["TweenLite"]
		},

		"handlebars-helpers": {
			deps: ["handlebars"]
		}
	}
});

define([
	"jquery",
	"handlebars",
	"underscore",
	"backbone",
	"injector-js",
	"navigator-js",
	"backbone-super",
	"backbone-command",
	"backbone-injector",
	"backbone-recursive-tojson",
	"TweenLite",
	"TweenEasePack",
	"TweenCSSPlugin",
	"handlebars-helpers"
], function() {
	//Enforce loading globally used libraries
});