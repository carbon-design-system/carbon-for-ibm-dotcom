#!/bin/bash
#
# Copyright IBM Corp. 2016, 2018
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#

# Argument variables
BUILD_TYPE=$1
PACKAGE_FOLDER=$2
COS_BUCKET=$3
TRAVIS_PULL_REQUEST=$4
PREVIEW_DOMAIN=$5

set -x -e

# yarn build/install
yarn install
yarn build

# Go to package folder
cd packages/${PACKAGE_FOLDER}

if [[ ${BUILD_TYPE} == "storybook" ]] || [[ ${BUILD_TYPE} == "storybook-experimental" ]]
then
  echo "SCROLL_TRACKING=true" >> .env
  echo "CORS_PROXY=https://dds-proxy.mybluemix.net/" >> .env

  if [[ ${BUILD_TYPE} == 'storybook-experimental' ]]
  then
    echo "DDS_FLAGS_ALL=true" >> .env
  fi

  yarn build-storybook --loglevel verbose
  aws s3 cp storybook-static s3://${COS_BUCKET}/deploy-previews/${TRAVIS_PULL_REQUEST} --recursive --endpoint https://${PREVIEW_DOMAIN}

elif [[ ${BUILD_TYPE} == 'jsdoc' ]]
then
  yarn jsdoc
  aws s3 cp docs s3://${COS_BUCKET}/deploy-previews/${TRAVIS_PULL_REQUEST} --recursive --endpoint https://${PREVIEW_DOMAIN}
fi
