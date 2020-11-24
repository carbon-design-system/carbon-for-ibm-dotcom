/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../image-with-caption/image-with-caption';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-copy';
import '../../content-group/content-group-heading';
import '../../content-item/content-item-copy';
import '../../cta/text-cta';
import '../../video-player/video-player-container';
import '../../content-block/content-block-complementary';
import '../../link-list/link-list';
import '../content-block-segmented-item';
import '../content-block-segmented';
import { CTA_STYLE, CTA_TYPE } from '../../cta/shared-enums';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
};

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const ctaStyles = {
  [`Card (${CTA_STYLE.CARD})`]: CTA_STYLE.CARD,
  [`Text (${CTA_STYLE.TEXT})`]: CTA_STYLE.TEXT,
};

const complementaryStyleSchemes = {
  'Regular style scheme': null,
  // eslint-disable-next-line max-len
  [`With border (${CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER})`]: CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};
const image = html`
  <dds-image-with-caption
    slot="media"
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    heading="Mauris iaculis eget dolor nec hendrerit."
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

const video = html`
  <dds-video-player-container slot="media" video-id="0_uka1msg4"></dds-video-player-container>
`;

const contentItemCopy =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ' +
  'sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus ' +
  'efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, ' +
  'tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec ' +
  'quis pretium odio, in dignissim sapien. Lorem ipsum dolor sit amet, ' +
  'consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque ' +
  'diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus ' +
  'turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium ' +
  'elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.';

export const Default = ({ parameters }) => {
  const { heading, copy, ctaStyle, ctaType } = parameters?.props?.ContentBlockSimple ?? {};
  return html`
    <dds-content-block-segmented>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy slot="copy">${copy}</dds-content-block-copy>
      ${image}
      <dds-content-block-segmented-item>
        <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
        <dds-content-item-copy>${contentItemCopy}</dds-content-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
          >Lorem Ipsum dolor sit</dds-text-cta
        >
      </dds-content-block-segmented-item>
      <dds-content-block-segmented-item>
        <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
        <dds-content-item-copy>${contentItemCopy}</dds-content-item-copy>
        ${image}
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
          >Lorem Ipsum dolor sit</dds-text-cta
        >
      </dds-content-block-segmented-item>
      ${ctaStyle === 'text'
        ? html`
            <dds-text-cta slot="cta" cta-type=${ctaType} icon-placement="right" href=${hrefsForType[ctaType]}
              >Lorem ipsum dolor</dds-text-cta
            >
          `
        : html`
            <dds-card-cta slot="cta" cta-type=${ctaType} href=${hrefsForType[ctaType]}>
              Lorem ipsum dolor
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-cta>
          `}
    </dds-content-block-segmented>
  `;
};

export const withVideo = ({ parameters }) => {
  const { heading, copy, ctaStyle, ctaType } = parameters?.props?.ContentBlockSimple ?? {};
  return html`
    <dds-content-block-segmented>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy slot="copy">${copy}</dds-content-block-copy>
      ${video}
      <dds-content-block-segmented-item>
        <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
        <dds-content-item-copy>${contentItemCopy}</dds-content-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
          >Lorem Ipsum dolor sit</dds-text-cta
        >
      </dds-content-block-segmented-item>
      <dds-content-block-segmented-item>
        <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
        <dds-content-item-copy>${contentItemCopy}</dds-content-item-copy>
        ${image}
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
          >Lorem Ipsum dolor sit</dds-text-cta
        >
      </dds-content-block-segmented-item>
      ${ctaStyle === 'text'
        ? html`
            <dds-text-cta slot="cta" cta-type=${ctaType} icon-placement="right" href=${hrefsForType[ctaType]}
              >Lorem ipsum dolor</dds-text-cta
            >
          `
        : html`
            <dds-card-cta slot="cta" cta-type=${ctaType} href=${hrefsForType[ctaType]}>
              Lorem ipsum dolor
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-cta>
          `}
    </dds-content-block-segmented>
  `;
};

export const withAsideElements = ({ parameters }) => {
  const { heading, copy, ctaStyle, ctaType, complementaryStyleScheme } = parameters?.props?.ContentBlockSimple ?? {};
  return html`
    <dds-content-block-segmented complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>Lorem ipsum dolor sit amet.</dds-content-block-heading>
      <dds-content-block-copy slot="copy">${copy}</dds-content-block-copy>
      ${image}
      <dds-content-block-segmented-item>
        <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
        <dds-content-item-copy>${contentItemCopy}</dds-content-item-copy>
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
          >Lorem Ipsum dolor sit</dds-text-cta
        >
      </dds-content-block-segmented-item>
      <dds-content-block-segmented-item>
        <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
        <dds-content-item-copy>${contentItemCopy}</dds-content-item-copy>
        ${image}
        <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
          >Lorem Ipsum dolor sit</dds-text-cta
        >
      </dds-content-block-segmented-item>
      <dds-content-block-complementary>
        <dds-link-list type="default">
          <span slot="heading">${heading}</span>
          <dds-link-list-item-card-cta href="https://example.com" cta-type="local">
            <p>Containerization A Complete Guide</p>
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
          <dds-link-list-item-card-cta href="https://example.com" cta-type="external">
            <p>Why should you use microservices and containers</p>
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
        </dds-link-list>
      </dds-content-block-complementary>
      ${ctaStyle === 'text'
        ? html`
            <dds-text-cta slot="cta" cta-type=${ctaType} icon-placement="right" href=${hrefsForType[ctaType]}
              >Lorem ipsum dolor</dds-text-cta
            >
          `
        : html`
            <dds-card-cta slot="cta" cta-type=${ctaType} href=${hrefsForType[ctaType]}>
              Lorem ipsum dolor
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-cta>
          `}
    </dds-content-block-segmented>
  `;
};

withAsideElements.story = {
  parameters: {
    gridLargeColumnClass: 'bx--col-lg-12 bx--offset-lg-4',
    knobs: {
      ContentBlockSimple: () => ({
        heading: textNullable('Link list heading (heading)', 'Tutorials'),
        ctaStyle: select('CTA style (cta-style)', ctaStyles, null),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        complementaryStyleScheme: select(
          'Complementary style scheme (complementary-style-scheme)',
          complementaryStyleSchemes,
          null
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Content Block Segmented',
  decorators: [
    (story, { parameters }) => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class=" bx--col-sm-4 ${parameters.gridLargeColumnClass}">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    gridLargeColumnClass: 'bx--col-lg-8',
    knobs: {
      ContentBlockSimple: () => ({
        heading: textNullable('Heading (required)', 'Lorem ipsum dolor sit amet.'),
        copy: textNullable(
          'copy',
          'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
            ' Mauris iaculis eget dolor nec hendrerit.'
        ),
        ctaStyle: select('CTA style (cta-style)', ctaStyles, null),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
      }),
    },
  },
};
