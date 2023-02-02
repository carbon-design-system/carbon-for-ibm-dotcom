/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import './ordered-list';
import './unordered-list';
import './list-item';
import { boolean } from '@storybook/addon-knobs';
import storyDocs from './list-story.mdx';

export const ordered = (args) => {
  const { isExpressive } = args?.['bx-list'] ?? {};
  return html`
    <cds-ordered-list ?isExpressive="${isExpressive}">
      <cds-list-item>
        Ordered List level 1
        <cds-ordered-list ?isExpressive="${isExpressive}">
          <cds-list-item>Ordered List level 2</cds-list-item>
          <cds-list-item>
            Ordered List level 2
            <cds-ordered-list ?isExpressive="${isExpressive}">
              <cds-list-item>Ordered List level 2</cds-list-item>
              <cds-list-item>Ordered List level 2</cds-list-item>
            </cds-ordered-list>
          </cds-list-item>
        </cds-ordered-list>
      </cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
    </cds-ordered-list>
  `;
};

export const unordered = (args) => {
  const { isExpressive } = args?.['bx-list'] ?? {};
  return html`
    <cds-unordered-list ?isExpressive="${isExpressive}">
      <cds-list-item>
        Unordered List level 1
        <cds-unordered-list ?isExpressive="${isExpressive}">
          <cds-list-item>Unordered List level 2</cds-list-item>
          <cds-list-item>
            Unordered List level 2
            <cds-unordered-list ?isExpressive="${isExpressive}">
              <cds-list-item>Unordered List level 2</cds-list-item>
              <cds-list-item>Unordered List level 2</cds-list-item>
            </cds-unordered-list>
          </cds-list-item>
        </cds-unordered-list>
      </cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
    </cds-unordered-list>
  `;
};

export default {
  title: 'Components/List',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-list': () => ({
        isExpressive: boolean('Expressive (isExpressive)', false),
      }),
    },
  },
};
