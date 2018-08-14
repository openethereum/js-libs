// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs';

/**
 * @ignore
 * @param {Any} source$ - The Observable to test.
 * @return {Boolean} - Returns true if it's an Observable.
 */
const isObservable = (source$: Observable<any>): source$ is Observable<any> =>
  source$ instanceof Observable;

export default isObservable;
