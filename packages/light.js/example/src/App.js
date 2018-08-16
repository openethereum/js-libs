// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import BalanceOf from './BalanceOf';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to @parity/light.js</h1>
          </header>
          <p>Please choose one of the following RpcObservable to test.</p>
          <ul className="App-nav">
            <li>
              <Link to="/">None</Link>
            </li>
            <li>
              <Link to="/balanceOf$">balanceOf$</Link>
            </li>
            <li>
              <Link to="/syncStatus$">syncStatus$</Link>
            </li>
          </ul>
          <br />
          <p>
            <em>
              For each RpcObservable, also note the incoming/outgoing RPC
              requests actually made, inside your browser's network console.
            </em>
          </p>
          <br />

          <Switch>
            <Route component={null} exact path="/" />
            <Route component={BalanceOf} exact path="/balanceOf$" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
