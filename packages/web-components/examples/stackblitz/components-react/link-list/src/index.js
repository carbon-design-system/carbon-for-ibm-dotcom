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
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import './index.css';

const App = () => (
  <C4DVideoCTAContainer>
    <C4DLinkList type="default">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItem href="https://example.com">
        <p>Learn more about Kubernetes <ArrowRight20 slot="icon" /></p>
      </C4DLinkListItem>
      <C4DLinkListItem href="https://example.com">
        <p>Containerization A Complete Guide <ArrowRight20 slot="icon" /></p>
      </C4DLinkListItem>
    </C4DLinkList>
  </C4DVideoCTAContainer>
);

render(<App />, document.getElementById('root'));
