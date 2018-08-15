# `rpc/` folder

This folder hosts all the (RPC Observables)[https://github.com/paritytech/js-libs/blob/master/packages/light.js/src/types.d.ts#L38] that are exposed by `@parity/light.js`.

## Folder structure

The `eth/`, `net/`, `parity/` folders contain all RPC Observables whose underlying API calls start respectively with `eth_`, `net_` and `parity_`.

The `other` folder contains RPC Observables that are complex (like `post$`) or objects containing RPC Observables (like `makeContract$`).

The `utils` folder contains utility functions used in the `rpc/` folder.
