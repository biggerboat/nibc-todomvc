define([
	'model/TodoItemModel'
], function (TodoItemModel) {
	var TodosModel = Backbone.Model.extend({
		defaults: {
			filteredTodos: null, // []
			filter: 'all', //all, active, completed
			remainingCount: 0,
			completeCount: 0,
			allCompleted: false,
			activeTodo: null
		},

		initialize: function() {
			this.set({
				filteredTodos: []
			});
		}
	});

	return TodosModel;
});