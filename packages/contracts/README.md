# @parity/contracts

Parity's [contracts](https://github.com/parity-contracts) as ES6 classes.

[![Build Status](https://travis-ci.org/paritytech/js-libs.svg?branch=master)](https://travis-ci.org/paritytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@parity/contracts.svg)](https://www.npmjs.com/package/@parity/contracts)
[![npm](https://img.shields.io/npm/dw/@parity/contracts.svg)](https://www.npmjs.com/package/@parity/contracts)
[![dependencies Status](https://david-dm.org/paritytech/js-libs/status.svg?path=packages/contracts)](https://david-dm.org/paritytech/js-libs?path=packages/contracts)

## Installation

```bash
yarn add @parity/contracts
```

## Usage

### The Contracts object

```javascript
import Api from '@parity/api';
import Contracts from '@parity/contracts';

const ethereumProvider = ...; // Put your Ethereum provider here, e.g. from MetaMask
const api = new Api(ethereumProvider);

const contracts = Contracts.get(api);

// The contracts object exposes the following contracts:
contracts.badgerefg
contracts.dappref
contracts.githubhint
contracts.registry
contracts.signaturereg
contracts.tokenreg
```

See the [docs/](docs) folder to see the properties of each of those contracts.

### Import ABIs

```javascript
import { eip20 } from '@parity/abi/lib/abi';
```

The list of available ABIs is in the [src/abi/](src/abi) folder.
