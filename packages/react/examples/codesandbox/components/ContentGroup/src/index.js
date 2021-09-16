/**
 Copyright IBM Corp. 2016, 2021

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import React from 'react';
import ReactDom from 'react-dom';

import { ContentGroup } from '@carbon/ibmdotcom-react';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentGroup
          heading='Lorem ipsum dolor sit amet.'
          copy='copy text'
          cta={{
            title: 'Lorem ipsum dolor sit amet',
            href: 'https://www.example.com'
          }}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App/>, document.getElementById('app'));
