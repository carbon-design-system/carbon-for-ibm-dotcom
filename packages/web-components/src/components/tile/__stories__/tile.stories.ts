/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '@carbon/web-components/es/components/tag/tag';
import '../index';
import readme from './README--tile.stories.mdx';
import '@carbon/ibmdotcom-web-components/es/components/cta/video-cta-container';
import '@carbon/ibmdotcom-web-components/es/components/image';

import { CTA_TYPE } from '@carbon/ibmdotcom-web-components/es/components/cta/defs';
import { boolean, select, text } from '@storybook/addon-knobs';

const tagGroupContent = html`
  <c4d-tag-group>
    <cds-tag type="cool-gray"> Most popular </cds-tag>
    <cds-tag type="cool-gray"> Enterprise </cds-tag>
  </c4d-tag-group>
`;

const pictogramContent = html`
  <svg
    slot="pictogram"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Pictogram description"
    width="88"
    height="88"
    viewBox="0 0 32 32"
    role="img"
    class="cds--card__pictogram"
    fill="#0f62fe">
    <path
      id="desktop_1_"
      d="M23,29.36H9v-0.72h6.64v-4.28H3c-1.301,0-2.36-1.059-2.36-2.36V5c0-1.301,1.059-2.36,2.36-2.36h26
        c1.302,0,2.36,1.059,2.36,2.36v17c0,1.302-1.059,2.36-2.36,2.36H16.36v4.279H23V29.36z M1.36,19.36V22c0,
        0.904,0.736,1.64,1.64,1.64h26c0.904,0,1.64-0.735,1.64-1.64v-2.64H1.36z M1.36,
        18.64h29.28V5c0-0.904-0.735-1.64-1.64-1.64H3C2.096,3.36,1.36,4.096,1.36,5V18.64z" />
  </svg>
`;

const ctaTypeOptions = Object.values(CTA_TYPE).filter((value) => !!value);

const randomLabel = () => {
  const labels = [
    'Est tempor per quam',
    'Velit vulputat lorem',
    'Eu ad fringilla',
    'Eget pharetra sed',
    'Quisque non praesent',
    'Ornare turpis taciti in',
    'Ipsum egestas varius ut torquent',
  ];
  return labels[Math.floor(Math.random() * labels.length)];
};

const randomHeadline = () => {
  const headlines = [
    'Est scelerisque habitant ac aptent ex suspendisse',
    'At quisque fringilla elementum adipiscing morbi',
    'Primis dictumst gravida amet tempor tristique id',
    'Dis habitasse felis libero ad nostra vulputate',
    'Himenaeos tristique hendrerit magna nostra placera',
    'Integer lorem ante felis egestas cubilia varius',
    'Erat dictumst varius faucibus penatibus dignissim torquent',
    'Imperdiet commodo habitasse nisi eget mollis libero blandit tincidunt molestie',
  ];
  return headlines[Math.floor(Math.random() * headlines.length)];
};

export default {
  title: 'Components/Tile',
  parameters: {
    ...readme.parameters,
    knobs: {
      Tile: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          ctaTypeOptions,
          ctaTypeOptions[0]
        );

        const ctaCopy = text('CTA text', 'Sign up for the trial');

        const href = text('CTA href', 'https://example.com');

        const hasPictogram = boolean('Add pictogram', false);

        const hasTagGroup = boolean('Add tag group', false);

        const alignWithContent = boolean(
          'Align link with card contents',
          false
        );

        return {
          hasPictogram,
          hasTagGroup,
          ctaType,
          ctaCopy,
          alignWithContent,
          href,
        };
      },
    },
  },
  argTypes: {
    hasPictogram: {
      control: { type: 'boolean' },
      name: 'pictogram (optional)',
      defaultValue: false,
    },
    hasTagGroup: {
      control: { type: 'boolean' },
      name: 'tags (optional)',
      defaultValue: false,
    },
    ctaType: {
      control: { type: 'select' },
      name: 'cta type (optional)',
      options: ctaTypeOptions,
      defaultValue: ctaTypeOptions[0],
    },
    ctaCopy: {
      control: { type: 'text' },
      name: 'cta text (optional)',
      defaultValue: 'Sign up for the trial',
    },
    alignWithContent: {
      control: { type: 'boolean' },
      name: 'align link with card content',
      defaultValue: false,
    },
    href: {
      control: { type: 'text' },
      name: 'href',
      defaultValue: 'https://example.com',
    },
  },
  decorators: [
    (story, context) => {
      if (context.name === 'Double Tile') {
        return html`
          <c4d-video-cta-container class="cds--grid c4d-story-padding">
            <div class="cds--row">
              <div
                class="cds--col-sm-8 cds--col-md-8 cds--col-lg-8 cds--no-gutter">
                ${story()}
              </div>
            </div>
          </c4d-video-cta-container>
        `;
      } else {
        return html`
          <c4d-video-cta-container class="cds--grid c4d-story-padding">
            <div class="cds--row">
              <div
                class="cds--col-sm-4 cds--col-md-4 cds--col-lg-4 cds--no-gutter">
                ${story()}
              </div>
            </div>
          </c4d-video-cta-container>
        `;
      }
    },
  ],
};

export const Default = (args) => {
  const {
    ctaType,
    hasTagGroup,
    ctaCopy,
    hasPictogram,
    alignWithContent,
    href,
  } = args?.Tile ?? {};
  return html`
    <c4d-tile
      label="${randomLabel()}"
      href="${href}"
      cta-type="${ctaType}"
      ?align-with-content="${alignWithContent}">
      ${hasPictogram ? pictogramContent : undefined} ${randomHeadline()}
      ${hasTagGroup ? tagGroupContent : undefined}

      <p slot="cta">${ctaCopy}</p>
    </c4d-tile>
  `;
};

export const WithImage = (args) => {
  const {
    ctaType,
    hasTagGroup,
    ctaCopy,
    hasPictogram,
    alignWithContent,
    href,
  } = args?.Tile ?? {};
  return html`
    <c4d-tile
      label="${randomLabel()}"
      href="${href}"
      cta-type="${ctaType}"
      ?align-with-content="${alignWithContent}">
      ${hasPictogram ? pictogramContent : undefined}

      <c4d-image
        slot="image"
        alt="Image Alt Text"
        default-src="https://fakeimg.pl/160x160/F7F3FF/6829C1/?retina=1&text=1:1&font=museo"></c4d-image>

      ${randomHeadline()} ${hasTagGroup ? tagGroupContent : undefined}

      <p slot="cta">${ctaCopy}</p>
    </c4d-tile>
  `;
};

// Double Tile
export const DoubleTile = (args) => {
  const {
    ctaType,
    hasTagGroup,
    ctaCopy,
    hasPictogram,
    alignWithContent,
    href,
  } = args?.Tile ?? {};
  return html`
    <c4d-tile
      label="${randomLabel()}"
      href="${href}"
      cta-type="${ctaType}"
      ?align-with-content="${alignWithContent}"
      ?double-tile="${true}">
      ${hasPictogram ? pictogramContent : undefined}

      <c4d-image
        slot="image"
        alt="Image Alt Text"
        default-src="https://fakeimg.pl/160x160/F7F3FF/6829C1/?retina=1&text=1:1&font=museo"
        class="c4d-tile__image-double"></c4d-image>
      ${randomHeadline()} ${hasTagGroup ? tagGroupContent : undefined}

      <p slot="cta">${ctaCopy}</p>
    </c4d-tile>
  `;
};
