/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import Error20 from '@carbon/web-components/es/icons/error/20.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import altlangs from '@carbon/ibmdotcom-utilities/es/utilities/altlangs/altlangs.js';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import {
  Country,
  LocaleList,
} from '@carbon/ibmdotcom-services-store/es/types/localeAPI';
import './locale-modal';
import C4DLocaleModal from './locale-modal';
import './regions';
import './region-item';
import './locale-search';
import './locale-item';
import '../card/card-heading';
import '../card/card-footer';
import styles from './locale-modal-composite.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Container component for locale modal.
 *
 * @element c4d-locale-modal-composite
 */
@customElement(`${c4dPrefix}-locale-modal-composite`)
class C4DLocaleModalComposite extends HostListenerMixin(
  HybridRenderMixin(LitElement)
) {
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

  /**
   * The region chosen by user.
   */
  @property()
  chosenRegion?: string;

  @HostListener(C4DLocaleModal.eventRegionUpdated)
  protected _handleRegionUpdatedEvent(event) {
    this.chosenRegion = event.detail.region || undefined;
  }

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
    const { chosenRegion, langDisplay, localeList, open } = this;
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
      <c4d-locale-modal
        close-button-assistive-text="${ifDefined(modalClose)}"
        header-title="${ifDefined(headerTitle)}"
        lang-display="${ifDefined(langDisplay)}"
        ?open="${open}">
        <c4d-regions title="${ifDefined(headerTitle)}">
          ${regionList?.map(({ countryList, name }) => {
            const isInvalid =
              countryList.length === 0 ||
              massagedCountryList?.find(({ region }) => region === name) ===
                undefined;
            return html`
              <c4d-region-item link ?disabled="${isInvalid}" name="${name}">
                <c4d-card-heading>${name}</c4d-card-heading>
                <div
                  slot="footer"
                  class="${c4dPrefix}--region-item-footer"
                  ?disabled="${isInvalid}">
                  ${isInvalid
                    ? Error20({
                        slot: 'icon',
                        class: `${c4dPrefix}--card__cta`,
                      })
                    : ArrowRight20({
                        slot: 'icon',
                        class: `${c4dPrefix}--card__cta`,
                      })}
                </div>
              </c4d-region-item>
            `;
          })}
        </c4d-regions>

        <c4d-locale-search
          close-button-assistive-text="${ifDefined(searchClearText)}"
          label-text="${ifDefined(searchLabel)}"
          placeholder="${ifDefined(searchPlaceholder)}"
          availability-label-text="${ifDefined(availabilityText)}"
          unavailability-label-text="${ifDefined(unavailabilityText)}">
          ${chosenRegion
            ? html`
                ${massagedCountryList
                  ?.filter(({ region }) => {
                    return region === chosenRegion;
                  })
                  .map(
                    ({ country, href, language, locale, region }) => html`
                      <c4d-locale-item
                        country="${country}"
                        href="${href}"
                        language="${language}"
                        locale="${locale}"
                        region="${region}">
                      </c4d-locale-item>
                    `
                  )}
              `
            : ``}
        </c4d-locale-search>
      </c4d-locale-modal>
    `;
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLocaleModalComposite;
