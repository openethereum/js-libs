

# Functions

<a id="getapi"></a>

## `<Const>` getApi

▸ **getApi**(): `any`

*Defined in [api.ts:70](https://github.com/paritytech/js-libs/blob/ea75324/packages/light.js/src/api.ts#L70)*

We only ever use api() at call-time of functions; this allows the options (particularly the transport option) to be changed dynamically and the data structure to be reused.

**Returns:** `any`
- The current Api object.

___
<a id="setapi"></a>

## `<Const>` setApi

▸ **setApi**(newApi: *`any`*): `void`

*Defined in [api.ts:45](https://github.com/paritytech/js-libs/blob/ea75324/packages/light.js/src/api.ts#L45)*

Sets a new Api object.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| newApi | `any` |  An Api object. |

**Returns:** `void`

___
<a id="setprovider"></a>

## `<Const>` setProvider

▸ **setProvider**(provider?: *`any`*): `void`

*Defined in [api.ts:59](https://github.com/paritytech/js-libs/blob/ea75324/packages/light.js/src/api.ts#L59)*

Sets a new Ethereum provider object.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` provider | `any` |  An Ethereum provider object. |

**Returns:** `void`

___

