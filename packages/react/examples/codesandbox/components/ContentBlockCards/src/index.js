/**
  Copyright IBM Corp. 2016, 2022

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import cards from './cards.json';
import ReactDom from 'react-dom';
import { ContentBlockCards } from '@carbon/ibmdotcom-react/es/components/ContentBlockCards';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <h4>ContentBlockCards - Simple</h4>
        <div>
          <ContentBlockCards
            heading="Aliquam condimentum interdum"
            cards={cards["Simple"]}
          />
        </div>
        <h4>ContentBlockCards - Images</h4>
        <div>
          <ContentBlockCards
            heading="Aliquam condimentum interdum"
            cards={cards["Images"]}
          />
        </div>
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
