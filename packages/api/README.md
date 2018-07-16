# @parity/api

Parity.js is a thin, fast, Promise-based wrapper around the Ethereum APIs.

[![Build Status](https://travis-ci.org/paritytech/js-api.svg?branch=master)](https://travis-ci.org/paritytech/js-api)
[![Coverage Status](https://coveralls.io/repos/github/paritytech/js-api/badge.svg?branch=master)](https://coveralls.io/github/paritytech/js-api?branch=master)
[![Dependency Status](https://david-dm.org/paritytech/js-api.svg)](https://david-dm.org/paritytech/js-api)
[![devDependency Status](https://david-dm.org/paritytech/js-api/dev-status.svg)](https://david-dm.org/paritytech/js-api#info=devDependencies)

## installation

Install the package with `npm install --save @parity/api`

## usage

### initialisation

```javascript
// import the actual Api class
import Api from '@parity/api';

// do the setup
const provider = new Api.Provider.Http('http://localhost:8545');
const api = new Api(provider);
```

### making calls

perform a call

```javascript
api.eth
  .coinbase()
  .then((coinbase) => {
    console.log(`The coinbase is ${coinbase}`);
  });
```

multiple promises

```javascript
Promise
  .all([
    api.eth.coinbase(),
    api.net.listening()
  ])
  .then(([coinbase, listening]) => {
    // do stuff here
  });
```

chaining promises

```javascript
api.eth
  .newFilter({...})
  .then((filterId) => api.eth.getFilterChanges(filterId))
  .then((changes) => {
    console.log(changes);
  });
```

### contracts

attach contract

```javascript
const abi = [{ name: 'callMe', inputs: [{ type: 'bool', ...}, { type: 'string', ...}]}, ...abi...];
const address = '0x123456...9abc';
const contract = api.newContract(abi, address);
```

find & call a function

```javascript
contract.instance
  .callMe
  .call({ gas: 21000 }, [true, 'someString']) // or estimateGas or postTransaction
  .then((result) => {
    console.log(`the result was ${result}`);
  });
```

## apis

APIs implement the calls as exposed in the [Ethcore JSON Ethereum RPC](https://github.com/paritytech/js-api) definitions. Mapping follows the naming conventions of the originals, i.e. `eth_call` becomes `eth.call`, `personal_accounts` becomes `personal.accounts`, etc.

## public node

For operation within a public node, the following peerDependencies needs to be added (this functionality will be moved shortly) -
