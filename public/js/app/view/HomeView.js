define([
	'hbs!templates/HomeView'
], function (template) {
	var HomeView = Backbone.View.extend({

		navigatorBehaviors: ["IHasStateTransition"],

		className: 'homeView',

		njs: 'inject',

		events: {
			'click .launch' : 'onLaunchClick'
		},

		initialize: function() {
			this.$el.css({display:'none'});
			this.render();
		},

		render: function() {
			this.$el.html(template({}));

			return this;
		},

		transitionIn: function(callOnComplete) {
			this.$el.css({display:''});
			TweenLite.fromTo(this.$el, 0.5, {alpha:0}, {alpha:1, onComplete:callOnComplete});
		},

		transitionOut: function(callOnComplete) {
			TweenLite.to(this.$el, 0.5, {alpha:0});

			TweenLite.delayedCall(0.5, function() {
				this.$el.css({display:'none'});

				callOnComplete();
			}, null, this);
		},

		onLaunchClick: function(e) {
			this.njs.request('todo');
		}
	});

	return HomeView;
});