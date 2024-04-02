/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../cta/index';
import '../../link-list/index';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import ArrowDown20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--down/20.js';
import Launch20 from '../../../internal/vendor/@carbon/web-components/icons/launch/20.js';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
import { CTA_STYLE, CTA_TYPE } from '../../cta/defs';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const ctaStyles = {
  [`Card Link (${CTA_STYLE.CARDLINK})`]: CTA_STYLE.CARDLINK,
  [`Text (${CTA_STYLE.TEXT})`]: CTA_STYLE.TEXT,
};

const complementaryStyleSchemes = {
  // eslint-disable-next-line max-len
  'With border': CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
  'Without border': null,
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
    - list "item 1a"
  1. list item 2
     1. list item 2a
        - list item 2a.a
`;

const image = html`
  <c4d-image slot="media" alt="Image alt text" default-src="${imgLg16x9}">
    <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </c4d-image-item>
  </c4d-image>
`;

export const Default = (args) => {
  const { ctaType, ctaStyle, heading, complementaryStyleScheme, onClick } =
    args?.ContentBlockSimple ?? {};
  const ctaCopy = 'Lorem ipsum dolor sit amet';
  const href = 'https://www.example.com';
  return html`
    <c4d-content-block-simple
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading><h2>${heading}</h2></c4d-content-block-heading>
      <c4d-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}"
        >${copy}</c4d-content-block-copy
      >
      ${ctaStyle === 'card-link'
        ? html`
            <c4d-card-link-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              href="${ifDefined(href)}">
              <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
              <c4d-card-footer>
                ${ctaType === 'local' ? ArrowRight20({ slot: 'icon' }) : ''}
                ${ctaType === 'jump' ? ArrowDown20({ slot: 'icon' }) : ''}
                ${ctaType === 'external' ? Launch20({ slot: 'icon' }) : ''}
              </c4d-card-footer>
            </c4d-card-link-cta>
          `
        : html`
            <c4d-text-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              icon-placement="right"
              href="${ifDefined(href)}"
              @click="${onClick}">
              ${ctaCopy}
            </c4d-text-cta>
          `}
    </c4d-content-block-simple>
  `;
};

export const WithImage = (args) => {
  const { ctaType, ctaStyle, heading, complementaryStyleScheme, onClick } =
    args?.ContentBlockSimple ?? {};
  const ctaCopy = 'Lorem ipsum dolor sit amet';
  const href = 'https://www.example.com';
  return html`
    <c4d-content-block-simple
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading><h2>${heading}</h2></c4d-content-block-heading>
      ${image}
      <c4d-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}"
        >${copy}</c4d-content-block-copy
      >
      ${ctaStyle === 'card-link'
        ? html`
            <c4d-card-link-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              href="${ifDefined(href)}">
              <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
              <c4d-card-footer>
                ${ctaType === 'local' ? ArrowRight20({ slot: 'icon' }) : ''}
                ${ctaType === 'jump' ? ArrowDown20({ slot: 'icon' }) : ''}
                ${ctaType === 'external' ? Launch20({ slot: 'icon' }) : ''}
              </c4d-card-footer>
            </c4d-card-link-cta>
          `
        : html`
            <c4d-text-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              icon-placement="right"
              href="${ifDefined(href)}"
              @click="${onClick}">
              ${ctaCopy}
            </c4d-text-cta>
          `}
    </c4d-content-block-simple>
  `;
};

WithImage.story = {
  name: 'With image',
};

export const WithVideo = (args) => {
  const { ctaType, ctaStyle, heading, complementaryStyleScheme, onClick } =
    args?.ContentBlockSimple ?? {};
  const ctaCopy = 'Lorem ipsum dolor sit amet';
  const href = 'https://www.example.com';
  return html`
    <c4d-content-block-simple
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading><h2>${heading}</h2></c4d-content-block-heading>
      <c4d-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}"
        >${copy}</c4d-content-block-copy
      >
      <c4d-video-player-container
        slot="media"
        video-id="0_ibuqxqbe"></c4d-video-player-container>
      ${ctaStyle === 'card-link'
        ? html`
            <c4d-card-link-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              href="${ifDefined(href)}">
              <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
              <c4d-card-footer>
                ${ctaType === 'local' ? ArrowRight20({ slot: 'icon' }) : ''}
                ${ctaType === 'jump' ? ArrowDown20({ slot: 'icon' }) : ''}
                ${ctaType === 'external' ? Launch20({ slot: 'icon' }) : ''}
              </c4d-card-footer>
            </c4d-card-link-cta>
          `
        : html`
            <c4d-text-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              icon-placement="right"
              href="${ifDefined(href)}"
              @click="${onClick}">
              ${ctaCopy}
            </c4d-text-cta>
          `}
    </c4d-content-block-simple>
  `;
};

WithVideo.story = {
  name: 'With video',
  parameters: {
    gridContentClasses: 'cds--col-lg-12',
  },
};

export const WithLinkList = (args) => {
  const { ctaType, ctaStyle, heading, complementaryStyleScheme, onClick } =
    args?.ContentBlockSimple ?? {};
  const ctaCopy = 'Lorem ipsum dolor sit amet';
  const href = 'https://www.example.com';
  return html`
    <c4d-content-block-simple
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading><h2>${heading}</h2></c4d-content-block-heading>
      <c4d-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}"
        >${copy}</c4d-content-block-copy
      >
      ${image}
      <c4d-link-list type="default" slot="complementary">
        <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
        <c4d-link-list-item-cta
          href="${ifDefined(href)}"
          cta-type="local"
          type="default">
          <p>Containerization A Complete Guide</p>
        </c4d-link-list-item-cta>
        <c4d-link-list-item-cta
          href="${ifDefined(href)}"
          cta-type="external"
          type="default">
          <p>Why should you use microservices and containers</p>
        </c4d-link-list-item-cta>
      </c4d-link-list>
      ${ctaStyle === 'card-link'
        ? html`
            <c4d-card-link-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              href="${ifDefined(href)}">
              <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
              <c4d-card-footer>
                ${ctaType === 'local' ? ArrowRight20({ slot: 'icon' }) : ''}
                ${ctaType === 'jump' ? ArrowDown20({ slot: 'icon' }) : ''}
                ${ctaType === 'external' ? Launch20({ slot: 'icon' }) : ''}
              </c4d-card-footer>
            </c4d-card-link-cta>
          `
        : html`
            <c4d-text-cta
              slot="footer"
              cta-type="${ifDefined(ctaType)}"
              icon-placement="right"
              href="${ifDefined(href)}"
              @click="${onClick}">
              ${ctaCopy}
            </c4d-text-cta>
          `}
    </c4d-content-block-simple>
  `;
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'cds--col-lg-12',
  },
};

export default {
  title: 'Components/Content block simple',
  decorators: [
    (story, { parameters }) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--no-gutter ${parameters.gridContentClasses}">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    gridContentClasses: 'cds--col-lg-9',
    hasStoryPadding: true,
    knobs: {
      ContentBlockSimple: () => ({
        heading: textNullable(
          'Heading (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        ctaStyle: select('CTA style (cta-style)', ctaStyles, CTA_STYLE.TEXT),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockSimple: {
          heading: 'Curabitur malesuada varius mi eu posuere',
          ctaStyle: 'text',
          ctaType: 'local',
          complementaryStyleSchemes: 'with-border',
        },
      },
    },
  },
};
