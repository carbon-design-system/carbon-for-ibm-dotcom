/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';
import PropTypes from 'prop-types';
import React from 'react';

const AudioPlayerDisabledButton = ({ icon }) => {
  return (
    <Button
      renderIcon={icon}
      iconDescription="Disabled"
      hasIconOnly
      kind="ghost"
      disabled={true}
    />
  );
};

AudioPlayerDisabledButton.propTypes = {
  /**
   * The icon that the button should render
   */
  icon: PropTypes.object,
};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerDisabledButton;
