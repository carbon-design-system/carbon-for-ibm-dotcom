/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import '../../cta/video-cta-container';
import '../../cta/link-list-item-cta';
import '../../cta/link-list-item-card-cta';
import '../../card/card-footer';
import '../index';
import readme from './README.stories.mdx';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
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

export const Default = (args) => {
  const { ctaType, download, href } = args?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="default">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item-card href="https://example.com">
            <p>Learn more about Kubernetes</p>
            <dds-card-footer>
              ${ArrowRight20({ slot: 'icon' })}
            </dds-card-footer>
          </dds-link-list-item-card>
          <dds-link-list-item-card href="https://example.com">
            <p>Containerization A Complete Guide</p>
            <dds-card-footer>
              ${ArrowRight20({ slot: 'icon' })}
            </dds-card-footer>
          </dds-link-list-item-card>
        </dds-link-list>
      `
    : html`
        <dds-link-list type="default">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item-card-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` <p>Learn more about Kubernetes</p> `
              : null}
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
          <dds-link-list-item-card-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` <p>Containerization A Complete Guide</p> `
              : null}
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
        </dds-link-list>
      `;
};

Default.story = {
  parameters: {
    colLgClass: 'bx--col-lg-3',
    knobs: {
      LinkListItem: () => {
        const ctaType = select('CTA type (cta-type)', types, null);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        return {
          ctaType,
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
    propsSet: {
      default: {
        LinkListItem: {
          ctaType: null,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const Horizontal = (args) => {
  const {
    ctaType,
    download,
    href,
    iconPlacement = ICON_PLACEMENT.RIGHT,
  } = args?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="horizontal">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>
      `
    : html`
        <dds-link-list type="horizontal">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Learn more about Kubernetes `
              : null}
          </dds-link-list-item-cta>
          <dds-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Containerization A Complete Guide `
              : null}
          </dds-link-list-item-cta>
        </dds-link-list>
      `;
};

Horizontal.story = {
  parameters: {
    colLgClass: 'bx--col-lg-10',
    knobs: {
      LinkListItem: () => {
        const ctaType = select('CTA type (cta-type)', types, null);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        return {
          ctaType,
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
    propsSet: {
      default: {
        LinkListItem: {
          ctaType: null,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const Vertical = (args) => {
  const {
    ctaType,
    download,
    href,
    iconPlacement = ICON_PLACEMENT.RIGHT,
  } = args?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="vertical">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>
      `
    : html`
        <dds-link-list type="vertical">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Learn more about Kubernetes `
              : null}
          </dds-link-list-item-cta>
          <dds-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Containerization A Complete Guide `
              : null}
          </dds-link-list-item-cta>
        </dds-link-list>
      `;
};

Vertical.story = {
  parameters: {
    colLgClass: 'bx--col-lg-4',
    knobs: Horizontal.story.parameters.knobs,
    propsSet: {
      default: {
        LinkListItem: {
          ctaType: null,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const EndOfSection = (args) => {
  const { ctaType, download, href } = args?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="end">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item href="https://example.com">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item href="https://example.com">
            Microservices and containers ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>
      `
    : html`
        <dds-link-list type="end">
          <dds-link-list-heading>Tutorial</dds-link-list-heading>
          <dds-link-list-item-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Learn more about Kubernetes `
              : null}
          </dds-link-list-item-cta>
          <dds-link-list-item-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Containerization A Complete Guide `
              : null}
          </dds-link-list-item-cta>
          <dds-link-list-item-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Microservices and containers `
              : null}
          </dds-link-list-item-cta>
        </dds-link-list>
      `;
};

EndOfSection.story = {
  name: 'End of section',
  parameters: {
    colLgClass: 'bx--col-lg-6',
    knobs: Default.story.parameters.knobs,
    propsSet: {
      default: {
        LinkListItem: {
          ctaType: null,
          download: undefined,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export default {
  title: 'Components/Link list',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
  decorators: [
    (story, { parameters }) => {
      const { colLgClass } = parameters;
      return html`
        <dds-video-cta-container class="bx--grid">
          <div class="bx--row">
            <div class="bx--col-sm-4 ${colLgClass}">${story()}</div>
          </div>
        </dds-video-cta-container>
      `;
    },
  ],
};
