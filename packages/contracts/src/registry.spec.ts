// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Api, ContractInstance } from './types';
import mockApi from './utils/testHelpers';
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
      call: jest.fn(() => Promise.resolve('testGet'))
    }
  };
  api = mockApi(instance);
  registry = new Registry(api);

  return registry;
}

describe('contracts/Registry', () => {
  beforeEach(() => {
    create();

    return registry.getInstance();
  });

  it('instantiates successfully', () => {
    expect(registry).toBeTruthy();
  });

  it('retrieves the registry on create', () => {
    expect(api.parity.registryAddress).toHaveBeenCalled();
  });

  it('attaches the instance on create', () => {
    // @ts-ignore Access private property
    expect(registry._instance.__id).toEqual('testInstance');
  });

  describe('interface', () => {
    describe('lookupMeta', () => {
      it('calls get on the contract', () => {
        return registry.lookupMeta(GHH_NAME, 'key').then(() => {
          expect(instance.get.call).toHaveBeenCalledWith({}, [GHH_SHA3, 'key']);
        });
      });

      it('converts names to lowercase', () => {
        return registry.lookupMeta(GHH_NAME.toUpperCase(), 'key').then(() => {
          expect(instance.get.call).toHaveBeenCalledWith({}, [GHH_SHA3, 'key']);
        });
      });
    });
  });
});
