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
import DDSContentBlockHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-block-horizontal/content-block-horizontal';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal';
import DDSContentItemHorizontalEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-eyebrow';
import DDSContentItemHorizontalCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-copy';

import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';

import './index.css';

const App = () => (
  <DDSContentBlockHorizontal>
    <DDSContentBlockHeading>Lorem ipsum dolor sit amet</DDSContentBlockHeading>
    <DDSContentItemHorizontal>
      <DDSContentItemHorizontalEyebrow>Lorem ipsum</DDSContentItemHorizontalEyebrow>
      <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
      <DDSContentItemHorizontalCopy>Lorem ipsum dolor sit amet</DDSContentItemHorizontalCopy>
      <DDSLinkList slot="footer" type="vertical">
        <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
          Link text
        </DDSLinkListItemCTA>
        <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
          External link text
        </DDSLinkListItemCTA>
      </DDSLinkList>
    </DDSContentItemHorizontal>
  </DDSContentBlockHorizontal>
);

render(<App />, document.getElementById('root'));
