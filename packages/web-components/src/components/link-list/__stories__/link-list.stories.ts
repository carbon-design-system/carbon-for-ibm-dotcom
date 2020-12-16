/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import '../../cta/video-cta-container';
import '../../cta/link-list-item-cta';
import '../../cta/link-list-item-card-cta';
import '../../card/card-footer';
import '../link-list';
import '../link-list-item';
import '../link-list-item-card';
import readme from './README.stories.mdx';

const placement = {
  [ICON_PLACEMENT.LEFT]: ICON_PLACEMENT.LEFT,
  [ICON_PLACEMENT.RIGHT]: ICON_PLACEMENT.RIGHT,
};

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
  const { ctaType, download, href } = parameters?.props?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="default">
          <span slot="heading">Tutorial</span>
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
          <span slot="heading">Tutorial</span>
          <dds-link-list-item-card-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}"
          >
            <p>Learn more about Kubernetes</p>
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
          <dds-link-list-item-card-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}"
          >
            <p>Containerization A Complete Guide</p>
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
        </dds-link-list>
      `;
};

Default.story = {
  parameters: {
    colLgClass: 'bx--col-lg-3',
    knobs: {
      LinkListItem: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', types, null, groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        return {
          ctaType,
          download,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};

export const Horizontal = ({ parameters }) => {
  const { ctaType, download, href, iconPlacement = ICON_PLACEMENT.LEFT } = parameters?.props?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="horizontal">
          <span slot="heading">Tutorial</span>
          <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>
      `
    : html`
        <dds-link-list type="horizontal">
          <span slot="heading">Tutorial</span>
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
      `;
};

Horizontal.story = {
  parameters: {
    colLgClass: 'bx--col-lg-10',
    knobs: {
      LinkListItem: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', types, null, groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        return {
          iconPlacement: select('Icon Placement (icon-placement)', placement, ICON_PLACEMENT.LEFT, groupId),
          ctaType,
          download,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};

export const Vertical = ({ parameters }) => {
  const { ctaType, download, href, iconPlacement = ICON_PLACEMENT.LEFT } = parameters?.props?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="vertical">
          <span slot="heading">Tutorial</span>
          <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>
      `
    : html`
        <dds-link-list type="vertical">
          <span slot="heading">Tutorial</span>
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
      `;
};

Vertical.story = {
  parameters: {
    colLgClass: 'bx--col-lg-4',
    knobs: Horizontal.story.parameters.knobs,
  },
};

export const VerticalWithCards = ({ parameters }) => {
  const { ctaType, download, href, iconPlacement = ICON_PLACEMENT.LEFT } = parameters?.props?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="vertical">
          <span slot="heading">Tutorial</span>
          <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
            Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
          <dds-link-list-item icon-placement="${iconPlacement}" href="https://example.com">
            Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
          </dds-link-list-item>
        </dds-link-list>
        <dds-link-list type="default">
          <span slot="heading">Tutorial</span>
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
        <dds-link-list type="vertical">
          <span slot="heading">Tutorial</span>
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
        <dds-link-list type="default">
          <span slot="heading">Tutorial</span>
          <dds-link-list-item-card-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}"
          >
            <p>Learn more about Kubernetes</p>
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
          <dds-link-list-item-card-cta
            href="${ifNonNull(href)}"
            cta-type="${ifNonNull(ctaType)}"
            download="${ifNonNull(download)}"
          >
            <p>Containerization A Complete Guide</p>
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-link-list-item-card-cta>
        </dds-link-list>
      `;
};

VerticalWithCards.story = {
  parameters: {
    colLgClass: 'bx--col-lg-4',
    knobs: Horizontal.story.parameters.knobs,
  },
};

export const EndOfSection = ({ parameters }) => {
  const { ctaType, download, href } = parameters?.props?.LinkListItem ?? {};
  return !ctaType
    ? html`
        <dds-link-list type="end">
          <span slot="heading">Tutorial</span>
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
          <span slot="heading">Tutorial</span>
          <dds-link-list-item-cta href="${ifNonNull(href)}" cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}">
            Learn more about Kubernetes
          </dds-link-list-item-cta>
          <dds-link-list-item-cta href="${ifNonNull(href)}" cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}">
            Containerization A Complete Guide
          </dds-link-list-item-cta>
          <dds-link-list-item-cta href="${ifNonNull(href)}" cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}">
            Microservices and containers
          </dds-link-list-item-cta>
        </dds-link-list>
      `;
};

EndOfSection.story = {
  parameters: {
    colLgClass: 'bx--col-lg-6',
    knobs: Default.story.parameters.knobs,
  },
};

export default {
  title: 'Components/Link List',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
  decorators: [
    (story, { parameters }) => {
      const { colLgClass } = parameters;
      return html`
        <dds-video-cta-container class="bx--grid dds-ce-demo-devenv--grid--stretch">
          <div class="bx--row">
            <div class="bx--col-sm-4 ${colLgClass} bx--offset-lg-4">
              ${story()}
            </div>
          </div>
        </dds-video-cta-container>
      `;
    },
  ],
};
