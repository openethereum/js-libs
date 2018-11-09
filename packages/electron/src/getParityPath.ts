// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { app } from 'electron';
import commandExists from 'command-exists';
import { stat } from 'fs';
import * as promiseAny from 'promise-any';
import { promisify } from 'util';

import logger from './utils/logger';

/**
 * @ignore
 */
const fsStat = promisify(stat);

/**
 * The default path to install Parity Ethereum, in case there's no other instance found
 * on the machine.
 */
export function defaultParityPath() {
  return Promise.resolve(
    `${app.getPath('userData')}/parity${
      process.platform === 'win32' ? '.exe' : ''
    }`
  );
}

/**
 * The real Parity Ethereum path, will be populated after doesParityExist Promise resolves.
 *
 * @ignore
 */
let parityPath: string;

/**
 * Test if `parity` command is in $PATH.
 *
 * @ignore
 */
const isParityInPath = async () => {
  const parityCommandExists = await commandExists('parity');
  if (parityCommandExists) {
    // If yes, return `parity` as command to launch parity
    return 'parity';
  }
};

/**
 * Test if Parity Ethereum is in the common OS locations.
 *
 * @ignore
 */
const isParityInOs = async (): Promise<string> => {
  // OS locations to test if `parity` binary exists
  const locations: {
    [key: string]: string[];
  } = {
    linux: ['/bin/parity', '/usr/bin/parity', '/usr/local/bin/parity'],
    darwin: ['/Applications/Parity Ethereum.app/Contents/MacOS/parity'],
    win32: ['C:\\Program Files\\Parity Technologies\\Parity\\parity.exe']
  };
  return promiseAny(
    locations[process.platform].map(location =>
      fsStat(location).then(() => location)
    )
  );
};

/**
 * Test if Parity Ethereum is already downloaded in Electron app's userData folder.
 *
 * @ignore
 */
const isParityInUserData = async () => {
  const parityPath = await defaultParityPath();
  await fsStat(parityPath);
  return parityPath;
};

/**
 * This function checks if Parity Ethereum has been installed on the local machine:
 * - first check if the program is in $PATH, using `command-exists`
 * - then check the OS default installation dir if a Parity Ethereum folder exists
 * - finally check Fether's own userData folder
 * This function should run in node env.
 *
 * @ignore
 * @return Promise<string> - Resolves to a string which is the command to run Parity Ethereum.
 */
const doesParityExist = () =>
  isParityInPath()
    .catch(isParityInOs)
    .catch(isParityInUserData)
    .catch(_ => {
      throw new Error('Parity Ethereum not found.');
    });

/**
 * Returns the path to Parity Ethereum, or throws if Parity Ethereum is not found.
 */
export async function getParityPath() {
  if (parityPath) {
    return parityPath;
  }
  try {
    const path = await doesParityExist();
    parityPath = path; // Save the final result in module variable
    logger()('@parity/electron:main')(
      `Parity Ethereum found on machine, can be run with "${path}".`
    );
    return path;
  } catch (err) {
    logger()('@parity/electron:main')(`Parity Ethereum not found on machine.`);
    throw err;
  }
}
