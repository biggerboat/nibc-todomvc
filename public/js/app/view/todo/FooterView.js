define([
	'text!templates/todo/FooterView.html',
	'common'
], function (template, common) {
	var FooterView = Backbone.View.extend({
		id: 'footer',
		tagName: 'footer',
		template: Handlebars.compile(template),

		events: {
		},

		initialize: function() {

		},

		render: function() {
			this.$el.html(this.template({}));

			return this;
		}
	});

	return FooterView;
});