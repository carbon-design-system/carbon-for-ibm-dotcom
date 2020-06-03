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
 * Uses a delimiter for splitting the comments into an array
 *
 * @type {string}
 */
const delimeter = '----DELIMITER----';

/**
 * Returns back the commits in an array
 *
 * @returns {string[]} Commits array of objects
 */
function getCommits() {
  // Gets the git output between the two tags
  const output = child
    .execSync(`git log ${prevTag}..HEAD --pretty=format:"%s"${delimeter}`)
    .toString('utf-8');

  // Generates the array of commit comments
  return output.split(`${delimeter}\n`);
}

/**
 * Gets the changelog content
 *
 * @returns {*} Changelog content
 */
function getChangelog() {
  // Stores the changelog
  let changelog = '';

  // Stores the list of features
  const features = [];

  // Stores the list of fixes
  const fixes = [];

  const commitsArray = getCommits();

  commitsArray.forEach(commit => {
    commit = commit.replace(delimeter, '');
    if (commit.startsWith('feat(')) {
      let pushFeat = commit.replace('feat(', '- **').replace('):', '**: ');
      features.push(`${pushFeat}\n`);
    }
    if (commit.startsWith('fix(')) {
      let pushFeat = commit.replace('fix(', '- **').replace('):', '**: ');
      fixes.push(`${pushFeat}\n`);
    }
  });

  if (features.length) {
    changelog += `## Features\n`;
    features.forEach(feature => {
      changelog += feature;
    });
    changelog += '\n';
  }

  if (fixes.length) {
    changelog += `## Fixes\n`;
    fixes.forEach(fix => {
      changelog += fix;
    });
    changelog += '\n';
  }

  return changelog;
}

/**
 * Creates the Beta Release on Github
 */
function createBetaRelease() {
  const changelog = getChangelog();

  let path = repoUrl;
  let method = 'POST';

  const options = {
    hostname: 'api.github.com',
    path,
    method,
    headers: {
      'User-Agent': 'node/https',
      Authorization: `token ${githubToken}`,
    },
  };

  const data = JSON.stringify({
    tag_name: newTag,
    name: newTag,
    target_commitish: 'master',
    body: changelog,
    draft: false,
    prerelease: true,
  });

  const req = https.request(options, res => {
    res.on('end', () => {
      console.log(
        `Release created: https://github.com/${repoSlug}/releases/tag/${newTag}`
      );
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

createBetaRelease();
