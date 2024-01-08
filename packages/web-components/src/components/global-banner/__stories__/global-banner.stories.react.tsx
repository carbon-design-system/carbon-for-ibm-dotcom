/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { select, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
// @ts-ignore
import C4DGlobalBanner from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner';
import C4DGlobalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-heading';
import C4DGlobalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-copy';
import C4DGlobalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-image';
import C4DButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
/* eslint-enable max-len */
import readme from './README.stories.react.mdx';

// eslint-disable-next-line sort-imports
import img4Col from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-4-col-image.jpg';
import img8Col from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-8-col-image.jpg';
import img4ColLg from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-4-col-lg.jpg';
import img8ColLg from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-8-col-lg.jpg';
import img4ColXlg from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-4-col-xlg.jpg';
import img8ColXlg from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-8-col-xlg.jpg';

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
  const { heading, copy, ctaCopy, imageWidth } = args?.GlobalBanner ?? {};

  const bannerHeading = document.querySelector('cds-global-banner-heading');
  const bannerCopy = document.querySelector('c4d-global-banner-copy');

  if (bannerHeading) {
    bannerHeading!.shadowRoot!.textContent = heading;
  }

  if (bannerCopy) {
    bannerCopy!.shadowRoot!.textContent = copy;
  }

  const srcset = srcsets[imageWidth];

  return (
    <C4DGlobalBanner image-width={imageWidth}>
      {imageWidth ? (
        <C4DGlobalBannerImage default-src={images[imageWidth]}>
          <C4DImageItem
            media="(min-width:1584px)"
            srcset={srcset[2]}></C4DImageItem>
          <C4DImageItem
            media="(min-width:1056px)"
            srcset={srcset[1]}></C4DImageItem>
          <C4DImageItem
            media="(min-width:1312px)"
            srcset={srcset[0]}></C4DImageItem>
        </C4DGlobalBannerImage>
      ) : (
        ''
      )}
      <C4DGlobalBannerHeading>{heading}</C4DGlobalBannerHeading>
      <C4DGlobalBannerCopy></C4DGlobalBannerCopy>
      <C4DButton
        slot="cta"
        cta-type="local"
        kind="tertiary"
        href="https://www.example.com">
        {ctaCopy}
      </C4DButton>
    </C4DGlobalBanner>
  );
};

Default.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      GlobalBanner: () => ({
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
  title: 'Components/Global banner',
  decorators: [
    (story) => {
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
  },
  propsSet: {
    default: {
      GlobalBanner: {
        heading: 'Hybrid cloud and AI for smarter business',
        copy: 'Las Vegas, June 15-18, 2025',
        ctaCopy: 'Register for Think. Free',
        imageWidth: '4-col',
      },
    },
  },
};
