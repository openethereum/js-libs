// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { map } from 'rxjs/operators';

import light from '../../hoc';
import { balanceOf$, chainName$, height$, me$ } from '../../light.js';
import './RepeatBalance.css';

const FIXED_ADDRESS = '0x00Ae02834e91810B223E54ce3f9B7875258a1747';

@light({
  balanceOf: () =>
    balanceOf$(FIXED_ADDRESS, { withoutLoading: true }).pipe(map(_ => +_)),
  chainName: chainName$,
  height: height$,
  me: me$
})
class RepeatBalance extends Component {
  render() {
    const { balanceOf, chainName, height, me } = this.props;
    return (
      <div className="RepeatBalance-container">
        <h3>This is RepeatBalance component.</h3>
        <p>
          It shows some same info as Balance component.<br />It's to show that
          even though the Observables have more subscribers, the underlying api
          calls are not duplicated, unless necessary.<br />
        </p>
        <p>
          Chain: {chainName}. Block: {height}. My Account: {me}.
        </p>
        <p>
          Balance of fixed address <code>{FIXED_ADDRESS}</code>:{' '}
          <strong>{balanceOf}wei</strong>.<br />(notice the number of{' '}
          <code>eth_getBalance</code> calls)
        </p>
      </div>
    );
  }
}

export default RepeatBalance;
