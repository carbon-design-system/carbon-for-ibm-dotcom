/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import '../../card-group/index';
import '../../image/index';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgMd2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--005.jpg';
import { ORIENTATION } from '../defs';
import readme from './README.stories.mdx';

const images = {
  '2x1': {
    default: imgLg2x1,
    srcsets: [imgSm2x1, imgMd2x1, imgLg2x1],
  },
  '16x9': {
    default: imgLg16x9,
    srcsets: [imgSm16x9, imgMd16x9, imgLg16x9],
  },
};

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`vertical`]: ORIENTATION.VERTICAL,
};

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

export const Default = ({ parameters }) => {
  const { orientation } = parameters?.props?.TabsExtended ?? {};
  return html`
    <dds-tabs-extended orientation="${ifNonNull(orientation)}">
      <dds-tab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet consectetur adipiscing elit"
        selected
      >
        <dds-content-block-media-content>
          <dds-content-item>
            <dds-content-item-heading>Content for first tab goes here.</dds-content-item-heading>
            <dds-content-item-copy>${copy}</dds-content-item-copy>
          </dds-content-item>

          <dds-card-link-cta slot="footer" href="https://example.com">
            <dds-card-link-heading>Lorem ipsum dolor sit amet</dds-card-link-heading>
            <dds-card-footer>
              ${ArrowRight20({ slot: 'icon' })}
            </dds-card-footer>
          </dds-card-link-cta>
        </dds-content-block-media-content>
      </dds-tab>
      <dds-tab label="Second tab - min amount for tooltip ">
        <dds-content-block-media-content>
          <dds-content-item>
            <dds-content-item-heading>Content for second tab goes here.</dds-content-item-heading>
            <dds-content-item-copy>${copy}</dds-content-item-copy>
          </dds-content-item>
        </dds-content-block-media-content>
      </dds-tab>
      <dds-tab label="Third tab">
        <p>Content for third tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fifth tab" disabled>
        <p>Content for fifth tab goes here.</p>
      </dds-tab>
    </dds-tabs-extended>
  `;
};

const renderLightboxTab = i => {
  const aspectRatio = i % 2 ? '16x9' : '2x1';
  const img = images[aspectRatio];

  return html`
    <dds-tab label="Tab ${i}">
      <dds-image
        alt="demo image for tab ${i}"
        heading="Demo heading #${i}"
        default-src="${img.default}"
        copy="${ifNonNull(copy)}"
        lightbox
      >
        <dds-image-item media="(min-width: 672px)" srcset="${img.srcsets[2]}"> </dds-image-item>
        <dds-image-item media="(min-width: 400px)" srcset="${img.srcsets[1]}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${img.srcsets[0]}"> </dds-image-item>
      </dds-image>
    </dds-tab>
  `;
};

export const WithLightbox = () => {
  return html`
    <dds-tabs-extended lightbox>
      ${[...Array(5)].map((_tab, i) => renderLightboxTab(i + 1))}
    </dds-tabs-extended>
  `;
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      TabsExtended: ({ groupId }) => ({
        orientation: select('Orientation (orientation):', orientationType, ORIENTATION.HORIZONTAL, groupId),
      }),
    },
    propsSet: {
      default: {
        TabsExtended: {
          orientation: 'horizontal',
        },
      },
    },
  },
};
