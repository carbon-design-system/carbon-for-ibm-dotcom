/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select, object } from '@storybook/addon-knobs';
import on from '@carbon/web-components/es/globals/mixins/on.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import c4dLeftNav from '../../masthead/left-nav';
import '../dotcom-shell-container';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from '../../masthead/__stories__/profile-items';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss?lit';
import { FOOTER_SIZE } from '../../footer/footer';
import {
  mastheadL0Data as l0Data,
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
import { UNAUTHENTICATED_STATUS } from '@carbon/ibmdotcom-services-store/es/types/profileAPI';
import { TOC_TYPES } from '../../table-of-contents/defs';

// eslint-disable-next-line sort-imports
import img4Col from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-4-col-image.jpg';
import img8Col from '../../../../.storybook/storybook-images/assets/global-banner/global-banner-8-col-image.jpg';

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

export const Default = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    footerSize,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};

export const DefaultFooterLanguageOnly = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
  } = args?.DotcomShell ?? {};

  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};
DefaultFooterLanguageOnly.story = {
  name: 'Default footer language only',
  parameters: {
    percy: {
      skip: true,
    },
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

export const searchOpenOnload = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};

searchOpenOnload.story = {
  name: 'Search open onload',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const withPlatform = (args, story) => {
  const {
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    percy: {
      skip: true,
    },
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

export const withShortFooter = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};

withShortFooter.story = {
  name: 'With short footer',
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const withShortFooterLanguageOnly = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
  } = args?.DotcomShell ?? {};

  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};
withShortFooterLanguageOnly.story = {
  name: 'With short footer language only',
  parameters: {
    percy: {
      skip: true,
    },
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

export const withMicroFooter = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};

withMicroFooter.story = { name: 'With micro footer' };

export const withMicroFooterLanguageOnly = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
  } = args?.DotcomShell ?? {};

  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};

withMicroFooterLanguageOnly.story = {
  name: 'With micro footer language only',
  parameters: {
    percy: {
      skip: true,
    },
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

export const withL1 = (args, story) => {
  const {
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  const contentConfig = {
    l1: true,
    leadspace: false,
    leadspaceSearch: false,
    tocLayout: TOC_TYPES.DEFAULT,
  };

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent(contentConfig)}
    </c4d-dotcom-shell-composite>
  `;
};

withL1.story = {
  name: 'With L1',
  parameters: {
    percy: {
      skip: true,
    },
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

export const WithHorizontalTOC = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    footerSize,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  const contentConfig = {
    l1: true,
    leadspace: true,
    leadspaceSearch: false,
    tocLayout: TOC_TYPES.HORIZONTAL,
  };

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent(contentConfig)}
    </c4d-dotcom-shell-composite>
  `;
};

WithHorizontalTOC.story = {
  name: 'With ToC horizontal',
  parameters: {
    percy: {
      skip: true,
    },
    ...readme.parameters,
  },
};

export const WithLeadspaceSearch = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    footerSize,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  return html`
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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContentNoToC()}
    </c4d-dotcom-shell-composite>
  `;
};

WithLeadspaceSearch.story = {
  name: 'With Lead space search',
  parameters: {
    percy: {
      skip: true,
    },
    ...readme.parameters,
    'carbon-theme': { disabled: true },
  },
};

export const WithGlobalBanner = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    footerSize,
    disableLocaleButton,
    imageWidth,
    heading,
    copy,
    ctaCopy,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

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
      .l0Data="${ifDefined(navLinks)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}"
      ?disable-locale-button="${disableLocaleButton}">
      ${StoryContent()}
    </c4d-dotcom-shell-composite>
  `;
};

WithGlobalBanner.story = {
  name: 'With Global banner',
  parameters: {
    percy: {
      skip: true,
    },
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
            leadspaceSearch: false,
            tocLayout: TOC_TYPES.HORIZONTAL,
          })
        : ''}
    </main>
  `;
};

WithoutShell.story = {
  name: 'Without Shell (Fallback Utility)',
  parameters: {
    percy: {
      skip: true,
    },
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

export const StickyElementSandbox = (args, story) => {
  const {
    platform,
    hasProfile,
    userStatus,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    language,
    footerSize,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};

  const {
    navLinks,
    langDisplay,
    legalLinks,
    links: footerLinks,
    localeList,
  } = story.parameters.props.DotcomShell;

  const { globalBanner, l1, leadspaceSearch, tocLayout } =
    args?.StickyElementSandbox ?? {};

  const contentConfig = {
    l1: l1,
    leadspace: false,
    leadspaceSearch: leadspaceSearch,
    tocLayout: tocLayout || '',
  };

  return html`
    <style>
      ${mastheadStyles}
    </style>
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
      .l0Data="${ifDefined(navLinks)}"
      .l1Data="${ifDefined(l1 ? l1Data : null)}"
      ?has-profile="${hasProfile}"
      ?has-search="${hasSearch}"
      ?disable-locale-button="${disableLocaleButton}">
      ${globalBanner
        ? html`
            <c4d-global-banner image-width="4-col">
              <c4d-global-banner-image
                slot="image"
                default-src="${img4Col}"></c4d-global-banner-image>
              <c4d-global-banner-heading slot="heading">
                Hybrid cloud and AI for smarter business
              </c4d-global-banner-heading>
              <c4d-global-banner-copy slot="copy">
                Las Vegas, June 15-18, 2025
              </c4d-global-banner-copy>
              <c4d-button-cta
                slot="cta"
                cta-type="local"
                kind="tertiary"
                href="https://www.example.com">
                Register for Think. Free
              </c4d-button-cta>
            </c4d-global-banner>
          `
        : ''}
      ${StoryContent(contentConfig)}
    </c4d-dotcom-shell-container>
  `;
};

StickyElementSandbox.story = {
  name: 'Sticky Element Sandbox',
  parameters: {
    knobs: {
      StickyElementSandbox: () => ({
        globalBanner: boolean('Has Global Banner', true),
        l1: boolean('Has Masthead L1', true),
        leadspaceSearch: boolean('Has Leadspace With Search', true),
        tocLayout: select(
          'Table of Contents Layout',
          { Vertical: null, Horizontal: 'horizontal' },
          null
        ),
      }),
    },
    propsSet: {
      default: {
        StickyElementSandbox: {
          globalBanner: true,
          l1: true,
          leadspaceSearch: true,
          tocLayout: null,
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
    percy: {
      skip: true,
    },
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
