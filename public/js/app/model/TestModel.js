define([
	'common'
], function(common) {
	var TestModel = Backbone.Model.extend({
		defaults: {
			name: 'Michiel'
		}
	});

	return TestModel;
});