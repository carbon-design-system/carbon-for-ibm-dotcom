/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Add16, CheckmarkFilled16, Filter16 } from '@carbon/icons-react';
import {
  Accordion,
  AccordionItem,
  CodeSnippet,
  ComboBox,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Form,
  FormGroup,
  InlineLoading,
  MultiSelect,
  ToastNotification,
  InlineNotification,
  NotificationActionButton,
  NumberInput,
  Pagination,
  Button,
  Search,
  Select,
  SelectItem,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListInput,
  Tag,
  TextArea,
  TextInput,
  ToggleSmall,
  TooltipIcon,
} from 'carbon-components-react';

import DataTableWithOverflowMenuStory from './DataTable/stories/with-overflow-menu';
import FileUploaderFromDropContainerStory from './FileUploader/stories/drop-container';

import './icon-kitchen-sink-story.scss';
import './Form/form-story.scss';

const dropdownItems = [
  {
    id: 'option-0',
    text: 'Option 1',
  },
  {
    id: 'option-1',
    text: 'Option 2',
  },
  {
    id: 'option-2',
    text: 'Option 3',
  },
];

const structuredListBodyRowGenerator = numRows => {
  return Array.from({ length: numRows }).map((n, i) => (
    <StructuredListRow label key={`row-${i}`} htmlFor={`row-${i}`}>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
        magna, finibus id tortor sed, aliquet bibendum augue. Aenean
        posuere sem vel euismod dignissim. Nulla ut cursus dolor.
        Pellentesque vulputate nisl a porttitor interdum.
      </StructuredListCell>
      <StructuredListInput
        id={`row-${i}`}
        value={`row-${i}`}
        title={`row-${i}`}
        name="row-0"
        defaultChecked={!i || null}
      />
      <StructuredListCell>
        <CheckmarkFilled16
          className="bx--structured-list-svg"
          aria-label="select an option">
          <title>select an option</title>
        </CheckmarkFilled16>
      </StructuredListCell>
    </StructuredListRow>
  ));
};

export default {
  title: 'Component icons kitchen sink',
};

export const Default = () => (
  <>
    <h1>Important note</h1>
    <p className="dds-story--icon-kitchen-sink__item">
      This story does not represent Carbon's design.
      The component widths or positions are aligned solely for testing icon sizes/positions.
    </p>
    <div className="dds-story--icon-kitchen-sink__item">
      <Accordion>
        <AccordionItem title="Section 1 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
      </Accordion>
    </div>

    <Form>
      <FormGroup className="dds-story--icon-kitchen-sink__item dds-story--form-group--button">
        <div class="bx--form-item">
          <Button type="submit" renderIcon={Add16}>
            Submit
          </Button>
        </div>
      </FormGroup>
    </Form>

    <div className="dds-story--icon-kitchen-sink__item">
      <div>
        <CodeSnippet type="single">
          {
            'node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga laboriosam!'
          }
        </CodeSnippet>
      </div>
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <div>
        <CodeSnippet type="multi">
          {`@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`}
          </CodeSnippet>
      </div>
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <ComboBox
        placeholder="Filter..."
        titleText="Combobox title"
        helperText="Optional helper text here"
        invalid
        invalidText="A valid value is required"
        items={dropdownItems}
        itemToString={item => (item ? item.text : '')}
        />
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <DataTableWithOverflowMenuStory />
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <DatePicker
        datePickerType="single">
        <DatePickerInput labelText="Date Picker label" placeholder="mm/dd/yyyy" />
      </DatePicker>
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <Dropdown
        label="Dropdown menu options"
        titleText="Dropdown title"
        helperText="Optional helper text here"
        invalid
        invalidText="Invalid selection"
        items={dropdownItems}
        itemToString={item => (item ? item.text : '')}
      />
    </div>

    <Form>
      <FormGroup className="dds-story--icon-kitchen-sink__item">
        <FileUploaderFromDropContainerStory />
      </FormGroup>
    </Form>

    <div className="dds-story--icon-kitchen-sink__item">
      <InlineLoading description="Loading data..." />
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <MultiSelect
        titleText="Multiselect title"
        helperText="Optional helper text here"
        invalid
        invalidText="Invalid selection"
        placeholder="Filter"
        items={dropdownItems}
        itemToString={item => (item ? item.text : '')}
      />
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <InlineNotification
        kind="info"
        title="Notification title"
        actions={
          <NotificationActionButton>Action</NotificationActionButton>
        }
      />
    </div>

    <div className="dds-story--icon-kitchen-sink__item">
      <ToastNotification
        kind="info"
        title="Notification title"
        caption="Time stamp [00:00:00]"
      />
    </div>

    <Form>
      <FormGroup className="dds-story--form-group--number-input">
        <NumberInput id="number-input" label="Number Input" min={0} max={100} value={50} step={10} />
      </FormGroup>
    </Form>

    <div className="dds-story--icon-kitchen-sink__item">
      <Pagination pageSizes={[10, 20, 30, 40, 50]} totalItems={100} />
    </div>

    <Form>
      <FormGroup legendText="Search">
        <Search
          id="search-1"
          labelText="Search"
          placeHolderText="Search"
        />
      </FormGroup>

      <FormGroup className="dds-story--form-group--select">
        <Select id="select-1" defaultValue="placeholder-item">
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Choose an option"
          />
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
          <SelectItem value="option-3" text="Option 3" />
        </Select>
      </FormGroup>
    </Form>

    <div className="dds-story--icon-kitchen-sink__item">
      <StructuredListWrapper selection>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>ColumnA</StructuredListCell>
            <StructuredListCell head>ColumnB</StructuredListCell>
            <StructuredListCell head>ColumnC</StructuredListCell>
            <StructuredListCell head>{''}</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {structuredListBodyRowGenerator(4)}
        </StructuredListBody>
      </StructuredListWrapper>
    </div>

    <div className="dds-story--icon-kitchen-sink__item dds-story--icon-kitchen-sink__item--tag">
      <Tag filter>Tag text</Tag>
    </div>

    <Form>
      <FormGroup>
        <TextInput labelText="Text Input label" placeholder="Placeholder text" invalid invalidText="A valid value is required" />

        <TextInput
          type="password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          labelText="Password"
          invalid
          invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number"
        />
      </FormGroup>

      <FormGroup>
        <TextArea  labelText="Text Area label" placeholder="Placeholder text" />
      </FormGroup>

      <FormGroup legendText="Toggle heading" className="dds-story--form-group--toggle-small">
        <ToggleSmall id="toggle-1" aria-label="Toggle" labelA="" labelB="" />
      </FormGroup>
    </Form>

    <div className="dds-story--icon-kitchen-sink__item dds-story--icon-kitchen-sink__item--tooltip-icon">
      <TooltipIcon align="end" tooltipText="Filter"><Filter16 /></TooltipIcon>
    </div>
  </>
);
