/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';
import '../../image/image';
import '../../cta/link-list-item-card-cta';
import '../../cta/text-cta';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';
import '../../content-item/content-item-copy';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-complementary';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../content-block-simple';

const ctaTypes = {
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
    - list item 1a
  1. list item 2
    1. list item 2a
`;

// TODO: Replace with <dds-image-with-caption>
const image = html`
  <dds-image
    slot="media"
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
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
  </dds-image>
`;

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      <dds-text-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">${ctaCopy}</dds-text-cta>
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
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      <dds-text-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">${ctaCopy}</dds-text-cta>
    </dds-content-block-simple>
  `;
};

export const WithVideo = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
      <dds-text-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">${ctaCopy}</dds-text-cta>
    </dds-content-block-simple>
  `;
};

export const WithAsideElements = ({ parameters }) => {
  const { complementaryStyleScheme, heading } = parameters?.props?.ContentBlockSimple ?? {};
  const { copy: ctaCopy, ctaType, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-content-block-simple complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      ${image}
      <dds-content-block-complementary>
        <dds-link-list type="default">
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
      </dds-content-block-complementary>
      <dds-text-cta slot="footer" cta-type="${ifNonNull(ctaType)}" href="${ifNonNull(href)}">${ctaCopy}</dds-text-cta>
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
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 ${parameters.gridLargeColumnClass} bx--offset-lg-4">
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
        copy: textNullable('Copy text (copy)', 'Lorem ipsum dolor sit amet', groupId),
        ctaType: select('CTA type (cta-type)', ctaTypes, null, groupId),
        href: textNullable('Href (href):', 'https://example.com', groupId),
      }),
    },
  },
};
