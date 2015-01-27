/**
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var asyncExecCmd = require('./index');

function __cb(err, res) {
  console.log('err:', err);
  console.log('res:', res);
}

// possible problems in hybridified async-exec-cmd:
// errors will be only in callback
// it can be solved :)
//
// execCmd({}, function(err, res) {})
// .then(function(res) {})
// .catch(function(err) {})
