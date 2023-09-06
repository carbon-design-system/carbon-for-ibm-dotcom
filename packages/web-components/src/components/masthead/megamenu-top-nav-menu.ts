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
import { forEach } from '../../globals/internal/collection-helpers';
import C4DMegaMenu from './megamenu';
import C4DTopNav from './top-nav';
import C4DTopNavMenu from './top-nav-menu';
import C4DMegaMenuOverlay from './megamenu-overlay';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

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
      this.dispatchEvent(
        new CustomEvent('c4d-megamenu-top-nav-menu-toggle', {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            active: this.expanded,
            resolveFn: resolve,
          },
        })
      );

      setTimeout(() => {
        resolve();
      }, 5000);
    });
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

    if (this.hasAttribute('role') && this.getAttribute('role') === 'listitem') {
      this.removeAttribute('role');
    }
  }

  async updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('expanded')) {
      const doc = this.getRootNode() as Document;
      forEach(
        doc.querySelectorAll(
          (this.constructor as typeof C4DMegaMenuTopNavMenu).selectorOverlay
        ),
        (item) => {
          (item as C4DMegaMenuOverlay).active = this.expanded;
        }
      );

      // add the scrollbar width as right-margin to prevent content from shifting when
      // scrollbar disappears on megamenu expand
      const masthead: HTMLElement | null = doc.querySelector('c4d-masthead');

      // determine whether to apply margin-right on expand as HC has extra masthead styling
      const cloudMasthead: HTMLElement | null | undefined = doc
        .querySelector('c4d-cloud-masthead-container')
        ?.querySelector('c4d-masthead');

      if (this.expanded) {
        // Import needed subcomponents on first expansion
        if (!(this.parentElement as C4DTopNav).importedMegamenu) {
          await import('./megamenu-left-navigation');
          await import('./megamenu-category-link');
          await import('./megamenu-category-group');
          await import('./megamenu-category-group-copy');
          await import('./megamenu-link-with-icon');
          await import('./megamenu-overlay');
          (this.parentElement as C4DTopNav).importedMegamenu = true;
        }

        // Ask masthead-composite to render megamenu.
        // Pause further execution until the render is complete.
        await this._requestMegaMenuRenderUpdate();

        document.body.style.marginInlineStart = `${this._scrollBarWidth}px`;
        document.body.style.overflow = 'hidden';
        forEach(
          doc.querySelectorAll(
            (this.constructor as typeof C4DMegaMenuTopNavMenu).selectorOverlay
          ),
          (item) => {
            (item as C4DMegaMenuOverlay).active = this.expanded;
          }
        );

        if (cloudMasthead) {
          if (
            doc.body.classList.contains('ibm-masthead-sticky') &&
            doc.body.classList.contains('ibm-masthead-sticky-showing')
          ) {
            cloudMasthead.style.marginInlineEnd = `${this._scrollBarWidth}px`;
          }
        } else if (masthead) {
          masthead.style.marginInlineEnd = `${this._scrollBarWidth}px`;
        }
      } else {
        document.body.style.marginInlineStart = '0px';
        document.body.style.overflow = '';
        if (cloudMasthead) {
          if (
            doc.body.classList.contains('ibm-masthead-sticky') &&
            doc.body.classList.contains('ibm-masthead-sticky-showing')
          ) {
            cloudMasthead.style.marginInlineEnd = '0px';
          }
        } else if (masthead) {
          masthead.style.marginInlineEnd = '0px';
        }

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
      }
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

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DMegaMenuTopNavMenu;
