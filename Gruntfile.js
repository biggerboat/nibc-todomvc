module.exports = function (grunt) {
	var date = new Date();
	var now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_"+date.getHours()+"."+date.getMinutes()+"."+date.getSeconds();

	grunt.initConfig({
		clean: {
			tmp:["tmp/"],
			'tmp-js':["tmp/deploy/js"]
		},

		copy: {
			tmp: {
				expand: true, cwd: 'public/', src: ['**'], dest: 'tmp/deploy/'
			},

			'persistent-files': {
				files: [
					{ src: 'public/js/vendors/requirejs/require.js', dest: 'tmp/deploy/js/vendors/requirejs/require.js' },
					{ expand:true,cwd:'public/js/vendors/todomvc-common/', src: '**', dest: 'tmp/deploy/js/vendors/todomvc-common/' }
				]
			},

			"deploy-zip-as-now": {
				src: ['tmp/deploy.zip'],
				dest: 'tmp/'+now+'.zip'
			}
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: 'public/js/app',
					mainConfigFile: "public/js/app/common.js",
					name: 'ApplicationRouter',
					out: 'tmp/deploy/js/app/ApplicationRouter.min.js'
				}
			}
		},

		replace: {
			min: {
				src: ['tmp/**/*.html'],
				overwrite: true,
				replacements: [{
					from: 'ApplicationRouter',
					to: 'ApplicationRouter.min'
				}]
			}
		},

		zip: {
			deploy: {
				cwd: 'tmp/deploy/',
				src: ['tmp/deploy/**'],
				dest: 'tmp/deploy.zip'
			}
		},

		concurrent: {
			dev: ['connect:dev', 'watch:dev']
		},

		connect: {
			dev: {
				options: {
					keepalive: true,
					open:true,
					port: 9000,
					base: 'public'
				}
			},
			deploy: {
				options: {
					keepalive: true,
					open:true,
					port: 9001,
					base: 'tmp/deploy/'
				}
			}
		},

		watch: {
			dev: {
				files: 'public/**/*',
				options: {
					livereload: true
				}
			}
		},

		'ftp-deploy': {
			staging: {
				auth: {
					//Username and password are in .ftppass file
					host: 'paultondeur.com',
					port: 21,
					authKey: 'staging'
				},
				src: 'tmp/deploy/',
				dest: 'staging/'+ now
			},

			"staging-zip": {
				auth: {
					//Username and password are in .ftppass file
					host: 'paultondeur.com',
					port: 21,
					authKey: 'staging'
				},
				src: 'tmp',
				dest: 'staging/zip/',
				exclusions: ['deploy','deploy.zip']
			},

			production: {
				auth: {
					//Username and password are in .ftppass file
					host: 'paultondeur.com',
					port: 21,
					authKey: 'production'
				},
				src: 'tmp/deploy/',
				dest: 'production/'
			}
		},

		open: {
			staging: { path: 'http://www.paultondeur.com/files/tmp/grunt/staging/' + now },
			"staging-zip": { path: 'http://www.paultondeur.com/files/tmp/grunt/staging/zip/' + now +".zip" },
			production: { path: 'http://www.paultondeur.com/files/tmp/grunt/production/' }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default', ['deploy']);

	grunt.registerTask('serve', ['concurrent:dev']);

	grunt.registerTask('deploy', ['clean:tmp', 'copy:tmp', 'clean:tmp-js','copy:persistent-files','requirejs','replace:min']);
	grunt.registerTask('deploy:zip', ['deploy','zip:deploy']);

	grunt.registerTask('deploy:local', ['deploy','connect:deploy']);

	grunt.registerTask('deploy:staging', ['deploy', 'ftp-deploy:staging', 'open:staging']);
	grunt.registerTask('deploy:staging:zip', ['deploy:zip', 'copy:deploy-zip-as-now', 'ftp-deploy:staging-zip', 'open:staging-zip']);
	grunt.registerTask('deploy:staging:full', ['deploy:staging', 'deploy:staging:zip']);

	grunt.registerTask('deploy:production', ['deploy', 'ftp-deploy:production', 'open:production']);
};