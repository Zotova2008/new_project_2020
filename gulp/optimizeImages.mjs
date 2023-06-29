import gulp from 'gulp';
import rename from 'gulp-rename';
// import svgstore from 'gulp-svgstore';
import svgo from 'gulp-svgmin';
import squoosh from 'gulp-libsquoosh';
import {stacksvg} from 'gulp-stacksvg';

// const sprite = () => {
//   return gulp.src('source/img/sprite/*.svg')
//       .pipe(svgstore({inlineSvg: true}))
//       .pipe(rename('sprite.svg'))
//       .pipe(gulp.dest('build/img'));
// };

const sprite = () => {
  return gulp.src('source/img/sprite/**/*.svg')
      .pipe(svgo())
      .pipe(stacksvg())
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest('build/img/icons'));
};

const optimizeSvg = () => {
  return gulp
      .src('build/img/**/*.svg')
      .pipe(svgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeRasterImages',
            active: true,
          },
          {
            name: 'removeUselessStrokeAndFill',
            active: false,
          }
        ],
      })
      )
      .pipe(gulp.dest('build/img'));
};

const optimizeJpg = () => {
  return gulp.src('build/img/**/*.{jpg,jpeg}')
      .pipe(squoosh({
        mozjpeg: {quality: 90, progressive: true},
      }))
      .pipe(gulp.dest('build/img'));
};

const optimizePng = () => {
  return gulp.src('build/img/**/*.png')
      .pipe(squoosh({
        oxipng: {level: 3},
      }))
      .pipe(gulp.dest('build/img'));
};
/*
  Optional tasks
  ---------------------------------

  Используйте отличное от дефолтного значение root, если нужно обработать отдельную папку в img,
  а не все изображения в img во всех папках.

  root = '' - по дефолту webp добавляются и обновляются во всех папках в source/img/
  root = 'content/' - webp добавляются и обновляются только в source/img/content/
*/

const createWebp = () => {
  const root = '';
  return gulp.src(`source/img/${root}**/*.{png,jpg}`)
      .pipe(squoosh({
        encodeOptions: {
          webp: {quality: 90},
        },
      }))
      .pipe(gulp.dest(`source/img/${root}`));
};

const createAvif = () => {
  const root = '';
  return gulp.src(`source/img/${root}**/*.{png,jpg}`)
      .pipe(squoosh({
        encodeOptions: {
          avif: {},
        },
      }))
      .pipe(gulp.dest(`source/img/${root}`));
};

export {sprite, createWebp, createAvif, optimizeSvg, optimizePng, optimizeJpg};
