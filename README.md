# async-exec-cmd [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Simple, fast, flexible and cross-platform async executing commands (with [node-cross-spawn][cross-spawn]).

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i async-exec-cmd --save
npm test
```


## API
> For more use-cases see the [tests](./test.js)

### [asyncExecCmd](./index.js#L51)
> Async execute command via spawn. All arguments are rebuilt, merged, structured, normalized
and after all passed to [cross-spawn][cross-spawn], which actually is Node's `spawn`.

- `<cmd>` **{String}** Command/program to execute. You can pass subcommands, flags and arguments separated with space  
- `[args]` **{Array}** arguments that will be [arr-union][arr-union] with the given in `cmd`. You can give `opts` object here instead of `args`  
- `[opts]` **{Object}** pass options to [spawn][cross-spawn] and [github-short-url-regex][github-short-url-regex]. You can give `cb` function here instead of `opts`  
- `<cb>` **{Function}** node-style callback function that will handle
  + `err` **{Error}** error if exists (`instanceof Error`), or `null`. It have some extra props:
    - `command` **{String}** the `cmd` plus `args` which was tried to execute
    - `message` **{String}** some useful message
    - `buffer` **{Buffer}** representation of the error
    - `status` **{Number|String}**
    - `stack` usual ... stack trace
  + `res` **{String}** representation of response for the executed command/program
    - _notice_ when `opts.stdio: 'inherit'`, res is empty string `''` 
    - _notice_ when `err`, it is `undefined`
  + `code` **{Number|String}** e.g. `0`, `1`, `-2`, `128`, `'ENOENT'`, etc.. Process exit status code of the execution
  + `buffer` **{Buffer}** buffer equivalent of response, e.g. `<Buffer 74 75 6e 6e...>`
    - _notice_ when `err`, it is `undefined`
    - but _notice_ you can find it again in `err.buffer`
- `returns` **{Stream}** [child_process.spawn][child_process]

**Example:**

```js
var asyncExecCmd = require('async-exec-cmd')

var child = asyncExecCmd('npm install', [
  '--save-dev', 'bluebird'
], function __cb (err, res, code, buffer) {
  if (err) {
    console.error(err, code)
    return
  }

  console.log(res, code, buffer)
})
```


### Possible signatures (will work)
> these examples should work without problems

```js
var cmd = require('async-exec-cmd')

function __cb (err, res, code, buffer) {
  if (err) {
    console.error(err, code)
    return
  }

  console.log(res, code, buffer)
}

/**
 * Try all these commands separatly or run the tests
 * they cover all situations
 */

cmd('npm', __cb)
//=> res and buffer are undefined

cmd('npm', {stdio: [null, null, null]}, __cb)
//=> err Error object, res and buffer are undefined, 

cmd('npm', ['install', '--save', 'bluebird'], __cb)
//=> err undefined, code 0, res === 'unbuild bluebird@2.9.3'

cmd('npm', ['uninstall', '--save', 'bluebird'], {stdio: [null, null, null]}, __cb)
//=> err undefined, code 0, res === 'unbuild bluebird@2.9.3'

cmd('npm -v', __cb)
//=> err undefined, code 0, res === '2.9.0'

cmd('npm install', ['--save', 'bluebird'], __cb)
//=> err undefined, code 0, res === 'bluebird@2.9.3 node_modules/bluebird'

cmd('npm uninstall', ['--save', 'bluebird'], {stdio: [null, null, null]}, __cb)
//=> err  undefined, code 0, res === 'unbuild bluebird@2.9.3'

cmd('npm -v', {stdio: 'inherit'}, __cb)
//=> will directly outputs: 2.9.0
//=> err undefined, code 0, res === ''
```

### Impossible signatures (will throws/errors)
> these examples should not work

```js
cmd(__cb)
//=> first argument cant be function

cmd({ok:true})
//=> should have `callback` (non empty callback)

cmd(['--save-dev', 'bluebird'])
//=> should have `callback` (non empty callback)

cmd(['--save-dev', 'bluebird'], {ok: true})
//=> should have `callback` (non empty callback)

cmd({ok:true}, __cb)
//=> expect `cmd` be string

cmd(['--save-dev', 'bluebird'], __cb)
//=> expect `cmd` be string

cmd(['--save-dev', 'bluebird'], {ok: true}, __cb)
//=> expect `cmd` be string
```


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/async-exec-cmd/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/async-exec-cmd
[npmjs-img]: https://img.shields.io/npm/v/async-exec-cmd.svg?label=async-exec-cmd

[license-url]: https://github.com/tunnckoCore/async-exec-cmd/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/async-exec-cmd
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/async-exec-cmd.svg

[travis-url]: https://travis-ci.org/tunnckoCore/async-exec-cmd
[travis-img]: https://img.shields.io/travis/tunnckoCore/async-exec-cmd.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/async-exec-cmd
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/async-exec-cmd.svg

[david-url]: https://david-dm.org/tunnckoCore/async-exec-cmd
[david-img]: https://img.shields.io/david/tunnckoCore/async-exec-cmd.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg

[cross-spawn]: https://github.com/IndigoUnited/node-cross-spawn
[child_process]: https://iojs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
[arr-union]: https://github.com/jonschlinkert/arr-union
[github-short-url-regex]: https://github.com/regexps/github-short-url-regex