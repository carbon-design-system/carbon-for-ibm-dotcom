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
import Launch20 from 'carbon-web-components/es/icons/launch/20.js';
import styles from './leaving-ibm.stories.scss';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--002.jpg';
import imgMax2x1 from '../../../../../storybook-images/assets/1584/fpo--2x1--1312x656--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';
import '../leaving-ibm-container';

import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { href, ctaText, ctaType } = parameters?.props?.['leaving-ibm'] ?? {};
  return html`
    <dds-leaving-ibm-container></dds-leaving-ibm-container>

    ${ctaType === 'Link'
      ? html`
      <bx-link href="${href}" data-leaving-ibm>
        ${ctaText}${Launch20({ slot: 'icon' })}
      </bx-link></li>
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
            <dds-card-footer>
              ${Launch20({ slot: 'icon' })}
            </dds-card-footer>
          </dds-card-link>
        `
      : null}
    ${ctaType === 'Feature Card'
      ? html`
          <dds-feature-card size="large" href="${href}" data-leaving-ibm>
            <dds-image slot="image" default-src="${imgLg1x1}">
              <dds-image-item media="(min-width: 1312px)" srcset="${imgMax2x1}"> </dds-image-item>
              <dds-image-item media="(min-width: 1056px)" srcset="${imgXlg2x1}"> </dds-image-item>
              <dds-image-item media="(min-width: 991px)" srcset="${imgXlg2x1}"> </dds-image-item>
              <dds-image-item media="(min-width: 672px)" srcset="${imgLg2x1}"> </dds-image-item>
              <dds-image-item media="(min-width: 0px)" srcset="${imgSm2x1}"> </dds-image-item>
            </dds-image>
            <dds-card-eyebrow>Lorem ipsum</dds-card-eyebrow>
            <dds-card-heading>${ctaText}</dds-card-heading>
            <p>Lorem ipsum dolor sit amet</p>
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
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => ({
        ctaText: text('CTA text', 'Learn more about Carbon', groupId),
        href: text('href (href)', 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/', groupId),
        ctaType: select('CTA type:', ctaTypes, ctaTypes[0], groupId),
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
