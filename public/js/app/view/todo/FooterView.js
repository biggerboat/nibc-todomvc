define([
	'text!templates/todo/FooterView.html',
	'common'
], function (template, common) {
	var FooterView = Backbone.View.extend({
		id: 'footer',
		tagName: 'footer',
		template: Handlebars.compile(template),

		todosModel: 'inject',

		events: {
		},

		initialize: function() {
			this.listenTo(this.todosModel, 'change', this.render);
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));

			return this;
		}
	});

	return FooterView;
});