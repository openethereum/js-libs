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

const EventParam = require('./eventParam');

describe('spec/event/EventParam', () => {
  describe('constructor', () => {
    it('sets the properties', () => {
      const param = new EventParam('foo', 'uint', true);

      expect(param.name).toEqual('foo');
      expect(param.kind.type).toEqual('uint');
      expect(param.indexed).toBe(true);
    });

    it('uses defaults for indexed', () => {
      expect(new EventParam('foo', 'uint').indexed).toBe(false);
    });
  });

  describe('toEventParams', () => {
    it('maps an array of params', () => {
      const params = EventParam.toEventParams([{ name: 'foo', type: 'uint' }]);

      expect(params.length).toEqual(1);
      expect(params[0].indexed).toBe(false);
      expect(params[0].name).toEqual('foo');
      expect(params[0].kind.type).toEqual('uint');
    });
  });
});
