/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './index.scss';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';
import VideoPlayer from '../VideoPlayer';

storiesOf('Components|VideoPlayer', module)
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
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <VideoPlayer
              videoId="0_orew0puw"
              showDescription={boolean('Show description', true)}
            />
          </div>
        </div>
      </div>
    );
  });
