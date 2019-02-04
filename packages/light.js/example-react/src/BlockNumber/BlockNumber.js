// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { blockNumber$ } from '@parity/light.js';
import light from '@parity/light.js-react';

// NOTE: with the right Babel configuration (or TypeScript), 
// you can use use `light` as a decorator:
// @light({
//   blockNumber: blockNumber$
// })
class BlockNumber extends Component {
  render() {
    const { blockNumber } = this.props;

    return (
      <div>
        <h2>blockNumber$</h2>

        <h3>Current block number</h3>
        {+blockNumber}
      </div>
    );
  }
}

BlockNumber = light({
  blockNumber: blockNumber$
})(BlockNumber);

export default BlockNumber;
