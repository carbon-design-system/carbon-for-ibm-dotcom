/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, query } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import BXLink from 'carbon-web-components/es/components/link/link';

/**
 * Link.
 */
class DDSLink extends BXLink {
  @query('#link')
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
    const { disabled, download, href, hreflang, linkRole, ping, rel, target, type, _classes: classes } = this;
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
          >
            ${this._renderInner()}
          </a>
        `;
  }
}

export default DDSLink;
