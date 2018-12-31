

# Index

### Interfaces

* [AbiInput](../interfaces/_types_.abiinput.md)
* [AbiItem](../interfaces/_types_.abiitem.md)

### Type aliases

* [AbiItemType](_types_.md#abiitemtype)
* [AbiObject](_types_.md#abiobject)
* [AddressValue](_types_.md#addressvalue)
* [ArrayValue](_types_.md#arrayvalue)
* [BoolValue](_types_.md#boolvalue)
* [BytesValue](_types_.md#bytesvalue)
* [FixedArrayValue](_types_.md#fixedarrayvalue)
* [FixedBytesValue](_types_.md#fixedbytesvalue)
* [IntValue](_types_.md#intvalue)
* [MediateType](_types_.md#mediatetype)
* [Slices](_types_.md#slices)
* [StringValue](_types_.md#stringvalue)
* [TokenTypeEnum](_types_.md#tokentypeenum)
* [TokenValue](_types_.md#tokenvalue)
* [UintValue](_types_.md#uintvalue)

---

# Type aliases

<a id="abiitemtype"></a>

##  AbiItemType

**Ƭ AbiItemType**: * "function" &#124; "event" &#124; "constructor" &#124; "fallback"
*

*Defined in [types.ts:16](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L16)*

___
<a id="abiobject"></a>

##  AbiObject

**Ƭ AbiObject**: *[AbiItem](../interfaces/_types_.abiitem.md)[]*

*Defined in [types.ts:110](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L110)*

___
<a id="addressvalue"></a>

##  AddressValue

**Ƭ AddressValue**: *`string`*

*Defined in [types.ts:79](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L79)*

___
<a id="arrayvalue"></a>

##  ArrayValue

**Ƭ ArrayValue**: *[FixedArrayValue](_types_.md#fixedarrayvalue)[]*

*Defined in [types.ts:87](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L87)*

___
<a id="boolvalue"></a>

##  BoolValue

**Ƭ BoolValue**: * `boolean` &#124; `string`
*

*Defined in [types.ts:80](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L80)*

___
<a id="bytesvalue"></a>

##  BytesValue

**Ƭ BytesValue**: * `string` &#124; `number`[]
*

*Defined in [types.ts:81](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L81)*

___
<a id="fixedarrayvalue"></a>

##  FixedArrayValue

**Ƭ FixedArrayValue**: *( `string` &#124; `number` &#124; `false` &#124; `true` &#124; `BigNumber` &#124; [Token](../classes/_token_token_.token.md))[]*

*Defined in [types.ts:86](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L86)*

___
<a id="fixedbytesvalue"></a>

##  FixedBytesValue

**Ƭ FixedBytesValue**: *[BytesValue](_types_.md#bytesvalue)*

*Defined in [types.ts:85](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L85)*

___
<a id="intvalue"></a>

##  IntValue

**Ƭ IntValue**: * `number` &#124; `string` &#124; `BigNumber`
*

*Defined in [types.ts:83](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L83)*

___
<a id="mediatetype"></a>

##  MediateType

**Ƭ MediateType**: * "raw" &#124; "prefixed" &#124; "fixedArray" &#124; "array"
*

*Defined in [types.ts:18](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L18)*

___
<a id="slices"></a>

##  Slices

**Ƭ Slices**: * `string`[] &#124; `null` &#124; `undefined`
*

*Defined in [types.ts:20](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L20)*

___
<a id="stringvalue"></a>

##  StringValue

**Ƭ StringValue**: *`string`*

*Defined in [types.ts:82](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L82)*

___
<a id="tokentypeenum"></a>

##  TokenTypeEnum

**Ƭ TokenTypeEnum**: * "address" &#124; "bool" &#124; "bytes" &#124; "bytes1" &#124; "bytes2" &#124; "bytes3" &#124; "bytes4" &#124; "bytes5" &#124; "bytes6" &#124; "bytes7" &#124; "bytes8" &#124; "bytes9" &#124; "bytes10" &#124; "bytes11" &#124; "bytes12" &#124; "bytes13" &#124; "bytes14" &#124; "bytes15" &#124; "bytes16" &#124; "bytes17" &#124; "bytes18" &#124; "bytes19" &#124; "bytes20" &#124; "bytes21" &#124; "bytes22" &#124; "bytes23" &#124; "bytes24" &#124; "bytes25" &#124; "bytes26" &#124; "bytes27" &#124; "bytes28" &#124; "bytes29" &#124; "bytes30" &#124; "bytes31" &#124; "bytes32" &#124; "string" &#124; "int" &#124; "int8" &#124; "int16" &#124; "int32" &#124; "int64" &#124; "int128" &#124; "int256" &#124; "uint" &#124; "uint8" &#124; "uint16" &#124; "uint32" &#124; "uint64" &#124; "uint128" &#124; "uint256" &#124; "fixedBytes" &#124; "fixedArray" &#124; "array"
*

*Defined in [types.ts:23](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L23)*

___
<a id="tokenvalue"></a>

##  TokenValue

**Ƭ TokenValue**: * [AddressValue](_types_.md#addressvalue) &#124; `Boolean` &#124; [BytesValue](_types_.md#bytesvalue) &#124; [StringValue](_types_.md#stringvalue) &#124; [IntValue](_types_.md#intvalue) &#124; [UintValue](_types_.md#uintvalue) &#124; [FixedBytesValue](_types_.md#fixedbytesvalue) &#124; [FixedArrayValue](_types_.md#fixedarrayvalue) &#124; [ArrayValue](_types_.md#arrayvalue)
*

*Defined in [types.ts:89](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L89)*

___
<a id="uintvalue"></a>

##  UintValue

**Ƭ UintValue**: *[IntValue](_types_.md#intvalue)*

*Defined in [types.ts:84](https://github.com/paritytech/js-libs/blob/e93246f/packages/abi/src/types.ts#L84)*

___

