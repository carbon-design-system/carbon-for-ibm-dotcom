'use strict';

const https = require('https');

/**
 * Bot user to check for in comments
 * @type {string}
 */
const botUser = 'ibmdotcom-bot';

/**
 * Github Repo Slug
 * @type {string}
 */
const repoSlug = 'carbon-design-system/ibm-dotcom-library';

/**
 * Github Token ($GITHUB_TOKEN)
 * @type {string}
 */
const githubToken = process.argv[2];

/**
 * Name of package
 * @type {string}
 */
const packageName = process.argv[3];

/**
 * S3 bucket name ($COS_BUCKET)
 * @type {string}
 */
const bucket = process.argv[4];

/**
 * S3 domain
 * @type {string}
 */
const previewDomain = process.argv[5];

/**
 * Pull Request ID
 * @type {string}
 */
const pullRequestId = process.argv[6];

/**
 * Pull Request SHA
 * @type {string}
 */
const sha = process.argv[7];

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
const prComment = results => {
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

  const req = https.request(options);

  req.on('error', error => {
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
    },
  };

  const req = https.request(options, res => {
    let response = '';

    res.on('data', chunk => {
      response += chunk;
    });

    res.on('end', () => {
      response = JSON.parse(response);
      console.log('response', response);

      const results = response.filter(comment => {
        return (
          comment.user.login === botUser && comment.body.indexOf(bucket) !== -1
        );
      });

      prComment(results);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end();
};

getComments();
