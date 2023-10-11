/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';
// eslint-disable-next-line sort-imports
import readme from './README.stories.mdx';
import { CTA_TYPE } from '../../cta/defs';
import { COLOR_SCHEME } from '../defs';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '0_ibuqxqbe',
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

const colorSchemeTypes = {
  [`${COLOR_SCHEME.REGULAR}`]: COLOR_SCHEME.REGULAR,
  [`${COLOR_SCHEME.LAYER}`]: COLOR_SCHEME.LAYER,
  [`${COLOR_SCHEME.PURPLE}`]: COLOR_SCHEME.PURPLE,
  [`${COLOR_SCHEME.CYAN}`]: COLOR_SCHEME.CYAN,
};

export const Default = (args) => {
  const {
    heading,
    colorScheme,
    ctaType,
    download,
    href,
    iconPlacement = ICON_PLACEMENT.RIGHT,
  } = args?.InPageBanner ?? {};
  return html`
    <c4d-in-page-banner color-scheme="${colorScheme}">
      <c4d-content-group-heading>${heading}</c4d-content-group-heading>

      <c4d-link-list type="vertical" slot="complementary">
        <c4d-link-list-item
          icon-placement="${iconPlacement}"
          cta-type="${ifDefined(ctaType)}"
          download="${ifDefined(download)}"
          href="${ifDefined(href)}">
          Learn more about Kubernetes
        </c4d-link-list-item>
        <c4d-link-list-item
          cta-type="${ifDefined(ctaType)}"
          icon-placement="${iconPlacement}"
          download="${ifDefined(download)}"
          href="${ifDefined(href)}">
          Containerization A Complete Guide
        </c4d-link-list-item>
      </c4d-link-list>
    </c4d-in-page-banner>
  `;
};

export default {
  title: 'Components/In page banner',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-md-6 cds--col-lg-12 cds--no-gutter">
            <c4d-video-cta-container> ${story()} </c4d-video-cta-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      InPageBanner: () => {
        const heading = textNullable(
          'Heading (heading)',
          'Accelerate application development efforts with IBM Product Name'
        );
        const ctaType = select(
          'CTA type (cta-type)',
          types,
          types['Local (local)']
        );
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        const colorScheme = select(
          'Color scheme:',
          colorSchemeTypes,
          COLOR_SCHEME.REGULAR
        );
        return {
          heading,
          colorScheme,
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
        InPageBanner: {
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
