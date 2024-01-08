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
import C4DLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block.js';
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading.js';
import C4DLeadspaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content.js';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy.js';
import C4DLeadspaceBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-media.js';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list.js';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading.js';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item.js';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Download20 from '@carbon/icons-react/es/download/20.js';

import './index.css';

const App = () => (
  <C4DLeadspaceBlock>
    <C4DLeadspaceHeading type-style="fluid-heading-05">Lead Space Block Title</C4DLeadspaceHeading>
    <C4DLeadspaceBlockContent>
      <C4DContentBlockCopy>Content Block Copy</C4DContentBlockCopy>
      <C4DLeadspaceBlockMedia slot="media">
        <C4DImage
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
          <C4DImageItem
            media="(min-width: 672px)"
            srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          />
          <C4DImageItem
            media="(min-width: 400px)"
            srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          />
          <C4DImageItem
            media="(min-width: 320px)"
            srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          />
        </C4DImage>
      </C4DLeadspaceBlockMedia>
      <C4DLinkList type="end">
        <C4DLinkListHeading>Featured products</C4DLinkListHeading>
        <C4DLinkListItem href="https://example.com">
          IBM Cloud Continuous Delivery <ArrowRight20 slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem href="https://example.com">
          UrbanCode <ArrowRight20 slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem href="https://example.com">
          View all products <Download20 slot="icon" />
        </C4DLinkListItem>
      </C4DLinkList>
      <C4DButton href="https://example.com" cta-type="local">
        Contact sales
      </C4DButton>
    </C4DLeadspaceBlockContent>
  </C4DLeadspaceBlock>
);

render(<App />, document.getElementById('root'));
