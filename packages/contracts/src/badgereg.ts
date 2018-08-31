// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { bytesToHex, hexToAscii } from '@parity/api/lib/util/format';

import ABI from './abi/certifier.json';
import { Api } from './types';
import Registry from './registry';

const ZERO20 = '0x0000000000000000000000000000000000000000';
const ZERO32 =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export default class BadgeReg {
  private _api: Api;
  private _registry: Registry;

  constructor(api: Api, registry: Registry) {
    this._api = api;
    this._registry = registry;

    registry.getContract('badgereg');
    this.certifiers = []; // by id
    this.contracts = {}; // by name
  }

  getContract() {
    return this._registry.getContract('badgereg');
  }

  certifierCount() {
    return this.getContract().then(badgeReg => {
      return badgeReg.instance.badgeCount
        .call({}, [])
        .then(count => count.valueOf());
    });
  }

  fetchCertifier(id) {
    if (this.certifiers[id]) {
      return Promise.resolve(this.certifiers[id]);
    }

    return this.getContract()
      .then(badgeReg => {
        return badgeReg.instance.badge.call({}, [id]);
      })
      .then(([address, name]) => {
        if (address === ZERO20) {
          throw new Error(`Certifier ${id} does not exist.`);
        }

        name = bytesToHex(name);
        name = name === ZERO32 ? null : hexToAscii(name);

        return this.fetchMeta(id).then(({ title, icon }) => {
          const data = { address, id, name, title, icon };

          this.certifiers[id] = data;
          return data;
        });
      });
  }

  fetchCertifierByName(name) {
    return this.getContract()
      .then(badgeReg => {
        return badgeReg.instance.fromName.call({}, [name]);
      })
      .then(([id, address, owner]) => {
        if (address === ZERO20) {
          throw new Error(`Certifier ${name} does not exist.`);
        }

        return this.fetchMeta(id).then(({ title, icon }) => {
          const data = { address, id, name, title, icon };

          this.certifiers[id] = data;
          return data;
        });
      });
  }

  fetchMeta(id) {
    return this.getContract()
      .then(badgeReg => {
        return Promise.all([
          badgeReg.instance.meta.call({}, [id, 'TITLE']),
          badgeReg.instance.meta.call({}, [id, 'IMG'])
        ]);
      })
      .then(([title, icon]) => {
        title = bytesToHex(title).replace(/(00)+$/, '');
        title = title === ZERO32 ? null : hexToAscii(title);

        if (bytesToHex(icon) === ZERO32) {
          icon = null;
        }

        return { title, icon };
      });
  }

  checkIfCertified(certifier, address) {
    if (!this.contracts[certifier]) {
      this.contracts[certifier] = this._api.newContract(ABI, certifier);
    }

    const contract = this.contracts[certifier];

    return contract.instance.certified.call({}, [address]);
  }
}
