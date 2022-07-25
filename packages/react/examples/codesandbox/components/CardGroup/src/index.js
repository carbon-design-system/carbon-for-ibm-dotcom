/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import { CardGroup } from '@carbon/ibmdotcom-react/es/components/CardGroup';
import data from './data.json';
import ReactDom from 'react-dom';

const cta = {
  heading: "Top level card link",
  cta: {
    href: "https://www.example.com",
  },
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <CardGroup cards={data.cards} cta={cta} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
