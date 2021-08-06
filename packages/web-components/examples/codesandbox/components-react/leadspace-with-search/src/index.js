/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import DDSLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import DDSLeadSpaceBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-heading';
import DDSLeadSpaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content';
import DDSLeadspaceSearchBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-search-block-heading';
import DDSLeadspaceSearchBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-search-block-copy';
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import DDSSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
import './index.css';

const App = () => (
  <DDSLeadspaceWithSearch>
    <DDSLeadSpaceBlockHeading slot="heading">Find a product</DDSLeadSpaceBlockHeading>
    <DDSLeadSpaceBlockContent slot="content">
      <DDSLeadspaceSearchBlockHeading>Innovate like a startup, scale for the enterprise</DDSLeadspaceSearchBlockHeading>
      <DDSLeadspaceSearchBlockCopy>
        Automate your software release process with continuous delivery (CD)—the most critical part of adopting DevOps. Build,
        test, and deploy code changes quickly, ensuring software is always ready for deployment.
      </DDSLeadspaceSearchBlockCopy>
    </DDSLeadSpaceBlockContent>
    <DDSSearchWithTypeahead slot="search" leadspace-search></DDSSearchWithTypeahead>
    <DDSHorizontalRule slot="hr"></DDSHorizontalRule>
  </DDSLeadspaceWithSearch>
);

render(<App />, document.getElementById('root'));
