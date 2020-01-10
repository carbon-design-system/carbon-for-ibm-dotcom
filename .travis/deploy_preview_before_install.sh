#!/bin/bash
#
# Copyright IBM Corp. 2016, 2018
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#

# Argument variables
TRAVIS_PULL_REQUEST=$1
TRAVIS_REPO_SLUG=$2
PACKAGE_NAME=$3
COS_ACCESS_KEY_ID=$4
COS_SECRET_ACCESS_KEY=$5

set +x -e

# Checks to see if the label exists in the PR
node ./.travis/check_label.js ${TRAVIS_PULL_REQUEST} ${TRAVIS_REPO_SLUG} "package: ${PACKAGE_NAME}"

# Installs AWSCLI
pip install awscli --user
export PATH=$PATH:$HOME/.local/bin
aws configure set aws_access_key_id ${COS_ACCESS_KEY_ID}
aws configure set aws_secret_access_key ${COS_SECRET_ACCESS_KEY}
