/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import DDSStructuredList from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list';
import DDSStructuredListHead from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-head';
import DDSStructuredListHeaderRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-row';
import DDSStructuredListHeaderCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-cell';
import DDSStructuredListBody from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-body';
import DDSStructuredListGroup from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-group';
import DDSStructuredListRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-row';
import DDSStructuredListCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-cell';
import './index.css';

const App = () => (
  <DDSStructuredList>
    <DDSStructuredListHead>
      <DDSStructuredListHeaderRow>
        <DDSStructuredListHeaderCell>Column A</DDSStructuredListHeaderCell>
        <DDSStructuredListHeaderCell>Column B</DDSStructuredListHeaderCell>
        <DDSStructuredListHeaderCell>Column C</DDSStructuredListHeaderCell>
        <DDSStructuredListHeaderCell>Column D</DDSStructuredListHeaderCell>
      </DDSStructuredListHeaderRow>
    </DDSStructuredListHead>
    <DDSStructuredListBody>
      <DDSStructuredListGroup title="Group 1">
        <DDSStructuredListRow>
          <DDSStructuredListCell>Row 1</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
      </DDSStructuredListGroup>
      <DDSStructuredListGroup title="Group 2">
        <DDSStructuredListRow>
          <DDSStructuredListCell>Row 2</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
      </DDSStructuredListGroup>
      <DDSStructuredListGroup title="Group 3">
        <DDSStructuredListRow>
          <DDSStructuredListCell>Row 3</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
      </DDSStructuredListGroup>
    </DDSStructuredListBody>
  </DDSStructuredList>
);

render(<App />, document.getElementById('root'));
