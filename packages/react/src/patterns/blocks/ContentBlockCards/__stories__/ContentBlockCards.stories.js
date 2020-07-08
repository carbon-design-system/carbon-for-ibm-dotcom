/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, select, text } from '@storybook/addon-knobs';
import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import ContentBlockCards from '../ContentBlockCards';
import React from 'react';
import readme from '../README.stories.mdx';

const ctaTypes = {
  local: 'local',
  jump: 'jump',
  external: 'external',
};

export default {
  title: 'Patterns (Blocks)|ContentBlockCards',

  parameters: {
    ...readme.parameters,
    knobs: {
      ContentBlockCards: ({ groupId }) => {
        const cardTypes = Object.keys(cards);
        const type = select('Card (type)', cardTypes, cardTypes[0], groupId);
        return {
          heading: text(
            'Heading (required):',
            'Aliquam condimentum interdum',
            groupId
          ),
          cards: object(`Data (${type})`, cards[type], groupId),
          cta: {
            cta: {
              href: 'https://www.ibm.com',
            },
            style: 'card',
            type: select('CTA type', ctaTypes, ctaTypes.local, groupId),
            copy: 'Lorem ipsum dolor sit ametttt',
          },
        };
      },
    },
    propsSet: {
      default: {
        ContentBlockCards: {
          cards: cards[Object.keys(cards)[0]],
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, cta, cards: data } =
    parameters?.props?.ContentBlockCards ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockCards heading={heading} cta={cta} cards={data} />
        </div>
      </div>
    </div>
  );
};
