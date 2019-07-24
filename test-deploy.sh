#!/bin/bash

ibmcloud cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org
ibmcloud cf install-plugin blue-green-deploy -f -r CF-Community

cd packages/react
yarn build-storybook
ibmcloud cf blue-green-deploy dds-storybook -f manifest.yml --delete-old-apps
