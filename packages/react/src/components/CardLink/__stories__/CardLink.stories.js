/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import CardLink from '../CardLink';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|CardLink',

  parameters: {
    ...readme.parameters,
    knobs: {
      CardLink: ({ groupId }) => ({
        card: {
          copy: text(
            'Card Heading:',
            'Explore AI use cases in all industries',
            groupId
          ),
          cta: {
            href: text('Card href:', 'https://www.example.com', groupId),
            icon: {
              src: ArrowRight20,
            },
          },
        },
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { card } = parameters?.props?.CardLink ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <CardLink card={card} />
        </div>
      </div>
    </div>
  );
};
