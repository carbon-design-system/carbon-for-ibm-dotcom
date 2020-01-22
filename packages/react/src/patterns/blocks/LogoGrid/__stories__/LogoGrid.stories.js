import './index.scss';
import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_LOGO_GRID } from '../../../../internal/FeatureFlags';
import LogoGrid from '../LogoGrid';
import React from 'react';
import logos from './data/logos.json';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_LOGO_GRID) {
  storiesOf('Patterns (Blocks)|LogoGrid', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'Pattern title',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      );
      const themes = {
        g10: 'g10',
        white: '',
      };
      return (
        <LogoGrid
          title={title}
          logosGroup={object('Data', logos)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    });
}
