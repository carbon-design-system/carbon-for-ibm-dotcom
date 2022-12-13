/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/index';
import '../../image/image';
import '../index';
import '../../cta/card-cta-footer';
import '../../cta/video-cta-container';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';

import readme from './README.stories.mdx';

export const Default = args => {
  const { video, eyebrow, heading, defaultSrc, alt, href } = args;

  if (video) {
    return html`
      <dds-video-cta-container>
        <dds-card-in-card href="1_9h94wo6b" cta-type="video">
          <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
          <dds-card-cta-footer
            cta-type="video"
            href="1_9h94wo6b"
          ></dds-card-cta-footer>
        </dds-card-in-card>
      </dds-video-cta-container>
    `;
  }
  return html`
    <dds-card-in-card href=${ifNonNull(href || undefined)}>
      <dds-card-in-card-image
        slot="image"
        alt="${ifNonNull(alt)}"
        default-src="${ifNonNull(defaultSrc)}"
      >
        <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}">
        </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd16x9}">
        </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}">
        </dds-image-item>
      </dds-card-in-card-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-card-cta-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-in-card>
  `;
};

export default {
  title: 'Components/Card in card',
  component: 'dds-card-in-card',
  argTypes: {
    video: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'Image alt text',
      if: { arg: 'video', truthy: false },
    },
    defaultSrc: {
      control: { type: 'text' },
      defaultValue: imgSm4x3,
      if: { arg: 'video', truthy: false },
    },
    heading: {
      control: { type: 'text' },
      defaultValue:
        'Standard Bank Group prepares to embrace Africa’s AI opportunity',
      if: { arg: 'video', truthy: false },
    },
    href: {
      control: { type: 'text' },
      defaultValue: 'https://example.com',
      if: { arg: 'video', truthy: false },
    },
    eyebrow: {
      control: { type: 'text' },
      defaultValue: 'Label',
    },
    footer: {
      table: {
        disable: true,
      },
    },
    image: {
      table: {
        disable: true,
      },
    },
    'pictogram-placement': {
      table: {
        disable: true,
      },
    },
    'color-scheme': {
      table: {
        disable: true,
      },
    },
    'cta-type': {
      table: {
        disable: true,
      },
    },
    'video-thumbnail-url': {
      table: {
        disable: true,
      },
    },
    'video-description': {
      table: {
        disable: true,
      },
    },
    'video-name': {
      table: {
        disable: true,
      },
    },
    videoName: {
      table: {
        disable: true,
      },
    },
    'video-duration': {
      table: {
        disable: true,
      },
    },
    'no-poster': {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    rel: {
      table: {
        disable: true,
      },
    },
    ping: {
      table: {
        disable: true,
      },
    },
    linkRole: {
      table: {
        disable: true,
      },
    },
    hreflang: {
      table: {
        disable: true,
      },
    },
    pictogramPlacement: {
      table: {
        disable: true,
      },
    },
    colorScheme: {
      table: {
        disable: true,
      },
    },
    ctaType: {
      table: {
        disable: true,
      },
    },
    videoThumbnailUrl: {
      table: {
        disable: true,
      },
    },
    videoDescription: {
      table: {
        disable: true,
      },
    },
    videoname: {
      table: {
        disable: true,
      },
    },
    videoDuration: {
      table: {
        disable: true,
      },
    },
    formatVideoDuration: {
      table: {
        disable: true,
      },
    },
    formatVideoCaption: {
      table: {
        disable: true,
      },
    },
    noPoster: {
      table: {
        disable: true,
      },
    },
    logo: {
      table: {
        disable: true,
      },
    },
    border: {
      table: {
        disable: true,
      },
    },
    thumbnail: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        'dds-card-in-card': {
          video: false,
          alt: 'Image alt text',
          defaultSrc: imgSm4x3,
          heading:
            'Standard Bank Group prepares to embrace Africa’s AI opportunity',
          href: 'https://example.com',
          eyebrow: 'Label',
        },
      },
    },
  },
};
