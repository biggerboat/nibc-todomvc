define([
], function () {
	var OnEditingTodoChangedUpdateActiveTodoCommand = Backbone.Command.extend({

		todoCollection: 'inject',
		todosModel: 'inject',

		execute:function () {
			var activeTodo = this.todosModel.get('activeTodo'),
				editingTodos = this.todoCollection.where({editing:true}),
				index, todoModel,
				length = editingTodos.length;

			//Update active todo, except it is the current active todo.
			for(index=0; index<length; index++) {
				todoModel = editingTodos[index];
				if(todoModel!=activeTodo) {
					this.todosModel.set({activeTodo:todoModel});
					if(activeTodo){
						activeTodo.set({editing:false});
					}
					return;
				}
			}

			//If we get to this part and the current active todo is no longer editing, then we should reset the active todo
			if(activeTodo && !activeTodo.get('editing')) {
				this.todosModel.set({activeTodo:null});
			}
		}
	});
	
	return OnEditingTodoChangedUpdateActiveTodoCommand;
});