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

import BigNumber from 'bignumber.js';

import { EtherDenomination } from '../types';

const UNITS = [
  'wei',
  'ada',
  'babbage',
  'shannon',
  'szabo',
  'finney',
  'ether',
  'kether',
  'mether',
  'gether',
  'tether'
];

/**
 * Returns the multiplication factor from wei to another ether denomination.
 *
 * @param unit - An ether denomiation.
 * @example
 * _getUnitMultiplier('wei'); // 1
 * _getUnitMultiplier('ether'); // 10^^18
 * @ignore
 */
export const _getUnitMultiplier = (unit: EtherDenomination) => {
  const position = UNITS.indexOf(unit.toLowerCase());

  if (position === -1) {
    throw new Error(`Unknown unit ${unit} passed to wei formatter`);
  }

  return Math.pow(10, position * 3);
};

/**
 * Convert from wei to another ether denomination.
 *
 * @param value - The value in wei.
 * @param unit - The ether denomination to convert to.
 */
export const fromWei = (
  value: string | number | BigNumber,
  unit: EtherDenomination = 'ether'
) => new BigNumber(value).dividedBy(_getUnitMultiplier(unit));

/**
 * Convert a value from an ether denomination to wei.
 *
 * @param value - The value in the ether denomination.
 * @param unit - The ether denomination to convert to.
 */
export const toWei = (
  value: string | number | BigNumber,
  unit: EtherDenomination = 'ether'
) => new BigNumber(value).multipliedBy(_getUnitMultiplier(unit));
