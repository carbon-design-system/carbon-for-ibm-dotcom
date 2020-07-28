#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fetch = require('node-fetch');
const program = require('commander');

program
  .requiredOption('-g, --githubtoken <github token>', 'Github Token')
  .requiredOption('-z, --zenhubtoken <zenhub token>', 'Zenhub Token')
  .requiredOption(
    '-c, --componentname <component name>',
    'Component name used for issue/epic creation'
  )
  .requiredOption(
    '-p, --packagetarget <package target>',
    'The package where the component will be created, options are ' +
      '"react" or "web components"'
  );

/**
 * Github Repo Slug
 *
 * @type {string}
 */
const repoSlug = 'carbon-design-system/ibm-dotcom-library';

/**
 * Stores the arguments
 *
 * @type {commander.Command}
 */
const args = program.parse(process.argv);

/**
 * Github Token (-g)
 *
 * @type {string}
 */
const githubToken = args.githubtoken;

/**
 * Zenhub Token (-z)
 *
 * @type {string}
 */
const zenhubToken = args.zenhubtoken;

/**
 * Component Name (-c)
 *
 * @type {string}
 */
const componentName = args.componentname;

/**
 * Package (react or web components) (-p)
 *
 * @type {string}
 */
const packageTarget = args.packagetarget;

/**
 * Host for Github API
 *
 * @type {string}
 */
const githubHost = 'https://api.github.com';

/**
 * Host for Zenhub API
 *
 * @type {string}
 */
const zenhubHost = 'https://api.zenhub.com';

/**
 * Repo ID for Zenhub
 *
 * @type {number}
 */
const repoId = 193129061;

/**
 * Zenhub API to convert an issue to an epic
 * https://github.com/ZenHubIO/API#convert-issue-to-epic
 *
 * @type {string}
 */
const zenhubConvertEpic = `/p1/repositories/${repoId}/issues/issue_number/convert_to_epic`;

/**
 * Zenhub API to add issue(s) to an epic
 * https://github.com/ZenHubIO/API#add-or-remove-issues-to-epic
 *
 * @type {string}
 */
const zenhubAddToEpic = `/p1/repositories/${repoId}/epics/issue_number/update_issues`;

/**
 * Zenhub API to create dependencies between issues
 * https://github.com/ZenHubIO/API#create-a-dependency
 *
 * @type {string}
 */
const zenhubCreateDependency = `/p1/dependencies`;

/**
 * Github API for issues
 * Create: https://docs.github.com/en/rest/reference/issues#create-an-issue
 * Get: https://docs.github.com/en/rest/reference/issues#get-an-issue
 * Update: https://docs.github.com/en/rest/reference/issues#update-an-issue
 *
 * @type {string}
 */
const githubIssue = `/repos/${repoSlug}/issues`;

/**
 * Issue templates depending on package
 *
 * @type {{}}
 */
const issueTemplates = {
  react: {
    epic: 3289, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/3289
    dev: 865, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/865
    designqa: 999, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/999
    prodqa: 1197, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/1197
  },
  'web components': {
    epic: 3290, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/3290
    dev: 3269, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/3269
    designqa: 3282, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/3282
    prodqa: 3280, // https://github.com/carbon-design-system/ibm-dotcom-library/issues/3280
  },
};

/**
 * Gets the Github issue information
 *
 * @param {number} issue Github issue number
 * @returns {*} Issue data
 * @private
 */
function _getIssueInfo(issue) {
  const url = `${githubHost}${githubIssue}/${issue}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${githubToken}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      if (response.title) {
        return {
          title: response.title,
          body: response.body,
        };
      } else {
        console.error('response', response);
      }
    });
}

/**
 * Creates an issue then returns the issue ID
 *
 * @param {string} title Title for the new issue
 * @param {string} body Body of the new issue
 * @param {Array} labels Array of labels to add to the issue
 * @returns {Promise<*>} Issue number created
 * @private
 */
async function _createIssue(title, body, labels = []) {
  const url = `${githubHost}${githubIssue}`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify({
      title,
      body,
      labels,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${githubToken}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      if (response.number) {
        return response.number;
      } else {
        console.error(response);
      }
    });
}

/**
 * Creates an issue then returns the issue ID
 *
 * @param {string} issue Issue number
 * @returns {Promise<*>} Issue number updated
 * @private
 */
async function _addDevToIssue(issue, devIssue) {
  const url = `${githubHost}${githubIssue}/${issue}`;
  const content = await _getIssueInfo(issue);
  const newBody = content.body.replace(/\?dev issue\?/g, devIssue);
  return fetch(url, {
    method: 'post',
    body: JSON.stringify({
      body: newBody,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${githubToken}`,
    },
  }).then(response => response.json());
}

/**
 * Creates the epic issue based on the template
 *
 * @returns {Promise<*>} New issue number
 * @private
 */
async function _createEpicIssue() {
  const template = await _getIssueInfo(issueTemplates[packageTarget].epic);
  const title = template.title.replace(/\?component name\?/g, componentName);
  return await _createIssue(title, template.body, [
    `package: ${packageTarget}`,
  ]).then(issue => {
    console.log(
      `Epic issue created: https://www.github.com/${repoSlug}/issues/${issue}`
    );
    return issue;
  });
}

/**
 * Creates the design QA issue based on the template
 *
 * @returns {Promise<*>} New issue number
 * @private
 */
async function _createDesignQAIssue() {
  const template = await _getIssueInfo(issueTemplates[packageTarget].designqa);
  const title = template.title.replace(/\?component name\?/g, componentName);
  const body = template.body.replace(/\?component name\?/g, componentName);
  return await _createIssue(title, body, [
    'design',
    `package: ${packageTarget}`,
  ]).then(issue => {
    console.log(
      `Design QA issue created: https://www.github.com/${repoSlug}/issues/${issue}`
    );
    return issue;
  });
}

/**
 * Creates the Prod QA issue based on the template
 *
 * @returns {Promise<*>} New issue number
 * @private
 */
async function _createProdQAIssue() {
  const template = await _getIssueInfo(issueTemplates[packageTarget].prodqa);
  const title = template.title.replace(/\?component name\?/g, componentName);
  const body = template.body.replace(/\?component name\?/g, componentName);
  return await _createIssue(title, body, [
    'QA',
    `package: ${packageTarget}`,
  ]).then(issue => {
    console.log(
      `Prod QA issue created: https://www.github.com/${repoSlug}/issues/${issue}`
    );
    return issue;
  });
}

/**
 * Creates the Dev issue based on the template
 *
 * @returns {Promise<*>} New issue number
 * @private
 */
/**
 * Creates the Dev issue based on the template
 *
 * @param {number} designqa Issue number for design QA
 * @param {number} prodqa Issuenumber for prod QA
 * @returns {Promise<*>} New issue number
 * @private
 */
async function _createDevIssue(designqa, prodqa) {
  const template = await _getIssueInfo(issueTemplates[packageTarget].dev);
  const title = template.title.replace(/\?component name\?/g, componentName);
  const body = template.body
    .replace(/\?component name\?/g, componentName)
    .replace(/\?designqa issue\?/g, designqa)
    .replace(/\?prodqa issue\?/g, prodqa);
  return await _createIssue(title, body, [
    'dev',
    `package: ${packageTarget}`,
  ]).then(issue => {
    console.log(
      `Dev issue created: https://www.github.com/${repoSlug}/issues/${issue}`
    );
    return issue;
  });
}

/**
 * Converts the given issue into an epic
 *
 * @param {string} epicIssue Issue to convert to an epic
 * @returns {Promise<*>} Response object
 * @private
 */
async function _convertToEpic(epicIssue) {
  const convertToEpicUrl = zenhubConvertEpic.replace('issue_number', epicIssue);
  return fetch(`${zenhubHost}${convertToEpicUrl}`, {
    method: 'post',
    headers: {
      'X-Authentication-Token': zenhubToken,
    },
  }).then(response => response.json());
}

/**
 * Adds issues to the epic issue
 *
 * @param {string} epicIssue Issue to convert to an epic
 * @param {Array} issues Array of issue numbers to attach to the epic
 * @returns {Promise<*>} Response object
 * @private
 */
async function _addToEpic(epicIssue, issues = []) {
  const addToEpicUrl = zenhubAddToEpic.replace('issue_number', epicIssue);
  const issuesToAdd = [];
  issues.forEach(issue => {
    issuesToAdd.push({
      repo_id: repoId,
      issue_number: issue,
    });
  });
  return fetch(`${zenhubHost}${addToEpicUrl}`, {
    method: 'post',
    body: JSON.stringify({
      add_issues: issuesToAdd,
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Authentication-Token': zenhubToken,
    },
  }).then(response => response.json());
}

/**
 * Adds dependency links between issues in Zenhub
 *
 * @param {string} issue Issue to add dependency (blocking)
 * @param {string} devIssue Issue to add dependency (blocker)
 * @returns {Promise<*>} Promise response
 * @private
 */
async function _addDependency(issue, devIssue) {
  return fetch(`${zenhubHost}${zenhubCreateDependency}`, {
    method: 'post',
    body: JSON.stringify({
      blocking: {
        repo_id: repoId,
        issue_number: devIssue,
      },
      blocked: {
        repo_id: repoId,
        issue_number: issue,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Authentication-Token': zenhubToken,
    },
  }).then(response => response.json());
}

/**
 * Creates the epic and corresponding issues
 */
async function createEpic() {
  const epic = await _createEpicIssue();
  const designqa = await _createDesignQAIssue();
  const prodqa = await _createProdQAIssue();
  const dev = await _createDevIssue(designqa, prodqa);
  _convertToEpic(epic).then(() => {
    Promise.all([
      _addToEpic(epic, [designqa, prodqa, dev]),
      _addDevToIssue(designqa, dev),
      _addDevToIssue(prodqa, dev),
      _addDependency(designqa, dev),
      _addDependency(prodqa, dev),
    ]).then(() => {
      console.log('Dependencies added to issues');
    });
  });
}

createEpic();
