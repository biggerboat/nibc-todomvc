module.exports = function (grunt) {
	var date = new Date();
	var now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_"+date.getHours()+"."+date.getMinutes()+"."+date.getSeconds();
	var utils = require('grunt-connect-rewrite/lib/utils');

	grunt.initConfig({
		clean: {
			tmp:["tmp/"],
			'tmp-js':["tmp/deploy/js"],
			'compass-generated':["public/css","public/images/generated"],
			'tmp-spritesheets':["tmp/deploy/images/spritesheets"]
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
					mainConfigFile: "public/js/app/MainApp.js",
					name: 'MainApp',
					out: 'tmp/deploy/js/app/MainApp.min.js',

					paths: {
						"util/isDebug": "util/isDebug-production",
						"stats": "util/ignore"
					},

					pragmasOnSave: {
						//Exclude Handlebars as much as possible from the build
						excludeHbsParser : true,
						excludeHbs: true,
						excludeAfterBuild: true
					}
				}
			}
		},

		'cache-busting': {
			requirejs: {
				replace: ['tmp/**/*.html'],
				replacement: 'MainApp',
				file: 'tmp/deploy/js/app/MainApp.min.js'
			},
			css: {
				replace: ['tmp/**/*.html'],
				replacement: 'style.css',
				file: 'tmp/deploy/css/style.css'
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
			dev: ['serve:dev', 'watch']
		},

		connect: {
			dev: {
				options: {
					keepalive: true,
					open:true,
					port: 9000,
					base: 'public',
					middleware: function (connect, options) {
						return [
							connect.static(options.base), //Default
							utils.rewriteRequest, // RewriteRules support, this modifies the request
							connect.static(require('path').resolve(options.base)) //Try processing the request again
						];
					},
				}
			},
			deploy: {
				options: {
					keepalive: true,
					open:true,
					port: 9001,
					base: 'tmp/deploy/',
					middleware: function (connect, options) {
						return [
							connect.static(options.base), //Default
							utils.rewriteRequest, // RewriteRules support, this modifies the request
							connect.static(require('path').resolve(options.base)) //Try processing the request again
						];
					},
				}
			},

			rules: {
				'.*': '/index.html'
			}
		},

		watch: {
			options: {
				livereload: true
			},

			dev: {
				files: ['public/**/*', '!public/css/**', '!public/js/vendors/**'],
			},

			css: {
				files: ['public/css/**'],
			},

			sass: {
				options: {
					livereload: false
				},

				files:['sass/**/*'],
				tasks:["compass:dev"]
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
		},

		compass: {
			clean: {
				options: {
					clean: true
				}
			},

			dev: {
				options: {
					sassDir: 'sass',
					config: 'sass/config.rb'
				}
			},

			deploy: {
				options: {
					sassDir: 'sass',
					outputStyle: 'compressed',
					config: 'sass/config.rb'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-cache-busting');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-connect-rewrite');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', ['deploy']);

	grunt.registerTask('clean:compass', ['clean:compass-generated', 'compass:clean']);

	grunt.registerTask('serve', ['clean:compass', 'compass:dev', 'concurrent:dev']);
	grunt.registerTask('serve:dev', ['configureRewriteRules', 'connect:dev']);

	grunt.registerTask('deploy',   ['clean:compass', 'compass:deploy', 'clean:tmp',
									'copy:tmp', 'clean:tmp-js', 'clean:tmp-spritesheets',
									'copy:persistent-files', 'requirejs', 'cache-busting',
									'clean:compass', 'compass:dev']);

	grunt.registerTask('deploy:zip', ['deploy','zip:deploy']);

	grunt.registerTask('deploy:local', ['deploy', 'configureRewriteRules','connect:deploy']);

	grunt.registerTask('deploy:staging', ['deploy', 'ftp-deploy:staging', 'open:staging']);
	grunt.registerTask('deploy:staging:zip', ['deploy:zip', 'copy:deploy-zip-as-now', 'ftp-deploy:staging-zip', 'open:staging-zip']);
	grunt.registerTask('deploy:staging:full', ['deploy:staging', 'deploy:staging:zip']);

	grunt.registerTask('deploy:production', ['deploy', 'ftp-deploy:production', 'open:production']);
};