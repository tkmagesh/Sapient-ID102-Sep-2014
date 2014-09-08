module.exports = function(grunt){
	grunt.initConfig({
		pkg :grunt.file.readJSON('package.json'),
		clean : ['dist/*.*'],
		copy : {
			main : {
				cwd : 'src/',
				src : '**',
				dest : 'dist/',
				expand : true
			}
		},
		watch: {
		  scripts: {
		    files: ['**/*.js','**/*.html','**/*.css'],
		    tasks: ['copy'],
		    options: {
		      interrupt: true,
		      reload : true,
		      livereload : {
		      	files : 'dist/**/*'
		      }
		    },
		  },
		},
		connect: {
		    server: {
		      options: {
		        port: 8080,
		        hostname: '*'
		      }
		    }
		  }
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('prep',['clean']);
	grunt.registerTask('default', ['copy','connect','watch']);
}