# Reactive Programming

_If you already know what Reactive Programming and Observables are, you can skip this section._

## What is Reactive Programming?

Reactive programming is a programming mindset where you deal with data streams. A data stream is simply a sequence of data (called events) ordered in time. Some simple examples of data streams include:

- clicks on a button
- make an API call (this stream only fires one event, namely the API response)
- tweets in your Twitter feed
- new blocks on the Ethereum blockchain

Reactive programming is the idea that you application is defined by a bunch of streams, and you combine those streams together to build the app's logic. For instance, making an API call on button click is managed by combining the first two streams described above: each time the button-click stream fires, we "plug in" the API-call stream.

The combination of streams is defined declaratively, which makes the code easy to read and test.

## Observables

Streams are represented by **Observables**. They emit the data once, multiple times, or periodically based on their configuration. There are also various operators on Observables to transform or filter the data they emit.

On the other side, we have **Observers**. They consume the data emitted by Observables, by subscribing to them, and imperatively doing some operations on each received value, like printing the value to the console.

In a nutshell, you define you app's logic by declaratively combining Observables, and eventually, an Observer subscribes to the resulting Observable. This Observer prints the value or updated a React component.

# RxJS

There are numerous implementations of Observables, the one we are using is RxJS 6. It is, as of today, the most popular one in the JavaScript community.

## Learn more

If you wish to learn more about React programming, please read [this excellent guide](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) by Andre Staltz.
