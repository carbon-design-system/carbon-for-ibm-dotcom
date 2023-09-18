/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import C4DContentGroupBanner from '@carbon/ibmdotcom-web-components/es/components-react/content-group-banner/content-group-banner';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../../cta/defs';

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

export const Default = (args) => {
  const { heading, iconPlacement, ctaType, href, download } =
    args?.ContentGroupBanner ?? {};
  return !ctaType ? (
    <C4DContentGroupBanner>
      <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
      <C4DLinkList type="vertical" slot="complementary">
        <C4DLinkListItem
          icon-placement={iconPlacement}
          href="https://www.example.com">
          Learn more about Kubernetes <ArrowRight20 slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem
          icon-placement={iconPlacement}
          href="https://www.example.com">
          Containerization A Complete Guide <ArrowRight20 slot="icon" />
        </C4DLinkListItem>
      </C4DLinkList>
    </C4DContentGroupBanner>
  ) : (
    <C4DContentGroupBanner>
      <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
      <C4DLinkList type="vertical" slot="complementary">
        <C4DLinkListItemCTA
          icon-placement={iconPlacement}
          href={href || undefined}
          cta-type={ctaType || undefined}
          download={download || undefined}>
          Learn more about Kubernetes
        </C4DLinkListItemCTA>
        <C4DLinkListItemCTA
          icon-placement={iconPlacement}
          href={href || undefined}
          cta-type={ctaType || undefined}
          download={download || undefined}>
          Containerization A Complete Guide
        </C4DLinkListItemCTA>
      </C4DLinkList>
    </C4DContentGroupBanner>
  );
};

Default.story = {
  parameters: {
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
  },
};

export default {
  title: 'Components/Content group banner',
  decorators: [
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-md-6 cds--col-lg-12 cds--no-gutter">
              <C4DVideoCTAContainer>{story()}</C4DVideoCTAContainer>
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
