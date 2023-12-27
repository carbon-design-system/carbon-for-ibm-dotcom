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
import C4DCalloutQuote from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-quote';
import C4DCalloutLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-link-with-icon';
import C4DQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import C4DQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import C4DQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import './index.css';

const App = () => (
  <C4DCalloutQuote mark-type="double-curved">
    Bringing together the technology and expertise for a new way to create
    <C4DQuoteSourceHeading>John Doe</C4DQuoteSourceHeading>
    <C4DQuoteSourceCopy>Senior Vice President</C4DQuoteSourceCopy>
    <C4DQuoteSourceBottomCopy>IBM Cloud</C4DQuoteSourceBottomCopy>
    <C4DCalloutLinkWithIcon slot="footer" href="https://example.com" cta-type="local">
      Link with icon
    </C4DCalloutLinkWithIcon>
  </C4DCalloutQuote>
);

render(<App />, document.getElementById('root'));
