/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// eslint-disable-next-line max-len
import DDSContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import { text } from '@storybook/addon-knobs';
import readme from './README.stories.react.mdx';

const card1 = (
  <DDSContentGroupCardsItem href="https://www.example.com">
    <DDSCardHeading>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</DDSCardHeading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <DDSCardFooter icon-placement="left">
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSContentGroupCardsItem>
);
const card2 = (
  <DDSContentGroupCardsItem href="https://www.example.com">
    <DDSCardHeading>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</DDSCardHeading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <DDSCardFooter icon-placement="left">
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSContentGroupCardsItem>
);

export const Default = args => {
  const { heading, copy } = args?.ContentGroupCards ?? {};
  return (
    <DDSContentGroupCards>
      <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
      <DDSContentGroupCopy>{copy}</DDSContentGroupCopy>
      {card1}
      {card2}
      {card1}
      {card2}
    </DDSContentGroupCards>
  );
};

export default {
  title: 'Components/Content group cards',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--no-gutter">{story()}</div>
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
        copy: text('Copy (copy):', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
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
