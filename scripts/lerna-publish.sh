#!/bin/bash

# Bump versions of all packages, and publish to npm.

set -e # Quits if there's an error

git remote set-url origin https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git > /dev/null 2>&1

lerna version --conventional-commits --yes -m "chore(release): publish %s [ci skip]"
lerna publish from-git --yes
