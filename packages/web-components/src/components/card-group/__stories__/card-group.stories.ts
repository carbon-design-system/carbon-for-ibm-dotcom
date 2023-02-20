/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map.js';
import '../../card/index';
import '../../card-in-card/index';
import '../index';
import '../../cta/video-cta-container';
import { html } from 'lit-element';
import { select, number, boolean } from '@storybook/addon-knobs';
import ifNonNull from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
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

const tagGroupContent = html`
  <dds-tag-group>
    <bx-tag type="cool-gray"> Systems w/TPS </bx-tag>
    <bx-tag type="cool-gray"> Virtual </bx-tag>
  </dds-tag-group>
`;

const textCTAContent = html`
  <dds-text-cta slot="footer" cta-type="local" href="https://example.com">
    Learn more
  </dds-text-cta>
`;

const imageContent = html`
  <dds-card-cta-image
    slot="image"
    alt="Image Alt Text"
    default-src="${imgXlg4x3}"></dds-card-cta-image>
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
    <dds-card-group-item
      cta-type=${cardType === 'Card static' ? '' : 'local'}
      href=${cardType === 'Card static' ? '' : 'https://example.com'}
      color-scheme=${cardType === 'Card static' || gridMode === 'border'
        ? 'light'
        : null}>
      ${media ? imageContent : ''}
      <dds-card-eyebrow>Topic</dds-card-eyebrow>
      <dds-card-heading
        >${index < 5
          ? phraseArray[index]
          : 'Lorem ipsum dolor sit amet'}</dds-card-heading
      >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est.'
      </p>
      ${tagGroup ? tagGroupContent : ''}
      ${cardType === 'Card static' && addCta
        ? textCTAContent
        : html` <dds-card-cta-footer slot="footer"></dds-card-cta-footer> `}
    </dds-card-group-item>
  `;

  const videoCardGroupItem = html`
    <dds-card-group-item
      cta-type="video"
      href="1_9h94wo6b"
      color-scheme=${gridMode === 'border' ? 'light' : null}>
      <dds-card-eyebrow>Topic</dds-card-eyebrow>
      ${tagGroup ? tagGroupContent : ''}
      <dds-card-cta-footer cta-type="video" slot="footer" href="1_9h94wo6b">
      </dds-card-cta-footer>
    </dds-card-group-item>
  `;

  count = count > 3 ? 0 : count + 1;
  return media && index % 2 ? videoCardGroupItem : defaultCardGroupItem;
};

const longHeadingCardGroupItem = (
  tagGroup,
  media,
  gridMode,
  cardType,
  addCta
) => {
  return html`
    <dds-card-group-item
      cta-type=${cardType === 'Card static' ? '' : 'local'}
      href=${cardType === 'Card static' ? '' : 'https://example.com'}
      color-scheme=${cardType === 'Card static' || gridMode === 'border'
        ? 'light'
        : null}>
      ${media ? imageContent : ''}
      <dds-card-eyebrow>Topic</dds-card-eyebrow>
      <dds-card-heading
        >Nunc convallis lobortis Nunc convallis lobortis Nunc convallis
        lobortis</dds-card-heading
      >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      ${tagGroup ? tagGroupContent : ''}
      ${cardType === 'Card static' && addCta
        ? textCTAContent
        : html` <dds-card-cta-footer slot="footer"></dds-card-cta-footer> `}
    </dds-card-group-item>
  `;
};

const pictogramCard = (gridMode) => html`
  <dds-card-group-item
    href="https://example.com"
    pictogram-placement="top"
    color-scheme=${gridMode === 'border' ? 'light' : null}>
    <dds-card-heading>Aerospace and defence</dds-card-heading>
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
      data-autoid="dds--card__pictogram"
      aria-label="Pictogram description"
      width="48"
      height="48"
      viewBox="0 0 32 32"
      role="img"
      class="bx--card__pictogram">
      <path
        id="desktop_1_"
        d="M23,29.36H9v-0.72h6.64v-4.28H3c-1.301,0-2.36-1.059-2.36-2.36V5c0-1.301,1.059-2.36,2.36-2.36h26
  c1.302,0,2.36,1.059,2.36,2.36v17c0,1.302-1.059,2.36-2.36,2.36H16.36v4.279H23V29.36z M1.36,19.36V22c0,
  0.904,0.736,1.64,1.64,1.64h26c0.904,0,1.64-0.735,1.64-1.64v-2.64H1.36z M1.36,
  18.64h29.28V5c0-0.904-0.735-1.64-1.64-1.64H3C2.096,3.36,1.36,4.096,1.36,5V18.64z" />
    </svg>
  </dds-card-group-item>
`;

const cardLink = html`
  <dds-card-group-card-link-item
    cta-type="local"
    href="https://example.com"
    pattern-background>
    <dds-card-link-heading>IBM Developer</dds-card-link-heading>
    <p>Learn, code and connect with your community</p>
    <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
  </dds-card-group-card-link-item>
`;

const emptyCard = html` <dds-card-group-item empty></dds-card-group-item> `;

const cardInCardItems = (i, tagGroup, media, gridMode) => {
  if (media) {
    return i % 2 === 0
      ? html`
          <dds-card-group-item
            cta-type="local"
            href="https://example.com"
            color-scheme=${gridMode === 'border' ? 'light' : null}>
            ${imageContent}
            <dds-card-eyebrow>Label</dds-card-eyebrow>
            <dds-card-heading
              >The United Nations Environment Program works with IBM to reduce
              marine litter</dds-card-heading
            >
            ${tagGroup ? tagGroupContent : ''}
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
        `
      : html`
          <dds-card-group-item
            cta-type="video"
            href="1_9h94wo6b"
            color-scheme=${gridMode === 'border' ? 'light' : null}>
            <dds-card-eyebrow>Topic</dds-card-eyebrow>
            ${tagGroup ? tagGroupContent : ''}
            <dds-card-cta-footer
              cta-type="video"
              slot="footer"
              href="1_9h94wo6b">
            </dds-card-cta-footer>
          </dds-card-group-item>
        `;
  }
  return html`
    <dds-card-group-item
      cta-type="local"
      href="https://example.com"
      color-scheme=${gridMode === 'border' ? 'light' : null}>
      <dds-card-eyebrow>Label</dds-card-eyebrow>
      <dds-card-heading
        >The United Nations Environment Program works with IBM to reduce marine
        litter</dds-card-heading
      >
      ${tagGroup ? tagGroupContent : ''}
      <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
    </dds-card-group-item>
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
          <dds-card-group-item
            cta-type="local"
            href="https://example.com"
            color-scheme="inverse">
            <dds-card-heading>Top level card link</dds-card-heading>
            <dds-card-cta-footer slot="footer" color-scheme="inverse">
            </dds-card-cta-footer>
          </dds-card-group-item>
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
          <dds-card-group-item
            cta-type="local"
            href="https://example.com"
            color-scheme="inverse">
            <dds-card-heading>Top level card link</dds-card-heading>
            <dds-card-cta-footer slot="footer" color-scheme="inverse">
            </dds-card-cta-footer>
          </dds-card-group-item>
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
    <dds-card-group
      cards-per-row="${colCount}"
      class="${classes}"
      grid-mode=${setGridMode[cardType] || gridMode}
      ?pictograms=${cardType === 'Card - pictogram'}>
      ${allCards}
    </dds-card-group>
  `;
};

export const withCardInCard = (args) => {
  const { cards, tagGroup, media, gridMode } = args?.CardGroup ?? {};
  const allCards: object[] = [];
  for (let i = 0; i < cards; i++) {
    allCards.push(cardInCardItems(i, tagGroup, media, gridMode));
  }
  return html`
    <dds-video-cta-container>
      <dds-card-in-card
        href="https://example.com"
        cta-type="local"
        grid-mode="${ifNonNull(gridMode)}">
        <dds-card-in-card-image
          slot="image"
          alt="Image alt text"
          default-src="${imgSm4x3}">
          <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}">
          </dds-image-item>
          <dds-image-item media="(min-width: 672px)" srcset="${imgMd16x9}">
          </dds-image-item>
          <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}">
          </dds-image-item>
        </dds-card-in-card-image>
        <dds-card-eyebrow>Label</dds-card-eyebrow>
        <dds-card-heading
          >Standard Bank Group prepares to embrace Africa’s AI
          opportunity</dds-card-heading
        >
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-card-in-card>
      <dds-card-group grid-mode="${ifNonNull(gridMode)}">
        ${allCards}
      </dds-card-group>
    </dds-video-cta-container>
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
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
            <dds-video-cta-container> ${story()} </dds-video-cta-container>
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
          cardsPerRow: 'dds-ce-demo-devenv--cards-in-row-3',
          gridMode: 'collapsed',
          offset: 0,
          cta: false,
        },
      },
    },
  },
};
