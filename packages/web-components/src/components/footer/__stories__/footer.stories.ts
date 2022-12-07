/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import { boolean, object } from '@storybook/addon-knobs';
import inPercy from '@percy-io/in-percy';
import { FOOTER_SIZE } from '../footer';
import '../footer-composite';
import '../footer-container';
import mockLangList from './language-list';
import mockLinks from './links';
import mockLegalLinks from './legal-links';
import mockAdjunctLinks from './adjunct-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import readme from './README.stories.mdx';
import styles from './footer.stories.scss';

export const base = (args) => {
  const {
    langDisplay,
    language,
    size,
    langList,
    legalLinks,
    links,
    localeList,
    disableLocaleButton,
    clearSelectionLabel,
    languageSelectorLabel,
    selectedLanguage,
    adjunctLinks,
  } = args?.FooterComposite ?? {};
  const { useMock } = args?.Other ?? {};

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-footer-composite
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            size="${ifNonNull(size)}"
            .langList="${ifNonNull(langList)}"
            .adjunctLinks="${ifNonNull(adjunctLinks)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .links="${ifNonNull(links)}"
            .localeList="${ifNonNull(localeList)}"
            language-selector-label="${ifNonNull(languageSelectorLabel)}"
            clear-selection-label="${ifNonNull(clearSelectionLabel)}"
            selected-language="${ifNonNull(selectedLanguage)}"
            ?disable-locale-button="${disableLocaleButton}">
          </dds-footer-composite>
        `
      : html`
          <dds-footer-container
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            size="${ifNonNull(size)}"
            .langList="${ifNonNull(langList)}"
            .adjunctLinks="${ifNonNull(adjunctLinks)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .links="${ifNonNull(links)}"
            .localeList="${ifNonNull(localeList)}"
            language-selector-label="${ifNonNull(languageSelectorLabel)}"
            clear-selection-label="${ifNonNull(clearSelectionLabel)}"
            selected-language="${ifNonNull(selectedLanguage)}"
            ?disable-locale-button="${disableLocaleButton}">
          </dds-footer-container>
        `}
  `;
};

export const Default = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    langList: '',
    adjunctLinks: [],
  };
  return base(args);
};

export const defaultWithAdjunctLegalLinks = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
  };
  return base(args);
};

defaultWithAdjunctLegalLinks.story = {
  name: 'Default with adjunct legal links',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        adjunctLinks: object('adjunct links (adjunctLinks):', mockAdjunctLinks),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          adjunctLinks: mockAdjunctLinks,
        },
      },
    },
  },
};

export const defaultLanguageOnly = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
    adjunctLinks: [],
  };
  return html` <div class="default-language-only">${base(args)}</div> `;
};

defaultLanguageOnly.story = {
  name: 'Default language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('language dropdown items (langList)', mockLangList),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langList: mockLangList,
        },
      },
    },
  },
};

export const short = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    langList: '',
    adjunctLinks: [],
  };
  return base(args);
};

export const shortWithAdjunctLegalLinks = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
  };
  return base(args);
};

shortWithAdjunctLegalLinks.story = {
  name: 'Short with adjunct legal links',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        adjunctLinks: object('adjunct links (adjunctLinks):', mockAdjunctLinks),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          adjunctLinks: mockAdjunctLinks,
        },
      },
    },
  },
};

export const shortLanguageOnly = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
    adjunctLinks: [],
  };
  return base(args);
};

shortLanguageOnly.story = {
  name: 'Short language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('language dropdown items (langList)', mockLangList),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langList: mockLangList,
        },
      },
    },
  },
};

export const micro = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.MICRO,
    langList: '',
  };
  return html` ${base(args)} `;
};

export const microLanguageOnly = (args) => {
  args.FooterComposite = {
    ...(args.FooterComposite || {}),
    size: FOOTER_SIZE.MICRO,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
  };
  return html` ${base(args)} `;
};

microLanguageOnly.story = {
  name: 'Micro language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('language dropdown items (langList)', mockLangList),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langList: mockLangList,
        },
      },
    },
  },
};

export default {
  title: 'Components/Footer',
  parameters: {
    ...readme.parameters,
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
      }),
    },
    props: (() => {
      // Lets `<dds-footer-container>` load the footer links
      const useMock =
        inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        FooterComposite: {
          langDisplay: !useMock ? undefined : 'United States - English',
          legalLinks: !useMock ? undefined : mockLegalLinks,
          adjunctLinks: !useMock ? undefined : mockAdjunctLinks,
          links: !useMock ? undefined : mockLinks,
          localeList: !useMock ? undefined : mockLocaleList,
        },
        Other: {
          useMock,
        },
      };
    })(),
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langDisplay: 'United States - English',
          legalLinks: mockLegalLinks,
          adjunctLinks: mockLegalLinks,
          links: mockLinks,
          localeList: mockLocaleList,
        },
      },
    },
  },
  excludeStories: ['base'],
};
