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
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card.js';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <C4DCard href="https://example.com">
    <C4DCardEyebrow>Eyebrow text</C4DCardEyebrow>
    <C4DCardHeading>Heading text</C4DCardHeading>
    <p>Optional copy text</p>
    <C4DCardFooter>
      <ArrowRight20 slot="icon" />
    </C4DCardFooter>
  </C4DCard>
);

render(<App />, document.getElementById('root'));
