require([
	'common',

	//VIEWS
	'view/HomeView',
	'view/todo/TodoAppView'

	//MODELS

	//COMMANDS

], function(
	common,

	//VIEWS
	HomeView,
	TodoAppView

	//MODELS

	//COMMANDS
) {

	var ApplicationRouter = Backbone.CommandRouter.extend({

		$el: null,

		njs: null, //navigatorjs.Navigator
		stateViewMap: null, //navigatorjs.integration.StateViewMap

		routes: {
			"": ""
		},

		initialize: function(options) {
			this.$el = options.$el;

			this.injector.map('injector').toValue(this.injector);

			this.initializeNavigator();
			this.mapModels();
			this.mapStates();
			this.bindCommands();

			this.njs.start("todo");
		},

		initializeNavigator: function() {
			this.njs = new navigatorjs.Navigator();
			this.stateViewMap = new navigatorjs.integration.StateViewMap(this.njs, this.$el);
			this.injector.map("njs").toValue(this.njs);

			var debugConsole = new navigatorjs.features.DebugConsole(this.njs),
				$debugConsole = debugConsole.get$El(),
				cssPosition = {position: 'fixed', left: 10, bottom: 10};

			$debugConsole.css(cssPosition).appendTo('body');
		},

		mapModels: function() {
			this.injector.map('todos').toSingleton(Backbone.Collection);
		},

		mapStates: function() {
			this.stateViewMap.mapState("/home").toView(HomeView).withArguments({injector:this.injector});
			this.stateViewMap.mapState("/todo").toView(TodoAppView).withArguments({injector:this.injector});
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