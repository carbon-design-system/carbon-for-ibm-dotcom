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
import { select, text } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
// import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';
import { CTA_TYPE } from '../../cta/defs';
import imgMax from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--4x3--480x360--005.jpg';

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
  const { heading, cards, ctaType, onClick, alt } = parameters?.props?.CardSectionOffset ?? {};
  const ctaCopy = 'Lorem ipsum dolor sit amet';
  const href = 'https://www.example.com';
  return html`
    <dds-card-section-offset>
      <dds-background-media
        slot="image"
        gradient-direction="left-to-right"
        mobile-position="top"
        alt="${ifNonNull(alt)}"
        default-src="${imgMax}"
      >
        <dds-image-item media="(min-width: 1584px)" srcset="${imgLg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 1312px)" srcset="${imgLg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
        <dds-image-item media="(min-width: 0px)" srcset="${imgSm4x3}"> </dds-image-item>
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
        // image: [
        //   {
        //     src: leadspaceImg,
        //     breakpoint: 'sm',
        //   },
        //   {
        //     src: leadspaceImg,
        //     breakpoint: 'md',
        //   },
        //   {
        //     src: leadspaceImg,
        //     breakpoint: 'lg',
        //   },
        // ],
        alt: text('Image alt text (alt):', 'Image alt text', groupId),
        // defaultSrc: text('Default image (defaultSrc):', leadspaceImg, groupId),
      }),
    },
  },
};
