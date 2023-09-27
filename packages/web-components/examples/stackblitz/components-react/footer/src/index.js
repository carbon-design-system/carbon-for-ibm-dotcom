/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import C4DFooterContainer from '@carbon/ibmdotcom-web-components/es/components-react/footer/footer-container';
import './index.css';

const App = () => (
  <C4DFooterContainer
    lang-display="United States - English"
    language-selector-label="Choose a language"
    clear-selection-label="Clear language selection"
    selected-language="English"></C4DFooterContainer>
);

render(<App />, document.getElementById('root'));
