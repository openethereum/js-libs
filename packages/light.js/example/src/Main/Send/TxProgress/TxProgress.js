// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import light from '../../../hoc';
import { post$ } from '../../../light.js';

@light({
  txProgress: ownProps => post$(ownProps.tx)
})
class TxProgress extends Component {
  render() {
    const { txProgress } = this.props;
    return <p>Tx progress: {JSON.stringify(txProgress)}</p>;
  }
}

export default TxProgress;
