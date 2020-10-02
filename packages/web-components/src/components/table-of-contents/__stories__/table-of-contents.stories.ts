/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { nothing } from 'lit-html';
import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import '../table-of-contents';
import '../../horizontal-rule/horizontal-rule';
import '../../image/image';
import content from './content';
import styles from './table-of-contents.stories.scss';
import readme from './README.stories.mdx';

export const Default = () => html`
  <dds-table-of-contents>
    ${content()}
  </dds-table-of-contents>
`;

export const WithHeadingContent = ({ parameters }) => {
  const { menuRule } = parameters?.props?.Other ?? {};
  return html`
    <dds-table-of-contents>
      <dds-image slot="heading" alt="Alt text" default-src="https://dummyimage.com/672x672">
        <dds-image-item media="(min-width: 1056px)" srcset="https://dummyimage.com/672x672&amp;text=Example%20Children">
        </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="https://dummyimage.com/672x200&amp;text=Example%20Children">
        </dds-image-item>
        <dds-image-item media="(min-width: 400px)" srcset="https://dummyimage.com/672x200&amp;text=Example%20Children">
        </dds-image-item>
      </dds-image>
      ${!menuRule
        ? nothing
        : html`
            <dds-hr slot="menu-rule"></dds-hr>
          `}
      ${content()}
    </dds-table-of-contents>
  `;
};

WithHeadingContent.story = {
  parameters: {
    knobs: {
      Other: () => ({
        menuRule: boolean('Put a horizontal rule', false),
      }),
    },
  },
};

export default {
  title: 'Components/Table of contents',
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
  },
};
