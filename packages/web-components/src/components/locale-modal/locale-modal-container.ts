/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import altlangs from '@carbon/ibmdotcom-utilities/es/utilities/altlangs/altlangs';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import './locale-modal';
import './regions';
import './region-item';
import './locale-search';
import './locale-item';
import styles from './locale-modal-container.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The translation data for locale modal.
 */
export interface LocaleModalI18N {
  availabilityText: string;
  headerTitle: string;
  modalClose: string;
  searchClearText: string;
  searchLabel: string;
  searchPlaceholder: string;
  unavailabilityText: string;
}

/**
 * The locale item data in locale modal, which is a tuple of the locale and the language.
 */
export type LocaleModalLocale = [string, string];

/**
 * The country item data in locale modal.
 */
export interface LocaleModalCountry {
  /**
   * The country name.
   */
  name: string;

  /**
   * The list of locale items.
   */
  locale: LocaleModalLocale[];
}

/**
 * The region item data in locale modal.
 */
export interface LocaleModalRegion {
  /**
   * The abbreviated region name.
   */
  key: string;

  /**
   * The region name.
   */
  name: string;

  /**
   * The list of country items.
   */
  countryList: LocaleModalCountry[];
}

/**
 * The data available from `LocaleAPI.getList()`.
 */
export interface LocaleModalLocaleList {
  /**
   * The translation data for locale modal.
   */
  localeModal: LocaleModalI18N;

  /**
   * The list of region items.
   */
  regionList: LocaleModalRegion[];
}

/**
 * Container component for locale modal.
 *
 * @element dds-locale-modal-container
 */
@customElement(`${ddsPrefix}-locale-modal-container`)
class DDSLocaleModalContainer extends HybridRenderMixin(LitElement) {
  /**
   * `true` to stop further fetch operations. Should be set when this is detached from render tree.
   */
  private _shouldPreventFetch = false;

  /**
   * The promise for the default language to show in the UI.
   */
  private _promiseDefaultLangDisplay?: Promise<string>;

  /**
   * The promise to fetch default language.
   */
  private _promiseDefaultLanguage?: Promise<string>;

  /**
   * The promise for the default locale list.
   */
  private _promiseDefaultLocaleList: { [lang: string]: Promise<LocaleModalLocaleList> } = {};

  /**
   * The default language to show in the UI.
   */
  private _defaultLangDisplay?: string;

  /**
   * The default language.
   */
  private _defaultLanguage?: string;

  /**
   * The default locale list, keyed by language.
   */
  private _defaultLocaleList: { [language: string]: LocaleModalLocaleList } = {};

  /**
   * The effective default language to show in the UI, that reflects the real-time state (without loading).
   */
  private get _currentEffectiveLangDisplay() {
    return this.langDisplay || this._defaultLangDisplay;
  }

  /**
   * The effective language, that reflects the real-time state (without loading).
   */
  private get _currentEffectiveLanguage() {
    return this.language || this._defaultLanguage;
  }

  /**
   * The effective locale list, that reflects the real-time state (without loading).
   */
  private get _currentEffectiveLocaleList() {
    return this.localeList || this._defaultLocaleList[this._currentEffectiveLanguage!];
  }

  /**
   * @returns The default language to show in the UI, fetched from `LocaleAPI`.
   * MUST BE USED FROM `._fetchDefaultLangDisplayAsNeeded()`.
   */
  private async _fetchDefaultLangDisplay() {
    const langDisplay = await LocaleAPI.getLangDisplay();
    this._defaultLangDisplay = langDisplay;
    return langDisplay;
  }

  /**
   * @returns The default language data, fetched from `LocaleAPI`. MUST BE USED FROM `._fetchDefaultLanguageAsNeeded()`.
   */
  private async _fetchDefaultLanguage() {
    const { cc: country, lc: primary } = await LocaleAPI.getLang();
    const defaultLanguage = `${primary}-${country}`;
    this._defaultLanguage = defaultLanguage;
    return defaultLanguage;
  }

  /**
   * @param language The language.
   * @returns
   *   The default locale list data for the given language, fetched from `LocaleAPI`.
   *   MUST BE USED FROM `._fetchDefaultLocaleListAsNeeded()`.
   */
  private async _fetchDefaultLocaleList(language: string) {
    const [primary, country] = language.split('-');
    const localeList = await LocaleAPI.getList({ cc: country.toLowerCase(), lc: primary.toLowerCase() });
    this._defaultLocaleList[language] = localeList;
    return localeList;
  }

  /**
   * Fetches the default language to show in the UI, if it's not loaded yet.
   *
   * @returns The defualt language to show in the UI.
   */
  private _fetchDefaultLangDisplayAsNeeded() {
    if (!this._promiseDefaultLangDisplay) {
      this._promiseDefaultLangDisplay = this._fetchDefaultLangDisplay();
    }
    return this._promiseDefaultLangDisplay;
  }

  /**
   * Fetches the default language data, if it's not loaded yet.
   *
   * @returns The defualt language data.
   */
  private async _fetchDefaultLanguageAsNeeded() {
    if (!this._promiseDefaultLanguage) {
      this._promiseDefaultLanguage = this._fetchDefaultLanguage();
    }
    return this._promiseDefaultLanguage!;
  }

  /**
   * Fetches the default locale list, if it's not loaded yet.
   *
   * @returns The defualt locale list.
   */
  private _fetchDefaultLocaleListAsNeeded(language: string) {
    if (!this._promiseDefaultLocaleList[language]) {
      this._promiseDefaultLocaleList[language] = this._fetchDefaultLocaleList(language);
    }
    return this._promiseDefaultLocaleList[language];
  }

  /**
   * @returns The language to use in this UI.
   */
  private async _getEffectiveLangDisplay() {
    if (this.langDisplay) {
      return this.langDisplay;
    }
    return this._fetchDefaultLangDisplayAsNeeded();
  }

  /**
   * @returns The language to use in this UI.
   */
  private async _getEffectiveLanguage() {
    // If `this.language` is there, don't bother fetching the default language
    const fetchedLanguage = this.language ? undefined : await this._fetchDefaultLanguageAsNeeded();
    // If `this.language` is set while we are fetching the default language, use `this.language`
    return (this.language || fetchedLanguage)!;
  }

  /**
   * @returns The nav links to use in this UI.
   */
  private async _getEffectiveLocaleList() {
    // If `this.localeList` is there, don't bother fetching the default nav links
    if (this.localeList) {
      return this.localeList;
    }
    const language = await this._getEffectiveLanguage();
    if (this._shouldPreventFetch) {
      return undefined;
    }
    // If `this.localeList` is set while we are fetching the default language, don't bother fetching the default nav links
    const fetchedLocaleList = this.localeList ? undefined : await this._fetchDefaultLocaleListAsNeeded(language);
    // If `this.localeList` is set while we are fetching the default nav links, use `this.localeList`
    return (this.localeList ?? fetchedLocaleList)!;
  }

  /**
   * Ensures locale list are rendered.
   */
  private async _ensureEffectiveLangDisplay() {
    const effectiveLangDisplay = await this._getEffectiveLangDisplay();
    if (effectiveLangDisplay !== this.langDisplay) {
      this.requestUpdate();
    }
  }

  /**
   * Ensures locale list are rendered.
   */
  private async _ensureEffectiveLocaleList() {
    const effectiveLocaleList = await this._getEffectiveLocaleList();
    if (effectiveLocaleList !== this.localeList) {
      this.requestUpdate();
    }
  }

  /**
   * @param countries A country list.
   * @returns Sorted version of the given country list.
   */
  private _sortCountries(countries: LocaleModalCountry[]) {
    return countries.sort((lhs, rhs) => this.collatorCountryName.compare(lhs.name, rhs.name));
  }

  /**
   * The g11n collator to use for sorting contry names.
   */
  @property({ attribute: false })
  collatorCountryName = new Intl.Collator();

  /**
   * The language to show in the UI.
   */
  @property({ attribute: 'lang-display' })
  langDisplay?: string;

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * The locale list.
   */
  @property({ attribute: false })
  localeList?: LocaleModalLocaleList;

  /**
   * `true` to open the modal.
   */
  @property({ type: Boolean })
  open = false;

  connectedCallback() {
    this._shouldPreventFetch = false;
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._shouldPreventFetch = true;
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._ensureEffectiveLangDisplay();
    this._getEffectiveLanguage(); // Ensures that the effective language is fetched even if `localeList` is explicitly given
    this._ensureEffectiveLocaleList();
  }

  updated(changedProperties) {
    if (changedProperties.has('langDisplay')) {
      this._ensureEffectiveLangDisplay();
    }
    if (changedProperties.has('language') || changedProperties.has('localeList')) {
      this._ensureEffectiveLocaleList();
    }
    return true;
  }

  renderLightDOM() {
    const {
      open,
      _currentEffectiveLangDisplay: currentEffectiveLangDisplay,
      _currentEffectiveLocaleList: currentEffectiveLocaleList,
    } = this;
    const { localeModal: localeModalI18N, regionList } = currentEffectiveLocaleList ?? {};
    const { searchPlaceholder } = localeModalI18N ?? {};
    const pageLangs: { [locale: string]: string } = altlangs();
    const massagedCountryList = regionList?.reduce((acc, { countryList, name: region }) => {
      this._sortCountries(countryList).forEach(({ name: country, locale: localeItems }) => {
        localeItems.forEach(([locale, language]) => {
          const href = pageLangs[locale];
          if (href) {
            acc.push({
              locale,
              region,
              country,
              href,
              language,
            });
          }
        });
      });
      return acc;
    }, [] as { href: string; locale: string; region: string; country: string; language: string }[]);

    return html`
      <dds-locale-modal lang-display="${ifNonNull(currentEffectiveLangDisplay)}" ?open="${open}">
        <dds-regions>
          ${regionList?.map(
            ({ countryList, name }) => html`
              <dds-region-item ?invalid="${countryList.length === 0}" name="${name}"></dds-region-item>
            `
          )}
        </dds-regions>
        <dds-locale-search placeholder="${ifNonNull(searchPlaceholder)}">
          ${massagedCountryList?.map(
            ({ country, href, language, locale, region }) => html`
              <dds-locale-item country="${country}" href="${href}" language="${language}" locale="${locale}" region="${region}">
              </dds-locale-item>
            `
          )}
        </dds-locale-search>
      </dds-locale-modal>
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLocaleModalContainer;
