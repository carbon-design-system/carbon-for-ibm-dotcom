/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@percy/cypress';
import './commands';
import serializeDOM from '@percy/dom';

// Workaround, @percy/cypress was not properly loading in PercyDOM
if (window) {
  window.PercyDOM = {
    serialize: serializeDOM,
  };
}
