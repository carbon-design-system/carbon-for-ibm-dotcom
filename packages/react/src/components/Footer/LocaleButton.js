/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import EarthFilled20 from '@carbon/icons-react/es/earth--filled/20';
import LocaleModal from '../LocaleModal/LocaleModal';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Renders the locale button.
 */
const LocaleButton = ({ displayLang, aria }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${prefix}--locale-btn__container`}>
      <Button
        data-autoid={`${stablePrefix}--locale-btn`}
        className={`${prefix}--locale-btn`}
        kind="secondary"
        onClick={open}
        renderIcon={EarthFilled20}
        iconDescription="Earth Filled Icon"
        aria-label={aria}>
        {displayLang}
      </Button>

      {isOpen && <LocaleModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );

  /**
   * Sets modal state to open
   *
   * @private
   */
  function open() {
    setIsOpen(true);
  }
};

LocaleButton.propTypes = {
  /**
   * Display language for locale button.
   */
  displayLang: PropTypes.string,

  /**
   * `aria-label`` value.
   */
  aria: PropTypes.string,
};

export default LocaleButton;
