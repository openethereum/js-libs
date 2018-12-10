

# Hierarchy

**Token**

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Token**(type: *[TokenTypeEnum](../modules/_types_.md#tokentypeenum)*, value?: *[TokenValue](../modules/_types_.md#tokenvalue)*): [Token](_token_token_.token.md)

*Defined in [token/token.ts:11](https://github.com/paritytech/js-libs/blob/865415f/packages/abi/src/token/token.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [TokenTypeEnum](../modules/_types_.md#tokentypeenum) |
| `Optional` value | [TokenValue](../modules/_types_.md#tokenvalue) |

**Returns:** [Token](_token_token_.token.md)

___

# Accessors

<a id="type"></a>

##  type

gettype():  "string" &#124; "address" &#124; "bool" &#124; "bytes" &#124; "bytes1" &#124; "bytes2" &#124; "bytes3" &#124; "bytes4" &#124; "bytes5" &#124; "bytes6" &#124; "bytes7" &#124; "bytes8" &#124; "bytes9" &#124; "bytes10" &#124; "bytes11" &#124; "bytes12" &#124; "bytes13" &#124; "bytes14" &#124; "bytes15" &#124; "bytes16" &#124; "bytes17" &#124; "bytes18" &#124; "bytes19" &#124; "bytes20" &#124; "bytes21" &#124; "bytes22" &#124; "bytes23" &#124; "bytes24" &#124; "bytes25" &#124; "bytes26" &#124; "bytes27" &#124; "bytes28" &#124; "bytes29" &#124; "bytes30" &#124; "bytes31" &#124; "bytes32" &#124; "int" &#124; "int8" &#124; "int16" &#124; "int32" &#124; "int64" &#124; "int128" &#124; "int256" &#124; "uint" &#124; "uint8" &#124; "uint16" &#124; "uint32" &#124; "uint64" &#124; "uint128" &#124; "uint256" &#124; "fixedBytes" &#124; "fixedArray" &#124; "array"

*Defined in [token/token.ts:28](https://github.com/paritytech/js-libs/blob/865415f/packages/abi/src/token/token.ts#L28)*

**Returns:**  "string" &#124; "address" &#124; "bool" &#124; "bytes" &#124; "bytes1" &#124; "bytes2" &#124; "bytes3" &#124; "bytes4" &#124; "bytes5" &#124; "bytes6" &#124; "bytes7" &#124; "bytes8" &#124; "bytes9" &#124; "bytes10" &#124; "bytes11" &#124; "bytes12" &#124; "bytes13" &#124; "bytes14" &#124; "bytes15" &#124; "bytes16" &#124; "bytes17" &#124; "bytes18" &#124; "bytes19" &#124; "bytes20" &#124; "bytes21" &#124; "bytes22" &#124; "bytes23" &#124; "bytes24" &#124; "bytes25" &#124; "bytes26" &#124; "bytes27" &#124; "bytes28" &#124; "bytes29" &#124; "bytes30" &#124; "bytes31" &#124; "bytes32" &#124; "int" &#124; "int8" &#124; "int16" &#124; "int32" &#124; "int64" &#124; "int128" &#124; "int256" &#124; "uint" &#124; "uint8" &#124; "uint16" &#124; "uint32" &#124; "uint64" &#124; "uint128" &#124; "uint256" &#124; "fixedBytes" &#124; "fixedArray" &#124; "array"

___
<a id="value"></a>

##  value

getvalue():  `undefined` &#124; `string` &#124; `number` &#124; `Boolean` &#124; `number`[] &#124; `BigNumber` &#124; ( `string` &#124; `number` &#124; `false` &#124; `true` &#124; `BigNumber` &#124; [Token](_token_token_.token.md))[] &#124; ( `string` &#124; `number` &#124; `false` &#124; `true` &#124; `BigNumber` &#124; [Token](_token_token_.token.md))[][]

*Defined in [token/token.ts:32](https://github.com/paritytech/js-libs/blob/865415f/packages/abi/src/token/token.ts#L32)*

**Returns:**  `undefined` &#124; `string` &#124; `number` &#124; `Boolean` &#124; `number`[] &#124; `BigNumber` &#124; ( `string` &#124; `number` &#124; `false` &#124; `true` &#124; `BigNumber` &#124; [Token](_token_token_.token.md))[] &#124; ( `string` &#124; `number` &#124; `false` &#124; `true` &#124; `BigNumber` &#124; [Token](_token_token_.token.md))[][]

___

# Methods

<a id="validatetype"></a>

## `<Static>` validateType

▸ **validateType**(type: *[TokenTypeEnum](../modules/_types_.md#tokentypeenum)*): `boolean`

*Defined in [token/token.ts:20](https://github.com/paritytech/js-libs/blob/865415f/packages/abi/src/token/token.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [TokenTypeEnum](../modules/_types_.md#tokentypeenum) |

**Returns:** `boolean`

___

