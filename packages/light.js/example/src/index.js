// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom';
import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
