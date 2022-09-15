/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { customElement } from 'lit-element';
import BXDropdownItem from '../dropdown/dropdown-item';
import styles from './combo-box.scss';

const { prefix } = settings;

/**
 * Combo box item.
 * @element bx-combo-box-item
 */
@customElement(`${prefix}-combo-box-item`)
class BXComboBoxItem extends BXDropdownItem {
  static styles = styles;
}

export default BXComboBoxItem;
