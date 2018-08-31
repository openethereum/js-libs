// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as debug from 'debug';

import { LoggerFunction } from '../types';

let logger: LoggerFunction = debug;

export const setLogger = (_logger: LoggerFunction) => {
  logger = _logger;
};

export default () => logger;
