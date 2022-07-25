/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import Desktop from "@carbon/pictograms-react/es/desktop";
import { PictogramItem } from "@carbon/ibmdotcom-react/es/components/PictogramItem";
import ReactDom from 'react-dom';

const heading = "Lorem ipsum dolor sit";
const copy =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam";
const pictogram = {
  src: Desktop,
  "aria-label": "Pictogram description",
};

const cta = {
  type: "local",
  href: "https://www.example.com",
  copy: "Lorem ipsum dolor",
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <PictogramItem
          heading={heading}
          copy={copy}
          pictogram={pictogram}
          cta={cta}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));
