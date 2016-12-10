var gulp= require('gulp'),
    nodemon= require('gulp-nodemon');


gulp.task('default', function(){
    nodemon({
        script:'app.js',                                                        // what it is going to run
        ext:'js',
        env: {
          PORT:8000
        },
        ignore:['./node_modules/**']                                            //what extension to look for
    })
    .on('restart',function(){
        console.log('Restarting');
    });
});
