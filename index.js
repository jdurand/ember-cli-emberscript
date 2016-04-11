/* jshint node: true */
'use strict';
var path      = require('path');
var chalk     = require('chalk');
var checker   = require('ember-cli-version-checker');
var defaults  = require('lodash').defaults;

var EmberscriptPreprocessor = require('./lib/emberscript-preprocessor');

module.exports = {
  name: 'Ember CLI Emberscript Addon',

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  getConfig: function() {
    var brocfileConfig = {};
    var emberscriptOptions = defaults(this.project.config(process.env.EMBER_ENV).emberscriptOptions || {},
      brocfileConfig, {
        blueprints: true
      });

    return emberscriptOptions;
  },

  blueprintsPath: function() {
    if (this.getConfig().blueprints) {
      return path.join(__dirname, 'blueprints');
    }
  },

  setupPreprocessorRegistry: function(type, registry) {
    var plugin = new EmberscriptPreprocessor(this.getConfig());

    registry.add('js', plugin);
  },

  included: function(app) {
    this.app = app;

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};
