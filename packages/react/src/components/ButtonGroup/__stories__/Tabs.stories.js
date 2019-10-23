import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { Tab, Tabs } from 'carbon-components-react';
import 'carbon-components/src/globals/scss/styles.scss';

const props = {
  tabs: () => ({
    className: 'some-class',
    selected: number('The index of the selected tab (selected in <Tabs>)', 1),
    triggerHref: text(
      'The href of trigger button for narrow mode (triggerHref in <Tabs>)',
      '#'
    ),
    role: text('ARIA role (role in <Tabs>)', 'navigation'),
    iconDescription: text(
      'The description of the trigger icon for narrow mode (iconDescription in <Tabs>)',
      'show menu options'
    ),
    tabContentClassName: text(
      'The className for the child `<TabContent>` components',
      'tab-content'
    ),
  }),
  tab: () => ({
    disabled: boolean('Disabled (disabled in <Tab>)', false),
    href: text('The href for tab (href in <Tab>)', '#'),
    role: text('ARIA role (role in <Tab>)', 'presentation'),
    tabIndex: number('Tab index (tabIndex in <Tab>)', 0),
  }),
};

/* eslint-disable */
const CustomLabel = ({ text }) => <>{text}</>;

const TabContentRenderedOnlyWhenSelected = ({ selected, children, ...other }) =>
  !selected ? null : (
    <div {...other} selected={selected}>
      {children}
    </div>
  );

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <Tabs {...props.tabs()}>
        <Tab {...props.tab()} label="Tab label 1">
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for first tab goes here.
          </div>
        </Tab>
        <Tab {...props.tab()} label="Tab label 2">
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for second tab goes here.
          </div>
        </Tab>
        <Tab
          {...props.tab()}
          label="Tab label 3"
          renderContent={TabContentRenderedOnlyWhenSelected}>
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for third tab goes here.
          </div>
        </Tab>
        <Tab {...props.tab()} label={<CustomLabel text="Custom Label" />}>
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for fourth tab goes here.
          </div>
        </Tab>
      </Tabs>
    ),
    {
      info: {
        text: `
            Tabs are used to quickly navigate between views within the same context. Create individual
            Tab components for each item in the Tabs list.
          `,
      },
    }
  );
