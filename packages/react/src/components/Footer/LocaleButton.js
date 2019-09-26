import { FOOTER_LOCALE_BUTTON } from '../../internal/FeatureFlags.js';
import { featureFlag } from '@carbon/ibmdotcom-utilities';

import React, { useState } from 'react';
import {
  Button,
  ComposedModal,
  ModalHeader,
  ModalBody,
} from 'carbon-components-react';
import { settings } from '@carbon/ibmdotcom-utilities';
import { settings as carbonSettings } from 'carbon-components';
import { Globe20 } from '@carbon/icons-react';

const { prefix } = settings;
const cPrefix = carbonSettings.prefix;

/**
 * EXPERIMENTAL: Renders the locale button
 *
 * @private
 * @returns {object} JSX object
 */
const LocaleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return featureFlag(
    FOOTER_LOCALE_BUTTON,
    <div className={`${cPrefix}--locale-btn__container`}>
      <Button
        data-autoid={`${prefix}--locale-btn`}
        className={`${cPrefix}--locale-btn`}
        kind="secondary"
        onClick={open}
        renderIcon={Globe20}>
        United States — English
      </Button>

      <ComposedModal
        open={isOpen}
        onClose={close}
        data-autoid={`${prefix}--locale-modal`}>
        <ModalHeader
          label="United States — English"
          title="Select your region"
        />
        <ModalBody>
          <p className={`${cPrefix}--modal-content__text`}>
            Placeholder text for now
          </p>
        </ModalBody>
      </ComposedModal>
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

  /**
   * Sets modal state to closed
   *
   * @private
   */
  function close() {
    setIsOpen(false);
  }
};

export default LocaleButton;
