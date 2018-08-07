// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import DecodeResult from './decodeResult';

describe('decoder/DecodeResult', () => {
  describe('constructor', () => {
    it('sets the token of the object', () => {
      expect(new DecodeResult('token', 2).token).toEqual('token');
    });

    it('sets the newOffset of the object', () => {
      expect(new DecodeResult('baz', 4).newOffset).toEqual(4);
    });
  });
});
