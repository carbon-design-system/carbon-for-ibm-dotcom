/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, number, select } from '@storybook/addon-knobs';
import Desktop from '@carbon/pictograms-react/lib/desktop/index.js';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import C4DCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DCardCTAImage from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-image';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DCardGroupCardLinkItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-card-link-item';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardInCard from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card';
import C4DCardInCardImage from '@carbon/ibmdotcom-web-components/es/components-react/card-in-card/card-in-card-image';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import Tag from '@carbon/web-components/es/components-react/tag/tag.js';
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
  '2 cards per row': 'cds-ce-demo-devenv--cards-in-row-2',
  '3 cards per row (default)': 'cds-ce-demo-devenv--cards-in-row-3',
  '4 cards per row': 'cds-ce-demo-devenv--cards-in-row-4',
};

const gridModes = {
  [`Collapsed (1px)`]: GRID_MODE.COLLAPSED,
  [`Narrow (16px)`]: GRID_MODE.NARROW,
  [`Outlined cards (1px border)`]: GRID_MODE.BORDER,
};

const setGridMode = {
  'Card static': 'border',
  'Card link': 'narrow',
};

const tagGroupContent = (
  <div>
    <Tag type="cool-gray">Systems w/TPS</Tag>
    <Tag type="cool-gray">Virtual</Tag>
  </div>
);

const textCTAContent = (
  <C4DTextCTA slot="footer" cta-type="local" href="https://example.com">
    Learn more
  </C4DTextCTA>
);

const imageContent = (
  <C4DCardCTAImage slot="image" alt="Image alt text" defaultSrc={imgXlg4x3} />
);

const cardsDiffLengthPhrase = (
  index,
  tagGroup,
  media,
  gridMode,
  cardType,
  addCta
) => {
  const defaultCardGroupItem = (
    <C4DCardGroupItem
      cta-type={cardType === 'Card static' ? '' : 'local'}
      href={cardType === 'Card static' ? '' : 'https://example.com'}
      colorScheme={
        cardType === 'Card static' || gridMode === 'border' ? 'light' : null
      }>
      {media ? imageContent : ''}
      <C4DCardEyebrow>Topic</C4DCardEyebrow>
      <C4DCardHeading>
        {index < 5 ? phraseArray[index] : 'Lorem ipsum dolor sit amet'}
      </C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est.'
      </p>
      {tagGroup ? tagGroupContent : ''}
      {cardType === 'Card static' && addCta ? (
        textCTAContent
      ) : (
        <C4DCardCTAFooter slot="footer"></C4DCardCTAFooter>
      )}
    </C4DCardGroupItem>
  );

  const videoCardGroupItem = (videoId = '1_9h94wo6b') => (
    <C4DCardGroupItem
      cta-type="video"
      href={videoId}
      color-scheme={gridMode === 'border' ? 'light' : null}>
      <C4DCardEyebrow>Topic</C4DCardEyebrow>
      {tagGroup ? tagGroupContent : ''}
      <C4DCardCTAFooter
        cta-type="video"
        href={videoId}
        slot="footer"></C4DCardCTAFooter>
    </C4DCardGroupItem>
  );

  const demoVideoIds = ['1_9h94wo6b', '0_ibuqxqbe', '1_6b6qjovy'];

  count = count > 3 ? 0 : count + 1;
  return media && index % 2
    ? videoCardGroupItem(demoVideoIds[index % 3])
    : defaultCardGroupItem;
};

const longHeadingCardGroupItem = (
  tagGroup,
  media,
  gridMode,
  cardType,
  addCta
) => {
  return (
    <C4DCardGroupItem
      cta-type={cardType === 'Card static' ? '' : 'local'}
      href={cardType === 'Card static' ? '' : 'https://example.com'}
      colorScheme={
        cardType === 'Card static' || gridMode === 'border' ? 'light' : null
      }>
      {media ? imageContent : ''}
      <C4DCardEyebrow>Topic</C4DCardEyebrow>
      <C4DCardHeading>
        Nunc convallis lobortis Nunc convallis lobortis Nunc convallis lobortis
      </C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      {tagGroup ? tagGroupContent : ''}
      {cardType === 'Card static' && addCta ? (
        textCTAContent
      ) : (
        <C4DCardCTAFooter slot="footer"></C4DCardCTAFooter>
      )}
    </C4DCardGroupItem>
  );
};

const pictogramCard = (gridMode) => (
  <C4DCardGroupItem
    href="https://example.com"
    pictogramPlacement="top"
    colorScheme={gridMode === 'border' ? 'light' : null}>
    <C4DCardHeading>Aerospace and defence</C4DCardHeading>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud
      exercitation.
    </p>
    <Desktop slot="pictogram" width="48" height="48" />
  </C4DCardGroupItem>
);

const cardLink = (
  <C4DCardGroupCardLinkItem
    cta-type="local"
    href="https://example.com"
    pattern-background>
    <C4DCardLinkHeading>IBM Developer</C4DCardLinkHeading>
    <p>Learn, code and connect with your community</p>
    <C4DCardCTAFooter slot="footer"></C4DCardCTAFooter>
  </C4DCardGroupCardLinkItem>
);

const emptyCard = <C4DCardGroupItem empty></C4DCardGroupItem>;

const cardInCardItems = (i, tagGroup, media, gridMode) => {
  if (media) {
    return i % 2 === 0 ? (
      <C4DCardGroupItem
        cta-type="local"
        href="https://example.com"
        colorScheme={gridMode === 'border' ? 'light' : null}>
        {imageContent}
        <C4DCardEyebrow>Label</C4DCardEyebrow>
        <C4DCardHeading>
          The United Nations Environment Program works with IBM to reduce marine
          litter
        </C4DCardHeading>
        {tagGroup ? tagGroupContent : ''}
        <C4DCardCTAFooter slot="footer" />
      </C4DCardGroupItem>
    ) : (
      <C4DCardGroupItem
        cta-type="video"
        href="1_9h94wo6b"
        colorScheme={gridMode === 'border' ? 'light' : null}>
        <C4DCardEyebrow>Topic</C4DCardEyebrow>
        {tagGroup ? tagGroupContent : ''}
        <C4DCardCTAFooter cta-type="video" slot="footer" href="0_ibuqxqbe" />
      </C4DCardGroupItem>
    );
  }
  return (
    <C4DCardGroupItem
      cta-type="local"
      href="https://example.com"
      colorScheme={gridMode === 'border' ? 'light' : null}>
      <C4DCardEyebrow>Label</C4DCardEyebrow>
      <C4DCardHeading>
        The United Nations Environment Program works with IBM to reduce marine
        litter
      </C4DCardHeading>
      {tagGroup ? tagGroupContent : ''}
      <C4DCardCTAFooter slot="footer" />
    </C4DCardGroupItem>
  );
};

export const Default = (args) => {
  const {
    cards,
    cardType,
    media,
    tagGroup,
    cardsPerRow,
    gridMode,
    offset,
    cta,
    addCta,
  } = args?.CardGroup ?? {};

  const allCards: object[] = [];

  if (offset === '1') {
    allCards.push(emptyCard);
  }

  if (cardType === 'Card - default') {
    allCards.push(
      longHeadingCardGroupItem(tagGroup, media, gridMode, cardType, addCta)
    );
    for (let i = 1; i < cards; i++) {
      allCards.push(
        cardsDiffLengthPhrase(i, tagGroup, media, gridMode, cardType, addCta)
      );
    }
    if (cta) {
      allCards.push(
        <C4DCardGroupItem
          cta-type="local"
          href="https://example.com"
          colorScheme="inverse">
          <C4DCardHeading>Top level card link</C4DCardHeading>
          <C4DCardCTAFooter
            slot="footer"
            color-scheme="inverse"></C4DCardCTAFooter>
        </C4DCardGroupItem>
      );
    }
  }

  if (cardType === 'Card - pictogram') {
    for (let i = 0; i < cards; i++) {
      allCards.push(pictogramCard(gridMode));
    }
  }

  if (cardType === 'Card static') {
    allCards.push(
      longHeadingCardGroupItem(tagGroup, media, gridMode, cardType, addCta)
    );
    for (let i = 1; i < cards; i++) {
      allCards.push(
        cardsDiffLengthPhrase(i, tagGroup, media, gridMode, cardType, addCta)
      );
    }
    if (cta) {
      allCards.push(
        <C4DCardGroupItem
          cta-type="local"
          href="https://example.com"
          colorScheme="inverse">
          <C4DCardHeading>Top level card link</C4DCardHeading>
          <C4DCardCTAFooter slot="footer" colorScheme="inverse" />
        </C4DCardGroupItem>
      );
    }
  }

  if (cardType === 'Card link') {
    for (let i = 0; i < cards; i++) {
      allCards.push(cardLink);
    }
  }

  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return (
    <C4DCardGroup
      cardsPerRow={colCount}
      class={cardsPerRow}
      gridMode={setGridMode[cardType] || gridMode}
      pictograms={cardType === 'Card - pictogram'}>
      {allCards}
    </C4DCardGroup>
  );
};

Default.story = {
  parameters: {
    hasStoryPadding: true,
    knobs: {
      CardGroup: () => {
        const cardType = select(
          'Card type:',
          ['Card - default', 'Card - pictogram', 'Card static', 'Card link'],
          'Card - default'
        );
        const media =
          cardType === 'Card - default' || cardType === 'Card static'
            ? boolean('Add media:', false)
            : '';
        const tagGroup =
          cardType === 'Card - default' || cardType === 'Card static'
            ? boolean('Add tags:', false)
            : '';
        const addCta =
          cardType === 'Card static' ? boolean('Add CTA Links:', false) : '';
        const cards = number('Number of cards:', 5, { min: 2, max: 6 });
        const cardsPerRow = select(
          'Cards per row:',
          cardsCol,
          cardsCol['3 cards per row (default)']
        );
        const gridMode =
          cardType === 'Card static' || cardType === 'Card link'
            ? ''
            : select('Grid mode:', gridModes, gridModes['Collapsed (1px)']);
        const offset = select('Offset:', ['0', '1'], '0');
        const cta = media ? '' : boolean('Add CTA card:', false);
        return {
          cardType,
          media,
          tagGroup,
          addCta,
          cards,
          cardsPerRow,
          gridMode,
          offset,
          cta,
        };
      },
    },
  },
};

export const withCardInCard = (args) => {
  const { cards, tagGroup, media, gridMode } = args?.CardGroup ?? {};
  const allCards: object[] = [];
  for (let i = 0; i < cards; i++) {
    allCards.push(cardInCardItems(i, tagGroup, media, gridMode));
  }
  return (
    <>
      <C4DCardInCard
        href="https://example.com"
        grid-mode={gridMode || undefined}>
        <C4DCardInCardImage
          slot="image"
          alt="Image alt text"
          defaultSrc={imgSm4x3}>
          <C4DImageItem media="(min-width: 1312px)" srcset={imgXlg16x9} />
          <C4DImageItem media="(min-width: 672px)" srcset={imgMd16x9} />
          <C4DImageItem media="(min-width: 320px)" srcset={imgSm4x3} />
        </C4DCardInCardImage>
        <C4DCardEyebrow>Label</C4DCardEyebrow>
        <C4DCardHeading>
          Standard Bank Group prepares to embrace Africa’s AI opportunity
        </C4DCardHeading>
        <C4DCardCTAFooter></C4DCardCTAFooter>
      </C4DCardInCard>
      <C4DCardGroup gridMode={gridMode || undefined}>{allCards}</C4DCardGroup>
    </>
  );
};

withCardInCard.story = {
  name: 'With card in card',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CardGroup: () => ({
        media: boolean('Add media:', false),
        tagGroup: boolean('Add tags:', false),
        gridMode: select('Grid mode:', gridModes, GRID_MODE.NARROW),
        cards: number('Number of cards', 5, { min: 2, max: 6 }),
      }),
    },
  },
};

export default {
  title: 'Components/Card group',
  decorators: [
    (story) => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-lg-12 cds--no-gutter">
                <C4DVideoCTAContainer>{story()}</C4DVideoCTAContainer>
              </div>
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
