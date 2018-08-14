// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React from 'react';
import ReactDOM from 'react-dom';

import api from './api';
import App from './App';
import light, { balanceOf$, frequency } from './light.js';

light.setApi(api);
balanceOf$.setFrequency([frequency.onEvery2Seconds$]);

ReactDOM.render(<App />, document.getElementById('root'));
