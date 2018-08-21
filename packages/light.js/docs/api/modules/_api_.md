

# Functions

<a id="getapi"></a>

## `<Const>` getApi

▸ **getApi**(): `any`

*Defined in [api.ts:48](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/api.ts#L48)*

We only ever use api() at call-time of functions; this allows the options (particularly the transport option) to be changed dynamically and the data structure to be reused.

**Returns:** `any`
- The current Api object.

___
<a id="setapi"></a>

## `<Const>` setApi

▸ **setApi**(newApi: *`any`*): `void`

*Defined in [api.ts:32](https://github.com/paritytech/js-libs/blob/a8a861f/packages/light.js/src/api.ts#L32)*

Sets an Api object.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| newApi | `any` |  The Api object. |

**Returns:** `void`

___

