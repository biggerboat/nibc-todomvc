module.exports = function (grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		requirejs: {
			compile: {
				options: {
					baseUrl: 'public/js/app',
					mainConfigFile: "public/js/app/common.js",
					name: 'ApplicationRouter',
					out: 'public/js/app/ApplicationRouter.min.js'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['requirejs']);
};