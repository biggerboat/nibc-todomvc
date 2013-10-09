define([
], function () {
	var OnChangeActiveTodoUpdateURLCommand = Backbone.Command.extend({

		njs: 'inject',
		todosModel: 'inject',

		execute:function () {
			var newState = new navigatorjs.NavigationState("todo"),
				filter = this.todosModel.get('filter'),
				activeTodo = this.todosModel.get('activeTodo');

			if(filter!='all') {
				newState.append(filter);
			}

			if(activeTodo) {
				newState.append('edit/'+activeTodo.get('id'));
			}

			this.njs.request(newState);
		}
	});

	return OnChangeActiveTodoUpdateURLCommand;
});