/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, text } from '@storybook/addon-knobs';
import styles from './leaving-ibm.stories.scss';
import '../leaving-ibm-container';

import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { open, href } = parameters?.props?.['leaving-ibm'] ?? {};
  return html`
    <dds-leaving-ibm-container ?open=${open} href="${href}"> </dds-leaving-ibm-container>
  `;
};

export default {
  title: 'Components/Leaving IBM',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      ${story()}
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => ({
        open: boolean('open (open)', true, groupId),
        href: text('href (href)', 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/', groupId),
      }),
    },
    propsSet: {
      default: {
        'leaving-ibm': {
          open: true,
          href: 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/',
        },
      },
    },
  },
};
