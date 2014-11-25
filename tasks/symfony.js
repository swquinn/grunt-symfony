/*
 * grunt-symfony
 * https://github.com/swquinn/grunt-symfony
 *
 * Copyright (c) 2014 Sean Quinn
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function(grunt) {
  require('shelljs/global');
  grunt.registerMultiTask('symfony', 'Wrapper around the Symfony console.', function() {
    var SymfonyCommandBuilder = require('./lib/symfony-command-builder.js'),
        options, command, config, result;

    // Merge task-specific and/or target-specific options with these defaults.
    options = this.options({
      'ansi': false,
      'no-debug': false,
      'process-isolation': false,
      'symfonyConsole': 'console',
      'verbose': true,
      'verbosity': 'v',

      'command': 'list',
      'flags': [],
      'args': []
    });

    config = { 'symfonyConsole': options.symfonyConsole };
    command = new SymfonyCommandBuilder()
      .config(config)
      .command(options.command)
      .options(options.flags)
      .args(options.args)
      .build();

    result = exec(command).code === 0;
    return result;
  });
};
