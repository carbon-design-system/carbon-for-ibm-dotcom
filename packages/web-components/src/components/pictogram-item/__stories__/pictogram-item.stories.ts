/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
import { select } from '@storybook/addon-knobs';
import styles from './pictogram-item.stories.scss';
import { COLOR_OPTIONS } from '../defs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

/* eslint-disable max-len */
const Desktop = html`
  <svg
    slot="pictogram"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    data-autoid="dds--pictogram-item__pictogram"
    aria-label="Pictogram description"
    width="64"
    height="64"
    viewBox="8 8 32 32"
    role="img"
    class="bx--pictogram-item__pictogram"
  >
    <path
      fill="none"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      stroke-width=".72"
      d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
  0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
    ></path>
  </svg>
`;
const Pattern = html`
  <svg
    slot="pictogram"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    data-autoid="dds--pictogram-item__pictogram"
    aria-label="Pictogram description"
    width="64"
    height="64"
    viewBox="0 0 32 32"
    role="img"
    class="bx--pictogram-item__pictogram"
    style="enable-background:new 0 0 32 32;"
  >
    <path
      id="pattern_1_"
      d="M29,31.36H13c-1.301,0-2.36-1.059-2.36-2.36v-7.64H3c-1.301,0-2.36-1.059-2.36-2.36V3
	    c0-1.301,1.059-2.36,2.36-2.36h16c1.302,0,2.36,1.059,2.36,2.36v7.64H29c1.302,0,2.36,1.059,2.36,2.36v16
	    C31.36,30.302,30.302,31.36,29,31.36z M11.36,21.36V29c0,0.904,0.736,1.64,1.64,1.64h16c0.904,0,1.64-0.735,1.64-1.64V13
	    c0-0.904-0.735-1.64-1.64-1.64h-7.64V19c0,1.302-1.059,2.36-2.36,2.36H11.36z M19,18.36c-0.353,0-0.64,0.287-0.64,0.64v1
      c0,0.353,0.287,0.64,0.64,0.64c0.904,0,1.64-0.735,1.64-1.64c0-0.353-0.287-0.64-0.64-0.64H19z M11,20.64h6.8
      c-0.102-0.19-0.16-0.408-0.16-0.64v-1c0-0.75,0.61-1.36,1.36-1.36h1c0.231,0,0.449,0.059,0.64,0.16v-7.6
          c-0.19,0.103-0.408,0.16-0.64,0.16h-1c-0.75,0-1.36-0.61-1.36-1.36V8c0-0.75,0.61-1.36,1.36-1.36h1c0.231,0,0.449,0.058,0.64,0.16V3
      c0-0.904-0.735-1.64-1.64-1.64h-3.8c0.103,0.191,0.16,0.409,0.16,0.64v1c0,0.75-0.61,1.36-1.36,1.36h-1c-0.75,0-1.36-0.61-1.36-1.36
      V2c0-0.231,0.058-0.449,0.16-0.64H4.2C4.302,1.551,4.36,1.769,4.36,2v1c0,0.75-0.61,1.36-1.36,1.36H2
      c-0.231,0-0.449-0.058-0.64-0.16v7.6c0.191-0.103,0.409-0.16,0.64-0.16h1c0.75,0,1.36,0.61,1.36,1.36v1c0,0.75-0.61,1.36-1.36,1.36
      H2c-0.231,0-0.449-0.058-0.64-0.16V19c0,0.904,0.736,1.64,1.64,1.64h3.8C6.697,20.45,6.64,20.232,6.64,20v-1
      c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1c0,0.231-0.058,0.449-0.16,0.64H11z M8,18.36
      c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H8z
      M1.36,14c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H2
      c-0.353,0-0.64,0.287-0.64,0.64V14z M19,7.36c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1
      c0.353,0,0.64-0.287,0.64-0.64V8c0-0.353-0.287-0.64-0.64-0.64H19z M13,1.36c-0.353,0-0.64,0.287-0.64,0.64v1
      c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V2c0-0.353-0.287-0.64-0.64-0.64H13z M1.36,3
      c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V2c0-0.353-0.287-0.64-0.64-0.64C2.096,1.36,1.36,2.096,1.36,3z
      M14,15.36h-1c-0.75,0-1.36-0.61-1.36-1.36v-1c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1
      C15.36,14.75,14.75,15.36,14,15.36z M13,12.36c-0.353,0-0.64,0.287-0.64,0.64v1c0,0.353,0.287,0.64,0.64,0.64h1
      c0.353,0,0.64-0.287,0.64-0.64v-1c0-0.353-0.287-0.64-0.64-0.64H13z M9,10.36H8c-0.75,0-1.36-0.61-1.36-1.36V8
      c0-0.75,0.61-1.36,1.36-1.36h1c0.75,0,1.36,0.61,1.36,1.36v1C10.36,9.75,9.75,10.36,9,10.36z M8,7.36C7.647,7.36,7.36,7.647,7.36,8
      v1c0,0.353,0.287,0.64,0.64,0.64h1c0.353,0,0.64-0.287,0.64-0.64V8c0-0.353-0.287-0.64-0.64-0.64H8z"
    />
    <rect
      id="_Transparent_Rectangle"
      style="fill:none;"
      width="32"
      height="32"
    />
  </svg>
`;
const Touch = html`
  <svg
    slot="pictogram"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    data-autoid="dds--pictogram-item__pictogram"
    aria-label="Pictogram description"
    width="64"
    height="64"
    viewBox="0 0 32 32"
    role="img"
    class="bx--pictogram-item__pictogram"
  >
    <path
      id="touch_1_"
      d="M19.77,31.36c-5.067,0-7.409-2.218-10.404-5.602c-0.844-0.953-3.435-3.76-3.435-3.76L5.43,21.444
	c-1.217-1.339-1.79-2.018-1.79-2.459c0-0.541,0.374-1.022,1.052-1.357c1.188-0.586,3.129-0.646,4.319,0.269
	c0.895,0.688,2.677,2.611,3.629,3.663V7c0-1.388,0.968-2.357,2.354-2.36c0,0,0,0,0.001,0c0,0,0.001,0,0.003,0
	c0.001,0,0.002,0,0.003,0C16.391,4.643,17.36,5.612,17.36,7v7.64h6.552c2.536,0,4.448,1.778,4.448,4.136v4.01
	C28.36,27.239,27.319,31.36,19.77,31.36z M6.465,21.516c0.002,0.002,2.595,2.811,3.44,3.767c2.865,3.236,5.099,5.357,9.865,5.357
	c6.532,0,7.87-3.14,7.87-7.854v-4.01c0-1.948-1.603-3.417-3.728-3.417H17c-0.199,0-0.36-0.161-0.36-0.36V7
	c0-0.98-0.66-1.639-1.642-1.64C14.019,5.361,13.36,6.02,13.36,7v15.5c0,0.149-0.092,0.283-0.232,0.337
	c-0.139,0.054-0.298,0.015-0.397-0.099c-0.03-0.033-2.983-3.368-4.158-4.271c-0.925-0.709-2.589-0.673-3.562-0.192
	c-0.413,0.203-0.65,0.463-0.65,0.711c0.057,0.274,1.063,1.38,1.603,1.975L6.465,21.516z M10.755,11.729
	C9.407,10.535,8.634,8.811,8.634,7c0-3.507,2.853-6.36,6.36-6.36s6.36,2.853,6.36,6.36c0,1.811-0.773,3.534-2.121,4.729
	l-0.479-0.539c1.194-1.058,1.879-2.585,1.879-4.19c0-3.11-2.529-5.64-5.64-5.64c-3.11,0-5.64,2.53-5.64,5.64
	c0,1.605,0.685,3.133,1.879,4.19L10.755,11.729z"
    />
    <rect
      id="_Transparent_Rectangle"
      style="fill:none;"
      width="32"
      height="32"
    />
  </svg>
`;
/* eslint-enable max-len */

/**
 * Returns the pictogram based on the storybook knob value
 *
 * @param {string} sel string that defines the returning pictogram
 * @returns {*} Pictogram SVG markup
 */
const selectPictogram = (sel) => {
  switch (sel) {
    case 'Desktop':
      return Desktop;
    case 'Pattern':
      return Pattern;
    case 'Touch':
      return Touch;
    default:
      return '';
  }
};

const pictograms = {
  Desktop: 'Desktop',
  Touch: 'Touch',
  Pattern: 'Pattern',
};

const pictogramColors = {
  'Text color (default)': COLOR_OPTIONS.DEFAULT,
  Blue: COLOR_OPTIONS.BLUE,
};

export const Default = (args) => {
  const { heading, copy, href, linkCopy, pictogram, pictogramColor } =
    args?.PictogramItem ?? {};
  return html`
    <dds-pictogram-item color="${pictogramColor}">
      ${pictogram?.src}
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      <dds-link-with-icon href="${href}" slot="footer">
        ${linkCopy} ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-pictogram-item>
  `;
};

export default {
  title: 'Components/Pictogram item',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      PictogramItem: () => ({
        heading: textNullable('Heading (heading):', 'Lorem ipsum dolor sit'),
        copy:
          'Lorem ipsum dolor sit amet, ' +
          'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
          'Ut enim ad minim veniam\n',
        href: textNullable('Link with Icon href:', 'https://example.com'),
        linkCopy: textNullable('Link with Icon copy:', 'Lorem ipsum dolor'),
        pictogram: {
          src: selectPictogram(
            select('Pictogram (required)', pictograms, pictograms.Desktop)
          ),
          'aria-label': textNullable('Aria-label:', 'Pictogram description'),
        },
        pictogramColor: select(
          'Pictogram color:',
          pictogramColors,
          COLOR_OPTIONS.DEFAULT
        ),
      }),
    },
    propsSet: {
      default: {
        PictogramItem: {
          heading: 'Lorem ipsum dolor sit',
          copy:
            'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
            'Ut enim ad minim veniam\n',
          href: 'https://example.com',
          linkCopy: 'Lorem ipsum dolor',
          pictogram: {
            src: pictograms.Desktop,
            'aria-label': 'Pictogram description',
          },
          pictogramColor: COLOR_OPTIONS.DEFAULT,
        },
      },
    },
  },
};
