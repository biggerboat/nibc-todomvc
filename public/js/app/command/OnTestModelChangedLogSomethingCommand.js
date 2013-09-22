define([
	'common'
], function(common) {
	var OnTestModelChangedLogSomethingCommand = Backbone.Command.extend({

		testModel: 'inject',

		execute: function() {
			var thePrevName = this.testModel.previous('name'),
				theCurrentName = this.testModel.get('name');

			console.log('OnTestModelChangedLogSomethingCommand -> execute', 'name changed from', thePrevName, 'to name:', theCurrentName);
		}
	});

	return OnTestModelChangedLogSomethingCommand;
});