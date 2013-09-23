define([
	'model/TodoItemModel',
	'common'
], function (TodoItemModel, common) {
	var TodosModel = Backbone.Model.extend({
		defaults: {
			todos: null //Backbone.Collection
		},

		initialize: function() {
			this.set({
				todos: new Backbone.Collection({model:TodoItemModel})
			})
		}
	});

	return TodosModel;
});