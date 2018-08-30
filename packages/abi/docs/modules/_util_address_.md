

# Functions

<a id="isaddress"></a>

## `<Const>` isAddress

▸ **isAddress**(address: *`string`*): `boolean`

*Defined in [util/address.ts:36](https://github.com/paritytech/js-libs/blob/79a5f83/packages/abi/src/util/address.ts#L36)*

Verify that an address is a valid Ethereum address.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  The address to verify. |

**Returns:** `boolean`

___
<a id="ischecksumvalid"></a>

## `<Const>` isChecksumValid

▸ **isChecksumValid**(address: *`string`*): `boolean`

*Defined in [util/address.ts:13](https://github.com/paritytech/js-libs/blob/79a5f83/packages/abi/src/util/address.ts#L13)*

Verify that an address has a valid checksum.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  The Ethereum address to verify. |

**Returns:** `boolean`

___
<a id="tochecksumaddress"></a>

## `<Const>` toChecksumAddress

▸ **toChecksumAddress**(address: *`string`*): `string`

*Defined in [util/address.ts:58](https://github.com/paritytech/js-libs/blob/79a5f83/packages/abi/src/util/address.ts#L58)*

Convert an Ethereum address to its checksum-valid version.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  The address to convert. |

**Returns:** `string`

___

