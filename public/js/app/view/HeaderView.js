define([
	'text!templates/HeaderView.html',
	'common'
], function (template, common) {
	var HeaderView = Backbone.View.extend({

		navigatorBehaviors: [],

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