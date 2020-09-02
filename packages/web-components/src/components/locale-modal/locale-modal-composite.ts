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
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import altlangs from '@carbon/ibmdotcom-utilities/es/utilities/altlangs/altlangs';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import { LocaleList } from '../../globals/services-store/types/localeAPI';
import './locale-modal';
import './regions';
import './region-item';
import './locale-search';
import './locale-item';
import styles from './locale-modal-composite.scss';

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
 * @element dds-locale-modal-composite
 */
@customElement(`${ddsPrefix}-locale-modal-composite`)
class DDSLocaleModalComposite extends HybridRenderMixin(LitElement) {
  /**
   * The placeholder for `setLanguage()` Redux action that may be mixed in.
   */
  private _setLanguage?: (string) => void;

  /**
   * The placeholder for `setLangDisplay()` Redux action that may be mixed in.
   */
  private _setLangDisplay?: (string) => void;

  /**
   * The placeholder for `loadLangDisplay()` Redux action that may be mixed in.
   */
  private _loadLangDisplay?: () => Promise<string>;

  /**
   * The placeholder for `loadLocaleList()` Redux action that may be mixed in.
   */
  private _loadLocaleList?: () => Promise<LocaleList>;

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

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    const { langDisplay } = this;
    if (langDisplay) {
      this._setLangDisplay?.(langDisplay);
    }
    this._loadLangDisplay?.();
    this._loadLocaleList?.();
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
      }
    }
    if (changedProperties.has('langDisplay')) {
      const { langDisplay } = this;
      if (langDisplay) {
        this._setLangDisplay?.(langDisplay);
      }
    }
    return true;
  }

  renderLightDOM() {
    const { langDisplay, localeList, open } = this;
    const { localeModal: localeModalI18N, regionList } = localeList ?? {};
    const { searchPlaceholder } = localeModalI18N ?? {};
    const pageLangs: { [locale: string]: string } = altlangs();
    if (Object.keys(pageLangs).length === 0 && (regionList?.length as number) > 0) {
      const messages = [
        'Detected that `<link rel="alternate">` is likely missing.',
        'The locale search UI will yeild to an empty result.',
      ];
      console.warn(messages.join(' ')); // eslint-disable-line no-console
    }
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
      <dds-locale-modal lang-display="${ifNonNull(langDisplay)}" ?open="${open}">
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

export default DDSLocaleModalComposite;
