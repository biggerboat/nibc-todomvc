define([
	'model/TodoItemModel',
	'common'
], function (TodoItemModel, common) {
	var TodosModel = Backbone.Model.extend({
		defaults: {
			filteredTodos: null, // []
			filter: 'all' //all, active, completed
		},

		initialize: function() {
			this.set({
				activeTodos: []
			});
		}
	});

	return TodosModel;
});