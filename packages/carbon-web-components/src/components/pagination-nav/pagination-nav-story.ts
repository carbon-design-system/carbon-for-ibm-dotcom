/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Download16 from '@carbon/web-components/es/icons/download/16';
import storyDocs from './pagination-nav-story.mdx';
import './index';
import { boolean, number } from '@storybook/addon-knobs';

export const Default = (args) => {
  const { itemsShown, totalItems, page, loop } =
    args?.['bx-pagination-nav'] ?? {};
  return html`
    <bx-pagination-nav
      items-shown="${itemsShown}"
      total-items="${totalItems}"
      page="${page}"
      ?loop=${loop}></bx-pagination-nav>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Pagination Nav',
  parameters: {
    ...storyDocs.parameters,
    actions: {
      handles: ['bx-page-changed bx-pagination-nav'],
    },
    knobs: {
      'bx-pagination-nav': () => ({
        itemsShown: number('Visible Pages (itemsShown)', 8, { min: 5 }),
        totalItems: number('Total Pages (totalItems)', 30),
        page: number('Active Page (page)', 0, { min: 0 }),
        loop: boolean('Loop (loop)', false),
      }),
    },
  },
};
