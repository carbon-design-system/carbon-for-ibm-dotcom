/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
// import readme from './README.stories.mdx';
import '../button-group';
import '../button-group-item';

export const Default = ({ parameters }) => {
  return html`
    <div>
      <dds-button-group>
        <dds-button-group-item>Lorem ipsum</dds-button-group-item>
        <dds-button-group-item>Dolor sit amet</dds-button-group-item>
      </dds-button-group>
    </div>
  `;
};

export default {
  title: 'Components/Button Group',
  parameters: {
    // ...readme.parameters,
    // knobs: {
    //   Card: ({ groupId }) => ({
    //     eyebrow: textNullable('Card Eyebrow (eyebrow):', 'eyebrow text', groupId),
    //     heading: textNullable('Card Heading (heading):', 'Lorem ipsum dolor sit amet', groupId),
    //   }),
    // },
  },
};
