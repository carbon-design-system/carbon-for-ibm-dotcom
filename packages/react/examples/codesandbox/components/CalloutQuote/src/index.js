/**
  Copyright IBM Corp. 2016, 2022

  This source code is licensed under the Apache-2.0 license found in the
  LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { CalloutQuote } from '@carbon/ibmdotcom-react/es/components/CalloutQuote';

const quote = {
  copy:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.",
  markType: "doubleCurved",
  source: {
    heading: "Lorem ipsum dolor sit amet",
    copy: "consectetur adipiscing elit",
    copy2: "IBM Cloud",
  },
  cta: {
    copy: "Link with Icon",
    type: "local",
    href: "https://example.com",
  },
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <CalloutQuote quote={quote} />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
