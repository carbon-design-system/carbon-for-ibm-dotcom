/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

export const Default = args => {
  const { alt, opacity } = args ?? {};
  return (
    <DDSBackgroundMedia
      gradient-direction={args['gradient-direction']}
      mobile-position="bottom"
      alt={alt}
      default-src={imgMax}
      opacity={opacity}>
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

export const WithVideo = args => {
  const { opacity } = args ?? {};
  return (
    <div style={{ height: '70vh' }}>
      <DDSBackgroundMedia gradient-direction={args['gradient-direction']} mobile-position="bottom" opacity={opacity}>
        <DDSVideoPlayerContainer video-id="1_9h94wo6b" background-mode="true"></DDSVideoPlayerContainer>
      </DDSBackgroundMedia>
    </div>
  );
};

export const WithDefaultSource = args => {
  const { alt, opacity } = args ?? {};
  return (
    <DDSBackgroundMedia
      gradient-direction={args['gradient-direction']}
      mobile-position="bottom"
      alt={alt}
      default-src={imgMax}
      opacity={opacity}></DDSBackgroundMedia>
  );
};

export default {
  title: 'Components/Background media',
  component: DDSBackgroundMedia,
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  argTypes: {
    'gradient-direction': {
      control: { type: 'radio' },
      options: gradientDirections,
      defaultValue: GRADIENT_DIRECTION.LEFT_TO_RIGHT,
    },
    opacity: {
      control: { type: 'range', min: 0, max: 100 },
      defaultValue: 100,
    },
    alt: {
      table: {
        disable: true,
      },
    },
    'default-src': {
      table: {
        disable: true,
      },
    },
    'launch-lightbox-button-assistive-text': {
      table: {
        disable: true,
      },
    },
    'mobile-position': {
      table: {
        disable: true,
      },
    },
    backgroundOpacity: {
      table: {
        disable: true,
      },
    },
    border: {
      table: {
        disable: true,
      },
    },
    containsOnlyImages: {
      table: {
        disable: true,
      },
    },
    copy: {
      table: {
        disable: true,
      },
    },
    defaultSrc: {
      table: {
        disable: true,
      },
    },
    gradientDirection: {
      table: {
        disable: true,
      },
    },
    gradientHidden: {
      table: {
        disable: true,
      },
    },
    heading: {
      table: {
        disable: true,
      },
    },
    launchLightboxButtonAssistiveText: {
      table: {
        disable: true,
      },
    },
    lightbox: {
      table: {
        disable: true,
      },
    },
    mobilePosition: {
      table: {
        disable: true,
      },
    },
    open: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    videoId: {
      table: {
        disable: true,
      },
    },
    videoIsPlaying: {
      table: {
        disable: true,
      },
    },
    videoPlayer: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    'icon-description': {
      table: {
        disable: true,
      },
    },
    'long-description': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
