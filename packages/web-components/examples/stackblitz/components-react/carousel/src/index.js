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
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
import './index.css';

const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

// eslint-disable-next-line react/prop-types
const Card = ({ copy = copyDefault, heading = headingDefault } = {}) => (
  <C4DCard href="https://www.ibm.com/standards/carbon" cta-type="local">
    <C4DCardHeading>{heading}</C4DCardHeading>
    <p>{copy}</p>
    <C4DCardFooter>
    </C4DCardFooter>
  </C4DCard>
);

const App = () => (
  <C4DCarousel>
    <Card />
    <Card copy={copyOdd} />
    <Card />
    <Card copy={copyOdd} />
    <Card />
  </C4DCarousel>
);

render(<App />, document.getElementById('root'));
