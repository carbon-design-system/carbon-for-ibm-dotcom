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
import C4DLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import './index.css';

const App = () => (
  <C4DLeadspace alt="Image alt text">
    <C4DLeadspaceHeading>Heading can go on two lines max</C4DLeadspaceHeading>
    Use this area for a short line of copy to support the title
    <C4DButtonGroup slot="action">
      <C4DButtonGroupItem href="https://www.example.com">
        <ArrowRight20 slot="icon" />
        Button 1
      </C4DButtonGroupItem>
      <C4DButtonGroupItem href="https://www.example.com">
        <ArrowRight20 slot="icon" />
        Button 2
      </C4DButtonGroupItem>
    </C4DButtonGroup>
    <C4DBackgroundMedia
      slot="image"
      default-src="https://picsum.photos/id/1076/1056/480"
      alt="Image alt text"
      opacity="100"
    >
      <C4DImageItem
        media="(min-width: 672px)"
        srcset="https://picsum.photos/id/1076/672/400"
      ></C4DImageItem>
      <C4DImageItem
        media="(min-width: 0)"
        srcset="https://picsum.photos/id/1076/320/370"
      ></C4DImageItem>
    </C4DBackgroundMedia>
  </C4DLeadspace>
);

render(<App />, document.getElementById('root'));
