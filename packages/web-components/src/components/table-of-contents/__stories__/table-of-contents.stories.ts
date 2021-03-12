/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--001.jpg';
import { TOC_TYPES } from '../defs';

export const Default = () => html`
  <dds-table-of-contents>
    ${content()}
  </dds-table-of-contents>
`;

export const WithHeadingContent = ({ parameters }) => {
  const { menuRule } = parameters?.props?.Other ?? {};
  return html`
    <dds-table-of-contents>
      <dds-image slot="heading" alt="Alt text" default-src="${imgLg1x1}">
        <dds-image-item media="(min-width: 1056px)" srcset="${imgXlg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
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

export const Horizontal = () => html`
  <dds-table-of-contents toc-layout="${TOC_TYPES.HORIZONTAL}">
    ${content()}
  </dds-table-of-contents>
`;

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
