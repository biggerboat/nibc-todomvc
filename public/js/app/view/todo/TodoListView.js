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
			'click #toggle-all': 'onToggleAllClick',
			'dblclick label': 'onDoubleClickLabel',
			'keypress .edit': 'onEditKeyPress',
			'blur .edit': 'onEditBlur'
		},

		initialize: function() {
			this.listenTo(this.todoCollection, "change", this.render);
			this.listenTo(this.todosModel, "change:filteredTodos change:allCompleted", this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));

			this.$toggleAll = this.$el.find('#toggle-all');

			this.$el.find('.editing .edit').focus();

			return this;
		},

		onToggleComplete: function(e) {
			var $checkbox = $(e.target),
				isCompleted = $checkbox.is(':checked'),
				todoItemModel = this.getTodoModelByTodoChild($checkbox);
			
			todoItemModel.set({completed:isCompleted})
		},

		onDestroyClick: function(e) {
			var $checkbox = $(e.target),
				todoItemModel = this.getTodoModelByTodoChild($checkbox);

			this.todoCollection.remove(todoItemModel);
		},

		onToggleAllClick: function(e) {
			var completed = this.$toggleAll.is(':checked');
			
			this.todoCollection.each(function(todoItemModel) {
				todoItemModel.set({
					completed: completed
				})
			});
		},

		onDoubleClickLabel: function(e) {
			var $label = $(e.target),
				model = this.getTodoModelByTodoChild($label);

			model.set({editing:true});
		},
		
		onEditKeyPress: function(e) {
			if (e.which === 13) {
				this.saveEdits();
				this.stopEditing();
			}
		},
		
		onEditBlur: function(e) {
			this.saveEdits();
			this.stopEditing();
		},
		
		saveEdits: function() {
			var $editingTodo = this.$el.find(".todo.editing"),
				$input = $editingTodo.find('.edit'),
				activeTodo = this.todosModel.get('activeTodo');

			if(activeTodo) {
				activeTodo.set({title: $input.val()});
			}
		},
		
		stopEditing: function() {
			var activeTodo = this.todosModel.get('activeTodo');

			if(activeTodo) {
				activeTodo.set({editing: false});
			}
		},

		get$TodoItemByTodoChild: function($child) {
			return $child.parents(".todo:first");
		},

		getTodoIndexByTodoChild: function($child) {
			var $todoItem = this.get$TodoItemByTodoChild($child);

			return $todoItem.data('index');
		},

		getTodoModelByTodoChild: function($child) {
			var todoIndex = this.getTodoIndexByTodoChild($child),
				filteredTodos = this.todosModel.get('filteredTodos');

			return filteredTodos[todoIndex];
		}
	});

	return TodoListView;
});