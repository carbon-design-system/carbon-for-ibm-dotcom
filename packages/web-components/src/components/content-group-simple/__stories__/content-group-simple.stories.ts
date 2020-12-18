/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';
import '../../image/image';
import '../../cta/video-cta-container';
import '../../cta/card-cta';
import '../../cta/card-cta-footer';
import '../../content-group/content-group-heading';
import '../../content-item/content-item';
import '../../content-item/content-item-heading';
import '../content-group-simple';

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
    1. list item 1a
  1. list item 2
    - list item 2a
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
  <dds-image-with-caption
    slot="media"
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    heading="${ifNonNull(imageHeading)}"
  >
    <dds-image-item
      media="(min-width: 672px)"
      srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
    <dds-image-item
      media="(min-width: 400px)"
      srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
    <dds-image-item
      media="(min-width: 320px)"
      srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
  </dds-image-with-caption>
`;

export const Default = ({ parameters }) => {
  const { copy: groupCopy, heading: groupHeading } = parameters?.props?.ContentGroupSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.CardCTA ?? {};
  return html`
    <dds-content-group-simple>
      <dds-content-group-heading>${groupHeading}</dds-content-group-heading>
      <dds-content-item-copy>${groupCopy}</dds-content-item-copy>
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
        <dds-card-cta-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-cta-footer>
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
      <dds-content-item-copy>${groupCopy}</dds-content-item-copy>
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
        <dds-card-cta-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-cta-footer>
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
      <dds-content-item-copy>${groupCopy}</dds-content-item-copy>
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
        <dds-card-cta-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-group-simple>
  `;
};

export default {
  title: 'Components/Content group simple',
  decorators: [
    story => html`
      <dds-video-cta-container class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
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
        const ctaType = select('CTA type (cta-type)', ctaTypes, null, groupId);
        return {
          copy: textNullable('Copy text (copy)', 'Lorem ipsum dolor sit amet', groupId),
          ctaType,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};
