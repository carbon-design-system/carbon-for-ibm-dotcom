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
import C4DQuote from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote';
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import C4DQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import C4DQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import C4DQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import './index.css';

const App = () => (
  <C4DQuote color-scheme="inverse" mark-type="double-curved">
    Bringing together the technology and expertise for a new way to create
    <C4DQuoteSourceHeading>John Doe</C4DQuoteSourceHeading>
    <C4DQuoteSourceCopy>Senior Vice President</C4DQuoteSourceCopy>
    <C4DQuoteSourceBottomCopy>IBM Cloud</C4DQuoteSourceBottomCopy>
    <C4DLinkWithIcon slot="footer" href="https://example.com">
      Link with icon <ArrowRight20 slot="icon"></ArrowRight20>
    </C4DLinkWithIcon>
  </C4DQuote>
);

render(<App />, document.getElementById('root'));
