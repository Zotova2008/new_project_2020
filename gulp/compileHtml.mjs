import gulp from 'gulp';
// import htmlmin from 'gulp-htmlmin';
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';

const compileHtml = () => {
  return gulp.src(['source/**/*.html', '!source/components/**/*.html'])
      .pipe(posthtml([include()]))
      .pipe(gulp.dest('build'));
};

export default compileHtml;
