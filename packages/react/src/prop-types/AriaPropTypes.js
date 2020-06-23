/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import isRequiredOneOf from './isRequiredOneOf';

// DEPRECATED. Use `packages/react/src/internal/vendor/carbon-components-react/prop-types/AriaPropTypes.js` instead
export const AriaLabelPropType = isRequiredOneOf({
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
});
