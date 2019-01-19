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

# The directory of generated gitbook html files to be pushed to gh-pages
GITBOOKDIR="$(pwd)/gitbook"
mkdir -p $GITBOOKDIR

# Generate docs in the SCOPE folder
for SCOPE in "${ARRAY[@]}"
do
    # Generate latest version of docs
    echo "Generating docs for $SCOPE"
    pushd . # We're in the root folder
    cd "packages/$SCOPE"
    yarn docs
    cd docs
    gitbook build # Outputs inside a local `_book` folder

    # Copy these generated html docs temporarily in a temp folder
    cp -r "_book" "$GITBOOKDIR/$SCOPE"
    popd # Go back to root folder
done

# Docs are updated on master, we commit back
git checkout master
git add .
git commit -m "[ci skip] Update docs"
