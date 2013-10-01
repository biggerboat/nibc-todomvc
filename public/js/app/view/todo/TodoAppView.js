define([
	'text!templates/todo/TodoAppView.html',
	'common'
], function (
	template,
	common
) {
	var TodoAppView = Backbone.View.extend({

		navigatorBehaviors: ['IHasStateTransition', 'IHasStateValidation', 'IHasStateUpdate'],
		
		className: 'todoAppView',
		template: Handlebars.compile(template),

		injector: 'inject',
		todoCollection: 'inject',
		todosModel: 'inject',
		njs: 'inject',

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
			var editState = new navigatorjs.NavigationState("edit/*");

			if(editState.equals(truncatedState)) {
				var todoId = parseInt(fullState.getLastSegment()),
					segments = fullState.getSegments(),
					filter = segments[segments.length-4],
					where = {id:todoId};

				if(filter=='active' || filter=='completed') {
					where.completed = filter == 'completed';
				}

				return this.todoCollection.where(where).length>0;
			}

			return true;
		},

		updateState: function(truncatedState, fullState) {
			var editState = new navigatorjs.NavigationState("edit/*");

			if(editState.equals(truncatedState)) {
				var todoId = parseInt(fullState.getLastSegment()),
					todoToEdit = this.todoCollection.get(todoId);

				//On deeplink we might arrive here on an invalid todoItem. Bounce when this happens.
				if(todoToEdit) {
					todoToEdit.set({editing:true});
				} else {
					var segments = fullState.getSegments();
					segments = segments.splice(0,segments.length-2);
					this.njs.request(segments.join('/'))
				}
			}
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