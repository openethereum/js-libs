

# Variables

<a id="accounts_"></a>

## `<Const>` accounts$

**● accounts$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`[], `string`[]>* =  createRpc$<Address[], Address[]>({
  frequency: [onAccountsChanged$],
  name: 'accounts$'
})

*Defined in [rpc/eth/eth.ts:30](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/rpc/eth/eth.ts#L30)*

Observable which contains the array of all addresses managed by the light client.

Calls eth_accounts.
*__returns__*: *   An Observable containing the list of public addresses.

___
<a id="balanceof_"></a>

## `<Const>` balanceOf$

**● balanceOf$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, `BigNumber`>* =  createRpc$<any, BigNumber>({
  calls: ['eth_getBalance'],
  frequency: [onEveryBlock$, onStartup$],
  name: 'balanceOf$',
  pipes: (address: Address) => [
    switchMapPromise(() => api().eth.getBalance(address))
  ]
})

*Defined in [rpc/eth/eth.ts:41](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/rpc/eth/eth.ts#L41)*

Get the balance of a given account. Calls `eth_getBalance`.
*__param__*: The account address to query the balance.

*__returns__*: *   An Observable containing the balance.

___
<a id="blocknumber_"></a>

## `<Const>` blockNumber$

**● blockNumber$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`BigNumber`, `BigNumber`>* =  createRpc$<BigNumber, BigNumber>({
  frequency: [onEveryBlock$],
  name: 'blockNumber$'
})

*Defined in [rpc/eth/eth.ts:67](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/rpc/eth/eth.ts#L67)*

Get the current block number.
*__returns__*: *   An Observable containing the block height.

___
<a id="defaultaccount_"></a>

## `<Const>` defaultAccount$

**● defaultAccount$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`[], `string`>* =  createRpc$<Address[], Address>({
  dependsOn: accounts$,
  name: 'defaultAccount$',
  pipes: () => [map(accounts => accounts[0])]
})

*Defined in [rpc/eth/eth.ts:56](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/rpc/eth/eth.ts#L56)*

Get the default account managed by the light client.
*__returns__*: *   An Observable containing the public address of the default account.

___
<a id="mybalance_"></a>

## `<Const>` myBalance$

**● myBalance$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`, `BigNumber`>* =  createRpc$<Address, BigNumber>({
  calls: [`eth_getBalance`],
  dependsOn: defaultAccount$,
  name: 'myBalance$',
  pipes: () => [
    switchMap(
      defaultAccount =>
        isNullOrLoading(defaultAccount)
          ? of(RPC_LOADING)
          : balanceOf$(defaultAccount)
    )
  ]
})

*Defined in [rpc/eth/eth.ts:75](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/rpc/eth/eth.ts#L75)*

Shorthand for fetching the current account's balance.

___
<a id="syncstatus_"></a>

## `<Const>` syncStatus$

**● syncStatus$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)< `false` &#124; `true` &#124; `object`,  `false` &#124; `true` &#124; `object`>* =  createRpc$<object | boolean, object | boolean>({
  frequency: [onSyncingChanged$],
  name: 'syncStatus$'
})

*Defined in [rpc/eth/eth.ts:94](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/rpc/eth/eth.ts#L94)*

Get the syncStatus state.
*__returns__*: *   An Observable containing the syncing state object, or false.

___

