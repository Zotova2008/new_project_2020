"use strict";

// Подключаем Gulp
var gulp = require("gulp");
// Плагин для ошибок
var plumber = require("gulp-plumber");
//Плагин для создания карты для склеенных файлов
var sourcemap = require("gulp-sourcemaps");
//Плагин для предпроцессора Less
var less = require("gulp-less");
//Плагин для обработки файла css "после"
var postcss = require("gulp-postcss");
//Плагин для расстановки префиксов в файл css
var autoprefixer = require("autoprefixer");
//Плагин для минификации
var csso = require("gulp-csso");
//Плагин для переименования файлов
var rename = require("gulp-rename");
//Плагин для оптимизации картинок
var imagemin = require("gulp-imagemin");
//Плагин для создания картинок в формате webp
var webp = require("gulp-webp");
//Плагин для создания спрайтов svg
var svgstore = require("gulp-svgstore");
//Плагин для минификации js
var uglify = require("gulp-uglify");
//Плагин для склеивания нескольких файлов в один
var concat = require("gulp-concat");
//Плагин для удаления папки
var del = require("del");
//Плагин для браузера, для автоматической перезагрузки страницы
var server = require("browser-sync").create();

//Преобразуем код из less в css
gulp.task("css", function() {
  return (
    gulp
      //Расположение файла less
      .src("source/less/style.less")
      .pipe(plumber())
      //Формируем карту файла
      .pipe(sourcemap.init())
      //Запускаем преобразование из less в css
      .pipe(less())
      //Раставляем префиксы
      .pipe(postcss([autoprefixer()]))
      //Полученный файл переносим в папку build
      .pipe(gulp.dest("build/css"))
      //Минифицируем css
      .pipe(csso())
      //Полученный файл переименовываем
      .pipe(rename("style.min.css"))
      //Формируем карту файла
      .pipe(sourcemap.write("."))
      //Полученный файл переносим в папку build/css
      .pipe(gulp.dest("build/css"))
      //Перезапускам браузер
      .pipe(server.stream())
  );
});

//Копируем все файлы html в папку build
gulp.task("html", function() {
  return (
    gulp
      //Откуда берем файлы
      .src("source/*.html")
      //Копируем в папку build
      .pipe(gulp.dest("build"))
      //Перезапускаем браузер
      .pipe(server.stream())
  );
});

//Переносим файлы библиотек в папку build
gulp.task("js:lib", function() {
  return (
    gulp
      //Расположение файлов библиотек
      .src("source/js/lib/*.js")
      .pipe(plumber())
      //Копируем в папку build/js/lib
      .pipe(gulp.dest("build/js/lib"))
      //Перезапускаем браузер
      .pipe(server.stream())
  );
});

//Минифицируем js файл и переносим в папку build
gulp.task("js", function() {
  return (
    gulp
      //Расположение файла script.js, если файлов несколько,то склееиваем их
      //.src("source/js/*.js")
      .src("source/js/script.js")
      //Склеиваем все найденные файлы
      //.pipe(concat("all.js"))
      //Минифицируем этот файл
      .pipe(uglify())
      //Переименовываем
      .pipe(rename("script.min.js"))
      //Копируем в папку
      .pipe(gulp.dest("build/js"))
      //Перезапускаем браузер
      .pipe(server.stream())
  );
});

//Оптимизируем картинки, обязательно перепроверить svg картинки
gulp.task("images", function() {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("source/img"));
});

//Создаем картинки в формате webp
gulp.task("webp", function() {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

//Создаем спрайт svg
gulp.task("sprite", function() {
  return gulp
    .src("source/img/use-*.svg")
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img", "build/img"));
});

//Удаляем папку build
gulp.task("clean", function() {
  return del("build");
});

//Копируем файлы в папку build
gulp.task("copy", function() {
  return (
    gulp
      //перечисляем какие именно файлы и папки нужно скопировать
      .src(
        ["source/fonts/**/*.{woff,woff2}", "source/img/**", "source/*.ico"],
        {
          base: "source"
        }
      )
      .pipe(gulp.dest("build"))
  );
});

//Запускаем наш сборщик
gulp.task(
  "build",
  gulp.series("clean", "copy", "css", "sprite", "html", "js:lib", "js")
);

//Настройки для браузера
gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  //Следим за изменениями и запускаем задачи или обновляем браузер
  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/use-*.svg", gulp.series("sprite", "refresh"));
  gulp.watch("source/js/lib/*.js", gulp.series("js:lib", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function() {
  server.reload();
});

gulp.task("start", gulp.series("build", "server"));
