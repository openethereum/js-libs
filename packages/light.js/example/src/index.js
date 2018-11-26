// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

import React from 'react';
import ReactDOM from 'react-dom';
import light from '@parity/light.js';

import App from './App';
import provider from './provider';

light.setProvider(provider);

ReactDOM.render(<App />, document.getElementById('root'));
