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
import DDSCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link.js';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <DDSCardLink href="https://example.com">
    <DDSCardLinkHeading>Heading text</DDSCardLinkHeading>
    <p>Optional copy text</p>
    <DDSCardFooter>
      <ArrowRight20 slot="icon" />
    </DDSCardFooter>
  </DDSCardLink>
);

render(<App />, document.getElementById('root'));
