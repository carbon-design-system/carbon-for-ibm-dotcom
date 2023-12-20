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
import C4DCTASection from '@carbon/ibmdotcom-web-components/es/components-react/cta-section/cta-section';
import C4DCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';

import './index.css';

const App = () => (
  <C4DCTASection>
    <C4DCTABlock>
      <C4DContentBlockHeading>Curabitur malesuada varius mi eu posuere</C4DContentBlockHeading>
      <C4DContentBlockCopy>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
      </C4DContentBlockCopy>
      <C4DTextCTA slot="action" cta-type="local" icon-placement="right" href="https://www.example.com">
        Browse tutorials
      </C4DTextCTA>
    </C4DCTABlock>
  </C4DCTASection>
);

render(<App />, document.getElementById('root'));
