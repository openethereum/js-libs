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

| Package                                              | Version                                                                                                                          | Docs                                                                                                  | Description                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`@parity/light.js`](/packages/light.js)             | [![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js.svg)](https://www.npmjs.com/package/@parity/light.js)             | [![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://parity-js.github.io/light.js/) | A high-level reactive library optimized for light clients.                                         |
| [`@parity/light.js-react`](/packages/light.js-react) | [![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js-react.svg)](https://www.npmjs.com/package/@parity/light.js-react) | [![README](https://img.shields.io/badge/docs-README-green.svg)](/packages/light.js-react#readme)      | Easily integrate `@parity/light.js` with React.                                                    |
| [`@parity/api`](/packages/api)                       | [![npm (scoped)](https://img.shields.io/npm/v/@parity/api.svg)](https://www.npmjs.com/package/@parity/api)                       | Coming soon...                                                                                        | Promise-based JSONRPC method wrapper, similar to [`web3.js`](https://github.com/ethereum/web3.js). |

And below are the lower-level packages, used internally, or by advanced users.

| Package                                    | Version                                                                                                                | Docs                                                                                             | Description                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [`@parity/abi`](/packages/abi)             | [![npm (scoped)](https://img.shields.io/npm/v/@parity/abi.svg)](https://www.npmjs.com/package/@parity/abi)             | [![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://parity-js.github.io/abi/) | Ethereum ABI encoder and decoder.                                         |
| [`@parity/contracts`](/packages/contracts) | [![npm (scoped)](https://img.shields.io/npm/v/@parity/contracts.svg)](https://www.npmjs.com/package/@parity/contracts) | [![README](https://img.shields.io/badge/docs-README-green.svg)](/packages/contracts#readme)      | Parity's [contracts](https://github.com/parity-contracts) as ES6 classes. |
| [`@parity/electron`](/packages/electron)   | [![npm (scoped)](https://img.shields.io/npm/v/@parity/electron.svg)](https://www.npmjs.com/package/@parity/electron)   | [![README](https://img.shields.io/badge/docs-README-green.svg)](/packages/electron#readme)       | Control the Parity Ethereum node from Electron.                           |

### Contributing

#### Dependencies

Install at least `yarn` version 1.4.2 and [Node.js >=10.11.0](https://nodejs.org/en/)

```
yarn --version // Should be at least 1.4.2
```

#### Tests

```
export NPM_TOKEN=''; yarn test
```

#### Build

```
export NPM_TOKEN=''; yarn build
```

#### Maintenance

1. Fork the repo

2. Clone your fork
```
git clone https://github.com/<INSERT_YOUR_GITHUB_USERNAME>/js-libs
```

3. Install and run NPM check.

```
npm install -g npm-check;
npm-check
```

4. Create a branch and update any dependencies that it indicates are out of date.

```
git checkout -b <INSERT_YOUR_BRANCH_NAME>
```

5. Run tests, linting, and build

```
export NPM_TOKEN=''; yarn test; yarn lint; yarn build
```

6. Push the branch to your fork of the repo

7. Integrate the updated library as a dependency. Example: If you are using the 'electron' package in another project, then update the package.json file to temporarily use your branch instead of the public NPM registry version

```
yarn add https://github.com/<INSERT_YOUR_GITHUB_USERNAME>/js-libs.git#<INSERT_YOUR_BRANCH_NAME>
```

8. Create a pull request from your fork of the repo to the upstream master branch


## License

All Parity's JavaScript libraries are open-source software [licensed as MIT](/LICENSE).
