define([
	'text!templates/todo/TodoListView.html',
	'common'
], function (template, common) {
	var TodoListView = Backbone.View.extend({

		id: 'main',
		tagName: 'section',
		template: Handlebars.compile(template),

		todos: 'inject',

		events: {
		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template({}));
			return this;
		}
	});

	return TodoListView;
});