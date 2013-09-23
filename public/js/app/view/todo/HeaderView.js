define([
	'text!templates/todo/HeaderView.html',
	'model/TodoItemModel',
	'common'
], function (template, TodoItemModel, common) {
	var HeaderView = Backbone.View.extend({

		id: 'header',
		tagName: 'header',
		template: Handlebars.compile(template),

		todoCollection: 'inject',

		$input: null,

		events: {
			'keypress #new-todo': 'createOnEnter'
		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template({}));

			this.$input = this.$el.find('#new-todo');

			return this;
		},

		createOnEnter: function (e) {
			var trimmedTitle = this.$input.val().trim();
			if (e.which !== 13 || !trimmedTitle) {
				return;
			}

			this.todoCollection.add(new TodoItemModel({title:trimmedTitle}));
			this.$input.val('');
		}


	});

	return HeaderView;
});