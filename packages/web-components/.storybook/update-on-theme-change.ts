/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from '@storybook/addons';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';
import { LitElement } from 'lit-element';

export default selector => {
  addons.getChannel().on(CURRENT_THEME, () => {
    (document.querySelector(selector) as LitElement).requestUpdate();
  });
};
