// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { ChildProcess, spawn } from 'child_process';
import { chmod } from 'fs';
import { promisify } from 'util';

import { getParityPath } from './getParityPath';
import logCommand from './utils/logCommand';
import logger from './utils/logger';

interface RunParityOptions {
  flags: string[];
  onParityError: (error: Error) => void;
}

/**
 * @ignore
 */
const fsChmod = promisify(chmod);

/**
 * @ignore
 */
let parity: ChildProcess = null; // Will hold the running parity instance

/**
 * These are errors output by parity, which we should ignore (i.e. don't
 * panic). They happen when an instance of parity is already running, and
 * parity-electron tries to launch another one.
 *
 * @ignore
 */
const catchableErrors = [
  'is already in use, make sure that another instance of an Ethereum client is not running',
  'IO error: While lock file:'
];

/**
 * Spawns a child process to run Parity.
 */
export async function runParity(
  options: RunParityOptions = {
    flags: [],
    onParityError: () => {
      /* Do nothing if error. */
    }
  }
) {
  const { flags, onParityError } = {
    flags: [],
    onParityError: () => {
      /* Do nothing if error. */
    },
    ...options
  };
  const parityPath = await getParityPath();

  // Some users somehow had no +x on the parity binary after downloading
  // it. We try to set it here (no guarantee it will work, we might not
  // have rights to do it).
  try {
    await fsChmod(parityPath, '755');
  } catch (e) {
    /* Do nothing if error. */
  }

  let logLastLine = ''; // Always contains last line of the Parity logs

  // Run an instance of parity with the correct flags
  parity = spawn(parityPath, flags);
  logger()('@parity/electron:main')(logCommand(parityPath, flags));

  // Save in memory the last line of the log file, for handling error
  const callback = (data: Buffer) => {
    if (data && data.length) {
      logLastLine = data.toString();
    }
    logger()('@parity/parity')(data.toString());
  };
  parity.stdout.on('data', callback);
  parity.stderr.on('data', callback);

  parity.on('error', err => {
    onParityError(err);
  });
  parity.on('close', (exitCode, signal) => {
    if (exitCode === 0) {
      return;
    }

    // When there's already an instance of parity running, then the log
    // is logging a particular line, see below. In this case, we just
    // silently ignore our local instance, and let the 1st parity
    // instance be the main one.
    if (
      logLastLine &&
      catchableErrors.some(error => logLastLine.includes(error))
    ) {
      logger()('@parity/electron:main')(
        'Another instance of parity is running, closing local instance.'
      );
      return;
    }

    // Otherwise, if the exit code is not 0, then we show some error message
    onParityError(new Error(`Exit code ${exitCode}, with signal ${signal}.`));
  });
}

/**
 * If a Parity process has been spawned with runParity, then it kills this
 * process. However, there's no guarantee that Parity has been cleanly killed,
 * and the Promise resolves instantly.
 */
export function killParity() {
  if (parity) {
    logger()('Stopping parity.');
    parity.kill();
    parity = null;
  }
  return Promise.resolve();
}
