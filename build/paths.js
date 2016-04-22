var appRoot = "src/";
var outputRoot = "dist/";

module.exports = {
  root: appRoot,
  source: appRoot + "**/*.js",
  html: appRoot + "**/*.html",
  css: appRoot + "**/*.css",
  partials: appRoot + "partials/**/*.hbs",
  locale: appRoot + "locale/**/*.json",
  output: outputRoot
};
