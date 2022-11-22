/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import '../tag-link';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = (args) => {
  const { copy, href } = args?.TagLink ?? {};
  return html`
    <dds-tag-link href=${ifNonNull(href || undefined)}> ${copy} </dds-tag-link>
  `;
};

export default {
  title: 'Components/Tag link',
  decorators: [(story) => html` <div class="bx--grid">${story()}</div> `],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      TagLink: () => ({
        copy: textNullable('Tag Link (copy)', 'Brand: Watson'),
        href: textNullable('Tag Link (href)', `https://example.com`),
      }),
    },
    propsSet: {
      default: {
        TagLink: {
          copy: 'Brand: Watson',
          href: 'https://example.com',
        },
      },
    },
  },
};
