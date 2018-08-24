

# Variables

<a id="peercount_"></a>

## `<Const>` peerCount$

**● peerCount$**: *[RpcObservable](../interfaces/_types_.rpcobservable.md)<`number`, `BigNumber`>* =  createRpc$<number, BigNumber>({
  calls: ['net_peerCount'],
  frequency: [onEvery5Seconds$],
  name: 'peerCount$',
  pipes: () => [switchMapPromise(() => api().net.peerCount())]
})

*Defined in [rpc/net/net.ts:20](https://github.com/paritytech/js-libs/blob/c75381e/packages/light.js/src/rpc/net/net.ts#L20)*

Get the amount of peers.

Calls `net_peerCount`
*__returns__*: *   An Observable containing the number.

___

