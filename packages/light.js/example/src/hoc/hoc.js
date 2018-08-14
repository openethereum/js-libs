// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';

import isObservable from '../light.js/utils/isObservable';
import propsProxy from './propsProxy';

const hoc = observables => InnerComponent =>
  class extends Component {
    propsProxy = propsProxy(this.props);

    state = {};

    subscriptions = {}; // All Observable subscriptions

    componentDidMount() {
      Object.keys(observables).forEach(key => {
        if (typeof observables[key] !== 'function') {
          throw new Error(
            `Object with key '${key}' should be a function returning an Observable.`
          );
        }

        const obs$ = this.propsProxy.callRpc$(observables, key); // Equivalent of const obs$ = observables[key](this.props), but via the proxy
        if (!isObservable(obs$)) {
          throw new Error(
            `Object with key '${key}' should be a function returning an Observable.`
          );
        }

        // Subscribe to the observable
        this.subscriptions[key] = obs$.subscribe(value => {
          this.setState({ [key]: value });
        });
      });
    }

    componentDidUpdate(prevProps) {
      // Let's imagine we decorate our component as:
      // @light({
      //   balance: ownProps => balanceOf$(ownProps.publicAddress),
      //   syncing: syncing$
      // })
      // On componentDidUpdate (e.g. when `publicAddress` changes), we
      // want to:
      // - keep our subscription to syncing$
      // - drop our old subscription to balanceOf$(oldProps.publicAddress)
      // - create a new subscription to balanceOf$(newProps.publicAddress)
      // - do nothing if another prop than publicAddress has changed
      Object.keys(observables)
        .filter(key => !observables[key].metadata) // Don't touch subscriptions to observables that are defined without ownProps => obs$(ownProps)
        .filter(key => this.propsProxy.paramsByRpc[key]) // Filter out observables that don't use props
        .filter(
          key =>
            // Filter out the observables who aren't related to the props that have changed
            this.propsProxy.paramsByRpc[key].findIndex(
              prop => this.props[prop] !== prevProps[prop]
            ) >= 0
        )
        .forEach(key => {
          this.subscriptions[key].unsubscribe();
          const obs$ = observables[key](this.props);
          this.subscriptions[key] = obs$.subscribe(value => {
            this.setState({ [key]: value });
          });
        });
    }

    componentWillUnmount() {
      Object.values(this.subscriptions).forEach(subscription => {
        subscription.unsubscribe();
      });
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  };

export default hoc;
