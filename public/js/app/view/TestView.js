define([
	'text!templates/TestView.html',
	'common'
], function(template, common) {
	var TestView = Backbone.View.extend({
		className: 'testView',
		template: Handlebars.compile(template),

		testModel: 'inject',

		events: {
		},

		initialize: function() {
			this.listenTo(this.testModel, 'change:name', this.render);
		},

		render: function() {
			this.$el.html(this.template(this.testModel.toJSON()));

			return this;
		}
	});

	return TestView;
});
