/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { array, boolean, text } from '@storybook/addon-knobs';
import AudioPlayer from '../AudioPlayer';
import { DDS_AUDIO_PLAYER } from '../../../internal/FeatureFlags';
import React from 'react';
import readme from '../README.stories.mdx';

export default !DDS_AUDIO_PLAYER
  ? undefined
  : {
      title: 'Components/Audio player',
      parameters: {
        ...readme.parameters,
        percy: {
          skip: true,
        },
      },
    };

export const Default = !DDS_AUDIO_PLAYER
  ? undefined
  : ({ parameters }) => {
      const {
        audioId,
        autoPlay,
        showCaptionMenu,
        showPlaybackRateMenu,
        playbackRates,
        customClassName,
      } = parameters?.props?.AudioPlayer ?? {};

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
                  hasSettings={true}
                  showCaptionMenu={showCaptionMenu}
                  showPlaybackRateMenu={showPlaybackRateMenu}
                  playbackRates={playbackRates}
                  autoPlay={autoPlay}
                  customClassName={customClassName}
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

if (Default) {
  Default.story = {
    parameters: {
      knobs: {
        AudioPlayer: ({ groupId }) => ({
          audioId: text("Kaltura's Audio ID (audioId):", '1_gp572bda', groupId),
          autoPlay: boolean(
            'Start widget with audio (autoPlay)',
            false,
            groupId
          ),
          showCaptionMenu: boolean(
            'Show caption menu (showCaptionMenu):',
            true,
            groupId
          ),
          showPlaybackRateMenu: boolean(
            'Show Playback Speed Rate Menu (showPlaybackRateMenu):',
            true,
            groupId
          ),
          playbackRates: array(
            'The available velocities/rates of the playback (playbackRates):',
            [1, 1.5, 2],
            ',',
            groupId
          ),
          customClassName: text(
            'Custom CSS classes added to the main container (customClassName):',
            '',
            groupId
          ),
        }),
      },
    },
  };
}
