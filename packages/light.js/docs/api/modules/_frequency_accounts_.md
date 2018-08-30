

# Variables

<a id="onaccountschanged_"></a>

## `<Const>` onAccountsChanged$

**● onAccountsChanged$**: *[FrequencyObservable](../interfaces/_types_.frequencyobservable.md)<`string`[]>* =  createOnFromPubsub<Address[]>(
  'eth_accounts',
  api
)

*Defined in [frequency/accounts.ts:13](https://github.com/paritytech/js-libs/blob/42f0d26/packages/light.js/src/frequency/accounts.ts#L13)*

Observable that emits each time the default account changes

___
<a id="onaccountsinfochanged_"></a>

## `<Const>` onAccountsInfoChanged$

**● onAccountsInfoChanged$**: *[FrequencyObservable](../interfaces/_types_.frequencyobservable.md)<`object`>* =  createOnFromPubsub<AccountsInfo>(
  'parity_accountsInfo',
  api
)

*Defined in [frequency/accounts.ts:22](https://github.com/paritytech/js-libs/blob/42f0d26/packages/light.js/src/frequency/accounts.ts#L22)*

Observable that emits each time the default account changes

___

