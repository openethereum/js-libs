// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import DecodedLog from './decodedLog';
import DecodedLogParam from './decodedLogParam';

const log = new DecodedLog([new DecodedLogParam('someParams')], 'someAddress');

describe('spec/event/DecodedLog', () => {
  describe('constructor', () => {
    it('sets internal state', () => {
      expect(log.params).toEqual([log]);
      expect(log.address).toEqual('someAddress');
    });
  });
});
