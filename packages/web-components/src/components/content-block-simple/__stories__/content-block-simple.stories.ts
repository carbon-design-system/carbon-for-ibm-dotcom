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
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
// import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/shared-enums';
import '../../image/image';
import '../../cta/text-cta';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-complementary';
import '../content-block-simple';

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
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
    1. list item 1a
  1. list item 2
    - list item 2a
`;

// TODO: Replace with <dds-image-with-caption>
const image = html`
  <dds-image slot="media" alt="Image alt text" default-src="https://dummyimage.com/672x378/ee5396/161616&text=16:9">
    <dds-image-item media="(min-width: 672px)" srcset="https://dummyimage.com/672x378/ee5396/161616&text=16:9"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="https://dummyimage.com/400x225/ee5396/161616&text=16:9"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="https://dummyimage.com/320x180/ee5396/161616&text=16:9"> </dds-image-item>
  </dds-image>
`;

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, href, type } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple .copy="${ifNonNull(copy)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-text-cta slot="cta" href="${ifNonNull(href)}" type="${ifNonNull(type)}">${ctaCopy}</dds-text-cta>
    </dds-content-block-simple>
  `;
};

export const WithImage = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, href, type } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}" .copy="${ifNonNull(copy)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${image}
      <dds-text-cta slot="cta" href="${ifNonNull(href)}" type="${ifNonNull(type)}">${ctaCopy}</dds-text-cta>
    </dds-content-block-simple>
  `;
};

export const WithVideo = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, href, type } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}" .copy="${ifNonNull(copy)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-video-player-container slot="media" video-id="0_uka1msg4"></dds-video-player-container>
      <dds-text-cta slot="cta" href="${ifNonNull(href)}" type="${ifNonNull(type)}">${ctaCopy}</dds-text-cta>
    </dds-content-block-simple>
  `;
};

export const WithAsideElements = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, href, type } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}" .copy="${ifNonNull(copy)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${image}
      <dds-content-block-complementary>
        <!-- TODO: Replace with <dds-link-list> -->
        <div style="margin-top: 4rem">
          <dds-text-cta href="https://ibm.com" type="local">
            Containerization A Complete Guide
          </dds-text-cta>
        </div>
        <div style="margin-bottom: 4rem">
          <dds-text-cta href="https://ibm.com" type="external">
            Why should you use microservices and containers
          </dds-tet-cta>
        </div>
      </dds-content-block-complementary>
      <dds-text-cta slot="cta" href="${ifNonNull(href)}" type="${ifNonNull(type)}">${ctaCopy}</dds-text-cta>
    </dds-content-block-simple>
  `;
};

WithAsideElements.story = {
  parameters: {
    gridLargeColumnClass: 'bx--col-lg-12',
  },
};

export default {
  title: 'Components/Content block simple',
  decorators: [
    (story, { parameters }) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 ${parameters.gridLargeColumnClass} bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    // ...readme.parameters,
    gridLargeColumnClass: 'bx--col-lg-8',
    knobs: {
      ContentBlockSimple: ({ groupId }) => ({
        complementaryStyleScheme: select(
          'Complementary style scheme (complementary-style-scheme)',
          complementaryStyleSchemes,
          null,
          groupId
        ),
        heading: textNullable('Heading (required)', 'Curabitur malesuada varius mi eu posuere', groupId),
      }),
      TextCTA: ({ groupId }) => ({
        copy: textNullable('Copy text (item.copy)', 'Lorem ipsum dolor sit amet', groupId),
        href: textNullable('Href (href):', 'https://example.com', groupId),
        type: select('Type (item.type)', types, null, groupId),
      }),
    },
  },
};
