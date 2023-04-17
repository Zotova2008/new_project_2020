import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import styles from './gulp/compileStyles.mjs';
import html from './gulp/compileHtml.mjs';
import js from './gulp/compileScripts.mjs';
import {optimizeSvg, sprite, createWebp, createAvif, optimizePng, optimizeJpg} from './gulp/optimizeImages.mjs';
import {copy, copyImages, copySvg, copyLibs} from './gulp/copyAssets.mjs';

const server = browserSync.create();
const streamStyles = () => styles().pipe(server.stream());

const clean = () => del('build');

const syncServer = () => {
  server.init({
    server: 'build/',
    // index: 'sitemap.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/**/*.html', gulp.series(html, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', streamStyles);
  gulp.watch('source/js/**/*.{js,json}', gulp.series(js, refresh));
  gulp.watch('source/lib/**/*.*', gulp.series(copyLibs, refresh));
  gulp.watch('source/img/**/*.svg', gulp.series(copySvg, sprite, refresh));
  gulp.watch('source/img/**/*.{png,jpg,webp,avif}', gulp.series(copyImages, refresh));

  gulp.watch('source/favicon/**', gulp.series(copy, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};


// // Build

// export const build = gulp.series(clean, copy, createWebp, optimizeImages, gulp.parallel(styles, html, scripts, svg, sprite));

// // Start
// export const start = gulp.series(clean, copy, createWebp, copyImages, gulp.parallel(styles, html, scripts, svg, sprite), server, watcher);

const build = gulp.series(clean, copy, sprite, gulp.parallel(styles, html, js, optimizePng, optimizeJpg, optimizeSvg));
const dev = gulp.series(clean, copy, sprite, gulp.parallel(styles, html, js, optimizePng, optimizeJpg, optimizeSvg), syncServer);
const start = gulp.series(clean, copy, sprite, gulp.parallel(styles, html, js), syncServer);

export {createWebp as webp, createAvif as avif, build, start, dev, styles, html, js};
