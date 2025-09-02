/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import Wikis from '@carbon/web-components/es/icons/wikis/20.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './megamenu-language-selector.scss';

const { stablePrefix: c4dPrefix } = settings;

@customElement(`${c4dPrefix}-megamenu-language-selector`)
class C4DMegaMenuLanguageSelector extends StableSelectorMixin(LitElement) {
  @property({ type: Boolean }) isCountryDropdownOpen = false;

  /** Dropdown visibility */
  @state() private dropdownOpen = false;

  /** Categorized Links */
  @state() private categorizedLinks: Array<any> = [];

  /** Current region info */
  @state() private currentRegion = { country: 'Unknown', language: 'Unknown' };

  private countryLanguageMap = {
    'af-za': {
      country: 'South Africa',
      language: 'Afrikaans',
    },
    'am-et': {
      country: 'Ethiopia',
      language: 'አማርኛ (Amharic)',
    },
    'ar-ae': {
      country: 'United Arab Emirates',
      language: 'العربية (Arabic)',
    },
    'ar-bh': {
      country: 'Bahrain',
      language: 'العربية (Arabic)',
    },
    'ar-dz': {
      country: 'Algeria',
      language: 'العربية (Arabic)',
    },
    'ar-eg': {
      country: 'Egypt',
      language: 'العربية (Arabic)',
    },
    'ar-iq': {
      country: 'Iraq',
      language: 'العربية (Arabic)',
    },
    'ar-jo': {
      country: 'Jordan',
      language: 'العربية (Arabic)',
    },
    'ar-kw': {
      country: 'Kuwait',
      language: 'العربية (Arabic)',
    },
    'ar-lb': {
      country: 'Lebanon',
      language: 'العربية (Arabic)',
    },
    'ar-ly': {
      country: 'Libya',
      language: 'العربية (Arabic)',
    },
    'ar-ma': {
      country: 'Morocco',
      language: 'العربية (Arabic)',
    },
    'ar-om': {
      country: 'Oman',
      language: 'العربية (Arabic)',
    },
    'ar-qa': {
      country: 'Qatar',
      language: 'العربية (Arabic)',
    },
    'ar-sa': {
      country: 'Saudi Arabia',
      language: 'العربية (Arabic)',
    },
    'ar-sy': {
      country: 'Syria',
      language: 'العربية (Arabic)',
    },
    'ar-tn': {
      country: 'Tunisia',
      language: 'العربية (Arabic)',
    },
    'ar-ye': {
      country: 'Yemen',
      language: 'العربية (Arabic)',
    },
    'az-az': {
      country: 'Azerbaijan',
      language: 'Azərbaycanca (Azerbaijani)',
    },
    'be-by': {
      country: 'Belarus',
      language: 'Беларуская (Belarusian)',
    },
    'bg-bg': {
      country: 'Bulgaria',
      language: 'Български (Bulgarian)',
    },
    'bn-bd': {
      country: 'Bangladesh',
      language: 'বাংলা (Bengali)',
    },
    'bs-ba': {
      country: 'Bosnia and Herzegovina',
      language: 'Bosanski (Bosnian)',
    },
    'ca-es': {
      country: 'Spain',
      language: 'Català (Catalan)',
    },
    'cs-cz': {
      country: 'Czech Republic',
      language: 'Čeština (Czech)',
    },
    'da-dk': {
      country: 'Denmark',
      language: 'Dansk (Danish)',
    },
    'de-at': {
      country: 'Austria',
      language: 'Deutsch (German)',
    },
    'de-ch': {
      country: 'Switzerland',
      language: 'Deutsch (German)',
    },
    'de-de': {
      country: 'Germany',
      language: 'Deutsch (German)',
    },
    'el-gr': {
      country: 'Greece',
      language: 'Ελληνικά (Greek)',
    },
    'en-au': {
      country: 'Australia',
      language: 'English (English)',
    },
    'en-ca': {
      country: 'Canada',
      language: 'English (English)',
    },
    'en-uk': {
      country: 'United Kingdom',
      language: 'English (English)',
    },
    'en-in': {
      country: 'India',
      language: 'English (English)',
    },
    'en-nz': {
      country: 'New Zealand',
      language: 'English (English)',
    },
    'en-us': {
      country: 'United States',
      language: 'English (English)',
    },
    'es-ar': {
      country: 'Argentina',
      language: 'Español (Spanish)',
    },
    'es-cl': {
      country: 'Chile',
      language: 'Español (Spanish)',
    },
    'es-co': {
      country: 'Colombia',
      language: 'Español (Spanish)',
    },
    'es-es': {
      country: 'Spain',
      language: 'Español (Spanish)',
    },
    'es-mx': {
      country: 'Mexico',
      language: 'Español (Spanish)',
    },
    'et-ee': {
      country: 'Estonia',
      language: 'Eesti (Estonian)',
    },
    'fi-fi': {
      country: 'Finland',
      language: 'Suomi (Finnish)',
    },
    'fr-be': {
      country: 'Belgium',
      language: 'Français (French)',
    },
    'fr-ca': {
      country: 'Canada',
      language: 'Français (French)',
    },
    'fr-fr': {
      country: 'France',
      language: 'Français (French)',
    },
    'he-il': {
      country: 'Israel',
      language: 'עברית (Hebrew)',
    },
    'hi-in': {
      country: 'India',
      language: 'हिन्दी (Hindi)',
    },
    'hr-hr': {
      country: 'Croatia',
      language: 'Hrvatski (Croatian)',
    },
    'hu-hu': {
      country: 'Hungary',
      language: 'Magyar (Hungarian)',
    },
    'id-id': {
      country: 'Indonesia',
      language: 'Bahasa (Indonesian)',
    },
    'it-it': {
      country: 'Italy',
      language: 'Italiano (Italian)',
    },
    'ja-jp': {
      country: 'Japan',
      language: '日本語 (Japanese)',
    },
    'ko-kr': {
      country: 'South Korea',
      language: '한국어 (Korean)',
    },
    'lt-lt': {
      country: 'Lithuania',
      language: 'Lietuvių (Lithuanian)',
    },
    'lv-lv': {
      country: 'Latvia',
      language: 'Latviešu (Latvian)',
    },
    'ms-my': {
      country: 'Malaysia',
      language: 'Bahasa Melayu (Malay)',
    },
    'nb-no': {
      country: 'Norway',
      language: 'Norsk Bokmål (Norwegian)',
    },
    'nl-be': {
      country: 'Belgium',
      language: 'Nederlands (Dutch)',
    },
    'nl-nl': {
      country: 'Netherlands',
      language: 'Nederlands (Dutch)',
    },
    'pl-pl': {
      country: 'Poland',
      language: 'Polski (Polish)',
    },
    'pt-br': {
      country: 'Brazil',
      language: 'Português (Portuguese)',
    },
    'pt-pt': {
      country: 'Portugal',
      language: 'Português (Portuguese)',
    },
    'ro-ro': {
      country: 'Romania',
      language: 'Română (Romanian)',
    },
    'ru-ru': {
      country: 'Russia',
      language: 'Русский (Russian)',
    },
    'sv-se': {
      country: 'Sweden',
      language: 'Svenska (Swedish)',
    },
    'th-th': {
      country: 'Thailand',
      language: 'ไทย (Thai)',
    },
    'tr-tr': {
      country: 'Turkey',
      language: 'Türkçe (Turkish)',
    },
    'uk-ua': {
      country: 'Ukraine',
      language: 'Українська (Ukrainian)',
    },
    'zh-cn': {
      country: 'China',
      language: '中文 (Simplified Chinese)',
    },
  };

  protected capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  protected capitalizeWords(text: string) {
    return text
      .split(' ')
      .map((w) => this.capitalize(w))
      .join(' ');
  }

  protected getCurrentRegion() {
    // TESTS START
    // const metaCC = document.createElement('meta');
    // metaCC.name = 'countryCode';
    // metaCC.content = 'us';

    // const metaLC = document.createElement('meta');
    // metaLC.name = 'languageCode';
    // metaLC.content = 'en';

    // document.head.appendChild(metaCC);
    // document.head.appendChild(metaLC);

    // const countryMeta2 = document.querySelector(
    //   "meta[name='countryCode']"
    // ) as HTMLMetaElement;

    // console.log(countryMeta2.content.toUpperCase());

    // TESTS END

    const countryMeta = document.querySelector(
      "meta[name='countryCode']"
    ) as HTMLMetaElement;

    const langMeta = document.querySelector(
      "meta[name='languageCode']"
    ) as HTMLMetaElement;

    if (!countryMeta || !langMeta) {
      return { country: 'Unknown', language: 'Unknown' };
    }

    const countryCode = countryMeta.content.toUpperCase();
    const languageCode = langMeta.content.toLowerCase();

    const displayNames = new Intl.DisplayNames(languageCode, {
      type: 'region',
    });
    const langDisplay = new Intl.DisplayNames(languageCode, {
      type: 'language',
    });

    let regionName = displayNames.of(countryCode) || countryCode;
    let languageName = langDisplay.of(languageCode) || languageCode;

    if (languageName.toLowerCase() === 'chinese') {
      languageName = 'Simplified Chinese';
    }

    return {
      country: this.capitalize(regionName),
      language: this.capitalize(languageName),
    };
  }

  protected categorizeLinks() {
    const links = document.querySelectorAll("link[rel='alternate']");
    const categorizedLinks: Array<any> = [];

    const metaLang = document.querySelector(
      "meta[name='languageCode']"
    ) as HTMLMetaElement;
    const metaCountry = document.querySelector(
      "meta[name='countryCode']"
    ) as HTMLMetaElement;
    if (!metaLang || !metaCountry) return [];

    const displayNames = new Intl.DisplayNames(metaLang.content.toLowerCase(), {
      type: 'region',
    });
    const langDisplay = new Intl.DisplayNames(metaLang.content.toLowerCase(), {
      type: 'language',
    });

    const currentHreflang = `${metaLang.content.toLowerCase()}-${metaCountry.content.toLowerCase()}`;

    for (const link of Array.from(links)) {
      const hreflang = link.getAttribute('hreflang') || '';
      const href = link.getAttribute('href') || '';

      if (this.countryLanguageMap[hreflang]) {
        const regionCode = hreflang.split('-')[1].toUpperCase();
        let translatedCountry =
          displayNames.of(regionCode) ||
          this.countryLanguageMap[hreflang].country;
        let originalLanguage = this.countryLanguageMap[hreflang].language;
        let translatedLanguage = originalLanguage;

        const match = originalLanguage.match(/\((.*?)\)/);
        if (match) {
          let bracket = match[1];
          let langCode = hreflang.split('-')[0];
          let translatedBracket = langDisplay.of(langCode) || bracket;

          if (translatedBracket.toLowerCase() === 'chinese') {
            translatedBracket = 'Simplified Chinese';
          }

          translatedBracket = this.capitalizeWords(translatedBracket);

          if (originalLanguage.trim().toLowerCase() === 'english (english)') {
            translatedLanguage = `English (${translatedBracket})`;
          } else {
            translatedLanguage = originalLanguage.replace(
              bracket,
              translatedBracket
            );
          }
        }

        translatedCountry = this.capitalize(translatedCountry);
        translatedLanguage = this.capitalize(translatedLanguage);

        if (hreflang !== currentHreflang) {
          categorizedLinks.push({
            hreflang,
            href,
            countryInfo: {
              country: translatedCountry,
              language: translatedLanguage,
            },
          });
        }
      }
    }

    return categorizedLinks.sort((a, b) =>
      a.countryInfo.country.localeCompare(b.countryInfo.country)
    );
  }

  private toggleDropdown = () => {
    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      this.currentRegion = this.getCurrentRegion();
      this.categorizedLinks = this.categorizeLinks();
    }
  };

  firstUpdated() {
    // Closing when clicking outside of the dropdown
    document.addEventListener('click', (event) => {
      const path = event.composedPath();
      if (!path.includes(this)) {
        this.dropdownOpen = false;
      }
    });
  }

  render() {
    const { country, language } = this.currentRegion;
    const mastheadContainer = document.querySelector('c4d-masthead-container');
    const currentRegionLabel =
      mastheadContainer?.getAttribute('current-region-text') ||
      'Your current region';
    const differentRegionLabel =
      mastheadContainer?.getAttribute('different-region-text') ||
      'Other regions';
    const noOtherRegionText =
      mastheadContainer?.getAttribute('no-other-region-text') ||
      'No other regions available';

    return html`
      <div
        class="earth-language-icon"
        role="button"
        tabindex="0"
        aria-haspopup="true"
        aria-expanded="${this.dropdownOpen ? 'true' : 'false'}"
        aria-controls="countryDropdown"
        @click=${this.toggleDropdown}>
        ${Wikis({ part: 'earth-l0-svg' })}

        <div id="countrySwitcher">
          <div id="countryDropdown" class=${this.dropdownOpen ? '' : 'hidden'}>
            <div class="current-region-container">
              <div class="current-region-label">${currentRegionLabel}:</div>
              <div class="current-region-value">
                <strong>${country} – ${language}</strong>
              </div>
            </div>

            ${this.categorizedLinks.length > 0
              ? html`
                  <div class="region-selection">${differentRegionLabel}:</div>
                  <div class="region-list-container">
                    ${this.categorizedLinks.map(
                      (link) => html`
                        <li
                          tabindex="0"
                          @click=${() => (window.location.href = link.href)}
                          @keydown=${(e: KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = link.href;
                            }
                          }}>
                          ${link.countryInfo.country} –
                          ${link.countryInfo.language}
                        </li>
                      `
                    )}
                  </div>
                `
              : html`<div class="region-selection">${noOtherRegionText}</div>`}
          </div>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default C4DMegaMenuLanguageSelector;
