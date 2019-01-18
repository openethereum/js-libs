// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { distinctUntilChanged } from 'rxjs/operators';
import { isObject } from '@parity/api/lib/util/types';

import { Block } from '../../types';

/**
 * An intelligent distinctUntilChanged().
 *
 * @ignore
 */
export const distinctValues = <T>() =>
  distinctUntilChanged<T>((x, y) => {
    // If T == Block
    if (
      x &&
      y &&
      ((x as unknown) as Block).number &&
      ((y as unknown) as Block).number
    ) {
      return ((x as unknown) as Block).number.eq(
        ((y as unknown) as Block).number
      );
    }

    // If T == BigNumber
    if (BigNumber.isBigNumber(x) && BigNumber.isBigNumber(y)) {
      return ((x as unknown) as BigNumber).eq((y as unknown) as BigNumber);
    }

    // If T == object
    if (isObject(x) && isObject(y)) {
      return JSON.stringify(x) === JSON.stringify(y); // TODO Do a deep equal instead
    }

    // Other cases
    return x === y;
  });
