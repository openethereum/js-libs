// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

class DecodedLog {
  private _address: string;
  private _params: string;

  constructor(params: string, address: string) {
    this._params = params;
    this._address = address;
  }

  get address() {
    return this._address;
  }

  get params() {
    return this._params;
  }
}

export default DecodedLog;
