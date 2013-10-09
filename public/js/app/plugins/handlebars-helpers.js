require([
	'handlebars'
], function(Handlebars) {

	Handlebars.registerHelper('plural', function (str, count) {
		return str + (count !== 1 ? 's' : '');
	});

});
