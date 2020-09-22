/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Card } from '../../Card';
import CardGroup from '../CardGroup';
import { CTA } from '../../CTA';
import { number } from '@storybook/addon-knobs';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|CardGroup',

  parameters: {
    ...readme.parameters,
    propsSet: {
      default: {
        CardGroup: {
          cards: [
            {
              heading: 'Nunc convallis lobortis',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Fusce gravida eu arcu',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Interdum et malesuada',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Nunc convallis loborti',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Nunc convallis lbortis',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
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
  copy:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
  cta: {
    href: 'https://www.example.com',
  },
};

const cardElement = (
  <CTA
    heading="Nunc convallis lobortis"
    copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero."
    cta={{ href: 'https://www.example.com' }}></CTA>
);

const cardWithImages = {
  image: {
    defaultSrc: 'https://dummyimage.com/1056x792/ee5396/161616&text=4:3',
    alt: 'Image alt text',
  },
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

const ctaElement = (
  <Card
    heading="Top level card link"
    cta={{ href: 'https://www.example.com' }}></Card>
);

export const Default = ({ parameters }) => {
  const { cards: data, cta } = parameters?.props?.CardGroup ?? {};

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
          <CardGroup cards={data} cta={cta} />
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
      }),
    },
  },
};

export const WithCTA = ({ parameters }) => {
  const { cards: data, cta } = parameters?.props?.CardGroup ?? {};

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
          <CardGroup cards={data} cta={cta} />
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
      }),
    },
  },
};

export const WithImages = ({ parameters }) => {
  const { cards: data, cta } = parameters?.props?.CardGroup ?? {};

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
          <CardGroup cards={data} cta={cta} />
        </div>
      </div>
    </div>
  );
};

WithImages.story = {
  parameters: {
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(_ => cardWithImages),
      }),
    },
  },
};

export const WithImagesAndCTA = ({ parameters }) => {
  const { cards: data, cta } = parameters?.props?.CardGroup ?? {};

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
          <CardGroup cards={data} cta={cta} />
        </div>
      </div>
    </div>
  );
};

WithImagesAndCTA.story = {
  parameters: {
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(_ => cardWithImages),
        cta: groupCTA,
      }),
    },
  },
};

export const SubComponents = ({ parameters }) => {
  const { cards: data, cta } = parameters?.props?.CardGroup ?? {};

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
          <CardGroup cards={data} cta={cta} />
        </div>
      </div>
    </div>
  );
};

SubComponents.story = {
  parameters: {
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(_ => cardElement),
        cta: ctaElement,
      }),
    },
  },
};
