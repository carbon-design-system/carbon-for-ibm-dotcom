/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, LitElement } from 'lit-element';
import { breakpoints } from '@carbon/layout';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that wraps around others to induce fade effect.
 *
 * @element dds-fade-in-out
 */
@customElement(`${ddsPrefix}-fade-in-out`)
class DDSFadeInOut extends StableSelectorMixin(LitElement) {
  /**
   * Elements that are to be targeted with the animation
   */
  @property({ attribute: false })
  elementList?: string[];

  /**
   * Iteration boolean for continuous play option.
   *
   */
  @property({ type: Boolean, attribute: 'iterations' })
  _iterations = false;

  /**
   * Amount of columns used for calculation.
   *
   * @private
   */

  private _colSpan = 3;

  /**
   * Intersection Observer that watches outer viewport.
   *
   * @private
   */

  private _rootObserver;

  /**
   * Intersection observer that watches the inner viewport.
   *
   * @private
   */

  private _innerObserver;

  /**
   * Resize observer to trigger rootMargin recalculations
   *
   * @private
   */
  private _resizeObserver;

  /**
   * Intersection Observer options
   *
   * @private
   */

  private _options = {
    rootMargin: this._getViewportMargin(),
    threshold: 0,
  };

  /**
   * The inner viewport calculation for the root margins.
   *
   * @private
   */

  private _getViewportMargin() {
    return `-${((document.documentElement.clientHeight * this._colSpan) / breakpoints.max.columns).toString()}px 0px`;
  }

  /**
   * Component that handles fade transition for selected elements.
   *
   * @example
   * import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
   * import '@carbon/ibmdotcom-web-components/es/components/fade-in-out/fade-in-out.js';
   *
   * As an example, the function can be called to target all instances of the
   * elements in a list:
   *
   * const list = ['.bx--content-block', 'bx--content-group'];
   *
   * For default values of 400ms and 'one and done' play:
   * <dds-fade-in-out element-list="${JSON.stringify(list)}"/>
   *
   * With 'continuous play' option:
   * <dds-fade-in-out element-list="${JSON.stringify(elementList)}" iterations="true"/>
   *
   * For custom delay time, set within targeted class in the application's CSS code as such:
   *
   * .bx--content-block {
   *   --#{$dds-prefix}--scroll-into-view-delay: 250ms;
   * }
   *
   * @param {boolean} create to create new observer instances
   */

  private _cleanAndCreateObservers({ create }: { create?: boolean } = {}) {
    if (this._rootObserver) {
      this._rootObserver.disconnect();
      this._innerObserver.disconnect();
      this._resizeObserver.disconnect();
      this._rootObserver = null;
      this._innerObserver = null;
      this._resizeObserver = null;
    }

    if (create) {
      this._rootObserver = new IntersectionObserver(this.handleExit);
      this._innerObserver = new IntersectionObserver(this.handleEntrance.bind(this), this._options);
      this._resizeObserver = new ResizeObserver(this.handleResize.bind(this));

      this.elementList?.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(e => {
          this._rootObserver.observe(e);
          this._innerObserver.observe(e);
        });
      });
      this._resizeObserver.observe(document.documentElement);
    }
  }

  /**
   * Handler to add recalculated rootMargin to observer.
   *
   * @private
   *
   */

  private handleResize() {
    this._options.rootMargin = this._getViewportMargin();
    this._innerObserver = new IntersectionObserver(this.handleEntrance.bind(this), this._options);
  }

  /**
   * Handler to add fade animation to element
   *
   * @param {*} entries observed elements
   * @private
   *
   */

  private handleEntrance(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.remove('bx--fade-out');
        entry.target.classList.add('bx--fade-in');
        if (!this._iterations) {
          this._rootObserver.unobserve(entry.target);
          this._innerObserver.unobserve(entry.target);
        }
      }
    });
  }

  /**
   * Handler to remove element from view
   *
   * @param {*} entries observed elements
   *
   * @private
   *
   */

  static handleExit(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio === 0) {
        entry.target.classList.remove('bx--fade-in');
        entry.target.classList.add('bx--fade-out');
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObservers({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateObservers();
    super.disconnectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--fade-in-out`;
  }
}

export default DDSFadeInOut;
