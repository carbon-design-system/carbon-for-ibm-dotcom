/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';
import '../content-section';

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.ContentSection ?? {};
  return html`
    <dds-content-section heading=${heading}>
      <dds-card-group></dds-card-group>
    </dds-content-section>
  `;
};

export default {
  title: 'Components/Content Section',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    knobs: {
      ContentSection: ({ groupId }) => ({
        heading: textNullable('Card Heading (heading):', 'Explore AI use cases in all industries', groupId),
      }),
      ...readme.parameters,
    },
  },
};
