// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

const Abi = require('@parity/abi');
const Func = require('@parity/abi/lib/spec/function');

const { abiDecode } = require('./decode');
const { cleanupValue } = require('./format');
const { sha3 } = require('./sha3');

function encodeMethodCallAbi(methodAbi = {}, values = []) {
  const func = new Func(methodAbi);
  const tokens = Abi.encodeTokens(func.inputParamTypes(), values);
  const call = func.encodeCall(tokens);

  return `0x${call}`;
}

function abiEncode(methodName, inputTypes, data) {
  const result = encodeMethodCallAbi(
    {
      name: methodName || '',
      type: 'function',
      inputs: inputTypes.map(type => {
        return { type };
      })
    },
    data
  );

  return result;
}

function abiUnencode(abi, data) {
  const callsig = data.substr(2, 8);
  const op = abi.find(field => {
    return (
      field.type === 'function' &&
      abiSignature(field.name, field.inputs.map(input => input.type)).substr(
        2,
        8
      ) === callsig
    );
  });

  if (!op) {
    console.warn(`Unknown function ID: ${callsig}`);
    return null;
  }

  let argsByIndex = abiDecode(
    op.inputs.map(field => field.type),
    '0x' + data.substr(10)
  ).map((value, index) => cleanupValue(value, op.inputs[index].type));
  const argsByName = op.inputs.reduce((result, field, index) => {
    result[field.name] = argsByIndex[index];

    return result;
  }, {});

  return [op.name, argsByName, argsByIndex];
}

function abiSignature(name, inputs) {
  return sha3(`${name}(${inputs.join()})`);
}

module.exports = {
  abiEncode,
  abiSignature,
  abiUnencode,
  encodeMethodCallAbi
};
