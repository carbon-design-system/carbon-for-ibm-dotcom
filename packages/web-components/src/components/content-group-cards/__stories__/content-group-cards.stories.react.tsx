/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
// eslint-disable-next-line max-len
import C4DContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import { text } from '@storybook/addon-knobs';
import readme from './README.stories.react.mdx';

const iconProps = {
  size: 20,
  slot: 'icon',
};

const card1 = (
  <C4DContentGroupCardsItem href="https://www.example.com">
    <C4DCardHeading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </C4DCardHeading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <C4DCardFooter icon-placement="left">
      <ArrowRight {...iconProps} />
    </C4DCardFooter>
  </C4DContentGroupCardsItem>
);
const card2 = (
  <C4DContentGroupCardsItem href="https://www.example.com">
    <C4DCardHeading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </C4DCardHeading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <C4DCardFooter icon-placement="left">
      <ArrowRight {...iconProps} />
    </C4DCardFooter>
  </C4DContentGroupCardsItem>
);

export const Default = (args) => {
  const { heading, copy } = args?.ContentGroupCards ?? {};
  return (
    <C4DContentGroupCards>
      <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
      <C4DContentGroupCopy>{copy}</C4DContentGroupCopy>
      {card1}
      {card2}
      {card1}
      {card2}
    </C4DContentGroupCards>
  );
};

export default {
  title: 'Components/Content group cards',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-8 cds--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroupCards: () => ({
        heading: text('Heading (heading):', 'Lorem ipsum dolor sit amet.'),
        copy: text(
          'Copy (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        ),
      }),
    },
    propsSet: {
      default: {
        ContentGroupCards: {
          heading: 'Lorem ipsum dolor sit amet',
          copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
      },
    },
  },
};
