
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

All available methods are documented [in the docs](TODO).

Usage with React
----------------

The libray provides a higher-order component to use these Observables easily with React apps.

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

Advanced Usage
--------------

### Frequency

Each Observable has a frequency upon which it is called. The frequency is documented in each method's [documentation](https://parity-js.github.io/light.js/).

For example, the frequency of `balanceOf$` is:

`frequency: [onStartup$, onEvery2Blocks$]`

which means that the underlying JSONRPC call `eth_getBalance` will be made once when the Observable is subscribed (on startup), and once every 2 blocks.

For the needs of your dapp, you can change the frequency of all Observables like this:

```javascript
import { balanceOf$, onEvery2Seconds$, onStartup$ };

balanceOf$.setFrequency([onStartup$, onEvery2Seconds$]);
balanceOf$('0x123').subscribe(console.log);
// `eth_getBalance` will be called once immediately, and once every 2 seconds
```

A list of possible frequency Observables is here \[TODO doc link\], but you can of course put any array of Observables you want.

### RPC Overview

To see an overview of all currently active Observables, type `window.parity.rpcOverview()` in the browser console. The output will be:

```javascript
{
  accounts$: {
    calls: ['eth_accounts'],
    frequency: ['onAccountsChanged$'],
    subscribersCount: 4
  },
  balanceOf$: {
    calls: ['eth_getBalance'],
    frequency: ['onEvery2Blocks$', 'onStartup$'],
    subscribersCount: 2
  },
  defaultAccount$: {
    dependsOn: ['accounts$'],
    subscribersCount: 3
  },
  height$: {
    frequency: ['onEveryBlock$'],
    subscribersCount: 2
  },
  syncing$: {
    frequency: ['onSyncingChanged$'],
    subscribersCount: 1
  }
}
```

The keys are the Observables you are using in your dapp, each containing an object where:

*   `calls`: the underlying JSONRPC calls made.
*   `dependsOn`: means that the current Observable depends on other Observables, so it doesn't make any JSONRPC calls itself, and doesn't have a frequency.
*   `frequency`: the frequency upon which the Observable is called.
*   `subscribersCount`: the number of subscribers this Observable has.

This output can of course be different on different pages of your dapp, if they use different Observables.

TODO
----

*   Have 100% test coverage.

