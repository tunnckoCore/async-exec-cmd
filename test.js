/*!
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var test = require('assertit')
var cmd = require('./index')

test('async-exec-cmd:', function () {
  test('should throw', function () {
    test('"first argument cant be function" when', function () {
      test('only function is given (as first argument)', function (done) {
        function fixture () {
          cmd(function _cb (err) {
            /* istanbul ignore next */
            err = err || ''
          })
        }
        test.throws(fixture, Error)
        done()
      })
    })
    test('"should have `callback` (non empty callback)" when', function () {
      test('only object is given (as first argument)', function (done) {
        function fixture () {
          cmd({stdio: 'inherit'})
        }
        test.throws(fixture, Error)
        done()
      })
    })
    test('"should have `callback` (non empty callback)" when', function () {
      test('only array is given (as first argument)', function (done) {
        function fixture () {
          cmd(['--save', 'bluebird'])
        }
        test.throws(fixture, Error)
        done()
      })
    })
    test('"should have `callback` (non empty callback)" when', function () {
      test('array and object are given', function (done) {
        function fixture () {
          cmd(['--save', 'bluebird'], {stdio: 'inherit'})
        }
        test.throws(fixture, Error)
        done()
      })
    })
    test('"should have `callback` (non empty callback)" when', function () {
      test('asyncExecCmd(cmd, function cb(){}) - callback with empty body', function (done) {
        function fixture () {
          cmd('npm install --save is-glob', function _cb () {})
        }
        test.throws(fixture, Error)
        done()
      })
    })
  })

  test('should callback(err) recieve', function () {
    test('from spawn `error` event because', function () {
      test('the process could not be spawned', function (done) {
        cmd('jkdshfkj4hkjh435', function _cb (err) {
          test.ok(err instanceof Error)
          done()
        })
      })
    })
    test('TypeError "expect `cmd` be string" when', function () {
      test('object and callback are given', function (done) {
        cmd({stdio: 'inherit'}, function _cb (err) {
          test.ok(err instanceof TypeError)
          done()
        })
      })
    })
    test('TypeError "expect `cmd` be string" when', function () {
      test('array and callback are given', function (done) {
        cmd(['--save', 'bluebird'], function _cb (err) {
          test.ok(err instanceof TypeError)
          done()
        })
      })
    })
    test('TypeError "expect `cmd` be string" when', function () {
      test('array, object and callback are given', function (done) {
        cmd(['--save', 'bluebird'], {stdio: 'inherit'}, function _cb (err) {
          test.ok(err instanceof TypeError)
          done()
        })
      })
    })
    test('TypeError "expect `cmd` be string" when', function () {
      test('object, array and callback are given', function (done) {
        cmd({stdio: 'inherit'}, ['--save', 'bluebird'], function _cb (err) {
          test.ok(err instanceof TypeError)
          done()
        })
      })
    })
  })

  test('should work properly', function () {
    test('should return `stream` when asyncExecCmd() is executed', function () {
      test('and should have `.kill` method', function (done) {
        var cp = cmd('npm version', function _cb (err) {
          /* istanbul ignore next */
          err = err || ''
        })
        test.equal(typeof cp.kill, 'function')
        done()
      })
    })
    test('when opts.stdio is "inherit"', function () {
      test('and should recieve res === "", code === 0, err === null', function (done) {
        cmd('npm install --save is-glob', {stdio: 'inherit'}, function _cb (err, res, code) {
          test.equal(err, null)
          test.equal(code, 0) // status code
          test.equal(typeof res, 'string') // response
          test.equal(res.length, 0)
          done()
        })
      })
    })
    test("when asyncExecCmd('npm', [args[, opts]], cb)", function () {
      test('and handle CommandError when', function () {
        test("asyncExecCmd('npm', cb)", function (done) {
          cmd('npm', function _cb (err, res, code, buffer) {
            test.equal(res, undefined)
            test.equal(buffer, undefined)
            test.equal(code, 1)
            test.equal(err.status, 1)
            test.equal(err.name, 'CommandError')
            done()
          })
        })
        test("asyncExecCmd('npm', opts, cb)", function (done) {
          cmd('npm', {stdio: [null, null, null]},
          function _cb (err, res, code, buffer) {
            test.equal(res, undefined)
            test.equal(buffer, undefined)
            test.equal(code, 1)
            test.equal(err.status, 1)
            test.equal(err.name, 'CommandError')
            done()
          })
        })
      })
      test('and callback error should be `null` and should have response when', function () {
        test("asyncExecCmd('npm', ['i', '--save', 'is-glob'], cb)", function (done) {
          cmd('npm', ['install', '--save', 'is-glob'],
          function _cb (err, res, code) {
            test.equal(err, null)
            test.equal(code, 0)
            test.equal(typeof res, 'string')
            test.ok(res.length > 0)
            done()
          })
        })
        test("asyncExecCmd('npm', ['uni', '--save', 'is-glob'], opts, cb)", function (done) {
          cmd('npm', ['uninstall', '--save', 'is-glob'], {stdio: [null, null, null]},
          function _cb (err, res, code) {
            test.equal(err, null)
            test.equal(code, 0)
            test.equal(typeof res, 'string')
            test.ok(res.length > 0)
            done()
          })
        })
      })
    })
    test("when asyncExecCmd('npm subcommdand', [args[, opts]], cb)", function () {
      test('and handle CommandError when', function () {
        test("asyncExecCmd('npm unknown', cb)", function (done) {
          cmd('npm unknown', function _cb (err, res, code, buffer) {
            test.equal(res, undefined)
            test.equal(buffer, undefined)
            test.equal(code, 1)
            test.equal(err.status, 1)
            test.equal(err.name, 'CommandError')
            done()
          })
        })
        test("asyncExecCmd('npm unknown', opts, cb)", function (done) {
          cmd('npm unknown', {stdio: [null, null, null]},
          function _cb (err, res, code, buffer) {
            test.equal(res, undefined)
            test.equal(buffer, undefined)
            test.equal(code, 1)
            test.equal(err.status, 1)
            test.equal(err.name, 'CommandError')
            done()
          })
        })
      })
      test('and callback error should be `null` and should have response when', function () {
        test("asyncExecCmd('npm i', ['--save', 'is-glob'], cb)", function (done) {
          cmd('npm install', ['--save', 'is-glob'],
          function _cb (err, res, code) {
            test.equal(err, null)
            test.equal(code, 0)
            test.equal(typeof res, 'string')
            test.ok(res.length > 0)
            done()
          })
        })
        test("asyncExecCmd('npm uni', ['--save', 'is-glob'], opts, cb)", function (done) {
          cmd('npm uninstall', ['--save', 'is-glob'], {stdio: [null, null, null]},
          function _cb (err, res, code) {
            test.equal(err, null)
            test.equal(code, 0)
            test.equal(typeof res, 'string')
            test.ok(res.length > 0)
            done()
          })
        })
      })
    })
  })
})
