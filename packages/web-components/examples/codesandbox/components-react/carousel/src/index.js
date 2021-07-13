/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
import './index.css';

const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

// eslint-disable-next-line react/prop-types
const Card = ({ copy = copyDefault, heading = headingDefault } = {}) => (
  <DDSCard href="https://www.ibm.com/standards/carbon">
    <DDSCardHeading>{heading}</DDSCardHeading>
    {copy}
    <DDSCardFooter>
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSCard>
);

const App = () => (
  <DDSCarousel>
    <Card />
    <Card copy={copyOdd} />
    <Card />
    <Card copy={copyOdd} />
    <Card />
  </DDSCarousel>
);

render(<App />, document.getElementById('root'));
