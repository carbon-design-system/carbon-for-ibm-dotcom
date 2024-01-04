/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DContentBlockMixed from '@carbon/ibmdotcom-web-components/es/components-react/content-block-mixed/content-block-mixed';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
// eslint-disable-next-line max-len
import C4DContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
// eslint-disable-next-line max-len
import C4DContentGroupPictograms from '@carbon/ibmdotcom-web-components/es/components-react/content-group-pictograms/content-group-pictograms';
import C4DPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
// eslint-disable-next-line max-len
import C4DContentGroupSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-group-simple/content-group-simple';
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import { ArrowRight } from '@carbon/icons-react';
import TouchScreen from '@carbon/pictograms-react/es/touch--screen/index.js';

import readme from './README.stories.react.mdx';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/defs';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
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
  [`With border (${CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER})`]:
    CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};

const image = ({ heading: imageHeading } = { heading: undefined }) => (
  <C4DImage
    slot="media"
    alt="Image alt text"
    defaultSrc={imgLg16x9}
    heading={imageHeading}>
    <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </C4DImage>
);

export const Default = (args) => {
  const {
    heading,
    copy: groupCopy,
    cardsGroupHeading,
    ctaType,
  } = args?.ContentBlockMixed ?? {};
  const headingComponent = document.querySelector('cds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = heading;
  }

  return (
    <C4DContentBlockMixed>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      <C4DContentBlockCopy>{groupCopy}</C4DContentBlockCopy>
      <C4DContentGroupCards>
        <C4DContentGroupHeading>{cardsGroupHeading}</C4DContentGroupHeading>
        <C4DContentGroupCardsItem href="www.ibm.com">
          <C4DCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt
          </C4DCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <C4DCardFooter>
            <ArrowRight size="20" slot="icon" />
          </C4DCardFooter>
        </C4DContentGroupCardsItem>
        <C4DContentGroupCardsItem href="www.ibm.com">
          <C4DCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt
          </C4DCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <C4DCardFooter>
            <ArrowRight size="20" slot="icon" />
          </C4DCardFooter>
        </C4DContentGroupCardsItem>
      </C4DContentGroupCards>
      <C4DContentGroupPictograms>
        <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
        <C4DContentGroupCopy>{groupCopy}</C4DContentGroupCopy>
        {pictogramsItems.map(
          ({ heading: itemHeading, copy: itemCopy, linkWithIcon }) => (
            <C4DPictogramItem>
              <TouchScreen slot="pictogram" />
              <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
              <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
              <C4DLinkWithIcon href={linkWithIcon.href} slot="footer">
                {linkWithIcon.copy} <ArrowRight size="20" slot="icon" />
              </C4DLinkWithIcon>
            </C4DPictogramItem>
          )
        )}
      </C4DContentGroupPictograms>
      <C4DContentGroupSimple>
        <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
        <C4DContentGroupCopy>{groupCopy}</C4DContentGroupCopy>
        {image({ heading })}
        <C4DCardLinkCTA
          slot="footer"
          ctaType={ctaType}
          href="https://example.com">
          <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      </C4DContentGroupSimple>
    </C4DContentBlockMixed>
  );
};

export const withLinkList = (args) => {
  const {
    heading,
    copy: groupCopy,
    cardsGroupHeading,
    complementaryStyleScheme,
    ctaType,
    linkListHeading,
  } = args?.ContentBlockMixed ?? {};
  const headingComponent = document.querySelector('cds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = heading;
  }

  return (
    <C4DContentBlockMixed
      complementary-style-scheme={complementaryStyleScheme || undefined}>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      <C4DContentBlockCopy>{groupCopy}</C4DContentBlockCopy>
      <C4DContentGroupCards>
        <C4DContentGroupHeading>{cardsGroupHeading}</C4DContentGroupHeading>
        <C4DContentGroupCardsItem href="www.ibm.com">
          <C4DCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt
          </C4DCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <C4DCardFooter>
            <ArrowRight size="20" slot="icon" />
          </C4DCardFooter>
        </C4DContentGroupCardsItem>
        <C4DContentGroupCardsItem href="www.ibm.com">
          <C4DCardHeading>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt
          </C4DCardHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <C4DCardFooter>
            <ArrowRight size="20" slot="icon" />
          </C4DCardFooter>
        </C4DContentGroupCardsItem>
      </C4DContentGroupCards>
      <C4DContentGroupPictograms>
        <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
        <C4DContentGroupCopy>{groupCopy}</C4DContentGroupCopy>
        {pictogramsItems.map(
          ({ heading: itemHeading, copy: itemCopy, linkWithIcon }) => (
            <C4DPictogramItem>
              <TouchScreen slot="pictogram" />
              <C4DContentItemHeading>{itemHeading}</C4DContentItemHeading>
              <C4DContentItemCopy>{itemCopy}</C4DContentItemCopy>
              <C4DLinkWithIcon href={linkWithIcon.href} slot="footer">
                {linkWithIcon.copy} <ArrowRight size="20" slot="icon" />
              </C4DLinkWithIcon>
            </C4DPictogramItem>
          )
        )}
      </C4DContentGroupPictograms>
      <C4DContentGroupSimple>
        <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
        <C4DContentGroupCopy>{groupCopy}</C4DContentGroupCopy>
        {image({ heading })}
        <C4DCardLinkCTA
          slot="footer"
          ctaType={ctaType}
          href="https://example.com">
          <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      </C4DContentGroupSimple>
      <C4DLinkList type="default" slot="complementary">
        <C4DLinkListHeading>{linkListHeading}</C4DLinkListHeading>
        <C4DLinkListItemCTA
          href="https://example.com"
          cta-type="local"
          type="default">
          <p>Containerization A Complete Guide</p>
        </C4DLinkListItemCTA>
        <C4DLinkListItemCTA
          href="https://example.com"
          cta-type="external"
          type="default">
          <p>Why should you use microservices and containers</p>
        </C4DLinkListItemCTA>
      </C4DLinkList>
    </C4DContentBlockMixed>
  );
};

withLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'cds--col-lg-12',
    knobs: {
      ContentBlockMixed: () => ({
        heading: text('Heading (heading)', 'Lorem ipsum dolor sit amet'),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat
          libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
        cardsGroupHeading: text(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        ),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        linkListHeading: text('Link list heading (heading)', 'Tutorials'),
        complementaryStyleScheme: select(
          'Complementary style scheme (complementary-style-scheme)',
          complementaryStyleSchemes,
          null
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
        <div className="cds--grid">
          <div className="cds--row">
            <div className={`${parameters.gridContentClasses} cds--no-gutter`}>
              {story()}
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    gridContentClasses: 'cds--col-lg-8',
    hasStoryPadding: true,
    knobs: {
      ContentBlockMixed: () => ({
        heading: text('Heading (heading)', 'Lorem ipsum dolor sit amet'),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat
          libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
          Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
        cardsGroupHeading: text(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
      }),
    },
  },
};
