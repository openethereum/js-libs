

# Hierarchy

**ParamType**

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new ParamType**(type: *[TokenTypeEnum](../modules/_types_.md#tokentypeenum)*, subtype?: *[ParamType](_spec_paramtype_paramtype_.paramtype.md)*, length?: *`number`*, indexed?: *`boolean`*): [ParamType](_spec_paramtype_paramtype_.paramtype.md)

*Defined in [spec/paramType/paramType.ts:13](https://github.com/paritytech/js-libs/blob/98a5da8/packages/abi/src/spec/paramType/paramType.ts#L13)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| type | [TokenTypeEnum](../modules/_types_.md#tokentypeenum) | - |
| `Default value` subtype | [ParamType](_spec_paramtype_paramtype_.paramtype.md) |  null |
| `Default value` length | `number` | 0 |
| `Default value` indexed | `boolean` | false |

**Returns:** [ParamType](_spec_paramtype_paramtype_.paramtype.md)

___

# Accessors

<a id="indexed"></a>

##  indexed

getindexed(): `boolean`

*Defined in [spec/paramType/paramType.ts:49](https://github.com/paritytech/js-libs/blob/98a5da8/packages/abi/src/spec/paramType/paramType.ts#L49)*

**Returns:** `boolean`

___
<a id="length"></a>

##  length

getlength(): `number`

*Defined in [spec/paramType/paramType.ts:45](https://github.com/paritytech/js-libs/blob/98a5da8/packages/abi/src/spec/paramType/paramType.ts#L45)*

**Returns:** `number`

___
<a id="subtype"></a>

##  subtype

getsubtype(): [ParamType](_spec_paramtype_paramtype_.paramtype.md)

*Defined in [spec/paramType/paramType.ts:41](https://github.com/paritytech/js-libs/blob/98a5da8/packages/abi/src/spec/paramType/paramType.ts#L41)*

**Returns:** [ParamType](_spec_paramtype_paramtype_.paramtype.md)

___
<a id="type"></a>

##  type

gettype():  "string" &#124; "address" &#124; "bool" &#124; "bytes" &#124; "bytes1" &#124; "bytes2" &#124; "bytes3" &#124; "bytes4" &#124; "bytes5" &#124; "bytes6" &#124; "bytes7" &#124; "bytes8" &#124; "bytes9" &#124; "bytes10" &#124; "bytes11" &#124; "bytes12" &#124; "bytes13" &#124; "bytes14" &#124; "bytes15" &#124; "bytes16" &#124; "bytes17" &#124; "bytes18" &#124; "bytes19" &#124; "bytes20" &#124; "bytes21" &#124; "bytes22" &#124; "bytes23" &#124; "bytes24" &#124; "bytes25" &#124; "bytes26" &#124; "bytes27" &#124; "bytes28" &#124; "bytes29" &#124; "bytes30" &#124; "bytes31" &#124; "bytes32" &#124; "int" &#124; "int8" &#124; "int16" &#124; "int32" &#124; "int64" &#124; "int128" &#124; "int256" &#124; "uint" &#124; "uint8" &#124; "uint16" &#124; "uint32" &#124; "uint64" &#124; "uint128" &#124; "uint256" &#124; "fixedBytes" &#124; "fixedArray" &#124; "array"

*Defined in [spec/paramType/paramType.ts:37](https://github.com/paritytech/js-libs/blob/98a5da8/packages/abi/src/spec/paramType/paramType.ts#L37)*

**Returns:**  "string" &#124; "address" &#124; "bool" &#124; "bytes" &#124; "bytes1" &#124; "bytes2" &#124; "bytes3" &#124; "bytes4" &#124; "bytes5" &#124; "bytes6" &#124; "bytes7" &#124; "bytes8" &#124; "bytes9" &#124; "bytes10" &#124; "bytes11" &#124; "bytes12" &#124; "bytes13" &#124; "bytes14" &#124; "bytes15" &#124; "bytes16" &#124; "bytes17" &#124; "bytes18" &#124; "bytes19" &#124; "bytes20" &#124; "bytes21" &#124; "bytes22" &#124; "bytes23" &#124; "bytes24" &#124; "bytes25" &#124; "bytes26" &#124; "bytes27" &#124; "bytes28" &#124; "bytes29" &#124; "bytes30" &#124; "bytes31" &#124; "bytes32" &#124; "int" &#124; "int8" &#124; "int16" &#124; "int32" &#124; "int64" &#124; "int128" &#124; "int256" &#124; "uint" &#124; "uint8" &#124; "uint16" &#124; "uint32" &#124; "uint64" &#124; "uint128" &#124; "uint256" &#124; "fixedBytes" &#124; "fixedArray" &#124; "array"

___

# Methods

<a id="validatetype"></a>

## `<Static>` validateType

▸ **validateType**(type: *[TokenTypeEnum](../modules/_types_.md#tokentypeenum)*): `boolean`

*Defined in [spec/paramType/paramType.ts:29](https://github.com/paritytech/js-libs/blob/98a5da8/packages/abi/src/spec/paramType/paramType.ts#L29)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| type | [TokenTypeEnum](../modules/_types_.md#tokentypeenum) |

**Returns:** `boolean`

___

