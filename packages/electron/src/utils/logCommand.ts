// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * Given a command and its args, returns a nice string to be logged. The
 * arguments to this function are the same as the ones you would pass to spawn.
 *
 * @ignore
 */
const logCommand = (command: string, args: string[]) =>
  `Running "${command.replace(' ', '\\ ')} ${args.join(' ')}".`;

export default logCommand;
