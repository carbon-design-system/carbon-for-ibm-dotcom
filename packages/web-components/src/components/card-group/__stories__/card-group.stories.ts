/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import '../../card/index';
import '../../card-in-card/index';
import '../index';
import '../../cta/video-cta-container';
import { html } from 'lit';
import { select, number, boolean } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
// eslint-disable-next-line sort-imports
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import { GRID_MODE } from '../defs';
import styles from './card-group.stories.scss';

import readme from './README.stories.mdx';

let count = 0;
const phraseArray = [
  'Lorem ipsum dolor sit amet',
  'Nunc convallis lobortis',
  'Lorem ipsum dolor sit amet, consectetur.',
  'Te sint disputando pri, at his aliquip corrumpit',
  'Disputando lorem covallis',
];

const cardsCol = {
  '2 cards per row': 'c4d-ce-demo-devenv--cards-in-row-2',
  '3 cards per row (default)': 'c4d-ce-demo-devenv--cards-in-row-3',
  '4 cards per row': 'c4d-ce-demo-devenv--cards-in-row-4',
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

const tagGroupContent = html`
  <div>
    <cds-tag type="cool-gray"> Systems w/TPS </cds-tag>
    <cds-tag type="cool-gray"> Virtual </cds-tag>
  </div>
`;

const textCTAContent = html`
  <c4d-text-cta slot="footer" cta-type="local" href="https://example.com">
    Learn more
  </c4d-text-cta>
`;

const imageContent = html`
  <c4d-image
    slot="image"
    alt="Image Alt Text"
    default-src="${imgXlg4x3}"></c4d-image>
`;

const cardsDiffLengthPhrase = (
  index,
  tagGroup,
  media,
  gridMode,
  cardType,
  addCta
) => {
  const defaultCardGroupItem = html`
    <c4d-card-group-item
      cta-type=${cardType === 'Card static' ? '' : 'local'}
      href=${cardType === 'Card static' ? '' : 'https://example.com'}
      color-scheme=${cardType === 'Card static' || gridMode === 'border'
        ? 'light'
        : null}>
      ${media ? imageContent : ''}
      <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
      <c4d-card-heading
        >${index < 5
          ? phraseArray[index]
          : 'Lorem ipsum dolor sit amet'}</c4d-card-heading
      >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est.'
      </p>
      ${tagGroup ? tagGroupContent : ''}
      ${cardType === 'Card static' && addCta
        ? textCTAContent
        : html` <c4d-card-footer slot="footer"></c4d-card-footer> `}
    </c4d-card-group-item>
  `;

  const videoCardGroupItem = (videoId = '1_9h94wo6b') => html`
    <c4d-card-group-item
      cta-type="video"
      href="${videoId}"
      color-scheme=${gridMode === 'border' ? 'light' : null}>
      <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
      <c4d-card-heading></c4d-card-heading>
      ${tagGroup ? tagGroupContent : ''}
      <c4d-card-footer cta-type="video" slot="footer" href="${videoId}">
      </c4d-card-footer>
    </c4d-card-group-item>
  `;

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
  return html`
    <c4d-card-group-item
      cta-type=${cardType === 'Card static' ? '' : 'local'}
      href=${cardType === 'Card static' ? '' : 'https://example.com'}
      color-scheme=${cardType === 'Card static' || gridMode === 'border'
        ? 'light'
        : null}>
      ${media ? imageContent : ''}
      <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
      <c4d-card-heading
        >Nunc convallis lobortis Nunc convallis lobortis Nunc convallis
        lobortis</c4d-card-heading
      >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      ${tagGroup ? tagGroupContent : ''}
      ${cardType === 'Card static' && addCta
        ? textCTAContent
        : html` <c4d-card-footer slot="footer"></c4d-card-footer> `}
    </c4d-card-group-item>
  `;
};

const pictogramCard = (gridMode) => html`
  <c4d-card-group-item
    href="https://example.com"
    pictogram-placement="top"
    color-scheme=${gridMode === 'border' ? 'light' : null}>
    <c4d-card-heading>Aerospace and defence</c4d-card-heading>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud
      exercitation.
    </p>
    <svg
      slot="pictogram"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      data-autoid="c4d--card__pictogram"
      aria-label="Pictogram description"
      width="48"
      height="48"
      viewBox="0 0 32 32"
      role="img"
      class="cds--card__pictogram">
      <path
        id="desktop_1_"
        d="M23,29.36H9v-0.72h6.64v-4.28H3c-1.301,0-2.36-1.059-2.36-2.36V5c0-1.301,1.059-2.36,2.36-2.36h26
  c1.302,0,2.36,1.059,2.36,2.36v17c0,1.302-1.059,2.36-2.36,2.36H16.36v4.279H23V29.36z M1.36,19.36V22c0,
  0.904,0.736,1.64,1.64,1.64h26c0.904,0,1.64-0.735,1.64-1.64v-2.64H1.36z M1.36,
  18.64h29.28V5c0-0.904-0.735-1.64-1.64-1.64H3C2.096,3.36,1.36,4.096,1.36,5V18.64z" />
    </svg>
  </c4d-card-group-item>
`;

const cardLink = html`
  <c4d-card-group-card-link-item
    cta-type="local"
    href="https://example.com"
    pattern-background>
    <c4d-card-link-heading>IBM Developer</c4d-card-link-heading>
    <p>Learn, code and connect with your community</p>
    <c4d-card-footer slot="footer"> </c4d-card-footer>
  </c4d-card-group-card-link-item>
`;

const emptyCard = html` <c4d-card-group-item empty></c4d-card-group-item> `;

const cardInCardItems = (i, tagGroup, media, gridMode) => {
  if (media) {
    return i % 2 === 0
      ? html`
          <c4d-card-group-item
            cta-type="local"
            href="https://example.com"
            color-scheme=${gridMode === 'border' ? 'light' : null}>
            ${imageContent}
            <c4d-card-eyebrow>Label</c4d-card-eyebrow>
            <c4d-card-heading
              >The United Nations Environment Program works with IBM to reduce
              marine litter</c4d-card-heading
            >
            ${tagGroup ? tagGroupContent : ''}
            <c4d-card-footer slot="footer"> </c4d-card-footer>
          </c4d-card-group-item>
        `
      : html`
          <c4d-card-group-item
            cta-type="video"
            href="0_ibuqxqbe"
            color-scheme=${gridMode === 'border' ? 'light' : null}>
            <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
            ${tagGroup ? tagGroupContent : ''}
            <c4d-card-footer cta-type="video" slot="footer" href="0_ibuqxqbe">
            </c4d-card-footer>
          </c4d-card-group-item>
        `;
  }
  return html`
    <c4d-card-group-item
      cta-type="local"
      href="https://example.com"
      color-scheme=${gridMode === 'border' ? 'light' : null}>
      <c4d-card-eyebrow>Label</c4d-card-eyebrow>
      <c4d-card-heading
        >The United Nations Environment Program works with IBM to reduce marine
        litter</c4d-card-heading
      >
      ${tagGroup ? tagGroupContent : ''}
      <c4d-card-footer slot="footer"> </c4d-card-footer>
    </c4d-card-group-item>
  `;
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

  const classes = classMap({
    [cardsPerRow]: cardsPerRow,
  });

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
        html`
          <c4d-card-group-item
            cta-type="local"
            href="https://example.com"
            color-scheme="inverse">
            <c4d-card-heading>Top level card link</c4d-card-heading>
            <c4d-card-footer slot="footer" color-scheme="inverse">
            </c4d-card-footer>
          </c4d-card-group-item>
        `
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
        html`
          <c4d-card-group-item
            cta-type="local"
            href="https://example.com"
            color-scheme="inverse">
            <c4d-card-heading>Top level card link</c4d-card-heading>
            <c4d-card-footer slot="footer" color-scheme="inverse">
            </c4d-card-footer>
          </c4d-card-group-item>
        `
      );
    }
  }

  if (cardType === 'Card link') {
    for (let i = 0; i < cards; i++) {
      allCards.push(cardLink);
    }
  }

  const colCount = cardsPerRow[cardsPerRow.length - 1];

  return html`
    <c4d-card-group
      cards-per-row="${colCount}"
      class="${classes}"
      grid-mode=${setGridMode[cardType] || gridMode}
      ?pictograms=${cardType === 'Card - pictogram'}>
      ${allCards}
    </c4d-card-group>
  `;
};

export const withCardInCard = (args) => {
  const { cards, tagGroup, media, gridMode } = args?.CardGroup ?? {};
  const allCards: object[] = [];
  for (let i = 0; i < cards; i++) {
    allCards.push(cardInCardItems(i, tagGroup, media, gridMode));
  }
  return html`
    <c4d-video-cta-container>
      <c4d-card-in-card
        href="https://example.com"
        cta-type="local"
        grid-mode="${ifDefined(gridMode)}">
        <c4d-card-in-card-image
          slot="image"
          alt="Image alt text"
          default-src="${imgSm4x3}">
          <c4d-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 672px)" srcset="${imgMd16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 320px)" srcset="${imgSm4x3}">
          </c4d-image-item>
        </c4d-card-in-card-image>
        <c4d-card-eyebrow>Label</c4d-card-eyebrow>
        <c4d-card-heading
          >Standard Bank Group prepares to embrace Africa’s AI
          opportunity</c4d-card-heading
        >
        <c4d-card-footer></c4d-card-footer>
      </c4d-card-in-card>
      <c4d-card-group grid-mode="${ifDefined(gridMode)}">
        ${allCards}
      </c4d-card-group>
    </c4d-video-cta-container>
  `;
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
    propsSet: {
      default: {
        CardGroup: {
          media: false,
          tagGroup: false,
          gridMode: 'narrow',
          cards: 5,
        },
      },
    },
  },
};

export default {
  title: 'Components/Card group',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">
            <c4d-video-cta-container> ${story()} </c4d-video-cta-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
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
    propsSet: {
      default: {
        CardGroup: {
          cardType: 'Card - default',
          media: false,
          tagGroup: false,
          addCta: false,
          cards: 5,
          cardsPerRow: 'c4d-ce-demo-devenv--cards-in-row-3',
          gridMode: 'collapsed',
          offset: 0,
          cta: false,
        },
      },
    },
  },
};
