// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Api from '@parity/api';
import React from 'react';
import ReactDOM from 'react-dom';
import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

// import App from './App';
import light, { balanceOf$, frequency } from './light.js';
import provider, { localProvider } from './provider';

const api = new Api(localProvider);

light.setProvider(provider);
const a = balanceOf$('0x73e41c8efb30c2d18a21df05dacb8ed91d3e0bbe');
const b = balanceOf$('0x73e41c8efb30c2d18a21df05dacb8ed91d3e0bbe');
const c = balanceOf$(
  '0x73e41c8efb30c2d18a21df05dacb8ed91d3e0bbe',
  localProvider
);
const d = balanceOf$(
  '0x73e41c8efb30c2d18a21df05dacb8ed91d3e0bbe',
  localProvider
);

// a.subscribe(console.log);
c.subscribe(console.log);
d.subscribe(console.log);

console.log('a === b', a === b, 'a === c', a === c, 'c === d', c === d);

// ReactDOM.render(<App />, document.getElementById('root'));
