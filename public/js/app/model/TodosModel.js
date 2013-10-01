define([
	'model/TodoItemModel',
	'common'
], function (TodoItemModel, common) {
	var TodosModel = Backbone.Model.extend({
		defaults: {
			filteredTodos: null, // []
			filter: 'all', //all, active, completed
			remainingCount: 0,
			completeCount: 0
		},

		initialize: function() {
			this.set({
				filteredTodos: []
			});
		}
	});

	return TodosModel;
});