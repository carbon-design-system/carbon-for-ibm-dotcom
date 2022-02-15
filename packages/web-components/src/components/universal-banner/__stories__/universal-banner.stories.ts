/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select, text } from '@storybook/addon-knobs';
import '../index';
import readme from './README.stories.mdx';

// eslint-disable-next-line sort-imports
import img4Col from '../../../../../storybook-images/assets/universal-banner/universal-banner-4-col-image.jpg';
import img8Col from '../../../../../storybook-images/assets/universal-banner/universal-banner-8-col-image.jpg';
import img4ColLg from '../../../../../storybook-images/assets/universal-banner/universal-banner-4-col-lg.jpg';
import img8ColLg from '../../../../../storybook-images/assets/universal-banner/universal-banner-8-col-lg.jpg';
import img4ColXlg from '../../../../../storybook-images/assets/universal-banner/universal-banner-4-col-xlg.jpg';
import img8ColXlg from '../../../../../storybook-images/assets/universal-banner/universal-banner-8-col-xlg.jpg';

// import StoryContent from '../../back-to-top/__stories__/data/content';
import textNullable from '../../../../.storybook/knob-text-nullable';

const imageWidthOptions = {
  [`4 Columns`]: `4-col`,
  [`8 Columns`]: `8-col`,
  [`None`]: '',
};

const images = {
  '4-col': img4Col,
  '8-col': img8Col,
};

const srcsets = {
  '4-col': [img4ColLg, img4ColXlg, img4Col],
  '8-col': [img8ColLg, img8ColXlg, img8Col],
};

export const Default = ({ parameters }) => {
  const { heading, copy, ctaCopy, imageWidth } = parameters?.props?.UniversalBanner ?? {};

  const bannerHeading = document.querySelector('dds-universal-banner-heading');
  const bannerCopy = document.querySelector('dds-universal-banner-copy');

  if (bannerHeading) {
    bannerHeading!.shadowRoot!.textContent = heading;
  }

  if (bannerCopy) {
    bannerCopy!.shadowRoot!.textContent = copy;
  }

  const srcset = srcsets[imageWidth];

  return html`
    <dds-universal-banner image-width="${imageWidth}">
      ${imageWidth
        ? html`
            <dds-universal-banner-image slot="image" default-src="${images[imageWidth]}">
              <dds-image-item media="(min-width: 1584px)" srcset="${srcset[2]}"> </dds-image-item>
              <dds-image-item media="(min-width: 1056px)" srcset="${srcset[1]}"> </dds-image-item>
              <dds-image-item media="(min-width: 1312px)" srcset="${srcset[0]}"> </dds-image-item>
            </dds-universal-banner-image>
          `
        : ``}
      <dds-universal-banner-heading slot="heading">${heading}</dds-universal-banner-heading>
      <dds-universal-banner-copy slot="copy">${copy}</dds-universal-banner-copy>
      <dds-button-cta slot="cta" cta-type="local" kind="tertiary" href="https://www.example.com">
        ${ctaCopy}
      </dds-button-cta>
    </dds-universal-banner>
  `;
};

Default.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      UniversalBanner: ({ groupId }) => ({
        heading: textNullable('Heading:', 'Hybrid cloud and AI for smarter business', groupId),
        copy: text('Copy (optional):', 'Las Vegas, June 15-18, 2025', groupId),
        ctaCopy: textNullable('CTA copy:', 'Register for Think. Free', groupId),
        imageWidth: select('Image width:', imageWidthOptions, '4-col', groupId),
      }),
    },
  },
};

export default {
  title: 'Components/Universal banner',
  decorators: [
    story => {
      return html`
        ${story()}
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
  },
  propsSet: {
    default: {
      UniversalBanner: {
        heading: 'Hybrid cloud and AI for smarter business',
        copy: 'Las Vegas, June 15-18, 2025',
        ctaCopy: 'Register for Think. Free',
        imageWidth: '4-col',
      },
    },
  },
};
