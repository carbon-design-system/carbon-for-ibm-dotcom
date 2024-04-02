/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import { CTA_TYPE } from '../../cta/defs';
import imgLg4x3 from '../../../../.storybook/storybook-images/assets/720/fpo--4x3--720x540--004.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const cardGroupItem = html`
  <c4d-card-group-item cta-type="local" href="https://example.com">
    <c4d-card-heading>Nunc convallis lobortis</c4d-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <c4d-card-footer slot="footer"> </c4d-card-footer>
  </c4d-card-group-item>
`;

const cardGroupItemWithImages = html`
  <c4d-card-group-item cta-type="local" href="https://example.com">
    <c4d-image
      slot="image"
      alt="Image alt text"
      default-src="${imgLg4x3}"
    >
    </c4d-image>
    <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
    <c4d-card-heading>Natural Language Processing.</c4d-card-heading>
    <c4d-card-cta-footer><c4d-card-cta-footer>
  </c4d-card-group-item>
`;

const cardGroupItemWithVideos = html`
  <c4d-card-group-item cta-type="video" href="0_ibuqxqbe">
    <c4d-card-cta-footer cta-type="video" slot="footer" href="0_ibuqxqbe">
    </c4d-card-cta-footer>
  </c4d-card-group-item>
`;

export const Default = (args) => {
  const { heading, ctaCopy, ctaType, href } = args?.ContentBlockCards ?? {};
  return html`
    <c4d-content-block-cards>
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      <c4d-card-group>
        ${cardGroupItem} ${cardGroupItem} ${cardGroupItem} ${cardGroupItem}
        ${cardGroupItem}
      </c4d-card-group>
      <c4d-card-link-cta
        slot="footer"
        cta-type="${ifDefined(ctaType)}"
        href="${ifDefined(href)}">
        <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
        <c4d-card-cta-footer></c4d-card-cta-footer>
      </c4d-card-link-cta>
    </c4d-content-block-cards>
  `;
};

export const withImages = (args) => {
  const { heading, ctaCopy, ctaType, href } = args?.ContentBlockCards ?? {};
  return html`
    <c4d-content-block-cards>
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      <c4d-card-group>
        ${cardGroupItemWithImages} ${cardGroupItemWithImages}
        ${cardGroupItemWithImages} ${cardGroupItemWithImages}
        ${cardGroupItemWithImages}
      </c4d-card-group>
      <c4d-card-link-cta
        slot="footer"
        cta-type="${ifDefined(ctaType)}"
        href="${ifDefined(href)}">
        <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
        <c4d-card-cta-footer></c4d-card-cta-footer>
      </c4d-card-link-cta>
    </c4d-content-block-cards>
  `;
};

withImages.story = {
  name: 'With images',
};

export const withVideos = (args) => {
  const { heading, ctaCopy, ctaType, href } = args?.ContentBlockCards ?? {};
  return html`
    <c4d-content-block-cards>
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      <c4d-card-group>
        ${cardGroupItemWithVideos} ${cardGroupItemWithVideos}
        ${cardGroupItemWithVideos} ${cardGroupItemWithVideos}
        ${cardGroupItemWithVideos}
      </c4d-card-group>
      <c4d-card-link-cta
        slot="footer"
        cta-type="${ifDefined(ctaType)}"
        href="${ifDefined(href)}">
        <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
        <c4d-card-cta-footer></c4d-card-cta-footer>
      </c4d-card-link-cta>
    </c4d-content-block-cards>
  `;
};

withVideos.story = {
  name: 'With videos',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export default {
  title: 'Components/Content block cards',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">
            <c4d-video-cta-container> ${story()} </c4d-video-cta-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlockCards: () => ({
        heading: textNullable(
          'Heading (heading):',
          'Aliquam condimentum interdum'
        ),
        ctaCopy: textNullable(
          'Copy text (copy)',
          'Lorem ipsum dolor sit ametttt'
        ),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        href: textNullable('Href (href):', 'https://example.com'),
      }),
    },
    propsSet: {
      default: {
        ContentBlockCards: {
          heading: 'Aliquam condimentum interdum',
          ctaCopy: 'Lorem ipsum dolor sit ametttt',
          ctaType: 'local',
          href: 'https://example.com',
        },
      },
    },
  },
};
