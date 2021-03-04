/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import settings from 'carbon-components/es/globals/js/settings.js';
import throttle from 'lodash-es/throttle.js';
import UpToTop20 from 'carbon-web-components/es/icons/up-to-top/20.js';
import styles from './back-to-top.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;
interface Cancelable {
  cancel(): void;
}

/**
 * Back to top
 *
 * @element dds-back-to-top
 */
@customElement(`${ddsPrefix}-back-to-top`)
class DDSBackToTop extends HostListenerMixin(LitElement) {
  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * The observer for the resize of the document body.
   */
  private _observerResizeBody: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * The document height
   */
  private _bodyHeight!: number;

  /**
   * The viewport height
   */
  private _windowHeight!: number;

  /**
   * The handler for throttled scrolling
   */
  private _throttleScroll: (((event: Event) => void) & Cancelable) | null = null;

  /**
   * Button click scrolls to top
   */
  // eslint-disable-next-line class-methods-use-this
  private _handleOnClick() {
    this.ownerDocument!.defaultView!.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Button visible when one full page length is scrolled if _showBackToTop is true
   */
  private _handleOnScroll() {
    if (this._showBackToTop()) {
      this.hidden = this.ownerDocument!.documentElement.scrollTop <= this._windowHeight;
    }
  }

  /**
   * Cleans-up and creats the resize observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResize({ create }: { create?: boolean } = {}) {
    if (this._observerResizeRoot) {
      this._observerResizeRoot.disconnect();
      this._observerResizeRoot = null;
    }
    if (this._observerResizeBody) {
      this._observerResizeBody.disconnect();
      this._observerResizeBody = null;
    }
    if (create) {
      // TODO: Wait for `.d.ts` update to support `ResizeObserver`
      // @ts-ignore
      this._observerResizeRoot = new ResizeObserver(this._observeResizeRoot);
      this._observerResizeRoot.observe(this.ownerDocument!.documentElement);
      // TODO: Wait for `.d.ts` update to support `ResizeObserver`
      // @ts-ignore
      this._observerResizeBody = new ResizeObserver(this._observeResizeBody);
      this._observerResizeBody.observe(this.ownerDocument!.body);
    }
  }

  private _observeResizeRoot = entries => {
    this._windowHeight = entries[entries.length - 1].contentRect.height;
  };

  private _observeResizeBody = entries => {
    this._bodyHeight = entries[entries.length - 1].target.scrollHeight;
  };

  /**
   * Show button only when document height is 3x greater than viewport
   */
  private _showBackToTop() {
    return this._bodyHeight > this._windowHeight * 3;
  }

  /**
   * `false` if the button should be visible
   */
  @property({ type: Boolean, reflect: true })
  hidden = true;

  @HostListener('window:scroll')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleScroll = (event: Event) => {
    this._throttleScroll!(event);
  };

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
    if (!this._throttleScroll) {
      this._throttleScroll = throttle(this._handleOnScroll, 250);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanAndCreateObserverResize();
    if (this._throttleScroll) {
      this._throttleScroll.cancel();
      this._throttleScroll = null;
    }
  }

  firstUpdated() {
    this._cleanAndCreateObserverResize({ create: true });
  }

  render() {
    const { _handleOnClick: handleOnClick } = this;
    return html`
      <button
        class="${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--icon-only ${prefix}--back-to-top__btn"
        @click="${handleOnClick}"
      >
        ${UpToTop20()}
      </button>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--back-to-top`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSBackToTop;
