define([
], function () {
	var TodoItemModel = Backbone.Model.extend({
		defaults: {
			id: -1,
			title: '',
			completed: false,
			editing: false
		},

		initialize: function() {
			this.set({
				id: ++TodoItemModel.index
			});
		}
	});

	TodoItemModel.index = -1;

	return TodoItemModel;
});