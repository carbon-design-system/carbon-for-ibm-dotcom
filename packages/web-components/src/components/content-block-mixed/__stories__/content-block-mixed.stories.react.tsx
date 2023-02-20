/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSContentBlockMixed from '@carbon/ibmdotcom-web-components/es/components-react/content-block-mixed/content-block-mixed';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
// eslint-disable-next-line max-len
import DDSContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
// eslint-disable-next-line max-len
import DDSContentGroupPictograms from '@carbon/ibmdotcom-web-components/es/components-react/content-group-pictograms/content-group-pictograms';
import DDSPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
// eslint-disable-next-line max-len
import DDSContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItemCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-card-cta';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import TouchScreen from '@carbon/pictograms-react/es/touch--screen/index.js';

import readme from './README.stories.react.mdx';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import { CTA_TYPE } from '../../cta/defs';

const pictogramsItems = [
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
  {
    heading: 'Aliquam condimentum interdum',
    copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.`,
    linkWithIcon: {
      href: 'https://www.example.com',
      copy: 'Lorem ipsum dolor sit amet',
    },
  },
];

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const complementaryStyleSchemes = {
  'Regular style scheme': null,
  // eslint-disable-next-line max-len
  [`With border (${CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER})`]: CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};

const image = ({ heading: imageHeading } = { heading: undefined }) => (
  <DDSImage slot="media" alt="Image alt text" defaultSrc={imgLg16x9} heading={imageHeading}>
    <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </DDSImage>
);

export const Default = ({ parameters }) => {
  const { heading, copy: groupCopy, cardsGroupHeading, ctaType } = parameters?.props?.ContentBlockMixed ?? {};
  const headingComponent = document.querySelector('dds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = heading;
  }

  return (
    <DDSContentBlockMixed>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSContentBlockCopy>{groupCopy}</DDSContentBlockCopy>
      <DDSContentGroupCards>
        <DDSContentGroupHeading>{cardsGroupHeading}</DDSContentGroupHeading>
        <DDSContentGroupCardsItem href="www.ibm.com">
          <DDSCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          </DDSCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <DDSCardFooter>
            <ArrowRight20 slot="icon" />
          </DDSCardFooter>
        </DDSContentGroupCardsItem>
        <DDSContentGroupCardsItem href="www.ibm.com">
          <DDSCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          </DDSCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <DDSCardFooter>
            <ArrowRight20 slot="icon" />
          </DDSCardFooter>
        </DDSContentGroupCardsItem>
      </DDSContentGroupCards>
      <DDSContentGroupPictograms>
        <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
        <DDSContentGroupCopy>{groupCopy}</DDSContentGroupCopy>
        {pictogramsItems.map(({ heading: itemHeading, copy: itemCopy, linkWithIcon }) => (
          <DDSPictogramItem>
            <TouchScreen slot="pictogram" />
            <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
            <DDSContentItemCopy>{itemCopy}</DDSContentItemCopy>
            <DDSLinkWithIcon href={linkWithIcon.href} slot="footer">
              {linkWithIcon.copy} <ArrowRight20 slot="icon" />
            </DDSLinkWithIcon>
          </DDSPictogramItem>
        ))}
      </DDSContentGroupPictograms>
      <DDSContentGroupSimple>
        <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
        <DDSContentGroupCopy>{groupCopy}</DDSContentGroupCopy>
        {image({ heading })}
        <DDSCardLinkCTA slot="footer" ctaType={ctaType} href="https://example.com">
          <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardLinkCTA>
      </DDSContentGroupSimple>
    </DDSContentBlockMixed>
  );
};

export const withLinkList = ({ parameters }) => {
  const { heading, copy: groupCopy, cardsGroupHeading, complementaryStyleScheme, ctaType, linkListHeading } =
    parameters?.props?.ContentBlockMixed ?? {};
  const headingComponent = document.querySelector('dds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = heading;
  }

  return (
    <DDSContentBlockMixed complementary-style-scheme={complementaryStyleScheme || undefined}>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSContentBlockCopy>{groupCopy}</DDSContentBlockCopy>
      <DDSContentGroupCards>
        <DDSContentGroupHeading>{cardsGroupHeading}</DDSContentGroupHeading>
        <DDSContentGroupCardsItem href="www.ibm.com">
          <DDSCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          </DDSCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <DDSCardFooter>
            <ArrowRight20 slot="icon" />
          </DDSCardFooter>
        </DDSContentGroupCardsItem>
        <DDSContentGroupCardsItem href="www.ibm.com">
          <DDSCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          </DDSCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <DDSCardFooter>
            <ArrowRight20 slot="icon" />
          </DDSCardFooter>
        </DDSContentGroupCardsItem>
      </DDSContentGroupCards>
      <DDSContentGroupPictograms>
        <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
        <DDSContentGroupCopy>{groupCopy}</DDSContentGroupCopy>
        {pictogramsItems.map(({ heading: itemHeading, copy: itemCopy, linkWithIcon }) => (
          <DDSPictogramItem>
            <TouchScreen slot="pictogram" />
            <DDSContentItemHeading>{itemHeading}</DDSContentItemHeading>
            <DDSContentItemCopy>{itemCopy}</DDSContentItemCopy>
            <DDSLinkWithIcon href={linkWithIcon.href} slot="footer">
              {linkWithIcon.copy} <ArrowRight20 slot="icon" />
            </DDSLinkWithIcon>
          </DDSPictogramItem>
        ))}
      </DDSContentGroupPictograms>
      <DDSContentGroupSimple>
        <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
        <DDSContentGroupCopy>{groupCopy}</DDSContentGroupCopy>
        {image({ heading })}
        <DDSCardLinkCTA slot="footer" ctaType={ctaType} href="https://example.com">
          <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardLinkCTA>
      </DDSContentGroupSimple>
      <DDSLinkList type="default" slot="complementary">
        <DDSLinkListHeading>{linkListHeading}</DDSLinkListHeading>
        <DDSLinkListItemCardCTA href="https://example.com" cta-type="local">
          <p>Containerization A Complete Guide</p>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSLinkListItemCardCTA>
        <DDSLinkListItemCardCTA href="https://example.com" cta-type="external">
          <p>Why should you use microservices and containers</p>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSLinkListItemCardCTA>
      </DDSLinkList>
    </DDSContentBlockMixed>
  );
};

withLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'bx--col-lg-12',
    knobs: {
      ContentBlockMixed: ({ groupId }) => ({
        heading: text('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat
          libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
        cardsGroupHeading: text(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          groupId
        ),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL, groupId),
        linkListHeading: text('Link list heading (heading)', 'Tutorials', groupId),
        complementaryStyleScheme: select(
          'Complementary style scheme (complementary-style-scheme)',
          complementaryStyleSchemes,
          null,
          groupId
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Content block mixed',
  decorators: [
    (story, { parameters }) => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className={`${parameters.gridContentClasses} bx--no-gutter`}>{story()}</div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    gridContentClasses: 'bx--col-lg-8',
    hasStoryPadding: true,
    knobs: {
      ContentBlockMixed: ({ groupId }) => ({
        heading: text('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat
          libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
        cardsGroupHeading: text(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          groupId
        ),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL, groupId),
      }),
    },
  },
};
