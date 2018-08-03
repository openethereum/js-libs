// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import ParamType from '../paramType';
import { ParamTypeEnum } from '../../types';
import { toParamType } from '../paramType/format';

class EventParam {
  private _indexed: boolean;
  private _kind: ParamType;
  private _name: string;

  static toEventParams(params: ParamType[]) {
    return params.map(
      param => new EventParam(param.name, param.type, param.indexed)
    );
  }

  constructor(name: string, type: ParamTypeEnum, indexed = false) {
    this._name = name;
    this._indexed = indexed;
    this._kind = toParamType(type, indexed);
  }

  get name() {
    return this._name;
  }

  get kind() {
    return this._kind;
  }

  get indexed() {
    return this._indexed;
  }
}

export default EventParam;
