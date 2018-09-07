# @parity/electron

Control the Parity client from electron.

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
