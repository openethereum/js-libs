// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import { peerCount$ } from '../light.js/index.js';
import light from '../hoc';

@light({
  peerCount: () => peerCount$({ withoutLoading: true })
})
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

export default PeerCount;
