/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './button-group.scss';
import C4DButton from '../button/button';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Button group item.
 *
 * @element c4d-button-group-item
 */
@customElement(`${c4dPrefix}-button-group-item`)
class C4DButtonGroupItem extends C4DButton {
  private _anchorObserver?: MutationObserver;

  static get stableSelector() {
    return `${c4dPrefix}--button-group-item`;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }

    this._inheritStateFromAnchor();
    this._observeAnchorForStateChanges();
  }

  disconnectedCallback() {
    this._anchorObserver?.disconnect();
    super.disconnectedCallback();
  }

  /**
   * Copy button state from a wrapping <a> if present
   */
  private _inheritStateFromAnchor() {
    const parent = this.parentElement;

    if (!parent || parent.tagName !== 'A') {
      return;
    }

    const STATE_ATTRS = ['kind', 'size', 'isexpressive'];

    STATE_ATTRS.forEach((attr) => {
      if (parent.hasAttribute(attr)) {
        const value = parent.getAttribute(attr);
        if (value !== null && this.getAttribute(attr) !== value) {
          this.setAttribute(attr, value);
        }
      }
    });

    // Dev-only warning (fires once per instance)
    if (
      process.env.NODE_ENV !== 'production' &&
      parent.hasAttribute('kind') &&
      !this.hasAttribute('data-anchor-kind-warning')
    ) {
      console.warn(
        'Button state was provided on a wrapping <a>. ' +
          'It should be set directly on <c4d-button-group-item>. ' +
          'State is being synced automatically.'
      );
      this.setAttribute('data-anchor-kind-warning', '');
    }
  }

  /**
   * Observe parent <a> for late-added attributes
   */
  private _observeAnchorForStateChanges() {
    const parent = this.parentElement;

    if (!parent || parent.tagName !== 'A') {
      return;
    }

    this._anchorObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          this._inheritStateFromAnchor();
        }
      }
    });

    this._anchorObserver.observe(parent, {
      attributes: true,
      attributeFilter: ['kind', 'size', 'isexpressive'],
    });
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DButtonGroupItem;
