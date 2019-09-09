#!/bin/bash
#
# Copyright IBM Corp. 2016, 2018
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#

# Alpha release
release_alpha () {
  ./node_modules/.bin/lerna publish --canary minor --dist-tag canary --no-push --no-git-tag-version --force-publish=*
}

# RC.0 minor release
release_rc0_minor () {
  ./node_modules/.bin/lerna publish preminor --exact --conventional-commits --conventional-prerelease --preid rc --no-git-tag-version
}

# RC.0 major release
release_rc0_major () {
  ./node_modules/.bin/lerna publish premajor --exact --conventional-commits --conventional-prerelease --preid rc --no-git-tag-version
}

# RC.1+ release
release_rc1plus () {
  ./node_modules/.bin/lerna publish --exact --conventional-commits --conventional-prerelease --preid rc --no-git-tag-version
}

# Full minor release
release_full_minor () {
  ./node_modules/.bin/lerna publish minor --exact --conventional-commits --conventional-graduate --no-git-tag-version
}

# Full major release
release_full_major () {
  ./node_modules/.bin/lerna publish major --exact --conventional-commits --conventional-graduate --no-git-tag-version
}

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

# Go to root
cd ..
root_path=$PWD

# Check the git status first
if [ -n "$(git status --porcelain)" ]; then
  echo "Your git status is not clean. Aborting.";
  exit 1;
fi

# Go!
PS3='Select an option and press Enter: '

# Check if logged into npm
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

# Check if current user is the release manager
echo "Are you the release manager for this cycle?"
options_manager=(
  "Yes"
  "No"
)
select manager in "${options_manager[@]}"
do
    case "$manager" in
        "Yes")
          break
          ;;
        "No")
          echo "You are only permitted to run an alpha release. Running now..."
          set -x
          release_alpha
          exit 1
          ;;
        *) echo "invalid option $REPLY";;
    esac
done

# Ask what type of release to run if the user is the release manager
echo "What type of release are you running?"
options_release=(
  "alpha release"
  "rc.0 minor (first release candidate)"
  "rc.0 major (first release candidate)"
  "rc.1+ (subsequent release candidates)"
  "full release (minor)"
  "full release (major)"
  "cancel"
)
select release in "${options_release[@]}"
do
    case "$release" in
        "alpha release")
          echo "Creating alpha release..."
          set -x
          release_alpha
          exit 1
          ;;
        "rc.0 minor (first release candidate)")
          echo "Creating minor rc.0 release..."
          set -x
          release_rc0_minor
          exit 1
          ;;
        "rc.0 major (first release candidate)")
          echo "Creating major rc.0 release..."
          set -x
          release_rc0_major
          exit 1
          ;;
        "rc.1+ (subsequent release candidates)")
          echo "Creating rc.1+ release..."
          set -x
          release_rc1plus
          exit 1
          ;;
        "full release (minor)")
          echo "Creating full minor release..."
          set -x
          release_full_minor
          exit 1
          ;;
        "full release (major)")
          echo "Creating full major release..."
          set -x
          release_full_major
          exit 1
          ;;
        "cancel")
          exit 1
          ;;
        *) echo "invalid option $REPLY";;
    esac
done
