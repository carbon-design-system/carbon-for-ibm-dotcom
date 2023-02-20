/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import imgMax from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--4x3--480x360--005.jpg';
import { GRADIENT_DIRECTION } from '../defs';
import readme from './README.stories.react.mdx';

const gradientDirections = {
  [`Left to Right`]: GRADIENT_DIRECTION.LEFT_TO_RIGHT,
  [`Top to Bottom`]: GRADIENT_DIRECTION.TOP_TO_BOTTOM,
};

export const Default = ({ parameters }) => {
  const { alt, gradientDirection, backgroundOpacity } = parameters?.props?.['dds-background-media'] ?? {};
  return (
    <DDSBackgroundMedia
      gradient-direction={gradientDirection}
      mobile-position="bottom"
      alt={alt}
      default-src={imgMax}
      opacity={backgroundOpacity}>
      <DDSImageItem media="(min-width: 1584px)" srcset={imgMax}>
        {' '}
      </DDSImageItem>
      <DDSImageItem media="(min-width: 1312px)" srcset={imgLg16x9}>
        {' '}
      </DDSImageItem>
      <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9}>
        {' '}
      </DDSImageItem>
      <DDSImageItem media="(min-width: 320px)" srcset={imgSm4x3}>
        {' '}
      </DDSImageItem>
      <DDSImageItem media="(min-width: 0px)" srcset={imgSm4x3}>
        {' '}
      </DDSImageItem>
    </DDSBackgroundMedia>
  );
};

export const WithVideo = ({ parameters }) => {
  const { gradientDirection, backgroundOpacity } = parameters?.props?.['dds-background-media'] ?? {};
  return (
    <div style={{ height: '70vh' }}>
      <DDSBackgroundMedia gradient-direction={gradientDirection} mobile-position="bottom" opacity={backgroundOpacity}>
        <DDSVideoPlayerContainer video-id="1_9h94wo6b" background-mode="true"></DDSVideoPlayerContainer>
      </DDSBackgroundMedia>
    </div>
  );
};

export const WithDefaultSource = ({ parameters }) => {
  const { alt, gradientDirection, backgroundOpacity } = parameters?.props?.['dds-background-media'] ?? {};
  return (
    <DDSBackgroundMedia
      gradient-direction={gradientDirection}
      mobile-position="bottom"
      alt={alt}
      default-src={imgMax}
      opacity={backgroundOpacity}></DDSBackgroundMedia>
  );
};

export default {
  title: 'Components/Background media',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      'dds-background-media': ({ groupId }) => ({
        gradientDirection: select(
          'Gradient Direction (gradient-direction):',
          gradientDirections,
          GRADIENT_DIRECTION.LEFT_TO_RIGHT,
          groupId
        ),
        alt: text('Image alt text (alt):', 'Image alt text', groupId),
        defaultSrc: text('Default image (default-src)', imgMax, groupId),
        backgroundOpacity: number('Background Opacity', 100, { range: true, min: 0, max: 100 }, groupId),
      }),
    },
    propsSet: {
      default: {
        'dds-background-media': {
          gradientDirection: 'left-to-right',
          alt: 'Image alt text',
          defaultSrc: imgMax,
          backgroundOpacity: '100',
        },
      },
    },
  },
};
