#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const child = require('child_process');
const program = require('commander');

program
  .option('-f, --tagFrom <git tag from>', 'Git tag range from')
  .option('-t, --tagTo <git tag to>', 'Git tag range from')
  .option(
    '-v, --wcVersion <web components release version>',
    'Web Components release version'
  );

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
 * Web Components release version (-v)
 *
 * @type {string}
 */
const { wcVersion } = args;

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
 * Returns the name from the commit string
 *
 * @param {string} str Commit string
 * @returns {string} commit name
 * @private
 */
function _getCommitName(str) {
  return str
    .substring(str.indexOf('(') + 1, str.indexOf('):'))
    .trim()
    .toLowerCase();
}

/**
 * Returns the subject from the commit string
 *
 * @param {string} str Commit string
 * @returns {string} commit subject
 * @private
 */
function _getCommitSubject(str) {
  return str
    .substring(str.indexOf('):') + 2, str.length)
    .trim()
    .toLowerCase();
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

  // Set Web Components version next to package name
  if (pkgName === 'Web Components') {
    changelog = `## ${pkgName} (${wcVersion})\n`;
  }

  // Stores the list of features
  const features = {};

  // Stores the list of fixes
  const fixes = {};

  // Stores the list of chores
  const chores = {};

  const commitsArray = getCommits(folder);

  commitsArray.forEach(commit => {
    const commitParse = commit.replace(delimiter, '');
    if (commit.startsWith('feat(')) {
      const featName = _getCommitName(commitParse);
      const featSubject = _getCommitSubject(commitParse);

      features[featName] = features[featName] || [];
      features[featName].push(featSubject);
    }

    if (commit.startsWith('fix(')) {
      const fixName = _getCommitName(commitParse);
      const fixSubject = _getCommitSubject(commitParse);

      fixes[fixName] = fixes[fixName] || [];
      fixes[fixName].push(fixSubject);
    }

    if (
      commit.startsWith('chore(') ||
      commit.startsWith('docs(') ||
      commit.startsWith('test(')
    ) {
      const choreName = _getCommitName(commitParse);
      const choreSubject = _getCommitSubject(commitParse);

      if (choreName !== 'release') {
        chores[choreName] = chores[choreName] || [];
        if (choreSubject !== 'publish') {
          chores[choreName].push(choreSubject);
        }
      }
    }
  });

  if (Object.keys(features).length) {
    changelog += `### Features\n`;
    Object.keys(features).forEach(featureName => {
      changelog += `- **${featureName}**\n`;
      features[featureName].forEach(feature => {
        changelog += `  - ${feature}\n`;
      });
    });
    changelog += '\n';
  }

  if (Object.keys(fixes).length) {
    changelog += `### Fixes\n`;
    Object.keys(fixes).forEach(fixName => {
      changelog += `- **${fixName}**\n`;
      fixes[fixName].forEach(fix => {
        changelog += `  - ${fix}\n`;
      });
    });
    changelog += '\n';
  }

  if (Object.keys(chores).length) {
    changelog += `### Housekeeping\n`;
    Object.keys(chores).forEach(choreName => {
      changelog += `- **${choreName}**\n`;
      chores[choreName].forEach(chore => {
        changelog += `  - ${chore}\n`;
      });
    });
    changelog += '\n';
  }

  if (
    Object.keys(features).length === 0 &&
    Object.keys(fixes).length === 0 &&
    Object.keys(chores).length === 0
  ) {
    changelog = '';
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
  log += getChangelog('Services Store', './packages/services-store');
  log += getChangelog('Utilities', './packages/utilities');

  console.log(log);
}

generateLog();
