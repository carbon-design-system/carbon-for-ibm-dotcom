/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import cards from '../../CardGroup/__stories__/data/cards.js';
import ContentBlockCards from '../ContentBlockCards';
import React from 'react';
import readme from '../README.stories.mdx';

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

const ctaTypes = {
  local: 'local',
  jump: 'jump',
  external: 'external',
};

export default {
  title: 'Components|Content block cards',
  parameters: {
    ...readme.parameters,
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

Default.story = {
  parameters: {
    percy: {
      skip: true,
    },
    knobs: {
      ContentBlockCards: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          cards: cards['Simple'],
          cta: {
            cta: {
              href: 'https://www.ibm.com',
            },
            style: 'card',
            type: select('CTA type', ctaTypes, ctaTypes.local, groupId),
            heading: 'Lorem ipsum dolor sit ametttt',
          },
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

WithImages.story = {
  name: 'With images',
  parameters: {
    knobs: {
      ContentBlockCards: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          cards: cards['Images'],
          cta: {
            cta: {
              href: 'https://www.ibm.com',
            },
            style: 'card',
            type: select('CTA type', ctaTypes, ctaTypes.local, groupId),
            heading: 'Lorem ipsum dolor sit ametttt',
          },
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

export const WithVideos = ({ parameters }) => {
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

WithVideos.story = {
  name: 'With videos',
  parameters: {
    percy: {
      skip: true,
    },
    knobs: {
      ContentBlockCards: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          cards: cards['Videos'],
          cta: {
            cta: {
              href: 'https://www.ibm.com',
            },
            style: 'card',
            type: select('CTA type', ctaTypes, ctaTypes.local, groupId),
            heading: 'Lorem ipsum dolor sit ametttt',
          },
        };
      },
    },
    propsSet: {
      default: {
        ContentBlockCards: {
          cards: cards['Videos'],
        },
      },
    },
  },
};
