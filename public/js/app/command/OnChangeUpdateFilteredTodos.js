define([
	'common'
], function (common) {
	var OnChangeUpdateFilteredTodos = Backbone.Command.extend({

		todosModel: 'inject',
		todoCollection: 'inject',

		execute:function () {
			console.log('OnChangeUpdateFilteredTodos -> execute TODO');

			//TODO implement filtering
			this.todosModel.set({
				filteredTodos: this.todoCollection.models.slice(0)
			});
		}
	});

	return OnChangeUpdateFilteredTodos;
});