/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import { breakpoints } from '@carbon/layout';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { forEach } from '../../globals/internal/collection-helpers';
import { ANIMATION_TYPE } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Amount of columns used for calculation.
 */

const colSpan = 3;

/**
 * Function component that handles fade or slide transition for selected elements.
 *
 * @example
 * import '@carbon/ibmdotcom-styles/scss/components/scroll-into-view/_scroll-into-view.scss';
 * import '@carbon/ibmdotcom-web-components/es/components/scroll-animations/scroll-animations.js';
 *
 * As an example, the function can be called to target all instances of the
 * elements in a list:
 *
 * const list = '${prefix}--content-block, ${prefix}--content-group';
 *
 * For default values of 400ms and 'one and done' play:
 * <dds-scroll-animations selectorTargets="${selectorTargets}">
 *  // some content
 * </dds-scroll-animations>
 *
 * With 'continuous play' option:
 * <dds-scroll-animations selector-targets="${selectorTargets}" keep-animation="true">
 *   // some content
 * </dds-scroll-animations>
 *
 * For custom delay time, set within targeted class in the application's CSS code as such:
 *
 * .${prefix}--content-block {
 *   --#{$dds-prefix}--scroll-animations-delay: 250ms;
 * }
 *
 * @element dds-scroll-animations
 */
@customElement(`${ddsPrefix}-scroll-animations`)
class DDSScrollAnimations extends StableSelectorMixin(LitElement) {
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
   * Scroll animation class to be applied when element is within viewport.
   *
   * @private
   */
  private _effectClass?: string;

  /**
   * Scroll animation to be applied when elements are out of view.
   *
   * @private
   */
  private _exitEffectClass?: string;

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
        forEach(this.querySelectorAll(selectorTargets), (item) => {
          this._rootObserver?.observe(item);
        });
      }
      this._resizeObserver.observe(this.ownerDocument!.documentElement);
    }
  }

  /**
   * Cleans-up and creates the root intersection observer.
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
      this._rootObserver = new IntersectionObserver(
        this._handleExit.bind(this)
      );
    }
  }

  /**
   * Cleans-up and creates the inner intersection observer.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   * @param [options.viewportMargin] recalculated margin value for the observer
   */
  private _cleanAndCreateInnerObserver({
    create,
    viewportMargin,
  }: { create?: boolean; viewportMargin?: string } = {}) {
    if (this._innerObserver) {
      this._innerObserver.disconnect();
      this._innerObserver = null;
    }

    if (create) {
      this._innerObserver = new IntersectionObserver(
        this._handleEntrance.bind(this),
        { rootMargin: viewportMargin }
      );
      const { selectorTargets } = this;
      if (selectorTargets) {
        forEach(this.querySelectorAll(selectorTargets), (item) => {
          this._innerObserver?.observe(item);
        });
      }
    }
  }

  /**
   * Cleans-up and creates the resize observer.
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
      this._resizeObserver = new ResizeObserver(this._handleResize.bind(this));
    }
  }

  /**
   * Handler to add recalculated rootMargin to observer upon resize.
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
  private _handleResize() {
    this._cleanAndCreateInnerObserver({
      create: true,
      viewportMargin: `-${(
        (this.ownerDocument!.documentElement.clientHeight * colSpan) /
        breakpoints.max.columns
      ).toString()}px 0px`,
    });
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
        target.classList.remove(`${this._exitEffectClass}`);
        target.classList.add(`${this._effectClass}`);
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
        target.classList.remove(`${this._effectClass}`);
        target.classList.add(`${this._exitEffectClass}`);
      }
    });
  }

  /**
   * Sets the proper class names to be applied when element is within/out of view.
   *
   * @private
   */
  private _setAnimationClasses() {
    switch (this.animation) {
      case ANIMATION_TYPE.SLIDE_UP:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-up`;
        break;
      case ANIMATION_TYPE.SLIDE_UP_RIGHT:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-up-right`;
        break;
      case ANIMATION_TYPE.SLIDE_RIGHT:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-right`;
        break;
      case ANIMATION_TYPE.SLIDE_DOWN_RIGHT:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-down-right`;
        break;
      case ANIMATION_TYPE.SLIDE_DOWN:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-down`;
        break;
      case ANIMATION_TYPE.SLIDE_DOWN_LEFT:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-down-left`;
        break;
      case ANIMATION_TYPE.SLIDE_LEFT:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-left`;
        break;
      case ANIMATION_TYPE.SLIDE_UP_LEFT:
        this._effectClass = `${prefix}--slide-in`;
        this._exitEffectClass = `${prefix}--slide-up-left`;
        break;
      case ANIMATION_TYPE.FADE:
      default:
        this._effectClass = `${prefix}--fade-in`;
        this._exitEffectClass = `${prefix}--fade-out`;
        break;
    }
  }

  @property()
  animation?: string = 'fade';

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
   * The CSS selector string that selects all fade in-out target elements.
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

  updated(changedProperties) {
    if (changedProperties.has('animation')) {
      this._setAnimationClasses();
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--scroll-animations`;
  }
}

export default DDSScrollAnimations;
