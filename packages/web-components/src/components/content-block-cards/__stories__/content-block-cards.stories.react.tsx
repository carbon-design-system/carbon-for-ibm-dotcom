/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSContentBlockCards from '@carbon/ibmdotcom-web-components/es/components-react/content-block-cards/content-block-cards';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import { CTA_TYPE } from '../../cta/defs';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--004.jpg';
import readme from './README.stories.react.mdx';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const cardGroupItem = (
  <DDSCardGroupItem cta-type="local" href="https://example.com">
    <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <DDSCardCTAFooter></DDSCardCTAFooter>
  </DDSCardGroupItem>
);

const cardGroupItemWithImages = (
  <DDSCardGroupItem cta-type="local" href="https://example.com">
    <DDSImage slot="image" alt="Image alt text" default-src={imgLg4x3}></DDSImage>
    <DDSCardEyebrow>Topic</DDSCardEyebrow>
    <DDSCardHeading>Natural Language Processing</DDSCardHeading>
    <DDSCardCTAFooter></DDSCardCTAFooter>
  </DDSCardGroupItem>
);

const cardGroupItemWithVideos = (
  <DDSCardGroupItem cta-type="video" href="1_9h94wo6b">
    <DDSCardCTAFooter cta-type="video" slot="footer" href="1_9h94wo6b"></DDSCardCTAFooter>
  </DDSCardGroupItem>
);

export const Default = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return (
    <DDSContentBlockCards>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSCardGroup>
        {cardGroupItem} {cardGroupItem} {cardGroupItem} {cardGroupItem} {cardGroupItem}
      </DDSCardGroup>
      <DDSCardLinkCTA slot="footer" cta-type={ctaType || null} href={href || null}>
        <DDSCardLinkHeading>{ctaCopy}</DDSCardLinkHeading>
        <DDSCardCTAFooter></DDSCardCTAFooter>
      </DDSCardLinkCTA>
    </DDSContentBlockCards>
  );
};

export const withImages = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return (
    <DDSContentBlockCards>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSCardGroup>
        {cardGroupItemWithImages} {cardGroupItemWithImages} {cardGroupItemWithImages} {cardGroupItemWithImages}
        {cardGroupItemWithImages}
      </DDSCardGroup>
      <DDSCardLinkCTA slot="footer" cta-type={ctaType || null} href={href || null}>
        <DDSCardLinkHeading>{ctaCopy}</DDSCardLinkHeading>
        <DDSCardCTAFooter></DDSCardCTAFooter>
      </DDSCardLinkCTA>
    </DDSContentBlockCards>
  );
};

withImages.story = {
  name: 'With images',
};

export const withVideos = ({ parameters }) => {
  const { heading, ctaCopy, ctaType, href } = parameters?.props?.ContentBlockCards ?? {};
  return (
    <DDSContentBlockCards>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSCardGroup>
        {cardGroupItemWithVideos} {cardGroupItemWithVideos} {cardGroupItemWithVideos} {cardGroupItemWithVideos}
        {cardGroupItemWithVideos}
      </DDSCardGroup>
      <DDSCardLinkCTA slot="footer" cta-type={ctaType || null} href={href || null}>
        <DDSCardLinkHeading>{ctaCopy}</DDSCardLinkHeading>
        <DDSCardCTAFooter></DDSCardCTAFooter>
      </DDSCardLinkCTA>
    </DDSContentBlockCards>
  );
};

withVideos.story = {
  name: 'With videos',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export default {
  title: 'Components/Content block cards',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-lg-12 bx--no-gutter">
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
    knobs: {
      ContentBlockCards: () => ({
        heading: text('Heading (heading):', 'Aliquam condimentum interdum'),
        ctaCopy: text('Copy text (copy)', 'Lorem ipsum dolor sit ametttt'),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        href: text('Href (href):', 'https://example.com'),
      }),
    },
  },
};
