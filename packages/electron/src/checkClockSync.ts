// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { time } from 'sntp';

export const MAX_TIME_DRIFT = 10000; // milliseconds

export const checkClockSync = async () => {
  const { t: timeDrift }: { t: number } = await time();
  return {
    isClockSync: timeDrift < MAX_TIME_DRIFT,
    timeDrift
  };
};
