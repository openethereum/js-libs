

# Type parameters
#### T 
# Hierarchy

 `Observable`<`T`>

**↳ FrequencyObservable**

# Implements

* `Subscribable`<`T`>

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new FrequencyObservable**(subscribe?: *`function`*): [FrequencyObservable](_types_.frequencyobservable.md)

*Inherited from Observable.__constructor*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:19*

*__constructor__*: 

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` subscribe | `function` |  the function that is called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values can be \`next\`ed, or an \`error\` method can be called to raise an error, or \`complete\` can be called to notify of a successful completion. |

**Returns:** [FrequencyObservable](_types_.frequencyobservable.md)

___

# Properties

<a id="_isscalar"></a>

##  _isScalar

**● _isScalar**: *`boolean`*

*Inherited from Observable._isScalar*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:15*

Internal implementation detail, do not use directly.

___
<a id="metadata"></a>

## `<Optional>` metadata

**● metadata**: *`object`*

*Defined in [types.ts:38](https://github.com/paritytech/js-libs/blob/70247e1/packages/light.js/src/types.ts#L38)*

#### Type declaration

___
<a id="operator"></a>

##  operator

**● operator**: *`Operator`<`any`, `T`>*

*Inherited from Observable.operator*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:19*

*__deprecated__*: This is an internal implementation detail, do not use.

___
<a id="source"></a>

##  source

**● source**: *`Observable`<`any`>*

*Inherited from Observable.source*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:17*

*__deprecated__*: This is an internal implementation detail, do not use.

___
<a id="create"></a>

## `<Static>` create

**● create**: *`Function`*

*Inherited from Observable.create*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:37*

Creates a new cold Observable by calling the Observable constructor
*__static__*: true

*__owner__*: Observable

*__method__*: create

*__param__*: the subscriber function to be passed to the Observable constructor

*__returns__*: a new cold observable

*__nocollapse__*: 

___
<a id="if"></a>

## `<Static>` if

**● if**: *`iif`*

*Inherited from Observable.if*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:64*

*__nocollapse__*: 

*__deprecated__*: In favor of iif creation function: import { iif } from 'rxjs';

___
<a id="throw"></a>

## `<Static>` throw

**● throw**: *`throwError`*

*Inherited from Observable.throw*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:69*

*__nocollapse__*: 

*__deprecated__*: In favor of throwError creation function: import { throwError } from 'rxjs';

___

# Methods

<a id="_subscribe"></a>

##  _subscribe

▸ **_subscribe**(subscriber: *`Subscriber`<`any`>*): `TeardownLogic`

*Inherited from Observable._subscribe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:59*

*__deprecated__*: This is an internal implementation detail, do not use.

**Parameters:**

| Param | Type |
| ------ | ------ |
| subscriber | `Subscriber`<`any`> |

**Returns:** `TeardownLogic`

___
<a id="_trysubscribe"></a>

##  _trySubscribe

▸ **_trySubscribe**(sink: *`Subscriber`<`T`>*): `TeardownLogic`

*Inherited from Observable._trySubscribe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:49*

*__deprecated__*: This is an internal implementation detail, do not use.

**Parameters:**

| Param | Type |
| ------ | ------ |
| sink | `Subscriber`<`T`> |

**Returns:** `TeardownLogic`

___
<a id="foreach"></a>

##  forEach

▸ **forEach**(next: *`function`*, promiseCtor?: *`PromiseConstructorLike`*): `Promise`<`void`>

*Inherited from Observable.forEach*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:57*

*__method__*: forEach

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| next | `function` |  a handler for each value emitted by the observable |
| `Optional` promiseCtor | `PromiseConstructorLike` |

**Returns:** `Promise`<`void`>
a promise that either resolves on observable completion or
 rejects with the handled error

___
<a id="lift"></a>

##  lift

▸ **lift**R(operator: *`Operator`<`T`, `R`>*): `Observable`<`R`>

*Inherited from Observable.lift*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:45*

Creates a new Observable, with this Observable as the source, and the passed operator defined as the new observable's operator.
*__method__*: lift

**Type parameters:**

#### R 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| operator | `Operator`<`T`, `R`> |  the operator defining the operation to take on the observable |

**Returns:** `Observable`<`R`>
a new observable with the Operator applied

___
<a id="pipe"></a>

##  pipe

▸ **pipe**(): `Observable`<`T`>

▸ **pipe**A(op1: *`OperatorFunction`<`T`, `A`>*): `Observable`<`A`>

▸ **pipe**A,B(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*): `Observable`<`B`>

▸ **pipe**A,B,C(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*, op3: *`OperatorFunction`<`B`, `C`>*): `Observable`<`C`>

▸ **pipe**A,B,C,D(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*, op3: *`OperatorFunction`<`B`, `C`>*, op4: *`OperatorFunction`<`C`, `D`>*): `Observable`<`D`>

▸ **pipe**A,B,C,D,E(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*, op3: *`OperatorFunction`<`B`, `C`>*, op4: *`OperatorFunction`<`C`, `D`>*, op5: *`OperatorFunction`<`D`, `E`>*): `Observable`<`E`>

▸ **pipe**A,B,C,D,E,F(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*, op3: *`OperatorFunction`<`B`, `C`>*, op4: *`OperatorFunction`<`C`, `D`>*, op5: *`OperatorFunction`<`D`, `E`>*, op6: *`OperatorFunction`<`E`, `F`>*): `Observable`<`F`>

▸ **pipe**A,B,C,D,E,F,G(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*, op3: *`OperatorFunction`<`B`, `C`>*, op4: *`OperatorFunction`<`C`, `D`>*, op5: *`OperatorFunction`<`D`, `E`>*, op6: *`OperatorFunction`<`E`, `F`>*, op7: *`OperatorFunction`<`F`, `G`>*): `Observable`<`G`>

▸ **pipe**A,B,C,D,E,F,G,H(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*, op3: *`OperatorFunction`<`B`, `C`>*, op4: *`OperatorFunction`<`C`, `D`>*, op5: *`OperatorFunction`<`D`, `E`>*, op6: *`OperatorFunction`<`E`, `F`>*, op7: *`OperatorFunction`<`F`, `G`>*, op8: *`OperatorFunction`<`G`, `H`>*): `Observable`<`H`>

▸ **pipe**A,B,C,D,E,F,G,H,I(op1: *`OperatorFunction`<`T`, `A`>*, op2: *`OperatorFunction`<`A`, `B`>*, op3: *`OperatorFunction`<`B`, `C`>*, op4: *`OperatorFunction`<`C`, `D`>*, op5: *`OperatorFunction`<`D`, `E`>*, op6: *`OperatorFunction`<`E`, `F`>*, op7: *`OperatorFunction`<`F`, `G`>*, op8: *`OperatorFunction`<`G`, `H`>*, op9: *`OperatorFunction`<`H`, `I`>*): `Observable`<`I`>

▸ **pipe**R(...operations: *`OperatorFunction`<`any`, `any`>[]*): `Observable`<`R`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:70*

**Returns:** `Observable`<`T`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:71*

**Type parameters:**

#### A 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |

**Returns:** `Observable`<`A`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:72*

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |

**Returns:** `Observable`<`B`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:73*

**Type parameters:**

#### A 
#### B 
#### C 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |
| op3 | `OperatorFunction`<`B`, `C`> |

**Returns:** `Observable`<`C`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:74*

**Type parameters:**

#### A 
#### B 
#### C 
#### D 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |
| op3 | `OperatorFunction`<`B`, `C`> |
| op4 | `OperatorFunction`<`C`, `D`> |

**Returns:** `Observable`<`D`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:75*

**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |
| op3 | `OperatorFunction`<`B`, `C`> |
| op4 | `OperatorFunction`<`C`, `D`> |
| op5 | `OperatorFunction`<`D`, `E`> |

**Returns:** `Observable`<`E`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:76*

**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |
| op3 | `OperatorFunction`<`B`, `C`> |
| op4 | `OperatorFunction`<`C`, `D`> |
| op5 | `OperatorFunction`<`D`, `E`> |
| op6 | `OperatorFunction`<`E`, `F`> |

**Returns:** `Observable`<`F`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:77*

**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
#### G 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |
| op3 | `OperatorFunction`<`B`, `C`> |
| op4 | `OperatorFunction`<`C`, `D`> |
| op5 | `OperatorFunction`<`D`, `E`> |
| op6 | `OperatorFunction`<`E`, `F`> |
| op7 | `OperatorFunction`<`F`, `G`> |

**Returns:** `Observable`<`G`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:78*

**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
#### G 
#### H 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |
| op3 | `OperatorFunction`<`B`, `C`> |
| op4 | `OperatorFunction`<`C`, `D`> |
| op5 | `OperatorFunction`<`D`, `E`> |
| op6 | `OperatorFunction`<`E`, `F`> |
| op7 | `OperatorFunction`<`F`, `G`> |
| op8 | `OperatorFunction`<`G`, `H`> |

**Returns:** `Observable`<`H`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:79*

**Type parameters:**

#### A 
#### B 
#### C 
#### D 
#### E 
#### F 
#### G 
#### H 
#### I 
**Parameters:**

| Param | Type |
| ------ | ------ |
| op1 | `OperatorFunction`<`T`, `A`> |
| op2 | `OperatorFunction`<`A`, `B`> |
| op3 | `OperatorFunction`<`B`, `C`> |
| op4 | `OperatorFunction`<`C`, `D`> |
| op5 | `OperatorFunction`<`D`, `E`> |
| op6 | `OperatorFunction`<`E`, `F`> |
| op7 | `OperatorFunction`<`F`, `G`> |
| op8 | `OperatorFunction`<`G`, `H`> |
| op9 | `OperatorFunction`<`H`, `I`> |

**Returns:** `Observable`<`I`>

*Inherited from Observable.pipe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:80*

**Type parameters:**

#### R 
**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` operations | `OperatorFunction`<`any`, `any`>[] |

**Returns:** `Observable`<`R`>

___
<a id="subscribe"></a>

##  subscribe

▸ **subscribe**(observer?: *`PartialObserver`<`T`>*): `Subscription`

▸ **subscribe**(next?: *`function`*, error?: *`function`*, complete?: *`function`*): `Subscription`

*Inherited from Observable.subscribe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:46*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` observer | `PartialObserver`<`T`> |

**Returns:** `Subscription`

*Inherited from Observable.subscribe*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:47*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` next | `function` |
| `Optional` error | `function` |
| `Optional` complete | `function` |

**Returns:** `Subscription`

___
<a id="topromise"></a>

##  toPromise

▸ **toPromise**T(this: *`Observable`<`T`>*): `Promise`<`T`>

▸ **toPromise**T(this: *`Observable`<`T`>*, PromiseCtor: *`PromiseConstructor`*): `Promise`<`T`>

▸ **toPromise**T(this: *`Observable`<`T`>*, PromiseCtor: *`PromiseConstructorLike`*): `Promise`<`T`>

*Inherited from Observable.toPromise*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:81*

**Type parameters:**

#### T 
**Parameters:**

| Param | Type |
| ------ | ------ |
| this | `Observable`<`T`> |

**Returns:** `Promise`<`T`>

*Inherited from Observable.toPromise*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:82*

**Type parameters:**

#### T 
**Parameters:**

| Param | Type |
| ------ | ------ |
| this | `Observable`<`T`> |
| PromiseCtor | `PromiseConstructor` |

**Returns:** `Promise`<`T`>

*Inherited from Observable.toPromise*

*Defined in /Users/amaurymartiny/Workspaces/js-libs/node_modules/rxjs/internal/Observable.d.ts:83*

**Type parameters:**

#### T 
**Parameters:**

| Param | Type |
| ------ | ------ |
| this | `Observable`<`T`> |
| PromiseCtor | `PromiseConstructorLike` |

**Returns:** `Promise`<`T`>

___

