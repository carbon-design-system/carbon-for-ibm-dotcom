/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import ContentBlockCards from '../ContentBlockCards';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

/**
 * @param {object} options The options.
 * @param {string} options.groupId The knob group ID.
 * @returns {object} The knobs data.
 */
const getBaseKnobs = ({ groupId }) => {
  return {
    heading: text(
      'Heading (heading):',
      'Aliquam condimentum interdum',
      groupId
    ),
  };
};

export default {
  title: 'Patterns (Blocks)|ContentBlockCards',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { heading, cards: data } = parameters?.props?.ContentBlockCards ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockCards heading={heading} cards={data} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      ContentBlockCards: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          cards: cards['Simple'],
        };
      },
    },
    propsSet: {
      default: {
        ContentBlockCards: {
          cards: cards['Simple'],
        },
      },
    },
  },
};

export const WithImages = ({ parameters }) => {
  const { heading, cards: data } = parameters?.props?.ContentBlockCards ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockCards heading={heading} cards={data} />
        </div>
      </div>
    </div>
  );
};

WithImages.story = {
  parameters: {
    knobs: {
      ContentBlockCards: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          cards: cards['Images'],
        };
      },
    },
    propsSet: {
      default: {
        ContentBlockCards: {
          cards: cards['Images'],
        },
      },
    },
  },
};
