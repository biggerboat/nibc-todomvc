define([
], function () {
	var OnChangeUpdateTodoStatsCommand = Backbone.Command.extend({

		todoCollection: 'inject',
		todosModel: 'inject',

		execute:function () {
			var remainingCount = this.todoCollection.where({completed: false}).length,
				completeCount = this.todoCollection.where({completed: true}).length,
				allCompleted = remainingCount == 0 && completeCount>0;

			this.todosModel.set({
				remainingCount: remainingCount,
				completeCount: completeCount,
				allCompleted: allCompleted
			});
		}
	});

	return OnChangeUpdateTodoStatsCommand;
});