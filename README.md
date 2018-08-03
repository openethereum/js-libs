# Parity's JavaScript Stack

A collection of JavaScript libraries for dapp development.

Packages
--------

This repository is a monorepo that we manage using [Lerna](https://lernajs.io). That means that we actually publish [several packages](/packages) to npm from the same codebase, including:

| Package                                              | Version | Docs | Description                                                                                        |
| ---------------------------------------------------- | ------- | ---- | -------------------------------------------------------------------------------------------------- |
| [`@parity/light.js`](/packages/light.js)             | TODO    | TODO | A high-level reactive library optimized for light clients.                                         |
| [`@parity/light.js-react`](/packages/light.js-react) | TODO    | TODO | Easily integrate `@parity/light.js` with React.                                                    |
| [`@parity/api`](/packages/api)                       | TODO    | TODO | Promise-based JSONRPC method wrapper, similar to [`web3.js`](https://github.com/ethereum/web3.js). |
| [`@parity/jsonrpc`](/packages/jsonrpc)               | TODO    | TODO | Ethereum JSONRPC definitions.                                                                      |
| [`@parity/abi`](/packages/abi)                       | TODO    | TODO | Ethereum ABI encoder and decoder.                                                                  |
| [`@parity/contracts`](/packages/contracts)           | TODO    | TODO | Parity's [contracts](https://github.com/parity-contracts) as ES6 classes.                          |
| [`@parity/electron`](/packages/electron)             | TODO    | TODO | Control the Parity Ethereum node from Electron.                                                    |

License
-------

[MIT](/LICENSE)
