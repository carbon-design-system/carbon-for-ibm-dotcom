/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import App from "./App";
import ReactDom from 'react-dom';

const rootElement = document.getElementById('root');
ReactDom.render(
  <App />,
  rootElement
);
