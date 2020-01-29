/* eslint-disable jsx-a11y/anchor-is-valid */
import './index.scss';
import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_TOC } from '../../../../internal/FeatureFlags';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';
import TableOfContents from '../TableOfContents';
import content from './data/content';

if (DDS_TOC) {
  const _menuLabel = text('menu label', 'Jump to');

  const _themes = {
    g100: 'g100',
    white: '',
  };
  storiesOf('Patterns (Sub-Patterns)|Table of Contents', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Manually define Menu Items', () => {

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
          menuItems={object('menuItems',menuItems)}
          menuLabel={_menuLabel}>
          {content}
        </TableOfContents>
      );
    })
    .add('Dynamic Items', () => {
      return (
        <TableOfContents
          theme={select('theme', _themes, _themes.white)}
          menuLabel={_menuLabel}>
          {content}
        </TableOfContents>
      );
    });
}
