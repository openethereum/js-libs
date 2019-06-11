// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import { of } from 'rxjs';
import { toClass } from 'recompose';

import light, { withOneObservable } from './';

Enzyme.configure({ adapter: new Adapter() });
const { mount } = Enzyme;

const MockComponent = toClass(props => <div>{JSON.stringify(props)}</div>) as any;
const mockRpc$ = () => of('bar');

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

describe('light', () => {
  test('it should return a HOC', () => {
    expect(
      typeof light({
        foo: mockRpc$
      })
    ).toBe('function');
  });

  test('it should give the wrapped component the correct props', () => {
    const EnhancedComponent = light({ foo: mockRpc$, baz: mockRpc$ })(
      MockComponent
    );
    const wrapper = mount(<EnhancedComponent />);
    const div = wrapper.find('div');
    expect(div.text()).toEqual(JSON.stringify({ foo: 'bar', baz: 'bar' }));
  });
});
