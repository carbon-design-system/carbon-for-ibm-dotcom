/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { ContentItem } from '@carbon/ibmdotcom-react/es/components/ContentItem';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentItem
          heading="heading"
          copy="copy"
          cta={{
            style: 'text',
            type: 'local',
            copy: 'CTA text',
            href: 'https://www.example.com',
          }}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
