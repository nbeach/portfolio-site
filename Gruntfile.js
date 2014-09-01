module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        distFolder:'dist/',

        clean: {
            dist: ['<%= distFolder %>']
        },

        concat: {
            options: {
                separator: "\r\n\r\n"
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/lightbox2/js/lightbox.js',
                    'src/**/*.js'
                ],
                dest: '<%= distFolder %>scripts/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: '<%= distFolder %>scripts/<%= pkg.name %>.map'
            },
            dist: {
               files: {'<%= distFolder %>scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']}
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,        // Enable dynamic expansion.
                    cwd: 'src/',  // Src matches are relative to this path.
                    src: ['**/*.html'],
                    dest: '<%= distFolder %>',
                    ext:'.html'
                }]
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'bower_components/bootstrap/', src: ['fonts/**'], dest: '<%= distFolder %>'},
                    {expand: true, cwd: 'bower_components/lightbox2/img/', src: ['*.*'], dest: '<%= distFolder %>/images'},
                    {expand: true, cwd: 'src/', src: ['images/**'], dest: '<%= distFolder %>'}

                ]
            }
        },

        less: {
            dist: {
                options:{
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: '<%= distFolder %>styles/<%= pkg.name %>.css.map'
                },
                files: {  "<%= distFolder %>styles/<%= pkg.name %>.css": "src/styles/portfolio.less" }
            }
        },

        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    '<%= distFolder %>styles/<%= pkg.name %>.min.css': ['<%= distFolder %>styles/<%= pkg.name %>.css']
                }
            }
        },

        'http-server': {
            dist: {
                root: '<%= distFolder %>',
                port: 80,
                host: "127.0.0.1",
                cache: 0,
                showDir : true,
                autoIndex: true,
                defaultExt: "html",
                runInBackground: false
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('server', ['http-server:dist']);

    grunt.registerTask('build', ['clean:dist', 'concat:dist', 'uglify:dist', 'htmlmin:dist', 'less:dist', 'cssmin:dist', 'copy:dist']);
    grunt.registerTask('default', ['build']);
};