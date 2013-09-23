define([
	'common'
], function (common) {
	var TodoItemModel = Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false
		}
	});

	return TodoItemModel;
});