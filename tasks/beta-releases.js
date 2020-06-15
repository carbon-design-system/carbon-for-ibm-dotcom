#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const child = require('child_process');
const https = require('https');
const program = require('commander');

program
  .option('-t, --token <github token>', 'Github Token')
  .option(
    '-p, --prevtag <previous git tag>',
    'Previous Git tag to get changelog range'
  )
  .option('-n, --newtag <new git tag>', 'New Git tag to create the release');

/**
 * Github Repo Slug
 *
 * @type {string}
 */
const repoSlug = 'carbon-design-system/ibm-dotcom-library';

/**
 * Github release API
 *
 * @type {string}
 */
const repoUrl = `/repos/${repoSlug}/releases`;

/**
 * Stores the arguments
 *
 * @type {commander.Command}
 */
const args = program.parse(process.argv);

/**
 * Github Token (-t)
 *
 * @type {string}
 */
const githubToken = args.token;

/**
 * Previous Tag (-p)
 *
 * @type {string}
 */
const prevTag = args.prevtag;

/**
 * New Tag (-n)
 *
 * @type {string}
 */
const newTag = args.newtag;

/**
 * Creates the Beta Release on Github
 */
function createBetaRelease() {
  const options = {
    hostname: 'api.github.com',
    path: repoUrl,
    method: 'POST',
    headers: {
      'User-Agent': 'node/https',
      Authorization: `token ${githubToken}`,
    },
  };

  const changelog = child.spawn('node', [
    `${__dirname}/get-changelog.js`,
    `--tagFrom ${prevTag}`,
    `--tagTo ${newTag}`,
  ]);

  changelog.stdout.on('data', data => {
    const dataObj = JSON.stringify({
      tag_name: newTag,
      name: newTag,
      target_commitish: 'master',
      body: data.toString(),
      draft: false,
      prerelease: true,
    });

    const req = https.request(options, res => {
      let response = '';

      res.on('data', chunk => {
        response += chunk;
      });

      res.on('end', () => {
        console.log(response);
        console.log(
          `Release created: https://github.com/${repoSlug}/releases/tag/${newTag}`
        );
      });
    });

    req.on('error', error => {
      console.error(error);
    });

    req.write(dataObj);
    req.end();
  });
}

createBetaRelease();
