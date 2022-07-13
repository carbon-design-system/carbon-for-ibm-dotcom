/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import { LocaleModal } from "@carbon/ibmdotcom-react/es/components/LocaleModal";
import ReactDom from 'react-dom';

const App = () => <LocaleModal isOpen={true} />;

ReactDom.render(<App />, document.getElementById('app'));
