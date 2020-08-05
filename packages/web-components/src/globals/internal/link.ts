/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, query } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import BXLink from 'carbon-web-components/es/components/link/link';

const { prefix } = settings;

/**
 * Link.
 */
class DDSLink extends BXLink {
  @query('#button')
  protected _linkNode?: HTMLAnchorElement | HTMLParagraphElement;

  /**
   * @returns The inner content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderInner() {
    return html`
      <slot></slot>
    `;
  }

  render() {
    const { disabled, download, href, hreflang, ping, rel, target, type } = this;
    const classes = classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
    });
    return html`
      <a
        id="button"
        role="button"
        class="${classes}"
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}"
        hreflang="${ifNonNull(hreflang)}"
        ping="${ifNonNull(ping)}"
        rel="${ifNonNull(rel)}"
        target="${ifNonNull(target)}"
        type="${ifNonNull(type)}"
        @click="${this._handleClickLink}"
      >
        ${this._renderInner()}
      </a>
    `;
  }
}

export default DDSLink;
