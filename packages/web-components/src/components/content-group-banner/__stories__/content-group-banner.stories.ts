/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';
// eslint-disable-next-line sort-imports
import readme from './README.stories.mdx';
import { CTA_TYPE } from '../../cta/defs';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
};

const knobNamesForType = {
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

export const Default = (args) => {
  const {
    heading,
    ctaType,
    download,
    href,
    iconPlacement = ICON_PLACEMENT.RIGHT,
  } = args?.ContentGroupBanner ?? {};
  return !ctaType
    ? html`
        <dds-content-group-banner>
          <dds-content-group-heading>${heading}</dds-content-group-heading>

          <dds-link-list type="vertical" slot="complementary">
            <dds-link-list-item
              icon-placement="${iconPlacement}"
              href="https://example.com">
              Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
            </dds-link-list-item>
            <dds-link-list-item
              icon-placement="${iconPlacement}"
              href="https://example.com">
              Containerization A Complete Guide
              ${ArrowRight20({ slot: 'icon' })}
            </dds-link-list-item>
          </dds-link-list>
        </dds-content-group-banner>
      `
    : html`
        <dds-content-group-banner>
          <dds-content-group-heading>${heading}</dds-content-group-heading>

          <dds-link-list type="vertical" slot="complementary">
            <dds-link-list-item-cta
              icon-placement="${iconPlacement}"
              href="${ifDefined(href)}"
              cta-type="${ifDefined(ctaType)}"
              download="${ifDefined(download)}">
              Learn more about Kubernetes
            </dds-link-list-item-cta>
            <dds-link-list-item-cta
              icon-placement="${iconPlacement}"
              href="${ifDefined(href)}"
              cta-type="${ifDefined(ctaType)}"
              download="${ifDefined(download)}">
              Containerization A Complete Guide
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-group-banner>
      `;
};

export default {
  title: 'Components/Content group banner',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-md-6 bx--col-lg-12 bx--no-gutter">
            <dds-video-cta-container> ${story()} </dds-video-cta-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroupBanner: () => {
        const heading = textNullable(
          'Heading (heading)',
          'Accelerate application development efforts with IBM Product Name'
        );
        const ctaType = select('CTA type (cta-type)', types, null);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        return {
          heading,
          ctaType,
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.LOCAL],
            hrefsForType[ctaType ?? CTA_TYPE.LOCAL]
          ),
        };
      },
    },
    propsSet: {
      default: {
        ContentGroupBanner: {
          heading:
            'Accelerate application development efforts with IBM Product Name',
          ctaType: null,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};
