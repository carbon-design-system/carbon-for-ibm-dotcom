/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
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
import DDSCardSectionOffset, {
  PropTypesRef,
} from '@carbon/ibmdotcom-web-components/es/components-react/card-section-offset/card-section-offset';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import { CTA_TYPE } from '../../cta/defs';
import image from '../../../../../storybook-images/assets/card-section-offset/background-media.jpg';
import readme from './README.stories.react.mdx';

const ctaTypes = [CTA_TYPE.LOCAL, CTA_TYPE.DOWNLOAD, CTA_TYPE.EXTERNAL, CTA_TYPE.VIDEO];

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
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

const cards = Array.from({
  length: 3,
}).map(() => defaultCardGroupItem);

export const Default = args => {
  const { heading, ctaType, ctaCopy, download, alt, defaultSrc } = args;

  const headingComponent = document.querySelector('dds-content-block-heading');
  if (headingComponent && heading) {
    (headingComponent as HTMLElement).shadowRoot!.innerHTML = heading;
  }

  const currentHref = hrefsForType[ctaType ?? CTA_TYPE.REGULAR];
  return (
    <DDSCardSectionOffset>
      <DDSBackgroundMedia
        gradient-direction="left-to-right"
        mobile-position="top"
        alt={alt}
        default-src={defaultSrc}></DDSBackgroundMedia>
      <DDSContentBlockHeading slot="heading">{heading}</DDSContentBlockHeading>
      <DDSTextCTA slot="action" icon-placement="right" cta-type={ctaType} download={download} href={currentHref}>
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
  component: PropTypesRef,
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
        </div>
      </div>
    ),
  ],
  argTypes: {
    ctaType: {
      options: ctaTypes,
      control: { type: 'select' },
      defaultValue: CTA_TYPE.LOCAL,
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Aliquam condimentum interdum',
      if: { arg: 'ctaType', neq: CTA_TYPE.VIDEO },
    },
    ctaCopy: {
      control: { type: 'text' },
      defaultValue: 'Lorem ipsum dolor sit amet',
      if: { arg: 'ctaType', neq: CTA_TYPE.VIDEO },
    },
    downloadTarget: {
      control: { type: 'text' },
      defaultValue: 'IBM_Annual_Report_2019.pdf',
      if: { arg: 'ctaType', eq: CTA_TYPE.DOWNLOAD },
    },
    href: {
      control: { type: 'text' },
      defaultValue: CTA_TYPE.REGULAR,
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'Image alt text',
    },
    defaultSrc: {
      control: { type: 'text' },
      defaultValue: image,
    },
    complementaryStyleScheme: {
      table: {
        disable: true,
      },
    },
    'complementary-style-scheme': {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    'card-group': {
      table: {
        disable: true,
      },
    },
    action: {
      table: {
        disable: true,
      },
    },
    complementary: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
    media: {
      table: {
        disable: true,
      },
    },
    copy: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
