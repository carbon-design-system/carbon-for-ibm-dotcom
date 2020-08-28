/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, query, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { INPUT_SIZE } from 'carbon-web-components/es/components/input/input';
import BXSearch, { SEARCH_COLOR_SCHEME } from 'carbon-web-components/es/components/search/search';
import ThrottedInputMixin from '../../globals/mixins/throttled-input';
import { forEach } from '../../globals/internal/collection-helpers';
import DDSLocaleItem from './locale-item';
import styles from './locale-modal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * @param target The strings to find the given `searchText` within.
 * @param searchText The search string.
 * @returns `true` if there is a match.
 */
function search(target?: (string | void)[], searchText?: string) {
  const isEmpty = !target || !target.some(Boolean);
  if (isEmpty || !searchText) {
    return true;
  }
  return target!.some(item => item && item.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
}

/**
 * Locale search box.
 *
 * @element dds-locale-search
 */
@customElement(`${ddsPrefix}-locale-search`)
class DDSLocaleSearch extends ThrottedInputMixin(LitElement) {
  /**
   * The container for the locale list.
   */
  @query(`.${prefix}--locale-modal__list`)
  private _listNode?: HTMLElement;

  /**
   * The search box.
   */
  @query(`${prefix}-search`)
  private _searchNode?: BXSearch;

  /**
   * Updates the search results.
   *
   * @param searchText The search text.
   */
  private _updateSearchResults(searchText: string) {
    const { selectorItem } = this.constructor as typeof DDSLocaleSearch;
    const { region: currentRegion } = this;
    forEach(this.querySelectorAll(selectorItem), item => {
      const { country, language, region } = item as DDSLocaleItem;
      (item as HTMLElement).hidden = region !== currentRegion || !search([country, language], searchText);
    });
  }

  _handleThrottledInput(event: Event) {
    this._updateSearchResults((event as CustomEvent).detail.value);
  }

  /**
   * The text for the label for the UI showing the available locales.
   */
  @property({ attribute: 'availability-label-text' })
  availabilityLabelText = 'This page is available in the following locations and languages';

  /**
   * The assistive text for the close button in the search box.
   */
  @property({ attribute: 'close-button-assistive-text' })
  closeButtonAssistiveText = '';

  /**
   * The throttle timeout to run query upon user input.
   */
  @property({ type: Number, attribute: 'input-timeout' })
  inputTimeout = 200;

  /**
   * The label text for the search box.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The placeholder text for the search box.
   */
  @property()
  placeholder = '';

  /**
   * The current region.
   */
  @property()
  region = '';

  /**
   * The shadow slot this locale search box should be in.
   */
  @property({ reflect: true })
  slot = 'locales-selector';

  /**
   * Resets the search box and the scroll position.
   */
  reset() {
    const { _listNode: listNode, _searchNode: searchNode } = this;
    if (listNode) {
      listNode.scrollTop = 0;
    }
    if (searchNode) {
      searchNode.value = '';
      this._updateSearchResults('');
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('region')) {
      const { selectorItem } = this.constructor as typeof DDSLocaleSearch;
      const { region } = this;
      forEach(this.querySelectorAll(selectorItem), item => {
        (item as HTMLElement).hidden = (item as DDSLocaleItem).region !== region;
      });
    }
  }

  render() {
    const { availabilityLabelText, closeButtonAssistiveText, labelText, placeholder } = this;
    return html`
      <div class="${prefix}--locale-modal__filter">
        <div class="${prefix}--locale-modal__search">
          <bx-search
            part="searchbox"
            close-button-assistive-text="${closeButtonAssistiveText}"
            color-scheme="${SEARCH_COLOR_SCHEME.LIGHT}"
            label-text="${labelText}"
            placeholder="${placeholder}"
            size="${INPUT_SIZE.EXTRA_LARGE}"
            data-autoid="${ddsPrefix}--locale-modal__filter"
          >
          </bx-search>
          <p class="${prefix}--locale-modal__search-text">
            ${availabilityLabelText}
          </p>
        </div>
        <div role="listbox" class="${prefix}--locale-modal__list">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /**
   * A selector selecting the locale items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-locale-item`;
  }

  /**
   * The event that represents the user input gesture.
   */
  static get eventInput() {
    return `${prefix}-search-input`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLocaleSearch;
