/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';

import { ICON_PLACEMENT } from '../../../globals/defs';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../../content-item-horizontal/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

export const Default = ({ parameters }) => {
  const { sectionHeading, align, type, alt, heading, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } =
    parameters?.props?.TabsExtendedWithMedia ?? {};
  return html`
    <dds-tabs-extended-media>
      <dds-content-section-heading>${ifNonNull(sectionHeading)}</dds-content-section-heading>
      <dds-tab label="First tab">
        <dds-content-item-horizontal-media align="${align}">
          ${type === MEDIA_TYPE.IMAGE
            ? html`
                <dds-image slot="media" alt="${ifNonNull(alt)}" default-src="${imgLg16x9}"></dds-image>
              `
            : null}
          ${type === MEDIA_TYPE.VIDEO
            ? html`
                <dds-content-item-horizontal-media-video video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
              `
            : null}
          <dds-content-item-heading>${heading}</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy>${copy}</dds-content-item-horizontal-media-copy>
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href1)}"
              cta-type="${ifNonNull(ctaType1)}"
            >
              ${ctaCopy1}
            </dds-link-list-item-cta>
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href2)}"
              cta-type="${ifNonNull(ctaType2)}"
            >
              ${ctaCopy2}
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal-media>
      </dds-tab>
      <dds-tab label="Second tab">
        <dds-content-item-horizontal-media align="${align}">
          ${type === MEDIA_TYPE.IMAGE
            ? html`
                <dds-image slot="media" alt="${ifNonNull(alt)}" default-src="${imgLg16x9}"></dds-image>
              `
            : null}
          ${type === MEDIA_TYPE.VIDEO
            ? html`
                <dds-content-item-horizontal-media-video video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
              `
            : null}
          <dds-content-item-heading>${heading}</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy>${copy}</dds-content-item-horizontal-media-copy>
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href1)}"
              cta-type="${ifNonNull(ctaType1)}"
            >
              ${ctaCopy1}
            </dds-link-list-item-cta>
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href2)}"
              cta-type="${ifNonNull(ctaType2)}"
            >
              ${ctaCopy2}
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal-media>
      </dds-tab>
      <dds-tab label="Third tab">
        <dds-content-item-horizontal-media align="${align}">
          ${type === MEDIA_TYPE.IMAGE
            ? html`
                <dds-image slot="media" alt="${ifNonNull(alt)}" default-src="${imgLg16x9}"></dds-image>
              `
            : null}
          ${type === MEDIA_TYPE.VIDEO
            ? html`
                <dds-content-item-horizontal-media-video video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
              `
            : null}
          <dds-content-item-heading>${heading}</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy>${copy}</dds-content-item-horizontal-media-copy>
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href1)}"
              cta-type="${ifNonNull(ctaType1)}"
            >
              ${ctaCopy1}
            </dds-link-list-item-cta>
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href2)}"
              cta-type="${ifNonNull(ctaType2)}"
            >
              ${ctaCopy2}
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal-media>
      </dds-tab>
      <dds-tab label="Fourth tab">
        <dds-content-item-horizontal-media align="${align}">
          ${type === MEDIA_TYPE.IMAGE
            ? html`
                <dds-image slot="media" alt="${ifNonNull(alt)}" default-src="${imgLg16x9}"></dds-image>
              `
            : null}
          ${type === MEDIA_TYPE.VIDEO
            ? html`
                <dds-content-item-horizontal-media-video video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
              `
            : null}
          <dds-content-item-heading>${heading}</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy>${copy}</dds-content-item-horizontal-media-copy>
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href1)}"
              cta-type="${ifNonNull(ctaType1)}"
            >
              ${ctaCopy1}
            </dds-link-list-item-cta>
            <dds-link-list-item-cta
              icon-placement="${ICON_PLACEMENT.RIGHT}"
              href="${ifNonNull(href2)}"
              cta-type="${ifNonNull(ctaType2)}"
            >
              ${ctaCopy2}
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal-media>
      </dds-tab>
    </dds-tabs-extended-media>
  `;
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtendedWithMedia: () => ({
        sectionHeading: textNullable('Heading', 'Title heading'),
        align: select('Alignment', mediaAlign, MEDIA_ALIGN.LEFT),
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        alt: textNullable('Image alt text', 'Lorem ipsum'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: textNullable(
          'Copy (copy):',
          'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
            'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin.'
        ),
        ctaType1: select('CTA 1 type (cta-type)', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type)', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
    propsSet: {
      default: {
        TabsExtendedWithMedia: {
          sectionHeading: 'TitleHeading',
          align: 'left',
          type: 'image',
          alt: 'Lorem ipsum',
          heading: 'Aliquam condimentum',
          copy:
            'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
            'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin.',
          ctaType1: 'local',
          ctaCopy1: 'Learn more',
          href1: 'https://www.ibm.com',
          ctaType2: 'external',
          ctaCopy2: 'Microservices and containers',
          href2: 'https://www.ibm.com',
        },
      },
    },
  },
};

export default {
  title: 'Components/Tabs extended - with media',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 bx--no-gutter">
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
