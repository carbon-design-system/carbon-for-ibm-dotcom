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
# set -x

# Go to root
cd ..
root_path=$PWD

# Check the git status first
#if [ -n "$(git status --porcelain)" ]; then
#  echo "Your git status is not clean. Aborting.";
#  exit 1;
#fi

# Go!
PS3='Select an option and press Enter: '

# Initial checks
echo "Did you log into npm (npm login) with a user with publishing rights?"
options_npm=(
  "Yes"
  "No"
)
select npm in "${options_npm[@]}"
do
    case "$npm" in
        "Yes")
          echo "Great!"
          break
          ;;
        "No")
          echo "Please log into npm first then re-run this script."
          exit 1
          ;;
        *) echo "invalid option $REPLY";;
    esac
done

echo "What type of release are you running?"
options_release=(
  "alpha release"
  "rc.0 (first release candidate)"
  ">rc.0 (subsequent release candidates)"
  "full release"
  "cancel"
)
select release in "${options_release[@]}"
do
    case "$release" in
        "alpha release")
          echo "Creating alpha release..."
          ./node_modules/.bin/lerna publish --canary minor --dist-tag canary --no-push --no-git-tag-version
          exit 1
          ;;
        "rc.0 (first release candidate)")
          echo "Creating rc.0 release..."
          ./node_modules/.bin/lerna publish preminor --exact --conventional-commits --conventional-prerelease --preid rc --no-git-tag-version
          exit 1
          ;;
        ">rc.0 (subsequent release candidates)")
          echo "Creating rc.1+ release..."
          ./node_modules/.bin/lerna publish --exact --conventional-commits --conventional-prerelease --preid rc --no-git-tag-version
          exit 1
          ;;
        "full release")
          echo "Creating full release..."
          ./node_modules/.bin/lerna publish --exact --conventional-commits --conventional-graduate --no-git-tag-version
          exit 1
          ;;
        "cancel")
          exit 1
          ;;
        *) echo "invalid option $REPLY";;
    esac
done
