/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
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
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
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
  '2 cards per row': 'dds-ce-demo-devenv--cards-in-row-2',
  '3 cards per row (default)': 'dds-ce-demo-devenv--cards-in-row-3',
  '4 cards per row': 'dds-ce-demo-devenv--cards-in-row-4',
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
  <DDSTagGroup>
    <Tag type="cool-gray">Systems w/TPS</Tag>
    <Tag type="cool-gray">Virtual</Tag>
  </DDSTagGroup>
);

const textCTAContent = (
  <DDSTextCTA slot="footer" cta-type="local" href="https://example.com">
    Learn more
  </DDSTextCTA>
);

const imageContent = <DDSCardCTAImage slot="image" alt="Image alt text" defaultSrc={imgXlg4x3} />;

const cardsDiffLengthPhrase = (index, tagGroup, media, gridMode, cardType, addCta) => {
  const defaultCardGroupItem = (
    <DDSCardGroupItem
      cta-type={cardType === 'Card static' ? '' : 'local'}
      href={cardType === 'Card static' ? '' : 'https://example.com'}
      colorScheme={cardType === 'Card static' || gridMode === 'border' ? 'light' : null}>
      {media ? imageContent : ''}
      <DDSCardEyebrow>Topic</DDSCardEyebrow>
      <DDSCardHeading>{index < 5 ? phraseArray[index] : 'Lorem ipsum dolor sit amet'}</DDSCardHeading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.'</p>
      {tagGroup ? tagGroupContent : ''}
      {cardType === 'Card static' && addCta ? textCTAContent : <DDSCardCTAFooter slot="footer"></DDSCardCTAFooter>}
    </DDSCardGroupItem>
  );

  const videoCardGroupItem = (
    <DDSCardGroupItem cta-type="video" href="1_9h94wo6b" color-scheme={gridMode === 'border' ? 'light' : null}>
      <DDSCardEyebrow>Topic</DDSCardEyebrow>
      {tagGroup ? tagGroupContent : ''}
      <DDSCardCTAFooter cta-type="video" href="1_9h94wo6b" slot="footer"></DDSCardCTAFooter>
    </DDSCardGroupItem>
  );

  count = count > 3 ? 0 : count + 1;
  return media && index % 2 ? videoCardGroupItem : defaultCardGroupItem;
};

const longHeadingCardGroupItem = (tagGroup, media, gridMode, cardType, addCta) => {
  return (
    <DDSCardGroupItem
      cta-type={cardType === 'Card static' ? '' : 'local'}
      href={cardType === 'Card static' ? '' : 'https://example.com'}
      colorScheme={cardType === 'Card static' || gridMode === 'border' ? 'light' : null}>
      {media ? imageContent : ''}
      <DDSCardEyebrow>Topic</DDSCardEyebrow>
      <DDSCardHeading>Nunc convallis lobortis Nunc convallis lobortis Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      {tagGroup ? tagGroupContent : ''}
      {cardType === 'Card static' && addCta ? textCTAContent : <DDSCardCTAFooter slot="footer"></DDSCardCTAFooter>}
    </DDSCardGroupItem>
  );
};

const pictogramCard = gridMode => (
  <DDSCardGroupItem href="https://example.com" pictogramPlacement="top" colorScheme={gridMode === 'border' ? 'light' : null}>
    <DDSCardHeading>Aerospace and defence</DDSCardHeading>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
      veniam, quis nostrud exercitation.
    </p>
    <Desktop slot="pictogram" width="48" height="48" />
  </DDSCardGroupItem>
);

const cardLink = (
  <DDSCardGroupCardLinkItem cta-type="local" href="https://example.com" pattern-background>
    <DDSCardLinkHeading>IBM Developer</DDSCardLinkHeading>
    <p>Learn, code and connect with your community</p>
    <DDSCardCTAFooter slot="footer"></DDSCardCTAFooter>
  </DDSCardGroupCardLinkItem>
);

const emptyCard = <DDSCardGroupItem empty></DDSCardGroupItem>;

const cardInCardItems = (i, tagGroup, media, gridMode) => {
  if (media) {
    return i % 2 === 0 ? (
      <DDSCardGroupItem cta-type="local" href="https://example.com" colorScheme={gridMode === 'border' ? 'light' : null}>
        {imageContent}
        <DDSCardEyebrow>Label</DDSCardEyebrow>
        <DDSCardHeading>The United Nations Environment Program works with IBM to reduce marine litter</DDSCardHeading>
        {tagGroup ? tagGroupContent : ''}
        <DDSCardCTAFooter slot="footer" />
      </DDSCardGroupItem>
    ) : (
      <DDSCardGroupItem cta-type="video" href="1_9h94wo6b" colorScheme={gridMode === 'border' ? 'light' : null}>
        <DDSCardEyebrow>Topic</DDSCardEyebrow>
        {tagGroup ? tagGroupContent : ''}
        <DDSCardCTAFooter cta-type="video" slot="footer" href="1_9h94wo6b" />
      </DDSCardGroupItem>
    );
  }
  return (
    <DDSCardGroupItem cta-type="local" href="https://example.com" colorScheme={gridMode === 'border' ? 'light' : null}>
      <DDSCardEyebrow>Label</DDSCardEyebrow>
      <DDSCardHeading>The United Nations Environment Program works with IBM to reduce marine litter</DDSCardHeading>
      {tagGroup ? tagGroupContent : ''}
      <DDSCardCTAFooter slot="footer" />
    </DDSCardGroupItem>
  );
};

export const Default = ({ parameters }) => {
  const { cards, cardType, media, tagGroup, cardsPerRow, gridMode, offset, cta, addCta } = parameters?.props?.CardGroup ?? {};

  const allCards: object[] = [];

  if (offset === '1') {
    allCards.push(emptyCard);
  }

  if (cardType === 'Card - default') {
    allCards.push(longHeadingCardGroupItem(tagGroup, media, gridMode, cardType, addCta));
    for (let i = 1; i < cards; i++) {
      allCards.push(cardsDiffLengthPhrase(i, tagGroup, media, gridMode, cardType, addCta));
    }
    if (cta) {
      allCards.push(
        <DDSCardGroupItem cta-type="local" href="https://example.com" colorScheme="inverse">
          <DDSCardHeading>Top level card link</DDSCardHeading>
          <DDSCardCTAFooter slot="footer" color-scheme="inverse"></DDSCardCTAFooter>
        </DDSCardGroupItem>
      );
    }
  }

  if (cardType === 'Card - pictogram') {
    for (let i = 0; i < cards; i++) {
      allCards.push(pictogramCard(gridMode));
    }
  }

  if (cardType === 'Card static') {
    allCards.push(longHeadingCardGroupItem(tagGroup, media, gridMode, cardType, addCta));
    for (let i = 1; i < cards; i++) {
      allCards.push(cardsDiffLengthPhrase(i, tagGroup, media, gridMode, cardType, addCta));
    }
    if (cta) {
      allCards.push(
        <DDSCardGroupItem cta-type="local" href="https://example.com" colorScheme="inverse">
          <DDSCardHeading>Top level card link</DDSCardHeading>
          <DDSCardCTAFooter slot="footer" colorScheme="inverse" />
        </DDSCardGroupItem>
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
    <DDSCardGroup
      cardsPerRow={colCount}
      class={cardsPerRow}
      gridMode={setGridMode[cardType] || gridMode}
      pictograms={cardType === 'Card - pictogram'}>
      {allCards}
    </DDSCardGroup>
  );
};

Default.story = {
  parameters: {
    hasStoryPadding: true,
    knobs: {
      CardGroup: ({ groupId }) => {
        const cardType = select(
          'Card type:',
          ['Card - default', 'Card - pictogram', 'Card static', 'Card link'],
          'Card - default',
          groupId
        );
        const media = cardType === 'Card - default' || cardType === 'Card static' ? boolean('Add media:', false, groupId) : '';
        const tagGroup = cardType === 'Card - default' || cardType === 'Card static' ? boolean('Add tags:', false, groupId) : '';
        const addCta = cardType === 'Card static' ? boolean('Add CTA Links:', false, groupId) : '';
        const cards = number('Number of cards:', 5, { min: 2, max: 6 }, groupId);
        const cardsPerRow = select('Cards per row:', cardsCol, cardsCol['3 cards per row (default)'], groupId);
        const gridMode =
          cardType === 'Card static' || cardType === 'Card link'
            ? ''
            : select('Grid mode:', gridModes, gridModes['Collapsed (1px)'], groupId);
        const offset = select('Offset:', ['0', '1'], '0', groupId);
        const cta = media ? '' : boolean('Add CTA card:', false, groupId);
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

export const withCardInCard = ({ parameters }) => {
  const { cards, tagGroup, media, gridMode } = parameters?.props?.CardGroup ?? {};
  const allCards: object[] = [];
  for (let i = 0; i < cards; i++) {
    allCards.push(cardInCardItems(i, tagGroup, media, gridMode));
  }
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
        <DDSCardCTAFooter></DDSCardCTAFooter>
      </DDSCardInCard>
      <DDSCardGroup gridMode={gridMode || undefined}>{allCards}</DDSCardGroup>
    </>
  );
};

withCardInCard.story = {
  name: 'With card in card',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CardGroup: ({ groupId }) => ({
        media: boolean('Add media:', false, groupId),
        tagGroup: boolean('Add tags:', false, groupId),
        gridMode: select('Grid mode:', gridModes, GRID_MODE.NARROW, groupId),
        cards: number('Number of cards', 5, { min: 2, max: 6 }, groupId),
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
              <div className="bx--col-lg-12 bx--no-gutter">
                <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
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
