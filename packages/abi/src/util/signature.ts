// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { keccak_256 } from 'js-sha3';

import { fromParamType } from '../spec/paramType/format';
import { Param } from '../types';

/**
 * Get event signature.
 */
export const eventSignature = (eventName: string, params: Param[]) => {
  const { strName, name } = parseName(eventName);
  const types = (params || []).map(fromParamType).join(',');
  const id = `${strName}(${types})`;
  const signature = strName ? keccak_256(id) : '';

  return { id, name, signature };
};

/**
 * Get method signature.
 *
 * @param methodName - The method name.
 * @param params - The list of params
 */
export const methodSignature = (methodName: string, params: Param[]) => {
  const { id, name, signature } = eventSignature(methodName, params);

  return { id, name, signature: signature.substr(0, 8) };
};

/**
 * Parse name.
 *
 * @param name - Name to parse.
 */
export const parseName = (name: string) => {
  const strName = `${name || ''}`;
  const index = strName.indexOf('(');

  if (index === -1) {
    return { strName, name };
  }

  const trimmedName = strName.slice(0, index);

  return {
    strName: trimmedName,
    name: trimmedName
  };
};
