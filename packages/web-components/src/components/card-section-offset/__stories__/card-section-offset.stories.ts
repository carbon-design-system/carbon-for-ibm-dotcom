/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import { CTA_TYPE } from '../../cta/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

const defaultCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-eyebrow>Label</dds-card-eyebrow>
    <dds-card-heading>Lorem ipsum dolor sit amet, pro graeco tibique an</dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis
    </p>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { heading, cards, ctaType, onClick, alt, defaultSrc } = parameters?.props?.CardSectionOffset ?? {};
  const ctaCopy = 'Lorem ipsum dolor sit amet';
  const href = 'https://www.example.com';
  return html`
    <dds-card-section-offset>
      <dds-background-media
        gradient-direction="left-to-right"
        mobile-position="top"
        alt="${ifNonNull(alt)}"
        default-src="${ifNonNull(defaultSrc)}"
      >
      </dds-background-media>
      <dds-content-block-heading slot="heading">${heading}</dds-content-block-heading>
      <dds-text-cta
        slot="action"
        cta-type="${ifNonNull(ctaType)}"
        icon-placement="right"
        href="${ifNonNull(href)}"
        @click="${onClick}"
      >
        ${ctaCopy}
      </dds-text-cta>
      <dds-card-group slot="card-group" cards-per-row="2">
        <dds-card-group-item empty></dds-card-group-item>${cards}
      </dds-card-group>
    </dds-card-section-offset>
  `;
};

export default {
  title: 'Components/Card section offset',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          ${story()}
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      CardSectionOffset: ({ groupId }) => ({
        heading: 'Aliquam condimentum interdum',
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL, groupId),
        cards: Array.from({
          length: 3,
        }).map(() => defaultCardGroupItem),
        alt: textNullable('Alt text', 'Image alt text', groupId),
        defaultSrc: textNullable('Default image (default-src)', imgLg16x9, groupId),
      }),
    },
  },
};
