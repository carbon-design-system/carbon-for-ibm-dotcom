/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
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

export const base = ({ parameters }) => {
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
  } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};

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
            ?disable-locale-button="${disableLocaleButton}"
          >
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
            ?disable-locale-button="${disableLocaleButton}"
          >
          </dds-footer-container>
        `}
  `;
};

export const Default = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    langList: '',
    adjunctLinks: [],
  };
  return base({ parameters });
};

export const defaultWithAdjunctLegalLinks = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
  };
  return base({ parameters });
};

defaultWithAdjunctLegalLinks.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        adjunctLinks: object('adjunct links (adjunctLinks):', mockAdjunctLinks, groupId),
      }),
    },
  },
};

export const defaultLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
    adjunctLinks: [],
  };
  return base({ parameters });
};

defaultLanguageOnly.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('language dropdown items (langList)', mockLangList, groupId),
      }),
    },
  },
};

export const short = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    langList: '',
    adjunctLinks: [],
  };
  return base({ parameters });
};

export const shortWithAdjunctLegalLinks = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
  };
  return base({ parameters });
};

shortWithAdjunctLegalLinks.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        adjunctLinks: object('adjunct links (adjunctLinks):', mockAdjunctLinks, groupId),
      }),
    },
  },
};

export const shortLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
    adjunctLinks: [],
  };
  return base({ parameters });
};

shortLanguageOnly.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('language dropdown items (langList)', mockLangList, groupId),
      }),
    },
  },
};

export const micro = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.MICRO,
    langList: '',
  };
  return html`
    ${base({ parameters })}
  `;
};

export const microLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.MICRO,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
  };
  return html`
    ${base({ parameters })}
  `;
};

microLanguageOnly.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('language dropdown items (langList)', mockLangList, groupId),
      }),
    },
  },
};

export default {
  title: 'Components/Footer',
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-footer-container>` load the footer links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
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
  },
  excludeStories: ['base'],
};
