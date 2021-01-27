/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../image/image';
import '../../cta/video-cta-container';
import '../../cta/card-cta';
import '../../cta/card-cta-footer';
import '../../content-group/content-group-copy';
import '../../content-group/content-group-heading';
import '../../content-item/content-item';
import '../../content-item/content-item-heading';
import '../content-group-simple';

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import { CTA_TYPE } from '../../cta/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
};

const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

const heading = 'Lorem ipsum dolor sit amet.';

const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:
  Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
  Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  - [list item](https://www.ibm.com)
    - list item 1a
  1. list item 2
    1. list item 2a
`;

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

const items = [
  {
    heading,
    copy,
  },
  {
    heading,
    copy: copyWithList,
  },
  {
    heading,
    copy,
  },
];

const image = ({ heading: imageHeading } = { heading: undefined }) => html`
  <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="${ifNonNull(imageHeading)}">
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
  </dds-image-with-caption>
`;

export const Default = ({ parameters }) => {
  const { copy: groupCopy, heading: groupHeading } = parameters?.props?.ContentGroupSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.CardCTA ?? {};
  return html`
    <dds-content-group-simple>
      <dds-content-group-heading>${groupHeading}</dds-content-group-heading>
      <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
      ${items.map(
        ({ heading: itemHeading, copy: itemCopy }) => html`
          <dds-content-item>
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
          </dds-content-item>
        `
      )}
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        ${ctaCopy}
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-group-simple>
  `;
};

export const WithImage = ({ parameters }) => {
  const { copy: groupCopy, heading: groupHeading } = parameters?.props?.ContentGroupSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.CardCTA ?? {};
  return html`
    <dds-content-group-simple>
      <dds-content-group-heading>${groupHeading}</dds-content-group-heading>
      <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
      ${image({ heading: groupHeading })}
      ${items.map(
        ({ heading: itemHeading, copy: itemCopy }) => html`
          <dds-content-item>
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
          </dds-content-item>
        `
      )}
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        ${ctaCopy}
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-group-simple>
  `;
};

export const WithVideo = ({ parameters }) => {
  const { copy: groupCopy, heading: groupHeading } = parameters?.props?.ContentGroupSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.CardCTA ?? {};
  return html`
    <dds-content-group-simple>
      <dds-content-group-heading>${groupHeading}</dds-content-group-heading>
      <dds-content-group-copy>${groupCopy}</dds-content-group-copy>
      <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
      ${items.map(
        ({ heading: itemHeading, copy: itemCopy }) => html`
          <dds-content-item>
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
          </dds-content-item>
        `
      )}
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        ${ctaCopy}
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-group-simple>
  `;
};

export default {
  title: 'Components/Content group simple',
  decorators: [
    story => html`
      <dds-video-cta-container class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout">
        ${story()}
      </dds-video-cta-container>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      ContentGroupSimple: ({ groupId }) => ({
        copy: textNullable(
          'Copy text (copy)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.',
          groupId
        ),
        heading: textNullable('Heading (heading)', 'Curabitur malesuada varius mi eu posuere', groupId),
      }),
      CardCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL, groupId);
        return {
          copy: textNullable('Copy text (copy)', 'Lorem ipsum dolor sit amet', groupId),
          ctaType,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.LOCAL], hrefsForType[ctaType ?? CTA_TYPE.LOCAL], groupId),
        };
      },
    },
  },
};
