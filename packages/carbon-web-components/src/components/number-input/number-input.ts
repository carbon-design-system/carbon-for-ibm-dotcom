/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import Add16 from '@carbon/icons/lib/add/16';
import Subtract16 from '@carbon/icons/lib/subtract/16';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import { NUMBER_INPUT_VALIDATION_STATUS } from './defs';
import styles from './number-input.scss';
import BXInput, { INPUT_SIZE } from '../input/input';

export { NUMBER_INPUT_VALIDATION_STATUS };

/**
 * Number input.
 *
 * @element cds-number-input
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-number-input`)
class CDSNumberInput extends BXInput {
  /**
   * Handles `input` event on the `<input>` in the shadow DOM.
   */
  protected _handleInput(event: Event) {
    const { target } = event;
    const { value } = target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value,
        },
      })
    );
    super._handleInput(event);
  }

  /**
   * Handles `click` event on the up button in the shadow DOM.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _handleUserInitiatedStepDown(_: Event) {
    const { _input: input } = this;
    this.stepDown();
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: input.value,
        },
      })
    );
  }

  /**
   * Handles `click` event on the down button in the shadow DOM.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _handleUserInitiatedStepUp(_: Event) {
    const { _input: input } = this;
    this.stepUp();
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSNumberInput).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: input.value,
        },
      })
    );
  }

  /**
   * The underlying input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  _testValidity() {
    if (this._input?.valueAsNumber > Number(this.max)) {
      return NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM;
    }
    if (this._input?.valueAsNumber < Number(this.min)) {
      return NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM;
    }
    return super._testValidity();
  }

  _getValidityMessage(state: string) {
    return super._getValidityMessage(state);
  }

  protected _min = '';

  protected _max = '';

  protected _step = '1';

  /**
   * The minimum value allowed in the input
   */
  @property({ reflect: true })
  get min() {
    return this._min.toString();
  }

  set min(value) {
    const oldValue = this.min;
    this._min = value;
    this.requestUpdate('min', oldValue);
  }

  /**
   * The maximum value allowed in the input
   */
  @property({ reflect: true })
  get max() {
    return this._max.toString();
  }

  set max(value) {
    const oldValue = this.max;
    this._max = value;
    this.requestUpdate('max', oldValue);
  }

  /**
   * The amount the value should increase or decrease by
   */
  @property({ reflect: true })
  get step() {
    return this._step.toString();
  }

  set step(value) {
    const oldValue = this.step;
    this._step = value;
    this.requestUpdate('step', oldValue);
  }

  /**
   * Set to `true` to enable the mobile variant of the number input
   */
  @property({ type: Boolean, reflect: true })
  mobile = false;

  /**
   * Aria text for the button that increments the value
   */
  @property({ attribute: 'increment-button-assistive-text' })
  incrementButtonAssistiveText = 'increase number input';

  /**
   * Aria text for the button that decrements the value
   */
  @property({ attribute: 'decrement-button-assistive-text' })
  decrementButtonAssistiveText = 'decrease number input';

  /**
   * Message which is displayed if the value is invalid.
   */
  @property({ attribute: 'invalid-text' })
  invalidText = 'Number is not valid';

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  @property({ attribute: 'hide-label', type: Boolean, reflect: true })
  hideLabel = false;

  /**
   * Message which is displayed if the value is invalid.
   */
  @property({ attribute: 'label' })
  label = 'label text';

  /**
   * The input box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.REGULAR;

  /**
   * Handles incrementing the value in the input
   */
  stepUp() {
    this._input.stepUp();
  }

  /**
   * Handles decrementing the value in the input
   */
  stepDown() {
    this._input.stepDown();
  }

  render() {
    const {
      _handleInput: handleInput,
      _handleUserInitiatedStepDown: handleUserInitiatedStepDown,
      _handleUserInitiatedStepUp: handleUserInitiatedStepUp,
    } = this;

    const invalidIcon = WarningFilled16({
      class: `${prefix}--number__invalid`,
    });

    const validity = this._testValidity();

    const isGenericallyInvalid = () =>
      this.invalid &&
      validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM &&
      validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM;

    const wrapperClasses = classMap({
      [`${prefix}--number`]: true,
      [`${prefix}--number--${this.colorScheme}`]: this.colorScheme,
      [`${prefix}--number--mobile`]: this.mobile,
      [`${prefix}--number--${this.size}`]: this.size,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: this.disabled,
      [`${prefix}--visually-hidden`]: this.hideLabel,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    const incrementButton = html`
      <button
        class="${prefix}--number__control-btn up-icon"
        aria-label="${this.incrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${this.disabled}
        @click=${handleUserInitiatedStepUp}>
        ${Add16()}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;
    const decrementButton = html`
      <button
        class="${prefix}--number__control-btn down-icon"
        aria-label="${this.decrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${this.disabled}
        @click=${handleUserInitiatedStepDown}>
        ${Subtract16()}
      </button>
      <div class="${prefix}--number__rule-divider"></div>
    `;

    const input = html`
      <input
        ?autocomplete="${this.autocomplete}"
        ?autofocus="${this.autofocus}"
        ?data-invalid="${this.invalid}"
        ?disabled="${this.disabled}"
        id="input"
        name="${ifNonEmpty(this.name)}"
        pattern="${ifNonEmpty(this.pattern)}"
        placeholder="${ifNonEmpty(this.placeholder)}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        type="number"
        .value="${this._value}"
        @input="${handleInput}"
        min="${ifNonEmpty(this.min)}"
        max="${ifNonEmpty(this.max)}"
        step="${ifNonEmpty(this.step)}"
        role="alert"
        aria-atomic="true" />
    `;

    const defaultLayout = html`
      ${this.invalid ? invalidIcon : null} ${input}
      <div class="${prefix}--number__controls">
        ${incrementButton} ${decrementButton}
      </div>
    `;

    const mobileLayout = html` ${decrementButton} ${input} ${incrementButton} `;

    return html`
      <div class="${wrapperClasses}" ?data-invalid=${this.invalid}>
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${this.label} </slot>
        </label>
        <div class="${prefix}--number__input-wrapper">
          ${this.mobile ? mobileLayout : defaultLayout}
        </div>
        <div class="${helperTextClasses}" ?hidden="${isGenericallyInvalid()}">
          <slot name="helper-text"> ${this.helperText} </slot>
        </div>
        <div
          class="${prefix}--form-requirement"
          ?hidden="${!isGenericallyInvalid()}">
          <slot name="invalid-text"> ${this.invalidText} </slot>
        </div>
      </div>
    `;
  }

  /**
   * The name of the custom event fired after the value is changed upon a user gesture.
   */
  static get eventInput() {
    return `${prefix}-number-input`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSNumberInput;
