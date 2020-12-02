/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../link-list-section';
import '../../content-section/content-section-heading';
// import readme from './README.stories.mdx';


export const Default = ({ parameters }) => {
  return html`
    <dds-content-section>
      <dds-content-section-heading>Lorem ipsum dolor sit amet</dds-content-section-heading>
      <div>
        Bixin corre
      </div>
    </dds-content-section>
  `;
};

export default {
  title: 'Components/Link List Section',
  parameters: {
    // ...readme.parameters,
    hasGrid: true,
  },
  decorators: [
    (story) => {
      return html`
        <div>
          ${story()}
        </div>
      `;
    },
  ],
};
