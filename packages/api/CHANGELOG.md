# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.2](https://github.com/paritytech/js-libs/tree/master/packages/api/compare/v4.0.1...v4.0.2) (2019-01-22)

**Note:** Version bump only for package @parity/api





## [4.0.1](https://github.com/paritytech/js-libs/tree/master/packages/api/compare/v4.0.0...v4.0.1) (2019-01-22)

**Note:** Version bump only for package @parity/api





# [4.0.0](https://github.com/paritytech/js-libs/tree/master/packages/api/compare/v3.0.31...v4.0.0) (2019-01-22)


### Code Refactoring

* Rewrite post$ to take a password and not use signer ([689ae52](https://github.com/paritytech/js-libs/tree/master/packages/api/commit/689ae52))


### BREAKING CHANGES

* `post$` now requires `passphrase` in its options.

Non-constant contract method calls from `makeContract` now require `passphrase` in their options.

`post$` now returns `{estimated}?` `{signed}` `{sent}` `{confirmed}` and postRaw$ now returns `{sent}` `{confirmed}`





# 3.0.0 (2018-11-27)

### BREAKING CHANGES

* Moved the repo from https://github.com/parity-js/api to https://github.com/paritytech/js-libs/packages/api. The package location on NPM has not been changed.
* Removed the utility to create a blockie identicon: `@parity/api/lib/utils/createIdentityImg`. Please directly use the [`blockies`](https://github.com/download13/blockies) instead.
