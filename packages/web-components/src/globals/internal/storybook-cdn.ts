/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import packageJson from '../../../package.json';

/* eslint-disable import/prefer-default-export,max-len */

/**
 * Renders the component(s) script tag content and returns back the string
 *
 * @param {Array} components array of component names
 * @param {string} tag tag folder
 */
function _renderScript(components, tag) {
  let scripts = '';
  components.forEach(component => {
    scripts += `<script type="module" src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/${tag}/${component}.min.js"></script>\n`;
  });
  return scripts;
}

/**
 * Renders the component(s) style tag content and returns back the string
 *
 * @param {Array} components array of component names
 * @param {string} tag tag folder
 */
function _renderStyle(components, tag) {
  let styles = '';
  components.forEach(component => {
    styles += `<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/${tag}/${component}.css" />\n`;
  });
  return styles;
}

/**
 * This is the markdown block for JS via CDN
 *
 * @param {Array} components array of components to render
 */
export const cdnJs = ({ components }) => {
  return `
### JS (via CDN)

\`\`\`html
// SPECIFIC VERSION (available starting v1.6.0)
${_renderScript(components, `v${packageJson.version}`)}

// LATEST tag
${_renderScript(components, 'latest')}

// NEXT tag
${_renderScript(components, 'next')}

// BETA tag
${_renderScript(components, 'beta')}
\`\`\`

> NOTE: The latest/next/beta tags are moving versions. While beneficial to
> always stay on the most recent version, it is recommended to choose a specific
> version and properly test your application when upgrading to a newer version.
  `;
};

/**
 * This is the markdown block for Additional CSS via CDN
 *
 * @param {Array} components array of components to render
 */
export const cdnCssAdditional = ({ components }) => {
  return `
### CSS (via CDN)

This component includes additional styles that are used on the page level in
order for the component to behave properly. If not including the SCSS version
in your application's style bundle, this can be included via CDN:

\`\`\`html
// SPECIFIC VERSION (available starting v1.6.0)
${_renderStyle(components, `v${packageJson.version}`)}

// LATEST tag
${_renderStyle(components, 'latest')}

// NEXT tag
${_renderStyle(components, 'next')}

// BETA tag
${_renderStyle(components, 'beta')}
\`\`\`
  `;
};

/**
 * This is the markdown block for CSS via CDN
 */
export const cdnCss = () => {
  return `
### CSS (optional)

There is an optional CDN artifact available that will run the Carbon reset as
well as import Plex fonts necessary for the page. This can be included if your
application does not already take these steps:

\`\`\`html
// SPECIFIC VERSION (available starting v1.6.0)
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/v${packageJson.version}/plex.css" />

// LATEST tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/latest/plex.css" />

// NEXT tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/next/plex.css" />

// BETA tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/beta/plex.css" />
\`\`\`
  `;
};
