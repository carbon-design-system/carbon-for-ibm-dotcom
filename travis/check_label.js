'use strict';

const https = require('https');

/**
 * Pull Request ID ($TRAVIS_PULL_REQUEST)
 * @type {string}
 */
const pullRequestId = process.argv[2];

/**
 * Github Repo Slug ($TRAVIS_REPO_SLUG)
 * @type {string}
 */
const repoSlug = process.argv[3];

/**
 * Label to check
 * @type {string}
 */
const label = process.argv[4];

if (!pullRequestId) {
  console.log('Missing argument: pull request id');
  process.exit(1);
}

/**
 * Sets the Github URL for fetching the PR
 * @type {string}
 */
const pullRequestUrl = `/repos/${repoSlug}/pulls/${pullRequestId}`;

/**
 * Parses through the PR to determine if the PR includes the specified label
 *
 * @param {object} res response object
 */
const parsePR = res => {
  let labels;
  try {
    labels = JSON.parse(res).labels;
    if (!labels || labels.length === 0) {
      console.log(`no labels found attached to PR ${pullRequestId}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`error parsing labels for PR ${pullRequestId}`);
    console.error(err);
    process.exit(1);
  }
  const ciEnabledLabel = labels.find(item => item.name === label);
  if (ciEnabledLabel) {
    console.log(`label "${label}" found on PR ${pullRequestId}`);
    return;
  }
  console.log(`label "${label}" not found on PR ${pullRequestId}`);
  process.exit(1);
};

/**
 * Checks to see if the given label exists in the pull request
 */
const checkLabel = () => {
  const options = {
    hostname: 'api.github.com',
    path: pullRequestUrl,
    method: 'GET',
    headers: {
      'User-Agent': 'node/https',
    },
  };

  https
    .get(options, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        parsePR(data, label);
      });
    })
    .on('error', err => {
      console.error('Error: ' + err.message);
    });
};

checkLabel(label);
