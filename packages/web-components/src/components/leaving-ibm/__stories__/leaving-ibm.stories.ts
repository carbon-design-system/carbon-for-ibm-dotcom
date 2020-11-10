/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import styles from './leaving-ibm.stories.scss';
import '../leaving-ibm-composite';

import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { open } = parameters?.props?.['leaving-ibm'] ?? {};
  return html`
    <dds-leaving-ibm-composite ?open=${open}> </dds-leaving-ibm-composite>
  `;
};

export default {
  title: 'Components/Leaving IBM',
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => ({
        open: boolean('Open (open)', true, groupId),
      }),
    },
    decorators: [
      story => html`
        <style>
          ${styles}
        </style>
        ${story()}
      `,
    ],
  },
};
