// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { LoggerFunction } from './types';
import { setLogger } from './utils/logger';

export * from './checkClockSync';
export * from './getParityPath';
export * from './fetchParity';
export * from './isParityRunning';
export * from './runParity';
export * from './signerNewToken';

/**
 * Set default options for @parity/electron.
 */
export default (opts: { logger?: LoggerFunction }) => {
  if (opts.logger) {
    setLogger(opts.logger);
  }
};
