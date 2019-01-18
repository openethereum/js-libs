// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { spawn } from 'child_process';

import { getParityPath } from './getParityPath';
import logCommand from './utils/logCommand';
import logger from './utils/logger';

/**
 * Runs parity signer new-token and resolves with a new secure token to be
 * used in a dapp. Rejects if no token could be extracted.
 */
export function signerNewToken (): Promise<string> {
  return new Promise(async (resolve, reject) => {
    logger()('@parity/electron:main')('Requesting new token.');

    const parityPath = await getParityPath();

    // Generate a new token
    const paritySigner = spawn(parityPath, ['signer', 'new-token']);
    logger()('@parity/electron:main')(
      logCommand(parityPath, ['signer', 'new-token'])
    );

    // Listen to the output of the previous command
    paritySigner.stdout.on('data', data => {
      // If the output line is xxxx-xxxx-xxxx-xxxx, then it's our token
      const match = data
        .toString()
        .match(
          /[a-zA-Z0-9]{4}(-)?[a-zA-Z0-9]{4}(-)?[a-zA-Z0-9]{4}(-)?[a-zA-Z0-9]{4}/
        );

      if (match) {
        const token = match[0];
        paritySigner.kill(); // We don't need the signer anymore
        logger()('@parity/electron:main')('Successfully extracted token.');
        resolve(token);
      }
    });

    // If after 2s we still didn't find the token, consider it failed.
    setTimeout(() => {
      reject(new Error('Error extracting token.'));
    }, 2000);
  });
}
