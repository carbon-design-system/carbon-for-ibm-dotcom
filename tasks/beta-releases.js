#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const child = require('child_process');
const fetch = require('node-fetch');
const program = require('commander');
const chalk = require('chalk');

program
  .requiredOption('-t, --token <github token>', 'Github Token')
  .requiredOption(
    '-p, --prevtag <previous git tag>',
    'Previous Git tag to get changelog range'
  )
  .requiredOption(
    '-n, --newtag <new git tag>',
    'New Git tag to create the release'
  );

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
  // Gets the git output between the two tags
  const output = child
    .execSync(`node ./tasks/get-changelog.js -f ${prevTag} -t ${newTag}`)
    .toString('utf-8');

  if (
    output.indexOf('## Features') !== -1 ||
    output.indexOf('## Fixes') !== -1
  ) {
    fetch(`https://api.github.com${repoUrl}`, {
      method: 'post',
      body: JSON.stringify({
        tag_name: newTag,
        name: newTag,
        target_commitish: 'master',
        body: output,
        draft: false,
        prerelease: true,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${githubToken}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.id) {
          console.log(
            chalk.green(
              `Release created: https://github.com/${repoSlug}/releases/tag/${newTag}`
            )
          );
        } else {
          console.log(chalk.red(`Error creating release:`, response));
        }
      });
  } else {
    console.log(chalk.red(`Error creating release:`, output));
  }
}

createBetaRelease();
