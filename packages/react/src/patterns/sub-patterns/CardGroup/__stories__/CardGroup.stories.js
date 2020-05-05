/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index.scss';
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import CardGroup from '../CardGroup';
import cards from './data/cards.json';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|CardGroup', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })

  .add('default', () => {
    const cardTypes = Object.keys(cards);

    const type = select('cardType', cardTypes, cardTypes[0]);
    const data = object(`Data (${type})`, cards[type]);

    cards[type] = data;

    const toggleCTA = boolean('cta', true);
    const cta = {
      heading: 'Top level card link',
      cta: {
        href: 'https://www.example.com',
      },
    };

    return (
      <div className="bx--grid bx--content-group-story">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
            <CardGroup cards={data} cta={toggleCTA && cta} />
          </div>
        </div>
      </div>
    );
  });
