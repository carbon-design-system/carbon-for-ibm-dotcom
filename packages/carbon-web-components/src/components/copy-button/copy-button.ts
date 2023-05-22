/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import Copy16 from '@carbon/icons/lib/copy/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './copy-button.scss';
import '../copy/copy';

/**
 * Copy button.
 *
 * @element cds-copy-button
 */
@customElement(`${prefix}-copy-button`)
class CDSCopyButton extends FocusMixin(LitElement) {
  /**
   * Object for additional classes to be added to button.
   */
  @property({ attribute: false })
  buttonClasses = {};

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the string that is displayed when the button is clicked and the content is copi
   */
  @property()
  feedback = 'Copied!';

  /**
   * The number in milliseconds to determine how long the tooltip should remain.
   */
  @property({ type: Number, attribute: 'feedback-timeout' })
  feedbackTimeout = 2000;

  render() {
    const { buttonClasses, disabled, feedback, feedbackTimeout } = this;

    const classes = {
      [`${prefix}--copy-btn`]: true,
      ...buttonClasses,
    };
    return html`
      <cds-copy
        ?disabled=${disabled}
        feedback=${feedback}
        feedback-timeout=${feedbackTimeout}
        .buttonClasses=${classes}>
        ${Copy16({ slot: 'icon', class: `${prefix}--snippet__icon` })}
        <span slot="tooltip-content"><slot></slot></span>
      </cds-copy>
    `;
  }

  static styles = styles;
}

export default CDSCopyButton;
