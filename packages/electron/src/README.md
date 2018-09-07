# @parity/electron

Control the Parity Ethereum client from electron.

With this libray, you will be able, from Electron, to:

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
