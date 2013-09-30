require([
	'common',

	//VIEWS
	'view/HomeView',
	'view/todo/TodoAppView',

	//MODELS
	'model/TodoCollection',
	'model/TodosModel',

	//COMMANDS
	'command/OnChangeUpdateFilteredTodos'
], function(
	common,

	//VIEWS
	HomeView,
	TodoAppView,

	//MODELS
	TodoCollection,
	TodosModel,

	//COMMANDS
	OnChangeUpdateFilteredTodos
) {

	var ApplicationRouter = Backbone.CommandRouter.extend({

		$el: null,

		njs: null, //navigatorjs.Navigator
		stateViewMap: null, //navigatorjs.integration.StateViewMap
		stateUrlSyncer: null, //new navigatorjs.integration.StateUrlSyncer

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

			this.njs.start("home");
		},

		initializeNavigator: function() {
			this.njs = new navigatorjs.Navigator();
			this.stateViewMap = new navigatorjs.integration.StateViewMap(this.njs, this.$el);
			/** TMP, SHOULD MOVE INSIDE NAVIGATORJS */
			this.stateUrlSyncer = new navigatorjs.integration.StateUrlSyncer(this.njs);
			//this.stateUrlSyncer.usePushState("");
			this.stateUrlSyncer.start();
			/** END TMP */
			this.injector.map("njs").toValue(this.njs);

			var debugConsole = new navigatorjs.features.DebugConsole(this.njs),
				$debugConsole = debugConsole.get$El(),
				cssPosition = {position: 'fixed', left: 10, bottom: 10};

			$debugConsole.css(cssPosition).appendTo('body');
		},

		mapModels: function() {
			this.injector.map('todoCollection').toSingleton(TodoCollection);
			this.injector.map('todosModel').toSingleton(TodosModel);
		},

		mapStates: function() {
			this.stateViewMap.mapState("/home").toView(HomeView).withArguments({injector:this.injector});
			this.stateViewMap.mapState("/todo").toView(TodoAppView).withArguments({injector:this.injector});
		},

		bindCommands: function() {
			this.bindCommand(this.injector.getInstance('todoCollection'), "change reset add remove", OnChangeUpdateFilteredTodos);
		}
	});

	$(function() {
		var theRouter = new ApplicationRouter({$el: $("body")});
		Backbone.history.start({});
	});
});