/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { ButtonGroup } from '@carbon/ibmdotcom-react';
import React from 'react';
import ReactDom from 'react-dom';

const buttons = [
  {
    href: 'https://www.example.com',
    copy: 'Button 2',
  },
  {
    href: 'https://www.example.com',
    copy: 'Button 1',
  },
];

const buttonsWithIcons = [
  {
    href: 'https://www.example.com',
    copy: 'Button 2',
    renderIcon: ArrowRight20,
  },
  {
    href: 'https://www.example.com',
    copy: 'Button 1',
    renderIcon: ArrowRight20,
  },
];

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <p>Default buttons</p>
        <div>
          <ButtonGroup buttons={buttons} />
        </div>
        <p style={{ paddingTop: '2rem' }}>Buttons with icons</p>
        <div>
          <ButtonGroup buttons={buttonsWithIcons} />
        </div>
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
