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
import { boolean, select, text } from '@storybook/addon-knobs';
import ArrowLeft20 from 'carbon-web-components/es/icons/arrow--left/20.js';
import '../table-of-contents';
import '../../horizontal-rule/horizontal-rule';
import '../../image/image';
import '../../link-list/link-list';
import content, { headings, LOREM } from './content';
import styles from './table-of-contents.stories.scss';
import readme from './README.stories.mdx';
import { TOC_TYPES } from '../defs';
import { ICON_PLACEMENT } from '../../../globals/defs';

export const Default = ({ parameters }) => {
  const { numberOfItems: items, withHeadingContent } = parameters?.props?.Other ?? {};
  return html`
    <dds-table-of-contents>
      ${withHeadingContent
        ? html`
            <dds-link-list type="vertical" slot="heading">
              <dds-link-list-item
                icon-placement="${ICON_PLACEMENT.LEFT}"
                href="https://github.com/carbon-design-system/carbon-web-components"
              >
                DevOps${ArrowLeft20({ slot: 'icon' })}
              </dds-link-list-item>
              <dds-link-list-item
                icon-placement="${ICON_PLACEMENT.LEFT}"
                href="https://github.com/carbon-design-system/carbon-web-components"
              >
                Automation${ArrowLeft20({ slot: 'icon' })}
              </dds-link-list-item>
              <dds-link-list-item
                icon-placement="${ICON_PLACEMENT.LEFT}"
                href="https://github.com/carbon-design-system/carbon-web-components"
              >
                Development${ArrowLeft20({ slot: 'icon' })}
              </dds-link-list-item>
            </dds-link-list>
            <dds-hr slot="menu-rule"></dds-hr>
          `
        : nothing}
      ${content({ contentClass: 'bx--tableofcontents__contents', items })}
    </dds-table-of-contents>
  `;
};

export const Horizontal = ({ parameters }) => {
  const { numberOfItems: items } = parameters?.props?.Other ?? {};
  return html`
    <dds-table-of-contents toc-layout="${TOC_TYPES.HORIZONTAL}">
      <div class="bx--row">
        <div class="bx--col-lg-12">
          ${content({ contentClass: 'bx--tableofcontents-horizontal__contents', items })}
        </div>
      </div>
    </dds-table-of-contents>
  `;
};

Horizontal.story = {
  name: 'Horizontal',
  parameters: {
    knobs: {
      Other: ({ groupId }) => ({
        numberOfItems: Array.from({
          length: select('Number of items', [5, 6, 7, 8], 5, groupId),
        }).map((_, i) => ({
          heading: text(`Section ${i + 1} heading`, headings[i % headings.length], groupId),
          copy: text(`Section ${i + 1} copy`, `${LOREM}\n`.repeat(3).trim(), groupId),
        })),
      }),
    },
    propsSet: {
      default: {
        Other: {
          numberOfItems: [
            { heading: 'Section 1 heading', copy: 'Section 1 copy' },
            { heading: 'Section 2 heading', copy: 'Section 2 copy' },
            { heading: 'Section 3 heading', copy: 'Section 3 copy' },
            { heading: 'Section 4 heading', copy: 'Section 4 copy' },
            { heading: 'Section 5 heading', copy: 'Section 5 copy' },
          ],
        },
      },
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
      <div class="bx--grid" style="padding: 0">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      Other: ({ groupId }) => ({
        withHeadingContent: boolean('With heading content', false, groupId),
        numberOfItems: Array.from({
          length: select('Number of items', [5, 6, 7, 8], 5, groupId),
        }).map((_, i) => ({
          heading: text(`Section ${i + 1} heading`, headings[i % headings.length], groupId),
          copy: text(`Section ${i + 1} copy`, `${LOREM}\n`.repeat(3).trim(), groupId),
        })),
      }),
    },
    propsSet: {
      default: {
        Other: {
          withHeadingContent: false,
          numberOfItems: [
            { heading: 'Section 1 heading', copy: 'Section 1 copy' },
            { heading: 'Section 2 heading', copy: 'Section 2 copy' },
            { heading: 'Section 3 heading', copy: 'Section 3 copy' },
            { heading: 'Section 4 heading', copy: 'Section 4 copy' },
            { heading: 'Section 5 heading', copy: 'Section 5 copy' },
          ],
        },
      },
    },
  },
};
