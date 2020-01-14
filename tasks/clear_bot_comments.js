'use strict';

const https = require('https');

/**
 * Bot user to check for in comments
 * @type {string}
 */
const botUser = 'ibmdotcom-bot';

/**
 * Github Token
 * @type {string}
 */
const githubToken = process.argv[2];

/**
 * Pull Request ID
 * @type {string}
 */
const pullRequestId = process.argv[3];

/**
 * Name of package to delete
 * @type {string}
 */
const packageName = process.argv[4];

/**
 * Github API Comment URL for getting all comments
 * @type {string}
 */
const commentGetUrl = `/repos/carbon-design-system/ibm-dotcom-library/issues/${pullRequestId}/comments`;

/**
 * Github API Comment URL for deleting a comment
 * @type {string}
 */
const commentDeleteUrl = `/repos/carbon-design-system/ibm-dotcom-library/issues/comments/`;

/**
 * Gets the list of comments that are from the botUser
 */
const getComments = () => {
  const options = {
    hostname: 'api.github.com',
    path: commentGetUrl,
    headers: {
      'User-Agent': 'node/https',
    },
  };

  const req = https.request(options, res => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      data = JSON.parse(data);

      const results = data.filter(function(comment) {
        return (
          comment.user.login === botUser &&
          comment.body.indexOf(packageName) !== -1
        );
      });

      if (results.length > 1) {
        deleteComments(results);
      }
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end();
};

/**
 * Goes through the array of comments and deletes except the last one
 *
 * @param {Array} results array of comment results to delete
 */
const deleteComments = results => {
  results.forEach((result, index) => {
    if (index < results.length - 1) {
      const options = {
        hostname: 'api.github.com',
        path: `${commentDeleteUrl}${result.id}`,
        method: 'DELETE',
        headers: {
          'User-Agent': 'node/https',
          Authorization: `token ${githubToken}`,
        },
      };

      const req = https.request(options);

      req.on('error', error => {
        console.error(error);
      });

      req.end();
    }
  });
};

getComments();
