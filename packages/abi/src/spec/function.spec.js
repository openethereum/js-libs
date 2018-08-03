// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

/* eslint-disable no-unused-expressions */

const Func = require('./function');
const Param = require('./param');
const Token = require('../token');

describe('spec/Function', () => {
  const inputsArr = [{ name: 'boolin', type: 'bool' }, { name: 'stringin', type: 'string' }];
  const outputsArr = [{ name: 'output', type: 'uint' }];

  const uint = new Param('output', 'uint');
  const bool = new Param('boolin', 'bool');
  const string = new Param('stringin', 'string');
  const inputs = [bool, string];
  const outputs = [uint];

  const func = new Func({
    name: 'test',
    inputs: inputsArr,
    outputs: outputsArr
  });

  describe('constructor', () => {
    it('returns signature correctly if name already contains it', () => {
      const func = new Func({
        name: 'test(bool,string)',
        inputs: inputsArr,
        outputs: outputsArr
      });

      expect(func.name).toEqual('test');
      expect(func.id).toEqual('test(bool,string)');
      expect(func.signature).toEqual('02356205');
    });

    it('stores the parameters as received', () => {
      expect(func.name).toEqual('test');
      expect(func.constant).toBe.false;
      expect(func.inputs).to.deep.equal(inputs);
      expect(func.outputs).to.deep.equal(outputs);
    });

    it('matches empty inputs with []', () => {
      expect(new Func({ name: 'test', outputs: outputsArr }).inputs).to.deep.equal([]);
    });

    it('matches empty outputs with []', () => {
      expect(new Func({ name: 'test', inputs: inputsArr }).outputs).to.deep.equal([]);
    });

    it('sets the method signature', () => {
      expect(new Func({ name: 'baz' }).signature).toEqual('a7916fac');
    });

    it('allows constant functions', () => {
      expect(new Func({ name: 'baz', constant: true }).constant).toBe.true;
    });
  });

  describe('getters', () => {
    const abi = {
      name: 'test(bool,string)',
      inputs: inputsArr,
      outputs: outputsArr
    };
    const func = new Func(abi);

    it('returns the abi', () => {
      expect(func.abi).to.deep.equal(abi);
    });

    it('returns the constant flag', () => {
      expect(func.constant).toBe.false;
    });

    it('returns the id', () => {
      expect(func.id).toEqual('test(bool,string)');
    });

    it('returns the inputs', () => {
      expect(func.inputs).to.deep.equal(Param.toParams(inputsArr));
    });

    it('returns the outputs', () => {
      expect(func.outputs).to.deep.equal(Param.toParams(outputsArr));
    });

    it('returns the payable flag', () => {
      expect(func.payable).toBe.false;
    });
  });

  describe('inputParamTypes', () => {
    it('retrieves the input types as received', () => {
      expect(func.inputParamTypes()).to.deep.equal([bool.kind, string.kind]);
    });
  });

  describe('outputParamTypes', () => {
    it('retrieves the output types as received', () => {
      expect(func.outputParamTypes()).to.deep.equal([uint.kind]);
    });
  });

  describe('decodeInput', () => {
    it('decodes the inputs correctly', () => {
      expect(func.decodeInput('0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066a61636f67720000000000000000000000000000000000000000000000000000')).to.deep.equal([
        {
          _type: 'bool',
          _value: true
        },
        {
          _type: 'string',
          _value: 'jacogr'
        }
      ]);
    });
  });

  describe('decodeOutput', () => {
    it('decodes the result correctly', () => {
      const result = func.decodeOutput('1111111111111111111111111111111111111111111111111111111111111111');

      expect(result[0].value.toString(16)).toEqual('1111111111111111111111111111111111111111111111111111111111111111');
    });
  });

  describe('encodeCall', () => {
    it('encodes the call correctly', () => {
      const result = func.encodeCall([new Token('bool', true), new Token('string', 'jacogr')]);

      expect(result).toEqual('023562050000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066a61636f67720000000000000000000000000000000000000000000000000000');
    });
  });
});
