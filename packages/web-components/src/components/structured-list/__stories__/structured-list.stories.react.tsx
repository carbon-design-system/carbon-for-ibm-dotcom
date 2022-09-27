/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import DDSStructuredList from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list';
import DDSStructuredListHead from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-head';
/* eslint-disable max-len */
import DDSStructuredListHeaderRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-row';
import DDSStructuredListHeaderCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-header-cell';
/* eslint-enable max-len */
import DDSStructuredListBody from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-body';
import DDSStructuredListGroup from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-group';
import DDSStructuredListRow from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-row';
import DDSStructuredListCell from '@carbon/ibmdotcom-web-components/es/components-react/structured-list/structured-list-cell';

import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';

export const Default = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <DDSStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <DDSStructuredListHead>
        <DDSStructuredListHeaderRow>
          <DDSStructuredListHeaderCell>Column A</DDSStructuredListHeaderCell>
          <DDSStructuredListHeaderCell>Column B</DDSStructuredListHeaderCell>
          <DDSStructuredListHeaderCell>Column C</DDSStructuredListHeaderCell>
          <DDSStructuredListHeaderCell>Column D</DDSStructuredListHeaderCell>
        </DDSStructuredListHeaderRow>
      </DDSStructuredListHead>
      <DDSStructuredListBody>
        <DDSStructuredListRow>
          <DDSStructuredListCell>Row 1</DDSStructuredListCell>
          <DDSStructuredListCell>Row 1</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
        <DDSStructuredListRow>
          <DDSStructuredListCell>Row 2</DDSStructuredListCell>
          <DDSStructuredListCell>Row 2</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
        <DDSStructuredListRow>
          <DDSStructuredListCell>Row 3</DDSStructuredListCell>
          <DDSStructuredListCell>Row 3</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
      </DDSStructuredListBody>
    </DDSStructuredList>
  );
};

export const WithRowHeaders = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <DDSStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <DDSStructuredListBody>
        <DDSStructuredListRow>
          <DDSStructuredListHeaderCell scope="row">Row 1</DDSStructuredListHeaderCell>
          <DDSStructuredListCell>Row 1</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
        <DDSStructuredListRow>
          <DDSStructuredListHeaderCell scope="row">Row 2</DDSStructuredListHeaderCell>
          <DDSStructuredListCell>Row 2</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
        <DDSStructuredListRow>
          <DDSStructuredListHeaderCell scope="row">Row 3</DDSStructuredListHeaderCell>
          <DDSStructuredListCell>Row 3</DDSStructuredListCell>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
      </DDSStructuredListBody>
    </DDSStructuredList>
  );
};

WithRowHeaders.story = {
  name: 'With row headers',
};

export const WithSubheaders = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <DDSStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <DDSStructuredListBody>
        <DDSStructuredListGroup title="Group 1">
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 1</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 1</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 2</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 2</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 3</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 3</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
        </DDSStructuredListGroup>
        <DDSStructuredListGroup title="Group 2">
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 1</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 1</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 2</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 2</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 3</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 3</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
        </DDSStructuredListGroup>
        <DDSStructuredListGroup title="Group 3">
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 1</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 1</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 2</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 2</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
          <DDSStructuredListRow>
            <DDSStructuredListHeaderCell scope="row">Row 3</DDSStructuredListHeaderCell>
            <DDSStructuredListCell>Row 3</DDSStructuredListCell>
            <DDSStructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </DDSStructuredListCell>
          </DDSStructuredListRow>
        </DDSStructuredListGroup>
      </DDSStructuredListBody>
    </DDSStructuredList>
  );
};

WithSubheaders.story = {
  name: 'With subheaders',
};

export const WithComplexContent = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return (
    <DDSStructuredList
      col-span-1={colSpan1 ?? ''}
      col-span-2={colSpan2 ?? ''}
      col-span-3={colSpan3 ?? ''}
      col-span-4={colSpan4 ?? ''}>
      <DDSStructuredListHead>
        <DDSStructuredListHeaderRow>
          <DDSStructuredListHeaderCell>Product Name</DDSStructuredListHeaderCell>
        </DDSStructuredListHeaderRow>
      </DDSStructuredListHead>
      <DDSStructuredListBody>
        <DDSStructuredListRow>
          <DDSStructuredListCell tooltip="Tooltip text">Cell with tooltip</DDSStructuredListCell>
        </DDSStructuredListRow>
        <DDSStructuredListRow>
          <DDSStructuredListCell icon="checkmark">Cell with icon</DDSStructuredListCell>
        </DDSStructuredListRow>
        <DDSStructuredListRow>
          <DDSStructuredListCell tags="Merchandising Offer, Secondary Tag, Other">Cell with tags</DDSStructuredListCell>
        </DDSStructuredListRow>
        <DDSStructuredListRow>
          <DDSStructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed,aliquet bibendum augue.
            Aenean posuere sem vel euismod dignissim.
          </DDSStructuredListCell>
        </DDSStructuredListRow>
      </DDSStructuredListBody>
    </DDSStructuredList>
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
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-16">{story()}</div>
        </div>
      </div>
    ),
  ],
};
