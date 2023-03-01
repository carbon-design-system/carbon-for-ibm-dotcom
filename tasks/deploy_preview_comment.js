/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const https = require('https');
const program = require('commander');

program
  .option('-t, --token <github token>', 'Github Token')
  .option('-n, --name <package name>', 'Package Name')
  .option('-b, --bucket <bucket name>', 'S3 Bucket Name')
  .option('-d, --domain <preview domain>', 'S3 Preview Domain')
  .option('-i, --id <pull request id>', 'Pull Request ID')
  .option('-s, --sha <pull request sha>', 'Pull Request SHA');

/**
 * Bot user to check for in comments
 * @type {string}
 */
const botUser = 'ibmdotcom-bot';

/**
 * Github Repo Slug
 * @type {string}
 */
const repoSlug = 'carbon-design-system/carbon-for-ibm-dotcom';

/**
 * Stores the arguments
 * @type {commander.Command}
 */
const args = program.parse(process.argv);

/**
 * Github Token (-t)
 * @type {string}
 */
const githubToken = args.token;

/**
 * Name of package (-n)
 * @type {string}
 */
const packageName = args.name;

/**
 * S3 bucket name (-b)
 * @type {string}
 */
const bucket = args.bucket;

/**
 * S3 domain (-d)
 * @type {string}
 */
const previewDomain = args.domain;

/**
 * Pull Request ID (-i)
 * @type {string}
 */
const pullRequestId = args.id;

/**
 * Pull Request SHA (-s)
 * @type {string}
 */
const sha = args.sha;

/**
 * Github API Comment URL
 * @type {string}
 */
const commentUrl = `/repos/${repoSlug}/issues/${pullRequestId}/comments`;

/**
 * Github API Comment Patch URL
 * @type {string}
 */
const commentPatchUrl = `/repos/${repoSlug}/issues/comments`;

/**
 * Data object for Github API call
 * @type {string}
 */
const data = JSON.stringify({
  body: `Deploy preview created for package \`${packageName}\`:\nhttps://${bucket}.${previewDomain}/deploy-previews/${pullRequestId}/index.html\n\nBuilt with commit: [${sha}](https://github.com/${repoSlug}/commit/${sha})`,
});

/**
 * Creates or patches the PR comment
 *
 * @param {Array} results array of comment results for the PR
 */
const prComment = (results) => {
  let path = commentUrl;
  let method = 'POST';
  if (results.length > 0) {
    path = `${commentPatchUrl}/${results[0].id}`;
    method = 'PATCH';
  }

  const options = {
    hostname: 'api.github.com',
    path,
    method,
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
      console.log(response);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

/**
 * Gets the list of comments that are from the botUser
 */
const getComments = () => {
  const options = {
    hostname: 'api.github.com',
    path: commentUrl,
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

      console.log(response);

      const results = response.filter((comment) => {
        return (
          comment.user.login === botUser &&
          comment.body.indexOf(`\`${packageName}\``) !== -1
        );
      });

      prComment(results);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
};

getComments();
