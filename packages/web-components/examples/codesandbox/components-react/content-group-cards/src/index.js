/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
import DDSContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import './index.css';

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
const App = () => (
  <DDSContentGroupCards>
    <DDSContentGroupHeading>Lorem ipsum dolor sit amet.</DDSContentGroupHeading>
    <DDSContentGroupCopy>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</DDSContentGroupCopy>
    {card1}
    {card2}
    {card1}
    {card2}
  </DDSContentGroupCards>
);

render(<App />, document.getElementById('root'));
