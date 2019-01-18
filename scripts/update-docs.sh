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
    echo "Docs for $SCOPE."

    # Generate latest version of docs
    echo "Generating docs."
    pushd . # We're in the root folder
    cd "packages/$SCOPE"
    yarn docs
    cd docs
    gitbook build

    # Copy these docs temporarily in a temp folder
    TMPDIR=$(mktemp -d)
    cp -r "_book/." $TMPDIR
    popd # Go back to root folder

    # Copy these docs back to the gh-pages branch
    git reset --hard HEAD
    git checkout gh-pages
    rm -rf $SCOPE
    cp -r $TMPDIR $SCOPE

    # Return to original branch
    git checkout master
done

# Docs are updated, we commit back to repo
git add .
git commit -m "[ci skip] Update docs"
