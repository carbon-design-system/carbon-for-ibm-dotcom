import { FOOTER_LOCALE_BUTTON } from '../../internal/FeatureFlags.js';
import { featureFlag } from '@carbon/ibmdotcom-utilities';

import React, { useState } from 'react';
import { Button } from 'carbon-components-react';
import LocaleModal from '../LocaleModal/LocaleModal';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { Globe20 } from '@carbon/icons-react';
import PropTypes from 'prop-types';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * EXPERIMENTAL: Renders the locale button
 *
 * @private
 *
 * @returns {object} JSX object
 */
const LocaleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${prefix}--locale-btn__container`}>
      <Button
        data-autoid={`${stablePrefix}--locale-btn`}
        className={`${prefix}--locale-btn`}
        kind="secondary"
        onClick={open}
        renderIcon={Globe20}>
        United States — English
      </Button>

      <LocaleModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        availabilityText="Choose your preferred location and language"
      />
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

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{selectItem: shim}}
 */
LocaleButton.propTypes = {
  selectItem: PropTypes.func,
};

/**
 * @property defaultProps
 * @type {{selectItem: Function}}
 */
LocaleButton.defaultProps = {
  selectItem: () => {},
};

export default LocaleButton;
