// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import axios from 'axios';

import logger from './utils/logger';

const TIMEOUT_MS = 1000;

interface IsParityRunningOptions {
  wsInterface: string;
  wsPort: number | string;
}

/**
 * Detect if another instance of parity is already running or not. To achieve
 * that, we just ping on the common hosts.
 */
export async function isParityRunning(
  options: IsParityRunningOptions = {
    wsInterface: '127.0.0.1',
    wsPort: '8546'
  }
) {
  return new Promise((resolve, reject) => {
    const { wsInterface, wsPort } = {
      wsInterface: '127.0.0.1',
      wsPort: '8546',
      ...options
    };

    /**
     * Try to ping these hosts to test if Parity is running.
     */
    const hostsToPing = [
      'http://127.0.0.1:8545',
      'http://127.0.0.1:8546',
      `http://${wsInterface}:${wsPort}`
    ];

    setTimeout(() => resolve(false), TIMEOUT_MS);

    hostsToPing.map(host =>
      axios.get(host)
        .then(_ => {
          logger()('@parity/electron:main')(
            `Another instance of parity is already running on ${host}, skip running local instance.`
          );
          resolve(true)
        })
        .catch(() => { })
    );

  })
}
