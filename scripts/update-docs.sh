#!/bin/bash

# Generate docs for a package, and update the docs in parity-js/${package_name}, in the gh-pages branch.

set -e

# Take the --scope flag if it exists
if [[ "$1" == --scope* ]]; then
	SCOPES=`cut -d "=" -f 2 <<< "$1"`
fi

# Quit if there's no scope
[[ -z  $SCOPES ]] && echo No scope provided. && exit 1

# Find all scopes, separated by comma
IFS=',' read -r -a ARRAY <<< "$SCOPES"

# Generate docs in the SCOPE folder
for SCOPE in "${ARRAY[@]}"
do
    # Generate latest version of docs
    pushd .
    cd "packages/$SCOPE"
    yarn docs
    cd docs
    gitbook build
    popd

    # Push docs to parity-js, on gh-pages branch
    PROJECT_DIR=`pwd`
    REMOTE_REPO="https://git:f0a87d1f77a5e0fbaf80e178a196e0623591321e@github.com/parity-js/$SCOPE"
    cd /tmp
    git clone -b gh-pages $REMOTE_REPO new-$SCOPE-docs
    cd new-$SCOPE-docs
    cp -r "$PROJECT_DIR/packages/$SCOPE/docs/_book/." .
    git add .
    set +e # Don't catch errors in the next lines
    git commit -m "Update docs"
    git push
    set -e
    cd ..
    rm -rf new-$SCOPE-docs

    # Go back to root
    cd $PROJECT_DIR
done



exit 0
