require([
	'common',

	//VIEWS
	'view/HomeView',
	'view/todo/TodoAppView',
	'view/todo/HeaderView',
	'view/todo/FooterView',
	'view/todo/TodoListView',
	'view/todo/InfoView',

	//MODELS
	'model/TodoCollection',
	'model/TodosModel',

	//COMMANDS
	'command/OnChangeUpdateFilteredTodosCommand',
	'command/OnChangeUpdateTodoStatsCommand',
	'command/OnEditingTodoChangedUpdateActiveTodoCommand'
], function(
	common,

	//VIEWS
	HomeView,
	TodoAppView,
	HeaderView,
	FooterView,
	TodoListView,
	InfoView,

	//MODELS
	TodoCollection,
	TodosModel,

	//COMMANDS
	OnChangeUpdateFilteredTodosCommand,
	OnChangeUpdateTodoStatsCommand,
	OnEditingTodoChangedUpdateActiveTodoCommand
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

			var deeplinkState = window.location.hash.replace('#','');

			this.njs.start(deeplinkState == '' ? 'home' :  deeplinkState);
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
			this.stateViewMap.mapState("home").toView(HomeView).withArguments({injector:this.injector});

			//TODO APP
			var todoStates = ["todo", "todo/active", "todo/completed"],
				todoRecipe = this.stateViewMap.mapState(todoStates).toView(TodoAppView).withArguments({injector:this.injector});

			this.stateViewMap.mapState(todoStates).toView(HeaderView).withArguments({injector:this.injector}).withParent(todoRecipe).inside("#todoapp");
			this.stateViewMap.mapState(todoStates).toView(TodoListView).withArguments({injector:this.injector}).withParent(todoRecipe).inside("#todoapp");
			this.stateViewMap.mapState(todoStates).toView(FooterView).withArguments({injector:this.injector}).withParent(todoRecipe).inside("#todoapp");
			this.stateViewMap.mapState(todoStates).toView(InfoView).withArguments({injector:this.injector}).withParent(todoRecipe);
		},

		bindCommands: function() {
			this.bindCommand(this.injector.getInstance('todoCollection'), "change reset add remove", OnChangeUpdateFilteredTodosCommand);
			this.bindCommand(this.injector.getInstance('todosModel'), "change:filter", OnChangeUpdateFilteredTodosCommand);

			this.bindCommand(this.injector.getInstance('todoCollection'), "change:completed reset add remove", OnChangeUpdateTodoStatsCommand);

			this.bindCommand(this.injector.getInstance('todoCollection'), "change:editing", OnEditingTodoChangedUpdateActiveTodoCommand);
		}
	});

	$(function() {
		var theRouter = new ApplicationRouter({$el: $("body")});
		Backbone.history.start({});
	});
});