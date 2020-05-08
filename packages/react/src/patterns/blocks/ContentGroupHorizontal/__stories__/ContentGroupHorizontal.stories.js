/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index.scss';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import ContentGroupHorizontal from '../ContentGroupHorizontal';
import items from './data/items.json';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|ContentGroupHorizontal', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
            <ContentGroupHorizontal
              heading={text('Heading', 'Aliquam condimentum')}
              items={object('Items', items.items)}
            />
          </div>
        </div>
      </div>
    );
  });
