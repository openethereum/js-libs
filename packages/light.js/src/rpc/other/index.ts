// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

// Note: we explicitly don't export makeContract here, as it's not a
// RpcObservable. It is imported manually in the Light class (light.js).
export * from './post';
