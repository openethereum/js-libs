# Installation

## From npm

```bash
yarn install @parity/light.js # Or npm install @parity/light.js
```

## Usage

```javascript
import light, { balanceOf$ } from './light.js';

light.setProvider(/* put your Ethereum provider here */);

// Will print every time balance changes.
balanceOf$('0xbb9bc244d798123fde783fcc1c72d3bb8c189413').subscribe(console.log);
```

Here are some examples of providers you can use.

### Provider 1: Your own Light Client (Recommended Way)

Please install Parity Ethereum first: https://parity.io. Then run Parity Ethereum with the following flags:

```bash
/path/to/parity --chain kovan --light --ws-origins all
```

We are using the Kovan testnet so that we are not testing our dapp with real Ether. To get some fake Kovan ETH to play with, head to the faucet: https://faucet.kovan.network/.

Then create a new provider that connects to the Light Client:

```javascript
import Api from '@parity/api';
import light from '@parity/light.js';

// The dapp and the Light Client communicate via WebSocket. Other
// possibilities are Http or IPC.
const provider = new Api.Provider.Ws('ws://127.0.0.1:8546');

light.setProvider(provider);

// Your app...
```

Note: `@parity/api` is Parity's version of [web3.js](https://github.com/ethereum/web3.js/), but you can also web3.js instead. Please refer to [`@parity/api` documentation](https://github.com/paritytech/js-libs/tree/master/packages/api) to see the difference.

### Provider 2: MetaMask

Make sure you have [MetaMask](https://metamask.io/) installed. Then,

```javascript
import light from '@parity/light.js';

window.addEventListener('load', () => {
  // Wait for web3.currentProvider to be injected
  light.setProvider(window.web3.currentProvider);

  startApp();
});
```

### Provider 3: INFURA

```javascript
import Api from '@parity/api';
import light from '@parity/light.js';

// The dapp and the INFURA node communicate via WebSockets.
const provider = new Api.Provider.Ws('wss://mainnet.infura.io/ws');

light.setProvider(provider);

// Your app...
```

### Provider 4: Your own Full Node

Make sure you have a full node running.

```javascript
import Api from '@parity/api';
import light from '@parity/light.js';

// The dapp and the full node communicate via WebSocket. Other
// possibilities are Http or IPC.
const provider = new Api.Provider.Ws('ws://127.0.0.1:8546');

light.setProvider(provider);

// Your app...
```
