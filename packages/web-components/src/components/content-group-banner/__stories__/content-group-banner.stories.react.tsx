/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
/* eslint-disable max-len */
import DDSContentGroupBanner from '@carbon/ibmdotcom-web-components/es/components-react/content-group-banner/content-group-banner';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
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

export const Default = ({ parameters }) => {
  const { heading, iconPlacement, ctaType, href, download } = parameters?.props?.ContentGroupBanner ?? {};
  return !ctaType ? (
    <DDSContentGroupBanner>
      <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
      <DDSLinkList type="vertical" slot="complementary">
        <DDSLinkListItem icon-placement={iconPlacement} href="https://www.example.com">
          Learn more about Kubernetes <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem icon-placement={iconPlacement} href="https://www.example.com">
          Containerization A Complete Guide <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
      </DDSLinkList>
    </DDSContentGroupBanner>
  ) : (
    <DDSContentGroupBanner>
      <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
      <DDSLinkList type="vertical" slot="complementary">
        <DDSLinkListItemCTA
          icon-placement={iconPlacement}
          href={href || undefined}
          cta-type={ctaType || undefined}
          download={download || undefined}>
          Learn more about Kubernetes
        </DDSLinkListItemCTA>
        <DDSLinkListItemCTA
          icon-placement={iconPlacement}
          href={href || undefined}
          cta-type={ctaType || undefined}
          download={download || undefined}>
          Containerization A Complete Guide
        </DDSLinkListItemCTA>
      </DDSLinkList>
    </DDSContentGroupBanner>
  );
};

Default.story = {
  parameters: {
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
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.LOCAL], hrefsForType[ctaType ?? CTA_TYPE.LOCAL], groupId),
        };
      },
    },
  },
};

export default {
  title: 'Components/Content group banner',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-md-6 bx--col-lg-12 bx--no-gutter">
              <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
