/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import cx from 'classnames';
import React from 'react';
import readme from '../README.stories.mdx';
import settings from 'carbon-components/es/globals/js/settings';
import VideoPlayer from '../VideoPlayer';

const { prefix } = settings;

const ratios = ['default', '4x3', '2x1', '1x1'];

export default {
  title: 'Components|VideoPlayer',

  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        inverse: boolean('inverse', false, groupId),
        showCaption: boolean('Show caption (showCaption):', true, groupId),
        aspectRatio: select(
          'Aspect ratio (aspectRatio):',
          ratios,
          ratios[0],
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { inverse, showCaption, aspectRatio } =
    parameters?.props?.VideoPlayer ?? {};

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
            showCaption={showCaption}
            aspectRatio={aspectRatio}
          />
        </div>
      </div>
    </div>
  );
};
