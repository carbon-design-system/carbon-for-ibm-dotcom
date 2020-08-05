/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import readme from '../README.stories.mdx';
import VideoPlayer from '../VideoPlayer';

export default {
  title: 'Components|VideoPlayer',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        showCaption: boolean('Show caption (showCaption):', true, groupId),
        aspectRatio: 'default',
        videoId: '0_uka1msg4',
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { showCaption, aspectRatio, videoId } =
    parameters?.props?.VideoPlayer ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <VideoPlayer
            videoId={videoId}
            showCaption={showCaption}
            aspectRatio={aspectRatio}
          />
        </div>
      </div>
    </div>
  );
};

export const aspectRatio1x1 = ({ parameters }) => {
  return <Default parameters={parameters} />;
};

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          showCaption: true,
          aspectRatio: '1x1',
          videoId: '1_9h94wo6b',
        };
      },
    },
  },
};

export const aspectRatio4x3 = ({ parameters }) => (
  <Default parameters={parameters} />
);

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  parameters: {
    props: {
      VideoPlayer: () => {
        return {
          showCation: true,
          aspectRatio: '4x3',
          videoId: '1_p2osmd1z',
        };
      },
    },
  },
};
