// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import { of } from 'rxjs';

import { withOneObservable } from './';

Enzyme.configure({ adapter: new Adapter() });
const { mount } = Enzyme;

class MockComponent extends React.Component {}

describe('withOneObservable', () => {
  test('it should return a HOC', () => {
    expect(typeof withOneObservable('foo', () => of('bar'))).toBe('function');
  });

  test('it should give the wrapped component the correct props', () => {
    const EnhancedComponent = withOneObservable('foo', () => of('bar'))(
      MockComponent
    );
    const wrapper = mount(<EnhancedComponent />);
    expect(wrapper.props()).toHaveProperty('foo');
    expect(wrapper.props().foo).toBe('bar');
  });
});
