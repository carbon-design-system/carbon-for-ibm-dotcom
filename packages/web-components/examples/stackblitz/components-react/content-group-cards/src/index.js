/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
import C4DContentGroupCardsItem from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DContentGroupCards from '@carbon/ibmdotcom-web-components/es/components-react/content-group-cards/content-group-cards';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import './index.css';

const card1 = (
  <C4DContentGroupCardsItem href="https://www.example.com">
    <C4DCardHeading>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</C4DCardHeading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <C4DCardFooter icon-placement="left">
      <ArrowRight20 slot="icon" />
    </C4DCardFooter>
  </C4DContentGroupCardsItem>
);
const card2 = (
  <C4DContentGroupCardsItem href="https://www.example.com">
    <C4DCardHeading>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</C4DCardHeading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <C4DCardFooter icon-placement="left">
      <ArrowRight20 slot="icon" />
    </C4DCardFooter>
  </C4DContentGroupCardsItem>
);
const App = () => (
  <C4DContentGroupCards>
    <C4DContentGroupHeading>Lorem ipsum dolor sit amet.</C4DContentGroupHeading>
    <C4DContentGroupCopy>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</C4DContentGroupCopy>
    {card1}
    {card2}
    {card1}
    {card2}
  </C4DContentGroupCards>
);

render(<App />, document.getElementById('root'));
