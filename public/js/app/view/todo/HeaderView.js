define([
	'text!templates/todo/HeaderView.html',
	'common'
], function (template, common) {
	var HeaderView = Backbone.View.extend({

		id: 'header',
		tagName: 'header',
		template: Handlebars.compile(template),

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

	return HeaderView;
});