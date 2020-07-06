/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import DDSMastheadSearch from './masthead-search';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Search result item in masthead.
 *
 * @element dds-masthead-search-item
 */
@customElement(`${ddsPrefix}-masthead-search-item`)
class DDSMastheadSearchItem extends LitElement {
  /**
   * The the search result to be shown.
   */
  private _content?: TemplateResult | string | (TemplateResult | string)[];

  /**
   * `true` if this dropdown item should be highlighted.
   * If `true`, parent `<dds-masthead-search>` selects/deselects this dropdown item upon keyboard interaction.
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
      const parent = this.closest((this.constructor as typeof DDSMastheadSearchItem).selectorParent) as DDSMastheadSearch;
      const { searchQueryString } = parent ?? {};
      if (!searchQueryString) {
        this._content = text;
      } else {
        const highlightedResult = html`
          <span class="${ddsPrefix}-ce--masthead-search-item__highlighted">${searchQueryString}</span>
        `;
        const content = text.split(searchQueryString).reduce((acc, item) => {
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
    if (changedProperties.has('highighted')) {
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

  /**
   * A selector that will return the parent search box.
   */
  static get selectorParent() {
    return `${ddsPrefix}-masthead-search`;
  }

  static styles = styles;
}

export default DDSMastheadSearchItem;
