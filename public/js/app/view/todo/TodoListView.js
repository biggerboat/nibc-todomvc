define([
	'text!templates/todo/TodoListView.html',
	'common'
], function (template, common) {
	var TodoListView = Backbone.View.extend({

		navigatorBehaviors: [""],

		id: 'main',
		tagName: 'section',
		template: Handlebars.compile(template),

		todosModel: 'inject',

		events: {
		},

		initialize: function() {
			this.listenTo(this.todosModel, "change:filteredTodos", this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));
			return this;
		}
	});

	return TodoListView;
});