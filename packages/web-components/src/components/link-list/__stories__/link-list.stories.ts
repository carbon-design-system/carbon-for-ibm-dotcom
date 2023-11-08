/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import '../../cta/video-cta-container';
import '../../cta/link-list-item-cta';
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
  [CTA_TYPE.VIDEO]: '0_ibuqxqbe',
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
        <c4d-link-list type="default">
          <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
          <c4d-link-list-item href="https://example.com">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </c4d-link-list-item>
          <c4d-link-list-item href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </c4d-link-list-item>
          <c4d-link-list-item href="https://example.com">
            Microservices and containers ${ArrowRight20({ slot: 'icon' })}
          </c4d-link-list-item>
        </c4d-link-list>
      `
    : html`
        <c4d-link-list type="default">
          <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
          <c4d-link-list-item-cta
            href="${ifDefined(href)}"
            cta-type="${ifDefined(ctaType)}"
            download="${ifDefined(download)}"
            type="default">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Learn more about Kubernetes `
              : null}
          </c4d-link-list-item-cta>
          <c4d-link-list-item-cta
            href="${ifDefined(href)}"
            cta-type="${ifDefined(ctaType)}"
            download="${ifDefined(download)}"
            type="default">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Containerization A Complete Guide `
              : null}
          </c4d-link-list-item-cta>
          <c4d-link-list-item-cta
            href="${ifDefined(href)}"
            cta-type="${ifDefined(ctaType)}"
            download="${ifDefined(download)}"
            type="default">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Microservices and containers `
              : null}
          </c4d-link-list-item-cta>
        </c4d-link-list>
      `;
};

Default.story = {
  parameters: {
    colLgClass: 'cds--col-lg-6',
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
        <c4d-link-list type="horizontal">
          <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
          <c4d-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com"
            type="horizontal">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </c4d-link-list-item>
          <c4d-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com"
            type="horizontal">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </c4d-link-list-item>
        </c4d-link-list>
      `
    : html`
        <c4d-link-list type="horizontal">
          <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
          <c4d-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifDefined(href)}"
            cta-type="${ifDefined(ctaType)}"
            download="${ifDefined(download)}"
            type="horizontal">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Learn more about Kubernetes `
              : null}
          </c4d-link-list-item-cta>
          <c4d-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifDefined(href)}"
            cta-type="${ifDefined(ctaType)}"
            download="${ifDefined(download)}"
            type="horizontal">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Containerization A Complete Guide `
              : null}
          </c4d-link-list-item-cta>
        </c4d-link-list>
      `;
};

Horizontal.story = {
  parameters: {
    colLgClass: 'cds--col-lg-10',
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
        <c4d-link-list type="vertical">
          <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
          <c4d-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com"
            type="horizontal">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </c4d-link-list-item>
          <c4d-link-list-item
            icon-placement="${iconPlacement}"
            href="https://example.com"
            type="horizontal">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </c4d-link-list-item>
        </c4d-link-list>
      `
    : html`
        <c4d-link-list type="vertical">
          <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
          <c4d-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifDefined(href)}"
            cta-type="${ifDefined(ctaType)}"
            download="${ifDefined(download)}"
            type="horizontal">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Learn more about Kubernetes `
              : null}
          </c4d-link-list-item-cta>
          <c4d-link-list-item-cta
            icon-placement="${iconPlacement}"
            href="${ifDefined(href)}"
            cta-type="${ifDefined(ctaType)}"
            download="${ifDefined(download)}"
            type="horizontal">
            ${ctaType !== CTA_TYPE.VIDEO
              ? html` Containerization A Complete Guide `
              : null}
          </c4d-link-list-item-cta>
        </c4d-link-list>
      `;
};

Vertical.story = {
  parameters: {
    colLgClass: 'cds--col-lg-4',
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
        <c4d-video-cta-container class="cds--grid">
          <div class="cds--row">
            <div class="cds--col-sm-4 ${colLgClass}">${story()}</div>
          </div>
        </c4d-video-cta-container>
      `;
    },
  ],
};
