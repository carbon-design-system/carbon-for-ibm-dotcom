/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import altlangs from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/altlangs/altlangs.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import {
  Country,
  LocaleList,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
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
    return countries.sort((lhs, rhs) =>
      this.collatorCountryName.compare(lhs.name, rhs.name)
    );
  }

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

  // eslint-disable-next-line class-methods-use-this
  async getLangDisplay() {
    const response = await LocaleAPI.getLangDisplay();
    return response;
  }

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadLocaleList?.(language);

    this.getLangDisplay().then((res) => {
      this.langDisplay = res;
    });
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
    const {
      availabilityText,
      headerTitle,
      modalClose,
      searchClearText,
      searchLabel,
      searchPlaceholder,
      unavailabilityText,
    } = localeModal ?? {};
    const pageLangs: { [locale: string]: string } = altlangs();
    if (
      Object.keys(pageLangs).length === 0 &&
      (regionList?.length as number) > 0
    ) {
      const messages = [
        'Detected that `<link rel="alternate">` is likely missing.',
        'The locale search UI will yield to an empty result.',
      ];
      console.warn(messages.join(' ')); // eslint-disable-line no-console
    }
    const massagedCountryList = regionList?.reduce(
      (acc, { countryList, name: region }) => {
        this._sortCountries(countryList).forEach(
          ({ name: country, locale: localeItems }) => {
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
          }
        );
        return acc;
      },
      [] as {
        href: string;
        locale: string;
        region: string;
        country: string;
        language: string;
      }[]
    );

    return html`
      <dds-locale-modal
        close-button-assistive-text="${ifDefined(modalClose)}"
        header-title="${ifDefined(headerTitle)}"
        lang-display="${ifDefined(langDisplay)}"
        ?open="${open}">
        <dds-regions title="${ifDefined(headerTitle)}">
          ${regionList?.map(({ countryList, name }) => {
            return html`
              <dds-region-item
                ?invalid="${countryList.length === 0 ||
                massagedCountryList?.find(({ region }) => region === name) ===
                  undefined}"
                name="${name}"></dds-region-item>
            `;
          })}
        </dds-regions>
        <dds-locale-search
          close-button-assistive-text="${ifDefined(searchClearText)}"
          label-text="${ifDefined(searchLabel)}"
          placeholder="${ifDefined(searchPlaceholder)}"
          availability-label-text="${ifDefined(availabilityText)}"
          unavailability-label-text="${ifDefined(unavailabilityText)}">
          ${massagedCountryList?.map(
            ({ country, href, language, locale, region }) => html`
              <dds-locale-item
                country="${country}"
                href="${href}"
                language="${language}"
                locale="${locale}"
                region="${region}">
              </dds-locale-item>
            `
          )}
        </dds-locale-search>
      </dds-locale-modal>
    `;
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLocaleModalComposite;
