// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Api, Contract, ContractInstance } from './types';
import Registry from './registry';

export default class GithubHint {
  private _api: Api;
  private _instance: ContractInstance = null;
  private _registry: Registry;

  constructor(api: Api, registry: Registry) {
    this._api = api;
    this._registry = registry;

    this.getInstance();
  }

  getContract() {
    return this._registry.getContract('githubhint');
  }

  getInstance() {
    if (this._instance) {
      return Promise.resolve(this._instance);
    }

    return this.getContract().then((contract: Contract) => {
      this._instance = contract.instance;
      return this._instance;
    });
  }

  getEntry(entryId: string) {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.entries.call({}, [entryId]);
    });
  }
}
