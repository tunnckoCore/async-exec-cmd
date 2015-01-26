/**
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var isEmptyFunction = require('is-empty-function');
var handleArguments = require('handle-arguments');
var handleErrors = require('handle-errors')('async-exec-cmd');
var extend = require('extend-shallow');
var unique = require('array-unique');
var spawn = require('cross-spawn');
var typeOf = require('kind-of');

var error = handleErrors.error;
var type = handleErrors.type;

/**
 * Async execute command via spawn
 *
 * **Example:**
 *
 * ```js
 * var exec = require('async-exec-cmd');
 * var promise = exec('echo', [
 *   'hello world'
 * ], function __cb(err, res) {
 *   // as usual
 * })
 * ```
 *
 * @name asyncExecCmd
 * @param  {String}          `<cmd>`
 * @param  {Array|Function}  `[args]`
 * @param  {Object|Function} `[opts]`
 * @param  {Function}        `<callback>`
 * @return {Stream}          spawned child process
 * @api public
 */
module.exports = function asyncExecCmd() {
  var argz = handleArguments(arguments);
  argz = checkArguments(argz);
  argz = buildArguments(argz);

  return buildSpawn(argz.cmd, argz.args, argz.opts, argz.callback);
};

function checkArguments(argz) {
  if (!argz.args.length) {
    return error('should have at least 1 argument - should not be function');
  }

  if (isEmptyFunction(argz.cb)) {
    return error('should have `cb` (non empty callback)');
  }

  if (typeOf(argz.args[0]) !== 'string') {
    return type('expect `cmd` be string', argz.cb);
  }

  if (typeOf(argz.args[1]) === 'object') {
    argz.args[2] = argz.args[1];
    argz.args[1] = [];
  }

  return {
    cmd: argz.args[0],
    args: argz.args[1],
    opts: argz.args[2],
    callback: argz.cb
  };
}

function buildArguments(argz) {
  var args = argz.cmd.split(' ');
  argz.cmd = args.shift();
  argz.args = unique(argz.args || [], args || []);
  argz.opts = extend({}, argz.opts || {});
  return argz;
}

function buildSpawn(cmd, args, opts, callback) {
  var proc = spawn(cmd, args, opts);
  var buffer = new Buffer('');

  if (proc.stdout) {
    proc.stdout.on('data', function indexOnData(data) {
      buffer = Buffer.concat([buffer, data])
    });
  }

  proc.on('error', function indexOnError(err) {
    if (err instanceof Error) {
      callback(new CommandError({
        command: cmd + args.join(' '),
        message: err.message,
        stack: err.stack,
        buffer: buffer,
        status: 1
      }));
      return;
    }
    callback(new CommandError({
      command: cmd + args.join(' '),
      buffer: buffer,
      status: 1
    }));
    //process.exit(1);
  });

  proc.on('close', function indexOnClose(code) {
    if (!code) {
      callback(null, [code, buffer.toString().trim()]);
      //process.exit(0);
      return;
    }
    callback(new CommandError({
      command: cmd + args.join(' '),
      buffer: buffer,
      status: code
    }));
    //process.exit(code);
  });

  return proc;
}

/**
 * Construct `CommandError`
 *
 * @param {Object} `opts`
 * @api private
 */
function CommandError(opts) {
  this.name = 'CommandError';
  this.command = opts.command;
  this.message = opts.message;
  this.status = opts.status;
  this.buffer = opts.buffer;
  this.stack = opts.stack;
}

CommandError.prototype = new Error();
CommandError.prototype.constructor = CommandError;
