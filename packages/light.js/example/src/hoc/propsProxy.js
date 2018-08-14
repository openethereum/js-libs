// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Define a PropsProxy object so that each rpc$ in Hoc will change its
 * arguments only if the props it's listening to have changed.
 */
export default props => ({
  /**
   * Same as `observables[key](this.props)`, except that we do some internal
   * magic and store which props have been accessed, so that we only update
   * this `observables[key]` if the relevant props have changed.
   *
   * @param {Array<Observable} observables - The list of Observables passed to
   * the Hoc.
   * @param {String} key - The current key in `observables` which we are
   * calling.
   */
  callRpc$(observables, key) {
    this.currentRpc = key;
    return observables[key](this.props);
  },

  /**
   * The key of the current rpc$ that is being called.
   */
  currentRpc: null,

  /**
   * Mapping key->[props that are used by observables[key]].
   */
  paramsByRpc: {},

  /**
   * A proxy to be used by this.props. Everytime callRpc$ is called, we set the
   * currentRpc to the current key, and store the spied props inside
   * `paramsByRpc[currentRpc]`.
   */
  get props() {
    const that = this;
    return new Proxy(props, {
      get(target, key) {
        if (!that.paramsByRpc[that.currentRpc]) {
          that.paramsByRpc[that.currentRpc] = [];
        }
        that.paramsByRpc[that.currentRpc].push(key);
        return target[key];
      }
    });
  }
});
