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
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSContentBlockCards from '@carbon/ibmdotcom-web-components/es/components-react/content-block-cards/content-block-cards';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';

import './index.css';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
        <DDSContentBlockCards>
          <DDSContentBlockHeading>Lorem ipsum dolor sit amet</DDSContentBlockHeading>
          <DDSCardGroup>
            <DDSCardGroupItem href="https://example.com">
              <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <DDSCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </DDSCardCTAFooter>
            </DDSCardGroupItem>
            <DDSCardGroupItem href="https://example.com">
              <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <DDSCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </DDSCardCTAFooter>
            </DDSCardGroupItem>
            <DDSCardGroupItem href="https://example.com">
              <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <DDSCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </DDSCardCTAFooter>
            </DDSCardGroupItem>
            <DDSCardGroupItem href="https://example.com">
              <DDSCardHeading>Nunc convallis lobortis</DDSCardHeading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <DDSCardCTAFooter>
                <ArrowRight20 slot="icon" />
              </DDSCardCTAFooter>
            </DDSCardGroupItem>
          </DDSCardGroup>
        </DDSContentBlockCards>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
