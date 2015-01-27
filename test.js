/**
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var cmd = require('./index');

// describe('async-exec-cmd:', function() {
//   // body ...
// });

function __cb(err, res) {
  // res[0] is status code
  if (err || res[0] > 0) {
    console.error(err);
    return;
  }

  // res[1] is actual result
  console.log('res:', res[1]);
}

// cmd('npm', __cb);
//=> res === undefined, err.status === 1, you can: err.buffer.toString('utf8')

// cmd('npm', {stdio: [null, null, null]}, __cb);
//=> res === undefined, err.status === 1, you can: err.buffer.toString('utf8')

// cmd('npm', ['install', '--save-dev', 'bluebird'], __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res:'

// cmd('npm', ['uninstall', '--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: bluebird@2.9.3 node_modules/bluebird'

// cmd('npm -v', __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: 2.1.16'

// cmd('npm install', ['--save-dev', 'bluebird'], __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: bluebird@2.9.3 node_modules/bluebird'

// cmd('npm uninstall', ['--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: unbuild bluebird@2.9.3'

// cmd('npm -v', {stdio: 'inherit'}, __cb);
//=> will directly outputs: 2.1.16
//=> err === undefined, res[0] === 0, res[1] === 'res:'


// ### Impossible signatures (will throws/errors)
// > these examples should not work

// cmd(__cb);
//=> first argument cant be function

// cmd({ok:true});
//=> should have `callback` (non empty callback)

// cmd(['--save-dev', 'bluebird']);
//=> should have `callback` (non empty callback)

// cmd(['--save-dev', 'bluebird'], {ok:true});
//=> should have `callback` (non empty callback)

// cmd({ok:true}, __cb);
//=> expect `cmd` be string

// cmd(['--save-dev', 'bluebird'], __cb);
//=> expect `cmd` be string

// cmd(['--save-dev', 'bluebird'], {ok:true}, __cb);
//=> expect `cmd` be string
