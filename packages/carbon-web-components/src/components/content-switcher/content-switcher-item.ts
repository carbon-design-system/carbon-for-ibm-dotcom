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
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './content-switcher.scss';

/**
 * Content switcher button.
 *
 * @element cds-content-switcher-item
 */
@customElement(`${prefix}-content-switcher-item`)
class BXContentSwitcherItem extends FocusMixin(LitElement) {
  /**
   * `true` if this content switcher item should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` to hide the divider at the left.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-divider' })
  hideDivider = false;

  /**
   * `true` if the content switcher button should be selected.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The element ID of target panel.
   */
  @property()
  target!: string;

  /**
   * The `value` attribute that is set to the parent `<cds-content-switcher>` when this content switcher item is selected.
   */
  @property()
  value = '';

  shouldUpdate(changedProperties) {
    if (changedProperties.has('selected') || changedProperties.has('target')) {
      const { selected, target } = this;
      if (target) {
        const doc = this.getRootNode() as HTMLDocument;
        // `doc` can be an element if such element is orphaned
        const targetNode = doc.getElementById && doc.getElementById(target);
        if (targetNode) {
          targetNode.toggleAttribute('hidden', !selected);
        }
      }
    }
    return true;
  }

  render() {
    const { disabled, selected, target } = this;
    const className = classMap({
      [`${prefix}--content-switcher-btn`]: true,
      [`${prefix}--content-switcher--selected`]: selected,
    });
    return html`
      <button
        type="button"
        role="tab"
        class="${className}"
        ?disabled="${disabled}"
        tabindex="${selected ? '0' : '-1'}"
        aria-controls="${ifDefined(target)}"
        aria-selected="${Boolean(selected)}">
        <span class="${prefix}--content-switcher__label"><slot></slot></span>
      </button>
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default BXContentSwitcherItem;
