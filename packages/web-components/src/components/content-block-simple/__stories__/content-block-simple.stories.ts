/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../image/image';
import '../../cta/link-list-item-card-cta';
import '../../cta/card-cta';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-complementary';
// eslint-disable-next-line import/no-duplicates
import '../../content-block/content-block-copy';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../content-block-simple';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';
// eslint-disable-next-line import/no-duplicates
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
import { CTA_STYLE, CTA_TYPE } from '../../cta/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

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

const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
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

// TODO: Replace with <dds-image-with-caption>
const image = html`
  <dds-image slot="media" alt="Image alt text" default-src="${imgLg16x9}">
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
  </dds-image>
`;

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}">${copy}</dds-content-block-copy>
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        ${ctaCopy}
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-block-simple>
  `;
};

export const WithImage = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${image}
      <dds-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}">${copy}</dds-content-block-copy>
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        ${ctaCopy}
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-block-simple>
  `;
};

WithImage.story = {
  name: 'With image',
};

export const WithVideo = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}">${copy}</dds-content-block-copy>
      <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        ${ctaCopy}
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-block-simple>
  `;
};

WithVideo.story = {
  name: 'With video',
};

export const WithLinkList = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}">${copy}</dds-content-block-copy>
      ${image}
      <dds-link-list type="default" slot="complementary">
        <dds-link-list-heading>Tutorial</dds-link-list-heading>
        <dds-link-list-item-card-cta href="${ifNonNull(href)}" cta-type="local">
          <p>Containerization A Complete Guide</p>
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-link-list-item-card-cta>
        <dds-link-list-item-card-cta href="${ifNonNull(href)}" cta-type="external">
          <p>Why should you use microservices and containers</p>
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-link-list-item-card-cta>
      </dds-link-list>
      <dds-card-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">
        ${ctaCopy}
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-cta>
    </dds-content-block-simple>
  `;
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout--with-complementary',
  },
};

export default {
  title: 'Components/Content block simple',
  decorators: [
    (story, { parameters }) => html`
      <div class="dds-ce-demo-devenv--simple-grid ${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout',
    knobs: {
      ContentBlockSimple: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Curabitur malesuada varius mi eu posuere', groupId),
        copy: textNullable('Copy text (copy)', 'Lorem ipsum dolor sit amet', groupId),
        ctaType: select('CTA type (cta-type)', ctaTypes, null, groupId),
        ctaStyle: select('CTA style (cta-style)', ctaStyles, null, groupId),
        href: textNullable('Href (href):', 'https://example.com', groupId),
        complementaryStyleScheme: select(
          'Complementary style scheme (complementary-style-scheme)',
          complementaryStyleSchemes,
          null,
          groupId
        ),
      }),
    },
  },
};
