requirejs.config({

	hbs : {
		templateExtension : "hbs",
		disableI18n : true,
		disableHelpers: true //Disable the require-handlebars-plugin magic and use default handlebars behavior
	},

	paths:{
		"vendors":"../vendors",
		"hbs":"../vendors/require-handlebars-plugin/hbs",
		"handlebars" : "../vendors/require-handlebars-plugin/Handlebars",
		"i18nprecompile" : "../vendors/require-handlebars-plugin/hbs/i18nprecompile",
		"json2" : "../vendors/require-handlebars-plugin/hbs/json2",
		"modernizr":"../vendors/modernizr/modernizr",
		"console-polyfill":"../vendors/console-polyfill/index",
		"jquery":"../vendors/jquery/jquery",
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
		"hammer":"../vendors/hammerjs/dist/hammer",
		"jquery.hammer":"../vendors/hammerjs/dist/jquery.hammer",
		"enquire":"../vendors/enquire/dist/enquire",
		"stats":"../vendors/stats.js/src/Stats",
		"handlebars-helpers":"plugins/handlebars-helpers",
		"templates":"../templates"
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim:{

		"ApplicationRouter":{
			"deps":["backbone"]
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

		"jquery.hammer":{
			"deps":["hammer"]
		}
	}
});

require([
	"ApplicationRouter",
	"modernizr",
	"console-polyfill",
	"jquery",
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
	"jquery.hammer",
	"enquire",
	"stats",
	"handlebars-helpers"
], function(ApplicationRouter) {
	//Enforce loading globally used libraries and kicking application off
	
	$(function() {
		var theRouter = new ApplicationRouter({$el: $("body")});
	});
});