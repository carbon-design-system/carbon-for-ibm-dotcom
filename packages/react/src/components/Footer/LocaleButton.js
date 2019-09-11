import React, { useState } from 'react';
import {
  Button,
  ComposedModal,
  ModalHeader,
  ModalBody,
} from 'carbon-components-react';
import { settings } from 'carbon-components';
import { Globe20 } from '@carbon/icons-react';

const { prefix } = settings;

/**
 * EXPERIMENTAL: Renders the locale button
 *
 * @private
 * @returns {object} JSX object
 */
const LocaleButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return window.localeButton ? (
    <div className={`${prefix}--locale-btn__container`}>
      <Button
        data-autoid="locale-btn"
        className={`${prefix}--locale-btn`}
        kind="secondary"
        onClick={open}
        renderIcon={Globe20}>
        United States — English
      </Button>

      <ComposedModal open={isOpen} onClose={close} data-autoid="locale-modal">
        <ModalHeader
          label="United States — English"
          title="Select your region"
        />
        <ModalBody>
          <p className={`${prefix}--modal-content__text`}>
            Placeholder text for now
          </p>
        </ModalBody>
      </ComposedModal>
    </div>
  ) : null;

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
