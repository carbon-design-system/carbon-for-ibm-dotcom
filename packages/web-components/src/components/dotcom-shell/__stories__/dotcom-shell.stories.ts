/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select, object } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import c4dLeftNav from '../../masthead/left-nav';
import '../dotcom-shell-container';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from '../../masthead/__stories__/profile-items';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss';
import { FOOTER_SIZE } from '../../footer/footer';
import {
  mastheadLinksV2 as l0Data,
  mastheadL1Data as l1Data,
} from '../../masthead/__stories__/links';
import mockLangList from '../../footer/__stories__/language-list';
import mockFooterLinks from '../../footer/__stories__/links';
import mockLegalLinks from '../../footer/__stories__/legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import readme from './README.stories.mdx';
import {
  StoryContent,
  StoryContentNoToC,
  globalBanner as StoryGlobalBanner,
  tocContent,
  contentLeadspaceSearch,
} from './data/content';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { TOC_TYPES } from '../../table-of-contents/defs';

// eslint-disable-next-line sort-imports
import img4Col from '../../../../../storybook-images/assets/global-banner/global-banner-4-col-image.jpg';
import img8Col from '../../../../../storybook-images/assets/global-banner/global-banner-8-col-image.jpg';

const userStatuses = {
  authenticated: 'test.user@ibm.com',
  unauthenticated: UNAUTHENTICATED_STATUS,
};

/**
 * platform knob data
 */
const platformData = {
  name: 'IBM Cloud',
  url: 'https://www.ibm.com/cloud',
};

const footerSizes = {
  Default: FOOTER_SIZE.REGULAR,
  [`Short (${FOOTER_SIZE.SHORT})`]: FOOTER_SIZE.SHORT,
  [`Micro (${FOOTER_SIZE.MICRO})`]: FOOTER_SIZE.MICRO,
};

const imageWidthOptions = {
  [`4 Columns`]: `4-col`,
  [`8 Columns`]: `8-col`,
  [`None`]: '',
};

const images = {
  '4-col': img4Col,
  '8-col': img8Col,
};

/**
 * Menu items knob data
 */
const menuItems = [
  'Products & Solutions',
  'Services & Consulting',
  'Learn & Support',
  'Explore more',
];

export const Default = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

export const DefaultFooterLanguageOnly = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
  } = args?.DotcomShell ?? {};
  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            .langList="${langList}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};
DefaultFooterLanguageOnly.story = {
  name: 'Default footer language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('langlist', mockLangList),
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

export const searchOpenOnload = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            activate-search="true"
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            activate-search="true"
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .langList="${mockLangList}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

searchOpenOnload.story = {
  name: 'Search open onload',
};

export const withPlatform = (args) => {
  const {
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform=${platformData.name}
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform=${platformData.name}
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        hasProfile: boolean('show the profile functionality (profile)', true),
        hasSearch: boolean('show the search functionality (search)', true),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          inPercy() ? ' ' : 'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Services & Consulting'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
      }),
    },
    propsSet: {
      default: {
        DotcomShell: {
          hasProfile: true,
          hasSearch: true,
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: menuItems[1],
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const withShortFooter = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="short"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="short"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

withShortFooter.story = {
  name: 'With short footer',
};

export const withShortFooterLanguageOnly = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
  } = args?.DotcomShell ?? {};

  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};

  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="short"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="short"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .langList="${langList}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};
withShortFooterLanguageOnly.story = {
  name: 'With short footer language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('langlist', mockLangList),
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

export const withMicroFooter = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="micro"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="micro"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

withMicroFooter.story = { name: 'With micro footer' };

export const withMicroFooterLanguageOnly = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
  } = args?.DotcomShell ?? {};
  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};

  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="micro"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="micro"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            user-status="${ifDefined(userStatus)}"
            .langList="${langList}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

withMicroFooterLanguageOnly.story = {
  name: 'With micro footer language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('langlist', mockLangList),
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

export const withL1 = (args) => {
  const {
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  const contentConfig = {
    l1: true,
    leadspace: false,
    tocLayout: TOC_TYPES.DEFAULT,
  };
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent(contentConfig)}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .l1Data="${l1Data}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent(contentConfig)}
          </c4d-dotcom-shell-container>
        `}
  `;
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      DotcomShell: () => ({
        hasProfile: boolean(
          'show the profile functionality (has-profile)',
          true
        ),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          inPercy() ? ' ' : 'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Services & Consulting'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
      }),
    },
    propsSet: {
      default: {
        DotcomShell: {
          hasProfile: true,
          hasSearch: true,
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: menuItems[1],
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const WithHorizontalTOC = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  const contentConfig = {
    l1: false,
    leadspace: true,
    tocLayout: TOC_TYPES.HORIZONTAL,
  };
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent(contentConfig)}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent(contentConfig)}
          </c4d-dotcom-shell-container>
        `}
  `;
};

WithHorizontalTOC.story = {
  name: 'With ToC horizontal',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const WithLeadspaceSearch = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContentNoToC()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContentNoToC()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

WithLeadspaceSearch.story = {
  name: 'With Lead space search',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
  },
};

export const WithGlobalBanner = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
    imageWidth,
    heading,
    copy,
    ctaCopy,
  } = args?.DotcomShell ?? {};
  const { useMock } = args?.Other ?? {};

  const bannerHeading = document.querySelector('c4d-global-banner-heading');
  const bannerCopy = document.querySelector('c4d-global-banner-copy');

  if (bannerHeading) {
    bannerHeading!.shadowRoot!.textContent = heading;
  }

  if (bannerCopy) {
    bannerCopy!.shadowRoot!.textContent = copy;
  }

  return html`
    <style>
      ${mastheadStyles}
    </style>
    <c4d-global-banner image-width="${imageWidth}">
      <c4d-global-banner-image
        slot="image"
        default-src="${images[imageWidth]}"></c4d-global-banner-image>
      <c4d-global-banner-heading slot="heading"
        >${heading}</c4d-global-banner-heading
      >
      <c4d-global-banner-copy slot="copy">${copy}</c4d-global-banner-copy>
      <c4d-button
        slot="cta"
        cta-type="local"
        kind="tertiary"
        href="https://www.example.com">
        ${ctaCopy}
      </c4d-button>
    </c4d-global-banner>
    ${useMock
      ? html`
          <c4d-dotcom-shell-composite
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-composite>
        `
      : html`
          <c4d-dotcom-shell-container
            platform="${ifDefined(platform)}"
            platform-url="${ifDefined(platformData.url)}"
            language="${ifDefined(language)}"
            lang-display="${ifDefined(langDisplay)}"
            footer-size="${ifDefined(footerSize)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            .legalLinks="${ifDefined(legalLinks)}"
            .localeList="${ifDefined(localeList)}"
            .footerLinks="${ifDefined(footerLinks)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}">
            ${StoryContent()}
          </c4d-dotcom-shell-container>
        `}
  `;
};

WithGlobalBanner.story = {
  name: 'With Global banner',
  parameters: {
    knobs: {
      DotcomShell: () => ({
        hasProfile: boolean(
          'show the profile functionality (has-profile)',
          true
        ),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          inPercy() ? ' ' : 'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Services & Consulting'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
        heading: textNullable(
          'Global banner heading:',
          'Hybrid cloud and AI for smarter business'
        ),
        copy: textNullable(
          'Global banner copy (optional):',
          'Las Vegas, June 15-18, 2025'
        ),
        ctaCopy: textNullable(
          'Global banner CTA copy:',
          'Register for Think. Free'
        ),
        imageWidth: select(
          'Global banner image width:',
          imageWidthOptions,
          '4-col'
        ),
      }),
    },
    propsSet: {
      default: {
        DotcomShell: {
          platform: null,
          hasProfile: true,
          hasSearch: true,
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: menuItems[1],
          userStatus: userStatuses.unauthenticated,
          disableLocaleButton: false,
          footerSize: 'regular',
          heading: 'Hybrid cloud and AI for smarter business',
          copy: 'Las Vegas, June 15-18, 2025',
          ctaCopy: 'Register for Think. Free',
          imageWidth: '4-col',
        },
      },
    },
  },
};

export const WithoutShell = (args) => {
  const { masthead, globalBanner, leadspaceSearch, tocLayout } =
    args?.DotcomShell ?? {};

  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${globalBanner ? StoryGlobalBanner(images['4-col']) : ''}
    ${masthead === 'L0'
      ? html`
          <c4d-masthead-container
            id="masthead-container"></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            id="masthead-container"
            .l1Data="${l1Data}"></c4d-masthead-container>
        `}
    <main class="cds--content c4d-ce-demo--ui-shell-content">
      ${leadspaceSearch
        ? html`
            <div class="cds--grid cds--col-lg-8">${contentLeadspaceSearch}</div>
          `
        : ''}
      ${tocLayout === 'none'
        ? html` <div class="cds--grid cds--col-lg-8">${tocContent}</div> `
        : ''}
      ${tocLayout === null ? StoryContent() : ''}
      ${tocLayout === 'horizontal'
        ? StoryContent({
            l1: false,
            leadspace: true,
            tocLayout: TOC_TYPES.HORIZONTAL,
          })
        : ''}
    </main>
  `;
};

WithoutShell.story = {
  name: 'Without Shell (Fallback Utility)',
  parameters: {
    knobs: {
      DotcomShell: () => ({
        masthead: select('Masthead Version', ['L0', 'L1'], 'L0'),
        globalBanner: boolean('Has Global Banner', false),
        leadspaceSearch: boolean('Has Leadspace With Search', false),
        tocLayout: select(
          'Table of Contents Layout',
          { Vertical: null, Horizontal: 'horizontal' },
          null
        ),
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
  title: 'Components/Dotcom shell',
  decorators: [
    (story) => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('c4d-left-nav');
          if (leftNav) {
            (leftNav as c4dLeftNav).expanded = false;
          }
        });
      }
      return html`
        ${story()}
        <script>
          window.digitalData.page.pageInfo.ibm.contactModuleConfiguration = {
            contactInformationBundleKey: {
              focusArea: 'Cloud - Automation - All',
              languageCode: 'en',
              regionCode: 'US',
            },
            contactModuleTranslationKey: {
              languageCode: 'en',
              regionCode: 'US',
            },
          };
        </script>
        <script
          src="//www.ibm.com/common/digitaladvisor/cm-app/latest/cm-app.min.js"
          defer></script>
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      DotcomShell: () => ({
        platform: select(
          'Platform (platform)',
          { none: null, platform: platformData.name },
          null
        ),
        hasProfile: boolean('Show profile in masthead (profile)', true),
        hasSearch: boolean('Show search in masthead (search)', true),
        searchPlaceholder: textNullable(
          'Search placeholder (searchPlaceholder)',
          inPercy() ? ' ' : 'Search all of IBM'
        ),
        selectedMenuItem: select(
          'Selected menu item (selected-menu-item)',
          menuItems,
          menuItems[1]
        ),
        userStatus: select(
          'User authentication (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
        disableLocaleButton: boolean(
          'Locale button (disable-locale-button)',
          false
        ),
        footerSize: select(
          'Footer size (footer-size)',
          footerSizes,
          FOOTER_SIZE.REGULAR
        ),
      }),
    },
    props: (() => {
      // Lets `<c4d-masthead-container>` load the nav links and lets `<c4d-footer-container>` load the footer links
      const useMock =
        inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        DotcomShell: {
          navLinks: !useMock ? undefined : l0Data,
          langDisplay: !useMock ? undefined : 'United States - English',
          legalLinks: !useMock ? undefined : mockLegalLinks,
          links: !useMock ? undefined : mockFooterLinks,
          localeList: !useMock ? undefined : mockLocaleList,
        },
        Other: {
          useMock,
        },
      };
    })(),
    propsSet: {
      default: {
        DotcomShell: {
          platform: null,
          hasProfile: true,
          hasSearch: true,
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: menuItems[1],
          userStatus: userStatuses.unauthenticated,
          disableLocaleButton: false,
          footerSize: 'regular',
        },
      },
    },
  },
};
