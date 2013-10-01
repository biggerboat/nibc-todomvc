define([
	'text!templates/todo/TodoAppView.html',
	'common'
], function (
	template,
	common
) {
	var TodoAppView = Backbone.View.extend({

		navigatorBehaviors: ['IHasStateTransition', 'IHasStateValidation'],
		
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
		
		validate: function(truncatedState, fullState) {
			console.log('TodoAppView -> validate', truncatedState.getPath(), fullState.getPath());

			var editState = new navigatorjs.NavigationState("edit/*");

			if(editState.equals(truncatedState)) {
				var todoId = parseInt(truncatedState.getLastSegment());

				if(todoId<10) {
					return true;
				} else {
					return false;
				}
			}

			return true;
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