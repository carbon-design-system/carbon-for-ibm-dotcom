/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { ContentBlock } from '@carbon/ibmdotcom-react/es/components/ContentBlock';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentBlock
          heading='Lorem ipsum dolor sit amet.'
          copy='copy text'
          cta={{
            cta: {
              href: 'https://www.example.com',
            },
            style: 'card',
            type: 'local',
            heading: 'CTA heading',
          }}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
