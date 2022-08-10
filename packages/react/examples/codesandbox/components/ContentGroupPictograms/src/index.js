/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { Desktop } from '@carbon/pictograms-react';
import { ContentGroupPictograms } from '@carbon/ibmdotcom-react/es/components/ContentGroupPictograms';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentGroupPictograms
          heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          items={[
            {
              heading: 'Aliquam condimentum interdum',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              cta: {
                type: 'local',
                href: 'https://www.example.com',
                copy: 'Lorem ipsum dolor',
              },
              pictogram: {
                src: Desktop,
                'aria-label': 'Desktop Pictogram',
              },
            },
          ]}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
