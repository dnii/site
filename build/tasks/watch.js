var gulp = require("gulp");
var paths = require("../paths");
var browserSync = require("browser-sync");

function reportChange(event) {
  console.log("File " + event.path + " was " + event.type + ", running tasks...");
}

gulp.task("watch", ["serve"], function () {
  gulp.watch(paths.source, ["build-js", browserSync.reload]).on("change", reportChange);
  gulp.watch(paths.html, ["build-html", browserSync.reload]).on("change", reportChange);
  gulp.watch(paths.locale, ["build-html", browserSync.reload]).on("change", reportChange);
  gulp.watch(paths.css, ["build-css"]).on("change", reportChange);
  gulp.watch(paths.style, function () {
    return gulp.src(paths.style)
      .pipe(browserSync.stream());
  }).on("change", reportChange);
});
