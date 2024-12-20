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
import '../../cta/video-cta-container';
import '../../image';

import { CTA_TYPE } from '../../cta/defs';
import { boolean, select, text, number } from '@storybook/addon-knobs';

const tagGroupContent = html`
  <div class="tag-group">
    <cds-tag type="cool-gray"> Most popular </cds-tag>
    <cds-tag type="cool-gray"> Enterprise </cds-tag>
  </div>
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

const deterministicSequence = [
  2, 5, 7, 4, 6, 0, 6, 4, 7, 4, 6, 6, 0, 4, 4, 3, 0, 0, 1, 6, 7, 7, 3, 0, 0, 0,
  1, 7, 4, 5, 4, 6, 7, 4, 1, 4, 5, 0, 6, 7, 5, 3, 7, 0, 3, 3, 5, 2, 5, 3,
];

let steps = 0;

const randomLabel = (startSequenceNumber) => {
  const labels = [
    'Est tempor per quam',
    'Velit vulputat lorem',
    'Eu ad fringilla',
    'Eget pharetra sed',
    'Quisque non praesent',
    'Ornare turpis taciti in',
    'Ipsum egestas varius ut torquent',
    'Natoque cras dictum nec sociosqu tempus phasellus',
  ];
  const label =
    labels[
      deterministicSequence[
        (startSequenceNumber + steps) % deterministicSequence.length
      ]
    ];
  steps++;
  return label;
};

const randomHeadline = (startSequenceNumber) => {
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
  const headline =
    headlines[
      deterministicSequence[
        (startSequenceNumber + steps) % deterministicSequence.length
      ]
    ];
  steps++;
  return headline;
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

        const startSequenceNumber = number(
          'Starting sequence number for random label and heading',
          0
        );

        return {
          hasPictogram,
          hasTagGroup,
          ctaType,
          ctaCopy,
          alignWithContent,
          href,
          startSequenceNumber,
        };
      },
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
    startSequenceNumber,
  } = args?.Tile ?? {};
  return html`
    <c4d-tile
      label="${randomLabel(startSequenceNumber)}"
      href="${href}"
      cta-type="${ctaType}"
      ?align-with-content="${alignWithContent}">
      ${hasPictogram ? pictogramContent : undefined}
      ${randomHeadline(startSequenceNumber)}
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
    startSequenceNumber,
  } = args?.Tile ?? {};
  return html`
    <c4d-tile
      label="${randomLabel(startSequenceNumber)}"
      href="${href}"
      cta-type="${ctaType}"
      ?align-with-content="${alignWithContent}">
      ${hasPictogram ? pictogramContent : undefined}

      <c4d-image
        slot="image"
        alt="Image Alt Text"
        default-src="https://fakeimg.pl/160x160/F7F3FF/6829C1/?retina=1&text=1:1&font=museo"></c4d-image>

      ${randomHeadline(startSequenceNumber)}
      ${hasTagGroup ? tagGroupContent : undefined}

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
    startSequenceNumber,
  } = args?.Tile ?? {};
  return html`
    <c4d-tile
      label="${randomLabel(startSequenceNumber)}"
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
      ${randomHeadline(startSequenceNumber)}
      ${hasTagGroup ? tagGroupContent : undefined}

      <p slot="cta">${ctaCopy}</p>
    </c4d-tile>
  `;
};
