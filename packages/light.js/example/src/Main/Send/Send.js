// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import TxProgress from './TxProgress';

class Send extends Component {
  state = {
    tx: null
  };

  handleSend = () => {
    this.setState({
      tx: {
        from: this.props.address,
        to: this.props.address,
        value: '0x2386f26fc10000' // 0.01ETH
      }
    });
  };

  render() {
    const { tx } = this.state;
    return (
      <div>
        <h3>This is the Send component</h3>
        <button onClick={this.handleSend}>Send 0.01ETH to myself</button>
        {tx && <TxProgress tx={tx} />}
      </div>
    );
  }
}

export default Send;
