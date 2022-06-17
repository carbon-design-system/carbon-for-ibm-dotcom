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
import DDSLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block.js';
import DDSLeadspaceBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-heading.js';
import DDSLeadspaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content.js';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading.js';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy.js';
import DDSLeadspaceBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-media.js';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image.js';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item.js';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list.js';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading.js';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item.js';
import DDSLeadspaceBlockCTA from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-cta.js';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item.js';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Download20 from '@carbon/icons-react/es/download/20.js';

import './index.css';

const App = () => (
  <DDSLeadspaceBlock>
    <DDSLeadspaceBlockHeading>Lead Space Block Title</DDSLeadspaceBlockHeading>
    <DDSLeadspaceBlockContent>
      <DDSContentBlockHeading>Content Block Heading</DDSContentBlockHeading>
      <DDSContentBlockCopy>Content Block Copy</DDSContentBlockCopy>
      <DDSLeadspaceBlockMedia slot="media">
        <DDSImage
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
          <DDSImageItem
            media="(min-width: 672px)"
            srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          />
          <DDSImageItem
            media="(min-width: 400px)"
            srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          />
          <DDSImageItem
            media="(min-width: 320px)"
            srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          />
        </DDSImage>
      </DDSLeadspaceBlockMedia>
      <DDSLinkList type="end">
        <DDSLinkListHeading>Featured products</DDSLinkListHeading>
        <DDSLinkListItem href="https://example.com">
          IBM Cloud Continuous Delivery <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          UrbanCode <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          View all products <Download20 slot="icon" />
        </DDSLinkListItem>
      </DDSLinkList>
      <DDSLeadspaceBlockCTA>
        <DDSButtonGroupItem href="www.ibm.com">
          Contact sales <ArrowRight20 slot="icon" />
        </DDSButtonGroupItem>
      </DDSLeadspaceBlockCTA>
    </DDSLeadspaceBlockContent>
  </DDSLeadspaceBlock>
);

render(<App />, document.getElementById('root'));
