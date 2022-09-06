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
import DDSLinkListSection from '@carbon/ibmdotcom-web-components/es/components-react/link-list-section/link-list-section';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';

import './index.css';

const App = () => (
  <DDSLinkListSection>
  <DDSLinkListHeading>Link list section heading</DDSLinkListHeading>
  <DDSLinkList>
    <DDSLinkListItem href="https://example.com">
      Learn more about Kubernetes and automating deployment <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
    <DDSLinkListItem href="https://example.com">
      Containerization A Complete Guide <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
    <DDSLinkListItem href="https://example.com">
      Microservices and containers <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
    <DDSLinkListItem href="https://example.com">
      Learn more about Kubernetes <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
    <DDSLinkListItem href="https://example.com">
      Containerization A Complete Guide <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
    <DDSLinkListItem href="https://example.com">
      Microservices and containers <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
  </DDSLinkList>
</DDSLinkListSection>
);

render(<App />, document.getElementById('root'));
