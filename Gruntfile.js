// AdminLTE Gruntfile
module.exports = function (grunt) { // jshint ignore:line
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			pagesJS: {
				files: [{
					expand: true,
					flatten: true,
					src: './build/js/pages/*',
					dest: './dist/js/pages/',
					filter: 'isFile'
				}]
			},
			demoJS: {
				files: [{
					expand: true,
					flatten: true,
					src: './build/js/demo.js',
					dest: './dist/js/',
					filter: 'isFile'
				}]
			},
			plugins: {},
			images: {
				files: [{
					expand: true,
					cwd: 'build/',
					src: ['img/**/*.{png,jpg,gif,svg,jpeg}'],
					dest: 'dist'
				}]
			}
		},
		watch: {
			imageCopier: {
				files: ['build/img/**/*.{png,jpg,gif,svg,jpeg}'],
				tasks: ['copy:images']
			},
			image: {
				files: ['dist/img/**/*.{png,jpg,gif,svg,jpeg}'],
				tasks: ['image']
			},
			js: {
				// Compile js files upon saving
				files: ['build/js/*.js'],
				tasks: ['js']
			},
			less: {
				// Compiles less files upon saving
				files: ['build/less/*.less'],
				tasks: ['less:development', 'less:production']
			},
			skins: {
				// Compile any skin less files upon saving
				files: ['build/less/skins/*.less'],
				tasks: ['less:skins', 'less:minifiedSkins']
			},
			plugins: {
				files: ['build/plugins/**/*'],
				tasks: ['plugins']
			}
		},
		// 'less'-task configuration
		// This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
		less: {
			// Development not compressed
			development: {
				files: {
					'dist/css/bootstrap4.css': 'build/less/Bootstrap4.less',
					// compilation.css  :  source.less
					'dist/css/AdminLTE.css': 'build/less/AdminLTE.less',
					// AdminLTE without plugins
					'dist/css/alt/AdminLTE-without-plugins.css': 'build/less/AdminLTE-without-plugins.less',
					// Separate plugins
					'dist/css/alt/AdminLTE-select2.css': 'build/less/select2.less',
					'dist/css/alt/AdminLTE-fullcalendar.css': 'build/less/fullcalendar.less',
					'dist/css/alt/AdminLTE-bootstrap-social.css': 'build/less/bootstrap-social.less'
				}
			},
			// Production compressed version
			production: {
				options: {
					compress: true
				},
				files: {
					'dist/css/bootstrap4.min.css': 'build/less/Bootstrap4.less',
					// compilation.css  :  source.less
					'dist/css/AdminLTE.min.css': 'build/less/AdminLTE.less',
					// AdminLTE without plugins
					'dist/css/alt/AdminLTE-without-plugins.min.css': 'build/less/AdminLTE-without-plugins.less',
					// Separate plugins
					'dist/css/alt/AdminLTE-select2.min.css': 'build/less/select2.less',
					'dist/css/alt/AdminLTE-fullcalendar.min.css': 'build/less/fullcalendar.less',
					'dist/css/alt/AdminLTE-bootstrap-social.min.css': 'build/less/bootstrap-social.less'
				}
			},
			// Non minified skin files
			skins: {
				files: {
					'dist/css/skins/skin-blue.css': 'build/less/skins/skin-blue.less',
					'dist/css/skins/skin-black.css': 'build/less/skins/skin-black.less',
					'dist/css/skins/skin-yellow.css': 'build/less/skins/skin-yellow.less',
					'dist/css/skins/skin-green.css': 'build/less/skins/skin-green.less',
					'dist/css/skins/skin-red.css': 'build/less/skins/skin-red.less',
					'dist/css/skins/skin-purple.css': 'build/less/skins/skin-purple.less',
					'dist/css/skins/skin-blue-light.css': 'build/less/skins/skin-blue-light.less',
					'dist/css/skins/skin-black-light.css': 'build/less/skins/skin-black-light.less',
					'dist/css/skins/skin-yellow-light.css': 'build/less/skins/skin-yellow-light.less',
					'dist/css/skins/skin-green-light.css': 'build/less/skins/skin-green-light.less',
					'dist/css/skins/skin-red-light.css': 'build/less/skins/skin-red-light.less',
					'dist/css/skins/skin-purple-light.css': 'build/less/skins/skin-purple-light.less',
					'dist/css/skins/_all-skins.css': 'build/less/skins/_all-skins.less'
				}
			},
			// Skins minified
			minifiedSkins: {
				options: {
					compress: true
				},
				files: {
					'dist/css/skins/skin-blue.min.css': 'build/less/skins/skin-blue.less',
					'dist/css/skins/skin-black.min.css': 'build/less/skins/skin-black.less',
					'dist/css/skins/skin-yellow.min.css': 'build/less/skins/skin-yellow.less',
					'dist/css/skins/skin-green.min.css': 'build/less/skins/skin-green.less',
					'dist/css/skins/skin-red.min.css': 'build/less/skins/skin-red.less',
					'dist/css/skins/skin-purple.min.css': 'build/less/skins/skin-purple.less',
					'dist/css/skins/skin-blue-light.min.css': 'build/less/skins/skin-blue-light.less',
					'dist/css/skins/skin-black-light.min.css': 'build/less/skins/skin-black-light.less',
					'dist/css/skins/skin-yellow-light.min.css': 'build/less/skins/skin-yellow-light.less',
					'dist/css/skins/skin-green-light.min.css': 'build/less/skins/skin-green-light.less',
					'dist/css/skins/skin-red-light.min.css': 'build/less/skins/skin-red-light.less',
					'dist/css/skins/skin-purple-light.min.css': 'build/less/skins/skin-purple-light.less',
					'dist/css/skins/_all-skins.min.css': 'build/less/skins/_all-skins.less'
				}
			},
			// Plugins
			plugins: {
				options: {
					compress: true
				},
				files: {}
			}
		},

		// Uglify task info. Compress the js files.
		uglify: {
			options: {
				mangle: true,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
				sourceMap: true,
				preserveComments: 'all'
			},
			production: {
				options: {
					preserveComments: false
				},
				files: {
					'dist/js/vendor.min.js': ['dist/js/vendor.js'],
					'dist/js/adminlte.min.js': ['dist/js/adminlte.js']
				}
			},
			plugins: {
				options: {
					preserveComments: false
				},
				files: {}
			}
		},

		// Concatenate JS Files
		concat: {
			options: {
				separator: '\n\n'
			},
			dist: {
				options: {
					banner: '/*! AdminLTE app.js\n'
                        + '* ================\n'
                        + '* Main JS application file for AdminLTE v2. This file\n'
                        + '* should be included in all pages. It controls some layout\n'
                        + '* options and implements exclusive AdminLTE plugins.\n'
                        + '*\n'
                        + '* @author Colorlib\n'
                        + '* @support <https://github.com/ColorlibHQ/AdminLTE/issues>\n'
                        + '* @version <%= pkg.version %>\n'
                        + '* @repository <%= pkg.repository.url %>\n'
                        + '* @license MIT <http://opensource.org/licenses/MIT>\n'
                        + '*/\n\n'
                        + '// Make sure jQuery has been loaded\n'
                        + 'if (typeof jQuery === \'undefined\') {\n'
                        + 'throw new Error(\'AdminLTE requires jQuery\')\n'
                        + '}\n\n',
					sourceMap: true,
					sourceMapIncludeSources: true
				},
				src: [
					'build/js/BoxRefresh.js',
					'build/js/BoxWidget.js',
					'build/js/ControlSidebar.js',
					'build/js/DirectChat.js',
					'build/js/PushMenu.js',
					'build/js/TodoList.js',
					'build/js/Tree.js',
					'build/js/Layout.js'
				],
				dest: 'dist/js/adminlte.js'
			},
			vendor: {
				src: [
					'node_modules/jquery/dist/jquery.js',
					'node_modules/bootstrap/dist/js/bootstrap.bundle.js'
				],
				dest: 'dist/js/vendor.js'
			},
			plugins: {}
		},

		// Build the documentation files
		includes: {
			build: {
				src: ['*.html'], // Source files
				dest: 'documentation/', // Destination directory
				flatten: true,
				cwd: 'documentation/build',
				options: {
					silent: true,
					includePath: 'documentation/build/include'
				}
			}
		},

		// Optimize images
		image: {
			dynamic: {
				files: [
					{
						expand: true,
						cwd: 'dist/img/',
						src: ['**/*.{png,jpg,gif,svg,jpeg}'],
						dest: 'dist/img/'
					}
				]
			}
		},

		// Validate JS code
		jshint: {
			options: {
				jshintrc: 'build/js/.jshintrc'
			},
			grunt: {
				options: {
					jshintrc: 'build/grunt/.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			core: {
				src: 'build/js/*.js'
			},
			demo: {
				src: 'dist/js/demo.js'
			},
			pages: {
				src: 'dist/js/pages/*.js'
			},
			plugins: {
				src: 'dist/plugins/**/js/*.js'
			}
		},

		jscs: {
			options: {
				config: 'build/js/.jscsrc'
			},
			core: {
				src: '<%= jshint.core.src %>'
			},
			pages: {
				src: '<%= jshint.pages.src %>'
			},
			plugins: {
				src: '<%= jshint.plugins.src %>'
			}
		},

		// Validate CSS files
		csslint: {
			options: {
				csslintrc: 'build/less/.csslintrc'
			},
			dist: [
				'dist/css/AdminLTE.css'
			]
		},

		// Validate Bootstrap HTML
		bootlint: {
			options: {
				relaxerror: ['W005']
			},
			files: ['pages/**/*.html', '*.html']
		},

		// Delete images in build directory
		// After compressing the images in the build/img dir, there is no need
		// for them
		clean: {
			dist: ['dist']
		}
	});

	// Load all grunt tasks

	// LESS Compiler
	grunt.loadNpmTasks('grunt-contrib-less');
	// Watch File Changes
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Compress JS Files
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Include Files Within HTML
	grunt.loadNpmTasks('grunt-includes');
	// Optimize images
	grunt.loadNpmTasks('grunt-image');
	// Validate JS code
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	// Delete not needed files
	grunt.loadNpmTasks('grunt-contrib-clean');
	// Lint CSS
	grunt.loadNpmTasks('grunt-contrib-csslint');
	// Lint Bootstrap
	grunt.loadNpmTasks('grunt-bootlint');
	// Concatenate JS files
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Copy
	grunt.loadNpmTasks('grunt-contrib-copy');

	// imageCopyBuild Task
	grunt.registerTask('imageCopyBuild', ['copy:images', 'image']);
	// pluginsCopyBuild Task
	grunt.registerTask('pluginsCopyBuild', ['copy:plugins', 'pluginsBuild']);
	// pluginsBuild Task
	grunt.registerTask('pluginsBuild', ['less:plugins', 'concat:plugins', 'uglify:plugins']);
	// JS task
	grunt.registerTask('js', ['concat:dist', 'concat:vendor', 'uglify:production']);
	// Linting task
	grunt.registerTask('lint', ['jshint', 'csslint', 'bootlint']);
	// skinsBuild Task
	grunt.registerTask('skinsBuild', ['less:skins', 'less:minifiedSkins']);
	// CSS Task
	grunt.registerTask('css', ['less:development', 'less:production', 'skinsBuild']);
	// Prod Task
	grunt.registerTask('prod', ['imageCopyBuild', 'copy:pagesJS', 'copy:demoJS', 'less:production', 'less:minifiedSkins', 'pluginsCopyBuild', 'js']);
	// Release Task
	grunt.registerTask('release', ['copy', 'image', 'css', 'less:plugins', 'concat', 'uglify']);

	// The default task
	grunt.registerTask('default', ['watch']);
};
