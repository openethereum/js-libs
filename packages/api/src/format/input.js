// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

const BigNumber = require('bignumber.js');

const { isArray, isHex, isInstanceOf, isString } = require('../util/types');
const { padLeft, toHex } = require('../util/format');

function inAddress (address) {
  // TODO: address validation if we have upper-lower addresses
  return inHex(address);
}

function inAddresses (addresses) {
  return (addresses || []).map(inAddress);
}

function inBlockNumber (blockNumber) {
  if (isString(blockNumber)) {
    switch (blockNumber) {
      case 'earliest':
      case 'latest':
      case 'pending':
        return blockNumber;
    }
  }

  return inNumber16(blockNumber);
}

function inData (data) {
  if (data && data.length && !isHex(data)) {
    data = data.split('').map((chr) => {
      return `0${chr.charCodeAt(0).toString(16)}`.slice(-2);
    }).join('');
  }

  return inHex(data);
}

function inHash (hash) {
  return inHex(hash);
}

function inTopics (topics) {
  return (topics || [])
    .filter((topic) => topic === null || topic)
    .map((topic) => {
      if (topic === null) {
        return null;
      }

      if (Array.isArray(topic)) {
        return inTopics(topic);
      }

      return padLeft(topic, 32);
    });
}

function inFilter (options) {
  if (options) {
    Object.keys(options).forEach((key) => {
      switch (key) {
        case 'address':
          if (isArray(options[key])) {
            options[key] = options[key].map(inAddress);
          } else {
            options[key] = inAddress(options[key]);
          }
          break;

        case 'fromBlock':
        case 'toBlock':
          options[key] = inBlockNumber(options[key]);
          break;

        case 'limit':
          options[key] = inNumber10(options[key]);
          break;

        case 'topics':
          options[key] = inTopics(options[key]);
      }
    });
  }

  return options;
}

function inHex (str) {
  return toHex(str);
}

function inNumber10 (number) {
  if (isInstanceOf(number, BigNumber)) {
    return number.toNumber();
  }

  return (new BigNumber(number || 0)).toNumber();
}

function inNumber16 (number) {
  const bn = isInstanceOf(number, BigNumber)
    ? number
    : (new BigNumber(number || 0));

  if (!bn.isInteger()) {
    throw new Error(`[format/input::inNumber16] the given number is not an integer: ${bn.toFormat()}`);
  }

  return inHex(bn.toString(16));
}

function inOptionsCondition (condition) {
  if (condition) {
    if (condition.block) {
      condition.block = condition.block ? inNumber10(condition.block) : null;
    } else if (condition.time) {
      condition.time = inNumber10(Math.floor(condition.time.getTime() / 1000));
    }
  }

  return condition;
}

function inOptions (_options = {}) {
  const options = Object.assign({}, _options);

  Object.keys(options).forEach((key) => {
    switch (key) {
      case 'to':
        // Don't encode the `to` option if it's empty
        // (eg. contract deployments)
        if (options[key]) {
          options.to = inAddress(options[key]);
        }
        break;

      case 'from':
        options[key] = inAddress(options[key]);
        break;

      case 'condition':
        options[key] = inOptionsCondition(options[key]);
        break;

      case 'gas':
      case 'gasPrice':
        options[key] = inNumber16((new BigNumber(options[key])).round());
        break;

      case 'value':
      case 'nonce':
        options[key] = inNumber16(options[key]);
        break;

      case 'data':
        options[key] = inData(options[key]);
        break;
    }
  });

  return options;
}

function inTraceFilter (filterObject) {
  if (filterObject) {
    Object.keys(filterObject).forEach((key) => {
      switch (key) {
        case 'fromAddress':
        case 'toAddress':
          filterObject[key] = [].concat(filterObject[key])
            .map(address => inAddress(address));
          break;

        case 'toBlock':
        case 'fromBlock':
          filterObject[key] = inBlockNumber(filterObject[key]);
          break;
      }
    });
  }

  return filterObject;
}

function inTraceType (whatTrace) {
  if (isString(whatTrace)) {
    return [whatTrace];
  }

  return whatTrace;
}

function inDeriveType (derive) {
  return derive && derive.type === 'hard' ? 'hard' : 'soft';
}

function inDeriveHash (derive) {
  const hash = derive && derive.hash ? derive.hash : derive;
  const type = inDeriveType(derive);

  return {
    hash: inHex(hash),
    type
  };
}

function inDeriveIndex (derive) {
  if (!derive) {
    return [];
  }

  if (!isArray(derive)) {
    derive = [derive];
  }

  return derive.map(item => {
    const index = inNumber10(item && item.index ? item.index : item);

    return {
      index,
      type: inDeriveType(item)
    };
  });
}

module.exports = {
  inAddress,
  inAddresses,
  inBlockNumber,
  inData,
  inHash,
  inTopics,
  inFilter,
  inHex,
  inNumber10,
  inNumber16,
  inOptionsCondition,
  inOptions,
  inTraceFilter,
  inTraceType,
  inDeriveHash,
  inDeriveIndex
};
