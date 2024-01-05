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
import C4DCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DContentBlockCards from '@carbon/ibmdotcom-web-components/es/components-react/content-block-cards/content-block-cards';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';

import './index.css';

const App = () => (
  <div className="cds--grid">
    <div className="cds--row">
      <div className="cds--col-sm-4 cds--col-lg-12 cds--offset-lg-4 cds--no-gutter">
        <C4DContentBlockCards>
          <C4DContentBlockHeading>Lorem ipsum dolor sit amet</C4DContentBlockHeading>
          <C4DCardGroup>
            <C4DCardGroupItem href="https://example.com">
              <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <C4DCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </C4DCardCTAFooter>
            </C4DCardGroupItem>
            <C4DCardGroupItem href="https://example.com">
              <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <C4DCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </C4DCardCTAFooter>
            </C4DCardGroupItem>
            <C4DCardGroupItem href="https://example.com">
              <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <C4DCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </C4DCardCTAFooter>
            </C4DCardGroupItem>
            <C4DCardGroupItem href="https://example.com">
              <C4DCardHeading>Nunc convallis lobortis</C4DCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <C4DCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </C4DCardCTAFooter>
            </C4DCardGroupItem>
          </C4DCardGroup>
        </C4DContentBlockCards>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
