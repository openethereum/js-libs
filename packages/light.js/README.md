# @parity/light.js

A high-level reactive JS library optimized for light clients.

[Documentation](https://parity-js.github.io/light.js/)

## Getting Started

```bash
yarn install @parity/light.js
```

## Usage

Reactively observe JSONRPC methods:

```javascript
import { defaultAccount$ } from '@parity/light.js';

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

## Usage with React

The libray provides a higher-order component to use these Observables easily with React apps.

```javascript
import light from '???'; // ??? to be decided
import { syncing$ } from '@parity/light.js';

@light({
  syncingVariable: syncing$
})
class MyClass extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props.syncingVariable)}</div>;
  }
}
```

The UI will automatically update when the syncing state changes.

## Advanced Usage

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

A list of possible frequency Observables is here [TODO doc link], but you can of course put any array of Observables you want.

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
  me$: {
    dependsOn: ['defaultAccount$'],
    subscribersCount: 1
  },
  syncing$: {
    frequency: ['onSyncingChanged$'],
    subscribersCount: 1
  }
}
```

The keys are the Observables you are using in your dapp, each containing an object where:

- `calls`: the underlying JSONRPC calls made.
- `dependsOn`: means that the current Observable depends on other Observables, so it doesn't make any JSONRPC calls itself, and doesn't have a frequency.
- `frequency`: the frequency upon which the Observable is called.
- `subscribersCount`: the number of subscribers this Observable has.

This output can of course be different on different pages of your dapp, if they use different Observables.

## Notes about Implementation

### Observables are cold

The underlying JSONRPC method is only called if there's at least one subscriber.

```javascript
import { balanceOf$ } from '@parity/light.js';

const myObs$ = balanceOf$('0x123');
// Observable created, but `eth_getBalance` not called yet
const subscription = myObs$.subscribe(console.log);
// `eth_getBalance` called for the 1st time

// Some other code...

subscription.unsubscribe();
// `eth_getBalance` stops being called
```

### Observables are PublishReplay(1)

Let's take `blockNumber()$` which fires blocks 7, 8 and 9, and has 3 subscribers that don't subscribe at the same time.

We have the following marble diagram (`^` denotes when the subscriber subscribes).

```
blockNumber$(): -----7----------8------9-----|
subscriber1:    -^---7----------8------9-----|
subscriber2:    ------------^7--8------9-----|
subscriber3:    --------------------------^9-|
```

Note: the default behavior for Observables is without PublishReplay, i.e.

```
blockNumber$(): -----7----------8------9-----|
subscriber1:    -^---7----------8------9-----|
subscriber2:    ------------^---8------9-----|
subscriber3:    --------------------------^--|
```

But Observables in this library are PublishReplay(1). [Read more](https://blog.angularindepth.com/rxjs-how-to-use-refcount-73a0c6619a4e) about PublishReplay.

### Observables are memoized

```javascript
const obs1$ = balanceOf$('0x123');
const obs2$ = balanceOf$('0x123');
console.log(obs1$ === obs2$); // true

const obs3$ = balanceOf$('0x456');
console.log(obs1$ === obs3$); // false
```

### Underlying API calls are not unnessarily repeated

```javascript
const obs1$ = balanceOf$('0x123');
const obs2$ = balanceOf$('0x123');

obs1$.subscribe(console.log);
obs1$.subscribe(console.log);
obs2$.subscribe(console.log);
// Logs 3 times the balance
// But only one call to `eth_getBalance` has been made

const obs3$ = balanceOf$('0x456');
// Logs a new balance, another call to `eth_getBalance` is made
```

### Underlying PubSub subscriptions are dropped when there's no subscriber

```javascript
import { blockNumber$ } from '@parity/light.js';

const myObs$ = blockNumber$();
console.log(blockNumber$.frequency); // [onEveryBlock$]
// Note: onEveryBlock$ creates a pubsub on `eth_blockNumber`

const subscription = myObs$.subscribe(console.log);
// Creates a pubsub subscription

// Some other code...

subscription.unsubscribe();
// Drops the pubsub subscription
```

## TODO

- Switch to TypeScript.
- Have 100% test coverage.
