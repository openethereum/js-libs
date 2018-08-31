// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import sinon from 'sinon';

import GithubHint from './githubhint';

let githubHint;
let instance;
let registry;

function create() {
  instance = {
    __id: 'testInstance',
    entries: {
      call: sinon.stub().resolves('testValue')
    }
  };
  registry = {
    getContract: sinon.stub().resolves({ instance })
  };
  githubHint = new GithubHint({}, registry);

  return githubHint;
}

describe('contracts/GithubHint', () => {
  beforeEach(() => {
    create();

    return githubHint.getInstance();
  });

  it('instantiates successfully', () => {
    expect(githubHint).to.be.ok;
  });

  it('attaches the instance on create', () => {
    expect(githubHint._instance.__id).to.equal('testInstance');
  });

  describe('interface', () => {
    describe('getEntry', () => {
      beforeEach(() => {
        return githubHint.getEntry('testId');
      });

      it('calls entries on the instance', () => {
        expect(instance.entries.call).to.have.been.calledWith({}, ['testId']);
      });
    });
  });
});
