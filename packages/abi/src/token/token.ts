// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { ParamTypeEnum, Value } from '../types';
import TYPES from '../spec/paramType/types';

class Token {
  private _type: ParamTypeEnum;
  private _value: Value;

  constructor(type: ParamTypeEnum, value: Value) {
    Token.validateType(type);

    this._type = type;
    this._value = value;
  }

  static validateType(type: ParamTypeEnum) {
    if (TYPES.some(_type => type === _type)) {
      return true;
    }

    throw new Error(`Invalid type ${type} received for Token`);
  }

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
  }
}

export default Token;
