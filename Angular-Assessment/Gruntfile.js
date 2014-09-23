module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['Gruntfile.js', 'server/**/*.js'],
                tasks: ['jshint']
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
				'client/**/*.js',
                '!client/font/**',  // ignore font scripts
                '!client/vendor/**' // ignore vendor scripts
            ]
        },
        
        shell: {
            'mocha': {
                command: 'mocha --reporter spec server/test',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['shell:mocha']);
};