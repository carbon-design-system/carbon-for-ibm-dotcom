/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../content-group-pictograms';
import { html } from 'lit-element';
import textNullable from '../../../../.storybook/knob-text-nullable';

export default {
  title: 'Components/Content group pictograms',
  decorators: [
    story => html`
      <div>${story()}</div>
    `,
  ],
  parameters: {
    knobs: {
      ContentGroupPictograms: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Copy (copy)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, copy } = parameters?.props?.ContentGroupPictograms ?? {};
  return html`
    <dds-content-group-pictograms .copy="${copy}">
      <dds-content-group-heading>${heading}</dds-content-group-heading>
    </dds-content-group-pictograms>
  `;
};
