define([
	'common'
], function (common) {
	var TodoItemModel = Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false,
			editing: false
		}
	});

	return TodoItemModel;
});