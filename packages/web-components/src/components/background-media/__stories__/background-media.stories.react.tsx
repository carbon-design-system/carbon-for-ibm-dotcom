/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import imgMax from '../../../../.storybook/storybook-images/assets/leadspace/leadspaceMax.jpg';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import imgSm4x3 from '../../../../.storybook/storybook-images/assets/leadspace/fpo--leadspace--4x3--480x360--005.jpg';
import { GRADIENT_DIRECTION } from '../defs';
import readme from './README.stories.react.mdx';

const gradientDirections = {
  [`Left to Right`]: GRADIENT_DIRECTION.LEFT_TO_RIGHT,
  [`Top to Bottom`]: GRADIENT_DIRECTION.TOP_TO_BOTTOM,
};

export const Default = (args) => {
  const { alt, gradientDirection, backgroundOpacity } =
    args?.['cds-background-media'] ?? {};
  return (
    <C4DBackgroundMedia
      gradient-direction={gradientDirection}
      mobile-position="bottom"
      alt={alt}
      default-src={imgMax}
      opacity={backgroundOpacity}>
      <C4DImageItem media="(min-width: 1584px)" srcset={imgMax}>
        {' '}
      </C4DImageItem>
      <C4DImageItem media="(min-width: 1312px)" srcset={imgLg16x9}>
        {' '}
      </C4DImageItem>
      <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9}>
        {' '}
      </C4DImageItem>
      <C4DImageItem media="(min-width: 320px)" srcset={imgSm4x3}>
        {' '}
      </C4DImageItem>
      <C4DImageItem media="(min-width: 0px)" srcset={imgSm4x3}>
        {' '}
      </C4DImageItem>
    </C4DBackgroundMedia>
  );
};

export const WithVideo = (args) => {
  const { gradientDirection, backgroundOpacity } =
    args?.['cds-background-media'] ?? {};
  return (
    <div style={{ height: '70vh' }}>
      <C4DBackgroundMedia
        gradient-direction={gradientDirection}
        mobile-position="bottom"
        opacity={backgroundOpacity}>
        <C4DVideoPlayerContainer
          video-id="0_ibuqxqbe"
          background-mode="true"></C4DVideoPlayerContainer>
      </C4DBackgroundMedia>
    </div>
  );
};

export const WithDefaultSource = (args) => {
  const { alt, gradientDirection, backgroundOpacity } =
    args?.['cds-background-media'] ?? {};
  return (
    <C4DBackgroundMedia
      gradient-direction={gradientDirection}
      mobile-position="bottom"
      alt={alt}
      default-src={imgMax}
      opacity={backgroundOpacity}></C4DBackgroundMedia>
  );
};

export default {
  title: 'Components/Background media',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      'cds-background-media': () => ({
        gradientDirection: select(
          'Gradient Direction (gradient-direction):',
          gradientDirections,
          GRADIENT_DIRECTION.LEFT_TO_RIGHT
        ),
        alt: text('Image alt text (alt):', 'Image alt text'),
        defaultSrc: text('Default image (default-src)', imgMax),
        backgroundOpacity: number('Background Opacity', 100, {
          range: true,
          min: 0,
          max: 100,
        }),
      }),
    },
    propsSet: {
      default: {
        'cds-background-media': {
          gradientDirection: 'left-to-right',
          alt: 'Image alt text',
          defaultSrc: imgMax,
          backgroundOpacity: '100',
        },
      },
    },
  },
};
