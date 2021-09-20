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
import DDSTabsExtendedMedia from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended-media/tabs-extended-media';
import DDSTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';
/* eslint-disable max-len */
import DDSContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
/* eslint-disable max-len */
import DDSContentItemHorizontalMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media';
/* eslint-disable max-len */
import DDSContentItemHorizontalMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-media-copy';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';

import './index.css';

const App = () => (
  <DDSTabsExtendedMedia>
    <DDSContentSectionHeading>Section heading</DDSContentSectionHeading>
    <DDSTab label="First tab">
      <DDSContentItemHorizontalMedia align="left">
        <DDSImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></DDSImage>
        <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
        <DDSContentItemHorizontalMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </DDSContentItemHorizontalMediaCopy>
        <DDSLinkList slot="footer" type="vertical">
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </DDSLinkListItemCTA>
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </DDSLinkListItemCTA>
        </DDSLinkList>
      </DDSContentItemHorizontalMedia>
    </DDSTab>
    <DDSTab label="Second tab">
      <DDSContentItemHorizontalMedia align="left">
        <DDSImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></DDSImage>
        <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
        <DDSContentItemHorizontalMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </DDSContentItemHorizontalMediaCopy>
        <DDSLinkList slot="footer" type="vertical">
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </DDSLinkListItemCTA>
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </DDSLinkListItemCTA>
        </DDSLinkList>
      </DDSContentItemHorizontalMedia>
    </DDSTab>
    <DDSTab label="Third tab">
      <DDSContentItemHorizontalMedia align="left">
        <DDSImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></DDSImage>
        <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
        <DDSContentItemHorizontalMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </DDSContentItemHorizontalMediaCopy>
        <DDSLinkList slot="footer" type="vertical">
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </DDSLinkListItemCTA>
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </DDSLinkListItemCTA>
        </DDSLinkList>
      </DDSContentItemHorizontalMedia>
    </DDSTab>
    <DDSTab label="Fourth tab">
      <DDSContentItemHorizontalMedia align="left">
        <DDSImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></DDSImage>
        <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
        <DDSContentItemHorizontalMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </DDSContentItemHorizontalMediaCopy>
        <DDSLinkList slot="footer" type="vertical">
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </DDSLinkListItemCTA>
          <DDSLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </DDSLinkListItemCTA>
        </DDSLinkList>
      </DDSContentItemHorizontalMedia>
    </DDSTab>
  </DDSTabsExtendedMedia>
);

render(<App />, document.getElementById('root'));
