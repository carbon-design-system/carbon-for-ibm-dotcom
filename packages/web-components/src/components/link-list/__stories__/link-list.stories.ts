/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select, number } from '@storybook/addon-knobs';
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

const placements = {
  [`Left (${ICON_PLACEMENT.LEFT})`]: ICON_PLACEMENT.LEFT,
  [`Right (${ICON_PLACEMENT.RIGHT})`]: ICON_PLACEMENT.RIGHT,
};

const lipsums = [
  'Consectetur voluptate ea proident officia',
  'Duis esse aliqua proident esse officia qui ullamco commodo laborum',
  'Sunt mollit officia est irure laboris',
  'Exercitation Lorem dolor dolore velit',
  'Esse ut do velit voluptate irure officia',
  'In sint sit adipisicing cupidatat tempor ullamco',
  'Do nisi adipisicing voluptate fugiat culpa elit',
];

const getDummyText = (i) => lipsums[i % lipsums.length];

const makeLinkListItem = (args) => {
  console.log(args);

  const { href, ctaType, download, text, placement } = args;
  return html`
    <c4d-link-list-item
      href="${href || 'https://example.com'}"
      cta-type="${ifDefined(ctaType)}"
      download="${ifDefined(download)}"
      icon-placement="${placement}">
      ${ctaType !== CTA_TYPE.VIDEO ? html`${text}` : null}
    </c4d-link-list-item>
  `;
};

export const Default = (args) => {
  const knobs = args?.LinkListItem ?? {};
  const { count } = knobs;

  return html`
    <c4d-link-list type="default">
      <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
      ${[...new Array(count)].map((_item, i) =>
        makeLinkListItem({
          text: getDummyText(i),
          ...knobs,
        })
      )}
    </c4d-link-list>
  `;
};

Default.story = {
  parameters: {
    colLgClass: 'cds--col-lg-6',
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
  const knobs = args?.LinkListItem ?? {};
  const { count } = knobs;

  return html`
    <c4d-link-list type="horizontal">
      <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
      ${[...new Array(count)].map((_item, i) =>
        makeLinkListItem({
          text: getDummyText(i),
          ...knobs,
        })
      )}
    </c4d-link-list>
  `;
};

Horizontal.story = {
  parameters: {
    colLgClass: 'cds--col-lg-16',
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
  const knobs = args?.LinkListItem ?? {};
  const { count } = knobs;

  return html`
    <c4d-link-list type="vertical">
      <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
      ${[...new Array(count)].map((_item, i) =>
        makeLinkListItem({
          text: getDummyText(i),
          ...knobs,
        })
      )}
    </c4d-link-list>
  `;
};

Vertical.story = {
  parameters: {
    colLgClass: 'cds--col-lg-6',
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

export const End = (args) => {
  const knobs = args?.LinkListItem ?? {};
  const { count } = knobs;

  return html`
    <c4d-link-list type="end">
      <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
      ${[...new Array(count)].map((_item, i) =>
        makeLinkListItem({
          text: getDummyText(i),
          ...knobs,
        })
      )}
    </c4d-link-list>
  `;
};

End.story = {
  parameters: {
    colLgClass: 'cds--col-lg-16',
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
    knobs: {
      LinkListItem: () => {
        const count = number('Number of Links', 3);
        const ctaType = select(
          'CTA type (cta-type)',
          types,
          types['Local (local)']
        );
        const placement = select(
          'Icon Placement (icon-placement)',
          placements,
          ICON_PLACEMENT.RIGHT
        );
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        return {
          count,
          ctaType,
          download,
          placement,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
  },
  decorators: [
    (story, { parameters }) => {
      console.log(parameters);

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
