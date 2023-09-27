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
import C4DCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link.js';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <C4DCardLink href="https://example.com">
    <C4DCardLinkHeading>Heading text</C4DCardLinkHeading>
    <p>Optional copy text</p>
    <C4DCardFooter>
      <ArrowRight20 slot="icon" />
    </C4DCardFooter>
  </C4DCardLink>
);

render(<App />, document.getElementById('root'));
