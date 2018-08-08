// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import TransportError from './TransportError';

describe('transport/TransportError', () => {
  describe('requestRejected', () => {
    it('creates a Request Rejected error', () => {
      const error = TransportError.requestRejected('method');

      expect(error.code).toEqual(TransportError.ERROR_CODES.REQUEST_REJECTED);
      expect(error.message).toMatch(/been rejected/);
      expect(error.method).toEqual('method');
    });
  });
});
