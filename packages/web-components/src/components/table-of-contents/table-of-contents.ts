/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, internalProperty, query, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import TableOfContents20 from 'carbon-web-components/es/icons/table-of-contents/20.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './table-of-contents.scss';
import { TOC_TYPES } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Table of contents.
 *
 * @element dds-table-of-contents
 * @csspart table - The table UI.
 * @slot heading - The heading content.
 * @slot menu-rule - The menu rule.
 */
@customElement(`${ddsPrefix}-table-of-contents`)
class DDSTableOfContents extends StableSelectorMixin(LitElement) {
  /**
   * Defines TOC type, "" for default, `horizontal` for horizontal variant.
   */
  @property({ reflect: true, attribute: 'toc-layout' })
  layout = TOC_TYPES.DEFAULT;

  /**
   * The current target `<a>` that should be in view.
   */
  @internalProperty()
  private _currentTarget: HTMLAnchorElement | null = null;

  /**
   * `true` if there is a heading content.
   */
  @internalProperty()
  private _hasHeading = false;

  /**
   * `true` if mobile container is visible.
   */
  @internalProperty()
  private _hasMobileContainerVisible = false;

  /**
   * The map between target `<a>` and a boolean status whether it intersects with the viewport or not.
   */
  @internalProperty()
  private _intersectionStatus: WeakMap<HTMLAnchorElement, boolean> = new WeakMap();

  /**
   * The container for the mobile UI.
   */
  @query(`.${prefix}--tableofcontents__mobile`)
  private _mobileContainerNode?: HTMLElement;

  /**
   * The `<select>` for the mobile UI.
   */
  @query(`.${prefix}--tableofcontents__mobile__select`)
  private _mobileSelectNode?: HTMLSelectElement;

  /**
   * The observer for the intersection of target `<a>`s.
   */
  private _observerIntersectionTarget: IntersectionObserver | null = null;

  /**
   * The observer for the resize of the mobile container.
   */
  private _observerResizeMobileContainer: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * The target `<a>`s harvested from the document.
   */
  @internalProperty()
  private _targets: HTMLAnchorElement[] = [];

  /**
   * Cleans-up and creats the resize observer for the mobile container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResizeMobileContainer({ create }: { create?: boolean } = {}) {
    const { _mobileContainerNode: mobileContainerNode } = this;
    if (mobileContainerNode) {
      if (this._observerResizeMobileContainer) {
        this._observerResizeMobileContainer.disconnect();
        this._observerResizeMobileContainer = null;
      }
      if (create) {
        // TODO: Wait for `.d.ts` update to support `ResizeObserver`
        // @ts-ignore
        this._observerResizeMobileContainer = new ResizeObserver(this._observeResizeMobileContainer);
        this._observerResizeMobileContainer.observe(mobileContainerNode);
      }
    }
  }

  /**
   * Cleans-up and creats the inersection observer for the intersection of target `<a>`s with the viewport.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateObserverIntersectionTarget({ create }: { create?: boolean } = {}) {
    if (this._observerIntersectionTarget) {
      this._observerIntersectionTarget.disconnect();
      this._observerIntersectionTarget = null;
    }
    if (create) {
      this._observerIntersectionTarget = new IntersectionObserver(this._observeIntersectionTarget, {
        threshold: 1,
      });
      this._targets.forEach(item => {
        this._observerIntersectionTarget!.observe(item);
      });
    }
  }

  /**
   * Handles `change` event on mobile `<select>`.
   *
   * @param event The event.
   */
  private _handleChangeSelect(event: Event) {
    this._handleUserInitiatedJump((event.target as HTMLSelectElement).value);
  }

  /**
   * Handles `click` event on a menu item.
   *
   * @param event The event.
   */
  private _handleClickItem(event: MouseEvent) {
    const { selectorDesktopItem } = this.constructor as typeof DDSTableOfContents;
    const target = event.target as HTMLAnchorElement;
    if (target.matches?.(selectorDesktopItem)) {
      this._handleUserInitiatedJump(target.dataset.target!);
      event.preventDefault();
    }
  }

  /**
   * Handles `slotchange` event on the default `<slot>`.
   *
   * @param event The event.
   */
  private _handleSlotChange(event: Event) {
    const { _targets: targets, _observerIntersectionTarget: observerIntersectionTarget } = this;
    const { selectorTarget } = this.constructor as typeof DDSTableOfContents;
    if (observerIntersectionTarget) {
      while (targets.length > 0) {
        observerIntersectionTarget.unobserve(targets.pop()!);
      }
    }
    this._targets = (event.target as HTMLSlotElement).assignedNodes().reduce((acc, node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const elem = node as Element;
        if (elem.matches(selectorTarget)) {
          acc.push(elem as HTMLAnchorElement);
        }
        acc.push(...(elem.querySelectorAll(selectorTarget) as NodeListOf<HTMLAnchorElement>));
      }
      return acc;
    }, [] as HTMLAnchorElement[]);
    if (observerIntersectionTarget) {
      this._targets.forEach(item => {
        observerIntersectionTarget.observe(item);
      });
    }
  }

  /**
   * Handles `slotchange` event on `<slot name="heading">`.
   *
   * @param event The event.
   */
  private _handleSlotChangeHeading(event: Event) {
    this._hasHeading = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
  }

  /**
   * Handles user-initiated jump to a hash.
   *
   * @param target The hash name.
   */
  private _handleUserInitiatedJump(target: string) {
    this.ownerDocument!.defaultView!.location.hash = target;
    const elem = this.querySelector(`a[name="${target}"]`);
    if (elem) {
      elem.setAttribute('tabindex', '0');
      (elem as HTMLElement).focus({ preventScroll: true });
      elem.removeAttribute('tabindex');
    }
  }

  /**
   * Handles intersection of target `<a>`s with the viewport.
   *
   * @param records The intersection records.
   */
  private _observeIntersectionTarget = (records: IntersectionObserverEntry[]) => {
    const { _intersectionStatus: intersectionStatus, _targets: targets } = this;
    records.forEach(({ isIntersecting, target }) => {
      intersectionStatus.set(target as HTMLAnchorElement, isIntersecting);
    });
    const currentTarget = targets.find(item => intersectionStatus.get(item));
    // If the new target is not found, don't bother changing it
    if (currentTarget) {
      this._currentTarget = currentTarget;
    }
  };

  /**
   * Handles resize of mobile container.
   *
   * @param records The resize records.
   */
  private _observeResizeMobileContainer = records => {
    const entry = records[records.length - 1];
    const { height } = entry.contentRect;
    this._hasMobileContainerVisible = height > 0;
  };

  /**
   * The current 0px offset from the top of page.
   */
  @property({ type: Number })
  stickyOffset = 0;

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObserverResizeMobileContainer({ create: true });
    this._cleanAndCreateObserverIntersectionTarget({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateObserverIntersectionTarget();
    this._cleanAndCreateObserverResizeMobileContainer();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._cleanAndCreateObserverResizeMobileContainer({ create: true });
  }

  updated(changedProperties) {
    if (changedProperties.has('_currentTarget')) {
      const { _currentTarget: currentTarget, _mobileSelectNode: mobileSelectNode } = this;
      // Ensures setting the `value` after rendering child `<option>`s when there is a change in `value`,
      // given reflecting `value` requires child `<option>`s being there beforehand
      mobileSelectNode!.value = currentTarget?.name ?? '';
    }
  }

  render() {
    const {
      stickyOffset,
      _currentTarget: currentTarget,
      _hasHeading: hasHeading,
      _hasMobileContainerVisible: hasMobileContainerVisible,
      _targets: targets,
      _handleChangeSelect: handleChangeSelect,
      _handleClickItem: handleClickItem,
      _handleSlotChange: handleSlotChange,
      _handleSlotChangeHeading: handleSlotChangeHeading,
    } = this;

    const containerClasses = classMap({
      [`${ddsPrefix}-ce--table-of-contents__container`]: this.layout === TOC_TYPES.DEFAULT,
      [`${ddsPrefix}-ce--table-of-contents-horizontal__container`]: this.layout === TOC_TYPES.HORIZONTAL,
    });

    const navigationClasses = classMap({
      [`${prefix}--tableofcontents__sidebar`]: this.layout === TOC_TYPES.DEFAULT,
      [`${prefix}--tableofcontents__navbar`]: this.layout === TOC_TYPES.HORIZONTAL,
    });

    return html`
      <div class="${containerClasses}">
        <div
          part="table"
          class="${navigationClasses}"
          style="top: ${this.layout === TOC_TYPES.HORIZONTAL && stickyOffset ? `${stickyOffset}px` : 0}"
        >
          ${hasMobileContainerVisible
            ? nothing
            : html`
                <div ?hidden="${!hasHeading}" class="${prefix}--tableofcontents__desktop__children">
                  <slot name="heading" @slotchange="${handleSlotChangeHeading}"></slot>
                  <slot name="menu-rule"></slot>
                </div>
              `}
          <div class="${prefix}--tableofcontents__mobile-top"></div>
          <div
            class="${ddsPrefix}-ce--table-of-contents__items-container"
            style="position: sticky; top: ${stickyOffset ? `${stickyOffset}px` : 0}"
          >
            <div class="${prefix}--tableofcontents__desktop">
              <ul>
                ${targets.map(item => {
                  const name = item.getAttribute('name');
                  const title = (item.dataset.title ?? item.textContent ?? '').trim();
                  const selected = item === currentTarget;
                  const itemClasses = classMap({
                    [`${prefix}--tableofcontents__desktop__item`]: true,
                    [`${prefix}--tableofcontents__desktop__item--active`]: selected,
                  });
                  return html`
                    <li class="${itemClasses}" @click="${handleClickItem}">
                      <a aria-current="${ifDefined(!selected ? undefined : 'location')}" data-target="${name}" href="#${name}">
                        ${title}
                      </a>
                    </li>
                  `;
                })}
              </ul>
            </div>
            <div class="${prefix}--tableofcontents__mobile">
              <div class="${prefix}--tableofcontents__mobile__select__wrapper">
                <select class="${prefix}--tableofcontents__mobile__select" @change="${handleChangeSelect}">
                  ${targets.map(item => {
                    const name = item.getAttribute('name');
                    const title = (item.dataset.title ?? item.textContent ?? '').trim();
                    return html`
                      <option class="${prefix}--tableofcontents__mobile__select__option" value="${name}">
                        ${title}
                      </option>
                    `;
                  })}
                </select>
                ${TableOfContents20({
                  class: `${prefix}--tableofcontents__mobile__select__icon`,
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="${prefix}--tableofcontents__content">
          <div class="${prefix}--tableofcontents__content-wrapper">
            ${!hasMobileContainerVisible
              ? undefined
              : html`
                  <div ?hidden="${!hasHeading}" class="${prefix}--tableofcontents__children__mobile">
                    <slot name="heading" @slotchange="${handleSlotChangeHeading}"></slot>
                  </div>
                `}
            <slot @slotchange="${handleSlotChange}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * The selector that selects the desktop link items.
   */
  static get selectorDesktopItem() {
    return `.${prefix}--tableofcontents__desktop__item a`;
  }

  /**
   * The selector that determines where to harvest the table of contents from.
   */
  static selectorTarget = 'a[name]';

  static get stableSelector() {
    return `${ddsPrefix}--tableofcontents`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTableOfContents;
