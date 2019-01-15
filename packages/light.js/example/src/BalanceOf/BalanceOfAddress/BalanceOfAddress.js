// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { map } from 'rxjs/operators';
import { balanceOf$, withoutLoading } from '@parity/light.js';
import light from '@parity/light.js-react';

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
