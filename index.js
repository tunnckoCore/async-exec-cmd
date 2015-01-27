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
var unique = require('array-unique');
var spawn = require('cross-spawn');
var typeOf = require('kind-of');

var error = handleErrors.error;
var type = handleErrors.type;

/**
 * > Async execute command via spawn. All arguments are rebuilt, merged, structured, normalized
 * and after all passed to [cross-spawn][cross-spawn], which actually is Node's `spawn`.
 *
 * **Example:**
 *
 * ```js
 * var asyncExecCmd = require('async-exec-cmd');
 * var promise = asyncExecCmd('echo', [
 *   'hello world'
 * ], function __cb(err, res) {
 *   // as usual
 * })
 * ```
 *
 * @name asyncExecCmd
 * @param  {String} `<cmd>`
 * @param  {Array}  `[args]`
 * @param  {Object} `[opts]`
 * @param  {Function} `<callback>`
 * @return {Stream} actually what `child_process.spawn` returns
 * @api public
 */
module.exports = function asyncExecCmd() {
  var argz = handleArguments(arguments);
  argz = checkArguments(argz);
  argz = buildArguments(argz);

  return buildSpawn(argz.cmd, argz.args, argz.opts, argz.callback);
};

/**
 * > Create flexible arguments - check types.
 *
 * @param  {Object} `argz`
 * @return {Object}
 * @api private
 */
function checkArguments(argz) {
  if (!argz.args.length) {
    return error('first argument cant be function');
  }

  if (isEmptyFunction(argz.cb)) {
    return error('should have `callback` (non empty callback)');
  }

  if (typeOf(argz.args[0]) !== 'string') {
    return type('expect `cmd` be string', argz.cb);
  }

  if (typeOf(argz.args[1]) === 'object') {
    argz.args[2] = argz.args[1];
    argz.args[1] = [];
  }

  if (typeOf(argz.args[2]) !== 'object') {
    argz.args[2] = {};
  }

  return {
    cmd: argz.args[0],
    args: argz.args[1],
    opts: argz.args[2],
    callback: argz.cb
  };
}

/**
 * > Build/structure already checked arguments.
 *
 * @param  {Object} `argz`
 * @return {Object}
 * @api private
 */
function buildArguments(argz) {
  var args = argz.cmd.split(' ');
  argz.cmd = args.shift();
  argz.args = unique(argz.args || [], args || []);
  return argz;
}

/**
 * > Handle cross-spawn.
 *
 * @param  {String} `cmd`
 * @param  {Array} `args`
 * @param  {Object} `opts`
 * @param  {Function} `callback`
 * @return {Stream} actually what `child_process.spawn` returns
 * @api private
 */
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
 * > Construct `CommandError`.
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
