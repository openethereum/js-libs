// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import apiutil from '@parity/api/lib/util';

import { Api, ContractInstance } from './types';
import Registry from './registry';

const GHH_NAME = 'githubhint';
const GHH_SHA3 =
  '0x058740ee9a5a3fb9f1cfa10752baec87e09cc45cd7027fd54708271aca300c75';

let api: Api;
let instance: ContractInstance;
let registry: Registry;

function create() {
  instance = {
    __id: 'testInstance',
    get: {
      call: sinon.stub().resolves('testGet')
    }
  };
  api = {
    eth: {
      getCode: sinon.stub().resolves('0x123456')
    },
    parity: {
      registryAddress: sinon.stub().resolves('testRegistryAddress')
    },
    util: apiutil,
    newContract: sinon.stub().returns({ instance })
  };
  registry = new Registry(api);

  return registry;
}

describe('contracts/Registry', () => {
  beforeEach(() => {
    create();

    return registry.getInstance();
  });

  it('instantiates successfully', () => {
    expect(registry).to.be.ok;
  });

  it('retrieves the registry on create', () => {
    expect(api.parity.registryAddress).to.have.been.called;
  });

  it('attaches the instance on create', () => {
    expect(registry._instance.__id).to.equal('testInstance');
  });

  describe('interface', () => {
    describe('lookupMeta', () => {
      it('calls get on the contract', () => {
        return registry.lookupMeta(GHH_NAME, 'key').then(() => {
          expect(instance.get.call).to.have.been.calledWith({}, [
            GHH_SHA3,
            'key'
          ]);
        });
      });

      it('converts names to lowercase', () => {
        return registry.lookupMeta(GHH_NAME.toUpperCase(), 'key').then(() => {
          expect(instance.get.call).to.have.been.calledWith({}, [
            GHH_SHA3,
            'key'
          ]);
        });
      });
    });
  });
});
