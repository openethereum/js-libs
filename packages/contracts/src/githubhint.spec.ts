// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { ContractInstance } from './types';
import GithubHint from './githubhint';
import mockApi from './utils/testHelpers';
import Registry from './registry';

let githubHint: GithubHint;
let instance: ContractInstance;
let registry: Registry;

function create () {
  instance = {
    __id: 'testInstance',
    entries: {
      call: jest.fn(() => Promise.resolve('testValue'))
    }
  };

  const api = mockApi(instance);
  registry = new Registry(api);
  registry.getContract = jest.fn(() => Promise.resolve({ instance }));

  githubHint = new GithubHint({}, registry);

  return githubHint;
}

describe('contracts/GithubHint', () => {
  beforeEach(() => {
    create();

    return githubHint.getInstance();
  });

  it('instantiates successfully', () => {
    expect(githubHint).toBeTruthy();
  });

  it('attaches the instance on create', () => {
    // @ts-ignore Access private property
    expect(githubHint._instance.__id).toEqual('testInstance');
  });

  describe('interface', () => {
    describe('getEntry', () => {
      beforeEach(() => {
        return githubHint.getEntry('testId');
      });

      it('calls entries on the instance', () => {
        expect(instance.entries.call).toHaveBeenCalledWith({}, ['testId']);
      });
    });
  });
});
