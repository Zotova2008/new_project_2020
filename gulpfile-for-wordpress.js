let projectFolder = 'wordpress/wp-content/themes/profailer-eng';
let sourceFolder = 'source';
const paths = {
  build: {
    html: projectFolder + '/assets',
    php: projectFolder + '/',
    css: projectFolder + '/assets/css/',
    cssForPath: projectFolder + '/assets/css/style.min.css',
    js: projectFolder + '/assets/js',
    img: projectFolder + '/assets/images',
    imgSvg: projectFolder + '/assets/images/svg',
    fonts: projectFolder + '/assets/fonts',
    folderCopy: projectFolder + '/assets',
    folderClean: projectFolder
  },
  src: {
    html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html'],
    php: [sourceFolder + '/php/**/*.*', '!' + sourceFolder + '/php/_*.php'],
    css: sourceFolder + '/sass/style.scss',
    cssLib: sourceFolder + '/lib/css/*.css',
    js: sourceFolder + '/js/script.js',
    jsLib: sourceFolder + '/lib/js/*.js',
    img: sourceFolder + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
    imgWebp: sourceFolder + '/images/**/*.{jpg,png}',
    imgPngJpg: sourceFolder + '/images/**/*.{jpg,png}',
    imgFolder: sourceFolder + '/images',
    imgSprite: sourceFolder + '/images/sprite/*.svg',
    imgSvg: sourceFolder + '/images/svg/*.svg',
    fonts: sourceFolder + '/fonts/*.{ttf,woff,woff2}',
  },
};

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';

import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
// import gcmq from 'gulp-group-css-media-queries';
import copyAssets from 'postcss-copy-assets';
import csso from 'postcss-csso';

import rename from 'gulp-rename';
// import terser from 'gulp-terser';
// import concat from 'gulp-concat';

// import htmlmin from 'gulp-htmlmin';
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';

import squoosh from 'gulp-libsquoosh';
// import webp from 'gulp-webp';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

import del from 'del';

import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';

import browser from 'browser-sync';


// Styles
export const styles = () => {
  return gulp.src(paths.src.css, {
    sourcemaps: true
  })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      grid: true,
    })]))
    .pipe(postcss([copyAssets({ base: paths.build.folderCopy })], { to: paths.build.cssForPath }))
    // .pipe(gcmq())// выключите, если в проект импортятся шрифты через ссылку на внешний источник
    .pipe(gulp.dest(paths.build.css))
    .pipe(postcss([csso()]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.build.css, {
      sourcemaps: '.'
    }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src(paths.src.html)
    .pipe(posthtml([include()]))
    .pipe(gulp.dest(paths.build.html));
}

// PHP

const phpCopy = () => {
  return gulp.src(paths.src.php)
    .pipe(gulp.dest(paths.build.php));
}

// Scripts

const scripts = () => {
  return gulp.src(paths.src.js)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(paths.build.js))
};

// Images

export const optimizeImages = () => {
  return gulp.src(paths.src.img)
    .pipe(newer(paths.build.img))
    .pipe(squoosh({
      oxipng: { level: 3 },
      mozjpeg: { quality: 75, progressive: true }
    }))
    .pipe(gulp.dest(paths.build.img))
}

export const copyImages = () => {
  return gulp.src(paths.src.img)
    // .pipe(newer(paths.build.img))
    .pipe(gulp.dest(paths.build.img))
}

// WebP

// Используйте отличное от дефолтного значение root, если нужно обработать отдельную папку в img,
// а не все изображения в img во всех папках.
// root = '' - по дефолту webp добавляются и обновляются во всех папках в source/img/
// root = 'content/' - webp добавляются и обновляются только в source/img/content/
export const createWebp = () => {
  return gulp.src(paths.src.imgWebp)
    .pipe(newer(paths.build.img))
    .pipe(squoosh({
      encodeOptions: {
        webp: { quality: 90 },
      },
    }))
    .pipe(gulp.dest(paths.build.img));
}

// SVG

export const svg = () => {
  return gulp.src(paths.src.imgSvg)
    .pipe(svgo())
    .pipe(gulp.dest(paths.build.imgSvg));
}

export const sprite = () => {
  return gulp.src(paths.src.imgSprite)
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(paths.build.img));
}

// Copy

export const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/downloads/**',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest(paths.build.folderCopy))
  done();
}

const copyFileTheme = () => {
  return gulp.src(
    [
      'source/fileTheme/**/*'
    ], {
    base: 'source/fileTheme/',
  }
  )
    .pipe(gulp.dest(paths.build.php));
}

const copyLib = () => {
  return gulp.src(
    [
      'source/lib/**',
      '!source/**/_*.*'
    ], {
    base: 'source',
  }
  )
    .pipe(gulp.dest(paths.build.folderCopy));
}

// Clean

const clean = () => {
  return del(paths.build.folderClean);
};

// Server

const server = (done) => {
  browser.init({
    // server: {
    //   baseDir: 'build'
    // },
    proxy: 'localhost:8888',
    notify: true,
    open: true,
    cors: true,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/**/*.html', gulp.series(html, reload));
  gulp.watch('source/php/**/*.php', gulp.series(phpCopy, reload));
  gulp.watch('source/fileTheme/**/*.*', gulp.series(copyFileTheme, reload));
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts, reload));
  gulp.watch('source/lib/**/*.*', gulp.series(copyLib, reload));

  gulp.watch('source/img/**/*.{jpg,png}', gulp.series(createWebp, copyImages, reload));
  gulp.watch('source/img/svg/*.svg', gulp.series(svg, reload));
  gulp.watch('source/img/sprite/*.svg', gulp.series(sprite, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  copyImages,
  createWebp,
  gulp.parallel(
    styles,
    html,
    phpCopy,
    scripts,
    copyLib,
    copyFileTheme,
    svg,
    sprite
  ),
);

// Default

export const start = gulp.series(build, server, watcher);
