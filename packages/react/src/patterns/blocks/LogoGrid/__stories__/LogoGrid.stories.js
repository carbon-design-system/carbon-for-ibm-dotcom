/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_LOGO_GRID } from '../../../../internal/FeatureFlags';
import LogoGrid from '../LogoGrid';
import logos from './data/logos.json';
import React from 'react';
import readme from '../README.md';

export default !DDS_LOGO_GRID
  ? undefined
  : {
      title: 'Patterns (Blocks)|LogoGrid',
      decorators: [withKnobs],
      parameters: {
        readme: {
          sidebar: readme,
        },
      },
    };

export const Default = () => {
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
};
