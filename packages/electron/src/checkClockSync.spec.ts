// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { checkClockSync } from './checkClockSync';

jest.mock('sntp', () => ({ time: () => Promise.resolve({ t: 1234 }) }));

it('should return the correct syncness', async done => {
  expect(await checkClockSync()).toEqual({
    isClockSync: true,
    timeDrift: 1234
  });
  done();
});
