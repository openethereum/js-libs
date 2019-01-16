// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Api } from './types';
import DappReg from './dappreg';
import Registry from './registry';
import SignatureReg from './signaturereg';
import TokenReg from './tokenreg';
import GithubHint from './githubhint';
import BadgeReg from './badgereg';

let instance: Contracts | undefined;

export default class Contracts {
  private _api: Api;
  private _badgeReg: BadgeReg;
  private _dappreg: DappReg;
  private _githubhint: GithubHint;
  private _registry: Registry;
  private _signaturereg: SignatureReg;
  private _tokenreg: TokenReg;

  constructor (api: Api) {
    instance = this;

    this._api = api;
    this._registry = new Registry(api);
    this._dappreg = new DappReg(api, this._registry);
    this._signaturereg = new SignatureReg(api, this._registry);
    this._tokenreg = new TokenReg(api, this._registry);
    this._githubhint = new GithubHint(api, this._registry);
    this._badgeReg = new BadgeReg(api, this._registry);
  }

  get registry () {
    return this._registry;
  }

  get badgeReg () {
    return this._badgeReg;
  }

  get dappReg () {
    return this._dappreg;
  }

  get signatureReg () {
    return this._signaturereg;
  }

  get tokenReg () {
    return this._tokenreg;
  }

  get githubHint () {
    return this._githubhint;
  }

  static get (api: Api) {
    if (!instance) {
      instance = new Contracts(api);
    }

    return instance;
  }
}
