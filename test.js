/**
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var hybridExecCmd = require('./index');

// git clone git@github.com:tunnckoCore/glob2fp dest
hybridExecCmd('git clone git@github.com:tunnckoCore/octet', {stdio: 'inherit'}, function(err, res) {
  console.log('from callback:');
  console.log(err, res);
})
.then(function(res) {
  console.log('from .then:', res);
})
.catch(function(err) {
  console.log('from .catch:', err);
})
