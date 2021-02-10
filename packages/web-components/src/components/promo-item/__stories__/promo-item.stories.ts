/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../../content-item/content-item-heading';
import '../../content-item/content-item-copy';
import '../promo-item';
import '../promo-item-statistic';
import '../../link-with-icon/link-with-icon';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--001.jpg';

export const Default = ({ parameters }) => {
  const { heading, copy, href, linkCopy } = parameters?.props?.PromoItem ?? {};
  return html`
    <dds-promo-item>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-content-item-copy slot="copy">${copy}</dds-content-item-copy>
      <dds-link-with-icon href="${href}" slot="footer">
        ${linkCopy} ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-promo-item>
  `;
};

export const withImage = ({ parameters }) => {
  const { heading, copy, href, linkCopy } = parameters?.props?.PromoItem ?? {};
  return html`
    <dds-promo-item>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-image slot="image" alt="Image alt text" default-src="${imgXlg16x9}"> </dds-image>
      <dds-content-item-copy slot="copy">${copy}</dds-content-item-copy>
      <dds-link-with-icon href="${href}" slot="footer">
        ${linkCopy} ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-promo-item>
  `;
};

export const withStatistic = ({ parameters }) => {
  const { heading, statistic, copy, href, linkCopy } = parameters?.props?.PromoItem ?? {};
  return html`
    <dds-promo-item>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-promo-item-statistic>${statistic}</dds-promo-item-statistic>
      <dds-content-item-copy slot="copy">${copy}</dds-content-item-copy>
      <dds-link-with-icon href="${href}" slot="footer">
        ${linkCopy} ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-promo-item>
  `;
};

export const withPictogram = ({ parameters }) => {
  const { heading, copy, href, linkCopy } = parameters?.props?.PromoItem ?? {};
  return html`
    <dds-promo-item>
      <dds-card-heading>${heading}</dds-card-heading>
      <svg
        slot="pictogram"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        data-autoid="dds--pictogram-item__pictogram"
        aria-label="Pictogram description"
        viewBox="0 0 32 32"
        role="img"
        class="bx--promo-item__pictogram"
      >
        <path
          d="M13.5 7.36H7v-.72h6.5v.72zm0 8.28H7v.72h6.5v-.72zM7 25.36h6.5v-.72H7v.72zM30.36 7v9a.36.36 0 01-.36.36h-3.64V19a.36.36 0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2.36v8.28h3.28V22a.36.36 0 01.36-.36h20a.36.36 0 01.36.36v6a.36.36 0 01-.36.36H6a.36.36 0 01-.36-.36v-2.64H2a.36.36 0 01-.36-.36v-9a.36.36 0 01.36-.36h3.64V13a.36.36 0 01.36-.36h20a.36.36 0 01.36.36v2.64h3.279V7.36H26.36V10a.36.36 0 01-.36.36H6a.36.36 0 01-.36-.36V4A.36.36 0 016 3.64h20a.36.36 0 01.36.36v2.64H30a.36.36 0 01.36.36zm-4.72-2.64H6.36v5.28h19.28V4.36zM6.36 27.64h19.28v-5.28H6.36v5.28zm19.28-14.28H6.36v5.28h19.28v-5.28zM24 7a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0zm0 9a.5.5 0 10-1 0 .5.5 0 001 0z"
        />
        <path fill="none" d="M0 0h32v32H0z" />
      </svg>
      <dds-content-item-copy slot="copy">${copy}</dds-content-item-copy>
      <dds-link-with-icon href="${href}" slot="footer">
        ${linkCopy} ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-promo-item>
  `;
};

export default {
  title: 'Components/Promo Item',
  parameters: {
    ...readme.parameters,
    knobs: {
      PromoItem: ({ groupId }) => ({
        heading: textNullable('Heading (heading):', 'Lorem ipsum dolor sit', groupId),
        statistic: textNullable('Statistic (statistic):', '100%', groupId),
        copy: textNullable(
          'Copy (copy):',
          'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
            'Ut enim ad minim veniam\n',
          groupId
        ),
        href: textNullable('Link with Icon href:', 'https://example.com', groupId),
        linkCopy: textNullable('Link with Icon copy:', 'Lorem ipsum dolor', groupId),
      }),
    },
    hasGrid: true,
  },
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-9 bx--offset-lg-3">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
};
