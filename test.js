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


// working signatures:
// cmd, args, opts, cb
// cmd, opts, cb
// cmd, args, cb
// cmd, cb

// throws:
// asyncExecCmd(__cb)
//=> should have at least 1 argument - should not be function

// asyncExecCmd({ok:true})
//=> should have `callback` (non empty callback)
//
// asyncExecCmd(['--save-dev', 'bluebird'])
//=> should have `callback` (non empty callback)

// asyncExecCmd(['--save-dev', 'bluebird'], {ok:true})
//=> should have `callback` (non empty callback)

// asyncExecCmd({ok:true}, __cb)
//=> expect `cmd` be string

// asyncExecCmd(['--save-dev', 'bluebird'], __cb)
//=> expect `cmd` be string

// asyncExecCmd(['--save-dev', 'bluebird'], {ok:true}, __cb)
//=> expect `cmd` be string


// should work:
// asyncExecCmd('npm', __cb)
//=> actually npm-cli output friendly output,
//=> but sends statusCode 1, so he process.exit(1), so if you want to hanle it
//=> its logical to search it in `err`, not in `res`

// asyncExecCmd('npm', {someFake: 'obj'}, __cb)
//=> same as above. if set option stdio to 'inherit' it will
// the friendly output, but still will exit with status code 1,
// then `err` will be null, `res` will be '' (empty string)
// because when `stdio: inherit` spawn dont have `data` event,
// so you cant handle output
// and Buffer remains as it is initialized

// asyncExecCmd('npm', ['install', '--save-dev', 'bluebird'], __cb)
// asyncExecCmd('npm', ['install', '--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb)

// asyncExecCmd('npm -v', __cb)
// asyncExecCmd('npm install', ['--save-dev', 'bluebird'], __cb)
// asyncExecCmd('npm install', ['--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb)
// asyncExecCmd('npm -v', {stdio: [null, null, null]}, __cb)
