import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import postUrl from 'postcss-url';
// import gcmq from 'gulp-group-css-media-queries';
// .pipe(gcmq())// выключите, если в проект импортятся шрифты через ссылку на внешний источник

// import copyAssets from 'postcss-copy-assets';
// .pipe(postcss([copyAssets({ base: 'build' })], { to: 'build/css/style.css' }))
import rename from 'gulp-rename';

// Styles
const compileStyles = () => {
  return gulp
      .src('source/sass/style.scss', {
        sourcemaps: true,
      })
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(
          postcss([
            postUrl({assetsPath: './'}),
            autoprefixer({
              grid: true,
            }),
            csso()
          ])
      )
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build/css', {sourcemaps: '.'}));
};

export default compileStyles;
