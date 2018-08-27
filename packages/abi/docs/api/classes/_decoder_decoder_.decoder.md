

# Hierarchy

**Decoder**

# Methods

<a id="decode"></a>

## `<Static>` decode

▸ **decode**(params: *[ParamType](_spec_paramtype_paramtype_.paramtype.md)[]*, data: *`string`*): [Token](_token_token_.token.md)[]

*Defined in [decoder/decoder.ts:20](https://github.com/paritytech/js-libs/blob/90978f6/packages/abi/src/decoder/decoder.ts#L20)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [ParamType](_spec_paramtype_paramtype_.paramtype.md)[] |
| data | `string` |

**Returns:** [Token](_token_token_.token.md)[]

___
<a id="decodeparam"></a>

## `<Static>` decodeParam

▸ **decodeParam**(param: *[ParamType](_spec_paramtype_paramtype_.paramtype.md)*, slices: *`string`[]*, offset: *`number`*): [DecodeResult](_decoder_decoderesult_.decoderesult.md)

*Defined in [decoder/decoder.ts:59](https://github.com/paritytech/js-libs/blob/90978f6/packages/abi/src/decoder/decoder.ts#L59)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| param | [ParamType](_spec_paramtype_paramtype_.paramtype.md) |
| slices | `string`[] |
| offset | `number` |

**Returns:** [DecodeResult](_decoder_decoderesult_.decoderesult.md)

___
<a id="peek"></a>

## `<Static>` peek

▸ **peek**(slices: *`string`[]*, position: *`number`*): `string`

*Defined in [decoder/decoder.ts:36](https://github.com/paritytech/js-libs/blob/90978f6/packages/abi/src/decoder/decoder.ts#L36)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| slices | `string`[] |
| position | `number` |

**Returns:** `string`

___
<a id="takebytes"></a>

## `<Static>` takeBytes

▸ **takeBytes**(slices: *`string`[]*, position: *`number`*, length: *`number`*): [BytesTaken](_decoder_bytestaken_.bytestaken.md)

*Defined in [decoder/decoder.ts:44](https://github.com/paritytech/js-libs/blob/90978f6/packages/abi/src/decoder/decoder.ts#L44)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| slices | `string`[] |
| position | `number` |
| length | `number` |

**Returns:** [BytesTaken](_decoder_bytestaken_.bytestaken.md)

___

