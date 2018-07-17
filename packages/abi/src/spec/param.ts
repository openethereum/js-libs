// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import ParamType from './paramType';
import { ParamTypeEnum } from '../types';
import { toParamType } from './paramType/format';

class Param {
  private _kind: ParamType;
  private _name: string;

  constructor(name: string, type: string) {
    this._name = name;
    this._kind = toParamType(type);
  }

  static toParams(params: (Param | { name: string; type: ParamTypeEnum })[]) {
    return params.map(param => {
      if (param instanceof Param) {
        return param;
      }

      return new Param(param.name, param.type);
    });
  }

  get name() {
    return this._name;
  }

  get kind() {
    return this._kind;
  }
}

export default Param;
