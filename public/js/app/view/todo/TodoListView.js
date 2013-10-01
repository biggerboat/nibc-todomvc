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
			'click .toggle': 'onToggleComplete',
			'click .destroy': 'onDestroyClick'
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
				todoItemModel = this.getTodoModelByCheckbox($checkbox);
			
			todoItemModel.set({completed:isCompleted})
		},

		onDestroyClick: function(e) {
			var $checkbox = $(e.target),
				todoItemModel = this.getTodoModelByCheckbox($checkbox);

			this.todoCollection.remove(todoItemModel);
		},

		getTodoIndexByCheckbox: function($checkbox) {
			var $todoItem = $checkbox.parents(".todo:first");

			return $todoItem.data('index');
		},

		getTodoModelByCheckbox: function($checkbox) {
			var todoIndex = this.getTodoIndexByCheckbox($checkbox),
				filteredTodos = this.todosModel.get('filteredTodos');

			return filteredTodos[todoIndex];
		}
	});

	return TodoListView;
});