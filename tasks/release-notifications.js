/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const https = require('https');
const program = require('commander');

program.option('-t, --token <github token>', 'Github Token');

/**
 * Stores the arguments
 * @type {commander.Command}
 */
const args = program.parse(process.argv);

/**
 * Github Token (-t)
 * @type {string}
 */
const githubToken = args.token || process.env.GITHUB_TOKEN;

/**
 * Github Repo Slug
 * @type {string}
 */
const repoSlug = 'carbon-design-system/carbon-for-ibm-dotcom';

/**
 * Github API release URL
 * @type {string}
 */
const releaseUrl = `/repos/${repoSlug}/releases/latest`;

/**
 * Posts the PR comment
 *
 * @param {Array} prIds array of PRs in the release note
 * @param {string} releaseVersion version
 */
const postComments = (prIds, releaseVersion) => {
  prIds.map((pr) => {
    let path = `/repos/${repoSlug}/issues/${pr}/comments`;
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
      body: `Hey there! This issue/pull request was referenced in recently released [${releaseVersion}](https://github.com/${repoSlug}/releases/tag/${releaseVersion}).`,
    });

    const req = https.request(options, (res) => {
      let response = '';

      res.on('data', (chunk) => {
        response += chunk;
      });

      res.on('end', () => {
        console.log(response);
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.write(data);
    req.end();
  });
};

/**
 * Extract PR ids from release notes
 *
 * @param {string} note release note body
 * @param {string} releaseVersion version
 */
const getPRs = (note, releaseVersion) => {
  const regex = /\((#[\d]+)\)/g;
  const ids = note.match(regex);

  // clean ids
  const prIds = ids.map((id) => id.replace(/([(#)])/g, ''));

  postComments(prIds, releaseVersion);
};

/**
 * Get latest release
 */
const getLatestRelease = () => {
  const options = {
    hostname: 'api.github.com',
    path: releaseUrl,
    headers: {
      'User-Agent': 'node/https',
      Authorization: `token ${githubToken}`,
    },
  };

  const req = https.request(options, (res) => {
    let response = '';

    res.on('data', (chunk) => {
      response += chunk;
    });

    res.on('end', () => {
      response = JSON.parse(response);
      const releaseVersion = response['tag_name'];

      // make sure it only triggers on v2 releases
      if (releaseVersion.includes('v2.')) {
        getPRs(response.body, releaseVersion);
      } else {
        console.log('Release version is not v2.*');
      }
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
};

getLatestRelease();
