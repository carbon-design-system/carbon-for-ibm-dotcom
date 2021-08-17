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
// eslint-disable-next-line max-len
import DDSContentItemHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal';
// eslint-disable-next-line max-len
import DDSContentItemHorizontalCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-copy';
// eslint-disable-next-line max-len
import DDSContentItemHorizontalEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-eyebrow';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';

import './index.css';

const App = () => (
  <DDSContentItemHorizontal>
    <DDSContentItemHorizontalEyebrow>Lorem ipsum</DDSContentItemHorizontalEyebrow>
    <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
    <DDSContentItemHorizontalCopy>
      Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin.
    </DDSContentItemHorizontalCopy>
    <DDSLinkList slot="footer" type="vertical">
      <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Learn more
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
        Microservices and containers
      </DDSLinkListItemCTA>
    </DDSLinkList>
  </DDSContentItemHorizontal>
);

render(<App />, document.getElementById('root'));
