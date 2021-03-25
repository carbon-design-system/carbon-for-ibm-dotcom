/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AudioPlayer from '../AudioPlayer';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|AudioPlayer',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = ({ parameters }) => {
  const { showCaption, aspectRatio, audioId } =
    parameters?.props?.AudioPlayer ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-8 bx--col-lg-16 bx--col-xlg-16 bx--col-max-16">
          <div
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AudioPlayer
              audioId={audioId}
              showCaption={showCaption}
              aspectRatio={aspectRatio}
              hasSettings={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      AudioPlayer: ({ groupId }) => ({
        showCaption: boolean('Show caption (showCaption):', true, groupId),
        aspectRatio: 'default',
        audioId: '1_9h94wo6b',
      }),
    },
  },
};
