# Parity's JavaScript Stack

A collection of JavaScript libraries for dapp development.

[![Build Status](https://travis-ci.org/paritytech/js-libs.svg?branch=master)](https://travis-ci.org/paritytech/js-libs)
[![Coverage Status](https://coveralls.io/repos/github/paritytech/js-libs/badge.svg?branch=master)](https://coveralls.io/github/paritytech/js-libs?branch=master)
[![Gitter: Parity.js](https://img.shields.io/badge/gitter-parity.js-4AB495.svg)](https://gitter.im/paritytech/parity.js)
[![Riot: +Parity](https://img.shields.io/badge/riot-%2Bparity%3Amatrix.parity.io-orange.svg)](https://riot.im/app/#/group/+parity:matrix.parity.io)

## Packages

This repository is a monorepo that we manage using [Lerna](https://lernajs.io). That means that we actually publish [several packages](/packages) to npm from the same codebase, including:

| Package                                              | Version                                                                                                            | Docs | Description                                                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---- | -------------------------------------------------------------------------------------------------- |
| [`@parity/light.js`](/packages/light.js)             | TODO                                                                                                               | TODO | A high-level reactive library optimized for light clients.                                         |
| [`@parity/light.js-react`](/packages/light.js-react) | TODO                                                                                                               | TODO | Easily integrate `@parity/light.js` with React.                                                    |
| [`@parity/api`](/packages/api)                       | [![npm (scoped)](https://img.shields.io/npm/v/@parity/api.svg)](https://www.npmjs.com/package/@parity/api)         | TODO | Promise-based JSONRPC method wrapper, similar to [`web3.js`](https://github.com/ethereum/web3.js). |
| [`@parity/jsonrpc`](/packages/jsonrpc)               | [![npm (scoped)](https://img.shields.io/npm/v/@parity/jsonrpc.svg)](https://www.npmjs.com/package/@parity/jsonrpc) | TODO | Ethereum JSONRPC definitions.                                                                      |
| [`@parity/abi`](/packages/abi)                       | [![npm (scoped)](https://img.shields.io/npm/v/@parity/abi.svg)](https://www.npmjs.com/package/@parity/abi)         | TODO | Ethereum ABI encoder and decoder.                                                                  |
| [`@parity/contracts`](/packages/contracts)           | TODO                                                                                                               | TODO | Parity's [contracts](https://github.com/parity-contracts) as ES6 classes.                          |
| [`@parity/electron`](/packages/electron)             | TODO                                                                                                               | TODO | Control the Parity Ethereum node from Electron.                                                    |

## License

[MIT](/LICENSE)
