'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: [ 'bower.json' ],
                tasks: [ 'bowerInstall' ],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [ 'src/**/*.js' ],
                tasks: [ 'jshint' ],
                options: {
                    livereload: true
                }
            },
            templates: {
                files: [
                    'src/**/*.html',
                    '!src/index.html'
                ],
                tasks: [ 'html2js' ],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: [
                    'src/**/*.js',
                    'src/**/*.html',
                    'test/unit/**/*.js'
                ],
                tasks: [ 'html2js', 'karma' ]
            },
            gruntfile: {
                files: [ 'Gruntfile.js' ]
            },
            sass: {
                files: [ 'src/**/*.scss' ],
                tasks: [ 'sass:server', 'autoprefixer' ],
                options: {
                    livereload: true
                }
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('src'),
                            connect().use('/bower_components', connect.static('./bower_components'))
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: 'dist',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'dist/*',
                            '!dist/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ]
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                includePaths: [
                    'bower_components'
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [ '*.scss' ],
                        dest: '.tmp',
                        ext: '.css'
                    }
                ]
            },
            server: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [ '*.scss' ],
                        dest: '.tmp',
                        ext: '.css'
                    }
                ]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: [ 'last 1 version' ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/',
                        src: '{,*/}*.css',
                        dest: '.tmp/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: [ 'src/index.html' ]
            },
            sass: {
                src: [ 'src/{,*/}*.scss' ]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        'dist/{,*/}*.js',
                        'dist/{,*/}*.css',
                        'dist/images/{,*/}*.*',
                        'dist/fonts/{,*/}*.*',
                        'dist/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: 'dist'
            },
            html: 'src/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [ 'dist', 'dist/images' ]
            },
            html: [ 'dist/{,*/}*.html' ],
            css: [ 'dist/{,*/}*.css' ]
        },

        concat: {
            others: {
                files: [
                    {
                        dest: '.tmp/concat/scripts/app.js',
                        src: [
                            '.tmp/concat/scripts/app.js',
                            '.tmp/templates.js',
                        ]
                    }
                ]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images',
                        src: '{,*/}*.{gif,jpeg,jpg,png}',
                        dest: 'dist/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images',
                        src: '{,*/}*.svg',
                        dest: 'dist/images'
                    }
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'src',
                        dest: 'dist',
                        src: [
                            '*.{ico,png,txt}',
                            'images/{,*/}*.webp',
                            '*.html'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: 'src',
                dest: '.tmp',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'sass:server',
                'copy:styles'
            ],
            dist: [
                'sass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    '.tmp/concat/scripts/vendor.js': [ '.tmp/concat/scripts/vendor.js' ],
                    '.tmp/concat/scripts/app.js': [ '.tmp/concat/scripts/app.js' ]
                }
            }
        },

        html2js: {
            options: {
                base: 'src',
                quoteChar: '\'',
                useStrict: true,
                module: 'exercise.angular.templates',
                singleModule: true
            },
            main: {
                src: [
                    'src/**/*.html',
                    '!src/index.html',
                ],
                dest: '.tmp/templates.js'
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                background: false
            }
        },

        protractor: {
            options: {
                configFile: 'test/protractor.conf.js',
                keepAlive: true,
                noColor: false
            },

            all: { }
        }

    });


    grunt.registerTask('test', function () {
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'html2js',
            'karma',
            'watch:karma'
        ]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run([ 'build', 'connect:dist:keepalive' ]);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'html2js',
            //'jshint',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'html2js',
        'concat:generated',
        'ngAnnotate',
        'concat:others',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        //'newer:jshint',
        'build',
        'karma'
    ]);


};
