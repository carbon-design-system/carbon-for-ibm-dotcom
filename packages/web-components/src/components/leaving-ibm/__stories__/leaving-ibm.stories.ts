/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { text, select } from '@storybook/addon-knobs';
import Launch20 from '../../../internal/vendor/@carbon/web-components/icons/launch/20.js';
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
    <c4d-leaving-ibm-container></c4d-leaving-ibm-container>

    ${ctaType === 'Link'
      ? html`
          <c4d-link-with-icon
            icon-placement="right"
            href="${href}"
            data-leaving-ibm>
            ${ctaText}${Launch20({ slot: 'icon' })}
          </c4d-link-with-icon>
        `
      : null}
    ${ctaType === 'Button'
      ? html`
          <c4d-button-group>
            <c4d-button-group-item href="${href}" data-leaving-ibm>
              ${ctaText}${Launch20({ slot: 'icon' })}
            </c4d-button-group-item>
          </c4d-button-group>
        `
      : null}
    ${ctaType === 'Card'
      ? html`
          <c4d-card-link href="${href}" data-leaving-ibm>
            <c4d-card-link-heading>${ctaText}</c4d-card-link-heading>
            <p>Lorem ipsum dolor sit</p>
            <c4d-card-footer> ${Launch20({ slot: 'icon' })} </c4d-card-footer>
          </c4d-card-link>
        `
      : null}
    ${ctaType === 'Feature Card'
      ? html`
          <c4d-feature-card href="${href}" data-leaving-ibm>
            <c4d-image
              slot="image"
              alt="Image alt text"
              default-src="${mediumImgLg1x1}"></c4d-image>
            <c4d-card-heading>${ctaText}</c4d-card-heading>
            <c4d-feature-card-footer>
              ${Launch20({ slot: 'icon' })}
            </c4d-feature-card-footer>
          </c4d-feature-card>
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
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--col-lg-8 cds--no-gutter">
            ${story()}
          </div>
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
