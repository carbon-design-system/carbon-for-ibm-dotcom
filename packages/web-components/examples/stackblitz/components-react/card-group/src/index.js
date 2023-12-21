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
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import C4DCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import './index.css';

const App = () => (
  <C4DCardGroup>
    <C4DCardGroupItem href="https://example.com">
      <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <C4DCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </C4DCardCTAFooter>
    </C4DCardGroupItem>
    <C4DCardGroupItem href="https://example.com">
      <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <C4DCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </C4DCardCTAFooter>
    </C4DCardGroupItem>
    <C4DCardGroupItem href="https://example.com">
      <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <C4DCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </C4DCardCTAFooter>
    </C4DCardGroupItem>
    <C4DCardGroupItem href="https://example.com">
      <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <C4DCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </C4DCardCTAFooter>
    </C4DCardGroupItem>
    <C4DCardGroupItem href="https://example.com">
      <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <C4DCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </C4DCardCTAFooter>
    </C4DCardGroupItem>
    <C4DCardGroupItem href="https://example.com" colorScheme="inverse">
      <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <C4DCardCTAFooter slot="footer" colorScheme="inverse">
        <ArrowRight20 slot="icon" />
      </C4DCardCTAFooter>
    </C4DCardGroupItem>
  </C4DCardGroup>
);

render(<App />, document.getElementById('root'));
