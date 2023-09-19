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
import C4DCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DContentBlockCards from '@carbon/ibmdotcom-web-components/es/components-react/content-block-cards/content-block-cards';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import { CTA_TYPE } from '../../cta/defs';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--004.jpg';
import readme from './README.stories.react.mdx';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const cardGroupItem = (
  <C4DCardGroupItem cta-type="local" href="https://example.com">
    <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <C4DCardCTAFooter></C4DCardCTAFooter>
  </C4DCardGroupItem>
);

const cardGroupItemWithImages = (
  <C4DCardGroupItem cta-type="local" href="https://example.com">
    <C4DImage
      slot="image"
      alt="Image alt text"
      default-src={imgLg4x3}></C4DImage>
    <C4DCardEyebrow>Topic</C4DCardEyebrow>
    <C4DCardHeading>Natural Language Processing</C4DCardHeading>
    <C4DCardCTAFooter></C4DCardCTAFooter>
  </C4DCardGroupItem>
);

const cardGroupItemWithVideos = (
  <C4DCardGroupItem cta-type="video" href="0_ibuqxqbe">
    <C4DCardCTAFooter
      cta-type="video"
      slot="footer"
      href="0_ibuqxqbe"></C4DCardCTAFooter>
  </C4DCardGroupItem>
);

export const Default = (args) => {
  const { heading, ctaCopy, ctaType, href } = args?.ContentBlockCards ?? {};
  return (
    <C4DContentBlockCards>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      <C4DCardGroup>
        {cardGroupItem} {cardGroupItem} {cardGroupItem} {cardGroupItem}{' '}
        {cardGroupItem}
      </C4DCardGroup>
      <C4DCardLinkCTA
        slot="footer"
        cta-type={ctaType || null}
        href={href || null}>
        <C4DCardLinkHeading>{ctaCopy}</C4DCardLinkHeading>
        <C4DCardCTAFooter></C4DCardCTAFooter>
      </C4DCardLinkCTA>
    </C4DContentBlockCards>
  );
};

export const withImages = (args) => {
  const { heading, ctaCopy, ctaType, href } = args?.ContentBlockCards ?? {};
  return (
    <C4DContentBlockCards>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      <C4DCardGroup>
        {cardGroupItemWithImages} {cardGroupItemWithImages}{' '}
        {cardGroupItemWithImages} {cardGroupItemWithImages}
        {cardGroupItemWithImages}
      </C4DCardGroup>
      <C4DCardLinkCTA
        slot="footer"
        cta-type={ctaType || null}
        href={href || null}>
        <C4DCardLinkHeading>{ctaCopy}</C4DCardLinkHeading>
        <C4DCardCTAFooter></C4DCardCTAFooter>
      </C4DCardLinkCTA>
    </C4DContentBlockCards>
  );
};

withImages.story = {
  name: 'With images',
};

export const withVideos = (args) => {
  const { heading, ctaCopy, ctaType, href } = args?.ContentBlockCards ?? {};
  return (
    <C4DContentBlockCards>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      <C4DCardGroup>
        {cardGroupItemWithVideos} {cardGroupItemWithVideos}{' '}
        {cardGroupItemWithVideos} {cardGroupItemWithVideos}
        {cardGroupItemWithVideos}
      </C4DCardGroup>
      <C4DCardLinkCTA
        slot="footer"
        cta-type={ctaType || null}
        href={href || null}>
        <C4DCardLinkHeading>{ctaCopy}</C4DCardLinkHeading>
        <C4DCardCTAFooter></C4DCardCTAFooter>
      </C4DCardLinkCTA>
    </C4DContentBlockCards>
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
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-lg-12 cds--no-gutter">
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
