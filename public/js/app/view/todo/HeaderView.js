define([
	'hbs!templates/todo/HeaderView',
	'model/TodoItemModel'
], function (template, TodoItemModel) {
	var HeaderView = Backbone.View.extend({

		navigatorBehaviors: [""],

		id: 'header',
		tagName: 'header',

		todoCollection: 'inject',

		$input: null,

		events: {
			'keypress #new-todo': 'onNewTodoKeyPress'
		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(template({}));

			this.$input = this.$el.find('#new-todo');

			return this;
		},

		onNewTodoKeyPress: function (e) {
			var trimmedTitle = this.$input.val().trim();
			//Check if we used the return key
			if (e.which !== 13 || !trimmedTitle) {
				return;
			}

			this.todoCollection.add(new TodoItemModel({title:trimmedTitle}));
			this.$input.val('');
		}
	});

	return HeaderView;
});