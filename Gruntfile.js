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
					src: './src/js/pages/*',
					dest: './dist/js/pages/',
					filter: 'isFile'
				}]
			},
			demoJS: {
				files: [{
					expand: true,
					flatten: true,
					src: './src/js/demo.js',
					dest: './dist/js/',
					filter: 'isFile'
				}]
			},
			plugins: {
				files: {
					// Pace JS
					'dist/plugins/pace-js/pace.css': 'node_modules/pace-js/themes/white/pace-theme-flash.css',
					'dist/plugins/pace-js/pace.js': 'node_modules/pace-js/pace.js',

					// Morris.js
					'dist/plugins/morris.js06/morris.css': 'node_modules/morris.js06/dist/morris.css',
					'dist/plugins/morris.js06/raphael.min.js': 'node_modules/morris.js06/examples/lib/raphael.min.js',
					'dist/plugins/morris.js06/morris.js': 'node_modules/morris.js06/dist/morris.js',

					// jqvmap
					'dist/plugins/jqvmap/jqvmap.css': 'node_modules/jqvmap/dist/jqvmap.css',
					'dist/plugins/jqvmap/maps/jquery.vmap.world.js': 'node_modules/jqvmap/dist/maps/jquery.vmap.world.js',
					'dist/plugins/jqvmap/jquery.vmap.js': 'node_modules/jqvmap/dist/jquery.vmap.js'
				}
			},
			images: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['img/**/*.{png,jpg,gif,svg,jpeg}'],
					dest: 'dist'
				}]
			}
		},
		watch: {
			imageCopier: {
				files: ['src/img/**/*.{png,jpg,gif,svg,jpeg}'],
				tasks: ['copy:images']
			},
			image: {
				files: ['dist/img/**/*.{png,jpg,gif,svg,jpeg}'],
				tasks: ['image']
			},
			js: {
				// Compile js files upon saving
				files: ['src/js/*.js', 'src/js/**/*.js'],
				tasks: ['js']
			},
			less: {
				// Compiles less files upon saving
				files: ['src/less/*.less'],
				tasks: ['less:development', 'less:production']
			},
			skins: {
				// Compile any skin less files upon saving
				files: ['src/less/skins/*.less'],
				tasks: ['less:skins', 'less:minifiedSkins']
			},
			plugins: {
				files: ['dist/plugins/**/*'],
				tasks: ['plugins']
			}
		},
		// 'less'-task configuration
		// This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
		less: {
			// Development not compressed
			development: {
				files: {
					'dist/css/bootstrap4.css': 'src/less/Bootstrap4.less',
					// compilation.css  :  source.less
					'dist/css/AdminLTE.css': 'src/less/AdminLTE.less',
					// AdminLTE without plugins
					'dist/css/alt/AdminLTE-without-plugins.css': 'src/less/AdminLTE-without-plugins.less',
					// Separate plugins
					'dist/css/alt/AdminLTE-select2.css': 'src/less/select2.less',
					'dist/css/alt/AdminLTE-fullcalendar.css': 'src/less/fullcalendar.less',
					'dist/css/alt/AdminLTE-bootstrap-social.css': 'src/less/bootstrap-social.less'
				}
			},
			// Production compressed version
			production: {
				options: {
					compress: true
				},
				files: {
					'dist/css/bootstrap4.min.css': 'src/less/Bootstrap4.less',
					// compilation.css  :  source.less
					'dist/css/AdminLTE.min.css': 'src/less/AdminLTE.less',
					// AdminLTE without plugins
					'dist/css/alt/AdminLTE-without-plugins.min.css': 'src/less/AdminLTE-without-plugins.less',
					// Separate plugins
					'dist/css/alt/AdminLTE-select2.min.css': 'src/less/select2.less',
					'dist/css/alt/AdminLTE-fullcalendar.min.css': 'src/less/fullcalendar.less',
					'dist/css/alt/AdminLTE-bootstrap-social.min.css': 'src/less/bootstrap-social.less'
				}
			},
			// Non minified skin files
			skins: {
				files: {
					'dist/css/skins/skin-blue.css': 'src/less/skins/skin-blue.less',
					'dist/css/skins/skin-black.css': 'src/less/skins/skin-black.less',
					'dist/css/skins/skin-yellow.css': 'src/less/skins/skin-yellow.less',
					'dist/css/skins/skin-green.css': 'src/less/skins/skin-green.less',
					'dist/css/skins/skin-red.css': 'src/less/skins/skin-red.less',
					'dist/css/skins/skin-purple.css': 'src/less/skins/skin-purple.less',
					'dist/css/skins/skin-blue-light.css': 'src/less/skins/skin-blue-light.less',
					'dist/css/skins/skin-black-light.css': 'src/less/skins/skin-black-light.less',
					'dist/css/skins/skin-yellow-light.css': 'src/less/skins/skin-yellow-light.less',
					'dist/css/skins/skin-green-light.css': 'src/less/skins/skin-green-light.less',
					'dist/css/skins/skin-red-light.css': 'src/less/skins/skin-red-light.less',
					'dist/css/skins/skin-purple-light.css': 'src/less/skins/skin-purple-light.less',
					'dist/css/skins/_all-skins.css': 'src/less/skins/_all-skins.less'
				}
			},
			// Skins minified
			minifiedSkins: {
				options: {
					compress: true
				},
				files: {
					'dist/css/skins/skin-blue.min.css': 'src/less/skins/skin-blue.less',
					'dist/css/skins/skin-black.min.css': 'src/less/skins/skin-black.less',
					'dist/css/skins/skin-yellow.min.css': 'src/less/skins/skin-yellow.less',
					'dist/css/skins/skin-green.min.css': 'src/less/skins/skin-green.less',
					'dist/css/skins/skin-red.min.css': 'src/less/skins/skin-red.less',
					'dist/css/skins/skin-purple.min.css': 'src/less/skins/skin-purple.less',
					'dist/css/skins/skin-blue-light.min.css': 'src/less/skins/skin-blue-light.less',
					'dist/css/skins/skin-black-light.min.css': 'src/less/skins/skin-black-light.less',
					'dist/css/skins/skin-yellow-light.min.css': 'src/less/skins/skin-yellow-light.less',
					'dist/css/skins/skin-green-light.min.css': 'src/less/skins/skin-green-light.less',
					'dist/css/skins/skin-red-light.min.css': 'src/less/skins/skin-red-light.less',
					'dist/css/skins/skin-purple-light.min.css': 'src/less/skins/skin-purple-light.less',
					'dist/css/skins/_all-skins.min.css': 'src/less/skins/_all-skins.less'
				}
			},
			// Plugins
			plugins: {
				options: {
					compress: true
				},
				files: {
					// Pace JS
					'dist/plugins/pace-js/pace.min.css': 'dist/plugins/pace-js/pace.css',

					// Morris.js
					'dist/plugins/morris.js06/morris.min.css': 'dist/plugins/morris.js06/morris.css',

					// jqvmap
					'dist/plugins/jqvmap/jqvmap.min.css': 'dist/plugins/jqvmap/jqvmap.css'
				}
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
					'dist/js/vendor.min.js': 'dist/js/vendor.js',
					'dist/js/adminlte.min.js': 'dist/js/adminlte.js'
				}
			},
			plugins: {
				options: {
					preserveComments: false
				},
				files: {
					// Pace JS
					'dist/plugins/pace-js/pace.min.js': 'dist/plugins/pace-js/pace.js',

					// Morris.js
					'dist/plugins/morris.js06/raphael.min.js': 'dist/plugins/morris.js06/raphael.min.js',
					'dist/plugins/morris.js06/morris.min.js': 'dist/plugins/morris.js06/morris.js',

					// jqvmap
					'dist/plugins/jqvmap/maps/jquery.vmap.world.min.js': 'dist/plugins/jqvmap/maps/jquery.vmap.world.js',
					'dist/plugins/jqvmap/jquery.vmap.min.js': 'dist/plugins/jqvmap/jquery.vmap.js'
				}
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
					'src/js/BoxRefresh.js',
					'src/js/BoxWidget.js',
					'src/js/ControlSidebar.js',
					'src/js/DirectChat.js',
					'src/js/PushMenu.js',
					'src/js/TodoList.js',
					'src/js/Tree.js',
					'src/js/Layout.js'
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
			src: {
				src: ['*.html'], // Source files
				dest: 'documentation/', // Destination directory
				flatten: true,
				cwd: 'documentation/src',
				options: {
					silent: true,
					includePath: 'documentation/src/include'
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
				jshintrc: 'src/js/.jshintrc'
			},
			grunt: {
				options: {
					jshintrc: 'src/grunt/.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			core: {
				src: 'src/js/*.js'
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
				config: 'src/js/.jscsrc'
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
				csslintrc: 'src/less/.csslintrc'
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

		// Delete images in src directory
		// After compressing the images in the src/img dir, there is no need
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
