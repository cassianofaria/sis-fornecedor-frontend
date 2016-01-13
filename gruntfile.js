'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            dist: {
                cwd: '.',
                src: ['**', '!stylesheets/', '!javascripts/', '!app/**/*.js', '!dist'],
                dest: 'dist',
                expand: true
            },
            fonts: {
                files: [
                    {
                        // for bootstrap fonts
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    },
                ]
            }
        },
        clean: {
            build: {
                src: ['dist']
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                // filerev:release hashes(md5) all assets (images, js and css) in dist directory
                files: [
                    {
                        src: [
                            'dist/scripts/*.js',
                            'dist/styles/*.css'
                        ]
                    }
                ]
            }
        },
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options: {
                assetsDir: ['dist', 'dist/styles']
            }
        },
        connect: {
            options: {
                port: 9000,
                //change this to '0.0.0.0' to access the server from the outside.
                hostname: 'localhost',
                livereload: 35729
            },
            dist: {
                options: {
                    open: true,
                    base: {
                        path: 'dist',
                        options: {
                            index: 'menu.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('default', ['build']);
};