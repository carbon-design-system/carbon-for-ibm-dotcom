/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { boolean } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
// @ts-ignore
import C4DCardInCard from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card';
// @ts-ignore
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
// @ts-ignore
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
// @ts-ignore
import C4DCardInCardImage from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card-image';
// @ts-ignore
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
// @ts-ignore
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import readme from './README.stories.react.mdx';

export const Default = (args) => {
  const { video, eyebrow, heading, defaultSrc, alt, href } =
    args?.CardInCard ?? {};

  if (video) {
    const card = document.querySelector('c4d-card') as any;
    const videoCopy = card?.videoTitle;
    return (
      <C4DVideoCTAContainer>
        <C4DCardInCard href="0_ibuqxqbe" cta-type="video">
          <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow>
          <C4DCardHeading>{videoCopy ?? heading}</C4DCardHeading>
          <C4DCardCTAFooter
            cta-type="video"
            href="0_ibuqxqbe"></C4DCardCTAFooter>
        </C4DCardInCard>
      </C4DVideoCTAContainer>
    );
  }

  return (
    <C4DCardInCard href={href}>
      <C4DCardInCardImage slot="image" alt={alt} default-src={defaultSrc} cta-type="local">
        <C4DImageItem
          media="(min-width: 1312px)"
          srcset={imgXlg16x9}></C4DImageItem>
        <C4DImageItem
          media="(min-width: 672px)"
          srcset={imgMd16x9}></C4DImageItem>
        <C4DImageItem
          media="(min-width: 320px)"
          srcset={imgSm4x3}></C4DImageItem>
      </C4DCardInCardImage>
      <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow>
      <C4DCardHeading>{heading}</C4DCardHeading>
      <C4DCardCTAFooter>
      </C4DCardCTAFooter>
    </C4DCardInCard>
  );
};

Default.story = {
  parameters: {
    knobs: {
      CardInCard: () => {
        const video = boolean('video', false);
        const alt = video
          ? undefined
          : textNullable('Image alt text (alt):', 'Image alt text');
        const defaultSrc = video
          ? undefined
          : textNullable('Image src (defaultSrc):', imgSm4x3);
        const heading = video
          ? undefined
          : textNullable(
              'Card Heading (heading):',
              'Standard Bank Group prepares to embrace Africa’s AI opportunity'
            );
        const href = video
          ? undefined
          : textNullable('Card Href (href):', 'https://example.com');
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
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-12 cds--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
