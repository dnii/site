var gulp = require("gulp");
var runSequence = require("run-sequence");
var changed = require("gulp-changed");
var plumber = require("gulp-plumber");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var paths = require("../paths");
var compilerOptions = require("../babel-options");
var assign = Object.assign || require("object.assign");
var notify = require("gulp-notify");
var browserSync = require("browser-sync");
var hb = require("gulp-hb");
var through = require("through2");

gulp.task("build-js", function () {
  return gulp.src(paths.source)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(changed(paths.output, {
      extension: ".js"
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(babel(assign({}, compilerOptions.es2015())))
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: "/src"
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task("build-html", function () {
  return gulp.src(paths.locale)
    .pipe(through.obj(function (file, enc, cb) {
      gulp.src(paths.html)
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(hb({
          partials: paths.partials
        }).data(JSON.parse(file.contents.toString())))
        .pipe(gulp.dest(paths.output + "/" + file.relative.split(".")[0]))
        .on("error", cb)
        .on("end", cb);
    }));
});

gulp.task("build-css", function () {
  return gulp.src(paths.css)
    .pipe(changed(paths.output, {
      extension: ".css"
    }))
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.stream());
});

gulp.task("build", function (callback) {
  return runSequence(
    "clean", ["build-js", "build-html", "build-css"],
    callback
  );
});
