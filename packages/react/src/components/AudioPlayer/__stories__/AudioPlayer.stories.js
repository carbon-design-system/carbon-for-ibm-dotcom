/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { array, boolean, text } from '@storybook/addon-knobs';
import AudioPlayer from '../AudioPlayer';
import React from 'react';
import readme from '../README.stories.mdx';

const props = () => ({
  audioId: text("Kaltura's Audio ID (audioId):", '1_gp572bda'),
  autoPlay: boolean('Start widget with audio (autoPlay)', false),
  showCaptionMenu: boolean('Show caption menu (showCaptionMenu):', true),
  showPlaybackRateMenu: boolean(
    'Show Playback Speed Rate Menu (showPlaybackRateMenu):',
    true
  ),
  playbackRates: array(
    'The available velocities/rates of the playback (playbackRates):',
    [1, 1.5, 2],
    ','
  ),
  customClassName: text(
    'Custom CSS classes added to the main container (customClassName):',
    ''
  ),
});

export default {
  title: 'Components/Audio player',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = () => {
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
            }}
          >
            <AudioPlayer {...props()} hasSettings={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
