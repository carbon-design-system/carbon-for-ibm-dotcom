/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import '../../../internal/vendor/@carbon/web-components/components/accordion/index';
import { boolean, select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import '../../card-group/index';
import '../../content-item-horizontal/index';
import '../../image/index';
import '../../video-player/video-player-composite';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../../content-item-horizontal/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

export const Default = (args) => {
  const { sectionHeading, sectionHeadingText } =
    args?.TabsExtendedWithMedia ?? {};
  const { align, type } = args?.TabsExtendedWithMediaDefault ?? {};
  const tabs: any[] = [];

  for (let i = 1; i < 5; i++) {
    tabs.push(html`
      <dds-tab label="Tab ${i}">
        <dds-content-item-horizontal-media align="${align}">
          ${type === MEDIA_TYPE.IMAGE
            ? html`
                <dds-image
                  slot="media"
                  alt="Image alt text"
                  default-src="${imgLg16x9}"></dds-image>
              `
            : ''}
          ${type === MEDIA_TYPE.VIDEO
            ? html`
                <dds-content-item-horizontal-media-video
                  video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
              `
            : ''}
          <dds-content-item-heading>Tab heading ${i}</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy
            >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean
            et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus
            at elit sollicitudin.</dds-content-item-horizontal-media-copy
          >
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta
              icon-placement="right"
              href="https://www.ibm.com"
              cta-type="local">
              CTA ${i}
            </dds-link-list-item-cta>
            <dds-link-list-item-cta
              icon-placement="right"
              href="https://www.ibm.com"
              cta-type="external">
              Microservices and containers
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal-media>
      </dds-tab>
    `);
  }

  return html`
    <dds-tabs-extended-media section-heading=${sectionHeading}>
      <dds-content-section-heading
        >${ifNonNull(sectionHeadingText)}</dds-content-section-heading
      >
      ${tabs}
    </dds-tabs-extended-media>
  `;
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtendedWithMediaDefault: () => {
        return {
          align: select('Alignment (align)', mediaAlign, MEDIA_ALIGN.LEFT),
          type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        };
      },
    },
    propsSet: {
      default: {
        TabsExtendedWithMediaDefault: {
          align: 'left',
          type: MEDIA_TYPE.IMAGE,
        },
      },
    },
  },
};

export const WithMixedContent = (args) => {
  const { sectionHeading, sectionHeadingText } =
    args?.TabsExtendedWithMedia ?? {};

  // Needed to bypass html`` template strings from putting strings with line breaks
  // (which are forced by prettier formatting) into <pre> tags.
  const exampleStrings = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.`,
    `Donec tempus, urna eu elementum porta, justo massa porta nulla, et mattis mauris augue sit amet dolor.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at, molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula, vitae finibus ante aliquet a.`,
  ];

  const cardGroupItems = [
    html`
      <dds-card-group-item cta-type="local" href="/">
        <dds-card-eyebrow>Topic (Local)</dds-card-eyebrow>
        <dds-card-heading>Lorem ipsum dolor sit amet</dds-card-heading>
        <p>${exampleStrings[0]}</p>
        <dds-card-cta-footer slot="footer"></dds-card-cta-footer>
      </dds-card-group-item>
    `,
    html`
      <dds-card-group-item cta-type="external" href="https://example.com">
        <dds-card-eyebrow>Topic (External)</dds-card-eyebrow>
        <dds-card-heading>Consectetur adipiscing elit</dds-card-heading>
        <p>${exampleStrings[1]}</p>
        <dds-card-cta-footer slot="footer"></dds-card-cta-footer>
      </dds-card-group-item>
    `,
  ];

  const tabs = [
    html`
      <dds-tab label="Image">
        <dds-image alt="Image alt text" default-src="${imgLg16x9}"></dds-image>
      </dds-tab>
    `,
    html`
      <dds-tab label="Card Group">
        <dds-card-group cards-per-row="3" grid-mode="narrow">
          ${[...Array(5).keys()].map((i) => cardGroupItems[i % 2])}
        </dds-card-group>
      </dds-tab>
    `,
    html`
      <dds-tab label="Content Group">
        <dds-content-group>
          <dds-content-group-heading
            >Natural language processing (NLP)</dds-content-group-heading
          >
          <dds-content-group-copy>${exampleStrings[2]}</dds-content-group-copy>
          <dds-card-link-cta
            slot="footer"
            cta-type="local"
            href="https://www.example.com">
            <dds-card-link-heading
              >Learn more about natual language
              processing</dds-card-link-heading
            >
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-card-link-cta>
        </dds-content-group>
      </dds-tab>
    `,
    html`
      <dds-tab label="Disabled" disabled>
        <p>${exampleStrings[0]}</p>
      </dds-tab>
    `,
  ];

  return html`
    <dds-tabs-extended-media section-heading=${sectionHeading}>
      <dds-content-section-heading
        >${ifNonNull(sectionHeadingText)}</dds-content-section-heading
      >
      ${tabs}
    </dds-tabs-extended-media>
  `;
};

export default {
  title: 'Components/Tabs extended - with media',
  decorators: [
    (story, { args }) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div
            class="${args?.TabsExtendedWithMedia?.sectionHeading
              ? `bx--col-lg-16`
              : `bx--col-lg-12`} bx--no-gutter">
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
      TabsExtendedWithMedia: () => {
        const sectionHeading = boolean('Section heading', true);
        const sectionHeadingText =
          sectionHeading && textNullable('Heading', 'Section heading');

        return {
          sectionHeading,
          sectionHeadingText,
        };
      },
    },
    propsSet: {
      default: {
        TabsExtendedWithMedia: {
          sectionHeading: 'TitleHeading',
        },
      },
    },
  },
};
