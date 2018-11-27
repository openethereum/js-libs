#!/bin/bash

# Bump versions of all packages, and publish to npm.

set -e # Quits if there's an error

lerna version patch --yes -m "[ci skip] Publish %s" --git-remote "https://git:$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
lerna publish from-git --yes
