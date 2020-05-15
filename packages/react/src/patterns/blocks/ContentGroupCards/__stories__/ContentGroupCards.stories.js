/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentGroupCards from '../ContentGroupCards';
import ContentGroupCardsKnobs from './data/ContentGroupCards.knobs';
import React from 'react';
import readme from '../README.md';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Patterns (Blocks)|ContentGroupCards',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-10 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroupCards
            heading={ContentGroupCardsKnobs.heading}
            items={ContentGroupCardsKnobs.items}
          />
        </div>
      </div>
    </div>
  );
};
