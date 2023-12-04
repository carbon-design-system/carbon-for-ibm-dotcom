/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import C4DStructuredList from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list';
import C4DStructuredListHead from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-head';
/* eslint-disable max-len */
import C4DStructuredListHeaderRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-row';
import C4DStructuredListHeaderCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-cell';
/* eslint-enable max-len */
import C4DStructuredListBody from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-body';
import C4DStructuredListGroup from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-group';
import C4DStructuredListRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-row';
import C4DStructuredListCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-cell';

import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

export const Default = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <C4DStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <C4DStructuredListHead>
        <C4DStructuredListHeaderRow>
          <C4DStructuredListHeaderCell>Column A</C4DStructuredListHeaderCell>
          <C4DStructuredListHeaderCell>Column B</C4DStructuredListHeaderCell>
          <C4DStructuredListHeaderCell>Column C</C4DStructuredListHeaderCell>
          <C4DStructuredListHeaderCell>Column D</C4DStructuredListHeaderCell>
        </C4DStructuredListHeaderRow>
      </C4DStructuredListHead>
      <C4DStructuredListBody>
        <C4DStructuredListRow>
          <C4DStructuredListCell>Row 1</C4DStructuredListCell>
          <C4DStructuredListCell>Row 1</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
        <C4DStructuredListRow>
          <C4DStructuredListCell>Row 2</C4DStructuredListCell>
          <C4DStructuredListCell>Row 2</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
        <C4DStructuredListRow>
          <C4DStructuredListCell>Row 3</C4DStructuredListCell>
          <C4DStructuredListCell>Row 3</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
      </C4DStructuredListBody>
    </C4DStructuredList>
  );
};

export const WithRowHeaders = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <C4DStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <C4DStructuredListBody>
        <C4DStructuredListRow>
          <C4DStructuredListHeaderCell scope="row">
            Row 1
          </C4DStructuredListHeaderCell>
          <C4DStructuredListCell>Row 1</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
        <C4DStructuredListRow>
          <C4DStructuredListHeaderCell scope="row">
            Row 2
          </C4DStructuredListHeaderCell>
          <C4DStructuredListCell>Row 2</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
        <C4DStructuredListRow>
          <C4DStructuredListHeaderCell scope="row">
            Row 3
          </C4DStructuredListHeaderCell>
          <C4DStructuredListCell>Row 3</C4DStructuredListCell>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
      </C4DStructuredListBody>
    </C4DStructuredList>
  );
};

WithRowHeaders.story = {
  name: 'With row headers',
};

export const WithSubheaders = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <C4DStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <C4DStructuredListBody>
        <C4DStructuredListGroup title="Group 1">
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 1
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 1</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 2
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 2</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 3
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 3</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
        </C4DStructuredListGroup>
        <C4DStructuredListGroup title="Group 2">
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 1
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 1</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 2
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 2</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 3
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 3</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
        </C4DStructuredListGroup>
        <C4DStructuredListGroup title="Group 3">
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 1
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 1</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 2
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 2</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
          <C4DStructuredListRow>
            <C4DStructuredListHeaderCell scope="row">
              Row 3
            </C4DStructuredListHeaderCell>
            <C4DStructuredListCell>Row 3</C4DStructuredListCell>
            <C4DStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </C4DStructuredListCell>
          </C4DStructuredListRow>
        </C4DStructuredListGroup>
      </C4DStructuredListBody>
    </C4DStructuredList>
  );
};

WithSubheaders.story = {
  name: 'With subheaders',
};

export const WithComplexContent = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <C4DStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <C4DStructuredListHead>
        <C4DStructuredListHeaderRow>
          <C4DStructuredListHeaderCell>
            Product Name
          </C4DStructuredListHeaderCell>
        </C4DStructuredListHeaderRow>
      </C4DStructuredListHead>
      <C4DStructuredListBody>
        <C4DStructuredListRow>
          <C4DStructuredListCell tooltip="Tooltip text">
            Cell with tooltip
          </C4DStructuredListCell>
        </C4DStructuredListRow>
        <C4DStructuredListRow>
          <C4DStructuredListCell icon="checkmark">
            Cell with icon
          </C4DStructuredListCell>
        </C4DStructuredListRow>
        <C4DStructuredListRow>
          <C4DStructuredListCell tags="Merchandising Offer, Secondary Tag, Other">
            Cell with tags
          </C4DStructuredListCell>
        </C4DStructuredListRow>
        <C4DStructuredListRow>
          <C4DStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed,aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </C4DStructuredListCell>
        </C4DStructuredListRow>
      </C4DStructuredListBody>
    </C4DStructuredList>
  );
};

WithComplexContent.story = {
  name: 'With complex content',
};

export default {
  title: 'Components/Structured list',
  parameters: {
    ...readme.parameters,
    knobs: {
      StructuredList: () => ({
        colSpan1: textNullable('col-span-1', ''),
        colSpan2: textNullable('col-span-2', ''),
        colSpan3: textNullable('col-span-3', ''),
        colSpan4: textNullable('col-span-4', ''),
      }),
    },
  },
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-16">{story()}</div>
        </div>
      </div>
    ),
  ],
};
