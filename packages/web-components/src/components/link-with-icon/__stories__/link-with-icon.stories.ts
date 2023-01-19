/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { disabled, href, placement } = args ?? {};
  return html`
    <dds-link-with-icon
      icon-placement="${placement}"
      ?disabled="${disabled}"
      href="${href}">
      ${args['link-text']}${ArrowRight20({ slot: 'icon' })}
    </dds-link-with-icon>
  `;
};

const placementTypes = ['left', 'right'];

export default {
  title: 'Components/Link with icon',
  component: 'dds-link-with-icon',
  decorators: [(story) => html` <div class="bx--grid">${story()}</div> `],
  argTypes: {
    'link-text': {
      control: 'text',
      defaultValue: 'Link text',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    href: {
      control: 'text',
      defaultValue:
        'https://github.com/carbon-design-system/carbon-for-ibm-dotcom',
    },
    placement: {
      control: { type: 'select' },
      options: placementTypes,
      defaultValue: placementTypes[1],
      description: `Icon placement(right (default) | left) ICON_PLACEMENT`,
    },
    'icon-placement': {
      table: {
        disable: true,
      },
    },
    iconPlacement: {
      table: {
        disable: true,
      },
    },
    hreflang: {
      table: {
        disable: true,
      },
    },
    role: {
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
    type: {
      table: {
        disable: true,
      },
    },
    iconInline: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    download: {
      table: {
        disable: true,
      },
    },
    linkRole: {
      table: {
        disable: true,
      },
    },
    ping: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    'icon-left': {
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
        LinkWithIcon: {
          children: 'Link text',
          disabled: false,
          href: 'https://github.com/carbon-design-system/carbon-web-components',
          'icon-placement': 'right',
        },
      },
    },
  },
};
