define([
	'common'
], function (common) {
	var OnChangeUpdateFilteredTodos = Backbone.Command.extend({

		todosModel: 'inject',
		todoCollection: 'inject',

		execute:function () {
			var filter = this.todosModel.get('filter');

			this.todosModel.set({
				filteredTodos: filter == 'all' ? this.todoCollection.models.slice(0) : this.todoCollection.where({completed: filter=='completed'})
			});
		}
	});

	return OnChangeUpdateFilteredTodos;
});