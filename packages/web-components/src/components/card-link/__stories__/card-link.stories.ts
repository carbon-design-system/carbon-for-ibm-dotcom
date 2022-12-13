/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import Error20 from '@carbon/web-components/es/icons/error/20.js';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import '../index';

export const Default = args => {
  const { disabled, href, heading, copy } = args;

  const copyNode = document.querySelector('dds-card-link p p');
  if (copyNode) {
    (copyNode as HTMLElement).innerText = copy;
  }

  return html`
    <dds-card-link ?disabled=${disabled} href=${ifNonNull(href || undefined)}>
      <dds-card-link-heading>${heading}</dds-card-link-heading>
      ${copy
        ? html`
            <p>${copy}</p>
          `
        : ``}
      <dds-card-footer ?disabled=${disabled}>
        ${disabled ? Error20({ slot: 'icon' }) : ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card-link>
  `;
};

export default {
  title: 'Components/Card link',
  component: 'dds-card-link',
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    href: {
      control: { type: 'text' },
      defaultValue: 'https://example.com',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Explore AI use cases in all industries',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: '',
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
    border: {
      table: {
        disable: true,
      },
    },
    'color-scheme': {
      table: {
        disable: true,
      },
    },
    'pictogram-placement': {
      table: {
        disable: true,
      },
    },
    download: {
      table: {
        disable: true,
      },
    },
    logo: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    colorScheme: {
      table: {
        disable: true,
      },
    },
    pictogramPlacement: {
      table: {
        disable: true,
      },
    },
    eyebrow: {
      table: {
        disable: true,
      },
    },
    image: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div
            class="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter"
          >
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        CardLink: {
          disabled: false,
          href: 'https://example.com',
          heading: 'Explore AI use cases in all industries',
          copy: '',
        },
      },
    },
  },
};
