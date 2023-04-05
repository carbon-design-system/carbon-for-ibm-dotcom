/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, query, state } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import DDSMegaMenu from './megamenu';
import DDSTopNav from './top-nav';
import DDSTopNavMenu from './top-nav-menu';
import DDSMegaMenuOverlay from './megamenu-overlay';
import styles from './masthead.scss';
import DDSMastheadContainer from './masthead-container';
import { CMApp } from './masthead-composite';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Megamenu top nav menu.
 *
 * @element dds-megamenu-top-nav-menu
 */
@customElement(`${ddsPrefix}-megamenu-top-nav-menu`)
class DDSMegaMenuTopNavMenu extends DDSTopNavMenu {
  /**
   * The megamenu component
   */
  @property()
  megaMenu!: DDSMegaMenu;

  /**
   * The menu ul node.
   */
  @query(`.${prefix}--header__menu`)
  private _menuNode!: HTMLElement;

  /**
   * The trigger button.
   */
  @query('[part="trigger"]')
  private _topMenuItem!: HTMLAnchorElement;

  /**
   * scrollbar width.
   */
  @state()
  private _scrollBarWidth =
    this.ownerDocument!.defaultView!.innerWidth -
    this.ownerDocument!.body.offsetWidth;

  /**
   * Removes inherited _handleBlur method from BXHeaderMenu
   */
  private _handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.expanded = false;
      this._topMenuItem.focus();
    }
  };

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
      .constructor as typeof DDSMegaMenuTopNavMenu;

    this.style.setProperty(
      customPropertyViewportWidth,
      `${contentRect.width}px`
    );
  };

  private _setAnalyticsAttributes() {
    const { _triggerNode: trigger } = this;

    trigger!.setAttribute('data-attribute1', 'headerNav');
    trigger!.setAttribute('data-attribute2', 'L0');
    trigger!.setAttribute('data-attribute3', this.menuLabel);
  }

  private async _requestMegaMenuRenderUpdate() {
    return new Promise((resolve: Function): void => {
      this.dispatchEvent(
        new CustomEvent('dds-megamenu-top-nav-menu-toggle', {
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
    this.addEventListener('keydown', this._handleKeydown);
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
      // Import needed subcomponents on first expansion
      if (!(this.parentElement as DDSTopNav)?.importedMegamenu) {
        await import('./megamenu-left-navigation');
        await import('./megamenu-category-link');
        await import('./megamenu-category-link-group');
        await import('./megamenu-category-group');
        await import('./megamenu-category-group-copy');
        await import('./megamenu-category-heading');
        await import('./megamenu-link-with-icon');
        await import('./megamenu-overlay');
        await import('./megamenu-tab');
        await import('./megamenu-tabs');
        (this.parentElement as DDSTopNav).importedMegamenu = true;
      }

      const doc = this.getRootNode() as Document;
      forEach(
        doc.querySelectorAll(
          (this.constructor as typeof DDSMegaMenuTopNavMenu).selectorOverlay
        ),
        (item) => {
          (item as DDSMegaMenuOverlay).active = this.expanded;
        }
      );

      const mastheadContainer = this.closest(`
        ${ddsPrefix}-masthead-container,
        ${ddsPrefix}-cloud-masthead-container`) as DDSMastheadContainer;

      // add the scrollbar width as right-margin to prevent content from shifting when
      // scrollbar disappears on megamenu expand
      const masthead: HTMLElement | null = doc.querySelector('dds-masthead');

      // determine whether to apply margin-right on expand as HC has extra masthead styling
      const cloudMasthead: HTMLElement | null | undefined = doc
        .querySelector('dds-cloud-masthead-container')
        ?.querySelector('dds-masthead');

      if (this.expanded) {
        /**
         * This is a workaround to minimize the chat module. Currently no minimize methods exist.
         *
         * @see https://github.ibm.com/live-advisor/cm-app
         */
        if (mastheadContainer?.contactModuleApp) {
          (mastheadContainer.contactModuleApp as CMApp).init();
        }
        // Ask masthead-composite to render megamenu.
        // Pause further execution until the render is complete.
        await this._requestMegaMenuRenderUpdate();

        doc.body.style.marginInlineStart = `${this._scrollBarWidth}px`;
        doc.body.style.overflow = 'hidden';
        forEach(
          doc.querySelectorAll(
            (this.constructor as typeof DDSMegaMenuTopNavMenu).selectorOverlay
          ),
          (item) => {
            (item as DDSMegaMenuOverlay).active = this.expanded;
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

    if (changedProperties.has('menuLabel')) {
      this._setAnalyticsAttributes();
    }
  }

  /**
   * The CSS custom property name for the live viewport width.
   */
  static get customPropertyViewportWidth() {
    return `--${ddsPrefix}-ce--viewport-width`;
  }

  /**
   * A selector that will return the overlays.
   */
  static get selectorOverlay() {
    return `${ddsPrefix}-megamenu-overlay`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMegaMenuTopNavMenu;
