/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, number, select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSCardCTAImage from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-image';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
import DDSCardGroupCardLinkItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-card-link-item';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardInCard from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card';
import DDSCardInCardImage from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card-image';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
import { Tag } from 'carbon-components-react';

import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import { GRID_MODE } from '../defs';

import readme from './README.stories.react.mdx';
import styles from './card-group.stories.scss';

let count = 0;
const phraseArray = [
  'Lorem ipsum dolor sit amet',
  'Nunc convallis lobortis',
  'Lorem ipsum dolor sit amet, consectetur.',
  'Te sint disputando pri, at his aliquip corrumpit',
  'Disputando lorem covallis',
];

const cardsCol = {
  '3 cards per row (Default)': 'dds-ce-demo-devenv--cards-in-row-3',
  '2 cards per row': 'dds-ce-demo-devenv--cards-in-row-2',
  '4 cards per row': 'dds-ce-demo-devenv--cards-in-row-4',
};

const cardsDiffLengthPhrase = (index, border, tagGroup, defaultSrc, image) => {
  const defaultCardGroupItem = (
    <DDSCardGroupItem href="https://example.com" color-scheme={border ? 'light' : null}>
      {image ? <DDSImage slot="image" alt="Image Alt text" defaultSrc={defaultSrc || undefined} /> : ''}
      <DDSCardEyebrow>Topic</DDSCardEyebrow>
      <DDSCardHeading>{index < 5 ? phraseArray[index] : 'Lorem ipsum dolor sit amet'}</DDSCardHeading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.'</p>
      {tagGroup ? (
        <DDSTagGroup>
          <Tag type="cool-gray">Systems w/TPS</Tag>
          <Tag type="cool-gray">Virtual</Tag>
        </DDSTagGroup>
      ) : (
        ''
      )}
      <DDSCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
  );
  count = count > 3 ? 0 : count + 1;
  return defaultCardGroupItem;
};

const longHeadingCardGroupItem = (border, tagGroup, defaultSrc, image) => {
  return (
    <DDSCardGroupItem href="https://example.com" color-scheme={border ? 'light' : null}>
      {image ? <DDSImage slot="image" alt="Image Alt text" defaultSrc={defaultSrc || undefined} /> : ''}
      <DDSCardEyebrow>Topic</DDSCardEyebrow>
      <DDSCardHeading>Nunc convallis lobortis Nunc convallis lobortis Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      {tagGroup ? (
        <DDSTagGroup>
          <Tag type="cool-gray">Systems w/TPS</Tag>
          <Tag type="cool-gray">Virtual</Tag>
        </DDSTagGroup>
      ) : (
        ''
      )}
      <DDSCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
  );
};

const emptyCard = <DDSCardGroupItem empty></DDSCardGroupItem>;

const cardGroupItemWithImages = (
  <DDSCardGroupItem href="https://example.com">
    <DDSCardCTAImage slot="image" alt="Image alt text" defaultSrc={imgXlg4x3} />
    <DDSCardEyebrow>Topic</DDSCardEyebrow>
    <DDSCardHeading>Natural Language Processing.</DDSCardHeading>
    <DDSCardCTAFooter slot="footer">
      <ArrowRight20 slot="icon" />
    </DDSCardCTAFooter>
  </DDSCardGroupItem>
);

const cardGroupItemWithVideos = (
  <DDSCardGroupItem cta-type="video" href="1_9h94wo6b">
    <DDSCardEyebrow>Topic</DDSCardEyebrow>
    <DDSCardCTAFooter cta-type="video" href="1_9h94wo6b" slot="footer"></DDSCardCTAFooter>
  </DDSCardGroupItem>
);

const cardGroupItemWithCTAs = (
  <DDSCardGroupItem href="https://example.com">
    <DDSCardEyebrow>Label</DDSCardEyebrow>
    <DDSCardHeading>The United Nations Environment Program works with IBM to reduce marine litter</DDSCardHeading>
    <DDSCardCTAFooter slot="footer">
      <ArrowRight20 slot="icon" />
    </DDSCardCTAFooter>
  </DDSCardGroupItem>
);

const cardGroupItemWithCardLinks = (
  <DDSCardGroupCardLinkItem href="https://example.com" pattern-background>
    <DDSCardLinkHeading>IBM Developer</DDSCardLinkHeading>
    <p>Learn, code and connect with your community</p>
    <DDSCardCTAFooter slot="footer">
      <ArrowRight20 slot="icon" />
    </DDSCardCTAFooter>
  </DDSCardGroupCardLinkItem>
);

export const Default = ({ parameters }) => {
  const { cards, cardsPerRow, offset, optionalBorder, tagGroup, defaultSrc, image } = parameters?.props?.CardGroup ?? {};

  const allCards: object[] = [];
  if (offset === '1') {
    allCards.push(emptyCard);
  }
  allCards.push(longHeadingCardGroupItem(optionalBorder, tagGroup, defaultSrc, image));
  for (let i = 1; i < cards; i++) {
    allCards.push(cardsDiffLengthPhrase(i, optionalBorder, tagGroup, defaultSrc, image));
  }
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return (
    <DDSCardGroup cardsPerRow={colCount} class={cardsPerRow} gridMode={optionalBorder ? 'border' : undefined}>
      {allCards}
    </DDSCardGroup>
  );
};

Default.story = {
  parameters: {
    hasStoryPadding: true,
    knobs: {
      CardGroup: ({ groupId }) => ({
        defaultSrc: imgXlg4x3,
        tagGroup: boolean('Add tags', false, groupId),
        image: boolean('Add image', false, groupId),
        cards: number('Number of cards', 5, {}, groupId),
        optionalBorder: boolean('Outlined cards:', false, groupId),
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
        offset: select('Offset', ['0', '1'], '0', groupId),
      }),
    },
  },
};

export const withCTA = ({ parameters }) => {
  const { cards, cardsPerRow } = parameters?.props?.CardGroup ?? {};
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return (
    <DDSCardGroup cardsPerRow={colCount} class={cardsPerRow} border>
      {cards}
      <DDSCardGroupItem href="https://example.com" colorScheme="inverse">
        <DDSCardHeading>Top level card link</DDSCardHeading>
        <DDSCardCTAFooter slot="footer" colorScheme="inverse">
          <ArrowRight20 slot="icon" />
        </DDSCardCTAFooter>
      </DDSCardGroupItem>
    </DDSCardGroup>
  );
};

withCTA.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => cardGroupItemWithCTAs),
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
      }),
    },
  },
};

export const withImages = ({ parameters }) => {
  const { cards, cardsPerRow } = parameters?.props?.CardGroup ?? {};
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return (
    <DDSCardGroup cardsPerRow={colCount} class={cardsPerRow}>
      {cards}
    </DDSCardGroup>
  );
};

withImages.story = {
  name: 'With images',
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => cardGroupItemWithImages),
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
      }),
    },
  },
};

export const withCardInCard = ({ parameters }) => {
  const { cards, gridMode } = parameters?.props?.CardGroup ?? {};
  return (
    <>
      <DDSCardInCard href="https://example.com" grid-mode={gridMode || undefined}>
        <DDSCardInCardImage slot="image" alt="Image alt text" defaultSrc={imgSm4x3}>
          <DDSImageItem media="(min-width: 1312px)" srcset={imgXlg16x9} />
          <DDSImageItem media="(min-width: 672px)" srcset={imgMd16x9} />
          <DDSImageItem media="(min-width: 320px)" srcset={imgSm4x3} />
        </DDSCardInCardImage>
        <DDSCardEyebrow>Label</DDSCardEyebrow>
        <DDSCardHeading>Standard Bank Group prepares to embrace Africa’s AI opportunity</DDSCardHeading>
        <DDSCardCTAFooter>
          <ArrowRight20 slot="icon" />
        </DDSCardCTAFooter>
      </DDSCardInCard>
      <DDSCardGroup gridMode={gridMode || undefined}>{cards}</DDSCardGroup>
    </>
  );
};

const gridModes = {
  [`Collapsed (1px)`]: GRID_MODE.COLLAPSED,
  [`Narrow (16px)`]: GRID_MODE.NARROW,
};

withCardInCard.story = {
  name: 'With card in card',
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        gridMode: select('Grid mode:', gridModes, GRID_MODE.NARROW, groupId),
        cards: Array.from({
          length: number('Number of cards', 3, {}, groupId),
        }).map(() => cardGroupItemWithCTAs),
      }),
    },
  },
};

export const withMixedMedia = ({ parameters }) => {
  const { cards, cardsPerRow } = parameters?.props?.CardGroup ?? {};
  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return (
    <DDSVideoCTAContainer>
      <DDSCardGroup cardsPerRow={colCount} class={cardsPerRow}>
        {cards}
      </DDSCardGroup>
    </DDSVideoCTAContainer>
  );
};

withMixedMedia.story = {
  name: 'With mixed media',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map((_, index) => (index % 2 ? cardGroupItemWithImages : cardGroupItemWithVideos)),
        cardsPerRow: select('Number of cards per row (cards-per-row):', cardsCol, cardsCol['3 cards per row (Default)'], groupId),
      }),
    },
  },
};

export const withCardInCardAndImageCards = ({ parameters }) => {
  const { cards, gridMode } = parameters?.props?.CardGroup ?? {};
  return (
    <>
      <DDSCardInCard href="https://example.com" gridMode={gridMode || undefined}>
        <DDSCardInCardImage slot="image" alt="Image alt text" defaultSrc={imgSm4x3}>
          <DDSImageItem media="(min-width: 1312px)" srcset={imgXlg16x9} />
          <DDSImageItem media="(min-width: 672px)" srcset={imgMd16x9} />
          <DDSImageItem media="(min-width: 320px)" srcset={imgSm4x3} />
        </DDSCardInCardImage>
        <DDSCardEyebrow>Label</DDSCardEyebrow>
        <DDSCardHeading>Standard Bank Group prepares to embrace Africa’s AI opportunity</DDSCardHeading>
        <DDSCardCTAFooter>
          <ArrowRight20 slot="icon" />
        </DDSCardCTAFooter>
      </DDSCardInCard>
      <DDSCardGroup gridMode={gridMode || undefined}>{cards}</DDSCardGroup>
    </>
  );
};

withCardInCardAndImageCards.story = {
  name: 'With card in card and image cards',
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        gridMode: select('Grid mode:', gridModes, GRID_MODE.NARROW, groupId),
        cards: Array.from({
          length: number('Number of cards', 3, {}, groupId),
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};

export const withCardLinks = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};

  return <DDSCardGroup gridMode="narrow">{cards}</DDSCardGroup>;
};

withCardLinks.story = {
  name: 'With card links',
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 8, {}, groupId),
        }).map(() => cardGroupItemWithCardLinks),
      }),
    },
  },
};

export default {
  title: 'Components/Card group',
  decorators: [
    story => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-lg-12 bx--no-gutter">{story()}</div>
            </div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
