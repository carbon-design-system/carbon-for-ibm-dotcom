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
import ArrowLeft20 from 'carbon-web-components/es/icons/arrow--left/20.js';
import '../table-of-contents';
import '../../horizontal-rule/horizontal-rule';
import '../../image/image';
import '../../link-list/link-list';
import content from './content';
import styles from './table-of-contents.stories.scss';
import readme from './README.stories.mdx';
import { TOC_TYPES } from '../defs';
import { ICON_PLACEMENT } from '../../../globals/defs';

export const Default = ({ parameters }) => {
  const { withHeadingContent } = parameters?.props?.Other ?? {};
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
      ${content('bx--tableofcontents__contents')}
    </dds-table-of-contents>
  `;
};

export const Horizontal = () => html`
  <dds-table-of-contents toc-layout="${TOC_TYPES.HORIZONTAL}">
    <div class="bx--row">
      <div class="bx--col-lg-12">
        ${content('bx--tableofcontents-horizontal__contents')}
      </div>
    </div>
  </dds-table-of-contents>
`;

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
      Other: () => ({
        withHeadingContent: boolean('With heading content', false),
      }),
    },
  },
};
