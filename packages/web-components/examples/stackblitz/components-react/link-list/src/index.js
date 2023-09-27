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
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItemCard from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item-card';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import './index.css';

const App = () => (
  <C4DVideoCTAContainer>
    <C4DLinkList type="default">
      <C4DLinkListHeading>Tutorial</C4DLinkListHeading>
      <C4DLinkListItemCard href="https://example.com">
        <p>Learn more about Kubernetes</p>
        <C4DCardFooter>
          <ArrowRight20 slot="icon" />
        </C4DCardFooter>
      </C4DLinkListItemCard>
      <C4DLinkListItemCard href="https://example.com">
        <p>Containerization A Complete Guide</p>
        <C4DCardFooter>
          <ArrowRight20 slot="icon" />
        </C4DCardFooter>
      </C4DLinkListItemCard>
    </C4DLinkList>
  </C4DVideoCTAContainer>
);

render(<App />, document.getElementById('root'));
