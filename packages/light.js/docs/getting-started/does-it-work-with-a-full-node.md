# Does this work with a full node?

Yes. Despite what its name would suggest.

## Building a dapp with a remote full node as the backend (MetaMask, INFURA)

For most of the JSONRPC calls, a dapp needs to make wait for a network call to fetch the result, which may cause some latency in the response:

- in the case of a remote full node: the dapp makes a JSONRPC call to the remote full node.
- in the case of a Light Client: the Light Client asks its peers for the result.

As such, the best development patterns which apply to Light Clients also apply to remote full nodes. Read the chapter on [Light Client Development](/concepts/light-client-development.html) to learn more.

`@parity/light.js` is merely a library which regroups all these best development patterns in a simple API.
