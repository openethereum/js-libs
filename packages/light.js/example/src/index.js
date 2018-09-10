// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom';
import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

import App from './App';
import Light from './light.js';
import provider, { localProvider } from './provider';

const light = new Light(provider);
const light2 = new Light(localProvider);

console.log(light);
// light.blockNumber$().subscribe(console.log);
light.blockNumber$().subscribe(a => console.log('1', a));
light2.blockNumber$().subscribe(a => console.log('2', a));

ReactDOM.render(<App />, document.getElementById('root'));
