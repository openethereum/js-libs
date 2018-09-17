// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { map } from 'rxjs/operators';

import { balanceOf$, withoutLoading } from '../../light.js';
import light from '../../hoc';

@light({
  balance: ownProps =>
    balanceOf$(ownProps.address).pipe(
      withoutLoading(),
      map(_ => +_)
    )
})
class BalanceOfAddress extends Component {
  render() {
    const { address, balance } = this.props;
    return (
      <p>
        Balance of <code>{address}</code>: {balance} wei.
      </p>
    );
  }
}

export default BalanceOfAddress;
