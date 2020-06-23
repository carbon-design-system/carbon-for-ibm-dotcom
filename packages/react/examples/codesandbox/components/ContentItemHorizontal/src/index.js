/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import { ContentItemHorizontal } from '@carbon/ibmdotcom-react';
import React from 'react';
import ReactDom from 'react-dom';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-6">
        <ContentItemHorizontal
          eyebrow="Lorem ipsum"
          heading="Aliquam condimentum"
          copy="Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin."
          cta={[
            {
              type: 'local',
              copy: 'Learn more',
              cta: {
                href: 'https://ibm.com',
              },
            },
            {
              type: 'external',
              copy: 'Microservices and containers',
              cta: {
                href: 'https://ibm.com',
              },
            },
          ]}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
