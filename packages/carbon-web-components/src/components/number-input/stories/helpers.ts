/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import { INPUT_SIZE } from '../../input/input';

const sizes = {
  Regular: null,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Extra large size (${INPUT_SIZE.EXTRA_LARGE})`]: INPUT_SIZE.EXTRA_LARGE,
};

const createProps = ({ boolean, textNullable, number, select, text }) => ({
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('Hide label (hide-label)', false),
  hideSteppers: boolean('Hide steppers (hide-steppers)', false),
  invalid: boolean('Invalid (invalid)', false),
  invalidText: text('Invalid text (invalid-text)', 'Number is not valid'),
  label: text('Label (label)', 'number-input label'),
  readonly: boolean('Read only (readonly)', false),
  value: number('Input value (value)', 50),
  warn: boolean('Warn (warn)', false),
  warnText: text('Warn text (warn-text)', 'Warning text'),
  min: number('Minimum value (min)', 0),
  max: number('Maximum value (max)', 100),
  step: number('Value to step the input by (step)', 1),
  size: select('Input size (size)', sizes, INPUT_SIZE.SMALL),
  onInput: action('input'),
  mobile: boolean('Mobile mode (mobile)', false),
});

export default createProps;
