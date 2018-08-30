

# Variables

<a id="accountsinfo_"></a>

## `<Const>` accountsInfo$

**● accountsInfo$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`object`, `object`>* =  createRpc$<AccountsInfo, AccountsInfo>({
  frequency: [onAccountsInfoChanged$],
  name: 'accountsInfo$'
})

*Defined in [rpc/parity/parity.ts:18](https://github.com/paritytech/js-libs/blob/42f0d26/packages/light.js/src/rpc/parity/parity.ts#L18)*

Get accounts info. Calls `parity_accountsInfo`.
*__returns__*: *   An Observable containing all info that can be accessed by user concerning accounts.

___
<a id="chainname_"></a>

## `<Const>` chainName$

**● chainName$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, `string`>* =  createRpc$<any, string>({
  calls: ['parity_netChain'],
  frequency: [onStartup$],
  name: 'chainName$',
  pipes: () => [switchMapPromise(() => api().parity.netChain())]
})

*Defined in [rpc/parity/parity.ts:29](https://github.com/paritytech/js-libs/blob/42f0d26/packages/light.js/src/rpc/parity/parity.ts#L29)*

Get the name of the current chain. Calls `parity_netChain`.
*__returns__*: *   An Observable containing the name of the current chain.

___

