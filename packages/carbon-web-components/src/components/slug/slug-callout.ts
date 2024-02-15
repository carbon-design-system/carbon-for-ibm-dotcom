/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSToggleTip from '../toggle-tip/toggletip';
import styles from './slug.scss';
import { SLUG_KIND, SLUG_DOT_TYPE } from './defs';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Basic slug.
 *
 * @element cds-slug
 */
@customElement(`${prefix}-slug-callout`)
export default class CDSSlugCallout extends CDSToggleTip {
  /**
   * Specify the type of dot that should be rendered in front of the inline variant: (default, hollow)
   */
  @property({ reflect: true, attribute: 'dot-type' })
  dotType = SLUG_DOT_TYPE.DEFAULT;

  /**
   * Specify the type of Slug, from the following list of types: (default, hollow, inline)
   */
  @property({ reflect: true })
  kind = SLUG_KIND.DEFAULT;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('autoalign', '');
  }

  updated() {
    super.updated();
    if (
      this.kind !== SLUG_KIND.HOLLOW &&
      this.dotType !== SLUG_DOT_TYPE.HOLLOW
    ) {
      this.setAttribute('enabled', '');
    } else {
      this.removeAttribute('enabled');
    }
  }

  static styles = styles;
}
