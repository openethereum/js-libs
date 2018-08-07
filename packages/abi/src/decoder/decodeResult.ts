// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

class DecodeResult {
  _token: string;
  _newOffset: number;

  constructor(token: string, newOffset: number) {
    this._token = token;
    this._newOffset = newOffset;
  }

  get token() {
    return this._token;
  }

  get newOffset() {
    return this._newOffset;
  }
}

export default DecodeResult;
