/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ArrowLeft20 from 'carbon-web-components/es/icons/arrow--left/20';
import EarthFilled16 from 'carbon-web-components/es/icons/earth--filled/16';
import DDSModal from '../modal/modal';
import '../modal/modal-header';
import '../modal/modal-heading';
import '../modal/modal-close-button';
import DDSLocaleSearch from './locale-search';
import DDSRegionItem from './region-item';
import styles from './locale-modal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Locale modal.
 *
 * @element dds-locale-modal
 */
@customElement(`${ddsPrefix}-locale-modal`)
class DDSLocaleModal extends DDSModal {
  /**
   * The current region.
   */
  private _currentRegion?: string;

  /**
   * Handles `click` event on the back button.
   */
  private _handleClickBackButton() {
    this._currentRegion = undefined;
    this.requestUpdate();
  }

  /**
   * Handles `click` event on a region card.
   *
   * @param event The event.
   */
  private _handleClickRegionSelector(event: MouseEvent) {
    const { _currentRegion: currentRegion } = this;
    this._currentRegion = (event.target as DDSRegionItem).name;
    this.requestUpdate('_currentRegion', currentRegion);
  }

  /**
   * @returns The heading content for the region selector page.
   */
  private _renderRegionSelectorHeading() {
    const { headerTitle, langDisplay } = this;
    return html`
      ${langDisplay &&
        html`
          <p class="${prefix}--modal-header__label ${prefix}--type-delta">
            ${langDisplay}${EarthFilled16({ class: `${prefix}--locale-modal__label-globe` })}
          </p>
        `}
      ${langDisplay &&
        headerTitle &&
        html`
          <p class="bx--modal-header__heading bx--type-beta">
            ${headerTitle}
          </p>
        `}
    `;
  }

  /**
   * @returns The heading content for the locale selector page.
   */
  private _renderLocaleSelectorHeading() {
    const { headerTitle, _currentRegion: currentRegion, _handleClickBackButton: handleClickBackButton } = this;
    return html`
      <button
        part="back-button"
        class="${prefix}--modal-header__label ${prefix}--type-delta"
        data-autoid="${ddsPrefix}--locale-modal__region-back"
        @click="${handleClickBackButton}"
      >
        ${ArrowLeft20({ class: `${prefix}--locale-modal__label-arrow` })}${headerTitle}
      </button>
      <p class="bx--modal-header__heading bx--type-beta" tabindex="0">${currentRegion}</p>
    `;
  }

  /**
   * @returns The heading content.
   */
  private _renderHeading() {
    const { _currentRegion: currentRegion } = this;
    return !currentRegion ? this._renderRegionSelectorHeading() : this._renderLocaleSelectorHeading();
  }

  /**
   * @returns The body content for the region selector page.
   */
  private _renderRegionSelectorBody() {
    const { _handleClickRegionSelector: handleClickRegionSelector } = this;
    return html`
      <div class="${prefix}--modal-content ${prefix}--locale-modal" @click="${handleClickRegionSelector}">
        <slot name="regions-selector"></slot>
      </div>
    `;
  }

  /**
   * @returns The body content for the locale selector page.
   */
  // eslint-disable-next-line class-methods-use-this
  private _renderLocaleSelectorBody() {
    return html`
      <slot name="locales-selector"></slot>
    `;
  }

  /**
   * The header title.
   */
  @property({ attribute: 'header-title' })
  headerTitle = 'Select geographic area';

  /**
   * The language to show in the UI.
   */
  @property({ attribute: 'lang-display' })
  langDisplay?: string;

  protected _renderHeader() {
    return html`
      <dds-modal-header>
        <dds-modal-close-button></dds-modal-close-button>
        <dds-modal-heading>${this._renderHeading()}</dds-modal-heading>
      </dds-modal-header>
    `;
  }

  protected _renderBody() {
    const { _currentRegion: currentRegion } = this;
    return !currentRegion ? this._renderRegionSelectorBody() : this._renderLocaleSelectorBody();
  }

  async updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('_currentRegion')) {
      const { selectorLocaleSearch } = this.constructor as typeof DDSLocaleModal;
      const localeSaarch = this.querySelector(selectorLocaleSearch);
      if (localeSaarch) {
        (localeSaarch as DDSLocaleSearch).region = this._currentRegion ?? '';
        (localeSaarch as DDSLocaleSearch).resetScrollPosition();
      }
    }
  }

  /**
   * A selector selecting the locale search UI.
   */
  static get selectorLocaleSearch() {
    return `${ddsPrefix}-locale-search`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--locale-modal`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLocaleModal;
