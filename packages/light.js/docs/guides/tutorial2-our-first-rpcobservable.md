# Tutorial Part 2: Our First RpcObservable

Once the Light Client is sync, we can start to write a dapp to connect to it. Our dapp will be written in React, and use [`create-react-app`](https://github.com/facebook/create-react-app) for tooling. Of course, if you're writing your dapp in Angular, Vue or vanilla JavaScript, the tutorial should be simple enough for you to be able to easily port to your tech stack.

Follow `create-react-app`'s [tutorial](https://github.com/facebook/create-react-app) to install it. Then,

```bash
create-react-app my-dapp
cd my-dapp
yarn start # using npm will work too
```

Your dapp should be running on `localhost:3000`! For now it's rather underwhelming as it's just `create-react-app`'s default homepage.

## Add `@parity/light.js`

Now we have our basic dapp harness, we can start introducing more interesting functionality. Without too much ado, let's get started. In the project root folder, run:

```bash
yarn add @parity/api @parity/light.js
```

`@parity/api` is Parity's equivalent of `web3.js`, click [here](https://github.com/paritytech/js-libs/tree/master/packages/api) to see `@parity/api` documentation. We're only using it in our dapp to create a Provider to connect to our Light Client: let's create a file `src/light.js` to define this provider, and connect it to `@parity/light.js`:

```javascript
// src/light.js
import Api from '@parity/api';
import Light from '@parity/light.js';

const provider = window.web3
  ? window.web3.currentProvider
  : new Api.Provider.Ws('ws://127.0.0.1:8546');

const light = new Light(provider);

export default light;
```

Here, we're saying that if there is a web3 provider present (for example injected by MetaMask), then we use it. Or else, by default, we connect to our local Light Client which we spawned in the previous step.

Now, we can go to `src/index.js`, which is the entry point of our dapp, and connect to the provider.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import light from './light';

// Do stuff with light

ReactDOM.render(<App />, document.getElementById('root'));
```

## Our first RpcObservable

The whole `@parity/light.js` works with the concept of [RpcObservables](/concepts/rpc-observables.html), the link shows detailed information about those.

For now, let's just see how to use them. Make the following change in `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import light from './light';

light
  .blockNumber$()
  .subscribe(blockNumber => console.log('blockNumber', blockNumber));

ReactDOM.render(<App />, document.getElementById('root'));
```

If you have never heard of Observables, think of them as Promises that can resolve multiple times. Here, each time the Observable 'fires', we are logging the result. If you wish to quickly learn about Observables, read the section on [Reactive Programming](/concepts/reactive-programming.html).

A RpcObservable is a function that returns an Observable (calling a JSONRPC request behind the scenes). Here, `blockNumber$()` returns an Observable that will fire each time our Light Client receives a new block.

Here's another RpcObservable, returning the balance of an account, and logging it each time this balance changes.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import light from './light';

light
  .blockNumber$()
  .subscribe(blockNumber => console.log('blockNumber', blockNumber));
light
  .balanceOf$('0x407d73d8a49eeb85d32cf465507dd71d507100c1')
  .subscribe(balance => console.log('balance', balance));

ReactDOM.render(<App />, document.getElementById('root'));
```

A live demo of this code can be seen here: https://codesandbox.io/s/wk7y9n77wl. Open the browser console on this page to see the logged block numbers and balances, as [BigNumber](https://github.com/MikeMcl/bignumber.js/) objects.
