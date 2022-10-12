/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../video-player/video-player-container';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import imgMax from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--4x3--480x360--005.jpg';
import { GRADIENT_DIRECTION } from '../defs';
import readme from './README.stories.mdx';

const gradientDirections = {
  [`Left to Right`]: GRADIENT_DIRECTION.LEFT_TO_RIGHT,
  [`Top to Bottom`]: GRADIENT_DIRECTION.TOP_TO_BOTTOM,
};

export const Default = args => {
  const { alt, opacity } = args ?? {};
  return html`
    <dds-background-media
      gradient-direction="${ifNonNull(args['gradient-direction'])}"
      mobile-position="bottom"
      alt="${ifNonNull(alt)}"
      default-src="${imgMax}"
      opacity="${ifNonNull(opacity)}"
    >
      <dds-image-item media="(min-width: 1584px)" srcset="${imgMax}"> </dds-image-item>
      <dds-image-item media="(min-width: 1312px)" srcset="${imgLg16x9}"> </dds-image-item>
      <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
      <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      <dds-image-item media="(min-width: 0px)" srcset="${imgSm4x3}"> </dds-image-item>
    </dds-background-media>
  `;
};

export const WithVideo = args => {
  const { opacity } = args ?? {};
  return html`
    <div style="height: 70vh;">
      <dds-background-media
        gradient-direction="${ifNonNull(args['gradient-direction'])}"
        mobile-position="bottom"
        opacity="${ifNonNull(opacity)}"
      >
        <dds-video-player-container video-id="1_9h94wo6b" background-mode="true"></dds-video-player-container>
      </dds-background-media>
    </div>
  `;
};

export const WithDefaultSource = args => {
  const { alt, opacity } = args ?? {};
  return html`
    <dds-background-media
      gradient-direction="${ifNonNull(args['gradient-direction'])}"
      mobile-position="bottom"
      alt="${ifNonNull(alt)}"
      default-src="${imgMax}"
      opacity="${ifNonNull(opacity)}"
    >
    </dds-background-media>
  `;
};

export default {
  title: 'Components/Background media',
  component: 'dds-background-media',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
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
