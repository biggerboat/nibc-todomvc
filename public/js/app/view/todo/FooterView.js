define([
	'text!templates/todo/FooterView.html',
	'common'
], function (template, common) {
	var FooterView = Backbone.View.extend({

		navigatorBehaviors: ["IHasStateUpdate"],

		id: 'footer',
		tagName: 'footer',
		template: Handlebars.compile(template),

		todosModel: 'inject',

		events: {
		},

		initialize: function() {
			this.listenTo(this.todosModel, 'change', this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));

			return this;
		},

		onStateUpdate: function(truncatedState, fullState) {
			console.log('FooterView -> updateState', truncatedState.getPath(), fullState.getPath());
		}
	});

	return FooterView;
});