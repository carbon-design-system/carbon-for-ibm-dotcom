/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../content-group/content-group-heading';
import '../../cta/link-list-item-cta';
import '../../link-list/link-list';
import '../../link-list/link-list-item';
import '../content-group-banner';
// eslint-disable-next-line sort-imports
import readme from './README.stories.mdx';
import { CTA_TYPE } from '../../cta/defs';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
};

const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const types = {
  None: null,
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

export const Default = ({ parameters }) => {
  const { heading, ctaType, download, href, iconPlacement = ICON_PLACEMENT.RIGHT } = parameters?.props?.ContentGroupBanner ?? {};
  return !ctaType
    ? html`
        <dds-content-group-banner>
          <dds-content-group-heading>${heading}</dds-content-group-heading>

          <dds-link-list type="vertical" slot="complementary">
            <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
              Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
            </dds-link-list-item>
            <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
              Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
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
              href="${ifNonNull(href)}"
              cta-type="${ifNonNull(ctaType)}"
              download="${ifNonNull(download)}"
            >
              Learn more about Kubernetes
            </dds-link-list-item-cta>
            <dds-link-list-item-cta
              icon-placement="${iconPlacement}"
              href="${ifNonNull(href)}"
              cta-type="${ifNonNull(ctaType)}"
              download="${ifNonNull(download)}"
            >
              Containerization A Complete Guide
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-group-banner>
      `;
};

export default {
  title: 'Components/Content Group Banner',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout--with-complementary">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      ContentGroupBanner: ({ groupId }) => {
        const heading = textNullable(
          'Heading (heading)',
          'Accelerate application development efforts with IBM Product Name',
          groupId
        );
        const ctaType = select('CTA type (cta-type)', types, null, groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        return {
          heading,
          ctaType,
          download,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};
