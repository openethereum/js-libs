# Tutorial Part 4: Send a Transaction

So far we have only seen RpcObservables that read data from the blockchain, we have not yet had any impact on the blockchain's state - we have not yet sent a transaction.

## The `post$` RpcObservable

### Arguments

Creating a new transaction is a simple affair. The function `post$` takes as first argument an object describing the transaction. There are several keys it may contain:

- `to` The recipient of the transaction; undefined or null indicates this is a contract-creation transaction.
- `from` The sender of the transaction; must be an account which the user controls. Will default to bonds.me.
- `value` The amount of ether to send to the recipient or endow any created contract.
- `condition` A condition on which to predicate the distribution, but not the approval/signing, of the transaction. This is an object which contains one of two keys: block (which dictates the minimum block number before distribution) and time (the same but for block timestamp).
- `gas` The amount of gas to supply with the transaction. By default, it will attempt to estimate the amount of gas to supply. Such that the transaction succeeds without exception/error.
- `gasPrice` The price (in Wei) per unit of gas. Will default to something sensible (in Parity's case, this is the median of the distribution formed from the last several hundred transactions).
- `nonce` The sender nonce of the transaction. Will default to the latest known value.

The second (optional) argument describes options to pass to this function. It is an object with the following keys:

- `estimate`: Will estimate the amount of gas required for this transaction first.

### Return Value

The value to which the RpcObservable evaluates reflects the ongoing status of the transaction as it moves through the process of getting finalised. It is always an object with a single key/value. It can be:

- `{"estimating": true}` The amount of gas required for this transaction to execute is being determined (only fired if `estimate` is set to `true`).
- `{"estimated": value}` The amount of gas required for this transaction to execute has been determined as value; the user is about to be asked (only fired if `estimate` is set to `true`).
- `{"requested": id}` The user has been asked for approval of the transaction; id is the (numeric) identity of the request.
- `{"signed": hash}` The user has approved the transaction and the transaction has been signed to form a final transaction hash of hash. It is now ready to be sent to the network for inclusion in a new block.
- `{"confirmed": receipt}` The transaction has been confirmed into a block. The receipt of the transaction is provided as receipt, giving information concerning its operation, including any logs.
- `{"failed": error}` The transaction has failed. Generally this is because the user did not approve the transaction or otherwise signing could not take place. error is a string which contains any details regarding the situation.

### Example

```javascript
import light from './light';

light
  .post$({
    to: '0x180fbce524fd79b4af8dccf83809acd9bc95fd1a',
    value: 100 * 1e15 // value in wei
  })
  .subscribe(console.log);

// Logs:
// { requested: '0x1' }
// { signed: '0x123...ff' }
// { confirmed: {/* receipt object */} }
```
