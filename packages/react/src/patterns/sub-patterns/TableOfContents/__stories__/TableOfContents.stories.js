/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  object,
  select,
  text,
  withKnobs,
  boolean,
} from '@storybook/addon-knobs';
import dataContent from './data/dataContent';
import React from 'react';
import readme from '../README.md';
import TableOfContents from '../TableOfContents';

const _themes = {
  g100: 'g100',
  white: '',
};

export default {
  title: 'Patterns (Sub-Patterns)|Table of Contents',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const ManuallyDefineMenuItems = () => {
  const _menuLabel = text('menu label', 'Jump to');

  const menuItems = [
    {
      title: 'Cras molestie condimentum',
      id: '8',
    },
    {
      title: 'Praesent fermentum sodales',
      id: '7',
    },
    {
      title: 'Nulla tristique lacinia',
      id: '2',
    },
    {
      title: 'Morbi id nibh metus',
      id: '3',
    },
    {
      title: 'Integer non scelerisque',
      id: '14',
    },
  ];

  return (
    <TableOfContents
      theme={select('theme', _themes, _themes.white)}
      menuItems={object('menuItems', menuItems)}
      menuLabel={_menuLabel}
      menuRule={boolean('Optional Rule', false)}>
      {boolean('Optional children', false) ? (
        <div
          style={{
            background: '#f4f4f4',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <h4>Example children</h4>
        </div>
      ) : (
        false
      )}
      {dataContent}
    </TableOfContents>
  );
};

ManuallyDefineMenuItems.story = {
  name: 'Manually define Menu Items',
};

export const DynamicItems = () => {
  const _menuLabel = text('menu label', 'Jump to');

  return (
    <TableOfContents
      theme={select('theme', _themes, _themes.white)}
      menuLabel={_menuLabel}>
      {dataContent}
    </TableOfContents>
  );
};
