// https://hackernoon.com/import-json-into-typescript-8d465beded79
declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@parity/abi';
declare module '@parity/api/lib/util';
declare module '@parity/api/lib/util/format';
