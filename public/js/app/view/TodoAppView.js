define([
	'common'
], function (common) {
	var TodoAppView = Backbone.View.extend({

		navigatorBehaviors: ['IHasStateTransition'],
		
		id: 'todoapp',
		tagName: 'section',

		transitionIn: function(callOnComplete) {
			TweenLite.fromTo(this.$el, 0.5, {alpha:0}, {alpha:1, onComplete:callOnComplete});
		},

		transitionOut: function(callOnComplete) {
			TweenLite.to(this.$el, 0.5, {alpha:0, onComplete:callOnComplete});
		}
	});

	return TodoAppView;
});