define([
	'text!templates/FooterView.html',
	'common'
], function (template, common) {
	var FooterView = Backbone.View.extend({

		navigatorBehaviors: [],

		id: 'info',
		tagName: 'footer',
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

	return FooterView;
});