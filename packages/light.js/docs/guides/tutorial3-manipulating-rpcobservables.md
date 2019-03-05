# Tutorial Part 3: Manipulating RpcObservables

## Operators on Observables

Since `@parity/light.js` relies heavily on RxJS Observables, all the tools for playing with Observables are available for you to use.

### Format the balance nicely

```javascript
import { map } from 'rxjs/operators';

balanceOf$('0x407d73d8a49eeb85d32cf465507dd71d507100c1')
  .pipe( // We can chain operators
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

blockNumber$()
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
defaultAccount$()
  .pipe(
    switchMap(publicAddress => balanceOf$(publicAddress)),
    map(value => +value) // Return number instead of BigNumber
  )
  .subscribe(console.log);

// Logs:
// 2
// ...
```

### Conclusion

RxJS has [a lot of operators](http://reactivex.io/documentation/operators.html) which you can use to combine the RpcObservables to build your app's logic. `@parity/light.js` provides the basic RpcObservables, and we let you combine them.
