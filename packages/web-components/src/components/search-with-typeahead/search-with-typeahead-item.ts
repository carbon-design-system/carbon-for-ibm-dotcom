/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './search-with-typeahead.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Search result item in masthead.
 *
 * @element c4d-search-with-typeahead-item
 * @csspart item item-highlighted - The highlighted item. Usage `c4d-search-with-typeahead-item::part(item item-highlighted)`
 * @csspart item-container - The item container. Usage `c4d-search-with-typeahead-item::part(item-container)`
 */
@customElement(`${c4dPrefix}-search-with-typeahead-item`)
class C4DSearchWithTypeaheadItem extends LitElement {
  /**
   * The the search result to be shown.
   */
  private _content?: TemplateResult | string | (TemplateResult | string)[];

  /**
   * Boolean checking if page is RTL
   */
  @state()
  private _pageIsRTL: boolean =
    this.ownerDocument!.documentElement.dir === 'rtl';

  /**
   * The optional href to redirect the user to.
   */
  @property()
  href = '';

  /**
   * `true` if this dropdown item should be highlighted.
   * If `true`, parent `<c4d-search-with-typeahead>` selects/deselects this dropdown item upon keyboard interaction.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  highlighted = false;

  /**
   * The search result text.
   */
  @property()
  text = '';

  /**
   * Retrieves the current search query string from the parent element.
   */
  protected _getCurrentQuery() {
    const parent = (this.getRootNode() as any).host;
    const { searchQueryString } = parent ?? {};
    return searchQueryString?.toLowerCase();
  }

  /**
   * Returns this element's text content with the portion that matches the current
   * search query highlighted.
   */
  protected _getHighlightedText() {
    const { text } = this;
    let searchQueryString = this._getCurrentQuery();

    const lowerCaseText = text.toLowerCase();
    if (lowerCaseText.includes(searchQueryString)) {
      const startingIndex = lowerCaseText.indexOf(searchQueryString);
      searchQueryString = text.substring(
        startingIndex,
        startingIndex + searchQueryString.length
      );
    }
    const highlightedResult = html`<span
      class="${c4dPrefix}-ce--search-with-typeahead-item__highlighted"
      part="item item-highlighted"
      >${searchQueryString}</span
    >`;
    const content = text
      .split(new RegExp(searchQueryString, 'i'))
      .reduce((acc, item) => {
        acc.push(item.replace(/^\s/, '\xa0').replace(/\s$/, '\xa0'));
        acc.push(highlightedResult);
        return acc;
      }, [] as (TemplateResult | string)[]);
    content.pop();
    if (this._pageIsRTL) {
      content.reverse();
    }
    return content;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'option');
    }
    super.connectedCallback();
  }

  shouldUpdate(changedProperties) {
    const result = super.shouldUpdate(changedProperties);
    if (changedProperties.has('text')) {
      const { text } = this;
      const searchQueryString = this._getCurrentQuery();
      this._content =
        !searchQueryString || this.hasAttribute('groupTitle')
          ? text
          : this._getHighlightedText();
    }
    return result;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('highlighted')) {
      this.setAttribute('aria-selected', String(Boolean(this.highlighted)));
    }
  }

  render() {
    const { highlighted, _content: content } = this;
    const containerClasses = classMap({
      [`${prefix}--container-class`]: true,
      [`${prefix}--container-highlight-class`]: highlighted,
    });
    return html`
      <div class="${containerClasses}" part="item-container" tabindex="-1">
        ${content}
      </div>
    `;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DSearchWithTypeaheadItem;
