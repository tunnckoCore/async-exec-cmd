## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> Simple, fast, flexible and cross-platform async executing commands (with [node-cross-spawn][cross-spawn])

## Install
```bash
npm i --save async-exec-cmd
npm test
```


## API
> For more use-cases see the [tests](./test.js)

### [asyncExecCmd](./index.js#L43)
> Async execute command via spawn. All arguments are rebuilt, merged, structured, normalized
and after all passed to [cross-spawn][cross-spawn], which actually is Node's `spawn`.

- `<cmd>` **{String}** Command/program to execute. You can pass subcommands, flags and arguments separated with space  
- `[args]` **{Array}** arguments that will be [arr-union][arr-union] with the given in `cmd`. You can give `opts` object here instead of `args`  
- `[opts]` **{Object}** pass options to [spawn][cross-spawn] and [github-short-url-regex][github-short-url-regex]. You can give `cb` function here instead of `opts`  
- `<cb>` **{Function}** node-style callback function that will handle
  + `err` **{Error}** error if exists (`instanceof Error`), or `null`
  + `res` **{String}** string representation of response for the executed command/program
    - if `opts.stdio: [null, null, null]` or `''`
  + `code` **{Number|String}** process status code of the execution, e.g. `1`, `-2`, `128`, `ENOENT`, etc..
  + `buffer` **{Buffer}** buffer equivalent of response
- `returns` **{Stream}** actually what `child_process.spawn` returns

**Example:**

```js
var asyncExecCmd = require('async-exec-cmd');
var cp = asyncExecCmd('npm install', [
  '--save-dev', 'bluebird'
], function __cb(err, res) {
  // res[0] is status code
  if (err || res[0] > 0) {
    console.error(err);
    return;
  }

  // res[1] is actual result
  console.log(res[1]);
};);
```

### Possible signatures (will work)
> these examples should work without problems

```js
var cmd = require('async-exec-cmd');

function __cb(err, res) {
  // res[0] is status code
  if (err || res[0] > 0) {
    console.error(err);
    return;
  }

  // res[1] is actual result
  console.log(res[1]);
}

cmd('npm', __cb);
//=> res === undefined, err.status === 1, you can: err.buffer.toString('utf8')

cmd('npm', {stdio: [null, null, null]}, __cb);
//=> res === undefined, err.status === 1, you can: err.buffer.toString('utf8')

cmd('npm', ['install', '--save-dev', 'bluebird'], __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res:'

cmd('npm', ['uninstall', '--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: unbuild bluebird@2.9.3'

cmd('npm -v', __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: 2.1.16'

cmd('npm install', ['--save-dev', 'bluebird'], __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: bluebird@2.9.3 node_modules/bluebird'

cmd('npm uninstall', ['--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb);
//=> err === undefined, res[0] === 0, res[1] === 'res: unbuild bluebird@2.9.3'

cmd('npm -v', {stdio: 'inherit'}, __cb);
//=> will directly outputs: 2.1.16
//=> err === undefined, res[0] === 0, res[1] === 'res:'

cmd('npm', __cb);
cmd('npm', {someFake: 'options'}, __cb);
cmd('npm', ['install', '--save-dev', 'bluebird'], __cb);
cmd('npm', ['install', '--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb);
cmd('npm -v', __cb)
cmd('npm install', ['--save-dev', 'bluebird'], __cb);
cmd('npm install', ['--save-dev', 'bluebird'], {stdio: [null, null, null]}, __cb);
cmd('npm -v', {stdio: [null, null, null]}, __cb);
```

### Impossible signatures (will throws/errors)
> these examples should not work

```js
cmd(__cb);
//=> first argument cant be function

cmd({ok:true});
//=> should have `callback` (non empty callback)

cmd(['--save-dev', 'bluebird']);
//=> should have `callback` (non empty callback)

cmd(['--save-dev', 'bluebird'], {ok:true});
//=> should have `callback` (non empty callback)

cmd({ok:true}, __cb);
//=> expect `cmd` be string

cmd(['--save-dev', 'bluebird'], __cb);
//=> expect `cmd` be string

cmd(['--save-dev', 'bluebird'], {ok:true}, __cb);
//=> expect `cmd` be string
```


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/async-exec-cmd
[npmjs-img]: https://img.shields.io/npm/v/async-exec-cmd.svg?style=flat&label=async-exec-cmd

[coveralls-url]: https://coveralls.io/r/tunnckoCore/async-exec-cmd?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/async-exec-cmd.svg?style=flat

[license-url]: https://github.com/tunnckoCore/async-exec-cmd/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/async-exec-cmd
[travis-img]: https://img.shields.io/travis/tunnckoCore/async-exec-cmd.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/async-exec-cmd
[daviddm-img]: https://img.shields.io/david/tunnckoCore/async-exec-cmd.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/async-exec-cmd/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), January 28, 2015_

[cross-spawn]: https://github.com/IndigoUnited/node-cross-spawn
[github-short-url-regex]: https://github.com/regexps/github-short-url-regex
[arr-union]: https://github.com/jonschlinkert/arr-union