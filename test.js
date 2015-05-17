/*!
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var cmd = require('./index')

test('should throw when only function is given', function (done) {
  function fixture () {
    cmd(function _cb (err) {
      /* istanbul ignore next */
      err = err || ''
    })
  }
  test.throws(fixture, Error)
  done()
})

test('should throw "should have `callback` (non empty callback)"', function () {
  test('when only object is given', function (done) {
    function fixture () {
      cmd({stdio: 'inherit'})
    }
    test.throws(fixture, Error)
    done()
  })
  test('when array is given', function (done) {
    function fixture () {
      cmd(['--save', 'bluebird'])
    }
    test.throws(fixture, Error)
    done()
  })
  test('when array and object are given', function (done) {
    function fixture () {
      cmd(['--save', 'bluebird'], {stdio: 'inherit'})
    }
    test.throws(fixture, Error)
    done()
  })
  test('when callback with empty body', function (done) {
    function fixture () {
      cmd('npm install --save is-glob', function _cb () {})
    }
    test.throws(fixture, Error)
    done()
  })
})

test('should have Error in callback', function () {
  test('when process could not be spawned', function (done) {
    cmd('jkdshfkj4hkjh435', function _cb (err) {
      test.ok(err instanceof Error)
      done()
    })
  })
})

test('should have TypeError in callback', function () {
  test('when object and callback given', function (done) {
    cmd({stdio: 'inherit'}, function _cb (err) {
      test.ok(err instanceof TypeError)
      done()
    })
  })
  test('when array and callback are given', function (done) {
    cmd(['--save', 'bluebird'], function _cb (err) {
      test.ok(err instanceof TypeError)
      done()
    })
  })
  test('when array, object and callback are given', function (done) {
    cmd(['--save', 'bluebird'], {stdio: 'inherit'}, function _cb (err) {
      test.ok(err instanceof TypeError)
      done()
    })
  })
  test('when object, array and callback are given', function (done) {
    cmd({stdio: 'inherit'}, ['--save', 'bluebird'], function _cb (err) {
      test.ok(err instanceof TypeError)
      done()
    })
  })
})

test('should return `stream` and have `.kill` method when executed', function (done) {
  var cp = cmd('npm version', function _cb (err) {
    /* istanbul ignore next */
    err = err || ''
  })
  test.equal(typeof cp.kill, 'function')
  done()
})

test('should have empty res and err null when opts.stdio is inherit', function (done) {
  cmd('npm install --save is-glob', {stdio: 'inherit'}, function _cb (err, res, code) {
    test.equal(err, null)
    test.equal(code, 0) // status code
    test.equal(typeof res, 'string') // response
    test.equal(res.length, 0)
    done()
  })
})

function cmdErrorTest (err, res, code, buf, done) {
  test.equal(res, undefined)
  test.equal(buf, undefined)
  test.equal(code, 1)
  test.equal(err.status, 1)
  test.equal(err.name, 'CommandError')
  done()
}

test('should have CommandError in callback when', function () {
  test('asyncExecCmd("npm", cb)', function (done) {
    cmd('npm', function _cb (err, res, code, buf) {
      cmdErrorTest(err, res, code, buf, done)
    })
  })
  test('asyncExecCmd("npm", opts, cb)', function (done) {
    cmd('npm', {stdio: [null, null, null]}, function _cb (err, res, code, buf) {
      cmdErrorTest(err, res, code, buf, done)
    })
  })
})

test('should accept single command and arguments in array', function () {
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

test('should accept multiple words in `cmd` and `args` in array', function () {
  test('should recieve CommandError if unknown subcommand given', function (done) {
    cmd('npm unknown', function _cb (err, res, code, buffer) {
      test.equal(res, undefined)
      test.equal(buffer, undefined)
      test.equal(code, 1)
      test.equal(err.status, 1)
      test.equal(err.name, 'CommandError')
      done()
    })
  })
  test('should work when asyncExecCmd("npm install", ["node-foo", "node-bar"], opts, cb)', function (done) {
    var opts = {stdio: [null, null, null]}
    var args = ['node-foo', 'node-bar']

    cmd('npm install', args, opts, function _cb (err, res, code) {
      test.equal(err, null)
      test.equal(code, 0)
      test.equal(typeof res, 'string')
      test.ok(res.length > 0)
      done()
    })
  })
})
