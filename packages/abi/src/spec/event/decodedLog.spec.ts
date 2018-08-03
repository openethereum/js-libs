// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import DecodedLog from './decodedLog';

const log = new DecodedLog('someParams', 'someAddress');

describe('spec/event/DecodedLog', () => {
  describe('constructor', () => {
    it('sets internal state', () => {
      expect(log.params).toEqual('someParams');
      expect(log.address).toEqual('someAddress');
    });
  });
});
