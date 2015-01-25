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
// asyncExecCmd('npm help', function(err, res) {
//   if (err) return console.log(err);
//   console.log('npm help');
// }) //=> work
// asyncExecCmd('npm install --save-dev bluebird', function(err, res) {
//   if (err) return console.log('npm install --save-dev bluebird', err);
//   console.log('npm install --save-dev bluebird');
// }) //=> work
// asyncExecCmd('npm -v', {stdio: 'inherit'}, function(err, res) {
//   if (err) return console.log('npm -v', err);
//   console.log('npm -v');
// }) //=> work
// asyncExecCmd('npm', ['install', 'semver', '--save-dev'], function(err, res) {
//   if (err) return console.log('npm', ['install', 'semver', '--save-dev'], err);
//   console.log('npm', ['install', 'semver', '--save-dev']);
// }) //=> work
// asyncExecCmd('echo', ['hello world'], {stdio: 'inherit'}, function(err, res) {
//   if (err) return console.log('echo', ['hello world'], {stdio: 'inherit'}, err);
//   console.log('echo', ['hello world'], {stdio: 'inherit'});
// }) //=> work

// asyncExecCmd('git clone git@github.com:tunnckoCore/glob2fp dest', 'invalid', function(err, res) {
//   if (err) return console.log('git clone git@github.com:tunnckoCore/glob2fp dest', 'invalid', err);
//   console.log('git clone git@github.com:tunnckoCore/glob2fp dest', 'invalid');
// })



// should throw: "expect `args` be array"
// asyncExecCmd('npm i lodash', 'invalid second arg', {stdio: 'inherit'}, function(err, res) {
//   if (err) return console.log('err');
//   console.log('npm i lodash', 'invalid second arg', {stdio: 'inherit'});
// }) //=> work
// should throw: "expect `args` be array"
// asyncExecCmd('npm i lodash', {execp: true}, {stdio: 'inherit'}, function(err, res) {
//   if (err) return console.log('err');
//   console.log('npm i lodash', {}, {stdio: 'inherit'});
// }) //=> work
// should throw
// asyncExecCmd('npm i lodash', ['--save-dev'], 'invalid', function(err, res) {
//   if (err) throw err;
//   console.log('npm i lodash', {}, 'invalid');
// }) //=> work

// should throw: "should have `callback` and expects to be function":
// asyncExecCmd('git clone git@github.com:tunnckoCore/glob2fp dest', 'invalid')
// asyncExecCmd('gitclone tunnckoCore/octet#master', {})
//
// should throw "should have at least two arguments":
// asyncExecCmd('npm i --save-dev mocha')
//
// should throw "expect `cmd` be string"
// asyncExecCmd({})
