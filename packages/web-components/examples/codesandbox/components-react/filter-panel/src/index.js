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
import DDSFilterGroup from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-group';
import DDSFilterGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-group-item';
import DDSFilterPanelCheckbox from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-checkbox';
import DDSFilterPanelComposite from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-composite';
import DDSFilterPanelHeading from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-heading';
import DDSFilterPanelInputSelect from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-input-select';
import DDSFilterPanelInputSelectItem from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-input-select-item';
import './index.css';

const App = () => (
  <DDSFilterPanelComposite>
    <DDSFilterPanelHeading slot="heading">Filter</DDSFilterPanelHeading>
    <DDSFilterGroup>
      <DDSFilterGroupItem title-text="Product types">
        <DDSFilterPanelCheckbox value="API">API</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="Application">Application</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="Data Set">Data Set</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="Free Trial">Free Trial</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="Hardware">Hardware</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="Service">Service</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="Service Assets">Service Assets</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="Software">Software</DDSFilterPanelCheckbox>
      </DDSFilterGroupItem>
      <DDSFilterGroupItem title-text="Technologies">
        <DDSFilterPanelInputSelect header-value="Analytics" title="Analytics"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Artificial intelligence" title="Artificial intelligence">
          <DDSFilterPanelInputSelectItem value="Machine Learning">Machine Learning</DDSFilterPanelInputSelectItem>
          <DDSFilterPanelInputSelectItem value="Natural language processing">
            Natural language processing
          </DDSFilterPanelInputSelectItem>
          <DDSFilterPanelInputSelectItem value="Speech recognition">Speech recognition</DDSFilterPanelInputSelectItem>
        </DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Automation" title="Automation"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Blockchain" title="Blockchain"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Cloud computing" title="Cloud computing"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="IT infrastructure" title="IT infrastructure"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="IT management" title="IT management"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Mobile technologys" title="Mobile technology"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Security" title="Security"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Software development" title="Software development"></DDSFilterPanelInputSelect>
      </DDSFilterGroupItem>
      <DDSFilterGroupItem title-text="Business needs">
        <DDSFilterPanelInputSelect header-value="Business operations" title="Business operations"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Content Management" title="Content Management"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Customer service" title="Customer service"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Finance" title="Finance"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect header-value="Marketing and sales" title="Marketing and sales"></DDSFilterPanelInputSelect>
        <DDSFilterPanelInputSelect
          header-value="Supply chain management"
          title="Supply chain management"></DDSFilterPanelInputSelect>
      </DDSFilterGroupItem>
      <DDSFilterGroupItem title-text="Deployment types">
        <DDSFilterPanelCheckbox value="On-premises">On-premises</DDSFilterPanelCheckbox>
        <DDSFilterPanelCheckbox value="SaaS">SaaS</DDSFilterPanelCheckbox>
      </DDSFilterGroupItem>
    </DDSFilterGroup>
  </DDSFilterPanelComposite>
);

render(<App />, document.getElementById('root'));
