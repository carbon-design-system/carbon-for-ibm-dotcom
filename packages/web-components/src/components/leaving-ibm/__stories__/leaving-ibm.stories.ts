/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { text, select } from '@storybook/addon-knobs';
import Launch20 from '@carbon/web-components/es/icons/launch/20.js';
import styles from './leaving-ibm.stories.scss';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import '../index';
import '../../link-with-icon/index';
import '../../button-group/index';
import '../../card-link/index';
import '../../feature-card/index';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { href, ctaText, ctaType } = args?.['leaving-ibm'] ?? {};
  return html`
    <dds-leaving-ibm-container></dds-leaving-ibm-container>

    ${ctaType === 'Link'
      ? html`
          <dds-link-with-icon
            icon-placement="right"
            href="${href}"
            data-leaving-ibm
          >
            ${ctaText}${Launch20({ slot: 'icon' })}
          </dds-link-with-icon>
        `
      : null}
    ${ctaType === 'Button'
      ? html`
          <dds-button-group>
            <dds-button-group-item href="${href}" data-leaving-ibm>
              ${ctaText}${Launch20({ slot: 'icon' })}
            </dds-button-group-item>
          </dds-button-group>
        `
      : null}
    ${ctaType === 'Card'
      ? html`
          <dds-card-link href="${href}" data-leaving-ibm>
            <dds-card-link-heading>${ctaText}</dds-card-link-heading>
            <p>Lorem ipsum dolor sit</p>
            <dds-card-footer> ${Launch20({ slot: 'icon' })} </dds-card-footer>
          </dds-card-link>
        `
      : null}
    ${ctaType === 'Feature Card'
      ? html`
          <dds-feature-card href="${href}" data-leaving-ibm>
            <dds-image
              slot="image"
              alt="Image alt text"
              default-src="${mediumImgLg1x1}"
            ></dds-image>
            <dds-card-heading>${ctaText}</dds-card-heading>
            <dds-feature-card-footer>
              ${Launch20({ slot: 'icon' })}
            </dds-feature-card-footer>
          </dds-feature-card>
        `
      : null}
  `;
};

const ctaTypes = ['Link', 'Button', 'Card', 'Feature Card'];

export default {
  title: 'Components/Leaving IBM',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': () => ({
        ctaText: text('CTA text', 'Learn more about Carbon'),
        href: text(
          'href (href)',
          'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/'
        ),
        ctaType: select('CTA type:', ctaTypes, ctaTypes[0]),
      }),
    },
    propsSet: {
      default: {
        'leaving-ibm': {
          ctaText: 'Learn more about Carbon',
          href: 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/',
          ctaType: 'Link',
        },
      },
    },
  },
};
