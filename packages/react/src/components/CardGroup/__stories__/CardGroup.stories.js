/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object, select } from '@storybook/addon-knobs';
import CardGroup from '../CardGroup';
import cards from './data/cards.json';
import React from 'react';
import readme from '../README.stories.mdx';

const cardTypes = Object.keys(cards);

export default {
  title: 'Components|CardGroup',

  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => {
        const type = select('Card (type)', cardTypes, cardTypes[0], groupId);
        const data = object(`Data (${type})`, cards[type], groupId);
        cards[type] = data; // Preservices the knob edit for the card type
        return {
          cards: data,
          cta:
            (boolean('cta', true, groupId) && {
              heading: 'Top level card link',
              cta: {
                href: 'https://www.example.com',
              },
            }) ||
            undefined,
        };
      },
    },

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
