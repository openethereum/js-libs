# Tutorial Part 6: Integrate with React

`@parity/light.js` easily integrates with React with the `@parity/light.js-react` extension. `@parity/light.js-react` expose one HOC, which you can attach to any of your React components.

This HOC will handle the subscription to RpcObservables under the hood, and will simply expose the values of these RpcObservables inside props. Concretely, the first step is to add a `hoc` field in our `light` object:

```diff
// src/light.js
import Api from '@parity/api';
import Light from '@parity/light.js';
+import addHocToLight from '@parity/light.js-react';

const provider = window.web3
  ? window.web3.currentProvider
  : new Api.Provider.Ws('ws://127.0.0.1:8546');

const light = new Light(provider);

-export default light;
+export default addHocToLight(light);
```

Then in a React component,

```javascript
import * as React from 'react';
import PropTypes from 'prop-types';

import light from './light';
// `light.hoc` is defined now

@light.hoc({
  myBalance: ({ myAddress }) => light.balanceOf(myAddress, { withouLoading: true }) // myAddress here is a prop passed directly to MyComponent
})
class MyComponent extends React.Component {
  static propTypes = {
    myAddress: PropTypes.string.required,
    myBalance: PropTypes.object.required // myBalance will be a BigNumber
  };

  render() {
    return (
      <div>
        The balance of {this.props.myAddress} is{' '}
        {this.props.myBalance.toFormat(2)}.
      </div>
    );
  }
}

export default MyComponent;

// Call MyComponent like this:
<MyComponent myAddress="0x407d73d8a49eeb85d32cf465507dd71d507100c1">
```

Or, if you don't use the "`@`" decorator syntax,

```javascript
export default light.hoc({
  myBalance: ({ myAddress }) => light.balanceOf$(myAddress)
})(MyComponent);
```

You can of course let your component subscribe to multiple RpcObservablse:

```javascript
import React from 'react';
import erc20Abi from '@parity/contracts/lib/abi/eip20';
import { filter } from 'rxjs/operators';

import light from './light';

const MyComponent = ({ blockNumber, myAddress, myGavcoinBalance }) => {
  return (
    <div>
      <p>
        The gavcoin balance of {myAddress} is{' '}
        {myGavcoinBalance.div(10 ** 6).toFormat(2)}
        GAV.
      </p>
      <p>We are at block {blockNumber.toFormat(0)}.</p>
    </div>
  );
};

export default light.hoc({
  blockNumber: light.blockNumber$,
  myGavcoinBalance: ({ myAddress }) =>
    light
      .makeContract('0x4733659a5cB7896A65c918Add6f59C5148FB5ffa', erc20Abi)
      .balanceOf$(myAddress, { withoutLoading: true })
})(MyComponent);
```

See the latest code in action: https://codesandbox.io/s/852wn25mj.
