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
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DLogoGrid from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import C4DLogoGridLink from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-link';
import C4DLogoGridItem from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-item';
import './index.css';

const App = () => (
  <C4DLogoGrid>
    <C4DContentBlockHeading>Our customers</C4DContentBlockHeading>
    <C4DLogoGridItem
      default-src="https://fpoimg.com/288x216?text=Example%20Logo&bg_color=ee5396&text_color=161616"
      alt={''}></C4DLogoGridItem>
    <C4DLogoGridLink href={'https://example.com'}>
      <C4DCardLinkHeading>Lorem ipsum</C4DCardLinkHeading>
      <C4DCardFooter>
        <ArrowRight20 slot="icon" />
      </C4DCardFooter>
    </C4DLogoGridLink>
  </C4DLogoGrid>
);

render(<App />, document.getElementById('root'));
