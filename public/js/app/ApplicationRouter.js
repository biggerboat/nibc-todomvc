define([
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
	'command/OnEditingTodoChangedUpdateActiveTodoCommand',
	'command/OnChangeActiveTodoUpdateURLCommand',

	'util/isDebug'
], function(
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
	OnEditingTodoChangedUpdateActiveTodoCommand,
	OnChangeActiveTodoUpdateURLCommand,

	isDebug
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

			this.initializeNavigator();
			this.mapModels();
			this.mapStates();
			this.bindCommands();

			if(isDebug) {
				this.addDebug();
			}

			var urlState = this.stateUrlSyncer.getUrlState();

			this.njs.start(urlState.equals('') ? 'home' : urlState);
		},

		initializeNavigator: function() {
			this.njs = new navigatorjs.Navigator();
			this.stateViewMap = new navigatorjs.integration.StateViewMap(this.njs, this.$el);
			/** TMP, SHOULD MOVE INSIDE NAVIGATORJS */
			this.stateUrlSyncer = new navigatorjs.integration.StateUrlSyncer(this.njs);
			this.stateUrlSyncer.usePushState();
			this.stateUrlSyncer.start();
			/** END TMP */
			this.injector.map("njs").toValue(this.njs);
		},

		mapModels: function() {
			this.injector.map('todoCollection').toSingleton(TodoCollection);
			this.injector.map('todosModel').toSingleton(TodosModel);
		},

		mapStates: function() {
			this.stateViewMap.mapState("home").toView(HomeView).withArguments({injector:this.injector});

			//TODO APP
			var todoStates = ["todo", "todo/active", "todo/completed", "todo/edit/*", "todo/active/edit/*", "todo/completed/edit/*"],
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

			this.bindCommand(this.injector.getInstance('todosModel'), "change:activeTodo", OnChangeActiveTodoUpdateURLCommand);
		},

		addDebug: function() {
			var debugConsole = new navigatorjs.features.DebugConsole(this.njs),
				$debugConsole = debugConsole.get$El(),
				cssPosition = {position: 'fixed', left: 10, bottom: 10};

			$debugConsole.css(cssPosition).appendTo('body');

			var stats = new Stats();

			// Align top-left
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.right = '10px';
			stats.domElement.style.top = '10px';

			document.body.appendChild( stats.domElement );

			setInterval( function () {
				stats.update();
			}, 1000 / 60 );
		}
	});

	return ApplicationRouter;
});