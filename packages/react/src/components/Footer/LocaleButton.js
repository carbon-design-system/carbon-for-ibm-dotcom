import React, { useState } from 'react';
import { Button } from 'carbon-components-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Globe20 } from '@carbon/icons-react';
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
 *
 * @returns {object} JSX object
 */
const LocaleButton = ({ displayLang }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${prefix}--locale-btn__container`}>
      <Button
        data-autoid={`${stablePrefix}--locale-btn`}
        className={`${prefix}--locale-btn`}
        kind="secondary"
        onClick={open}
        renderIcon={Globe20}>
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
};

export default LocaleButton;
