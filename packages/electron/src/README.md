# @parity/electron

Control the Parity Ethereum client from electron.

[![Build Status](https://travis-ci.org/paritytech/js-libs.svg?branch=master)](https://travis-ci.org/paritytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@parity/electron.svg)](https://www.npmjs.com/package/@parity/electron)
[![npm](https://img.shields.io/npm/dw/@parity/electron.svg)](https://www.npmjs.com/package/@parity/electron)
[![dependencies Status](https://david-dm.org/paritytech/js-libs/status.svg?path=packages/electron)](https://david-dm.org/paritytech/js-libs?path=packages/electron)

## Description

With this library, you will be able, from Electron, to:

- download Parity Ethereum locally in Electron's user data folder.
- run/stop/check if Parity Ethereum is running.
- get a secure token from Parity Ethereum to access secure RPCs.

## Getting Started

```bash
yarn add @parity/electron
```

## Usage

```javascript
import parityElectron, { isParityRunning } from '@parity/electron';

// Optional: override default options
parityElectron({
  logger: myCustomLoggerFunction // How do we want to log @parity/electron logs? Default is `debug`
})

isParityRunning()
  .then(() => ...);
```
