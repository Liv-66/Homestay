const gulp = require("gulp");
const concat = require("gulp-concat");
const mincss = require("gulp-minify-css");
const htmlReplace = require("gulp-html-replace");
const minifyHTML = require("gulp-minify-html");

gulp.task("concat", function () {
  return gulp
    .src("./style.css")
    .pipe(concat("all.css"))
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("minify-css", ["concat"], function () {
  return gulp
    .src("./build/css/all.css")
    .pipe(
      minifyCSS({
        keepBreaks: true,
      })
    )
    .pipe(
      rename(function (path) {
        path.basename += ".min";
        path.extname = ".css";
      })
    )
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("uglify", function () {
  return gulp
    .src("./app.js")
    .pipe(uglify())
    .pipe(
      rename(function (path) {
        path.basename += ".min";
        path.extname = ".js";
      })
    )
    .pipe(gulp.dest("./build/js/"));
});

gulp.task("html-replace", function () {
  const opts = { comments: false, spare: false, quotes: true };
  return gulp
    .src("./index.html")
    .pipe(
      htmlReplace({
        css: "./style.css",
        js: "./app.js",
      })
    )
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest("./build/"));
});

gulp.task("default", ["html-replace", "minify-css", "uglify"]);
