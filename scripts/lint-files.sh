#!/bin/bash

# Apply `prettier` and `eslint` in two steps, because some `semistandard` rules
# aren't supported by `prettier`, e.g. https://github.com/prettier/prettier/issues/3845

[ $# -eq 0 ] && exit 0; # Exit successfully if no arguments

set -e # Exit with error if any command fails

echo 'Linting...'

yarn prettier --loglevel error --write $@
yarn eslint --fix $@
