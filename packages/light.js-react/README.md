# @parity/light.js-hoc

A HOC to easily use [@parity/light.js](https://github.com/paritytech/js-libs/packages/light.js) with React.

[![Build Status](https://travis-ci.org/paritytech/js-libs.svg?branch=master)](https://travis-ci.org/paritytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@parity/light.js-react.svg)](https://www.npmjs.com/package/@parity/light.js-react)
[![dependencies Status](https://david-dm.org/paritytech/js-libs/status.svg?path=packages/light.js-react)](https://david-dm.org/paritytech/js-libs?path=packages/light.js-react)

## Usage

The libray provides a higher-order component (HOC) to use `@parity/light.js`'s Observables easily with React apps.

```javascript
import light from '@parity/light.js-react';
import { myBalance$, syncStatus$ } from '@parity/light.js';

@light({
  myBalance: myBalance$, // myBalance will be a BigNumber
  mySyncVariable: syncStatus$
})
class MyClass extends React.Component {
  render() {
    return (
      <div>
        My balance is {this.props.myBalance.toFormat()}.<br />
        The sync status is {JSON.stringify(this.props.mySyncVariable)}.
      </div>
    );
  }
}
```

The UI will automatically update when the sync status changes.
