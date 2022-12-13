/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import '../index';
import '../../content-item-horizontal/index';
import '../../image/index';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../../content-item-horizontal/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

export const Default = args => {
  const { sectionHeading, sectionHeadingText, align, type } = args;
  const tabs: any[] = [];

  for (let i = 1; i < 5; i++) {
    tabs.push(html`
      <dds-tab label="Tab ${i}">
        <dds-content-item-horizontal-media align="${align}">
          ${type === MEDIA_TYPE.IMAGE
            ? html`
                <dds-image slot="media" alt="Image alt text" default-src="${imgLg16x9}"></dds-image>
              `
            : ''}
          ${type === MEDIA_TYPE.VIDEO
            ? html`
                <dds-content-item-horizontal-media-video video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
              `
            : ''}
          <dds-content-item-heading>Tab heading ${i}</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy
            >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin.</dds-content-item-horizontal-media-copy
          >
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
              CTA ${i}
            </dds-link-list-item-cta>
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
              Microservices and containers
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal-media>
      </dds-tab>
    `);
  }

  return html`
    <dds-tabs-extended-media section-heading=${sectionHeading}>
      <dds-content-section-heading>${ifNonNull(sectionHeadingText)}</dds-content-section-heading>
      ${tabs}
    </dds-tabs-extended-media>
  `;
};

Default.story = {
  argTypes: {
    align: {
      options: mediaAlign,
      control: { type: 'select' },
      defaultValue: mediaAlign.Left,
    },
    sectionHeading: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    sectionHeadingText: {
      control: { type: 'text' },
      defaultValue: 'Section heading',
      if: { arg: 'sectionHeading' },
    },
    type: {
      options: mediaType,
      control: { type: 'select' },
      defaultValue: mediaType.Image,
    },
    'section-heading': {
      table: {
        disable: true,
      },
    },
    orientation: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    propsSet: {
      default: {
        TabsExtendedWithMedia: {
          sectionHeading: 'TitleHeading',
          align: 'left',
          type: 'image',
        },
      },
    },
  },
};

export default {
  title: 'Components/Tabs extended - with media',
  component: 'dds-tabs-extended-media',
  decorators: [
    (story, { args }) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="${args?.TabsExtendedWithMedia?.sectionHeading ? `bx--col-lg-16` : `bx--col-lg-12`} bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {},
  },
};
