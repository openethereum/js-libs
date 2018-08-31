// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as abis from './abi';
import { Api, Contract, ContractInstance } from './types';

interface QueueItem {
  resolve(...args: any[]): void;
}

const REGISTRY_V1_HASHES = [
  '0x34f7c51bbb1b1902fbdabfdf04811100f5c9f998f26dd535d2f6f977492c748e', // ropsten
  '0x64c3ee34851517a9faecd995c102b339f03e564ad6772dc43a26f993238b20ec' // homestead
];

export default class Registry {
  private _api: Api;
  private _contracts: {
    [key: string]: Contract;
  } = {};
  private _fetching = false;
  private _instance: ContractInstance = null;
  private _pendingContracts: {
    [key: string]: Promise<Contract>;
  } = {};
  private _queue: QueueItem[] = [];
  private _registryContract: Contract = null;

  constructor(api: Api) {
    this._api = api;

    this.getInstance();
  }

  getInstance() {
    if (this._instance) {
      return Promise.resolve(this._instance);
    }

    if (this._fetching) {
      return new Promise(resolve => {
        this._queue.push({ resolve });
      });
    }

    this._fetching = true;

    return this.fetchContract().then((contract: Contract) => {
      this._fetching = false;
      this._instance = contract.instance;

      this._queue.forEach(queued => {
        queued.resolve(this._instance);
      });

      this._queue = [];

      return this._instance;
    });
  }

  getContract(_name: string) {
    const name = _name.toLowerCase();

    if (this._contracts[name]) {
      return Promise.resolve(this._contracts[name]);
    }

    if (this._pendingContracts[name]) {
      return this._pendingContracts[name];
    }

    const promise = this.lookupAddress(name).then((address: string) => {
      this._contracts[name] = this._api.newContract(
        (abis as any)[name],
        address
      );
      delete this._pendingContracts[name];
      return this._contracts[name];
    });

    this._pendingContracts[name] = promise;

    return promise;
  }

  getContractInstance(_name: string) {
    return this.getContract(_name).then(
      (contract: Contract) => contract.instance
    );
  }

  fetchContract() {
    if (this._registryContract) {
      return Promise.resolve(this._registryContract);
    }

    return this._api.parity
      .registryAddress()
      .then((address: string) =>
        Promise.all([address, this._api.eth.getCode(address)])
      )
      .then(([address, code]: [string, string]) => {
        const codeHash = this._api.util.sha3(code);
        const version = REGISTRY_V1_HASHES.includes(codeHash) ? 1 : 2;
        const abi = version === 1 ? abis.registry : abis.registry2;
        const contract = this._api.newContract(abi, address);

        // Add support for previous `set` and `get` methods
        if (!contract.instance.get && contract.instance.getData) {
          contract.instance.get = contract.instance.getData;
        }

        if (contract.instance.get && !contract.instance.getData) {
          contract.instance.getData = contract.instance.get;
        }

        if (!contract.instance.set && contract.instance.setData) {
          contract.instance.set = contract.instance.setData;
        }

        if (contract.instance.set && !contract.instance.setData) {
          contract.instance.setData = contract.instance.set;
        }

        console.log(
          `registry at ${address}, code ${codeHash}, version ${version}`
        );
        this._registryContract = contract;
        return this._registryContract;
      });
  }

  _createGetParams(_name: string, key: string) {
    const name = _name.toLowerCase();
    const sha3 = this._api.util.sha3.text(name);

    return [sha3, key];
  }

  lookupAddress(name: string) {
    return this.getInstance()
      .then((instance: ContractInstance) => {
        return instance.getAddress.call({}, this._createGetParams(name, 'A'));
      })
      .then((address: string) => {
        console.log('[lookupAddress]', `${name}: ${address}`);
        return address;
      });
  }

  lookupMeta(name: string, key: string) {
    return this.getInstance().then((instance: ContractInstance) => {
      return instance.get.call({}, this._createGetParams(name, key));
    });
  }
}
