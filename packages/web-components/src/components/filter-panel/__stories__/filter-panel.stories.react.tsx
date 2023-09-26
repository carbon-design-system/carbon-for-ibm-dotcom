/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DFilterGroup from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-group';
import C4DFilterGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-group-item';
import C4DFilterPanelCheckbox from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-checkbox';
import C4DFilterPanelComposite from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-composite';
import C4DFilterPanelHeading from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-heading';
/* eslint-disable max-len */
import C4DFilterPanelInputSelect from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-input-select';
import C4DFilterPanelInputSelectItem from '@carbon/ibmdotcom-web-components/es/components-react/filter-panel/filter-panel-input-select-item';
/* eslint-enable max-len */

import readme from './README.stories.react.mdx';

export const Default = (args) => {
  const { heading, gridKnobs } = args?.FilterPanel ?? {};

  return (
    <>
      <div
        className={`grid-alignment ${
          gridKnobs === '3 columns' ? 'cds--col-lg-3' : 'cds--col-lg-4'
        }`}
        style={{ paddingRight: '1rem' }}>
        <C4DFilterPanelComposite>
          <C4DFilterPanelHeading slot="heading">
            {heading}
          </C4DFilterPanelHeading>
          <C4DFilterGroup>
            <C4DFilterGroupItem title="Product types">
              <C4DFilterPanelCheckbox value="API" checked>
                API
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="Application" checked>
                Application
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="Data Set" checked>
                Data Set
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="Free Trial">
                Free Trial
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="Hardware">
                Hardware
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="Service">
                Service
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="Service Assets">
                Service Assets
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="Software">
                Software
              </C4DFilterPanelCheckbox>
            </C4DFilterGroupItem>
            <C4DFilterGroupItem title="Technologies">
              <C4DFilterPanelInputSelect
                header-value="Analytics"
                title="Analytics"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Artificial intelligence"
                title="Artificial intelligence">
                <C4DFilterPanelInputSelectItem value="Machine Learning">
                  Machine Learning
                </C4DFilterPanelInputSelectItem>
                <C4DFilterPanelInputSelectItem value="Natural language processing">
                  Natural language processing
                </C4DFilterPanelInputSelectItem>
                <C4DFilterPanelInputSelectItem value="Speech recognition">
                  Speech recognition
                </C4DFilterPanelInputSelectItem>
              </C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Automation"
                title="Automation"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Blockchain"
                title="Blockchain"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Cloud computing"
                title="Cloud computing"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="IT infrastructure"
                title="IT infrastructure"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="IT management"
                title="IT management"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Mobile technologys"
                title="Mobile technology"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Security"
                title="Security"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Software development"
                title="Software development"></C4DFilterPanelInputSelect>
            </C4DFilterGroupItem>
            <C4DFilterGroupItem title="Business needs">
              <C4DFilterPanelInputSelect
                header-value="Business operations"
                title="Business operations"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Content Management"
                title="Content Management"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Customer service"
                title="Customer service"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Finance"
                title="Finance"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Marketing and sales"
                title="Marketing and sales"></C4DFilterPanelInputSelect>
              <C4DFilterPanelInputSelect
                header-value="Supply chain management"
                title="Supply chain management"></C4DFilterPanelInputSelect>
            </C4DFilterGroupItem>
            <C4DFilterGroupItem title="Deployment types">
              <C4DFilterPanelCheckbox value="On-premises">
                On-premises
              </C4DFilterPanelCheckbox>
              <C4DFilterPanelCheckbox value="SaaS">SaaS</C4DFilterPanelCheckbox>
            </C4DFilterGroupItem>
          </C4DFilterGroup>
        </C4DFilterPanelComposite>
      </div>
    </>
  );
};

export default {
  title: 'Components/Filter panel',
  decorators: [
    (story) => (
      <div className="cds--grid cds--grid--condensed">
        <div className="cds--row">{story()}</div>
      </div>
    ),
  ],
  hasStoryPadding: true,
  parameters: {
    ...readme.parameters,
    knobs: {
      FilterPanel: () => ({
        heading: text('heading', 'Filter'),
        gridKnobs: select(
          'Grid alignment',
          ['3 columns', '4 columns'],
          '4 columns'
        ),
      }),
    },
  },
};
