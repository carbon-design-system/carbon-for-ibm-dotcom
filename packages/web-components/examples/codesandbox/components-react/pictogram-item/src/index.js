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
import DDSPictogramItem from '@carbon/ibmdotcom-web-components/es/components-react/pictogram-item/pictogram-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy.js';
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import './index.css';

const App = () => (
  <DDSPictogramItem>
    <svg
      slot="pictogram"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      data-autoid="dds--pictogram-item__pictogram"
      aria-label="Pictogram description"
      width="64"
      height="64"
      viewBox="8 8 32 32"
      role="img"
      class="bx--pictogram-item__pictogram">
      <path
        fill="none"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width=".72"
        d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"></path>
    </svg>
    <DDSContentItemHeading>Example heading</DDSContentItemHeading>
    <DDSContentItemCopy>Example item copy</DDSContentItemCopy>
    <DDSLinkWithIcon href="www.ibm.com" slot="footer">
      Link with icon <ArrowRight20 slot="icon"></ArrowRight20>
    </DDSLinkWithIcon>
  </DDSPictogramItem>
);

render(<App />, document.getElementById('root'));
