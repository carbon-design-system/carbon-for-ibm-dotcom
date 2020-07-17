/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentGroupCards from '../ContentGroupCards';
import ContentGroupCardsKnobs from './data/ContentGroupCards.knobs';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|ContentGroupCards',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-10 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroupCards
            heading={ContentGroupCardsKnobs.heading}
            copy={ContentGroupCardsKnobs.copy}
            items={ContentGroupCardsKnobs.items}
          />
        </div>
      </div>
    </div>
  );
};
