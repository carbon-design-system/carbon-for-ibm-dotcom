/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, query } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import BXLink from 'carbon-web-components/es/components/link/link.js';

/**
 * Link.
 *
 * @csspart link The link element displayed as an <a /> tag (regular link) or <p /> (disabled link)
 */
class DDSLink extends BXLink {
  @query('#link')
  protected _linkNode?: HTMLAnchorElement | HTMLParagraphElement;

  /**
   * Handles `click` event on the `<a>`.
   */
  protected _handleClick() {} // eslint-disable-line class-methods-use-this

  /**
   * @returns The inner content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderInner() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <p id="link" part="link" class="${classes}">${this._renderInner()}</p>
    `;
  }

  /**
   * @returns The link content.
   */
  protected _renderLink() {
    const { download, href, hreflang, linkRole, ping, rel, target, type, _classes: classes, _handleClick: handleClick } = this;
    return html`
      <a
        id="link"
        role="${ifNonNull(linkRole)}"
        class="${classes}"
        part="link"
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}"
        hreflang="${ifNonNull(hreflang)}"
        ping="${ifNonNull(ping)}"
        rel="${ifNonNull(rel)}"
        target="${ifNonNull(target)}"
        type="${ifNonNull(type)}"
        @click="${handleClick}"
      >
        ${this._renderInner()}
      </a>
    `;
  }

  render() {
    const { disabled } = this;
    return disabled ? this._renderDisabledLink() : this._renderLink();
  }
}

export default DDSLink;
