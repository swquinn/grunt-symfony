/* The MIT License (MIT)
 *
 * Copyright (c) 2014 Sean Quinn
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
module.exports = function() {
  'use strict';

  function arrayToString(arr, prefix) {
    var item, idx,
        arr = arr || [],
        prefix = prefix || '',
        result = '';
    if (arr && arr.length > 0) {
      for (idx = 0; idx < arr.length; idx++) {
        item = arr[idx];
        result += ' ' + prefix + item;
      }
    }
    return result.trim();
  };

  function objectToString(obj, prefix) {
    var key, result,
        prefix = prefix || '-d';
    if (arr && arr.length > 0) {
      for (key in obj) {
        result += ' ' + prefix + key + "=" + obj[key];
      }
    }
    return result.trim();
  }

  /**
   * Fluent interface for assigning arguments to the command being built.
   *
   * @param array args the array of arguments for the command.
   * @return object this.
   */
  this.args = function(args) {
    this._args = args;
    return this;
  }

  /**
   *
   */
  this.build = function() {
    var config = this._config || {},
        app = config.symfonyConsole ? config.symfonyConsole : 'console',
        command = this._command || 'list',
        options = arrayToString(this._options || [], '--'),
        args = arrayToString(this._args || []),
        proc = 'php ' + app + ' ' + command;

    if (options && options !== '') {
      proc += ' ' + options;
    }

    if (args && args !== '') {
      proc += ' ' + args;
    }
    return proc;
  };

  /**
   *
   */
  this.command = function(command) {
    this._command = command;
    return this;
  };

  /**
   *
   */
  this.config = function(config) {
    this._config = config;
    return this;
  },

  this.options = function(options) {
    this._options = options;
    return this;
  };
}
