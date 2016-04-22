var path = require("path");

exports.base = function () {
  return {
    filename: "",
    filenameRelative: "",
    sourceMap: true,
    sourceRoot: "",
    moduleRoot: path.resolve("src").replace(/\\/g, "/"),
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: ["es2015-loose", "stage-1"],
    plugins: [
      "transform-decorators-legacy",
    ]
  };
};

exports.es2015 = function () {
  var options = exports.base();
  options.presets = ["stage-1"];
  return options;
};
