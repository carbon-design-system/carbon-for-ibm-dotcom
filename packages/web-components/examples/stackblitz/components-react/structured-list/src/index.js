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
import C4DStructuredList from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list';
import C4DStructuredListHead from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-head';
import C4DStructuredListHeaderRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-row';
import C4DStructuredListHeaderCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-cell';
import C4DStructuredListBody from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-body';
import C4DStructuredListGroup from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-group';
import C4DStructuredListRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-row';
import C4DStructuredListCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-cell';
import './index.css';

const App = () => (
  <C4DStructuredList>
    <C4DStructuredListHead>
      <C4DStructuredListHeaderRow>
        <C4DStructuredListHeaderCell>Column A</C4DStructuredListHeaderCell>
        <C4DStructuredListHeaderCell>Column B</C4DStructuredListHeaderCell>
        <C4DStructuredListHeaderCell>Column C</C4DStructuredListHeaderCell>
        <C4DStructuredListHeaderCell>Column D</C4DStructuredListHeaderCell>
      </C4DStructuredListHeaderRow>
    </C4DStructuredListHead>
    <C4DStructuredListBody>
      <C4DStructuredListGroup title="Group 1">
        <C4DStructuredListRow>
          <C4DStructuredListCell>Row 1</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
      </C4DStructuredListGroup>
      <C4DStructuredListGroup title="Group 2">
        <C4DStructuredListRow>
          <C4DStructuredListCell>Row 2</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
      </C4DStructuredListGroup>
      <C4DStructuredListGroup title="Group 3">
        <C4DStructuredListRow>
          <C4DStructuredListCell>Row 3</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
      </C4DStructuredListGroup>
    </C4DStructuredListBody>
  </C4DStructuredList>
);

render(<App />, document.getElementById('root'));
