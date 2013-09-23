define([
	'text!templates/todo/TodoAppView.html',
	'view/todo/HeaderView',
	'view/todo/TodoListView',
	'view/todo/FooterView',
	'view/todo/InfoView',
	'common'
], function (
	template,
	HeaderView,
	TodoListView,
	FooterView,
	InfoView,
	common
) {
	var TodoAppView = Backbone.View.extend({

		navigatorBehaviors: ['IHasStateTransition'],
		
		className: 'todoAppView',
		template: Handlebars.compile(template),

		injector: 'inject',

		$todoapp: null,

		headerView: null,
		todoListView: null,
		footerView: null,
		infoView: null,

		initialize: function() {
			this.headerView = new HeaderView({injector:this.injector});
			this.todoListView = new TodoListView({injector:this.injector});
			this.footerView = new FooterView({injector:this.injector});
			this.infoView = new InfoView({injector:this.injector});

			TweenLite.set(this.$el,{alpha:0, display:'none'});
			this.render();
		},

		render: function() {
			this.$el.html(this.template({}));
			this.$todoapp = this.$el.find('#todoapp');

			this.$todoapp.append(this.headerView.render().$el);
			this.$todoapp.append(this.todoListView.render().$el);
			this.$todoapp.append(this.footerView.render().$el);
			this.$el.append(this.infoView.render().$el);

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