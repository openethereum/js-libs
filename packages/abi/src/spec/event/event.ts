// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

const Decoder = require('../../decoder/decoder');
const DecodedLog = require('./decodedLog');
const DecodedLogParam = require('./decodedLogParam');
const EventParam = require('./eventParam');
const { asAddress } = require('../../util/sliceAs');
const { eventSignature } = require('../../util/signature');

class Event {
  private _anonymous: boolean;
  private _id: string;
  private _inputs: any;
  private _name: string;
  private _signature: string;

  constructor(abi) {
    this._inputs = EventParam.toEventParams(abi.inputs || []);
    this._anonymous = !!abi.anonymous;

    const { id, name, signature } = eventSignature(
      abi.name,
      this.inputParamTypes()
    );

    this._id = id;
    this._name = name;
    this._signature = signature;
  }

  get anonymous() {
    return this._anonymous;
  }

  get id() {
    return this._id;
  }

  get inputs() {
    return this._inputs;
  }

  get name() {
    return this._name;
  }

  get signature() {
    return this._signature;
  }

  inputParamTypes() {
    return this._inputs.map(input => input.kind);
  }

  inputParamNames() {
    return this._inputs.map(input => input.name);
  }

  indexedParams(indexed) {
    return this._inputs.filter(input => input.indexed === indexed);
  }

  decodeLog(topics, data) {
    const topicParams = this.indexedParams(true);
    const dataParams = this.indexedParams(false);

    let address;
    let toSkip;

    if (!this.anonymous) {
      address = asAddress(topics[0]);
      toSkip = 1;
    } else {
      toSkip = 0;
    }

    const topicTypes = topicParams.map(param => param.kind);
    const flatTopics = topics
      .filter((topic, index) => index >= toSkip)
      .map(topic => {
        return topic.substr(0, 2) === '0x' ? topic.substr(2) : topic;
      })
      .join('');
    const topicTokens = Decoder.decode(topicTypes, flatTopics);

    if (topicTokens.length !== topics.length - toSkip) {
      throw new Error('Invalid topic data');
    }

    const dataTypes = dataParams.map(param => param.kind);
    const dataTokens = Decoder.decode(dataTypes, data);

    const namedTokens = {};

    topicParams.forEach((param, index) => {
      namedTokens[param.name || index] = topicTokens[index];
    });
    dataParams.forEach((param, index) => {
      namedTokens[param.name || index] = dataTokens[index];
    });

    const inputParamTypes = this.inputParamTypes();
    const decodedParams = this.inputParamNames().map(
      (name, index) =>
        new DecodedLogParam(
          name,
          inputParamTypes[index],
          namedTokens[name || index]
        )
    );

    return new DecodedLog(decodedParams, address);
  }
}

export default Event;
