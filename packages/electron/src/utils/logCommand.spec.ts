// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import logCommand from './logCommand';

test('should correctly log a command', () => {
  expect(logCommand('foo', ['-a', '23'])).toBe('Running "foo -a 23".');
});
