/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import '../tag-link';

export const Default = args => {
  const { copy, href } = args ?? {};
  return html`
    <dds-tag-link href=${ifNonNull(href || undefined)}> ${copy} </dds-tag-link>
  `;
};

export default {
  title: 'Components/Tag link',
  component: 'dds-tag-link',
  decorators: [
    story =>
      html`
        <div class="bx--grid">${story()}</div>
      `,
  ],
  argTypes: {
    href: {
      control: 'text',
      defaultValue: 'https://example.com',
    },
    copy: {
      control: 'text',
      defaultValue: 'Brand: Watson',
    },
    hreflang: {
      table: {
        disable: true,
      },
    },
    ping: {
      table: {
        disable: true,
      },
    },
    rel: {
      table: {
        disable: true,
      },
    },
    target: {
      table: {
        disable: true,
      },
    },
    linkRole: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    'link-role': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
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
