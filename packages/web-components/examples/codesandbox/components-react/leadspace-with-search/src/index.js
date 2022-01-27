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
/* eslint-disable max-len */
import DDSLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import DDSLeadspaceWithSearchHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-heading';
import DDSLeadspaceWithSearchContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content';
import DDSLeadspaceWithSearchContentHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-heading';
import DDSLeadspaceWithSearchContentCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-copy';
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import DDSSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
/* eslint-enable max-len */
import './index.css';

const App = () => (
  <DDSLeadspaceWithSearch>
    <DDSLeadspaceWithSearchHeading>Find a product</DDSLeadspaceWithSearchHeading>
    <DDSLeadspaceWithSearchContent>
      <DDSLeadspaceWithSearchContentHeading>
        Innovate like a startup, scale for the enterprise
      </DDSLeadspaceWithSearchContentHeading>
      <DDSLeadspaceWithSearchContentCopy>
        Automate your software release process with continuous delivery (CD)—the most critical part of adopting DevOps. Build,
        test, and deploy code changes quickly, ensuring software is always ready for deployment.
      </DDSLeadspaceWithSearchContentCopy>
    </DDSLeadspaceWithSearchContent>
    <DDSSearchWithTypeahead slot="search" leadspace-search></DDSSearchWithTypeahead>
    <DDSHorizontalRule slot="hr"></DDSHorizontalRule>
  </DDSLeadspaceWithSearch>
);

render(<App />, document.getElementById('root'));
