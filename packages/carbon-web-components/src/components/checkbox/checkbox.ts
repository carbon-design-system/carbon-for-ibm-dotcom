/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import styles from './checkbox.scss';

/**
 * Check box.
 *
 * @element cds-checkbox
 * @fires cds-checkbox-changed - The custom event fired after this changebox changes its checked state.
 * @csspart input The checkbox.
 * @csspart label The label.
 */
@customElement(`${prefix}-checkbox`)
class CDSCheckbox extends FocusMixin(FormMixin(LitElement)) {
  @query('input')
  protected _checkboxNode!: HTMLInputElement;

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    const { checked, indeterminate } = this._checkboxNode;
    this.checked = checked;
    this.indeterminate = indeterminate;
    const { eventChange } = this.constructor as typeof CDSCheckbox;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          checked,
          indeterminate,
        },
      })
    );
  }

  /**
   * Prevent checkbox state from updating when readonly
   */
  private _handleClick(event: MouseEvent) {
    if (this.readonly) {
      event.preventDefault();
    }
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { checked, disabled, name, value = 'on' } = this;
    if (!disabled && checked) {
      formData.append(name, value);
    }
  }

  /**
   * Specify whether the underlying input should be checked
   */
  @property({ type: Boolean, reflect: true, attribute: 'checked' })
  checked = false;

  /**
   * Specify if checkbox is being used in a data table
   */
  @property({ type: Boolean, reflect: true, attribute: 'data-table' })
  dataTable = false;

  /**
   * Specify whether the Checkbox should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the checkbox should be present in the DOM,
   * but invisible and uninteractable. Used for data-table purposes.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-checkbox' })
  hideCheckbox = false;

  /**
   * Specify whether the label should be hidden, or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The form name.
   */
  @property()
  name!: string;

  /**
   * Specify whether the Checkbox is read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Specify a title for the node for the Checkbox
   */
  @property({ attribute: 'title' })
  title = '';

  /**
   * The value.
   */
  @property()
  value!: string;

  render() {
    const {
      checked,
      disabled,
      hideLabel,
      indeterminate,
      labelText,
      name,
      readonly,
      title,
      value,
      _handleChange: handleChange,
      _handleClick: handleClick,
    } = this;
    const labelClasses = classMap({
      [`${prefix}--checkbox-label`]: true,
    });
    const labelTextClasses = classMap({
      [`${prefix}--checkbox-label-text`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    return html`
      <input
        id="checkbox"
        type="checkbox"
        part="input"
        class="${`${prefix}--checkbox`}"
        aria-checked="${indeterminate ? 'mixed' : String(Boolean(checked))}"
        aria-readonly="${String(Boolean(readonly))}"
        .checked="${checked}"
        ?disabled="${disabled}"
        .indeterminate="${indeterminate}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @change="${handleChange}"
        @click="${handleClick}" />
      <label
        for="checkbox"
        part="label"
        class="${labelClasses}"
        title="${ifDefined(title)}">
        <span class="${labelTextClasses}"><slot>${labelText}</slot></span>
      </label>
    `;
  }

  /**
   * The name of the custom event fired after this changebox changes its checked state.
   */
  static get eventChange() {
    return `${prefix}-checkbox-changed`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSCheckbox;
