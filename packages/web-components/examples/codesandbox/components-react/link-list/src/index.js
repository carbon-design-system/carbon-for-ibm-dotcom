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
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItemCard from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item-card';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import './index.css';

const App = () => (
  <DDSVideoCTAContainer>
    <DDSLinkList type="default">
      <DDSLinkListHeading>Tutorial</DDSLinkListHeading>
      <DDSLinkListItemCard href="https://example.com">
        <p>Learn more about Kubernetes</p>
        <DDSCardFooter>
          <ArrowRight20 slot="icon" />
        </DDSCardFooter>
      </DDSLinkListItemCard>
      <DDSLinkListItemCard href="https://example.com">
        <p>Containerization A Complete Guide</p>
        <DDSCardFooter>
          <ArrowRight20 slot="icon" />
        </DDSCardFooter>
      </DDSLinkListItemCard>
    </DDSLinkList>
  </DDSVideoCTAContainer>
);

render(<App />, document.getElementById('root'));
