/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import OverflowREADME from './README.md';

const directions = {
  'Bottom of the trigger button (bottom)': 'bottom',
  'Top of the trigger button (top)': 'top',
};

const props = {
  menu: () => ({
    direction: select('Menu direction (direction)', directions, 'bottom'),
    ariaLabel: text('ARIA label (ariaLabel)', 'Menu'),
    iconDescription: text('Icon description (iconDescription)', ''),
    flipped: boolean('Flipped (flipped)', false),
    light: boolean('Light (light)', false),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onKeyDown: action('onKeyDown'),
    onClose: action('onClose'),
    onOpen: action('onOpen'),
  }),
  menuItem: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled)', false),
    requireTitle: boolean(
      'Use hover over text for menu item (requireTitle)',
      false
    ),
    onClick: action('onClick'),
  }),
};

const OverflowMenuExample = ({ overflowMenuProps, overflowMenuItemProps }) => (
  <>
    <OverflowMenu {...overflowMenuProps}>
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 1"
        primaryFocus
      />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Option 2 is an example of a really long string and how we recommend handling this"
        requireTitle
      />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 3" />
      <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 4" />
      <OverflowMenuItem
        {...overflowMenuItemProps}
        itemText="Danger option"
        hasDivider
        isDelete
      />
    </OverflowMenu>
  </>
);

storiesOf('OverflowMenu', module)
  .addDecorator(withKnobs)
  .add(
    'basic',
    withReadme(OverflowREADME, () => (
      <OverflowMenuExample
        overflowMenuProps={props.menu()}
        overflowMenuItemProps={props.menuItem()}
      />
    )),
    {
      info: {
        text: `
            Overflow Menu is used when additional options are available to the user and there is a space constraint.
            Create Overflow Menu Item components for each option on the menu.
          `,
      },
    }
  )
  .add(
    'with links',
    withReadme(OverflowREADME, () => (
      <OverflowMenuExample
        overflowMenuProps={props.menu()}
        overflowMenuItemProps={{
          ...props.menuItem(),
          href: 'https://www.ibm.com',
        }}
      />
    )),
    {
      info: {
        text: `
            Overflow Menu is used when additional options are available to the user and there is a space constraint.
            Create Overflow Menu Item components for each option on the menu.

            When given \`href\` props, menu items render as <a> tags to facilitate usability.
          `,
      },
    }
  )
  .add(
    'custom trigger',
    withReadme(OverflowREADME, () => (
      <OverflowMenuExample
        overflowMenuProps={{
          ...props.menu(),
          ariaLabel: null,
          style: { width: 'auto' },
          renderIcon: () => <div style={{ padding: '0 1rem' }}>Menu</div>,
        }}
        overflowMenuItemProps={props.menuItem()}
      />
    )),
    {
      info: {
        text: `
            Sometimes you just want to render something other than an icon
          `,
      },
    }
  );
