/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import altlangs from '@carbon/ibmdotcom-utilities/es/utilities/altlangs/altlangs.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import { Country, LocaleList } from '../../globals/services-store/types/localeAPI';
import './locale-modal';
import './regions';
import './region-item';
import './locale-search';
import './locale-item';
import styles from './locale-modal-composite.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for locale modal.
 *
 * @element dds-locale-modal-composite
 */
@customElement(`${ddsPrefix}-locale-modal-composite`)
class DDSLocaleModalComposite extends HybridRenderMixin(LitElement) {
  /**
   * @param countries A country list.
   * @returns Sorted version of the given country list.
   */
  private _sortCountries(countries: Country[]) {
    return countries.sort((lhs, rhs) => this.collatorCountryName.compare(lhs.name, rhs.name));
  }

  /**
   * The placeholder for `loadLangDisplay()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadLangDisplay?: (language?: string) => Promise<string>;

  /**
   * The placeholder for `loadLocaleList()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadLocaleList?: (language?: string) => Promise<LocaleList>;

  /**
   * The placeholder for `setLanguage()` Redux action that may be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;

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
  localeList?: LocaleList;

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
    this._loadLangDisplay?.(language);
    this._loadLocaleList?.(language);
  }

  updated(changedProperties) {
    const { language } = this;
    if (changedProperties.has('language')) {
      if (language) {
        this._setLanguage?.(language);
        this._loadLocaleList?.(language).catch(() => {}); // The error is logged in the Redux store
      }
    }
  }

  renderLightDOM() {
    const { langDisplay, localeList, open } = this;
    const { localeModal, regionList } = localeList ?? {};
    const { availabilityText, headerTitle, modalClose, searchClearText, searchLabel, searchPlaceholder, unavailabilityText } =
      localeModal ?? {};
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
      <dds-locale-modal
        close-button-assistive-text="${ifNonNull(modalClose)}"
        header-title="${ifNonNull(headerTitle)}"
        lang-display="${ifNonNull(langDisplay)}"
        ?open="${open}"
      >
        <dds-regions>
          ${regionList?.map(
            ({ countryList, name }) => html`
              <dds-region-item ?invalid="${countryList.length === 0}" name="${name}"></dds-region-item>
            `
          )}
        </dds-regions>
        <dds-locale-search
          close-button-assistive-text="${ifNonNull(searchClearText)}"
          label-text="${ifNonNull(searchLabel)}"
          placeholder="${ifNonNull(searchPlaceholder)}"
          availability-label-text="${ifNonNull(availabilityText)}"
          unavailability-label-text="${ifNonNull(unavailabilityText)}"
        >
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
