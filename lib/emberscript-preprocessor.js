var emberscript = require('broccoli-ember-script');
var fs = require('fs');

function EmberscriptPreprocessor(options) {
  this.name = 'ember-cli-emberscript';
  this.options = options || {};
}

EmberscriptPreprocessor.prototype.ext = emberscript.prototype.extensions;

EmberscriptPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {

  var options = {
    bare: true,
    srcDir: inputPath,
    destDir: outputPath
  };
  return emberscript(tree, options);
};

module.exports = EmberscriptPreprocessor;
