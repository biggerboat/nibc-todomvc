define([
	'hbs!templates/todo/InfoView'
], function (template) {
	var InfoView = Backbone.View.extend({

		navigatorBehaviors: [],

		id: 'info',
		tagName: 'footer',

		events: {
		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(template({}));

			return this;
		}
	});

	return InfoView;
});