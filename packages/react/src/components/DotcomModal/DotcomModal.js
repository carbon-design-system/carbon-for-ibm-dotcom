/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { Modal } from 'carbon-components-react';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Dotcom Modal component
 *
 * @param {Array} dotcomButtons array of buttons for DotcomModal
 * @returns {*} DotcomModal component
 */
const DotcomModal = ({ children, dotcomButtons, ...props }) => {
  return (
    <Modal
      data-autoid={`${stablePrefix}--dotcom-modal`}
      className={`${prefix}--dotcom-modal`}
      {...props}>
      {children}

      {dotcomButtons && dotcomButtons.length > 0 && (
        <div className={`${prefix}--dotcom-modal-footer`}>
          <ButtonGroup buttons={dotcomButtons} />
        </div>
      )}
    </Modal>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 *
 * @type {{children: object, dotcomButtons: array, props: object}}
 */
DotcomModal.propTypes = {
  children: PropTypes.array,
  dotcomButtons: PropTypes.array,
};

export default DotcomModal;
