// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
import React, { Component } from 'react';

import logo from './logo.svg';
import Main from './Main';
import './App.css';

class App extends Component {
  state = {
    visible: true
  };

  handleToggleVisible = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />
        <button onClick={this.handleToggleVisible}>
          Show/Hide everything (notice the subscribes/unsubscribes)
        </button>
        <br />
        <br />
        {visible && <Main />}
      </div>
    );
  }
}

export default App;
