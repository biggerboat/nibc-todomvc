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

		$toggleAll: null,

		events: {
			'click .toggle': 'onToggleComplete',
			'click .destroy': 'onDestroyClick',
			'click #toggle-all': 'onToggleAllClick'
		},

		initialize: function() {
			this.listenTo(this.todoCollection, "change", this.render);
			this.listenTo(this.todosModel, "change:filteredTodos change:allCompleted", this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));

			this.$toggleAll = this.$el.find('#toggle-all');

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

		onToggleAllClick: function(e) {
			var completed = this.$toggleAll.is(':checked');
			console.log('HeaderView -> onToggleAllClick', completed);
			this.todoCollection.each(function(todoItemModel) {
				todoItemModel.set({
					completed: completed
				})
			});
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