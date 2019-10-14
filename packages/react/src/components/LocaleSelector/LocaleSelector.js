/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { DotcomModal } from '../DotcomModal';

const { stablePrefix } = ddsSettings;

/**
 * LocaleSelector component
 *
 * @param {Array} buttons array of buttons for LocaleSelector
 * @returns {*} LocaleSelector component
 */
const LocaleSelector = ({ children, buttons, ...props }) => {
  return (
    <DotcomModal
      data-autoid={`${stablePrefix}--dotcom__locale-selector`}
      dotcomButtons={buttons}
      {...props}>
      {children}
    </DotcomModal>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 *
 * @type {{children: object, buttons: array}}
 */
LocaleSelector.propTypes = {
  children: PropTypes.array,
  buttons: PropTypes.array,
};

export default LocaleSelector;
