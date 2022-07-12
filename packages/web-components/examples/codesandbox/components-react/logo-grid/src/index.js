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
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSLogoGrid from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import DDSLogoGridLink from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-link';
import DDSLogoGridItem from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-item';
import './index.css';

const App = () => (
  <DDSLogoGrid>
    <DDSContentBlockHeading>Our customers</DDSContentBlockHeading>
    <DDSLogoGridItem
      default-src="https://fpoimg.com/288x216?text=Example%20Logo&bg_color=ee5396&text_color=161616"
      alt={''}></DDSLogoGridItem>
    <DDSLogoGridLink href={'https://example.com'}>
      <DDSCardLinkHeading>Lorem ipsum</DDSCardLinkHeading>
      <DDSCardFooter>
        <ArrowRight20 slot="icon" />
      </DDSCardFooter>
    </DDSLogoGridLink>
  </DDSLogoGrid>
);

render(<App />, document.getElementById('root'));
