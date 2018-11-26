#!/bin/bash

# Bump versions of all packages, and publish to npm.

set -e # Quits if there's an error

lerna version patch --yes -m "[ci skip] Publish %s"
lerna publish from-git --yes
