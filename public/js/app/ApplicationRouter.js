require([
	'common',

	//VIEWS
	'view/TestView',

	//MODELS
	'model/TestModel',

	//COMMANDS
	'command/OnTestModelChangedLogSomethingCommand'

], function (common,
	 //VIEWS
	 TestView,

	 //SERVICES

	 //MODELS
	 TestModel,

	 //COMMANDS
	 OnTestModelChangedLogSomethingCommand
	) {

	var ApplicationRouter = Backbone.CommandRouter.extend({

		testView: null,

		$el: null,

		routes: {
			"":	""
		},

		initialize: function(options) {
			this.$el = options.$el;

			this.initializeModels();
			this.initializeViews();
			this.addViews();
			this.bindCommands();

			this.injector.getInstance("testModel").set({name:'Paul'});
		},

		initializeModels: function() {
			this.injector.map('testModel').toSingleton(TestModel);
		},

		initializeViews: function() {
			this.testView = new TestView({injector:this.injector});
		},

		addViews: function() {
			this.$el.append(this.testView.render().$el);
		},

		bindCommands: function() {
			this.bindCommand(this.injector.getInstance('testModel'),"change", OnTestModelChangedLogSomethingCommand);
		}
	});

	$(function () {
		var theRouter = new ApplicationRouter({$el:$("body")});
		Backbone.history.start({});
	});
});