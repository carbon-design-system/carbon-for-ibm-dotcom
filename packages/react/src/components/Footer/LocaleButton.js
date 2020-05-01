import React, { useState } from 'react';
import { Button } from 'carbon-components-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { EarthFilled20 } from '@carbon/icons-react';
import LocaleModal from '../LocaleModal/LocaleModal';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Renders the locale button
 *
 * @param {object} props props object
 * @param {string} props.displayLang display language for locale button
 * @param {string} props.aria aria-label value
 *
 * @returns {object} JSX object
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
  displayLang: PropTypes.string,
  aria: PropTypes.string,
};

export default LocaleButton;
