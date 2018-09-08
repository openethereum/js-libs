// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import getLogger, { setLogger } from './logger';

test('should correctly set logger', () => {
  const logger = () => () => {
    /* Do nothing. */
  };
  setLogger(logger);
  expect(getLogger()).toBe(logger);
});
