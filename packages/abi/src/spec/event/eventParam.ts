// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Param from '../param';
import ParamType from '../paramType';
import { TokenTypeEnum } from '../../types';
import { toParamType } from '../paramType/format';

interface SimplifiedParam {
  indexed?: boolean;
  name: string;
  type: TokenTypeEnum;
}

class EventParam {
  private _indexed: boolean;
  private _kind: ParamType;
  private _name: string;

  static toEventParams(params: (Param | SimplifiedParam)[]) {
    return params.map(
      param =>
        new EventParam(
          param.name,
          (param as Param).kind
            ? (param as Param).kind.type
            : (param as SimplifiedParam).type,
          (param as SimplifiedParam).indexed
        )
    );
  }

  constructor(name: string, type: TokenTypeEnum, indexed = false) {
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
