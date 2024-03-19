/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import storyDocs from './menu-story.mdx';

export const Default = () => {
  return html` <cds-menu>
    <cds-menu-item kind="danger" label="New 1">
      <cds-menu-item kind="danger" label="New 2" />
    </cds-menu-item>
  </cds-menu>`;
};
export default {
  title: 'Components/Menu',
  decorators: [(story) => html` ${story()} `],
  parameters: {
    ...storyDocs.parameters,
  },
};
