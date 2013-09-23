require([
	'common',

	//VIEWS
	'view/TodoAppView',
	'view/HeaderView',
	'view/FooterView'

	//MODELS

	//COMMANDS

], function(
	common,

	//VIEWS
	TodoAppView,
	HeaderView,
	FooterView

	//MODELS

	//COMMANDS
) {

	var ApplicationRouter = Backbone.CommandRouter.extend({

		$el: null,

		njs: null, //navigatorjs.Navigator
		stateViewMap: null, //navigatorjs.integration.StateMap

		routes: {
			"": ""
		},

		initialize: function(options) {
			this.$el = options.$el;

			this.njs = new navigatorjs.Navigator();
			this.stateViewMap = new navigatorjs.integration.StateViewMap(this.njs, this.$el);
			this.injector.map("njs").toValue(this.njs);

			var debugConsole = new navigatorjs.features.DebugConsole(this.njs),
				$debugConsole = debugConsole.get$El(),
				cssPosition = {position: 'fixed', left: 10, bottom: 10};

			$debugConsole.css(cssPosition).appendTo('body');

			this.mapModels();
			this.mapStates();
			this.bindCommands();

			this.njs.start();
		},

		mapModels: function() {

		},

		mapStates: function() {
			var todoAppViewRecipe = this.stateViewMap.mapState("/").toView(TodoAppView);
			this.stateViewMap.mapState("/").toView(HeaderView).withParent(todoAppViewRecipe);
			this.stateViewMap.mapState("/").toView(FooterView);
		},

		bindCommands: function() {
			//this.bindCommand(this.injector.getInstance('testModel'), "change", OnTestModelChangedLogSomethingCommand);
		}
	});

	$(function() {
		var theRouter = new ApplicationRouter({$el: $("body")});
		Backbone.history.start({});
	});
});