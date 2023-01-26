/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../index';
import '../../dotcom-shell/dotcom-shell-container';
import readme from './README.stories.mdx';
import { StoryContent } from './data/content';
import styles from './back-to-top.stories.scss';

export const Default = () => {
  return html`
    <style>
      ${styles}
    </style>
    <dds-dotcom-shell-container>
      ${StoryContent()}
      <dds-back-to-top></dds-back-to-top>
    </dds-dotcom-shell-container>
  `;
};

export default {
  title: 'Components/Back to top',
  parameters: {
    ...readme.parameters,
  },
};
