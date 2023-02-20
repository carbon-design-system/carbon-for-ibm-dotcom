/**
 * Copyright IBM Corp. 2016, 2023
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

const props = {
  default: () => ({
    cards: Array.from({
      length: number('Number of cards', 5, {}),
    }).map((_) => defaultCard),
    border: boolean('Outlined cards:', false),
    cardsPerRow: select(
      'Number of cards per row (cardsPerRow):',
      cardsCol,
      cardsCol['3 cards per row (Default)']
    ),
  }),
  withCTA: () => ({
    cards: Array.from({
      length: number('Number of cards', 5, {}),
    }).map((_) => defaultCard),
    cta: groupCTA,
    cardsPerRow: select(
      'Number of cards per row (cardsPerRow):',
      cardsCol,
      cardsCol['3 cards per row (Default)']
    ),
  }),
  withImages: () => ({
    cards: Array.from({
      length: number('Number of cards', 5, {}),
    }).map((_) => cardWithImages),
    cardsPerRow: select(
      'Number of cards per row (cardsPerRow):',
      cardsCol,
      cardsCol['3 cards per row (Default)']
    ),
  }),
  withImagesAndCTA: () => ({
    cards: Array.from({
      length: number('Number of cards', 5, {}),
    }).map((_) => cardWithImages),
    cta: groupCTA,
    cardsPerRow: select(
      'Number of cards per row (cardsPerRow):',
      cardsCol,
      cardsCol['3 cards per row (Default)']
    ),
  }),
};

export default {
  title: 'Components/Card group',
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
              copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Interdum et malesuada',
              copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Nunc convallis loborti',
              copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Nunc convallis lbortis',
              copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
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
  copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
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

export const Default = () => {
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: props.default().cardsPerRow == 2,
    [`bx--col-lg-12`]: props.default().cardsPerRow == 3,
    [`bx--col-lg-16`]: props.default().cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup {...props.default()} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const WithCTA = () => {
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: props.withCTA().cardsPerRow == 2,
    [`bx--col-lg-12`]: props.withCTA().cardsPerRow == 3,
    [`bx--col-lg-16`]: props.withCTA().cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup {...props.withCTA()} />
        </div>
      </div>
    </div>
  );
};

WithCTA.story = {
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const WithImages = () => {
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: props.withImages().cardsPerRow == 2,
    [`bx--col-lg-12`]: props.withImages().cardsPerRow == 3,
    [`bx--col-lg-16`]: props.withImages().cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup {...props.withImages()} />
        </div>
      </div>
    </div>
  );
};

WithImages.story = {
  name: 'With images',
  parameters: {
    percy: {
      name: 'Components|Card group: With images',
    },
  },
};

export const WithImagesAndCTA = () => {
  const classes = cx({
    [`bx--col-sm-4`]: true,
    [`bx--col-lg-8`]: props.withImagesAndCTA().cardsPerRow == 2,
    [`bx--col-lg-12`]: props.withImagesAndCTA().cardsPerRow == 3,
    [`bx--col-lg-16`]: props.withImagesAndCTA().cardsPerRow == 4,
  });

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className={classes}>
          <CardGroup {...props.withImagesAndCTA()} />
        </div>
      </div>
    </div>
  );
};

WithImagesAndCTA.story = {
  name: 'With images and CTA',
  parameters: {
    percy: {
      name: 'Components|Card group: With images and CTA',
    },
  },
};
