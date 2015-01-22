/**
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var asyncExecCmd = require('./index');

// should be tested and should work:
// asyncExecCmd('npm help', function() {})
// asyncExecCmd('npm install --save-dev bluebird', function() {})
// asyncExecCmd('npm ls', {stdio: 'inherit'}, function() {})
// asyncExecCmd('npm', ['install', 'semver'], function() {})
// asyncExecCmd('echo', ['hello world'], {stdio: 'inherit'}, function() {})
// asyncExecCmd('npm i lodash', 'invalid second arg', {stdio: 'inherit'}, function() {})
// asyncExecCmd('git clone git@github.com:tunnckoCore/glob2fp dest', 'invalid', function() {})
//
// should throw: "should have `callback` and expects to be function":
// asyncExecCmd('git clone git@github.com:tunnckoCore/glob2fp dest', 'invalid')
// asyncExecCmd('gitclone tunnckoCore/octet#master', {})
//
// should throw "should have at least two arguments":
// asyncExecCmd('npm i --save-dev mocha')
//
// should throw "expect `cmd` be string"
// asyncExecCmd({})
