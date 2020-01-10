'use strict';

const https = require('https');

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
 * Pull Request ID ($TRAVIS_PULL_REQUEST)
 * @type {string}
 */
const pullRequestId = process.argv[6];

/**
 * Pull Request SHA ($TRAVIS_PULL_REQUEST_SHA)
 * @type {string}
 */
const sha = process.argv[7];

/**
 * Github Repo Slug ($TRAVIS_REPO_SLUG)
 * @type {string}
 */
const repoSlug = process.argv[8];

/**
 * Github API Comment URL
 * @type {string}
 */
const commentUrl = `/repos/${repoSlug}/issues/${pullRequestId}/comments`;

/**
 * Data object for Github API call
 * @type {string}
 */
const data = JSON.stringify({
  body: `Deploy preview created for package \`${packageName}\`:\nhttps://${bucket}.${previewDomain}/deploy-previews/${pullRequestId}/index.html\n\nBuilt with commit: [${sha}](https://github.com/${repoSlug}/commit/${sha})`,
});

/**
 * API options
 * @type {{path: string, headers: {'User-Agent': string}, hostname: string, method: string}}
 */
const options = {
  hostname: 'api.github.com',
  path: commentUrl,
  method: 'POST',
  headers: {
    'User-Agent': 'node/https',
    Authorization: `token ${githubToken}`,
  },
};

/**
 * API Request
 * @type {http.ClientRequest}
 */
const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
