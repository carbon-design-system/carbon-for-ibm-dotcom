/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select, object } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../../masthead/left-nav';
import '../dotcom-shell-container';
import { authenticatedProfileItems, unauthenticatedProfileItems } from '../../masthead/__stories__/profile-items';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss';
import { FOOTER_SIZE } from '../../footer/footer';
import mastheadLinks, { l1Data } from '../../masthead/__stories__/links';
import mockLangList from '../../footer/__stories__/language-list';
import mockFooterLinks from '../../footer/__stories__/links';
import mockLegalLinks from '../../footer/__stories__/legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../../content-block/content-block-copy';
import '../../content-item-horizontal/content-item-horizontal';
import '../../content-item-horizontal/content-item-horizontal-copy';
import '../../content-item-horizontal/content-item-horizontal-eyebrow';
import '../../leadspace/leadspace';
import '../../leadspace/leadspace-heading';
import '../../image/image';
import '../../leadspace-block/leadspace-block';
import '../../leadspace-block/leadspace-block-content';
import '../../leadspace-block/leadspace-block-cta';
import '../../leadspace-block/leadspace-block-heading';
import '../../leadspace-block/leadspace-block-media';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../../quote/quote';
import '../../quote/quote-source-bottom-copy';
import '../../quote/quote-source-copy';
import '../../quote/quote-source-heading';
import '../../cta-block/cta-block';
import '../../cta-block/cta-block-item';
import '../../cta-block/cta-block-item-row';
import '../../callout-with-media/callout-with-media';
import '../../callout-with-media/callout-with-media-copy';
import '../../callout-with-media/callout-with-media-video';
import readme from './README.stories.mdx';
import {
  StoryContent,
  StoryContentNoToC,
  universalBanner as StoryUniversalBanner,
  tocContent,
  contentLeadspaceSearch,
} from './data/content';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { TOC_TYPES } from '../../table-of-contents/defs';

// eslint-disable-next-line sort-imports
import img4Col from '../../../../../storybook-images/assets/universal-banner/universal-banner-4-col-image.jpg';
import img8Col from '../../../../../storybook-images/assets/universal-banner/universal-banner-8-col-image.jpg';

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
const menuItems = ['Products & Solutions', 'Services & Consulting', 'Learn & Support', 'Explore more'];

export const Default = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

export const DefaultFooterLanguageOnly = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { langList, disableLocaleButton } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};
DefaultFooterLanguageOnly.story = {
  name: 'Default footer language only',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('langlist', mockLangList, groupId),
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

export const searchOpenOnload = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            activate-search="true"
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            activate-search="true"
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .langList="${mockLangList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

searchOpenOnload.story = {
  name: 'Search open onload',
};

export const withPlatform = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform=${platformData.name}
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform=${platformData.name}
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        hasProfile: boolean('show the profile functionality (profile)', true, groupId),
        hasSearch: boolean('show the search functionality (search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', inPercy() ? ' ' : 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
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

export const withShortFooter = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

withShortFooter.story = {
  name: 'With short footer',
};

export const withShortFooterLanguageOnly = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};

  const { langList, disableLocaleButton } = parameters?.props?.FooterComposite ?? {};

  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};
withShortFooterLanguageOnly.story = {
  name: 'With short footer language only',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('langlist', mockLangList, groupId),
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

export const withMicroFooter = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

withMicroFooter.story = { name: 'With micro footer' };

export const withMicroFooterLanguageOnly = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { langList, disableLocaleButton } = parameters?.props?.FooterComposite ?? {};

  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            user-status="${ifNonNull(userStatus)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

withMicroFooterLanguageOnly.story = {
  name: 'With micro footer language only',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('langlist', mockLangList, groupId),
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

export const withL1 = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
          <dds-dotcom-shell-composite
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent(contentConfig)}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent(contentConfig)}
          </dds-dotcom-shell-container>
        `}
  `;
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      DotcomShell: ({ groupId }) => ({
        hasProfile: boolean('show the profile functionality (has-profile)', true, groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', inPercy() ? ' ' : 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
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

export const WithHorizontalTOC = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent(contentConfig)}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent(contentConfig)}
          </dds-dotcom-shell-container>
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

export const WithLeadspaceSearch = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContentNoToC()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContentNoToC()}
          </dds-dotcom-shell-container>
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

export const WithUniversalBanner = ({ parameters }) => {
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
  } = parameters?.props?.DotcomShell ?? {};
  const { useMock } = parameters?.props?.Other ?? {};

  const bannerHeading = document.querySelector('dds-universal-banner-heading');
  const bannerCopy = document.querySelector('dds-universal-banner-copy');

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
    <dds-universal-banner image-width="${imageWidth}">
      <dds-universal-banner-image slot="image" default-src="${images[imageWidth]}"></dds-universal-banner-image>
      <dds-universal-banner-heading slot="heading">${heading}</dds-universal-banner-heading>
      <dds-universal-banner-copy slot="copy">${copy}</dds-universal-banner-copy>
      <dds-button-cta slot="cta" cta-type="local" kind="tertiary" href="https://www.example.com">
        ${ctaCopy}
      </dds-button-cta>
    </dds-universal-banner>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            ?disable-locale-button="${disableLocaleButton}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

WithUniversalBanner.story = {
  name: 'With Universal banner',
  parameters: {
    knobs: {
      DotcomShell: ({ groupId }) => ({
        hasProfile: boolean('show the profile functionality (has-profile)', true, groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', inPercy() ? ' ' : 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
        heading: textNullable('Universal banner heading:', 'Hybrid cloud and AI for smarter business', groupId),
        copy: textNullable('Universal banner copy (optional):', 'Las Vegas, June 15-18, 2025', groupId),
        ctaCopy: textNullable('Universal banner CTA copy:', 'Register for Think. Free', groupId),
        imageWidth: select('Universal banner image width:', imageWidthOptions, '4-col', groupId),
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

export const WithoutShell = ({ parameters }) => {
  const { masthead, universalBanner, leadspaceSearch, tocLayout } = parameters?.props?.DotcomShell ?? {};

  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${universalBanner ? StoryUniversalBanner(images['4-col']) : ''}
    ${masthead === 'L0'
      ? html`
          <dds-masthead-container id="masthead-container"></dds-masthead-container>
        `
      : html`
          <dds-masthead-container id="masthead-container" .l1Data="${l1Data}"></dds-masthead-container>
        `}
    <main class="bx--content dds-ce-demo--ui-shell-content">
      ${leadspaceSearch
        ? html`
            <div class="bx--grid bx--col-lg-8">
              ${contentLeadspaceSearch}
            </div>
          `
        : ''}
      ${tocLayout === 'none'
        ? html`
            <div class="bx--grid bx--col-lg-8">
              ${tocContent}
            </div>
          `
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
      DotcomShell: ({ groupId }) => ({
        masthead: select('Masthead Version', ['L0', 'L1'], 'L0', groupId),
        universalBanner: boolean('Has Universal Banner', false, groupId),
        leadspaceSearch: boolean('Has Leadspace With Search', false, groupId),
        tocLayout: select('Table of Contents Layout', { Vertical: null, Horizontal: 'horizontal', None: 'none' }, null, groupId),
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
    story => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('dds-left-nav');
          if (leftNav) {
            (leftNav as DDSLeftNav).expanded = false;
          }
        });
      }
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      DotcomShell: ({ groupId }) => ({
        platform: select('Platform (platform)', { none: null, platform: platformData.name }, null, groupId),
        hasProfile: boolean('Show profile in masthead (profile)', true, groupId),
        hasSearch: boolean('Show search in masthead (search)', true, groupId),
        searchPlaceholder: textNullable('Search placeholder (searchPlaceholder)', inPercy() ? ' ' : 'Search all of IBM', groupId),
        selectedMenuItem: select('Selected menu item (selected-menu-item)', menuItems, menuItems[1], groupId),
        userStatus: select('User authentication (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
        disableLocaleButton: boolean('Locale button (disable-locale-button)', false, groupId),
        footerSize: select('Footer size (footer-size)', footerSizes, FOOTER_SIZE.REGULAR, groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links and lets `<dds-footer-container>` load the footer links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        DotcomShell: {
          navLinks: !useMock ? undefined : mastheadLinks,
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
