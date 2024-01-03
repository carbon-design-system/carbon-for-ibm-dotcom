/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentItemParagraph from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-paragraph';
import C4DFeatureSection from '@carbon/ibmdotcom-web-components/es/components-react/feature-section/feature-section';
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import imgXlg1x1 from '../../../../.storybook/storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import imgLg1x1 from '../../../../.storybook/storybook-images/assets/1312/fpo--1x1--1312x1312--002.jpg';
import imgMd4x3 from '../../../../.storybook/storybook-images/assets/960/fpo--4x3--960x720--002.jpg';
import imgSm1x1 from '../../../../.storybook/storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXs1x1 from '../../../../.storybook/storybook-images/assets/320/fpo--1x1--320x320--002.jpg';
import { CTA_TYPE } from '../../cta/defs';
import { COLOR_SCHEME } from '../defs';

import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

import {
  hrefsForType,
  knobNamesForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

const colorSchemeTypes = {
  [`${COLOR_SCHEME.REGULAR}`]: COLOR_SCHEME.REGULAR,
  [`${COLOR_SCHEME.INVERSE}`]: COLOR_SCHEME.INVERSE,
  [`${COLOR_SCHEME.PURPLE}`]: COLOR_SCHEME.PURPLE,
  [`${COLOR_SCHEME.CYAN}`]: COLOR_SCHEME.CYAN,
};

export const Default = (args) => {
  const {
    alt,
    colorScheme,
    eyebrow,
    heading,
    copy,
    href,
    ctaType,
    defaultSrc,
  } = args?.FeatureSection ?? {};
  let videoFooterCopy;

  if (ctaType === CTA_TYPE.VIDEO) {
    const card = document.querySelector('c4d-card') as any;
    const duration = card?.videoTitle?.match(/\((.*)\)/)?.pop();

    videoFooterCopy = duration;
  }
  return (
    <C4DVideoCTAContainer>
      <C4DFeatureSection color-scheme={colorScheme}>
        <C4DImage slot="image" default-src={defaultSrc} alt={alt}>
          <C4DImageItem
            media="(min-width: 1584px)"
            srcset={imgXlg1x1}></C4DImageItem>
          <C4DImageItem
            media="(min-width: 1056px)"
            srcset={imgLg1x1}></C4DImageItem>
          <C4DImageItem
            media="(min-width: 672px)"
            srcset={imgMd4x3}></C4DImageItem>
          <C4DImageItem
            media="(min-width: 320px)"
            srcset={imgSm1x1}></C4DImageItem>
          <C4DImageItem
            media="(min-width: 0px)"
            srcset={imgXs1x1}></C4DImageItem>
        </C4DImage>
        <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow>
        <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
        <C4DContentItemParagraph slot="copy">{copy}</C4DContentItemParagraph>

        <C4DCard link slot="footer" href={href} cta-type={ctaType}>
          <C4DCardHeading>
            Try a free virtual business framing session with IBM Garage
          </C4DCardHeading>
          {ctaType === CTA_TYPE.VIDEO ? (
            <C4DCardFooter> {videoFooterCopy} </C4DCardFooter>
          ) : (
            <C4DCardFooter></C4DCardFooter>
          )}
        </C4DCard>
      </C4DFeatureSection>
    </C4DVideoCTAContainer>
  );
};

Default.story = {
  parameters: {
    knobs: {
      FeatureSection: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );

        return {
          colorScheme: select(
            'Color scheme:',
            colorSchemeTypes,
            COLOR_SCHEME.REGULAR
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
          ctaType,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
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
