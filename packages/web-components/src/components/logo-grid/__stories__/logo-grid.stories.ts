/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../logo-grid';
import '../../content-block/content-block-heading';
import '../logo-grid-item';
import '../logo-grid-link';
import '../../card-link/card-link-heading';
import '../../card/card-footer';
import { html } from 'lit-element';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import logos from './data/logos.js';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { heading, footer } = args ?? {};

  const logoGridHeading = document.querySelector('dds-content-block-heading');

  if (logoGridHeading) {
    logoGridHeading!.shadowRoot!.textContent = heading;
  }

  return html`
    <dds-logo-grid
      ?hide-border="${args['hide-border']}"
      logo-count="${args['logo-count']}"
      logo-ratio="${args['logo-ratio']}">
      <dds-content-block-heading> ${heading} </dds-content-block-heading>
      ${logos &&
      logos.map(
        (elem) => html`
          <dds-logo-grid-item
            default-src="${elem.imgSrc}"
            alt="${elem.altText}"></dds-logo-grid-item>
        `
      )}
      ${footer
        ? html`
            <dds-logo-grid-link href="http://local.url.com/">
              <dds-card-link-heading
                >Lorem ipsum dolor sit amet</dds-card-link-heading
              >
              <dds-card-footer>
                ${ArrowRight20({ slot: 'icon' })}
              </dds-card-footer>
            </dds-logo-grid-link>
          `
        : ''}
    </dds-logo-grid>
  `;
};

export default {
  title: 'Components/Logo grid',
  component: 'dds-logo-grid',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-md-8 bx--col-lg-12">${story()}</div>
        </div>
      </div>
    `,
  ],
  argTypes: {
    heading: {
      control: 'text',
      defaultValue: 'Our customers',
    },
    'logo-count': {
      control: { type: 'select' },
      options: ['3', '4'],
      defaultValue: '3',
    },
    'logo-ratio': {
      control: { type: 'select' },
      options: ['4:3', '16:9', '2:1'],
      defaultValue: '4:3',
    },
    'hide-border': {
      control: 'boolean',
      defaultValue: false,
    },
    footer: {
      control: 'boolean',
      defaultValue: false,
    },
    'complementary-style-scheme': {
      table: {
        disable: true,
      },
    },
    logoCount: {
      table: {
        disable: true,
      },
    },
    logoRatio: {
      table: {
        disable: true,
      },
    },
    hideBorder: {
      table: {
        disable: true,
      },
    },
    complementaryStyleScheme: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    copy: {
      table: {
        disable: true,
      },
    },
    media: {
      table: {
        disable: true,
      },
    },
    complementary: {
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
        LogoGrid: {
          heading: 'Our customers',
          logoCount: '3',
          logoRatio: '4:3',
          logosGroup: logos,
          hideBorder: false,
          showCta: false,
          ctaCopy: 'Lorem ipsum dolor sit amet',
          ctaHref: 'http://local.url.com',
        },
      },
    },
  },
};
