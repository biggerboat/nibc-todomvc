define([
	'common'
], function (common) {
	var OnChangeUpdateTodoStatsCommand = Backbone.Command.extend({

		todoCollection: 'inject',
		todosModel: 'inject',

		execute:function () {
			this.todosModel.set({
				remainingCount: this.todoCollection.where({completed: false}).length,
				completeCount: this.todoCollection.where({completed: true}).length
			});
		}
	});

	return OnChangeUpdateTodoStatsCommand;
});