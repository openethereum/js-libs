// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as debug from 'debug';
import { LoggerFunction } from './types';
import { setLogger } from './utils/logger';

export * from './checkClockSync';
export * from './getParityPath';
export * from './fetchParity';
export * from './isParityRunning';
export * from './runParity';
export * from './signerNewToken';

interface ParityElectronOptions {
  logger?: LoggerFunction;
}

/**
 * Set default options for @parity/electron. Can be skipped if we don't want to
 * override default options.
 */
function parityElectron(options: ParityElectronOptions = { logger: debug }) {
  if (options.logger) {
    setLogger(options.logger);
  }
}

export default parityElectron;
