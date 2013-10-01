define([
	'text!templates/todo/FooterView.html',
	'common'
], function (template, common) {
	var FooterView = Backbone.View.extend({

		navigatorBehaviors: ["IHasStateUpdate"],

		id: 'footer',
		tagName: 'footer',
		template: Handlebars.compile(template),

		todoCollection: 'inject',
		todosModel: 'inject',

		events: {
			'click #clear-completed': 'onClearCompletedClick'
		},

		initialize: function() {
			this.listenTo(this.todosModel, 'change', this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.todosModel.toJSON()));
			this.$el.find("."+this.todosModel.get('filter')).addClass('selected');
			return this;
		},

		updateState: function(truncatedState, fullState) {
			var filterSegment = fullState.getSegments()[1],
				filter = filterSegment == 'active' || filterSegment == 'completed' ? filterSegment : 'all';

			this.todosModel.set({filter: filter});
		},

		onClearCompletedClick: function() {
			this.todoCollection.reset();
		}
	});

	return FooterView;
});