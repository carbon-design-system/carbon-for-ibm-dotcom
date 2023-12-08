/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
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
          <c4d-footer-composite
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            size="${ifDefined(size)}"
            .langList="${ifDefined(langList)}"
            .adjunctLinks="${ifDefined(adjunctLinks)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .links="${ifDefined(links)}"
            .localeList="${ifDefined(localeList)}"
            language-selector-label="${ifDefined(languageSelectorLabel)}"
            clear-selection-label="${ifDefined(clearSelectionLabel)}"
            selected-language="${ifDefined(selectedLanguage)}"
            ?disable-locale-button="${disableLocaleButton}">
          </c4d-footer-composite>
        `
      : html`
          <c4d-footer-container
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            size="${ifDefined(size)}"
            .langList="${ifDefined(langList)}"
            .adjunctLinks="${ifDefined(adjunctLinks)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .links="${ifDefined(links)}"
            .localeList="${ifDefined(localeList)}"
            language-selector-label="${ifDefined(languageSelectorLabel)}"
            clear-selection-label="${ifDefined(clearSelectionLabel)}"
            selected-language="${ifDefined(selectedLanguage)}"
            ?disable-locale-button="${disableLocaleButton}">
          </c4d-footer-container>
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
      // Lets `<c4d-footer-container>` load the footer links
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
