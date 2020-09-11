#!/bin/bash
#
# Copyright IBM Corp. 2016, 2018
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#

# colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Pre-tests
pretest () {
  echo -e "${GREEN}Running preflight checks...${NC}"
  yarn ci-check && yarn lerna run ci-check && yarn lint && yarn lint:styles
  status=$?
  if [[ $status -eq 0 ]]
  then
    echo -e "${GREEN}Tests have passed! Continuing with release...${NC}"
  else
    echo -e "${RED}Tests have failed. Aborting...${NC}"
    exit 1
  fi
}

# Alpha release
release_alpha () {
  ./node_modules/.bin/lerna publish --canary minor --dist-tag canary --no-push --no-git-tag-version --force-publish=*
}

# RC.0 patch release
release_rc0_patch () {
  ./node_modules/.bin/lerna publish prepatch --conventional-prerelease --preid rc --pre-dist-tag next
}

# RC.0 minor release
release_rc0_minor () {
  ./node_modules/.bin/lerna publish preminor --conventional-prerelease --preid rc --pre-dist-tag next
}

# RC.0 major release
release_rc0_major () {
  ./node_modules/.bin/lerna publish premajor --conventional-prerelease --preid rc --pre-dist-tag next
}

# RC.1+ release
release_rc1plus () {
  ./node_modules/.bin/lerna publish --conventional-prerelease --preid rc --pre-dist-tag next
}

# Full patch release
release_full_patch () {
  ./node_modules/.bin/lerna publish patch --conventional-graduate
}

# Full minor release
release_full_minor () {
  ./node_modules/.bin/lerna publish minor --conventional-graduate
}

# Full major release
release_full_major () {
  ./node_modules/.bin/lerna publish major --conventional-graduate
}

# Post-release success message
success_message () {
  echo -e "${GREEN}Publish complete, run 'node ./tasks/tag-release.js' to tag and create the Github release.${NC}"
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
  echo -e "${RED}Your git status is not clean. Aborting.${NC}";
  exit 1;
fi

# Go!
PS3='Select an option and press Enter: '

# Check if logged into npm
check_npm=$(npm whoami)
if [ "$check_npm" != "carbon-bot" ]; then
  echo -e "${RED}Please log into npm first then re-run this script. Aborting.${NC}";
  exit 1;
fi

# Check if logged into Github
echo "Did you add a Github auth token for pushing changes? (only necessary for release managers)"
echo -e "For publishing to npm: ${GREEN}export GH_TOKEN=YOUR_TOKEN${NC}"
echo -e "For creating the release: ${GREEN}git config --global github.token YOUR_TOKEN${NC}"
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
          echo -e "${RED}Please log into Github first then re-run this script.${NC}"
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
          echo -e "${GREEN}You are only permitted to run an alpha release. Running now...${NC}"
          pretest
          set -x
          release_alpha
          exit 0
          ;;
        *) echo "${RED}invalid option $REPLY${NC}";;
    esac
done

# Ask what type of release to run if the user is the release manager
echo "What type of release are you running?"
options_release=(
  "alpha release"
  "rc.0 patch (first release candidate)"
  "rc.0 minor (first release candidate)"
  "rc.0 major (first release candidate)"
  "rc.1+ (subsequent release candidates)"
  "full release (patch)"
  "full release (minor)"
  "full release (major)"
  "cancel"
)
select release in "${options_release[@]}"
do
    case "$release" in
        "alpha release")
          pretest
          echo -e "${GREEN}Creating alpha release...${NC}"
          set -x
          release_alpha
          exit 0
          ;;
        "rc.0 patch (first release candidate)")
          pretest
          echo -e "${GREEN}Creating patch rc.0 release...${NC}"
          set -x
          release_rc0_patch
          success_message
          exit 0
          ;;
        "rc.0 minor (first release candidate)")
          pretest
          echo -e "${GREEN}Creating minor rc.0 release...${NC}"
          set -x
          release_rc0_minor
          success_message
          exit 0
          ;;
        "rc.0 major (first release candidate)")
          pretest
          echo -e "${GREEN}Creating major rc.0 release...${NC}"
          set -x
          release_rc0_major
          success_message
          exit 0
          ;;
        "rc.1+ (subsequent release candidates)")
          pretest
          echo -e "${GREEN}Creating rc.1+ release...${NC}"
          set -x
          release_rc1plus
          success_message
          exit 0
          ;;
        "full release (patch)")
          pretest
          echo -e "${GREEN}Creating full patch release...${NC}"
          set -x
          release_full_patch
          success_message
          exit 0
          ;;
        "full release (minor)")
          pretest
          echo -e "${GREEN}Creating full minor release...${NC}"
          set -x
          release_full_minor
          success_message
          exit 0
          ;;
        "full release (major)")
          pretest
          echo -e "${GREEN}Creating full major release...${NC}"
          set -x
          release_full_major
          success_message
          exit 0
          ;;
        "cancel")
          exit 1
          ;;
        *) echo "${RED}invalid option $REPLY${NC}";;
    esac
done
