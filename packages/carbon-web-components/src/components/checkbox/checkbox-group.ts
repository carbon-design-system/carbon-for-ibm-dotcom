/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import CDSCheckbox from './checkbox';
import styles from './checkbox.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Check box group.
 *
 * @element cds-checkbox-group
 * @csspart fieldset - The fieldset element wrapping the group. Usage: `cds-checkbox-group::part(input)`
 * @csspart input - The checkbox. Usage: `cds-checkbox-group::part(input)`
 * @csspart label - The label. Usage: `cds-checkbox-group::part(label)`
 * @csspart helper-text - The helper text. Usage: `cds-checkbox-group::part(helper-text)`
 * @csspart validation-msg - The validation message. Usage: `cds-checkbox-group::part(validation-msg)`
 * @csspart invalid-icon - Icon for invalid input. Usage: `cds-checkbox-group::part(invalid-icon)`
 * @csspart invalid-text - Text for invalid input. Usage: `cds-checkbox-group::part(invalid-text)`
 * @csspart invalid-icon--warning - Icon for warnings. Usage: `cds-checkbox-group::part(invalid-icon--warning)`
 * @csspart invalid-text--warning - Text for warnings. Usage: `cds-checkbox-group::part(invalid-text--warning)`
 */
@customElement(`${prefix}-checkbox-group`)
class CDSCheckboxGroup extends LitElement {
  /**
   * fieldset `aria-labelledby`
   */
  @property({ type: String, reflect: true, attribute: 'aria-labelledby' })
  ariaLabelledBy;

  /**
   * Specify whether the form group is currently disabled
   */
  @property({ type: Boolean })
  disabled;

  /**
   * Provide text for the form group for additional help
   */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText;

  /**
   * Specify whether the form group is currently invalid
   */
  @property({ type: Boolean, attribute: 'invalid' })
  invalid;

  /**
   * Provide the text that is displayed when the form group is in an invalid state
   */
  @property({ type: String, reflect: true, attribute: 'invalid-text' })
  invalidText;

  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  @property({ type: String, reflect: true, attribute: 'legend-id' })
  legendId;

  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  @property({ type: String, reflect: true, attribute: 'legend-text' })
  legendText;

  /**
   * Whether the CheckboxGroup should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Specify whether the form group is currently in warning state
   */
  @property({ type: Boolean, reflect: true })
  warn = false;

  /**
   * Provide the text that is displayed when the form group is in warning state
   */
  @property({ type: String, reflect: true, attribute: 'warn-text' })
  warnText = '';

  /*
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSCheckboxGroup).slugItem
            )
          : false
      );

    this._hasSlug = Boolean(hasContent);
    (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    this.requestUpdate();
  }

  /**
   * `true` if there is a slug.
   */
  protected _hasSlug = false;

  updated(changedProperties) {
    const { selectorCheckbox } = this.constructor as typeof CDSCheckboxGroup;
    const checkboxes = this.querySelectorAll(selectorCheckbox);
    ['disabled', 'readonly'].forEach((name) => {
      if (changedProperties.has(name)) {
        const { [name as keyof CDSCheckboxGroup]: value } = this;
        // Propagate the property to descendants until `:host-context()` gets supported in all major browsers
        checkboxes.forEach((elem) => {
          (elem as CDSCheckbox)[name] = value;
        });
      }
    });
    if (changedProperties.has('invalid')) {
      const { invalid } = this;
      checkboxes.forEach((elem) => {
        if (invalid) {
          (elem as CDSCheckbox).setAttribute('invalid-group', '');
        } else {
          (elem as CDSCheckbox).removeAttribute('invalid-group');
        }
      });
    }
  }

  render() {
    const {
      ariaLabelledBy,
      disabled,
      helperText,
      invalid,
      invalidText,
      legendId,
      legendText,
      readonly,
      warn,
      warnText,
      _hasSlug: hasSlug,
      _handleSlotChange: handleSlotChange,
    } = this;

    const showWarning = !readonly && !invalid && warn;
    const showHelper = !invalid && !warn;

    const checkboxGroupInstanceId = Math.random().toString(16).slice(2);

    const helperId = !helperText
      ? undefined
      : `checkbox-group-helper-text-${checkboxGroupInstanceId}`;

    const helper = helperText
      ? html` <div
          id="${helperId}"
          class="${prefix}--form__helper-text"
          part="helper-text">
          ${helperText}
        </div>`
      : null;

    const fieldsetClasses = classMap({
      [`${prefix}--checkbox-group`]: true,
      [`${prefix}--checkbox-group--readonly`]: readonly,
      [`${prefix}--checkbox-group--invalid`]: !readonly && invalid,
      [`${prefix}--checkbox-group--warning`]: showWarning,
      [`${prefix}--checkbox-group--slug`]: hasSlug,
    });

    return html`
      <fieldset
        part="fieldset"
        class="${fieldsetClasses}"
        ?data-invalid=${invalid}
        ?disabled=${disabled}
        aria-readonly=${readonly}
        ?aria-labelledby=${ariaLabelledBy || legendId}
        ?aria-describedby=${!invalid && !warn && helper ? helperId : undefined}>
        <legend
          class="${prefix}--label"
          id=${legendId || ariaLabelledBy}
          part="label">
          ${legendText}
          <slot name="slug" @slotchange="${handleSlotChange}"></slot>
        </legend>
        <slot></slot>
        <div
          class="${prefix}--checkbox-group__validation-msg"
          part="validation-msg">
          ${!readonly && invalid
            ? html`
                ${WarningFilled16({
                  class: `${prefix}--checkbox__invalid-icon`,
                  part: `invalid-icon`,
                })}
                <div class="${prefix}--form-requirement" part="invalid-text">
                  ${invalidText}
                </div>
              `
            : null}
          ${showWarning
            ? html`
                ${WarningAltFilled16({
                  class: `${prefix}--checkbox__invalid-icon ${prefix}--checkbox__invalid-icon--warning`,
                  part: `invalid-icon invalid-icon--warning`,
                })}
                <div
                  class="${prefix}--form-requirement"
                  part="invalid-text invalid-text--warning">
                  ${warnText}
                </div>
              `
            : null}
        </div>
        ${showHelper ? helper : null}
      </fieldset>
    `;
  }

  /**
   * A selector that will return the checkboxes.
   */
  static get selectorCheckbox() {
    return `${prefix}-checkbox`;
  }

  /**
   * A selector that will return the slug item.
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSCheckboxGroup;
