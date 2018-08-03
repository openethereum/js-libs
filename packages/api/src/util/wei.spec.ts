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

import { EtherDenomination } from '../types';
import { _getUnitMultiplier, fromWei, toWei } from './wei';

describe('util/wei', () => {
  /**
   * @test {_getUnitMultiplier}
   */
  describe('_getUnitMultiplier', () => {
    it('returns 10^0 for wei', () => {
      expect(_getUnitMultiplier('wei')).toEqual(Math.pow(10, 0));
    });

    it('returns 10^15 for finney', () => {
      expect(_getUnitMultiplier('finney')).toEqual(Math.pow(10, 15));
    });

    it('returns 10^18 for ether', () => {
      expect(_getUnitMultiplier('ether')).toEqual(Math.pow(10, 18));
    });

    it('throws an error on invalid units', () => {
      expect(() => _getUnitMultiplier(<EtherDenomination>'invalid')).toThrow(
        /passed to wei formatter/
      );
    });
  });

  /**
   * @test {fromWei}
   */
  describe('fromWei', () => {
    it('formats into ether when nothing specified', () => {
      expect(fromWei('1230000000000000000').toString()).toEqual('1.23');
    });

    it('formats into finney when specified', () => {
      expect(fromWei('1230000000000000000', 'finney').toString()).toEqual(
        '1230'
      );
    });
  });

  /**
   * @test {toWei}
   */
  describe('toWei', () => {
    it('formats from ether when nothing specified', () => {
      expect(toWei(1.23).toString()).toEqual('1230000000000000000');
    });

    it('formats from finney when specified', () => {
      expect(toWei(1230, 'finney').toString()).toEqual('1230000000000000000');
    });
  });
});
