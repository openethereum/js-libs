// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import Balance from './Balance';
import { defaultAccount$ } from '../light.js';
import light from '../hoc';
import RepeatBalance from './RepeatBalance';
import Send from './Send';

@light({
  defaultAccount: defaultAccount$
})
class Main extends Component {
  render() {
    const { defaultAccount } = this.props;
    return defaultAccount ? (
      <div>
        <Balance address={defaultAccount} />
        <Send address={defaultAccount} />

        <RepeatBalance />
        <p>
          At any moment, type <code>window.parity.rpcOverview()</code> in the JS
          console to see the number of subscribers for each RPC Observable.
        </p>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default Main;
