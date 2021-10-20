/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
// @ts-ignore
import DDSCardInCard from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card';
// @ts-ignore
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
// @ts-ignore
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
// @ts-ignore
import DDSCardInCardImage from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card-image';
// @ts-ignore
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
// @ts-ignore
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { video, eyebrow, heading, defaultSrc, alt, href } = parameters?.props?.CardInCard ?? {};

  if (video) {
    return (
      <DDSVideoCTAContainer>
        <DDSCardInCard href="1_9h94wo6b" cta-type="video">
          <DDSCardEyebrow>{eyebrow}</DDSCardEyebrow>
          <DDSCardCTAFooter cta-type="video" href="1_9h94wo6b"></DDSCardCTAFooter>
        </DDSCardInCard>
      </DDSVideoCTAContainer>
    );
  }

  return (
    <DDSCardInCard href={href}>
      <DDSCardInCardImage slot="image" alt={alt} default-src={defaultSrc}>
        <DDSImageItem media="(min-width: 1312px)" srcset={imgXlg16x9}></DDSImageItem>
        <DDSImageItem media="(min-width: 672px)" srcset={imgMd16x9}></DDSImageItem>
        <DDSImageItem media="(min-width: 320px)" srcset={imgSm4x3}></DDSImageItem>
      </DDSCardInCardImage>
      <DDSCardEyebrow>{eyebrow}</DDSCardEyebrow>
      <DDSCardHeading>{heading}</DDSCardHeading>
      <DDSCardCTAFooter>
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardInCard>
  );
};

Default.story = {
  parameters: {
    knobs: {
      CardInCard: () => {
        const video = boolean('video', false);
        const alt = video ? undefined : textNullable('Image alt text (alt):', 'Image alt text');
        const defaultSrc = video ? undefined : textNullable('Image src (defaultSrc):', imgSm4x3);
        const heading = video
          ? undefined
          : textNullable('Card Heading (heading):', 'Standard Bank Group prepares to embrace Africa’s AI opportunity');
        const href = video ? undefined : textNullable('Card Href (href):', 'https://example.com');
        return {
          video,
          alt,
          defaultSrc,
          heading,
          href,
          eyebrow: textNullable('Card Eyebrow (eyebrow):', 'Label'),
        };
      },
    },
  },
};

export default {
  title: 'Components/Card in card',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-12 bx--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
