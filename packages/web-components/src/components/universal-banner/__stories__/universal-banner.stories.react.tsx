/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import C4DUniversalBanner from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner';
import C4DUniversalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-heading';
import C4DUniversalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-copy';
import C4DUniversalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-image';
import C4DButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
/* eslint-enable max-len */
import readme from './README.stories.react.mdx';

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

  const bannerHeading = document.querySelector('dds-universal-banner-heading');

  if (bannerHeading) {
    bannerHeading!.shadowRoot!.textContent = heading;
  }

  const srcset = srcsets[imageWidth];

  return (
    <C4DUniversalBanner image-width={imageWidth}>
      {imageWidth ? (
        <C4DUniversalBannerImage slot="image" default-src={images[imageWidth]}>
          <C4DImageItem
            media="(min-width:1584px)"
            srcset={srcset[2]}></C4DImageItem>
          <C4DImageItem
            media="(min-width:1056px)"
            srcset={srcset[1]}></C4DImageItem>
          <C4DImageItem
            media="(min-width:1312px)"
            srcset={srcset[0]}></C4DImageItem>
        </C4DUniversalBannerImage>
      ) : (
        ''
      )}
      <C4DUniversalBannerHeading slot="heading">
        {heading}
      </C4DUniversalBannerHeading>
      <C4DUniversalBannerCopy slot="copy">{copy}</C4DUniversalBannerCopy>
      <C4DButtonCTA
        slot="cta"
        cta-type="local"
        kind="tertiary"
        href="https://www.example.com">
        {ctaCopy}
      </C4DButtonCTA>
    </C4DUniversalBanner>
  );
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
      return story();
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
