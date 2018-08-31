// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Api, Contract, ContractInstance } from './types';
import Registry from './registry';

export default class DappReg {
  private _api: Api;
  private _registry: Registry;

  constructor(api: Api, registry: Registry) {
    this._api = api;
    this._registry = registry;

    this.getInstance();
  }

  getContract() {
    return this._registry.getContract('dappreg');
  }

  getInstance() {
    return this.getContract().then((contract: Contract) => contract.instance);
  }

  count() {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.count.call();
    });
  }

  at(index: number) {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.at.call({}, [index]);
    });
  }

  get(id: string) {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.get.call({}, [id]);
    });
  }

  meta(id: string, key: string) {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.meta.call({}, [id, key]);
    });
  }

  getImage(id: string) {
    return this.meta(id, 'IMG');
  }

  getContent(id: string) {
    return this.meta(id, 'CONTENT');
  }

  getManifest(id: string) {
    return this.meta(id, 'MANIFEST');
  }
}
