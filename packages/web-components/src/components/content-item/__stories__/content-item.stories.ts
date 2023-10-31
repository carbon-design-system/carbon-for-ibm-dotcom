/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../index';
import { select, boolean } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import logoMicrosoft2x1 from '../../../../../storybook-images/assets/logos/logo-microsoft--2x1.png';

const contentItemTypeOptions = {
  Text: 'text',
  Statistics: 'statistics',
  Pictogram: 'pictogram',
  Media: 'media',
  Logo: 'logo',
};

const app = html`
  <svg
    slot="media"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:v="https://vecta.io/nano"
    viewBox="0 0 32 32">
    <defs>
      <linearGradient
        id="A"
        x1="646.29"
        y1="1117.53"
        x2="659.58"
        y2="1135.58"
        gradientTransform="translate(-841.69 103.15) rotate(33.78) scale(1 -.49)"
        gradientUnits="userSpaceOnUse">
        <stop offset=".3" />
        <stop offset="1" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="B"
        x1="-925.17"
        y1="-1066.96"
        x2="-914.09"
        y2="-1051.91"
        gradientTransform="translate(-1044.27 103.14) rotate(146.22) scale(1 .49)"
        gradientUnits="userSpaceOnUse">
        <stop offset=".3" />
        <stop offset=".9" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="C"
        x1="-6341.42"
        y1="19700.69"
        x2="-6328.12"
        y2="19718.74"
        gradientTransform="translate(146.99 -11571.14) rotate(-146.22) scale(1 -.49)"
        gradientUnits="userSpaceOnUse">
        <stop offset=".32" />
        <stop offset=".35" stop-opacity=".8" />
        <stop offset=".7" stop-opacity="0" />
      </linearGradient>
      <mask
        id="D"
        x="0"
        y="0"
        width="32"
        height="32"
        maskUnits="userSpaceOnUse">
        <g stroke-width="0">
          <path
            d="M16 1C12.07 1 8.3 2.53 5.5 5.29l1.4 1.43C9.33 4.33 12.59 3 16 3.01c.98 0 1.93.11 2.84.32-3.4.92-5.92 4.03-5.92 7.72a7.95 7.95 0 0 0 .33 2.25c-.71-.21-1.45-.31-2.19-.31-3.7 0-6.82 2.53-7.73 5.96-.23-.96-.34-1.94-.35-2.93 0-2.12.49-4.13 1.46-6L2.67 9.1a15.02 15.02 0 0 0-1.69 6.92c0 8.27 6.73 15 15 15 3.95 0 7.68-1.52 10.5-4.29l-1.4-1.43c-2.43 2.39-5.69 3.72-9.1 3.71a12.98 12.98 0 0 1-9.31-3.94 5.98 5.98 0 0 1-1.62-4.09c0-3.31 2.69-6 6-6 3.32 0 6 2.7 6 6.01a5.67 5.67 0 0 1-.1 1.09l1.97.37a7.98 7.98 0 0 0-.19-3.73 8.1 8.1 0 0 0 2.19.31c3.71 0 6.83-2.54 7.73-5.97.22.95.34 1.93.34 2.94 0 2.12-.49 4.13-1.46 5.99l1.77.92a15.02 15.02 0 0 0 1.69-6.92c0-8.27-6.73-15-15-15zm4.93 16.03c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
            fill="#fff" />
          <path d="M8 9L0 0h16l2.31 3.3L8 9z" fill="url(#A)" />
          <path d="M12 31l4.39-9L6 21 2 31h10z" fill="url(#B)" />
          <path d="M24 23l8 9H16l-2.3-3.31L24 23z" fill="url(#C)" />
          <path d="M16 31h-4.28L15 22h2l-1 9z" />
        </g>
      </mask>
      <linearGradient
        id="E"
        x1="0"
        y1="32"
        x2="32"
        y2="0"
        gradientUnits="userSpaceOnUse">
        <stop offset=".1" stop-color="#a56eff" />
        <stop offset=".9" stop-color="#0f62fe" />
      </linearGradient>
    </defs>
    <g mask="url(#D)"><path d="m0,0h32v32H0V0Z" fill="url(#E)" /></g>
    <g fill="#001d6c">
      <circle cx="6" cy="6" r="2" />
      <circle cx="26" cy="26" r="2" />
      <path
        d="m16,31c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm0-8c-1.65,0-3,1.35-3,3s1.35,3,3,3,3-1.35,3-3-1.35-3-3-3Z" />
    </g>
  </svg>
`;

const pictogram = html` <svg
  slot="media"
  focusable="false"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor"
  data-autoid="c4d--pictogram-item__pictogram"
  aria-label="Pictogram description"
  width="48"
  height="48"
  viewBox="0 0 48 48"
  role="img"
  class="cds--pictogram-item__pictogram">
  <path
    fill="none"
    stroke-linejoin="round"
    stroke-miterlimit="10"
    stroke-width="1.10581"
    d="M 44.211009,36.137939 H 3.7889912 c -1.7101623,0 -3.10938596,-1.365518
          -3.10938596,-3.034485 V 7.3103341 c 0,-1.6689666 1.39922366,-3.0344847 3.10938596,-3.0344847 H 44.211009 c 1.710162,0
          3.109386,1.3655181 3.109386,3.0344847 V 33.103454 c 0,1.668967 -1.399224,3.034485 -3.109386,3.034485 z m
          -31.09386,7.586212 H 34.882851 M 24,36.137939 v 7.586212 M 0.67960524,28.551727 H 47.320395" />
</svg>`;

export const Default = (args) => {
  const {
    type,
    heading,
    horizontal,
    mediaType,
    pictogramType,
    copy,
    showCopy,
    ctaCopy,
  } = args?.ContentItem ?? {};
  return html`
    <c4d-content-item ?horizontal=${horizontal}>
      ${type === 'statistics' ? html`<span slot="statistics">10%</span>` : ``}
      ${type === 'pictogram'
        ? pictogramType === 'pictogram'
          ? pictogram
          : pictogramType === 'app icon'
          ? app
          : ``
        : ``}
      ${type === 'media'
        ? mediaType === 'image'
          ? html`
              <c4d-image
                slot="media"
                alt="Alt image text"
                default-src="${imgLg1x1}"></c4d-image>
            `
          : mediaType === 'video'
          ? html`<c4d-video-player-container
              slot="media"
              video-id="0_ibuqxqbe"
              hide-caption></c4d-video-player-container>`
          : ``
        : ``}
      ${type === 'logo'
        ? html` <c4d-image-logo
            alt="Microsoft logo"
            slot="media"
            default-src="${logoMicrosoft2x1}"></c4d-image-logo>`
        : ``}
      <c4d-content-item-heading>${heading}</c4d-content-item-heading>
      ${showCopy
        ? html` <c4d-content-item-copy>${copy}</c4d-content-item-copy> `
        : ``}
      <c4d-link-with-icon
        slot="footer"
        cta-type="local"
        href="https://www.example.com"
        >${ctaCopy}</c4d-link-with-icon
      >
    </c4d-content-item>
  `;
};

export default {
  title: 'Components/Content item',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--col-lg-8">
            <c4d-video-container> ${story()} </c4d-video-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentItem: () => {
        const type = select(
          'Content item type',
          contentItemTypeOptions,
          contentItemTypeOptions.Text
        );
        const mediaType =
          type === 'media'
            ? select('Media type:', ['image', 'video'], 'image')
            : '';
        const pictogramType =
          type === 'pictogram'
            ? select('Pictogram type', ['pictogram', 'app icon'], 'pictogram')
            : '';
        const horizontal =
          type === 'pictogram' || mediaType === 'image'
            ? boolean('Horizontal', false)
            : '';
        return {
          type,
          mediaType,
          pictogramType,
          horizontal,
          heading: textNullable('Heading:', 'Natural language understanding'),
          showCopy: boolean('Copy:', true),
          copy:
            'This area of NLP takes "real world" text and applies a symbolic ' +
            'system for a machine to interpret its meaning, using formal logic; structures ' +
            'that describe the various relationships between concepts (ontologies); and other semantic tools.',
          ctaCopy: textNullable('CTA copy:', 'Learn more about NLP'),
        };
      },
    },
    propsSet: {
      default: {
        ContentItem: {
          heading: 'Natural language understanding',
          media: 'none',
          showCopy: true,
          copy:
            'This area of NLP takes "real world" text and applies a symbolic ' +
            'system for a machine to interpret its meaning, using formal logic; structures ' +
            'that describe the various relationships between concepts (ontologies); and other semantic tools.',
          ctaStyle: 'text',
          ctaCopy: 'Learn more about NLP',
        },
      },
    },
  },
};
