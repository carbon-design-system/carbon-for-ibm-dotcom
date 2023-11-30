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
import C4DFilterGroup from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-group';
import C4DFilterGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-group-item';
import C4DFilterPanelCheckbox from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-checkbox';
import C4DFilterPanelComposite from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-composite';
import C4DFilterPanelHeading from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-heading';
import C4DFilterPanelInputSelect from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-input-select';
import C4DFilterPanelInputSelectItem from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-input-select-item';
import './index.css';

const App = () => (
  <C4DFilterPanelComposite>
    <C4DFilterPanelHeading slot="heading">Filter</C4DFilterPanelHeading>
    <C4DFilterGroup>
      <C4DFilterGroupItem title="Product types">
        <C4DFilterPanelCheckbox value="API">API</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="Application">Application</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="Data Set">Data Set</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="Free Trial">Free Trial</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="Hardware">Hardware</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="Service">Service</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="Service Assets">Service Assets</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="Software">Software</C4DFilterPanelCheckbox>
      </C4DFilterGroupItem>
      <C4DFilterGroupItem title="Technologies">
        <C4DFilterPanelInputSelect header-value="Analytics" title="Analytics"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Artificial intelligence" title="Artificial intelligence">
          <C4DFilterPanelInputSelectItem value="Machine Learning">Machine Learning</C4DFilterPanelInputSelectItem>
          <C4DFilterPanelInputSelectItem value="Natural language processing">
            Natural language processing
          </C4DFilterPanelInputSelectItem>
          <C4DFilterPanelInputSelectItem value="Speech recognition">Speech recognition</C4DFilterPanelInputSelectItem>
        </C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Automation" title="Automation"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Blockchain" title="Blockchain"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Cloud computing" title="Cloud computing"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="IT infrastructure" title="IT infrastructure"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="IT management" title="IT management"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Mobile technologys" title="Mobile technology"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Security" title="Security"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Software development" title="Software development"></C4DFilterPanelInputSelect>
      </C4DFilterGroupItem>
      <C4DFilterGroupItem title="Business needs">
        <C4DFilterPanelInputSelect header-value="Business operations" title="Business operations"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Content Management" title="Content Management"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Customer service" title="Customer service"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Finance" title="Finance"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect header-value="Marketing and sales" title="Marketing and sales"></C4DFilterPanelInputSelect>
        <C4DFilterPanelInputSelect
          header-value="Supply chain management"
          title="Supply chain management"></C4DFilterPanelInputSelect>
      </C4DFilterGroupItem>
      <C4DFilterGroupItem title="Deployment types">
        <C4DFilterPanelCheckbox value="On-premises">On-premises</C4DFilterPanelCheckbox>
        <C4DFilterPanelCheckbox value="SaaS">SaaS</C4DFilterPanelCheckbox>
      </C4DFilterGroupItem>
    </C4DFilterGroup>
  </C4DFilterPanelComposite>
);

render(<App />, document.getElementById('root'));
