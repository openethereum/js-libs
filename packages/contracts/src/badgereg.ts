// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { bytesToHex, hexToAscii } from '@parity/api/lib/util/format';

import * as ABI from './abi/certifier.json';
import { Api, Contract } from './types';
import Registry from './registry';

interface Metadata {
  address: string;
  id: number;
  name: string;
  title: string;
  icon: string;
}

const ZERO20 = '0x0000000000000000000000000000000000000000';
const ZERO32 =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export default class BadgeReg {
  private _api: Api;
  public certifiers: Metadata[] = [];
  public contracts: {
    [key: string]: Contract;
  } = {};
  private _registry: Registry;

  constructor (api: Api, registry: Registry) {
    this._api = api;
    this._registry = registry;

    registry.getContract('badgereg');
  }

  getContract () {
    return this._registry.getContract('badgereg');
  }

  certifierCount () {
    return this.getContract().then((badgeReg: Contract) => {
      return badgeReg.instance.badgeCount
        .call({}, [])
        .then((count: BigNumber) => count.valueOf());
    });
  }

  fetchCertifier (id: number) {
    if (this.certifiers[id]) {
      return Promise.resolve(this.certifiers[id]);
    }

    return this.getContract()
      .then((badgeReg: Contract) => {
        return badgeReg.instance.badge.call({}, [id]);
      })
      .then(([address, name]: [string, string]) => {
        if (address === ZERO20) {
          throw new Error(`Certifier ${id} does not exist.`);
        }

        name = bytesToHex(name);
        name = name === ZERO32 ? null : hexToAscii(name);

        return this.fetchMeta(id).then(({ title, icon }: Metadata) => {
          const data = { address, id, name, title, icon };

          this.certifiers[id] = data;
          return data;
        });
      });
  }

  fetchCertifierByName (name: string) {
    return this.getContract()
      .then((badgeReg: Contract) => {
        return badgeReg.instance.fromName.call({}, [name]);
      })
      .then(([id, address, _]: [number, string, string]) => {
        if (address === ZERO20) {
          throw new Error(`Certifier ${name} does not exist.`);
        }

        return this.fetchMeta(id).then(({ title, icon }: Metadata) => {
          const data = { address, id, name, title, icon };

          this.certifiers[id] = data;
          return data;
        });
      });
  }

  fetchMeta (id: number) {
    return this.getContract()
      .then((badgeReg: Contract) => {
        return Promise.all([
          badgeReg.instance.meta.call({}, [id, 'TITLE']),
          badgeReg.instance.meta.call({}, [id, 'IMG'])
        ]);
      })
      .then(([title, icon]: [string, string]) => {
        title = bytesToHex(title).replace(/(00)+$/, '');
        title = title === ZERO32 ? null : hexToAscii(title);

        let resultIcon: string | null = icon;

        if (bytesToHex(icon) === ZERO32) {
          resultIcon = null;
        }

        return { title, icon: resultIcon };
      });
  }

  checkIfCertified (certifier: string, address: string) {
    if (!this.contracts[certifier]) {
      this.contracts[certifier] = this._api.newContract(ABI, certifier);
    }

    const contract = this.contracts[certifier];

    return contract.instance.certified.call({}, [address]);
  }
}
