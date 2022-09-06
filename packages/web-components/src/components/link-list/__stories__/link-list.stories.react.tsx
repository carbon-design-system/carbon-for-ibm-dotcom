/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
// @ts-ignore
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
// @ts-ignore
import DDSLinkListItemCard from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item-card';
// @ts-ignore
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
// @ts-ignore
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
// @ts-ignore
import DDSLinkListItemCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-card-cta';
// @ts-ignore
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
// @ts-ignore
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
// @ts-ignore
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';

import { ICON_PLACEMENT } from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';
import { CTA_TYPE } from '../../cta/defs';

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
  return !ctaType ? (
    <DDSLinkList type="default">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItemCard href="https://example.com">
        <p>Learn more about Kubernetes</p>
        <DDSCardFooter>
          <ArrowRight20 slot="icon" />
        </DDSCardFooter>
      </DDSLinkListItemCard>
      <DDSLinkListItemCard href="https://example.com">
        <p>Containerization A Complete Guide</p>
        <DDSCardFooter>
          <ArrowRight20 slot="icon" />
        </DDSCardFooter>
      </DDSLinkListItemCard>
    </DDSLinkList>
  ) : (
    <DDSLinkList type="default">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItemCardCTA href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && <p>Learn more about Kubernetes</p>}
        <DDSCardCTAFooter />
      </DDSLinkListItemCardCTA>
      <DDSLinkListItemCardCTA href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && <p>Containerization A Complete Guide</p>}
        <DDSCardCTAFooter />
      </DDSLinkListItemCardCTA>
    </DDSLinkList>
  );
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

export const Horizontal = ({ parameters }) => {
  const { ctaType, download, href, iconPlacement = ICON_PLACEMENT.RIGHT } = parameters?.props?.LinkListItem ?? {};
  return !ctaType ? (
    <DDSLinkList type="horizontal">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItem icon-placement={iconPlacement} href="https://example.com">
        Learn more about Kubernetes <ArrowRight20 slot="icon" />
      </DDSLinkListItem>
      <DDSLinkListItem icon-placement={iconPlacement} href="https://example.com">
        Containerization A Complete Guide <ArrowRight20 slot="icon" />
      </DDSLinkListItem>
    </DDSLinkList>
  ) : (
    <DDSLinkList type="horizontal">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItemCTA icon-placement={iconPlacement} href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Learn more about Kubernetes'}
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA icon-placement={iconPlacement} href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Containerization A Complete Guide'}
      </DDSLinkListItemCTA>
    </DDSLinkList>
  );
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
          ctaType,
          download,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
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

export const Vertical = ({ parameters }) => {
  const { ctaType, download, href, iconPlacement = ICON_PLACEMENT.RIGHT } = parameters?.props?.LinkListItem ?? {};
  return !ctaType ? (
    <DDSLinkList type="vertical">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItem icon-placement={iconPlacement} href="https://example.com">
        Learn more about Kubernetes <ArrowRight20 slot="icon" />
      </DDSLinkListItem>
      <DDSLinkListItem icon-placement={iconPlacement} href="https://example.com">
        Containerization A Complete Guide <ArrowRight20 slot="icon" />
      </DDSLinkListItem>
    </DDSLinkList>
  ) : (
    <DDSLinkList type="vertical">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItemCTA icon-placement={iconPlacement} href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Learn more about Kubernetes'}
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA icon-placement={iconPlacement} href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Containerization A Complete Guide'}
      </DDSLinkListItemCTA>
    </DDSLinkList>
  );
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

export const EndOfSection = ({ parameters }) => {
  const { ctaType, download, href } = parameters?.props?.LinkListItem ?? {};
  return !ctaType ? (
    <DDSLinkList type="end">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItem href="https://example.com">
        Learn more about Kubernetes <ArrowRight20 slot="icon" />
      </DDSLinkListItem>
      <DDSLinkListItem href="https://example.com">
        Containerization A Complete Guide <ArrowRight20 slot="icon" />
      </DDSLinkListItem>
      <DDSLinkListItem href="https://example.com">
        Microservices and containers <ArrowRight20 slot="icon" />
      </DDSLinkListItem>
    </DDSLinkList>
  ) : (
    <DDSLinkList type="vertical">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItemCTA href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Learn more about Kubernetes'}
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Containerization A Complete Guide'}
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA href={href} cta-type={ctaType} download={download}>
        {ctaType !== CTA_TYPE.VIDEO && 'Microservices and containers'}
      </DDSLinkListItemCTA>
    </DDSLinkList>
  );
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
      return (
        <DDSVideoCTAContainer class="bx--grid">
          <div className="bx--row">
            <div className={`${colLgClass} bx--col-sm-4`}>{story()}</div>
          </div>
        </DDSVideoCTAContainer>
      );
    },
  ],
};
