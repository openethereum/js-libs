// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import * as EventEmitter from 'eventemitter3';
import { of } from 'rxjs';
import Light from '@parity/light.js';
import { toClass } from 'recompose';

import addHocToLight, { hoc, withOneObservable } from './';

Enzyme.configure({ adapter: new Adapter() });
const { mount } = Enzyme;

const MockComponent = toClass(props => <div>{JSON.stringify(props)}</div>);
const mockRpc$ = () => of('bar');
class MockProvider extends EventEmitter {
  send() {
    return Promise.resolve('foo');
  }
}

describe('withOneObservable', () => {
  test('it should return a HOC', () => {
    expect(typeof withOneObservable('foo', () => of('bar'))).toBe('function');
  });

  test('it should give the wrapped component the correct props', () => {
    const EnhancedComponent = withOneObservable('foo', mockRpc$)(MockComponent);
    const wrapper = mount(<EnhancedComponent />);
    const div = wrapper.find('div');
    expect(div.text()).toEqual(JSON.stringify({ foo: 'bar' }));
  });
});

describe('hoc', () => {
  test('it should return a HOC', () => {
    expect(
      typeof hoc({
        foo: mockRpc$
      })
    ).toBe('function');
  });

  test('it should give the wrapped component the correct props', () => {
    const EnhancedComponent = hoc({ foo: mockRpc$, baz: mockRpc$ })(
      MockComponent
    );
    const wrapper = mount(<EnhancedComponent />);
    const div = wrapper.find('div');
    expect(div.text()).toEqual(JSON.stringify({ foo: 'bar', baz: 'bar' }));
  });
});

describe('addHocToLight', () => {
  test('it should add a field on light', () => {
    const light = addHocToLight(new Light(new MockProvider()));
    expect(light.hoc).toBeTruthy();
  });
});
