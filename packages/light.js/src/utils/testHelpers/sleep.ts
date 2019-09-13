// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

// TODO Use fake timers instead
export default (duration: number) =>
  new Promise(resolve => {
    setTimeout(resolve, duration);
  });
