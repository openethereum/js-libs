# Light Client Development

## What is a Light Client

A Light Client is a special kind of Ethereum node that is, as suggested by its name, light. Concretely, this means:

- low on resources usage: CPU, memory, storage, I/O operations...
- embeddable: in a desktop application, on mobile, within a web app
- but still remains trustless

|            | Full Node     | Light Node |
| ---------- | ------------- | ---------- |
| Sync time  | ~days         | ~seconds   |
| State size | ~gigs         | 0          |
| DB size    | ~tens of gigs | ~megs      |

To learn more about Parity's Light Client, please refer to our wiki: https://wiki.parity.io/Light-Client.

## Current Dapp Development Patterns

If you are a dapp developer, you are probably used to work with a remote full node on the backend:

- either via MetaMask: `web3js = new Web3(web3.currentProvider);`, which internally connects to INFURA.
- or connecting to INFURA directly: `web3js = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));`.

Behind the scenes, there are a couple of differences when developing a dapp with a light node:

- The Light Client has no pending blocks or pending transactions.
- It actually doesn't have the state at all, so cannot verify and propagate incoming transactions.
- No block bodies (so no transactions), so we cannot fetch transaction data fast.

Basically, it means that a all JSONRPC calls that require some state, transaction or block data, will require a network call.

From the developer's perspective, the JSONRPC call is the same; behind the scenes, the dapp will send a JSONRPC request to the Light Client, and the latter will ask its peers (through the network) for the result. The network latency should be taken into account when developing a dapp for the Light Client.

### Remote Full Node vs Light Client as a backend

If you are already using a remote node today, then the code and the app's UX shouldn't be very different if you switch to a Light Client. Both methods require a network latency to resolve most JSONRPC calls.

Therefore, the patterns of developing your dapps shouldn't be very different, we're exploring some of them here.

Please note that there are at least two advantages of using a Light Client:

- we don't use a centralized backend to fetch data we need.
- we verify the data we receive, instead of blindy trusting the backend.

But today, it is easier to get started with a remote full node like INFURA.

### Example of naive polling, which doesn't work well

For example, if you want to fetch the latest ERC20 token balance, the following piece of code (which might actually work), doesn't make sense:

```javascript
const contract = web3.eth.Contract(ABI, '0x00..ff');

setInterval(async () => {
  const balance = await contract.methods.balanceOf('0x00..ff').call();

  document.querySelector('#balance').textContent = balance;
}, 500);
```

We're querying the contract balance every 500ms, so we're making a network request every 500ms. This is too many requests, and moreover, if one network requests takes more than 500ms to resolve, then the displayed result on your dapp could be outdated.

### Smart Polling

There are of course smarter patterns that we see coming again and again in the dapp development community, which become some basic 101 knowledge between dapp developers.

```javascript
const contract = web3.eth.Contract(ABI, '0x00..ff');

async function updateBalance() {
  const balance = await contract.methods.balanceOf('0x00..ff').call();
  document.querySelector('#balance').textContent = balance;
}

const targetTime = 15 * 1000;
setTimeout(function update() {
  const next = Date.now() + targetTime;
  updateBalance().then(() => {
    setTimeout(update, next - Date.now());
  });
});
```

### Pubsub

```javascript
const contract = web3.eth.Contract(ABI, '0x00..ff');

async function updateBalance() {
  const balance = await contract.methods.balanceOf('0x00..ff').call();
  document.querySelector('#balance').textContent = balance;
}

web3.eth.subscribe('newBlockHeaders').on('data', updateBalance);
```

### The goal of @parity/light.js

The goal of `@parity/light.js` is basically to regroup all these patterns into a library, so that dapp developers don't need to think about patterns anymore, but just use a simple API provided by the library.

Internally, `@parity/light.js` uses the Pubsub pattern described above, and mixes it up with Reactive Programming. Jump to the next chapter to find out more.

## Long-term vision

Our long-term vision at Parity is to embed the Light Client a little bit everywhere: in a browser extension, in a mobile app, in a web app.

In order to do this, we plan to compile Parity to WASM, and embed it into a browser environment. This part is out of scope of this documentation, but if you are interested, please refer to this Github thread: https://github.com/paritytech/parity-ethereum/issues/7915.

For example, if we embed it into a browser extension (Chrome Extension, Firefox Add-On), then the Light Client will continously run in your browser. Similarly to MetaMask, it will inject in authorized websites an Ethereum provider object, which will allow dapps to communicate with the Ethereum network via theextension's Light Client.

If we embed it into a web app directly, it should be as simple as:

```javascript
// myapp.js
import lightClient from '@parity/light-client';

lightClient.run(/* Pass in optional flags like "--chain ropsten" etc.*/);
```

Which, behind the scenes, will spawn a Light Client in WASM, sync in a matter of seconds, and the web app will seamlessly become a light node on the network, ready to communicate with other peers.

Other places where the Light Client belong are mobile applications or IoT devices.
