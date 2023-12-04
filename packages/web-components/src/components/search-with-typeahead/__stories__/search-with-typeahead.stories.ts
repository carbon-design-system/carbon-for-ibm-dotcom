/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../index';
import readme from './README.stories.mdx';
import styles from '../../carousel/__stories__/carousel.stories.scss';

export const Default = () => html`
  <c4d-search-with-typeahead> </c4d-search-with-typeahead>
`;

export const Alternate = () => html`
  <c4d-search-with-typeahead leadspace-search> </c4d-search-with-typeahead>
`;

export default {
  title: 'Components/Search with typeahead',
  decorators: [
    (story) => {
      return html`
        <style>
          ${styles}
        </style>
        <div class="cds--grid">
          <div class="cds--row">${story()}</div>
        </div>
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
