/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Filter20 from '../../internal/vendor/@carbon/web-components/icons/filter/20.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import CDSSelect from '../../internal/vendor/@carbon/web-components/components/select/select.js';
import { INPUT_SIZE } from '../../internal/vendor/@carbon/web-components/components/text-input/text-input.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { filter } from '../../globals/internal/collection-helpers';
import styles from './search-with-typeahead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: ddsPrefix } = settings;

/**
 * Scoped search dropdown - mobile version.
 * The dropdown to scope the search suggestions in mobile
 *
 * @element dds-scoped-search-dropdown-mobile
 * @internal
 */
@customElement(`${ddsPrefix}-scoped-search-dropdown-mobile`)
class DDSScopedSearchDropdownMobile extends CDSSelect {
  /**
   * The `value` for placeholder `<option>`.
   */
  private _placeholderItemValueMobile = `__${prefix}-select-placeholder_${Math.random()
    .toString(36)
    .slice(2)}`;

  /**
   * Handles `oninput` event on the `<input>`
   *
   * @param event The event.
   */
  private _handleInputMobile({ target }: Event) {
    const { value } = target as HTMLSelectElement;
    this.value = value;
    const { eventSelect } = this.constructor as typeof CDSSelect;
    this.dispatchEvent(
      new CustomEvent(eventSelect, {
        bubbles: true,
        composed: true,
        detail: {
          appId: value,
        },
      })
    );
  }

  /**
   * @param element The parent element containing pseudo `<optgroup>`/`<option>`.
   * @returns The template containing child `<optgroup>`/`<option>` that will be rendered to shadow DOM.
   */
  private _renderItemsMobile(element) {
    const { selectorItem, selectorLeafItem } = this
      .constructor as typeof CDSSelect;
    // Harvests attributes from `<cds-select-item>` and `<cds-select-item-group>`.
    // Does not use properties to avoid delay in attribute to property mapping, which runs in custom element reaction cycle:
    // https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions
    return html`
      ${filter(
        element.childNodes,
        (item) =>
          item.nodeType === Node.ELEMENT_NODE &&
          (item as Element).matches(selectorItem)
      ).map((item) => {
        const disabled = item.hasAttribute('disabled');
        const label = item.getAttribute('label');
        const selected = item.hasAttribute('selected');
        const value = item.getAttribute('value');
        const { textContent } = item;
        return item.matches(selectorLeafItem)
          ? html`
              <option
                class="${prefix}--select-option"
                ?disabled="${disabled}"
                label="${ifDefined(label ?? textContent)}"
                ?selected="${selected}"
                value="${ifDefined(value)}">
                ${textContent}
              </option>
            `
          : html`
              <optgroup
                class="${prefix}--select-optgroup"
                ?disabled="${disabled}"
                label="${ifDefined(label)}">
                ${this._renderItemsMobile(item)}
              </optgroup>
            `;
      })}
    `;
  }

  /**
   * Property that specifies the Select to have size xl
   *
   * @internal
   */
  @property()
  size = INPUT_SIZE.EXTRA_LARGE;

  render() {
    const {
      disabled,
      helperText,
      invalid,
      labelText,
      placeholder,
      size,
      invalidText,
      value,
      _placeholderItemValueMobile: placeholderItemValue,
      _handleInputMobile: handleInput,
    } = this;

    const inputClasses = classMap({
      [`${prefix}--select-input`]: true,
      [`${prefix}--select-input--${size}`]: size,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: disabled,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    const supplementalText = !invalid
      ? html`
          <div class="${helperTextClasses}">
            <slot name="helper-text"> ${helperText} </slot>
          </div>
        `
      : html`
          <div class="${prefix}--form-requirement" id="validity-message">
            <slot name="validity-message"> ${invalidText} </slot>
          </div>
        `;

    return html`
      <label class="${labelClasses}" for="input">
        <slot name="label-text"> ${labelText} </slot>
      </label>
      <div class="${prefix}--select-input__wrapper" ?data-invalid="${invalid}">
        <select
          id="input"
          class="${inputClasses}"
          ?disabled="${disabled}"
          aria-invalid="${String(Boolean(invalid))}"
          aria-describedby="${ifDefined(
            !invalid ? undefined : 'validity-message'
          )}"
          @input="${handleInput}">
          ${!placeholder || value
            ? undefined
            : html`
                <option
                  disabled
                  hidden
                  class="${prefix}--select-option"
                  value="${placeholderItemValue}"
                  selected>
                  ${placeholder}
                </option>
              `}
          ${this._renderItemsMobile(this)}
        </select>
        ${Filter20({ class: `${prefix}--select__arrow` })}
      </div>
      ${supplementalText}
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSScopedSearchDropdownMobile;
