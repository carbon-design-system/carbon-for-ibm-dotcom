/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';
import Forward1032 from '@carbon/icons-react/es/forward--10/32';
import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services/es/services';
import PropTypes from 'prop-types';
import React from 'react';
import Rewind_1032 from '@carbon/icons-react/es/rewind--10/32';
import settings from 'carbon-components/es/globals/js/settings';
import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';

const { prefix } = settings;

const AudioPlayerScrubber = ({
  kalturaDigitalPlayer,
  audioTime,
  setAudioTime,
  audioDuration,
  setDisplayVolumeControl,
  rewindHelperText,
  forwardHelperText,
}) => {
  const audioDurationAsString = KalturaPlayerAPI.getMediaDuration(
    audioDuration
  ); // Audio Total Time

  const handleFormat = (minMax, minOrMaxLabel) => {
    return minOrMaxLabel;
  };

  const handleRewindForwardAudio = addedValue => {
    if (kalturaDigitalPlayer) {
      let time = audioTime + addedValue;
      time = time < 0 ? 0 : time;
      time = time >= audioDuration ? audioDuration : time;

      kalturaDigitalPlayer.sendNotification('doSeek', time);
      setAudioTime(time);
      // Hide the Volume Control Bar if Opened
      setDisplayVolumeControl(false);
    }
  };

  const handleScrubberChange = time => {
    /**
     * As this will trigger every time the updatePlayhead listener triggers
     *  and we floor the floating value returned, sometimes it will return like
     *  1.123 -> Floored to 1
     *  then next tick / callback will return
     *  1.98123 -> Floored to 1
     * Meaning that this function will trigger and set the second
     *  on the player to 1 - making it go back in the audio time
     *  and thus generating a really SAD choke/gulp in the audio
     * So this function should ONLY trigger if the absolute difference
     *  of the new scrubber time is bigger then 1 from the previou time value
     */
    if (Math.abs(time - audioTime) >= 1 && kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification('doSeek', time);
      setAudioTime(time);
      // Hide the Volume Control Bar if Opened
      setDisplayVolumeControl(false);
    }
  };

  return (
    <>
      <Button
        renderIcon={Rewind_1032}
        iconDescription={rewindHelperText}
        hasIconOnly
        kind="ghost"
        tooltipPosition="top"
        onClick={() => {
          handleRewindForwardAudio(-10);
        }}
        disabled={!kalturaDigitalPlayer}
      />

      <div className={`${prefix}--audio-player__audio-time`}>
        <Slider
          min={0}
          max={audioDuration}
          minLabel={KalturaPlayerAPI.getMediaDuration(audioTime)}
          maxLabel={audioDurationAsString}
          value={audioTime}
          onChange={({ value }) => handleScrubberChange(value)}
          hideTextInput
          formatLabel={(value, minOrMaxLabel) =>
            handleFormat(value, minOrMaxLabel)
          }
          step={1}
          stepMultiplier={10}
          disabled={!kalturaDigitalPlayer}
        />
      </div>

      <Button
        renderIcon={Forward1032}
        iconDescription={forwardHelperText}
        hasIconOnly
        kind="ghost"
        tooltipPosition="top"
        onClick={() => {
          handleRewindForwardAudio(10);
        }}
        disabled={!kalturaDigitalPlayer}
      />
    </>
  );
};

AudioPlayerScrubber.propTypes = {
  /**
   * The kaltura digital player (KDP) object
   * It starts as false and gets morphed into the html element
   *  of the target player id reference during the kaltura player
   *  embeding process as soon as the kaltura ready callback triggers
   */
  kalturaDigitalPlayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  /**
   * The state getter for the current audio time (in seconds)
   */
  audioTime: PropTypes.number.isRequired,
  /**
   * The setter function for the current audio time (in seconds)
   */
  setAudioTime: PropTypes.func.isRequired,
  /**
   * The duration of the audio (in seconds)
   */
  audioDuration: PropTypes.number.isRequired,
  /**
   * The state setter that show/hide the custom volume menu
   */
  setDisplayVolumeControl: PropTypes.func.isRequired,
  /**
   * The helper text label for the rewind button
   */
  rewindHelperText: PropTypes.string,
  /**
   * The helper text label for the rewind button
   */
  forwardHelperText: PropTypes.string,
};

AudioPlayerScrubber.defaultProps = {
  kalturaDigitalPlayer: false,
  audioTime: 0,
  audioDuration: 0,
  rewindHelperText: 'Rewind 10 seconds',
  forwardHelperText: 'Forward 10 seconds',
};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerScrubber;
