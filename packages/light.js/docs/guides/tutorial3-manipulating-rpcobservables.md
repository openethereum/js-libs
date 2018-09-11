# Tutorial Part 3: Manipulating RpcObservables

## Loading state of a RpcObservable

In the [previous live demo](https://codesandbox.io/s/wk7y9n77wl), you may have noticed that when fetching balance, the console logs `Symbol(Fetching RPC...)`, whereas `blockNumber$` doesn't.

This is because `balanceOf$` is a RpcObservable that needs to make a _network call_. The Light Client constantly listens to new headers from its peers, so it holds the "latest block number" information in its database, and can directly transfer this information to the dapp. However, if the Light Client wants to know the balance of an account (or anything that lives in the state), then it needs to make a network requests to ask its peers for this piece of information.

This is what happens with `balanceOf$`. On every new block, `balanceOf$` makes a JSONRPC request (`eth_getBalance`), and the Light Client relays this request to the network. This call has some latency, and the latency is shown with `Symbol(Fetching RPC...)`.

Concretely, in your app, a possible UX would be to show a loading spinner while we receive `Symbol(Fetching RPC...)` from the RpcObservable.

### Removing the loading state

However, if this behavior is not desirable for you, the you can add the `withoutLoading` options:

```javascript
light
  .balanceOf$('0x407d73d8a49eeb85d32cf465507dd71d507100c1', {
    withoutLoading: true
  })
  .subscribe(balance => console.log('balance', balance));
```

In this case, the `Symbol(Fetching RPC...)` will never be logged, and you will only be notified when the balance actually changes.

See here for a working example: https://codesandbox.io/s/z6549wqm5l

## Operations on Observables

Since `@parity/light.js` relies heavily on RxJS Observables, all the tools for playing with Observables are available for you to use.

### Format the balance nicely

```javascript
import { map } from 'rxjs/operators';

light
  .balanceOf$('0x407d73d8a49eeb85d32cf465507dd71d507100c1', {
    withoutLoading: true
  })
  .pipe(
    map(balance => balance.toFormat(2)), // Format the number nicely
    map(balance => `${balance} ETH`) // Append 'ETH'
  )
  .subscribe(balance => console.log('balance', balance));

// Logs:
// balance 2,000.00 ETH
// ...
```

See https://codesandbox.io/s/xp87z0xjmo.

### Only log pair block numbers

```javascript
import { map, filter } from 'rxjs/operators';

light
  .blockNumber$()
  .pipe(
    map(v => +v), // Convert BigNumber to number
    filter(blockNumber => blockNumber % 2 === 0) // Filter out pair numbers
  )
  .subscribe(blockNumber => console.log('blockNumber', blockNumber)); // Same as before, log the result

// Logs:
// blockNumber 8548408
// blockNumber 8548410
// ...
```

See https://codesandbox.io/s/v37j38o38y.

### Get the balance of the current account

```javascript
light
  .defaultAccount$()
  .pipe(
    switchMap(publicAddress =>
      light.balanceOf$(publicAddress, { withoutLoading: true })
    ),
    map(value => +value) // Return number instead of BigNumber
  )
  .subscribe(console.log);

// Logs:
// 2
// ...
```

### Conclusion

RxJS has [a lot of operators](http://reactivex.io/documentation/operators.html) which you can use to combine the RpcObservables to build your app's logic. `@parity/light.js` provides the basic RpcObservables, and we let you combine them.
