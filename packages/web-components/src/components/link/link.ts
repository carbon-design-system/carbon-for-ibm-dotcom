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
 */
class DDSLink extends BXLink {
  @query('#link')
  protected _linkNode?: HTMLAnchorElement | HTMLParagraphElement;

  /**
   * Handles `click` event on the `<a>`.
   */
  protected _handleClickLink() {} // eslint-disable-line class-methods-use-this

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
    const {
      disabled,
      download,
      href,
      hreflang,
      linkRole,
      ping,
      rel,
      target,
      type,
      _classes: classes,
      _handleClickLink: handleClickLink,
    } = this;
    return disabled
      ? html`
          <p id="link" class="${classes}">${this._renderInner()}</p>
        `
      : html`
          <a
            id="link"
            role="${ifNonNull(linkRole)}"
            class="${classes}"
            download="${ifNonNull(download)}"
            href="${ifNonNull(href)}"
            hreflang="${ifNonNull(hreflang)}"
            ping="${ifNonNull(ping)}"
            rel="${ifNonNull(rel)}"
            target="${ifNonNull(target)}"
            type="${ifNonNull(type)}"
            @click="${handleClickLink}"
          >
            ${this._renderInner()}
          </a>
        `;
  }
}

export default DDSLink;
