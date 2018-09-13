

# Variables

<a id="makecontract"></a>

## `<Const>` makeContract

**● makeContract**: * `(Anonymous function)` & `Memoized`<`(Anonymous function)`>
* =  memoizee(
  (address: Address, abiJson: any[], options: { provider?: any } = {}) => {
    const { provider } = options;
    const abi = new Abi(abiJson); // use types from @parity/abi
    // Variable result will hold the final object to return
    const result: MakeContract = {
      abi,
      address,
      get contractObject() {
        return getContract(address, abiJson, provider);
      }
    };

    // We then copy every key inside contract.instance into our `result` object,
    // replacing each the value by an Observable instead of a Promise.
    abi.functions.forEach(({ name }: any) => {
      // use types from @parity/abi
      result[`${name}$`] = (...args: any[]) => {
        // We only get the contract when the function is called for the 1st
        // time. Note: getContract is memoized, won't create contract on each
        // call.
        const contract = getContract(address, abiJson, provider);
        const method = contract.instance[name]; // Hold the method from the Abi

        // The last arguments in args can be an options object
        const options =
          args.length === method.inputs.length + 1 ? args.pop() : {};

        if (method.constant) {
          return createRpc({
            frequency: [frequency.onEveryBlock$],
            name,
            pipes: () => [
              switchMapPromise(() =>
                contract.instance[name].call(options, args)
              )
            ]
          })(...args);
        } else {
          return post$({
            to: address,
            data: abiEncode(
              method.name,
              method.inputs.map(({ kind: { type } }: any) => type), // TODO Use @parity/api types
              args
            ),
            ...options
          });
        }
      };
    });

    return result;
  },
  { length: 1 } // Only memoize by address
)

*Defined in [rpc/other/makeContract.ts:51](https://github.com/paritytech/js-libs/blob/b4404e2/packages/light.js/src/rpc/other/makeContract.ts#L51)*

Create a contract.
*__param__*: The contract address.

*__param__*: The contract abi.

*__returns__*: *   An object whose keys are all the functions of the contract, and each function return an Observable which will fire when the function resolves.

___

