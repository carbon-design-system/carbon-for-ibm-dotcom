/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, withKnobs } from '@storybook/addon-knobs';
import cx from 'classnames';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';
import VideoPlayer from '../VideoPlayer';

const { prefix } = settings;

storiesOf('Components|VideoPlayer', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
    percy: {
      skip: true,
    },
  })
  .add('Default', () => {
    const inverse = boolean('inverse', false);

    return (
      <div
        className={cx('bx--grid', {
          [`${prefix}--video-player--inverse`]: inverse,
        })}>
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <VideoPlayer
              inverse={inverse}
              videoId="0_uka1msg4"
              showDescription={boolean('Show description', true)}
            />
          </div>
        </div>
      </div>
    );
  });
