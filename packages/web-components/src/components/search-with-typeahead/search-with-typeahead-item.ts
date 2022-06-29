/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './search-with-typeahead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Search result item in masthead.
 *
 * @element dds-search-with-typeahead-item
 */
@customElement(`${ddsPrefix}-search-with-typeahead-item`)
class DDSSearchWithTypeaheadItem extends LitElement {
  /**
   * The the search result to be shown.
   */
  private _content?: TemplateResult | string | (TemplateResult | string)[];

  /**
   * The optional href to redirect the user to.
   */
  @property()
  href = '';

  /**
   * `true` if this dropdown item should be highlighted.
   * If `true`, parent `<dds-search-with-typeahead>` selects/deselects this dropdown item upon keyboard interaction.
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
      const parent = (this.getRootNode() as any).host;
      let { searchQueryString } = parent ?? {};
      searchQueryString = searchQueryString.toLowerCase();

      if (!searchQueryString) {
        this._content = text;
      } else {
        const lowerCaseText = text.toLowerCase();
        if (lowerCaseText.includes(searchQueryString)) {
          const startingIndex = lowerCaseText.indexOf(searchQueryString);
          searchQueryString = text.substring(startingIndex, startingIndex + searchQueryString.length);
        }

        const highlightedResult = html`
          <span class="${ddsPrefix}-ce--search-with-typeahead-item__highlighted">${searchQueryString}</span>
        `;
        const content = text.split(new RegExp(searchQueryString, 'i')).reduce((acc, item) => {
          acc.push(item.replace(/^\s/, '\xa0').replace(/\s$/, '\xa0'));
          acc.push(highlightedResult);
          return acc;
        }, [] as (TemplateResult | string)[]);
        content.pop();
        this._content = content;
      }
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
      <div class="${containerClasses}" tabindex="-1">${content}</div>
    `;
  }

  static styles = styles;
}

export default DDSSearchWithTypeaheadItem;
