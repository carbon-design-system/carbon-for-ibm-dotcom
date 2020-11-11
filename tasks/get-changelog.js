#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const child = require('child_process');
const program = require('commander');

program
  .option('-f, --tagFrom <git tag from>', 'Git tag range from')
  .option('-t, --tagTo <git tag to>', 'Git tag range from');

/**
 * Stores the arguments
 *
 * @type {commander.Command}
 */
const args = program.parse(process.argv);

/**
 * Tag From (-f)
 *
 * @type {string}
 */
const { tagFrom } = args;

/**
 * Tag To (-t)
 *
 * @type {string}
 */
const { tagTo } = args;

/**
 * Uses a delimiter for splitting the comments into an array
 *
 * @type {string}
 */
const delimiter = '----DELIMITER----';

/**
 * Returns back the commits in an array
 *
 * @param {string} folder Folder to get commit log for
 * @returns {string[]} Commits array of objects
 */
function getCommits(folder) {
  const toTag = tagTo !== undefined ? tagTo : 'HEAD';

  // Gets the git output between the two tags
  const output = child
    .execSync(
      `git log ${tagFrom}..${toTag} --pretty=format:"%s"${delimiter} -- ${folder}`
    )
    .toString('utf-8');

  // Generates the array of commit comments
  return output.split(`${delimiter}\n`);
}

/**
 * Gets the changelog content
 *
 * @param {string} pkgName Package name
 * @param {string} folder Folder for git log
 * @returns {string} Changelog content
 */
function getChangelog(pkgName, folder) {
  // Stores the changelog
  let changelog = `## ${pkgName}\n`;

  // Stores the list of features
  const features = [];

  // Stores the list of fixes
  const fixes = [];

  const commitsArray = getCommits(folder);

  commitsArray.forEach(commit => {
    const commitParse = commit.replace(delimiter, '');
    if (commit.startsWith('feat(')) {
      const pushFeat = commitParse
        .replace('feat(', '- **')
        .replace('):', '**: ');
      features.push(`${pushFeat}\n`);
    }
    if (commit.startsWith('fix(')) {
      const pushFeat = commitParse
        .replace('fix(', '- **')
        .replace('):', '**: ');
      fixes.push(`${pushFeat}\n`);
    }
  });

  if (features.length) {
    changelog += `### Features\n`;
    features.forEach(feature => {
      changelog += feature;
    });
    changelog += '\n';
  }

  if (fixes.length) {
    changelog += `### Fixes\n`;
    fixes.forEach(fix => {
      changelog += fix;
    });
    changelog += '\n';
  }

  return changelog;
}

/**
 * Renders the log
 */
function generateLog() {
  let log = '';

  log += getChangelog('Web Components', './packages/web-components');
  log += getChangelog('React', './packages/react');
  log += getChangelog('Styles', './packages/styles');
  log += getChangelog('Services', './packages/services');
  log += getChangelog('Utilities', './packages/utilities');

  console.log(log);
}

generateLog();
