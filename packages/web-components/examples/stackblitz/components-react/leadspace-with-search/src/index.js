/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
/* eslint-disable max-len */
import C4DLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import C4DLeadspaceWithSearchHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-heading';
import C4DLeadspaceWithSearchContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content';
import C4DLeadspaceWithSearchContentHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-heading';
import C4DLeadspaceWithSearchContentCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-copy';
import C4DHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import C4DSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
/* eslint-enable max-len */
import './index.css';

const App = () => (
  <C4DLeadspaceWithSearch>
    <C4DLeadspaceWithSearchHeading>Find a product</C4DLeadspaceWithSearchHeading>
    <C4DLeadspaceWithSearchContent>
      <C4DLeadspaceWithSearchContentHeading>
        Innovate like a startup, scale for the enterprise
      </C4DLeadspaceWithSearchContentHeading>
      <C4DLeadspaceWithSearchContentCopy>
        Automate your software release process with continuous delivery (CD)—the most critical part of adopting DevOps. Build,
        test, and deploy code changes quickly, ensuring software is always ready for deployment.
      </C4DLeadspaceWithSearchContentCopy>
    </C4DLeadspaceWithSearchContent>
    <C4DSearchWithTypeahead slot="search" leadspace-search></C4DSearchWithTypeahead>
    <C4DHorizontalRule slot="hr"></C4DHorizontalRule>
  </C4DLeadspaceWithSearch>
);

render(<App />, document.getElementById('root'));
