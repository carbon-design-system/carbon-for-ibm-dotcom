/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { CardLink } from '@carbon/ibmdotcom-react/es/components/CardLink';
import ReactDom from 'react-dom';

const card = {
  copy: "Explore AI use cases in all industries",
  cta: {
    href: "https://www.example.com",
    icon: {
      src: ArrowRight20,
    },
  },
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-6">
        <CardLink card={card} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
