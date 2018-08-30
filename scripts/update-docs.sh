#!/bin/bash

# Generate docs for a package, and update the docs in parity-js/${package_name}, in the gh-pages branch.

set -e

# Take the --scope flag if it exists
if [[ "$1" == --scope* ]]; then
	SCOPE=`cut -d "=" -f 2 <<< "$1"`
fi

# Quit if there's no scope
[[ -z  $SCOPE ]] && echo No scope provided. && exit 1

# Generate docs in the SCOPE folder
pushd .
cd "packages/$SCOPE"
# yarn docs

# Go back to root
popd

# Push to parity-js, on gh-pages branch
PROJECT_DIR=`pwd`
REMOTE_REPO="https://git:$GH_TOKEN@github.com/parity-js/$SCOPE"
cd /tmp
git clone -b gh-pages $REMOTE_REPO new-docs
cd new-docs
cp -r "$PROJECT_DIR/packages/$SCOPE/docs/_book/." .
git add .
set +e # Don't catch errors in the next lines
git commit -m "Update docs"
git push
set -e
cd ..
rm -rf new-docs

# Go back to root
cd $PROJECT_DIR

exit 0
