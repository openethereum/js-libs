
@parity/light.js
================

A high-level reactive JS library optimized for light clients.

[![Build Status](https://travis-ci.org/paritytech/js-libs.svg?branch=master)](https://travis-ci.org/paritytech/js-libs) [![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js.svg)](https://www.npmjs.com/package/@parity/light.js) [![npm](https://img.shields.io/npm/dw/@parity/light.js.svg)](https://www.npmjs.com/package/@parity/light.js) [![dependencies Status](https://david-dm.org/paritytech/js-libs/status.svg?path=packages/light.js)](https://david-dm.org/paritytech/js-libs?path=packages/light.js) [![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://parity-js.github.io/light.js/)

[Full Documentation](https://parity-js.github.io/light.js/)
-----------------------------------------------------------

Getting Started
---------------

```bash
yarn install @parity/light.js rxjs # RxJS is a needed peer-dependency
```

Usage
-----

Reactively observe JSONRPC methods:

```javascript
import light, { defaultAccount$ } from '@parity/light.js';

light.setProvider(/* put your ethereum provider here */);

defaultAccount$().subscribe(publicAddress => console.log(publicAddress));
// Outputs your public address 0x...
// Everytime you change your default account (e.g. via MetaMask), it will output your new public address
```

All RxJS tools are available for manipulating Observables:

```javascript
import { balanceOf$, blockNumber$, defaultAccount$ } from '@parity/light.js';
import { filter, map, switchMap } from 'rxjs/operators';

// Only log pair blocks
blockNumber$()
  .pipe(filter(n => n % 2 === 0))
  .subscribe(console.log);

// Get the balance of the default account
// Will update when balance or default account changes
defaultAccount$()
  .pipe(
    switchMap(balanceOf$),
    map(value => +value) // Return number instead of BigNumber
  )
  .subscribe(console.log);

// There's actually an alias for the above Observable:
import { myBalance$ } from '@parity/light.js';
myBalance$().subscribe(console.log);
```

Contract support:

```javascript
import { defaultAccount$, makeContract } from '@parity/light.js';
import { map, switchMap } from 'rxjs/operators';

defaultAccount$()
  .pipe(
    switchMap(defaultAccount =>
      makeContract(/* contract address */, /* abi */)
        .myMethod$(defaultAccount) // Calling method of contract with arguments
    )  )
  .subscribe(console.log); // Will log the result, and everytime the result changes
```

All available methods are documented [in the docs](https://parity-js.github.io/light.js/).

Usage with React
----------------

We provide another library, [`@parity/light.js-react`](https://github.com/paritytech/js-libs/tree/master/packages/light.js-react), with a higher-order component to use these Observables easily with React apps.

```javascript
import light from 'parity/ligth.js-react';
import { syncStatus$ } from '@parity/light.js';

@light({
  mySyncVariable: syncStatus$
})
class MyClass extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props.mySyncVariable)}</div>;
  }
}
```

The UI will automatically update when the syncing state changes.

