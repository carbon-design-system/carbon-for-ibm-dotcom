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
import C4DTabsExtendedMedia from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended-media/tabs-extended-media';
import C4DTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';
/* eslint-disable max-len */
import C4DContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
/* eslint-disable max-len */
import C4DContentItemRowMedia from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-media';
/* eslint-disable max-len */
import C4DContentItemRowMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-media-copy';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';

import './index.css';

const App = () => (
  <C4DTabsExtendedMedia>
    <C4DContentSectionHeading>Section heading</C4DContentSectionHeading>
    <C4DTab label="First tab">
      <C4DContentItemRowMedia align="left">
        <C4DImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></C4DImage>
        <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
        <C4DContentItemRowMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </C4DContentItemRowMediaCopy>
        <C4DLinkList slot="footer" type="vertical">
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </C4DLinkListItemCTA>
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </C4DLinkListItemCTA>
        </C4DLinkList>
      </C4DContentItemRowMedia>
    </C4DTab>
    <C4DTab label="Second tab">
      <C4DContentItemRowMedia align="left">
        <C4DImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></C4DImage>
        <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
        <C4DContentItemRowMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </C4DContentItemRowMediaCopy>
        <C4DLinkList slot="footer" type="vertical">
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </C4DLinkListItemCTA>
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </C4DLinkListItemCTA>
        </C4DLinkList>
      </C4DContentItemRowMedia>
    </C4DTab>
    <C4DTab label="Third tab">
      <C4DContentItemRowMedia align="left">
        <C4DImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></C4DImage>
        <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
        <C4DContentItemRowMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </C4DContentItemRowMediaCopy>
        <C4DLinkList slot="footer" type="vertical">
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </C4DLinkListItemCTA>
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </C4DLinkListItemCTA>
        </C4DLinkList>
      </C4DContentItemRowMedia>
    </C4DTab>
    <C4DTab label="Fourth tab">
      <C4DContentItemRowMedia align="left">
        <C4DImage
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"></C4DImage>
        <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
        <C4DContentItemRowMediaCopy>
          Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
          hendrerit. Phasellus at elit sollicitudin.
        </C4DContentItemRowMediaCopy>
        <C4DLinkList slot="footer" type="vertical">
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="local">
            Learn more
          </C4DLinkListItemCTA>
          <C4DLinkListItemCTA icon-placement="right" href="https://www.ibm.com" cta-type="external">
            Microservices and containers
          </C4DLinkListItemCTA>
        </C4DLinkList>
      </C4DContentItemRowMedia>
    </C4DTab>
  </C4DTabsExtendedMedia>
);

render(<App />, document.getElementById('root'));
