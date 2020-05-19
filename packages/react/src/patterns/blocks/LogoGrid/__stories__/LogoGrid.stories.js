/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text, withKnobs } from '@storybook/addon-knobs';
import LogoGrid from '../LogoGrid';
import logos from './data/logos.json';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|LogoGrid', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const title = text('Pattern title', 'Lorem ipsum dolor sit amet.');
    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-12">
            <LogoGrid title={title} logosGroup={object('Data', logos)} />
          </div>
        </div>
      </div>
    );
  });
