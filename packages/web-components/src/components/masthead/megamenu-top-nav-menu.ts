/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, query, state } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import DDSTopNavMenu from './top-nav-menu';
import DDSMegaMenuOverlay from './megamenu-overlay';
import styles from './masthead.scss';

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

    if (this.hasAttribute('role') && this.getAttribute('role') === 'listitem') {
      this.removeAttribute('role');
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('expanded')) {
      const doc = this.getRootNode() as Document;
      forEach(
        doc.querySelectorAll(
          (this.constructor as typeof DDSMegaMenuTopNavMenu).selectorOverlay
        ),
        (item) => {
          (item as DDSMegaMenuOverlay).active = this.expanded;
        }
      );

      // add the scrollbar width as right-margin to prevent content from shifting when
      // scrollbar disappears on megamenu expand
      const masthead: HTMLElement | null | undefined = doc
        .querySelector('dds-masthead')
        ?.shadowRoot?.querySelector('.bx--masthead__l0');

      // determine whether to apply margin-right on expand as HC has extra masthead styling
      const cloudMasthead: HTMLElement | null | undefined = doc
        .querySelector('dds-cloud-masthead-container')
        ?.querySelector('dds-masthead')
        ?.shadowRoot?.querySelector('.bx--masthead__l0');

      if (this.expanded) {
        doc.body.style.marginRight = `${this._scrollBarWidth}px`;
        doc.body.style.overflow = `hidden`;
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
            cloudMasthead.style.marginRight = `${this._scrollBarWidth}px`;
          }
        } else if (masthead) {
          masthead.style.marginRight = `${this._scrollBarWidth}px`;
        }
      } else {
        doc.body.style.marginRight = '0px';
        doc.body.style.overflow = ``;
        if (cloudMasthead) {
          if (
            doc.body.classList.contains('ibm-masthead-sticky') &&
            doc.body.classList.contains('ibm-masthead-sticky-showing')
          ) {
            cloudMasthead.style.marginRight = '0px';
          }
        } else if (masthead) {
          masthead.style.marginRight = '0px';
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
      }
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
