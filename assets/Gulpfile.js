var gulp = require('gulp');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var coffeeStream = coffee({bare: true});
var runTimestamp = Math.round(Date.now()/1000);

// files/folders

var paths = {

	php : {
		src  : '*.php',
	},

  html : {
    src   : '*.html',

  },

	scss : {
		src : 'assets/scss/**/*.scss',
		dest : 'assets/scss/',
	},

	css : {
		src  : 'assets/css/**/*.css',
		dest : 'assets/css/',
	},

  min : {
    dest  : 'assets/min/',
  },

  js  :  {
    src  :  'assets/js/**/*.js',
    dest :  'assets/js/',  
  },

  coffee  :   {
    src   :   'assets/coffee/**/*.coffee',
    dest  :   'assets/coffee/',
  },

};


// options

var options = {

	build : { 
	
		tasks 	: 	['browser-sync', 'sass:watch', 'css:watch', 'js:watch', 'coffee:watch'],
	
	},
	

};



// tasks 

gulp.task('browser-sync', function() {
    browserSync.init([paths.php.src, paths.css.src, paths.html.src, paths.js.src], {
		proxy: "localhost/"
        // server: {
        //     baseDir: "./"
        // }
    });
});

gulp.task('sass', function () {
  gulp.src(paths.scss.src)
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
    	outputStyle: 'expanded',
    }).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(paths.css.dest));
});

gulp.task('autoprefixer', function() {
    return gulp.src(paths.css.src)
    .pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(autoprefixer({
    	    browsers: ['last 2 versions', '> 0%'], //'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    	    cascade: false
    	}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('minify-css', function() {
    return gulp.src(paths.css.src)
      .pipe(sourcemaps.init())
      .pipe(minifyCss())
      .pipe(sourcemaps.write('./'))
      .pipe(rename('theme-minify.css'))
      .pipe(gulp.dest(paths.min.dest));
});

gulp.task('uglify', function(){
    return gulp.src(paths.js.src)
      .pipe(rename('scripts-min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.min.dest));
});

gulp.task('Iconfont', function(){
  return gulp.src(['assets/icons/'])
    .pipe(iconfont({
      fontName: 'myfont', // required 
      appendUnicode: true, // recommended option 
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: runTimestamp,
    }))
      .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g. 
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('assets/fonts/fonts-icons/'));
});

gulp.task('coffee', function() {
  gulp.src(paths.coffee.src)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(rename('testeresult.js'))
    .pipe(gulp.dest(paths.coffee.dest))
});


// watch

gulp.task('sass:watch', function () {
  gulp.watch(paths.scss.src, ['sass']);
});

gulp.task('css:watch', function() {
  gulp.watch(paths.css.src, ['autoprefixer', 'minify-css']);
});

gulp.task('js:watch', function() {
  gulp.watch(paths.js.src, ['uglify']);
});

gulp.task('coffee:watch', function() {
  gulp.watch(paths.coffee.src, ['coffee']);
});



// options tasks for run

gulp.task('build', function() {

  options.build.tasks.forEach( function( task ) {
    gulp.start( task );

  });

});




// default task

gulp.task('default', ['build'], function() {
    
});