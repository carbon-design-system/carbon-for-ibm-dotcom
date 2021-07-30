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
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import DDSLeadspaceImage from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-image';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import './index.css';

const App = () => (
  <DDSLeadspace alt="Image alt text">
    <DDSLeadspaceHeading>Heading can go on two lines max</DDSLeadspaceHeading>
    Use this area for a short line of copy to support the title
    <DDSButtonGroup slot="action">
      <DDSButtonGroupItem href="https://www.example.com">
        <ArrowRight20 slot="icon" />
        Button 1
      </DDSButtonGroupItem>
      <DDSButtonGroupItem href="https://www.example.com">
        <ArrowRight20 slot="icon" />
        Button 2
      </DDSButtonGroupItem>
    </DDSButtonGroup>
    <DDSLeadspaceImage
      slot="image"
      default-src="https://picsum.photos/id/1076/1056/480"
      className="bx--image"
      alt="Image alt text">
      <DDSImageItem media="(min-width: 672px)" srcset="https://picsum.photos/id/1076/672/400"></DDSImageItem>
      <DDSImageItem media="(min-width: 0)" srcset="https://picsum.photos/id/1076/320/370"></DDSImageItem>
    </DDSLeadspaceImage>
  </DDSLeadspace>
);

render(<App />, document.getElementById('root'));
