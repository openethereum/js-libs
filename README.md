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

This repository is a monorepo that we manage using [Lerna](https://lernajs.io). That means that we publish [several packages](/packages) to npm from the same codebase. These packages are:

| Package                                              | Version                                                                                                                          | Docs                                                                                                  | Description                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`@parity/light.js`](/packages/light.js)             | [![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js.svg)](https://www.npmjs.com/package/@parity/light.js)             | [![docs](https://parity-js.github.io/light.js/)](https://img.shields.io/badge/docs-passing-green.svg) | A high-level reactive library optimized for light clients.                                         |
| [`@parity/light.js-react`](/packages/light.js-react) | [![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js-react.svg)](https://www.npmjs.com/package/@parity/light.js-react) | [![README](https://img.shields.io/badge/docs-README-green.svg)](/packages/light.js-react#readme)      | Easily integrate `@parity/light.js` with React.                                                    |
| [`@parity/api`](/packages/api)                       | [![npm (scoped)](https://img.shields.io/npm/v/@parity/api.svg)](https://www.npmjs.com/package/@parity/api)                       | TODO                                                                                                  | Promise-based JSONRPC method wrapper, similar to [`web3.js`](https://github.com/ethereum/web3.js). |
| [`@parity/jsonrpc`](/packages/jsonrpc)               | [![npm (scoped)](https://img.shields.io/npm/v/@parity/jsonrpc.svg)](https://www.npmjs.com/package/@parity/jsonrpc)               | TODO                                                                                                  | Ethereum JSONRPC definitions.                                                                      |
| [`@parity/abi`](/packages/abi)                       | [![npm (scoped)](https://img.shields.io/npm/v/@parity/abi.svg)](https://www.npmjs.com/package/@parity/abi)                       | TODO                                                                                                  | Ethereum ABI encoder and decoder.                                                                  |
| [`@parity/contracts`](/packages/contracts)           | [![npm (scoped)](https://img.shields.io/npm/v/@parity/contracts.svg)](https://www.npmjs.com/package/@parity/contracts)           | TODO                                                                                                  | Parity's [contracts](https://github.com/parity-contracts) as ES6 classes.                          |
| [`@parity/electron`](/packages/electron)             | [![npm (scoped)](https://img.shields.io/npm/v/@parity/electron.svg)](https://www.npmjs.com/package/@parity/electron)             | TODO                                                                                                  | Control the Parity Ethereum node from Electron.                                                    |

## License

All Parity's JavaScript libraries are open-source software [licensed as MIT](/LICENSE).
