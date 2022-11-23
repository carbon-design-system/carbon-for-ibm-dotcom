/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentItemParagraph from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-paragraph';
import DDSFeatureSection from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section';
// eslint-disable-next-line max-len
import DDSFeatureSectionCardLink from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section-card-link';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';

import imgXlg1x1 from '../../../../../storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/1312/fpo--1x1--1312x1312--002.jpg';
import imgMd4x3 from '../../../../../storybook-images/assets/960/fpo--4x3--960x720--002.jpg';
import imgSm1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXs1x1 from '../../../../../storybook-images/assets/320/fpo--1x1--320x320--002.jpg';
import { MEDIA_ALIGNMENT } from '../defs';
import { CTA_TYPE } from '../../cta/defs';

import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

const mediaAlignment = {
  [`Left`]: MEDIA_ALIGNMENT.LEFT,
  [`Right`]: MEDIA_ALIGNMENT.RIGHT,
};

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

export const Default = (args) => {
  const { alt, eyebrow, heading, copy, href, ctaType, mediaAlign, defaultSrc } =
    args?.FeatureSection ?? {};
  return (
    <DDSFeatureSection media-alignment={mediaAlign}>
      <DDSImage slot="image" default-src={defaultSrc} alt={alt}>
        <DDSImageItem
          media="(min-width: 1584px)"
          srcset={imgXlg1x1}
        ></DDSImageItem>
        <DDSImageItem
          media="(min-width: 1056px)"
          srcset={imgLg1x1}
        ></DDSImageItem>
        <DDSImageItem
          media="(min-width: 672px)"
          srcset={imgMd4x3}
        ></DDSImageItem>
        <DDSImageItem
          media="(min-width: 320px)"
          srcset={imgSm1x1}
        ></DDSImageItem>
        <DDSImageItem media="(min-width: 0px)" srcset={imgXs1x1}></DDSImageItem>
      </DDSImage>
      <DDSCardEyebrow>{eyebrow}</DDSCardEyebrow>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSContentItemParagraph slot="copy">{copy}</DDSContentItemParagraph>

      <DDSFeatureSectionCardLink
        slot="footer"
        href={href}
        cta-type={ctaType}
        color-scheme="inverse"
      >
        <DDSCardLinkHeading>
          Try a free virtual business framing session with IBM Garage
        </DDSCardLinkHeading>
        <DDSCardCTAFooter color-scheme="inverse"> </DDSCardCTAFooter>
      </DDSFeatureSectionCardLink>
    </DDSFeatureSection>
  );
};

Default.story = {
  parameters: {
    knobs: {
      FeatureSection: () => ({
        mediaAlign: select(
          'Media Alignment',
          mediaAlignment,
          MEDIA_ALIGNMENT.RIGHT
        ),
        eyebrow: textNullable(
          'Card Eyebrow (optional)(eyebrow):',
          '5 min activity'
        ),
        heading: textNullable(
          'Card Heading (required)(heading):',
          'Ready when you are'
        ),
        copy: textNullable(
          'Card copy (optional)(copy):',
          `Were flexible. We can work with you on a wide variety of engagements on a project
          or consulting basis. And were technology agnostic. Our experts work with any vendors technology, not just IBMs.
          You decide how you want to work and where to focus our expertise.`
        ),
        alt: textNullable('Image Alt Text (alt):', 'Image alt text'),
        ctaType: select('CTA type (cta-type)', types, CTA_TYPE.LOCAL),
        href: textNullable('CTA Href (href):', 'https://example.com'),
      }),
    },
  },
};

export default {
  title: 'Components/Feature section',
  decorators: [
    (story) => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
