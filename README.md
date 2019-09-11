[![Build Status](https://travis-ci.org/paritytech/js-libs.svg?branch=master)](https://travis-ci.org/paritytech/js-libs)
[![Coverage Status](https://coveralls.io/repos/github/paritytech/js-libs/badge.svg?branch=master)](https://coveralls.io/github/paritytech/js-libs?branch=master)
[![Gitter: Parity.js](https://img.shields.io/badge/gitter-parity.js-4AB495.svg)](https://gitter.im/paritytech/parity.js)
[![Riot: +Parity](https://img.shields.io/badge/riot-%2Bparity%3Amatrix.parity.io-orange.svg)](https://riot.im/app/#/group/+parity:matrix.parity.io)

<br /><br /><br />

<h1 align="center">Parity's JavaScript Stack</h1>

<h4 align="center">
  A collection of JavaScript libraries for dapp development.
</h4>

<br /><br /><br />

## Packages

This repository is a monorepo that we manage using [Lerna](https://lernajs.io). That means that we publish [several packages](/packages) to npm from the same codebase. If you are a dapp developer, we recommend you start with the following three high-level packages:

| Package                                                                                               | Version                                                                                                                          | Docs                                                                                                                                              | Description                                                                                        |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`@parity/light.js`](https://github.com/paritytech/js-libs/tree/master/packages/light.js)             | [![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js.svg)](https://www.npmjs.com/package/@parity/light.js)             | [![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://paritytech.github.io/js-libs/light.js/)                                    | A high-level reactive library optimized for light clients.                                         |
| [`@parity/light.js-react`](https://github.com/paritytech/js-libs/tree/master/packages/light.js-react) | [![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js-react.svg)](https://www.npmjs.com/package/@parity/light.js-react) | [![README](https://img.shields.io/badge/docs-README-green.svg)](https://github.com/paritytech/js-libs/tree/master/packages/light.js-react#readme) | Easily integrate `@parity/light.js` with React.                                                    |
| [`@parity/api`](https://github.com/paritytech/js-libs/tree/master/packages/api)                       | [![npm (scoped)](https://img.shields.io/npm/v/@parity/api.svg)](https://www.npmjs.com/package/@parity/api)                       | Coming soon...                                                                                                                                    | Promise-based JSONRPC method wrapper, similar to [`web3.js`](https://github.com/ethereum/web3.js). |

And below are the lower-level packages, used internally, or by advanced users.

| Package                                                                                     | Version                                                                                                                | Docs                                                                                                                                         | Description                                                               |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@parity/abi`](https://github.com/paritytech/js-libs/tree/master/packages/abi)             | [![npm (scoped)](https://img.shields.io/npm/v/@parity/abi.svg)](https://www.npmjs.com/package/@parity/abi)             | [![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://paritytech.github.io/js-libs/abi/)                                    | Ethereum ABI encoder and decoder.                                         |
| [`@parity/contracts`](https://github.com/paritytech/js-libs/tree/master/packages/contracts) | [![npm (scoped)](https://img.shields.io/npm/v/@parity/contracts.svg)](https://www.npmjs.com/package/@parity/contracts) | [![README](https://img.shields.io/badge/docs-README-green.svg)](https://github.com/paritytech/js-libs/tree/master/packages/contracts#readme) | Parity's [contracts](https://github.com/parity-contracts) as ES6 classes. |
| [`@parity/electron`](https://github.com/paritytech/js-libs/tree/master/packages/electron)   | [![npm (scoped)](https://img.shields.io/npm/v/@parity/electron.svg)](https://www.npmjs.com/package/@parity/electron)   | [![README](https://img.shields.io/badge/docs-README-green.svg)](https://github.com/paritytech/js-libs/tree/master/packages/electron#readme)  | Control the Parity Ethereum node from Electron.                           |

### Contributing

#### Dependencies

Install at least `yarn` version 1.4.2 and [Node.js >=10.10.0](https://nodejs.org/en/)

```
yarn --version // Should be at least 1.4.2
```

#### Tests

```
yarn test
```

#### Build

```
yarn build
```

#### Maintenance

1. Fork the repo

2. Clone your fork

```bash
git clone https://github.com/<INSERT_YOUR_GITHUB_USERNAME>/js-libs
```

3. Check outdated dependencies

```bash
yarn outdated
```

4. Create a branch

```bash
git checkout -b <INSERT_YOUR_BRANCH_NAME>
```

5. Run tests, type checking, linting, and build

```bash
yarn test; yarn typecheck; yarn lint; yarn build
```

6. Push the branch to your fork of the repo

7. Integrate the updated library as a dependency. Example: If you want to test a branch of one of the js-lib packages in another project like Fether temporarily, then build js-libs and replace the /lib directory where it's a dependency on the Fether project. Then run Fether to use it:

```bash
~/paritytech/js-libs [my-branch-name] $ yarn build
~/paritytech/js-libs [my-branch-name] $ cp -r packages/my-package/lib ../fether/node_modules/@parity/my-package/lib
~/paritytech/js-libs [my-branch-name] $ cd ../fether
~/paritytech/fether [master] $ yarn start
```

8. Create a pull request from your fork of the repo to the upstream master branch

## License

All Parity's JavaScript libraries are open-source software [licensed as MIT](/LICENSE).
