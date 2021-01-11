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
import { forEach } from '../../globals/internal/collection-helpers';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Amount of columns used for calculation.
 */

const _colSpan = 3;

/**
 * Function component that handles fade transition for selected elements.
 *
 * @example
 * import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
 * import '@carbon/ibmdotcom-web-components/es/components/fade-in-out/fade-in-out.js';
 *
 * As an example, the function can be called to target all instances of the
 * elements in a list:
 *
 * const list = 'bx--content-block, bx--content-group';
 *
 * For default values of 400ms and 'one and done' play:
 * <dds-fade-in-out selectorTargets="${selectorTargets}"/>
 *
 * With 'continuous play' option:
 * <dds-fade-in-out selectorTargets="${selectorTargets}" iterations="true"/>
 *
 * For custom delay time, set within targeted class in the application's CSS code as such:
 *
 * .bx--content-block {
 *   --#{$dds-prefix}--fade-in-out-delay: 250ms;
 * }
 *
 * @element dds-fade-in-out
 */
@customElement(`${ddsPrefix}-fade-in-out`)
class DDSFadeInOut extends StableSelectorMixin(LitElement) {
  /**
   * Intersection Observer that watches outer viewport.
   *
   * @private
   */
  private _rootObserver: IntersectionObserver | null = null;

  /**
   * Intersection observer that watches the inner viewport.
   *
   * @private
   */
  private _innerObserver: IntersectionObserver | null = null;

  /**
   * Resize observer to trigger rootMargin recalculations
   *
   * @private
   */
  private _resizeObserver: any | null = null;

  /**
   * Root margin option for inner observer.
   *
   * @private
   */
  private _rootMargin?: string;

  /**
   * The inner viewport calculation for the root margins.
   *
   * This calculation is done to retrieve the best fitting top and bottom
   * margin for the fade animation to trigger/remove from elements in a
   * user's screen.
   *
   * The resulting value is the optimal point where a user's attention will be
   * grabbed by the animation without restricting their view and perception of
   * the adopting website. The displayed elements will keep the user's attention
   * for a longer time as they scroll down the website.
   *
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  private _getViewportMargin() {
    return `-${((document.documentElement.clientHeight * _colSpan) / breakpoints.max.columns).toString()}px 0px`;
  }

  /**
   * Cleans observers upon update or exit, and creates new instances if needed.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateObservers({ create }: { create?: boolean } = {}) {
    this._cleanAndCreateRootObserver();
    this._cleanAndCreateInnerObserver();
    this._cleanAndCreateResizeObserver();

    if (create) {
      this._cleanAndCreateRootObserver({ create: true });
      this._cleanAndCreateResizeObserver({ create: true });

      const { selectorTargets } = this;
      if (selectorTargets) {
        forEach(this.ownerDocument!.querySelectorAll(selectorTargets), item => {
          this._rootObserver?.observe(item);
        });
      }
      this._resizeObserver.observe(this.ownerDocument!.documentElement);
    }
  }

  /**
   * Cleans-up and creats the root intersection observer.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateRootObserver({ create }: { create?: boolean } = {}) {
    if (this._rootObserver) {
      this._rootObserver.disconnect();
      this._rootObserver = null;
    }

    if (create) {
      this._rootObserver = new IntersectionObserver(this._handleExit);
    }
  }

  /**
   * Cleans-up and creats the inner intersection observer.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateInnerObserver({ create }: { create?: boolean } = {}) {
    if (this._innerObserver) {
      this._innerObserver.disconnect();
      this._innerObserver = null;
    }

    if (create) {
      this._innerObserver = new IntersectionObserver(this._handleEntrance.bind(this), { rootMargin: this._rootMargin });
      const { selectorTargets } = this;
      if (selectorTargets) {
        forEach(this.ownerDocument!.querySelectorAll(selectorTargets), item => {
          this._innerObserver?.observe(item);
        });
      }
    }
  }

  /**
   * Cleans-up and creats the resize observer.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateResizeObserver({ create }: { create?: boolean } = {}) {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }

    if (create) {
      // TODO: Wait for `.d.ts` update to support `ResizeObserver`
      // @ts-ignore
      this._resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    }
  }

  /**
   * Handler to add recalculated rootMargin to observer.
   *
   * @private
   */
  private handleResize() {
    this._rootMargin = this._getViewportMargin();
    this._cleanAndCreateInnerObserver({ create: true });
  }

  /**
   * Handler to add fade animation to element
   *
   * @param {*} records observed elements
   * @private
   */
  private _handleEntrance = (records: IntersectionObserverEntry[]) => {
    records.forEach(({ intersectionRatio, target }) => {
      if (intersectionRatio > 0) {
        target.classList.remove('bx--fade-out');
        target.classList.add('bx--fade-in');
        if (!this.keepAnimation) {
          this._rootObserver?.unobserve(target);
          this._innerObserver?.unobserve(target);
        }
      }
    });
  };

  /**
   * Handler to remove element from view
   *
   * @param {*} records observed elements
   *
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  private _handleExit(records: IntersectionObserverEntry[]) {
    records.forEach(({ intersectionRatio, target }) => {
      if (intersectionRatio === 0) {
        target.classList.remove('bx--fade-in');
        target.classList.add('bx--fade-out');
      }
    });
  }

  /**
   * Iteration boolean for continuous play option.
   *
   * `true` to keep fade in/out behavior during the entire component lifecycle,
   * `false` to do it only once.
   *
   */
  @property({ type: Boolean, attribute: 'keep-animation' })
  keepAnimation = false;

  /**
   * The CSS selector that selects all fade in-out target elements.
   */
  @property({ attribute: 'selector-targets' })
  selectorTargets?: string;

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObservers({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateObservers();
    super.disconnectedCallback();
  }
}

export default DDSFadeInOut;
