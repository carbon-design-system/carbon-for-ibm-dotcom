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
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import './index.css';

const App = () => (
  <DDSCardGroup>
    <DDSCardGroupItem href="https://example.com">
      <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <DDSCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
    <DDSCardGroupItem href="https://example.com">
      <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <DDSCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
    <DDSCardGroupItem href="https://example.com">
      <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <DDSCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
    <DDSCardGroupItem href="https://example.com">
      <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <DDSCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
    <DDSCardGroupItem href="https://example.com">
      <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <DDSCardCTAFooter slot="footer">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
    <DDSCardGroupItem href="https://example.com" colorScheme="inverse">
      <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <DDSCardCTAFooter slot="footer" colorScheme="inverse">
        <ArrowRight20 slot="icon" />
      </DDSCardCTAFooter>
    </DDSCardGroupItem>
  </DDSCardGroup>
);

render(<App />, document.getElementById('root'));
