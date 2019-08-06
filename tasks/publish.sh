#!/bin/bash
#
# Copyright IBM Corp. 2016, 2018
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

# Echo every command being executed
set -x

# Go to root
cd ..
root_path=$PWD

# if [ -n "$(git status --porcelain)" ]; then
#  echo "Your git status is not clean. Aborting.";
#  exit 1;
# fi

# Go!
echo "What type of release are you running?"
options=(
  "alpha release"
  "rc.0 (first release candidate)"
  ">rc.0 (subsequent release candidates)"
  "full release"
  "cancel"
)
select release in "${options[@]}";
do
    case "$release" in
        "alpha release")
          ./tasks/publish.sh --canary minor --dist-tag canary --no-push --no-git-tag-version
          ;;
        "rc.0 (first release candidate)")
          ./tasks/publish.sh preminor --exact --conventional-commits --conventional-prerelease --preid rc --no-git-tag-version
          ;;
        ">rc.0 (subsequent release candidates)")
          ./tasks/publish.sh --exact --conventional-commits --conventional-prerelease --preid rc --no-git-tag-version
          ;;
        "full release")
          ./tasks/publish.sh --exact --conventional-commits --conventional-graduate --no-git-tag-version
          ;;
        "cancel")
          break
          ;;
        *) echo "invalid option $REPLY";;
    esac
done
