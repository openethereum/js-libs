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
    pushd .
    cd "packages/$SCOPE"
    yarn docs
    cd docs
    gitbook build
    popd

    # Push docs to parity-js, on gh-pages branch
    echo "Cloning doc repo."
    PROJECT_DIR=`pwd`
    REMOTE_REPO="https://git:$GH_TOKEN@github.com/parity-js/$SCOPE.git"
    cd /tmp # Clone that repo in the /tmp folder
    git clone -b gh-pages $REMOTE_REPO new-$SCOPE-docs
    cd new-$SCOPE-docs
    cp -r "$PROJECT_DIR/packages/$SCOPE/docs/_book/." .
    git add .

    echo "Pushing to doc repo."
    set +e # Don't catch errors in the next lines
    git commit -m "Update docs"
    git push
    set -e
    cd ..
    rm -rf new-$SCOPE-docs

    # Go back to root
    cd $PROJECT_DIR
done

# Docs are updated, we commit back to repo
git checkout master
git add .
git commit -m "[ci skip] Update docs"
