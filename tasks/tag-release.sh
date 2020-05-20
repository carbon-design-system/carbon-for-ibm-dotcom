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

# Grab options passed into the script
while getopts t: option
do
case "${option}"
in
t) TYPE=${OPTARG};;
esac
done

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
            echo -e "${GREEN}Tagging the repo with ${tagname}...${NC}"
            pwd
            git tag -a ${tagname} -m "Release ${tagname}"
            git push --tags
            create_release
            break
            ;;
          "No")
            echo -e "${GREEN}Continuing without tagging the repo...${NC}"
            create_release
            break
            ;;
          *) echo "${RED}invalid option ${REPLY}${NC}";;
      esac
  done
}

# Ask if creating the release
create_release () {
  echo ${TYPE}
  if [[ ${TYPE} == 'rc' ]]
  then
    echo -e "${GREEN}Creating from change logs...${NC}"
    change_logs
  elif [[ ${TYPE} == 'full' ]]
  then
    echo -e "${GREEN}Creating from pinned issue...${NC}"
    pinned_issue
  else
    release_notes
  fi
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
  repo="https://api.github.com/repos/carbon-design-system/ibm-dotcom-library/releases"
  branch=$(git rev-parse --abbrev-ref HEAD)
  token=$(git config --global github.token)
  CR=$(printf '\n')
  return="\n\n"

  react="$(git diff HEAD~1 --unified=0 packages/react/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+/\\n/' | sed -e 's/# \[/# React \[/g')$return$return"
  vanilla="$(git diff HEAD~1 --unified=0 packages/vanilla/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+/\\n/' | sed -e 's/# \[/# Vanilla \[/g')$return$return"
  services="$(git diff HEAD~1 --unified=0 packages/services/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+/\\n/' | sed -e 's/# \[/# Services \[/g')$return$return"
  styles="$(git diff HEAD~1 --unified=0 packages/styles/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+/\\n/' | sed -e 's/# \[/# Styles \[/g')$return$return"
  utilities="$(git diff HEAD~1 --unified=0 packages/utilities/CHANGELOG.md | sed -e '1,5d' | sed -e :a -e '$d;N;2,5ba' -e 'P;D' | sed -e 's/^\+/\\n/' | sed -e 's/# \[/# Utilities \[/g')$return$return"

  if [[ ${react} == *"Version bump only"* ]]; then
    react=''
  fi

  if [[ ${vanilla} == *"Version bump only"* ]]; then
    vanilla=''
  fi

  if [[ ${services} == *"Version bump only"* ]]; then
    services=''
  fi

  if [[ ${styles} == *"Version bump only"* ]]; then
    styles=''
  fi

  if [[ ${utilities} == *"Version bump only"* ]]; then
    utilities=''
  fi

  body=$(printf "%s\n" "${react}${vanilla}${services}${styles}${utilities}" | sed "s/\"/'/g" | sed "s/\\_//g")
  echo ${body} > TEMP_RELEASENOTES.md

response=$(curl -H "Authorization: token ${token}" -X POST ${repo} \
-d @- << EOF
{
  "tag_name":"$tagname",
  "name": "$tagname",
  "target_commitish":"$branch",
  "body": "$body",
  "draft": false,
  "prerelease": true
}
EOF
)

response_message=$(jq '.message' <<< "${response}")
response_id=$(jq 'has("id")' <<< "${response}")

  if [[ ${response_message} == "Problems parsing JSON" ]]
  then
    echo -e "${RED}Error parsing JSON, check to see if there are issues with the body copy.${NC}"
    echo -e "${RED}Temporary release notes have been generated if creating the release manually (TEMP_RELEASENOTES.md)${NC}"
    echo -e "${RED}Tag: https://github.com/carbon-design-system/ibm-dotcom-library/releases/tag/${tagname}${NC}"
    echo ${response}
  elif [[ ${response_id} != "true" ]]
  then
    echo -e "${RED}Error creating the release! Check if the Github token is set correctly (e.g. 'git config --global github.token YOUR_TOKEN')${NC}"
    echo -e "${RED}Temporary release notes have been generated if creating the release manually (TEMP_RELEASENOTES.md)${NC}"
    echo -e "${RED}Tag: https://github.com/carbon-design-system/ibm-dotcom-library/releases/tag/${tagname}${NC}"
    echo ${response}
  else
    echo -e "${GREEN}Release created: https://github.com/carbon-design-system/ibm-dotcom-library/releases/tag/$tagname${NC}"
    rm TEMP_RELEASENOTES.md
  fi

}

pinned_issue () {
  echo -e "${GREEN}This task has not been created yet. Please create the release manually:${NC}"
  echo -e "${GREEN}https://github.com/carbon-design-system/ibm-dotcom-library/releases/new?tag=$tagname${NC}"
}

# Ask for the release tag name
echo "What is the release tag name to create? (e.g. v0.0.0-rc.0)"
read tagname
tag_repo
