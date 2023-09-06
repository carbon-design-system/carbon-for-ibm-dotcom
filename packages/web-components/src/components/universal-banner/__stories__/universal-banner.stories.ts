/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
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

export const Default = (args) => {
  const { heading, copy, ctaCopy, imageWidth } = args?.UniversalBanner ?? {};

  const bannerHeading = document.querySelector('c4d-universal-banner-heading');
  const bannerCopy = document.querySelector('c4d-universal-banner-copy');

  if (bannerHeading) {
    bannerHeading!.shadowRoot!.textContent = heading;
  }

  if (bannerCopy) {
    bannerCopy!.shadowRoot!.textContent = copy;
  }

  const srcset = srcsets[imageWidth];

  return html`
    <c4d-universal-banner image-width="${imageWidth}">
      ${imageWidth
        ? html`
            <c4d-universal-banner-image
              slot="image"
              default-src="${images[imageWidth]}">
              <c4d-image-item media="(min-width: 1584px)" srcset="${srcset[2]}">
              </c4d-image-item>
              <c4d-image-item media="(min-width: 1056px)" srcset="${srcset[1]}">
              </c4d-image-item>
              <c4d-image-item media="(min-width: 1312px)" srcset="${srcset[0]}">
              </c4d-image-item>
            </c4d-universal-banner-image>
          `
        : ``}
      <c4d-universal-banner-heading slot="heading"
        >${heading}</c4d-universal-banner-heading
      >
      <c4d-universal-banner-copy slot="copy">${copy}</c4d-universal-banner-copy>
      <c4d-button-cta
        slot="cta"
        cta-type="local"
        kind="tertiary"
        href="https://www.example.com">
        ${ctaCopy}
      </c4d-button-cta>
    </c4d-universal-banner>
  `;
};

Default.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      UniversalBanner: () => ({
        heading: textNullable(
          'Heading:',
          'Hybrid cloud and AI for smarter business'
        ),
        copy: text('Copy (optional):', 'Las Vegas, June 15-18, 2025'),
        ctaCopy: textNullable('CTA copy:', 'Register for Think. Free'),
        imageWidth: select('Image width:', imageWidthOptions, '4-col'),
      }),
    },
  },
};

export default {
  title: 'Components/Universal banner',
  decorators: [
    (story) => {
      return html` ${story()} `;
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
