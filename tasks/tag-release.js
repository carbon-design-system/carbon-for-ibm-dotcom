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
const inquirer = require('inquirer');
const chalk = require('chalk');

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
 * Questions asked before tagging and releasing
 *
 * @type {*[]}
 */
const questions = [
  {
    type: 'input',
    name: 'tagName',
    message: 'What is the release tag name to create? (e.g. v0.0.0-rc.0)',
  },
  {
    type: 'confirm',
    name: 'tagGithub',
    message: 'Tag and push to Github?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'createRelease',
    message:
      'Create the release from changelogs? (For release candidates only. If this is a full release, create the release from the pinned issue from this sprint instead)',
    default: false,
  },
];

/**
 * Pushes the tagname to the repo
 *
 * @param {string} tagName Tag name
 */
function createTag(tagName) {
  console.log(chalk.green(`Tagging the repo with ${tagName}...`));
  child.execSync(`git tag -a ${tagName} -m "Release ${tagName}"`);
  child.execSync('git push --tags');
}

/**
 * Create the release on Github
 *
 * @param {string} tagName Tag to create the release
 */
function createRelease(tagName) {
  inquirer
    .prompt({
      type: 'input',
      name: 'prevTag',
      message:
        'What is the tag of the previous release? (this will be used to grab the changelog range)',
    })
    .then(answers => {
      const changelog = child.spawn('node', [
        `${__dirname}/get-changelog.js`,
        `-f ${answers.prevTag}`,
        `-t ${tagName}`,
      ]);

      changelog.stdout.on('data', data => {
        const branch = child
          .execSync('git rev-parse --abbrev-ref HEAD')
          .toString()
          .trim();
        const token = child
          .execSync('git config --global github.token')
          .toString()
          .trim();

        const options = {
          hostname: 'api.github.com',
          path: repoUrl,
          method: 'POST',
          headers: {
            'User-Agent': 'node/https',
            Authorization: `token ${token}`,
          },
        };

        const dataObj = JSON.stringify({
          tag_name: tagName,
          name: tagName,
          target_commitish: branch,
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
            if (JSON.parse(response).id) {
              console.log(
                chalk.green(
                  `Release created: https://github.com/${repoSlug}/releases/tag/${tagName}`
                )
              );
            } else {
              console.log(chalk.red(`Error creating release:`, response));
            }
          });
        });

        req.on('error', error => {
          console.error(error);
        });

        req.write(dataObj);
        req.end();
      });
    });
}

inquirer.prompt(questions).then(answers => {
  if (answers.tagGithub) {
    createTag(answers.tagName);
  } else {
    console.log(chalk.green('Continuing without tagging the repo...'));
  }

  if (answers.createRelease) {
    createRelease(answers.tagName);
  }
});
