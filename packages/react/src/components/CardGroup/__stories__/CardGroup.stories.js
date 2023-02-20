/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, boolean, select } from '@storybook/addon-knobs';
import CardGroup from '../CardGroup';
import cx from 'classnames';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const cardsCol = {
  '3 cards per row (Default)': '3',
  '2 cards per row': '2',
  '4 cards per row': '4',
};

export default {
  title: 'Components|Card group',
  parameters: {
    ...readme.parameters,
    propsSet: {
      default: {
        CardGroup: {
          cards: [
            {
              heading: 'Nunc convallis lobortis',
              copy: 'Lorem ipsum dolor sit amet.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Fusce gravida eu arcu',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Interdum et malesuada',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Nunc convallis loborti',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Nunc convallis lbortis',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
              cta: {
                href: 'https://www.example.com',
              },
            },
          ],
        },
      },
    },
  },
};

const defaultCard = {
  heading: 'Nunc convallis lobortis',
  type: 'local',
  copy:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
  cta: {
    href: 'https://www.example.com',
  },
};

const cardWithImages = {
  image: {
    defaultSrc: imgXlg4x3,
    alt: 'Image alt text',
  },
  type: 'local',
  eyebrow: 'Topic',
  heading: 'Natural language processing.',
  cta: {
    href: 'https://www.example.com',
  },
};

const groupCTA = {
  heading: 'Top level card link',
  cta: {
    href: 'https://www.example.com',
  },
};

export const Default = ({ parameters }) => {
  const { cards: data, cardsPerRow, cta, border } =
    parameters?.props?.CardGroup ?? {};
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: cardsPerRow == 2,
    [`bx--col-lg-12`]: cardsPerRow == 3,
    [`bx--col-lg-16`]: cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup
            cards={data}
            cardsPerRow={cardsPerRow}
            cta={cta}
            border={border}
          />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(_ => defaultCard),
        border: boolean('Outlined cards:', false, groupId),
        cardsPerRow: select(
          'Number of cards per row (cardsPerRow):',
          cardsCol,
          cardsCol['3 cards per row (Default)'],
          groupId
        ),
      }),
    },
    percy: {
      skip: true,
    },
  },
};

export const WithCTA = ({ parameters }) => {
  const { cards: data, cardsPerRow, cta } = parameters?.props?.CardGroup ?? {};
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: cardsPerRow == 2,
    [`bx--col-lg-12`]: cardsPerRow == 3,
    [`bx--col-lg-16`]: cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup cards={data} cardsPerRow={cardsPerRow} cta={cta} />
        </div>
      </div>
    </div>
  );
};

WithCTA.story = {
  parameters: {
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(_ => defaultCard),
        cta: groupCTA,
        cardsPerRow: select(
          'Number of cards per row (cardsPerRow):',
          cardsCol,
          cardsCol['3 cards per row (Default)'],
          groupId
        ),
      }),
    },
    percy: {
      skip: true,
    },
  },
};

export const WithImages = ({ parameters }) => {
  const { cards: data, cardsPerRow, cta } = parameters?.props?.CardGroup ?? {};
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: cardsPerRow == 2,
    [`bx--col-lg-12`]: cardsPerRow == 3,
    [`bx--col-lg-16`]: cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup cards={data} cardsPerRow={cardsPerRow} cta={cta} />
        </div>
      </div>
    </div>
  );
};

WithImages.story = {
  name: 'With images',
  parameters: {
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(_ => cardWithImages),
        cardsPerRow: select(
          'Number of cards per row (cardsPerRow):',
          cardsCol,
          cardsCol['3 cards per row (Default)'],
          groupId
        ),
      }),
    },
  },
};

export const WithImagesAndCTA = ({ parameters }) => {
  const { cards: data, cardsPerRow, cta } = parameters?.props?.CardGroup ?? {};
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: cardsPerRow == 2,
    [`bx--col-lg-12`]: cardsPerRow == 3,
    [`bx--col-lg-16`]: cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup cards={data} cardsPerRow={cardsPerRow} cta={cta} />
        </div>
      </div>
    </div>
  );
};

WithImagesAndCTA.story = {
  name: 'With images and CTA',
  parameters: {
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(_ => cardWithImages),
        cta: groupCTA,
        cardsPerRow: select(
          'Number of cards per row (cardsPerRow):',
          cardsCol,
          cardsCol['3 cards per row (Default)'],
          groupId
        ),
      }),
    },
  },
};
