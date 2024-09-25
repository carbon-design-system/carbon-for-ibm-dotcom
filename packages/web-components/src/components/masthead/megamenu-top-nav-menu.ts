/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { query, state, property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DMegaMenu from './megamenu';
import C4DTopNav from './top-nav';
import C4DTopNavMenu from './top-nav-menu';
import C4DMegaMenuOverlay from './megamenu-overlay';
import styles from './masthead.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Megamenu top nav menu.
 *
 * @element c4d-megamenu-top-nav-menu
 */
@customElement(`${c4dPrefix}-megamenu-top-nav-menu`)
class C4DMegaMenuTopNavMenu extends C4DTopNavMenu {
  /**
   * The megamenu component
   */
  @property()
  megaMenu!: C4DMegaMenu;

  /**
   * The menu ul node.
   */
  @query(`.${prefix}--header__menu`)
  private _menuNode!: HTMLElement;

  /**
   * scrollbar width.
   */
  @state()
  private _scrollBarWidth =
    this.ownerDocument!.defaultView!.innerWidth -
    this.ownerDocument!.body.offsetWidth;

  /**
   * Identifier for this menu's position in a series.
   */
  menuIndex: number | undefined;

  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

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
    if (create) {
      // TODO: Wait for `.d.ts` update to support `ResizeObserver`
      // @ts-ignore
      this._observerResizeRoot = new ResizeObserver(this._observeResizeRoot);
      this._observerResizeRoot.observe(this.ownerDocument!.documentElement);
    }
  }

  /**
   * The observer for the resize of the viewport.
   */
  private _observeResizeRoot = (records) => {
    const { contentRect } = records[records.length - 1];
    // A workaround for Safari bug where `100vw` in Shadow DOM causes delayed rendering
    // https://github.com/carbon-design-system/carbon-for-ibm-dotcom/issues/4493
    const { customPropertyViewportWidth } = this
      .constructor as typeof C4DMegaMenuTopNavMenu;

    this.style.setProperty(
      customPropertyViewportWidth,
      `${contentRect.width}px`
    );
  };

  private async _requestMegaMenuRenderUpdate() {
    return new Promise((resolve: Function): void => {
      const { eventMegaMenuToggled } = this
        .constructor as typeof C4DMegaMenuTopNavMenu;
      this.dispatchEvent(
        new CustomEvent(eventMegaMenuToggled, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            active: this.expanded,
            index: this.menuIndex,
            resolveFn: resolve,
          },
        })
      );

      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }

  private _setAnalyticsAttributes() {
    const { _topMenuItem: trigger } = this;

    trigger!.setAttribute('data-attribute1', 'headerNav');
    trigger!.setAttribute('data-attribute2', 'L0');
    trigger!.setAttribute('data-attribute3', this.menuLabel);
  }

  /**
   * Sets inline styles on an element to accommodate any scrollbars that push it
   * out of Carbon grid alignment.
   *
   * @private
   */
  private _handleScrollbarOffset(element: HTMLElement) {
    element.style.marginInlineEnd = this.expanded
      ? `${this._scrollBarWidth}px`
      : `0px`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateObserverResize();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._menuNode.removeAttribute('role');
    this._cleanAndCreateObserverResize({ create: true });
    this._setAnalyticsAttributes();

    if (this.hasAttribute('role') && this.getAttribute('role') === 'listitem') {
      this.removeAttribute('role');
    }
  }

  async updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('expanded')) {
      const doc = this.ownerDocument;
      const rootNode = this.getRootNode() as ShadowRoot;
      const masthead = rootNode.querySelector('c4d-masthead');

      // Find overlay and update its state.
      const overlays = rootNode.querySelectorAll(
        (this.constructor as typeof C4DMegaMenuTopNavMenu).selectorOverlay
      );
      overlays.forEach((item) => {
        (item as C4DMegaMenuOverlay).active = this.expanded;
      });

      // Collect elements that should have offsets applied to accommodate any
      // scrollbars when they appear in the layout.
      const elementsToAdjust = [
        doc.body,
        masthead?.shadowRoot?.querySelector(`.${prefix}--masthead__l0`),
        masthead?.querySelector(`${c4dPrefix}-masthead-l1`),
      ].filter((element) => element instanceof HTMLElement) as HTMLElement[];

      if (this.expanded) {
        // Import needed subcomponents on first expansion
        if (!(this.parentElement as C4DTopNav)?.importedMegamenu) {
          await Promise.all([
            import('./megamenu-left-navigation'),
            import('./megamenu-category-link'),
            import('./megamenu-category-link-group'),
            import('./megamenu-category-group'),
            import('./megamenu-category-group-copy'),
            import('./megamenu-category-heading'),
            import('./megamenu-link-with-icon'),
            import('./megamenu-overlay'),
            import('./megamenu-tab'),
            import('./megamenu-tabs'),
          ]);
          (this.parentElement as C4DTopNav).importedMegamenu = true;
        }

        // Ask masthead-composite to render megamenu.
        // Pause further execution until the render is complete.
        await this._requestMegaMenuRenderUpdate();

        // Lock document to prevent scrolling while menu is open.
        doc.body.style.overflow = `hidden`;

        // Set scrollbar adjustments.
        elementsToAdjust.forEach((element) =>
          this._handleScrollbarOffset(element)
        );
      } else {
        /**
         * Return focus to topMenuItem only when expanded explicitly equals false.
         * On load, when expanded is undefined, avoid taking control of focus.
         * This is deliberately in a 0ms timeout to put the check at the end of
         * the event loop to avoid interrupting the browser's focus handoff.
         */
        if (changedProperties.get('expanded') === false) {
          setTimeout(() => {
            const { activeElement } = document;
            if (
              activeElement === null ||
              activeElement.tagName.toLowerCase() === 'body'
            ) {
              this._topMenuItem.focus();
            }
          }, 0);
        }

        // Ask masthead-composite to un-render megamenu.
        // Wait long enough for the transition to end.
        setTimeout(() => {
          this._requestMegaMenuRenderUpdate();
        }, 500);

        // Unlock document to enable scrolling once menu is closed.
        doc.body.style.overflow = '';

        // Unset scrollbar adjustments.
        elementsToAdjust.forEach((element) =>
          this._handleScrollbarOffset(element)
        );
      }
    }

    if (changedProperties.has('menuLabel')) {
      this._setAnalyticsAttributes();
    }
  }

  /**
   * The CSS custom property name for the live viewport width.
   */
  static get customPropertyViewportWidth() {
    return `--${c4dPrefix}-ce--viewport-width`;
  }

  /**
   * A selector that will return the overlays.
   */
  static get selectorOverlay() {
    return `${c4dPrefix}-megamenu-overlay`;
  }

  /**
   * The custom event name for when a megamenu is toggled.
   */
  static get eventMegaMenuToggled() {
    return `${c4dPrefix}-megamenu-top-nav-menu-toggle`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DMegaMenuTopNavMenu;
