// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

const TransportError = require('./error');

describe('transport/Error', () => {
  describe('requestRejected', () => {
    it('creates a Request Rejected error', () => {
      const error = TransportError.requestRejected('method');

      expect(error.code).to.equal(TransportError.ERROR_CODES.REQUEST_REJECTED);
      expect(error.message).to.match(/been rejected/);
      expect(error.method).to.equal('method');
    });
  });
});
