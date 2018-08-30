# RpcObservables

The whole library `@parity/light.js` works with the concept of RpcObservables.

The name _RpcObservable_ might actually not be the best, because it's actually **not** an Observable. A RpcObservable is a function returning an Observable.

Here's the TypeScript type of a RpcObservable:

```javascript
export interface RpcObservable<Source, Out> {
  (...args: any[]): Observable<Out>;
  metadata?: Metadata<Source, Out>;
}
```

Or in simple words: a RpcObservable is a function returning an Observable, and this function has some metadata.

Let's have a look at `MetaData`:

```javascript
export interface Metadata<Source, Out> {
  // --snip--
  frequency?: FrequencyObservable<Source>[];
  name?: string;
  pipes?: (...args: any[]) => OperatorFunction<Source, Out>[];
}
```

These are the most important fields of `MetaData`, which we will explain.

## Main Idea

We believe that data streams are an intuitive way to express events happening on the Ethereum blockchain. The most obvious example is the pubsub pattern we described [before](/concepts/light-client-development.html#pubsub), where we wanted to fetch the balance on every new block.

It's intuitive to have an Observable, called `onEveryBlock$`, that would fire an event each time it receives a new block from the network. Then, every time it fires, we declaratively make an JSONRPC call to `eth_getBalance`. Into code, it looks like this:

```javascript
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Observable that makes a JSONRPC request
const fetchBalance = () => from(api.eth.getBalance('0x12..ff');

// On every block, we make that JSONRPC request
onEveryBlock$.pipe(switchMap(fetchBalance)));
```

Similarly, if we want to check our peer count every 5 seconds, we'd do

```javascript
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Observable that makes a JSONRPC request
const checkPeerCount = () => from(api.net.peerCount();

// On every block, we make that JSONRPC request
onEvery5Seconds$.pipe(switchMap(checkPeerCount)));
```

The main idea of `@parity/light.js` is the following: **"on every [frequency], we do [something]"**.

On every new block, we call `eth_balance`. On every 5 seconds, we call `net_peerCount`. Etc.

Looking back at the `MetaData` above, the `frequency` field holds the **frequency**, which is an array of `FrequencyObservable`s, and the `pipes` hold an array of RxJS pipe functions, and each of them does **something**.

## `FrequencyObservable`

Some examples of `FrequencyObservable` shipped with `@parity/light.js` are:

- `onEveryBlock$`
- `onEvery2Blocks$`
- `onEverySecond$`
- `onEvery5Seconds$`
- `onSyncingChanged$` (fires when sync status changes)
- `onAccountsChanged$` (fires when you change account)
- `onStartup$` (fires once at dapp start)
- etc.

The full list can be seen in the [API section](/api/API.md).

## RpcObservable

An RpcObservable can either have a frequency, or depend on another RpcObservable which has a frequency.

### RpcObservable with frequencies

An RpcObservable with a frequency has its `Metadata.frequency` field filled with one or more `FrequencyObservable`s. For example, `balanceOf$` has as frequency of `[onEveryBlock$]`.

Then, this RpcObservable has an array of pipes, which will be piped to the `FrequencyObservable`. For example, `balanceOf$` has one pipe which make a `eth_getBalance` JSONRPC request.

### RpcObservable which depends on another RpcObservable

Some RpcObservable don't have their own frequencies, but depend on a parent RpcObservable. This is the case of `defaultAccount$`, which depends on `account$`. In this case, the `Metadata.dependsOn` field points to the parent RpcObservable.

These RpcObservables still have some pipes. For example `defaultAccount$` has one pipe which takes the 1st element of the array returned by `accounts$`.

### Calling an RpcObservable

As per the TypeScript signature, the RpcObservable function can take arguments. These arguments are then passed down into the pipes. For instance, the argument `0x123` in `balanceOf$('0x123')` is passed down into `balanceOf$`'s pipes, i.e. into the JSONRPC `eth_getBalance` call.

### Examples of RpcObservable

- `accounts$`: Returns the array of accounts managed by the node. Frequency is `onAccountsChanged$`.
- `defaultAccount$`: Returns the default active account. Depends on `accounts$`.
- `blockNumber$`: Returns the current block number. Frequency is `onEveryBlock$`.
- `peerCount$`: Returns the number of peers. Frequency is `onEvery5Seconds$`.

The full list can be seen in the [API section](/api/API.md).
