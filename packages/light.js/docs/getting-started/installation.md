# Installation

## From npm

```bash
yarn install rxjs @parity/light.js # Or npm install
```

RxJS is a needed peer-dependency.

## Usage

```javascript
import light, { balanceOf$ } from './light.js';

light.setProvider(/* put your Ethereum provider here */);

// Will print every time balance changes.
balanceOf$('0xbb9bc244d798123fde783fcc1c72d3bb8c189413').subscribe(console.log);
```

Here are some examples of providers you can use.

### Provider 1: Your own Light Client (Recommended Way for development)

Make sure a Light Client is running locally with a WebSocket server on port 8546. Follow [this tutorial](/guides/tutorial1-set-up-a-light-client.html) to learn how to do it.

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

Note: As of August 2018, this method is only suitable for local development only. If you put your dapp online, there is no easy way it'll have its own "local" Light Client. We recommend using another provider in this case.

However, if you are building a mobile application or an Electron desktop application, then the Light Client can be easily embedded into the application itself. For an example, see [Fether](https://github.com/paritytech/fether).

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
