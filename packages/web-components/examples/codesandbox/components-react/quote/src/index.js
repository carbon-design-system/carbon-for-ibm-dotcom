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
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSQuote from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import DDSQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import DDSQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import DDSQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import './index.css';

const App = () => (
  <DDSQuote color-scheme="inverse" mark-type="double-curved">
    Bringing together the technology and expertise for a new way to create
    <DDSQuoteSourceHeading>John Doe</DDSQuoteSourceHeading>
    <DDSQuoteSourceCopy>Senior Vice President</DDSQuoteSourceCopy>
    <DDSQuoteSourceBottomCopy>IBM Cloud</DDSQuoteSourceBottomCopy>
    <DDSLinkWithIcon slot="footer" href="https://example.com">
      Link with icon <ArrowRight20 slot="icon"></ArrowRight20>
    </DDSLinkWithIcon>
  </DDSQuote>
);

render(<App />, document.getElementById('root'));
