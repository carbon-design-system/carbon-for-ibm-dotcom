/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../index';
import readme from './README.stories.mdx';
import styles from '../../carousel/__stories__/carousel.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { boolean } from '@storybook/addon-knobs';

export const Default = (args) => {
  const { initialSearchTerm, openOnLoad, shouldRemainOpen } =
    args?.SearchWithTypeahead ?? {};
  return html`
    <c4d-search-with-typeahead
      initial-search-term="${initialSearchTerm}"
      ?active=${openOnLoad}
      ?should-remain-open=${shouldRemainOpen}>
    </c4d-search-with-typeahead>
  `;
};

export const Alternate = (args) => {
  const { initialSearchTerm, openOnLoad, shouldRemainOpen } =
    args?.SearchWithTypeahead ?? {};
  return html`
    <c4d-search-with-typeahead
      initial-search-term="${initialSearchTerm}"
      leadspace-search
      ?active=${openOnLoad}
      ?should-remain-open=${shouldRemainOpen}>
    </c4d-search-with-typeahead>
  `;
};

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
    knobs: {
      SearchWithTypeahead: () => ({
        initialSearchTerm: textNullable(
          'Initial search term (initial-search-term)',
          ''
        ),
        openOnLoad: boolean('Open on load (active)', false),
        shouldRemainOpen: boolean(
          'Should remain open (should-remain-open)',
          false
        ),
      }),
    },
    propsSet: {
      default: {
        SearchWithTypeahead: {
          initialSearchTerm: '',
          openOnLoad: false,
          shouldRemainOpen: false,
        },
      },
    },
  },
};
