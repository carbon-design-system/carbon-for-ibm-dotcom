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
import DDSCTASection from '@carbon/ibmdotcom-web-components/es/components-react/cta-section/cta-section';
import DDSCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';

import './index.css';

const App = () => (
  <DDSCTASection>
    <DDSCTABlock>
      <DDSContentBlockHeading>Curabitur malesuada varius mi eu posuere</DDSContentBlockHeading>
      <DDSContentBlockCopy>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
      </DDSContentBlockCopy>
      <DDSTextCTA slot="action" cta-type="local" icon-placement="right" href="https://www.example.com">
        Browse tutorials
      </DDSTextCTA>
    </DDSCTABlock>
  </DDSCTASection>
);

render(<App />, document.getElementById('root'));
