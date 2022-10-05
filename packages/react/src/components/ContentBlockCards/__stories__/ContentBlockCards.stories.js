/**
 * Copyright IBM Corp. 2016, 2022
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
 * @returns {object} The knobs data.
 */
const getBaseKnobs = () => {
  return {
    heading: text('Heading (heading):', 'Aliquam condimentum interdum'),
  };
};

const ctaTypes = {
  local: 'local',
  jump: 'jump',
  external: 'external',
};

const props = () => ({
  ...getBaseKnobs(),
  cards: cards['Simple'],
  cta: {
    cta: {
      href: 'https://www.ibm.com',
    },
    style: 'card',
    type: select('CTA type', ctaTypes, ctaTypes.local),
    heading: 'Lorem ipsum dolor sit ametttt',
  },
});

export default {
  title: 'Components/Content block cards',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockCards {...props()} />
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
    propsSet: {
      default: {
        ContentBlockCards: {
          cards: cards['Simple'],
        },
      },
    },
  },
};

const propsWithImages = () => ({
  ...getBaseKnobs(),
  cards: cards['Images'],
  cta: {
    cta: {
      href: 'https://www.ibm.com',
    },
    style: 'card',
    type: select('CTA type', ctaTypes, ctaTypes.local),
    heading: 'Lorem ipsum dolor sit ametttt',
  },
});

export const WithImages = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockCards {...propsWithImages()} />
        </div>
      </div>
    </div>
  );
};

WithImages.story = {
  name: 'With images',
  parameters: {
    percy: {
      name: 'Components|Content block cards: With images',
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

const propsWithVideos = () => ({
  ...getBaseKnobs(),
  cards: cards['Videos'],
  cta: {
    cta: {
      href: 'https://www.ibm.com',
    },
    style: 'card',
    type: select('CTA type', ctaTypes, ctaTypes.local),
    heading: 'Lorem ipsum dolor sit ametttt',
  },
});

export const WithVideos = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockCards {...propsWithVideos()} />
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
    propsSet: {
      default: {
        ContentBlockCards: {
          cards: cards['Videos'],
        },
      },
    },
  },
};
