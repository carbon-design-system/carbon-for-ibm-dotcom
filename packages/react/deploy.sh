#!/bin/bash

yarn clean
yarn
yarn build-storybook

cd storybook-static

echo "hi"
