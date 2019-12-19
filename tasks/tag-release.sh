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

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

options_yesno=(
  "Yes"
  "No"
)

# Ask if tagging the repo
tag_repo () {
  echo "Tag and push to Github?"
  select tagconfirm in "${options_yesno[@]}"
  do
      case "$tagconfirm" in
          "Yes")
            echo -e "${GREEN}Tagging the repo with $tagname...${NC}"
            pwd
            git tag -a $tagname -m "Release $tagname"
            git push --tags
            create_release
            break
            ;;
          "No")
            echo -e "${GREEN}Continuing without tagging the repo...${NC}"
            create_release
            break
            ;;
          *) echo "${RED}invalid option $REPLY${NC}";;
      esac
  done
}

# Ask if creating the release
create_release () {
  echo "Create the release in Github?"
  select createconfirm in "${options_yesno[@]}"
  do
      case "$createconfirm" in
          "Yes")
            echo -e "${GREEN}Creating the $tagname release...${NC}"
            release_notes
            break
            ;;
          "No")
            echo -e "${GREEN}Skipping the release creation...${NC}"
            exit 1
            ;;
          *) echo "${RED}invalid option $REPLY${NC}";;
      esac
  done
}


# Ask if creating the release from changelogs or pinned issue
release_notes () {
  echo "Create the release from changelogs or pinned issue?"
  options_releasenotes=(
    "change logs"
    "pinned issue"
    "cancel"
  )
  select releasenotestype in "${options_releasenotes[@]}"
  do
      case "$releasenotestype" in
          "change logs")
            echo -e "${GREEN}Creating from change logs...${NC}"
            change_logs
            break
            ;;
          "pinned issue")
            echo -e "${GREEN}Creating from pinned issue...${NC}"
            pinned_issue
            break
            ;;
          "cancel")
            echo -e "${RED}Canceling...${NC}"
            exit 1
            ;;
          *) echo "${RED}invalid option $REPLY${NC}";;
      esac
  done
}

# Auto generate the change logs
change_logs () {
  repo="https://api.github.com/repos/jeffchew/ibm-dotcom-library/releases"
  branch=$(git rev-parse --abbrev-ref HEAD)
  token=$(git config --global github.token)
  return="

"
  react="$(git diff HEAD^^ --unified=0 packages/react/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+//' | sed -e 's/# \[/# React \[/g')$return$return"
  patterns="$(git diff HEAD^^ --unified=0 packages/patterns-react/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+//' | sed -e 's/# \[/# Patterns \[/g')$return$return"
  vanilla="$(git diff HEAD^^ --unified=0 packages/vanilla/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+//' | sed -e 's/# \[/# Vanilla \[/g')$return$return"
  services="$(git diff HEAD^^ --unified=0 packages/services/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+//' | sed -e 's/# \[/# Services \[/g')$return$return"
  styles="$(git diff HEAD^^ --unified=0 packages/styles/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+//' | sed -e 's/# \[/# Styles \[/g')$return$return"
  utilities="$(git diff HEAD^^ --unified=0 packages/utilities/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+//' | sed -e 's/# \[/# Utilities \[/g')$return$return"

  if [[ $react == *"Version bump only"* ]]; then
    react=''
  fi

  if [[ $patterns == *"Version bump only"* ]]; then
    patterns=''
  fi

  if [[ $vanilla == *"Version bump only"* ]]; then
    vanilla=''
  fi

  if [[ $services == *"Version bump only"* ]]; then
    services=''
  fi

  if [[ $styles == *"Version bump only"* ]]; then
    styles=''
  fi

  if [[ $utilities == *"Version bump only"* ]]; then
    utilities=''
  fi

  body=$(printf '{"tag_name": "%s","target_commitish": "%s","name": "%s","body": "%s","draft": false,"prerelease": true}' "$tagname" "$branch" "$tagname" "$react$patterns$vanilla$services$styles$utilities" )

echo $body
  response=$(curl --data "$body" ${repo}?access_token=${token})
  if [[ $response.message == "Success" ]]; then
    echo -e "${GREEN}Release created: https://github.com/jeffchew/ibm-dotcom-library/releases/tag/$tagname${NC}"
  fi
    echo -e "${RED}Error creating the release! Check if the Github token is set correctly (e.g. 'git config --global github.token YOUR_TOKEN')${NC}"
    echo $response
}

pinned_issue () {
  echo -e "${GREEN}Nothing here yet...${NC}"
}

# Ask for the release tag name
echo "What is the release tag name to create? (e.g. v0.0.0-rc.0)"
read tagname
tag_repo
