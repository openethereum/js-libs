// Copyright 2015-2018 Parity Technologies (UK) Ltd.
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

const sinon = require('sinon');

const { isInstanceOf } = require('../util/types');

const JsonRpcBase = require('./jsonRpcBase');

const base = new JsonRpcBase();

describe('transport/JsonRpcBase', () => {
  describe('addMiddleware', () => {
    it('checks for Middleware null', (done) => {
      const base2 = new JsonRpcBase();

      base2.addMiddleware(null);
      base2._middlewareList.then((list) => {
        expect(list).toEqual([]);
        done();
      });
    });

    it('initialises Middleware added', (done) => {
      const base2 = new JsonRpcBase();

      class Middleware {
        constructor (parent) {
          expect(parent).toEqual(base2);
        }
      }

      base2.addMiddleware(Middleware);
      base2._middlewareList.then((list) => {
        expect(list.length).toEqual(1);
        expect(isInstanceOf(list[0], Middleware)).toBe.true;
        done();
      });
    });
  });

  describe('setDebug', () => {
    it('starts with disabled flag', () => {
      expect(base.isDebug).toBe.false;
    });

    it('true flag switches on', () => {
      base.setDebug(true);
      expect(base.isDebug).toBe.true;
    });

    it('false flag switches off', () => {
      base.setDebug(true);
      expect(base.isDebug).toBe.true;
      base.setDebug(false);
      expect(base.isDebug).toBe.false;
    });

    describe('logging', () => {
      beforeEach(() => {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
      });

      afterEach(() => {
        console.log.restore();
        console.error.restore();
      });

      it('does not log errors with flag off', () => {
        base.setDebug(false);
        base.log('error');
        expect(console.log).to.not.be.called;
      });

      it('does not log errors with flag off', () => {
        base.setDebug(false);
        base.error('error');
        expect(console.error).to.not.be.called;
      });

      it('does log errors with flag on', () => {
        base.setDebug(true);
        base.log('error');
        expect(console.log).toBe.called;
      });

      it('does log errors with flag on', () => {
        base.setDebug(true);
        base.error('error');
        expect(console.error).toBe.called;
      });
    });
  });
});
