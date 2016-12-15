module.exports =function(grunt){

    grunt.initConfig({
        watch:{
            jade:{
                files:['view/**'],
                options:{
                    livereload:true
                }
            },
            js:{
                files:['public/js**','models/**/*.js','schemas/**/*.js'],
                // tasks:['jshint'],
                options:{
                    livereload:true
                }
            }
        },
        nodemon:{
            dev:{
                options:{
                    file:'app.js',
                    args:[],
                    ignoredFiles:['README.md','node_modules/**','_DS_store'],
                    watchedExtensions:['js'],
                    watchedFolders:['app','config'],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent:{
                tasks:['nodemon','watch'],
                options:{
                    logConcurrentOutput:true,
                }
            }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force',true);
    grunt.registerTask('default',['concurrent']);
}