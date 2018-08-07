// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Decoder from '../decoder/decoder';
import Encoder from '../encoder/encoder';
import Param from './param';
import { methodSignature } from '../util/signature';

class Func {
  constructor(abi) {
    this._abi = abi;
    this._constant = !!abi.constant;
    this._payable = abi.payable;
    this._inputs = Param.toParams(abi.inputs || []);
    this._outputs = Param.toParams(abi.outputs || []);

    const { id, name, signature } = methodSignature(
      abi.name,
      this.inputParamTypes()
    );

    this._id = id;
    this._name = name;
    this._signature = signature;
  }

  get abi() {
    return this._abi;
  }

  get constant() {
    return this._constant;
  }

  get id() {
    return this._id;
  }

  get inputs() {
    return this._inputs;
  }

  get name() {
    return this._name;
  }

  get outputs() {
    return this._outputs;
  }

  get payable() {
    return !!this._payable;
  }

  get signature() {
    return this._signature;
  }

  decodeInput(data) {
    return Decoder.decode(this.inputParamTypes(), data);
  }

  decodeOutput(data) {
    return Decoder.decode(this.outputParamTypes(), data);
  }

  encodeCall(tokens) {
    return `${this._signature}${Encoder.encode(tokens)}`;
  }

  inputParamTypes() {
    return this._inputs.map(input => input.kind);
  }

  outputParamTypes() {
    return this._outputs.map(output => output.kind);
  }
}

module.exports = Func;
