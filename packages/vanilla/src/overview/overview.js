/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './markdown.css';
import README from '../../README.md';
import showdown from 'showdown';

export default {
  title: 'Overview|Get Started',
};

export const Default = () => {
  const converter = new showdown.Converter();
  return `<div class="storybook-center-container"><div class="markdown-body">${converter.makeHtml(
    README
  )}</div></div>`;
};

Default.story = {
  title: 'Read Me',
};
