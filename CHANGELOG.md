# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.8](https://github.com/paritytech/js-libs/compare/v5.1.7...v5.1.8) (2019-07-11)

**Note:** Version bump only for package js-libs





## [5.1.7](https://github.com/paritytech/js-libs/compare/v5.1.6...v5.1.7) (2019-06-25)

**Note:** Version bump only for package js-libs





## [5.1.6](https://github.com/paritytech/js-libs/compare/v5.1.5...v5.1.6) (2019-06-11)

**Note:** Version bump only for package js-libs





## [5.1.5](https://github.com/paritytech/js-libs/compare/v5.1.4...v5.1.5) (2019-05-31)

**Note:** Version bump only for package js-libs





## [5.1.4](https://github.com/paritytech/js-libs/compare/v5.1.3...v5.1.4) (2019-05-24)

**Note:** Version bump only for package js-libs





## [5.1.3](https://github.com/paritytech/js-libs/compare/v5.1.2...v5.1.3) (2019-04-05)


### Performance Improvements

* **light.js:** Use getTransactionByHash instead of getTransactionReceipt ([#213](https://github.com/paritytech/js-libs/issues/213)) ([9a82e16](https://github.com/paritytech/js-libs/commit/9a82e16))





## [5.1.2](https://github.com/paritytech/js-libs/compare/v5.1.1...v5.1.2) (2019-03-20)


### Bug Fixes

* Hide incorrect password from logs (parity_exportAccount) ([#209](https://github.com/paritytech/js-libs/issues/209)) ([43c9624](https://github.com/paritytech/js-libs/commit/43c9624))





## [5.1.1](https://github.com/paritytech/js-libs/compare/v5.1.0...v5.1.1) (2019-03-13)


### Bug Fixes

* downgrade es6-error ([#208](https://github.com/paritytech/js-libs/issues/208)) ([5d4b704](https://github.com/paritytech/js-libs/commit/5d4b704))





# [5.1.0](https://github.com/paritytech/js-libs/compare/v5.0.1...v5.1.0) (2019-03-12)


### Features

* add versionInfo$ ([#205](https://github.com/paritytech/js-libs/issues/205)) ([e18d839](https://github.com/paritytech/js-libs/commit/e18d839))





## [5.0.1](https://github.com/paritytech/js-libs/compare/v5.0.0...v5.0.1) (2019-03-07)

**Note:** Version bump only for package js-libs





# [5.0.0](https://github.com/paritytech/js-libs/compare/v4.1.1...v5.0.0) (2019-03-05)


### Code Refactoring

* Remove RPC_LOADING/withoutLoading ([#200](https://github.com/paritytech/js-libs/issues/200)) ([ae9ea03](https://github.com/paritytech/js-libs/commit/ae9ea03))


### BREAKING CHANGES

* Observables do not emit the symbol RPC_LOADING anymore. They will
only emit once a value is available. The operator withoutLoading
has been removed as this is now the default behaviour.

* refactor: Remove RPC_LOADING/withoutLoading

* Fix error

switchMapPromise source and output can differ (number => BigNumber)





## [4.1.1](https://github.com/paritytech/js-libs/compare/v4.1.0...v4.1.1) (2019-03-05)


### Bug Fixes

* fix light.js docs not clickable ([#202](https://github.com/paritytech/js-libs/issues/202)) ([87b4d1f](https://github.com/paritytech/js-libs/commit/87b4d1f)), closes [#146](https://github.com/paritytech/js-libs/issues/146)





# [4.1.0](https://github.com/paritytech/js-libs/compare/v4.0.3...v4.1.0) (2019-03-05)


### Features

* createRpc & createPubSub: defer getApi & delay unsubscription ([#197](https://github.com/paritytech/js-libs/issues/197)) ([191f1d2](https://github.com/paritytech/js-libs/commit/191f1d2))
* fix build errored in [#197](https://github.com/paritytech/js-libs/issues/197) ([#201](https://github.com/paritytech/js-libs/issues/201)) ([1e0790d](https://github.com/paritytech/js-libs/commit/1e0790d))





## [4.0.3](https://github.com/paritytech/js-libs/compare/v4.0.2...v4.0.3) (2019-02-04)

**Note:** Version bump only for package js-libs





## [4.0.2](https://github.com/paritytech/js-libs/compare/v4.0.1...v4.0.2) (2019-01-22)

**Note:** Version bump only for package js-libs





## [4.0.1](https://github.com/paritytech/js-libs/compare/v4.0.0...v4.0.1) (2019-01-22)

**Note:** Version bump only for package js-libs





# [4.0.0](https://github.com/paritytech/js-libs/compare/v3.0.31...v4.0.0) (2019-01-22)


### Code Refactoring

* Rewrite post$ to take a password and not use signer ([689ae52](https://github.com/paritytech/js-libs/commit/689ae52))


### BREAKING CHANGES

* `post$` now requires `passphrase` in its options.

Non-constant contract method calls from `makeContract` now require `passphrase` in their options.

`post$` now returns `{estimated}?` `{signed}` `{sent}` `{confirmed}` and postRaw$ now returns `{sent}` `{confirmed}`
