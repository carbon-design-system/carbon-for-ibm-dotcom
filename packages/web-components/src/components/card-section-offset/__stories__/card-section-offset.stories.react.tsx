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
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
import DDSBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardSectionOffset from '@carbon/ibmdotcom-web-components/es/components-react/card-section-offset/card-section-offset';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import { CTA_TYPE } from '../../cta/defs';
import image from '../../../../../storybook-images/assets/card-section-offset/background-media.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

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

const defaultCardGroupItem = (
  <DDSCardGroupItem href="https://example.com">
    <DDSCardEyebrow>Label</DDSCardEyebrow>
    <DDSCardHeading>Lorem ipsum dolor sit amet, pro graeco tibique an</DDSCardHeading>
    <p>Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis democritum ex. Illud ullum graecis</p>
    <DDSCardCTAFooter slot="footer">
      <ArrowRight20 slot="icon" />
    </DDSCardCTAFooter>
  </DDSCardGroupItem>
);

export const Default = args => {
  const { heading, cards, ctaType, ctaCopy, download, href, alt, defaultSrc } = args?.CardSectionOffset ?? {};
  return (
    <DDSCardSectionOffset>
      <DDSBackgroundMedia
        gradient-direction="left-to-right"
        mobile-position="top"
        alt={alt}
        default-src={defaultSrc}></DDSBackgroundMedia>
      <DDSContentBlockHeading slot="heading">{heading}</DDSContentBlockHeading>
      <DDSTextCTA slot="action" icon-placement="right" cta-type={ctaType} download={download} href={href}>
        {ctaCopy}
      </DDSTextCTA>
      <DDSCardGroup slot="card-group" cards-per-row="2">
        <DDSCardGroupItem empty></DDSCardGroupItem>
        {cards}
      </DDSCardGroup>
    </DDSCardSectionOffset>
  );
};

export default {
  title: 'Components/Card section offset',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CardSectionOffset: () => {
        const ctaType = select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL);
        const ctaCopy = ctaType === CTA_TYPE.VIDEO ? undefined : textNullable('Copy text', 'Lorem ipsum dolor sit amet');
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf');
        return {
          heading: 'Aliquam condimentum interdum',
          ctaCopy,
          ctaType,
          download,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR]),
          cards: Array.from({
            length: 3,
          }).map(() => defaultCardGroupItem),
          alt: textNullable('Alt text', 'Image alt text'),
          defaultSrc: textNullable('Default image (default-src)', image),
        };
      },
    },
  },
};
