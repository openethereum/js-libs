// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { distinctUntilChanged } from 'rxjs/operators';
import { isObject } from '@parity/api/lib/util/types';

/**
 * An intelligent distinctUntilChanged()
 *
 * @ignore
 */
export const distinctValues = <T>() =>
  distinctUntilChanged<T>((x, y) => {
    if (x instanceof BigNumber && y instanceof BigNumber) {
      return x.eq(y);
    }
    if (isObject(x) && isObject(y)) {
      return JSON.stringify(x) === JSON.stringify(y); // TODO Do a deep equal instead
    }
    return x === y;
  });
