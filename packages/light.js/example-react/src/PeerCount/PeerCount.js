// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { peerCount$, withoutLoading } from '@parity/light.js';
import light from '@parity/light.js-react';

// NOTE: with the right Babel configuration (or TypeScript), 
// you can use use `light` as a decorator:
// @light({
//   peerCount: () => peerCount$().pipe(withoutLoading())
// })
class PeerCount extends Component {
  render() {
    const { peerCount } = this.props;

    return (
      <div>
        <h2>peerCount$</h2>

        <h3>Current peer count</h3>
        {+peerCount}
      </div>
    );
  }
}

PeerCount = light({
  peerCount: () => peerCount$().pipe(withoutLoading())
})(PeerCount);

export default PeerCount;
