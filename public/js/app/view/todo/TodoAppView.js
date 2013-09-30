define([
	'text!templates/todo/TodoAppView.html',
	'common'
], function (
	template,
	common
) {
	var TodoAppView = Backbone.View.extend({

		navigatorBehaviors: ['IHasStateTransition'],
		
		className: 'todoAppView',
		template: Handlebars.compile(template),

		injector: 'inject',

		$todoapp: null,

		initialize: function() {
			TweenLite.set(this.$el,{alpha:0, display:'none'});
			this.render();
		},

		render: function() {
			this.$el.html(this.template({}));
			return this;
		},

		transitionIn: function(callOnComplete) {
			TweenLite.set(this.$el,{display:''});
			TweenLite.to(this.$el, 0.5, {alpha:1, onComplete:callOnComplete});
		},

		transitionOut: function(callOnComplete) {
			TweenLite.to(this.$el, 0.5, {alpha:0});

			TweenLite.delayedCall(0.5, function() {
				this.$el.css({display:'none'});

				callOnComplete();
			}, null, this);
		}
	});

	return TodoAppView;
});