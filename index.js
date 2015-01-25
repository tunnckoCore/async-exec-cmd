/**
 * async-exec-cmd <https://github.com/tunnckoCore/async-exec-cmd>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var spawn = require('cross-spawn');
var typeOf = require('kind-of');

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
 * @param  {Array|Function}  `<args>`
 * @param  {Object|Function} `[opts]`
 * @param  {Function}        `[callback]`
 * @return {Stream}          spawned child process
 * @api public
 */
module.exports = function asyncExecCmd(cmd, args, opts, callback) {
  if (!cmd && !args) {
    throw new Error('async-exec-cmd: should have at least two arguments');
  }

  if (typeOf(args) === 'function') {
    callback = args;
    opts = {};

    var parse = parseCmd(cmd);
    cmd = parse.cmd || '';
    args = parse.args || [];
  }

  if (typeOf(opts) === 'function') {
    callback = opts;
    opts = typeOf(args) === 'object' ? args : {};

    var parse = parseCmd(cmd);
    cmd = parse.cmd || '';

    if (!parse.args.length) {
      args = args && typeOf(args) === 'array' ? args : [];
    } else {
      args = parse.args
    }
  }

  if (!callback || typeOf(callback) !== 'function') {
    throw new TypeError('async-exec-cmd: expect `callback` be function');
  }

  if (typeOf(args) !== 'array') {
    throw new TypeError('async-exec-cmd: expect `args` be array');
  }

  var cp = spawn(cmd, args, opts);
  var buffer = new Buffer('');

  if (cp.stdout) {
    cp.stdout.on('data', function indexOnData(data) {
      buffer = Buffer.concat([buffer, data])
    });
  }

  cp.on('error', function indexOnError(err) {
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
      message: this.command + opts.toString(),
      buffer: buffer,
      status: 1
    }));
    //process.exit(1);
  });

  cp.on('close', function indexOnClose(code) {
    if (!code) {
      callback(null, [code, buffer.toString().trim()]);
      //process.exit(0);
      return;
    }
    callback(new CommandError({
      command: cmd + args.join(' '),
      message: this.command + opts.toString(),
      buffer: buffer,
      status: code
    }));
    //process.exit(code);
  });

  return cp;
};

/**
 * Parse command to parts
 *
 * @param  {String} `cmds`
 * @return {Object}
 * @api private
 */
function parseCmd(cmds) {
  if (typeOf(cmds) !== 'string') {
    throw new TypeError('async-exec-cmd: expect `cmd` be string');
  }
  cmds = cmds.split(' ');

  return {
    cmd: cmds.shift(),
    args: cmds.length ? cmds : []
  };
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
