define([
	'text!templates/todo/TodoListView.html',
	'common'
], function (template, common) {
	var TodoListView = Backbone.View.extend({

		navigatorBehaviors: [""],

		id: 'main',
		tagName: 'section',
		template: Handlebars.compile(template),

		todoCollection: 'inject',
		todosModel: 'inject',

		events: {
			'click .toggle': 'onToggleComplete'
		},

		initialize: function() {
			this.listenTo(this.todoCollection, "change", this.render);
			this.listenTo(this.todosModel, "change:filteredTodos", this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));

			return this;
		},

		onToggleComplete: function(e) {
			var $checkbox = $(e.target),
				isCompleted = $checkbox.is(':checked'),
				$todoItem = $checkbox.parents(".todo:first"),
				todoIndex = $todoItem.data('index'),
				filteredTodos = this.todosModel.get('filteredTodos'),
				todoItemModel = filteredTodos[todoIndex];
			
			todoItemModel.set({completed:isCompleted})
		}
	});

	return TodoListView;
});